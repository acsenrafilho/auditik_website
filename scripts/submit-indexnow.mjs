/**
 * Submit all sitemap URLs to IndexNow after deploy.
 *
 * Env:
 *   INDEXNOW_KEY   (required) — ownership key; must also be hosted at /{key}.txt
 *   SITEMAP_PATH   (optional) — default ./out/sitemap.xml
 *   INDEXNOW_ENDPOINT (optional) — default https://api.indexnow.org/indexnow
 *
 * Groups URLs by host and POSTs one request per host (apex + www if both appear).
 */
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DEFAULT_SITEMAP = path.join(ROOT, "out", "sitemap.xml");
const ENDPOINT =
  process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";

function extractLocUrls(sitemapXml) {
  const urls = [];
  const locRegex = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;
  let match;
  while ((match = locRegex.exec(sitemapXml)) !== null) {
    urls.push(match[1].trim());
  }
  return [...new Set(urls)];
}

function groupByHost(urls) {
  /** @type {Map<string, string[]>} */
  const groups = new Map();

  for (const url of urls) {
    let host;
    try {
      host = new URL(url).host;
    } catch {
      console.warn(`Skipping invalid sitemap URL: ${url}`);
      continue;
    }

    const list = groups.get(host) ?? [];
    list.push(url);
    groups.set(host, list);
  }

  return groups;
}

async function submitHost(host, key, urlList) {
  const keyLocation = `https://${host}/${key}.txt`;
  const payload = {
    host,
    key,
    keyLocation,
    urlList,
  };

  console.log(
    `IndexNow: submitting ${urlList.length} URL(s) for host=${host} keyLocation=${keyLocation}`,
  );

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const bodyText = await response.text().catch(() => "");
  const ok = response.status === 200 || response.status === 202;

  if (ok) {
    console.log(
      `IndexNow: success for ${host} (HTTP ${response.status})${bodyText ? ` — ${bodyText.slice(0, 200)}` : ""}`,
    );
    return true;
  }

  console.error(
    `IndexNow: failed for ${host} (HTTP ${response.status})${bodyText ? ` — ${bodyText.slice(0, 500)}` : ""}`,
  );
  return false;
}

async function run() {
  const key = process.env.INDEXNOW_KEY?.trim();
  if (!key) {
    console.error("INDEXNOW_KEY is missing or empty.");
    process.exit(1);
  }

  if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) {
    console.error(
      "INDEXNOW_KEY must be 8–128 characters (letters, digits, hyphen only).",
    );
    process.exit(1);
  }

  const sitemapPath = process.env.SITEMAP_PATH
    ? path.resolve(process.env.SITEMAP_PATH)
    : DEFAULT_SITEMAP;

  if (!existsSync(sitemapPath)) {
    console.error(`Sitemap not found at ${sitemapPath}`);
    process.exit(1);
  }

  const sitemapXml = readFileSync(sitemapPath, "utf8");
  const urls = extractLocUrls(sitemapXml);

  if (urls.length === 0) {
    console.error(`No <loc> URLs found in ${sitemapPath}`);
    process.exit(1);
  }

  console.log(`IndexNow: parsed ${urls.length} URL(s) from ${sitemapPath}`);

  const byHost = groupByHost(urls);
  let allOk = true;

  for (const [host, urlList] of byHost) {
    const ok = await submitHost(host, key, urlList);
    if (!ok) {
      allOk = false;
    }
  }

  if (!allOk) {
    process.exit(1);
  }

  console.log("IndexNow: all host submissions succeeded.");
}

run().catch((error) => {
  console.error("IndexNow: unexpected error:", error);
  process.exit(1);
});
