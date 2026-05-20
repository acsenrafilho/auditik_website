import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://auditik.com.br";
const ROOT = process.cwd();

const staticPaths = [
  "",
  "/nossa-clinica",
  "/aparelhos",
  "/aparelhos-auditivos-em-piracicaba",
  "/preco-aparelho-auditivo",
  "/financiamento-aparelho-auditivo",
  "/aparelho-auditivo-invisivel",
  "/aparelho-auditivo-recarregavel",
  "/convenios",
  "/blog",
  "/contato",
  "/faq",
  "/politica-de-privacidade",
];

/** Routes with custom sitemap priority (default 0.7). */
const staticPathPriority = {
  "/aparelhos-auditivos-em-piracicaba": "0.8",
  "/preco-aparelho-auditivo": "0.8",
  "/financiamento-aparelho-auditivo": "0.8",
  "/aparelho-auditivo-invisivel": "0.8",
  "/aparelho-auditivo-recarregavel": "0.8",
};

const getSlugsFromDir = async (relativeDir) => {
  const fullDir = path.join(ROOT, relativeDir);
  const files = await readdir(fullDir, { withFileTypes: true });

  return files
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name.replace(/\.md$/, ""))
    .filter((slug) => slug !== "index");
};

const toUrlNode = (route, nowIso, priority, changefreq) => `
  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

const run = async () => {
  const nowIso = new Date().toISOString();
  const blogSlugs = await getSlugsFromDir("content/blog");
  const convenioSlugs = await getSlugsFromDir("content/convenios");

  const nodes = [
    ...staticPaths.map((route) =>
      toUrlNode(
        route,
        nowIso,
        route === "" ? "1.0" : (staticPathPriority[route] ?? "0.7"),
        "weekly",
      ),
    ),
    ...blogSlugs.map((slug) => toUrlNode(`/blog/${slug}`, nowIso, "0.7", "weekly")),
    ...convenioSlugs.map((slug) =>
      toUrlNode(`/convenios/${slug}`, nowIso, "0.7", "weekly"),
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${nodes.join("")}
</urlset>
`;

  const outputPath = path.join(ROOT, "public", "sitemap.xml");
  await writeFile(outputPath, xml, "utf8");
  // eslint-disable-next-line no-console
  console.log(`Sitemap generated at ${outputPath}`);
};

run().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Failed to generate sitemap:", error);
  process.exit(1);
});
