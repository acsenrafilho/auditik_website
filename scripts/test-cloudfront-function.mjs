/**
 * Unit checks for infra/cloudfront-viewer-request-index-html.js.
 *
 * The function file is plain CloudFront Functions JS (no exports), so it is evaluated
 * here and `handler` is called with simulated viewer-request events.
 *
 * Usage: npm run test:cf-function
 */
import { readFileSync } from "node:fs";
import path from "node:path";

const FUNCTION_PATH = path.join(
  process.cwd(),
  "infra",
  "cloudfront-viewer-request-index-html.js",
);

const handler = new Function(
  `${readFileSync(FUNCTION_PATH, "utf8")}\nreturn handler;`,
)();

const APEX = "auditik.com.br";
const WWW = "www.auditik.com.br";

function makeEvent(host, uri, querystring = {}, proto) {
  const headers = { host: { value: host } };
  if (proto) {
    headers["cloudfront-forwarded-proto"] = { value: proto };
  }
  return {
    request: {
      method: "GET",
      uri,
      querystring,
      headers,
    },
  };
}

let failures = 0;
let passed = 0;

function check(name, actual, expected) {
  if (actual === expected) {
    passed++;
    return;
  }
  failures++;
  console.error(`FAIL ${name}\n  expected: ${expected}\n  actual:   ${actual}`);
}

function expectRedirect(host, uri, location, querystring, proto) {
  const result = handler(makeEvent(host, uri, querystring, proto));
  const name = `${proto || "https"} ${host}${uri} → 301 ${location}`;
  check(`${name} (status)`, result.statusCode, 301);
  check(`${name} (location)`, result.headers?.location?.value, location);
}

function expectRewrite(host, uri, rewrittenUri, proto) {
  const result = handler(makeEvent(host, uri, {}, proto));
  check(`${host}${uri} (no redirect)`, result.statusCode, undefined);
  check(`${host}${uri} → ${rewrittenUri}`, result.uri, rewrittenUri);
}

// www → apex (path + trailing slash + querystring)
expectRedirect(WWW, "/", `https://${APEX}/`);
expectRedirect(WWW, "/contato", `https://${APEX}/contato/`);
expectRedirect(WWW, "/contato/", `https://${APEX}/contato/`);
expectRedirect(WWW, "/sitemap.xml", `https://${APEX}/sitemap.xml`);
expectRedirect(WWW, "/", `https://${APEX}/?utm_source=google&fbclid=abc%201`, {
  utm_source: { value: "google" },
  fbclid: { value: "abc 1" },
});
expectRedirect(WWW, "/", `https://${APEX}/?a=1&a=2`, {
  a: { value: "1", multiValue: [{ value: "1" }, { value: "2" }] },
});

// Plain HTTP must land on https apex in one function response (no www hop).
expectRedirect(WWW, "/", `https://${APEX}/`, undefined, "http");
expectRedirect(WWW, "/", `https://${APEX}/`, undefined, "HTTP");
expectRedirect(APEX, "/", `https://${APEX}/`, undefined, "http");
expectRedirect(APEX, "/contato", `https://${APEX}/contato/`, undefined, "http");
expectRedirect(WWW, "/sitemap.xml", `https://${APEX}/sitemap.xml`, undefined, "http");
expectRedirect(WWW, "/", `https://${APEX}/?utm_source=google`, {
  utm_source: { value: "google" },
}, "http");

// Legacy paths: single 301 from apex and www, with and without trailing slash
const LEGACY = {
  "/aparelhos-auditivos": "/aparelhos/",
  "/conheca-mais-sobre-aparelhos-auditivos-da-philips":
    "/aparelhos-auditivos-philips-hearing-solutions/",
  "/philips-hearlink-50-minirite-clareza-auditiva-com-conforto-e-confianca":
    "/blog/philips-hearlink-50-minirite-sua-nova-experiencia-sonora-com-a-auditik/",
  "/nao-e-apenas-distracao-5-sinais-cotidianos-de-que-sua-audicao-esta-pedindo-ajuda":
    "/como-saber-se-precisa-de-aparelho-auditivo/",
  "/philips": "/aparelhos-auditivos-philips-hearing-solutions/",
  "/philips-hearlink": "/aparelhos-auditivos-philips-hearing-solutions/",
  "/guia-especial-qual-o-preco-de-aparelhos-auditivos": "/preco-aparelho-auditivo/",
  "/como-conseguir-aparelho-auditivo-pelo-sus": "/financiamento-aparelho-auditivo/",
};
for (const [from, to] of Object.entries(LEGACY)) {
  for (const host of [APEX, WWW]) {
    expectRedirect(host, from, `https://${APEX}${to}`);
    expectRedirect(host, `${from}/`, `https://${APEX}${to}`);
  }
}
expectRedirect(APEX, "/philips/", `https://${APEX}/aparelhos-auditivos-philips-hearing-solutions/?utm_campaign=x`, {
  utm_campaign: { value: "x" },
});

// Old WordPress archives → /blog/
for (const host of [APEX, WWW]) {
  expectRedirect(host, "/tag/aparelho", `https://${APEX}/blog/`);
  expectRedirect(host, "/category/saude-auditiva/", `https://${APEX}/blog/`);
  expectRedirect(host, "/author/admin/", `https://${APEX}/blog/`);
  expectRedirect(host, "/tag/", `https://${APEX}/blog/`);
}

// /beneficio/* → /convenios/
for (const host of [APEX, WWW]) {
  expectRedirect(host, "/beneficio/", `https://${APEX}/convenios/`);
  expectRedirect(host, "/beneficio/algum-parceiro", `https://${APEX}/convenios/`);
  expectRedirect(host, "/beneficio/algum-parceiro/", `https://${APEX}/convenios/`);
}

// Apex pages without trailing slash → 301 with slash
expectRedirect(APEX, "/contato", `https://${APEX}/contato/`);
expectRedirect(APEX, "/politica-de-privacidade", `https://${APEX}/politica-de-privacidade/`);
expectRedirect(APEX, "/contato", `https://${APEX}/contato/?utm_source=x`, {
  utm_source: { value: "x" },
});

// Apex pages with trailing slash: rewrite to index.html for S3
expectRewrite(APEX, "/", "/index.html");
expectRewrite(APEX, "/contato/", "/contato/index.html");
expectRewrite(APEX, "/blog/algum-post/", "/blog/algum-post/index.html");
expectRewrite(APEX, "/contato/index.html", "/contato/index.html");

// Apex assets: pass through unchanged
expectRewrite(APEX, "/_next/static/chunks/main.js", "/_next/static/chunks/main.js");
expectRewrite(APEX, "/sitemap.xml", "/sitemap.xml");
expectRewrite(APEX, "/favicon.ico", "/favicon.ico");
expectRewrite(APEX, "/404.html", "/404.html");

if (failures > 0) {
  console.error(`\n${failures} check(s) failed, ${passed} passed.`);
  process.exit(1);
}
console.log(`CloudFront function: all ${passed} checks passed.`);
