import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";

import { Header } from "@components/Header";
import { trackButtonClick } from "@lib/analytics";
import { generateArticleSchema } from "@lib/schema";
import { getSEOMeta } from "@lib/seo";
import type { BlogPost } from "@lib/blog";

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

const renderMarkdownToHtml = async (content: string) => {
  const { renderMarkdownToHtml: loadRenderer } = await import("@lib/blog");
  return loadRenderer(content);
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

interface BlogPostPageProps {
  post: BlogPost | null;
  relatedPosts: BlogPost[];
  contentHtml: string;
}

export default function BlogPostPage({
  post,
  relatedPosts,
  contentHtml,
}: BlogPostPageProps) {
  if (!post) {
    return (
      <main className="page-section">
        <div className="container-wide text-center">
          <h1>Artigo não encontrado</h1>
          <Link
            href="/blog"
            className="text-auditik-blue hover:text-auditik-dark-blue font-bold"
          >
            ← Voltar ao blog
          </Link>
        </div>
      </main>
    );
  }

  const seo = getSEOMeta({
    title: post.title,
    description: post.description || post.excerpt,
    ogImage: post.featuredImage,
  });

  const articleSchema = generateArticleSchema({
    headline: post.title,
    description: post.description || post.excerpt,
    image: post.featuredImage,
    datePublished: post.date,
    author: post.author,
    keywords: [...post.topics, post.category],
  });

  const mainTopicLabel = post.topicLabels[0] || post.category;

  return (
    <>
      <NextSeo {...seo} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>
      <Header />
      <main>
        <section className="hero-gradient relative overflow-hidden py-16 md:py-24">
          <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-[-5%] right-[5%] w-96 h-96 bg-auditik-yellow/20 rounded-full blur-3xl" />

          <div className="container-wide relative z-10 max-w-4xl">
            <Link
              href="/blog"
              className="text-auditik-blue hover:text-auditik-dark-blue font-bold mb-6 inline-flex items-center gap-2"
            >
              ← Voltar
            </Link>
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {post.topicLabels.map((topicLabel) => (
                <span
                  key={topicLabel}
                  className="rounded-full bg-auditik-yellow px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-auditik-dark-blue"
                >
                  {topicLabel}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.05] max-w-4xl mb-6">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mb-8">
              {post.description || post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <span>Por {post.author}</span>
              <span>{formatDate(post.date)}</span>
              <span>{post.readTime} min de leitura</span>
              <span className="bg-auditik-blue text-white px-3 py-1 rounded-full font-bold">
                {mainTopicLabel}
              </span>
            </div>
          </div>
        </section>

        {post.featuredImage && (
          <section className="py-0">
            <div className="relative w-full h-[360px] md:h-[520px] bg-slate-100">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </section>
        )}

        <section className="py-16 md:py-20 bg-white">
          <div className="container-wide grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
            <article className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-auditik-blue prose-strong:text-slate-900">
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </article>

            <aside>
              <div className="bg-bg-light-blue p-6 rounded-[2rem] sticky top-4 border border-blue-50">
                <h3 className="font-bold text-lg mb-4 text-slate-900">Informações</h3>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="font-bold text-slate-700">Publicado em</dt>
                    <dd className="text-slate-600">{formatDate(post.date)}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-700">Autor</dt>
                    <dd className="text-slate-600">{post.author}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-700">Tema principal</dt>
                    <dd className="text-slate-600">{mainTopicLabel}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-700">Tempo de leitura</dt>
                    <dd className="text-slate-600">{post.readTime} minutos</dd>
                  </div>
                </dl>

                <div className="mt-6 pt-6 border-t border-blue-100">
                  <p className="text-sm text-slate-600 mb-4">
                    Tem dúvidas sobre saúde auditiva? Fale com a equipe Auditik.
                  </p>
                  <Link
                    href="/contato"
                    className="cta-button-primary w-full text-center"
                  >
                    Fale Conosco
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="py-20 bg-bg-light-blue">
            <div className="container-wide">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-10">
                Artigos relacionados
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.slug}
                    className="bg-white rounded-[1.75rem] border border-white shadow-lg shadow-slate-900/5 overflow-hidden"
                  >
                    {relatedPost.featuredImage ? (
                      <div className="relative h-44 bg-slate-100">
                        <Image
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="h-44 bg-gradient-to-br from-auditik-blue/10 to-auditik-yellow/20" />
                    )}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {relatedPost.topicLabels.slice(0, 2).map((topicLabel) => (
                          <span
                            key={topicLabel}
                            className="rounded-full bg-auditik-yellow px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-auditik-dark-blue"
                          >
                            {topicLabel}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-extrabold text-xl mb-2 text-slate-900 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-slate-600 mb-4 line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="text-auditik-blue hover:text-auditik-dark-blue font-bold"
                      >
                        Ler mais →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-20 bg-auditik-blue text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.35),_transparent_55%)]" />
          <div className="container-wide relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Próximo passo
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 max-w-2xl">
                Quer entender qual solução auditiva faz sentido para você?
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                A equipe Auditik pode ajudar com avaliação, orientação e acompanhamento.
                Fale conosco antes de decidir sozinho.
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:justify-self-end lg:min-w-[320px]">
              <Link
                href="/contato"
                onClick={() =>
                  trackButtonClick("blog_article_cta_contact", {
                    section: "blog_article_cta",
                    topic: post.category,
                  })
                }
                className="bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-4 px-8 rounded-full text-center transition-colors"
              >
                Agendar avaliação
              </Link>
              <a
                href="https://wa.me/551933776941?text=Ol%C3%A1%20Auditik,%20li%20um%20artigo%20no%20blog%20e%20quero%20conversar%20sobre%20audi%C3%A7%C3%A3o%20e%20aparelhos%20Philips%20HearLink."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackButtonClick("blog_article_cta_whatsapp", {
                    section: "blog_article_cta",
                    topic: post.category,
                  })
                }
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full text-center border border-white/20 transition-colors"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </section>
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

    const relatedPosts = allPosts
      .filter((candidate) => candidate.slug !== slug)
      .map((candidate) => ({
        candidate,
        score: candidate.topics.filter((topic) => post.topics.includes(topic)).length,
      }))
      .filter(({ score }) => score > 0)
      .sort((left, right) => right.score - left.score)
      .slice(0, 3)
      .map(({ candidate }) => candidate);

    const contentHtml = await renderMarkdownToHtml(post.content);

    return {
      props: {
        post,
        relatedPosts,
        contentHtml,
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
