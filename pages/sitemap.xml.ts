import { GetServerSideProps } from "next";

import { getAllConvenioSlugs } from "@lib/convenios";

function generateSiteMap(convenioSlugs: string[]) {
  const now = new Date().toISOString();
  const convenioDetailUrls = convenioSlugs
    .map(
      (slug) => `
      <url>
        <loc>https://auditik.com.br/convenios/${slug}</loc>
        <lastmod>${now}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://auditik.com.br</loc>
        <lastmod>${now}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://auditik.com.br/nossa-clinica</loc>
        <lastmod>${now}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://auditik.com.br/aparelhos</loc>
        <lastmod>${now}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://auditik.com.br/convenios</loc>
        <lastmod>${now}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
      ${convenioDetailUrls}
      <url>
        <loc>https://auditik.com.br/blog</loc>
        <lastmod>${now}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
      <url>
        <loc>https://auditik.com.br/contato</loc>
        <lastmod>${now}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    </urlset>
  `;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const convenioSlugs = getAllConvenioSlugs();
  const sitemap = generateSiteMap(convenioSlugs);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default function Sitemap() {
  return null;
}
