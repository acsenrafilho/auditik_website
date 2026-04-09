import { NextSeo } from "next-seo";
import { getSEOMeta } from "@lib/seo";
import { generateArticleSchema } from "@lib/schema";
import Link from "next/link";
import { useState } from "react";
import Head from "next/head";
import type { GetStaticProps } from "next";

// Blog functions import - only used in getStaticProps (server-side)
// This prevents trying to bundle fs module on the client
const getAllBlogPosts = async () => {
  const { getAllBlogPosts: loadAllBlogPosts } = await import("@lib/blog");
  return loadAllBlogPosts();
};

const getAllCategories = async () => {
  const { getAllCategories: loadAllCategories } = await import("@lib/blog");
  return loadAllCategories();
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  featuredImage?: string;
  readTime?: number;
}

interface BlogIndexProps {
  posts: BlogPost[];
  categories: string[];
}

export default function BlogIndexPage({ posts, categories }: BlogIndexProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  const seo = getSEOMeta({
    title: "Blog - Auditik",
    description:
      "Leia artigos sobre saúde auditiva, aparelhos auditivos Philips HearLink e dicas para cuidar da audição.",
  });

  return (
    <>
      <NextSeo {...seo} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "Blog - Auditik",
              description: "Blog sobre saúde auditiva e aparelhos auditivos",
              url: "https://auditik.com.br/blog",
            }),
          }}
        />
      </Head>
      <main>
        {/* Hero Section */}
        <section className="page-section hero-gradient">
          <div className="container-wide">
            <h1>Blog Auditik</h1>
            <p>Artigos sobre saúde auditiva e bem-estar</p>
          </div>
        </section>

        {/* Main Content */}
        <section className="page-section">
          <div className="container-wide">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Sidebar - Categories */}
              <aside className="md:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
                  <h3 className="font-bold text-lg mb-4">Categorias</h3>
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={`text-left w-full px-3 py-2 rounded ${
                          selectedCategory === null
                            ? "bg-auditik-blue text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        Todos ({posts.length})
                      </button>
                    </li>
                    {categories.map((category) => {
                      const count = posts.filter((p) => p.category === category).length;
                      return (
                        <li key={category}>
                          <button
                            onClick={() => setSelectedCategory(category)}
                            className={`text-left w-full px-3 py-2 rounded ${
                              selectedCategory === category
                                ? "bg-auditik-blue text-white"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            {category} ({count})
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </aside>

              {/* Blog Posts Grid */}
              <div className="md:col-span-3">
                {filteredPosts.length > 0 ? (
                  <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredPosts.map((post) => (
                      <article
                        key={post.slug}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        {post.featuredImage && (
                          <div className="w-full h-40 bg-gray-100">
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs bg-auditik-yellow px-2 py-1 rounded text-auditik-dark-blue font-bold">
                              {post.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              {post.readTime} min de leitura
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {post.description}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <span>Por {post.author}</span>
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <Link href={`/blog/${post.slug}`}>
                            <a className="text-auditik-blue hover:text-auditik-dark-blue font-bold">
                              Ler mais →
                            </a>
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <p className="text-gray-600">
                      Nenhum artigo encontrado nesta categoria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  try {
    const posts = await getAllBlogPosts();
    const categories = await getAllCategories();

    return {
      props: {
        posts,
        categories,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error("Error loading blog posts:", error);
    // Return empty props if blog fails to load
    return {
      props: {
        posts: [],
        categories: [],
      },
      revalidate: 300, // Try again in 5 minutes
    };
  }
};
