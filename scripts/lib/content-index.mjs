/**
 * Shared content indexing for sitemap.xml and llms.txt.
 *
 * New blog posts and convênios are picked up automatically on build.
 * New static landing pages must be added to STATIC_ROUTES below.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "content/blog");
const CONVENIOS_DIR = path.join(ROOT, "content/convenios");

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://auditik.com.br";
export const SATELLITE_SITE_URL = "https://www.auditik.com.br";

export function ensureTrailingSlash(route) {
  if (!route || route === "/" || route.endsWith("/") || route.includes(".")) {
    return route;
  }
  return `${route}/`;
}

export function toAbsoluteUrl(baseUrl, route) {
  const normalized = route.startsWith("/") ? route : `/${route}`;
  return `${baseUrl}${ensureTrailingSlash(normalized)}`;
}

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeSlug(value) {
  return normalizeText(value);
}

function getMarkdownFiles(directory) {
  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory).filter(
    (fileName) =>
      (fileName.endsWith(".md") || fileName.endsWith(".mdx")) &&
      !fileName.startsWith(".template") &&
      fileName !== "index.md",
  );
}

function createUniqueTitleSlugs(posts) {
  const slugCounts = new Map();

  return posts.map((post) => {
    const baseSlug = normalizeText(post.title) || "artigo";
    const currentCount = slugCounts.get(baseSlug) ?? 0;
    const nextCount = currentCount + 1;
    slugCounts.set(baseSlug, nextCount);

    return {
      ...post,
      slug: nextCount === 1 ? baseSlug : `${baseSlug}-${nextCount}`,
    };
  });
}

function buildBlogPost(fileName, fileContents) {
  const fileSlug = fileName.replace(/\.mdx?$/, "");
  const { data, content } = matter(fileContents);

  const title =
    typeof data.title === "string" && data.title.trim() ? data.title : "Untitled";
  const description =
    typeof data.description === "string" ? data.description.trim() : "";
  const date =
    typeof data.date === "string" && data.date.trim()
      ? data.date
      : new Date().toISOString();

  const plainText = content
    .replace(/[#>*_`[\]()!-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const excerpt =
    description ||
    (plainText.length <= 180 ? plainText : `${plainText.slice(0, 180).trimEnd()}...`);

  return {
    slug: fileSlug,
    title,
    description: description || excerpt,
    date,
    excerpt,
    author:
      typeof data.author === "string" && data.author.trim() ? data.author : "Auditik",
    featuredImage:
      typeof data.featuredImage === "string" ? data.featuredImage : undefined,
  };
}

export function getBlogEntries() {
  const posts = getMarkdownFiles(BLOG_DIR).map((fileName) => {
    const fileContents = readFileSync(path.join(BLOG_DIR, fileName), "utf8");
    return buildBlogPost(fileName, fileContents);
  });

  const slugAssignmentOrder = [...posts].sort((a, b) => {
    const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
    if (dateCompare !== 0) {
      return dateCompare;
    }
    return a.slug.localeCompare(b.slug);
  });

  const withSeoSlugs = createUniqueTitleSlugs(slugAssignmentOrder);

  return withSeoSlugs
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      path: `/blog/${post.slug}/`,
      url: toAbsoluteUrl(SITE_URL, `/blog/${post.slug}/`),
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function buildConvenioEntry(fileName, fileContents) {
  const fileSlug = fileName.replace(/\.mdx?$/, "");
  const { data } = matter(fileContents);

  const name =
    typeof data.name === "string" && data.name.trim() ? data.name.trim() : fileSlug;
  const slug =
    typeof data.slug === "string" && data.slug.trim()
      ? normalizeSlug(data.slug)
      : normalizeSlug(fileSlug);
  const description =
    typeof data.description === "string" && data.description.trim()
      ? data.description.trim()
      : "Benefício exclusivo para clientes Auditik.";

  return { slug, name, description };
}

export function getConvenioEntries() {
  return getMarkdownFiles(CONVENIOS_DIR)
    .map((fileName) => {
      const fileContents = readFileSync(path.join(CONVENIOS_DIR, fileName), "utf8");
      const entry = buildConvenioEntry(fileName, fileContents);
      return {
        slug: entry.slug,
        title: entry.name,
        description: entry.description,
        path: `/convenios/${entry.slug}/`,
        url: toAbsoluteUrl(SITE_URL, `/convenios/${entry.slug}/`),
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
}

/** Static routes on apex domain (auditik.com.br). */
export const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/nossa-clinica/", priority: "0.7", changefreq: "monthly" },
  { path: "/aparelhos/", priority: "0.8", changefreq: "weekly" },
  { path: "/convenios/", priority: "0.8", changefreq: "weekly" },
  { path: "/blog/", priority: "0.8", changefreq: "weekly" },
  { path: "/contato/", priority: "0.7", changefreq: "monthly" },
  { path: "/faq/", priority: "0.7", changefreq: "monthly" },
  { path: "/politica-de-privacidade/", priority: "0.3", changefreq: "yearly" },
];

/** Satellite landing pages on www.auditik.com.br. */
export const SATELLITE_ROUTES = [
  { path: "/aparelhos-auditivos-em-piracicaba/", priority: "0.8", changefreq: "monthly" },
  { path: "/preco-aparelho-auditivo/", priority: "0.8", changefreq: "monthly" },
  { path: "/financiamento-aparelho-auditivo/", priority: "0.8", changefreq: "monthly" },
  { path: "/aparelho-auditivo-invisivel/", priority: "0.8", changefreq: "monthly" },
  { path: "/aparelho-auditivo-recarregavel/", priority: "0.8", changefreq: "monthly" },
  { path: "/aparelho-auditivo-com-bluetooth/", priority: "0.8", changefreq: "monthly" },
  {
    path: "/aparelhos-auditivos-philips-hearing-solutions/",
    priority: "0.8",
    changefreq: "monthly",
  },
  { path: "/aparelho-auditivo-para-idosos/", priority: "0.8", changefreq: "monthly" },
  {
    path: "/como-saber-se-precisa-de-aparelho-auditivo/",
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/manutencao-e-ajuste-de-aparelho-auditivo/",
    priority: "0.8",
    changefreq: "monthly",
  },
];

export function truncateDescription(text, maxLength = 160) {
  if (!text) {
    return "";
  }
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength).trimEnd()}...`;
}
