import { NextSeo } from "next-seo";
import { getSEOMeta } from "@lib/seo";
import { generateArticleSchema } from "@lib/schema";
import Head from "next/head";
import Link from "next/link";
import type { GetStaticProps, GetStaticPaths } from "next";
import { useState } from "react";

// Blog functions import - only used in getStaticProps/getStaticPaths (server-side)
const getBlogPostBySlug = async (slug: string) => {
  const { getBlogPostBySlug: loadBlogPostBySlug } = await import("@lib/blog");
  return loadBlogPostBySlug(slug);
};

const getAllBlogSlugs = async () => {
  const { getAllBlogSlugs: loadAllBlogSlugs } = await import("@lib/blog");
  return loadAllBlogSlugs();
};

const getAllBlogPosts = async () => {
  const { getAllBlogPosts: loadAllBlogPosts } = await import("@lib/blog");
  return loadAllBlogPosts();
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
  content: string;
}

interface BlogPostPageProps {
  post: BlogPost | null;
  relatedPosts: BlogPost[];
}

export default function BlogPostPage({ post, relatedPosts }: BlogPostPageProps) {
  if (!post) {
    return (
      <main className="page-section">
        <div className="container-wide text-center">
          <h1>Artigo não encontrado</h1>
          <Link href="/blog">
            <a className="text-auditik-blue hover:text-auditik-dark-blue font-bold">
              ← Voltar ao blog
            </a>
          </Link>
        </div>
      </main>
    );
  }

  const seo = getSEOMeta({
    title: post.title,
    description: post.description,
  });

  const articleSchema = generateArticleSchema({
    headline: post.title,
    description: post.description,
    image: post.featuredImage,
    datePublished: post.date,
    author: post.author,
    keywords: [post.category],
  });

  return (
    <>
      <NextSeo {...seo} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>
      <main>
        {/* Hero Section */}
        <section className="page-section hero-gradient">
          <div className="container-wide">
            <Link href="/blog">
              <a className="text-auditik-blue hover:text-auditik-dark-blue font-bold mb-4 inline-block">
                ← Voltar
              </a>
            </Link>
            <h1>{post.title}</h1>
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
              <span>Por {post.author}</span>
              <span>{formatDate(post.date)}</span>
              <span>{post.readTime} min de leitura</span>
              <span className="bg-auditik-yellow px-2 py-1 rounded text-auditik-dark-blue font-bold">
                {post.category}
              </span>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {post.featuredImage && (
          <section className="py-0">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          </section>
        )}

        {/* Article Content */}
        <section className="page-section">
          <div className="container-wide grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <article className="md:col-span-2 prose prose-lg max-w-none">
              <div
                className="prose prose-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            {/* Sidebar */}
            <aside>
              <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
                <h3 className="font-bold text-lg mb-4">Informações</h3>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="font-bold text-gray-700">Publicado em</dt>
                    <dd className="text-gray-600">{formatDate(post.date)}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-gray-700">Autor</dt>
                    <dd className="text-gray-600">{post.author}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-gray-700">Categoria</dt>
                    <dd>
                      <Link href={`/blog?category=${post.category}`}>
                        <a className="text-auditik-blue hover:text-auditik-dark-blue">
                          {post.category}
                        </a>
                      </Link>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-gray-700">Tempo de leitura</dt>
                    <dd className="text-gray-600">{post.readTime} minutos</dd>
                  </div>
                </dl>

                {/* CTA */}
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-600 mb-4">
                    Tem dúvidas sobre saúde auditiva? Entre em contato conosco!
                  </p>
                  <Link href="/contato">
                    <a className="cta-button-primary w-full text-center">
                      Fale Conosco
                    </a>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="page-section bg-gray-50">
            <div className="container-wide">
              <h2>Artigos Relacionados</h2>
              <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.slug}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {relatedPost.featuredImage && (
                      <div className="w-full h-40 bg-gray-100">
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {relatedPost.description}
                      </p>
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <a className="text-auditik-blue hover:text-auditik-dark-blue font-bold text-sm">
                          Ler mais →
                        </a>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const slugs = await getAllBlogSlugs();

    return {
      paths: slugs.map((slug) => ({
        params: { slug },
      })),
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error loading blog slugs:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const post = await getBlogPostBySlug(slug);
    const allPosts = await getAllBlogPosts();

    if (!post) {
      return {
        notFound: true,
      };
    }

    // Get related posts from same category
    const relatedPosts = allPosts
      .filter((p) => p.category === post.category && p.slug !== slug)
      .slice(0, 3);

    return {
      props: {
        post,
        relatedPosts,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error loading blog post:", error);
    return {
      notFound: true,
    };
  }
};
