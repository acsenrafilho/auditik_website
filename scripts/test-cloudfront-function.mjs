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

function makeEvent(host, uri, querystring = {}) {
  return {
    request: {
      method: "GET",
      uri,
      querystring,
      headers: { host: { value: host } },
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

function expectRedirect(host, uri, location, querystring) {
  const result = handler(makeEvent(host, uri, querystring));
  const name = `${host}${uri} → 301 ${location}`;
  check(`${name} (status)`, result.statusCode, 301);
  check(`${name} (location)`, result.headers?.location?.value, location);
}

function expectRewrite(host, uri, rewrittenUri) {
  const result = handler(makeEvent(host, uri));
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

// Apex pages: rewrite to index.html for S3
expectRewrite(APEX, "/", "/index.html");
expectRewrite(APEX, "/contato", "/contato/index.html");
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
