import { writeFile } from "node:fs/promises";
import path from "node:path";
import {
  SITE_URL,
  SATELLITE_SITE_URL,
  STATIC_ROUTES,
  SATELLITE_ROUTES,
  getBlogEntries,
  getConvenioEntries,
  toAbsoluteUrl,
} from "./lib/content-index.mjs";

const ROOT = process.cwd();

function toLastModIso(dateValue, fallbackIso) {
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) {
    return fallbackIso;
  }
  return parsed.toISOString();
}

function toUrlNode(loc, lastmod, priority, changefreq) {
  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function run() {
  const buildIso = new Date().toISOString();
  const blogEntries = getBlogEntries();
  const convenioEntries = getConvenioEntries();

  const nodes = [
    ...STATIC_ROUTES.map((route) =>
      toUrlNode(
        toAbsoluteUrl(SITE_URL, route.path),
        buildIso,
        route.priority,
        route.changefreq,
      ),
    ),
    ...SATELLITE_ROUTES.map((route) =>
      toUrlNode(
        toAbsoluteUrl(SATELLITE_SITE_URL, route.path),
        buildIso,
        route.priority,
        route.changefreq,
      ),
    ),
    ...blogEntries.map((entry) =>
      toUrlNode(entry.url, toLastModIso(entry.date, buildIso), "0.7", "weekly"),
    ),
    ...convenioEntries.map((entry) =>
      toUrlNode(entry.url, buildIso, "0.7", "weekly"),
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${nodes.join("")}
</urlset>
`;

  const outputPath = path.join(ROOT, "public", "sitemap.xml");
  await writeFile(outputPath, xml, "utf8");
  // eslint-disable-next-line no-console
  console.log(
    `Sitemap generated at ${outputPath} (${blogEntries.length} blog, ${convenioEntries.length} convênios)`,
  );
}

run().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Failed to generate sitemap:", error);
  process.exit(1);
});
