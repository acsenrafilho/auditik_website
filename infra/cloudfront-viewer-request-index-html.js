/**
 * CloudFront Functions — viewer-request
 *
 * Use this when the origin is an S3 REST API bucket (OAI/OAC) and the site is a Next.js
 * static export with trailingSlash: true (each route is `some/path/index.html`).
 *
 * Order of operations:
 * 1. 301 known legacy paths → live apex URLs (querystring preserved, any host)
 * 2. 301 old WordPress archives (/tag/, /category/, /author/) → /blog/ (any host)
 * 3. 301 www.auditik.com.br → https://auditik.com.br (path + querystring)
 * 4. Rewrite directory URLs to .../index.html for S3
 *
 * Steps 1–2 run before the host check so www + legacy is a single 301, not a chain.
 *
 * Without the rewrite, a refresh on `/contato/` asks S3 for the object key `contato/`,
 * which does not exist — S3 returns an XML AccessDenied error. Missing objects still
 * return 403 from S3; the distribution maps 403 → /404.html with status 404.
 *
 * Deployed by .github/workflows/deploy.yml (update + publish on every push to main).
 * Attached in CloudFront: Behaviors → Default (*) → Function associations → Viewer request.
 */

var APEX_HOST = "auditik.com.br";
var WWW_HOST = "www.auditik.com.br";

/** Path (with trailing slash) → destination path on apex (with trailing slash). */
var LEGACY_REDIRECTS = {
  "/aparelhos-auditivos/": "/aparelhos/",
  "/conheca-mais-sobre-aparelhos-auditivos-da-philips/":
    "/aparelhos-auditivos-philips-hearing-solutions/",
  "/philips-hearlink-50-minirite-clareza-auditiva-com-conforto-e-confianca/":
    "/blog/philips-hearlink-50-minirite-sua-nova-experiencia-sonora-com-a-auditik/",
  "/nao-e-apenas-distracao-5-sinais-cotidianos-de-que-sua-audicao-esta-pedindo-ajuda/":
    "/como-saber-se-precisa-de-aparelho-auditivo/",
  "/philips/": "/aparelhos-auditivos-philips-hearing-solutions/",
  "/philips-hearlink/": "/aparelhos-auditivos-philips-hearing-solutions/",
};

/** Old WordPress archive prefixes; everything under them → BLOG_PATH. */
var ARCHIVE_PREFIXES = ["/tag/", "/category/", "/author/"];
var BLOG_PATH = "/blog/";

function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var host = getHost(request);

  var redirectTarget = getRedirectTarget(normalizePagePath(uri));
  if (redirectTarget) {
    return redirectResponse(
      "https://" + APEX_HOST + redirectTarget + buildQueryString(request),
    );
  }

  if (host === WWW_HOST) {
    return redirectResponse(
      "https://" + APEX_HOST + ensurePageTrailingSlash(uri) + buildQueryString(request),
    );
  }

  if (shouldPassThrough(uri)) {
    return request;
  }

  if (uri.endsWith("/index.html")) {
    return request;
  }

  if (uri.endsWith("/")) {
    request.uri = uri + "index.html";
  } else {
    request.uri = uri + "/index.html";
  }

  return request;
}

function getRedirectTarget(pagePath) {
  var legacyTarget = LEGACY_REDIRECTS[pagePath];
  if (legacyTarget) {
    return legacyTarget;
  }
  for (var i = 0; i < ARCHIVE_PREFIXES.length; i++) {
    if (pagePath.indexOf(ARCHIVE_PREFIXES[i]) === 0) {
      return BLOG_PATH;
    }
  }
  return "";
}

function getHost(request) {
  var header = request.headers && request.headers.host;
  if (!header || !header.value) {
    return "";
  }
  return header.value.toLowerCase();
}

function redirectResponse(location) {
  return {
    statusCode: 301,
    statusDescription: "Moved Permanently",
    headers: {
      location: { value: location },
    },
  };
}

/**
 * Rebuild ?a=1&b=2 from CloudFront Functions querystring object.
 * Lead attribution (utm_*, fbclid) must survive www→apex and legacy redirects.
 */
function buildQueryString(request) {
  var qs = request.querystring;
  if (!qs) {
    return "";
  }

  var keys = Object.keys(qs);
  if (keys.length === 0) {
    return "";
  }

  var parts = [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var item = qs[key];
    if (item.multiValue) {
      for (var j = 0; j < item.multiValue.length; j++) {
        parts.push(
          encodeURIComponent(key) +
            "=" +
            encodeURIComponent(item.multiValue[j].value),
        );
      }
    } else if (item.value !== undefined) {
      parts.push(
        encodeURIComponent(key) + "=" + encodeURIComponent(item.value),
      );
    }
  }

  return parts.length > 0 ? "?" + parts.join("&") : "";
}

/** Normalize URI to a page path with trailing slash for LEGACY_REDIRECTS lookup. */
function normalizePagePath(uri) {
  var path = uri.split("?")[0];
  if (!path || path === "/") {
    return "/";
  }
  if (path.charAt(path.length - 1) !== "/") {
    path = path + "/";
  }
  return path;
}

/** Ensure page routes have a trailing slash; leave asset-like paths alone. */
function ensurePageTrailingSlash(uri) {
  var path = uri.split("?")[0];
  if (!path || path === "/") {
    return "/";
  }
  if (shouldPassThrough(path)) {
    return path;
  }
  if (path.charAt(path.length - 1) !== "/") {
    return path + "/";
  }
  return path;
}

function shouldPassThrough(uri) {
  if (uri.indexOf("/_next") === 0) {
    return true;
  }

  var path = uri.split("?")[0];
  if (path.length > 1 && path.charAt(path.length - 1) === "/") {
    path = path.substring(0, path.length - 1);
  }
  var parts = path.split("/");
  var last = parts[parts.length - 1] || "";

  return /\.(html|htm|ico|png|jpg|jpeg|gif|webp|svg|avif|css|js|map|json|txt|xml|woff2?|ttf|eot|pdf|webmanifest)$/i.test(
    last,
  );
}
