import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  featuredImage?: string;
  content: string;
  readTime?: number;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

/**
 * Get all blog posts, sorted by date (newest first)
 */
export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName
        .replace(/\.mdx?$/, '')
        .replace(/^\./, ''); // Remove leading dots
      
      if (slug === 'template') return null; // Skip template file

      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        author: data.author || 'Auditik',
        date: data.date || new Date().toISOString(),
        category: data.category || 'Geral',
        featuredImage: data.featuredImage,
        content,
        readTime: calculateReadTime(content),
      } as BlogPost;
    })
    .filter((post) => post !== null) as BlogPost[];

  // Sort by date (newest first)
  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Get a single blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const fileNames = fs.readdirSync(postsDirectory);
  const fileName = fileNames.find((f) =>
    f.replace(/\.mdx?$/, '') === slug
  );

  if (!fileName) {
    return null;
  }

  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    author: data.author || 'Auditik',
    date: data.date || new Date().toISOString(),
    category: data.category || 'Geral',
    featuredImage: data.featuredImage,
    content,
    readTime: calculateReadTime(content),
  };
}

/**
 * Get all post slugs (for static generation)
 */
export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.mdx?$/, '').replace(/^\./, ''))
    .filter((slug) => slug !== 'template');
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter((post) =>
    post.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const posts = getAllBlogPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories).sort();
}

/**
 * Calculate estimated read time (minutes)
 */
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Format date to readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
