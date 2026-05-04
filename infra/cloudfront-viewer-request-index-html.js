/**
 * CloudFront Functions — viewer-request
 *
 * Use this when the origin is an S3 REST API bucket (OAI/OAC) and the site is a Next.js
 * static export with trailingSlash: true (each route is `some/path/index.html`).
 *
 * Without this rewrite, a refresh on `/contato/` asks S3 for the object key `contato/`,
 * which does not exist — S3 returns an XML AccessDenied error. This maps directory URLs to
 * the real object key `.../index.html`.
 *
 * Attach in CloudFront: Behaviors → Edit default (and others as needed) → Function
 * associations → Viewer request → CloudFront function → Publish this code.
 */
function handler(event) {
  var request = event.request;
  var uri = request.uri;

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
