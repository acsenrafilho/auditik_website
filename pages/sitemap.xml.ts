import { GetServerSideProps } from "next";

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://auditik.com.br</loc>
        <lastmod>2024-04-09T00:00:00Z</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://auditik.com.br/nossa-clinica</loc>
        <lastmod>2024-04-09T00:00:00Z</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://auditik.com.br/aparelhos</loc>
        <lastmod>2024-04-09T00:00:00Z</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://auditik.com.br/convenios</loc>
        <lastmod>2024-04-09T00:00:00Z</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://auditik.com.br/blog</loc>
        <lastmod>2024-04-09T00:00:00Z</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
      <url>
        <loc>https://auditik.com.br/contato</loc>
        <lastmod>2024-04-09T00:00:00Z</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    </urlset>
  `;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSiteMap();

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
