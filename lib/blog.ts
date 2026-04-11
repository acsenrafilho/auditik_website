import fs from "fs";
import path from "path";

import matter from "gray-matter";
import MarkdownIt from "markdown-it";

export interface BlogTopicOption {
  value: string;
  label: string;
}

export const BLOG_TOPICS = [
  { value: "perda-auditiva", label: "Perda auditiva e sinais de alerta" },
  { value: "diagnostico-avaliacao", label: "Diagnóstico e avaliação auditiva" },
  {
    value: "aparelhos-philips-hearlink",
    label: "Aparelhos auditivos Philips HearLink",
  },
  { value: "tecnologia-conectividade", label: "Tecnologia, IA e conectividade" },
  { value: "adaptacao-manutencao", label: "Adaptação, uso e manutenção" },
  { value: "acessorios-carregamento", label: "Acessórios e carregamento" },
  { value: "convenios-acesso", label: "Convênios e acesso ao tratamento" },
  {
    value: "depoimentos-qualidade-de-vida",
    label: "Depoimentos e qualidade de vida",
  },
  { value: "duvidas-frequentes", label: "Dúvidas frequentes e mitos" },
  { value: "novidades-promocoes", label: "Promoções e novidades da marca" },
] as const satisfies readonly BlogTopicOption[];

export type BlogTopicValue = (typeof BLOG_TOPICS)[number]["value"];

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  topics: string[];
  topicLabels: string[];
  featuredImage?: string;
  content: string;
  excerpt: string;
  readTime: number;
  featured: boolean;
  searchText: string;
}

const postsDirectory = path.join(process.cwd(), "content/blog");
const markdownRenderer = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
  typographer: true,
});

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toTitleCase(value: string): string {
  return value
    .replace(/[-_]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getTopicMatch(value: string): BlogTopicOption | undefined {
  const normalized = normalizeText(value);

  return BLOG_TOPICS.find(
    (topic) => topic.value === normalized || normalizeText(topic.label) === normalized,
  );
}

export function getBlogTopicLabel(value: string): string {
  return getTopicMatch(value)?.label || toTitleCase(value);
}

export function getAllBlogTopics(): BlogTopicOption[] {
  return [...BLOG_TOPICS];
}

function normalizeTopics(value: unknown): string[] {
  const rawValues = Array.isArray(value)
    ? value
    : typeof value === "string"
    ? value.split(",")
    : [];

  const normalizedValues = rawValues
    .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
    .filter(Boolean)
    .map((entry) => {
      const matchedTopic = getTopicMatch(entry);
      return matchedTopic ? matchedTopic.value : normalizeText(entry);
    });

  return Array.from(new Set(normalizedValues));
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function renderPlainText(content: string): string {
  return stripHtml(markdownRenderer.render(content));
}

function createExcerpt(text: string, maxLength = 180): string {
  if (!text) {
    return "";
  }

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}...`;
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

function getPrimaryTopic(topics: string[], fallbackCategory?: unknown): string {
  if (topics.length > 0) {
    return topics[0];
  }

  if (typeof fallbackCategory === "string" && fallbackCategory.trim()) {
    return normalizeText(fallbackCategory);
  }

  return BLOG_TOPICS[0].value;
}

function buildBlogPost(fileName: string, fileContents: string): BlogPost {
  const slug = fileName.replace(/\.mdx?$/, "").replace(/^\./, "");
  const { data, content } = matter(fileContents);
  const topics = normalizeTopics(data.topics ?? data.topic ?? data.category);
  const primaryTopic = getPrimaryTopic(topics, data.category);
  const topicLabels = (topics.length > 0 ? topics : [primaryTopic]).map((topic) =>
    getBlogTopicLabel(topic),
  );
  const plainText = renderPlainText(content);
  const description = typeof data.description === "string" ? data.description : "";
  const excerpt = description || createExcerpt(plainText);
  const normalizedContent = content.trim();

  return {
    slug,
    title:
      typeof data.title === "string" && data.title.trim() ? data.title : "Untitled",
    description,
    author:
      typeof data.author === "string" && data.author.trim() ? data.author : "Auditik",
    date:
      typeof data.date === "string" && data.date.trim()
        ? data.date
        : new Date().toISOString(),
    category: getBlogTopicLabel(primaryTopic),
    topics,
    topicLabels,
    featuredImage:
      typeof data.featuredImage === "string" ? data.featuredImage : undefined,
    content: normalizedContent,
    excerpt,
    readTime: calculateReadTime(plainText),
    featured: Boolean(data.featured),
    searchText: [
      data.title,
      data.description,
      data.author,
      primaryTopic,
      ...topicLabels,
      plainText,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  };
}

function getMarkdownFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .filter((fileName) => !fileName.startsWith(".template"));
}

/**
 * Get all blog posts, sorted by date (newest first)
 */
export function getAllBlogPosts(): BlogPost[] {
  const allPostsData = getMarkdownFiles().map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    return buildBlogPost(fileName, fileContents);
  });

  return allPostsData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/**
 * Get a single blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(postsDirectory)) {
    return null;
  }

  const fileName = getMarkdownFiles().find(
    (entry) => entry.replace(/\.mdx?$/, "") === slug,
  );

  if (!fileName) {
    return null;
  }

  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return buildBlogPost(fileName, fileContents);
}

/**
 * Get all post slugs (for static generation)
 */
export function getAllBlogSlugs(): string[] {
  return getMarkdownFiles()
    .map((fileName) => fileName.replace(/\.mdx?$/, ""))
    .filter((slug) => slug !== "template");
}

/**
 * Get posts by category or topic value
 */
export function getPostsByCategory(category: string): BlogPost[] {
  const normalizedCategory = normalizeText(category);

  return getAllBlogPosts().filter((post) => {
    return (
      normalizeText(post.category) === normalizedCategory ||
      post.topics.some((topic) => topic === normalizedCategory)
    );
  });
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  return getAllBlogTopics().map((topic) => topic.label);
}

/**
 * Render markdown content to HTML for post pages
 */
export function renderMarkdownToHtml(content: string): string {
  return markdownRenderer.render(content);
}

/**
 * Format date to readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
