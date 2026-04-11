import { NextSeo } from "next-seo";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import type { GetStaticProps } from "next";

import { Header } from "@components/Header";
import { trackButtonClick } from "@lib/analytics";
import { getSEOMeta } from "@lib/seo";
import type { BlogPost, BlogTopicOption } from "@lib/blog";

const getAllBlogPosts = async () => {
  const { getAllBlogPosts: loadAllBlogPosts } = await import("@lib/blog");
  return loadAllBlogPosts();
};

const getAllBlogTopics = async () => {
  const { getAllBlogTopics: loadAllBlogTopics } = await import("@lib/blog");
  return loadAllBlogTopics();
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

interface BlogIndexProps {
  posts: BlogPost[];
  topics: BlogTopicOption[];
}

function normalizeSearchValue(value: string): string {
  return value.trim().toLowerCase();
}

export default function BlogIndexPage({ posts, topics }: BlogIndexProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const querySearch = typeof router.query.q === "string" ? router.query.q : "";
    const queryTopic =
      typeof router.query.topic === "string" ? router.query.topic : "all";
    const topicExists = topics.some((topic) => topic.value === queryTopic);

    setSearchTerm(querySearch);
    setSelectedTopic(topicExists ? queryTopic : "all");
  }, [router.isReady, router.query.q, router.query.topic, topics]);

  const syncFilters = (nextSearch: string, nextTopic: string) => {
    if (!router.isReady) {
      return;
    }

    const query: Record<string, string> = {};

    if (nextSearch.trim()) {
      query.q = nextSearch.trim();
    }

    if (nextTopic !== "all") {
      query.topic = nextTopic;
    }

    void router.replace({ pathname: router.pathname, query }, undefined, {
      shallow: true,
      scroll: false,
    });
  };

  const filteredPosts = useMemo(() => {
    const normalizedSearch = normalizeSearchValue(searchTerm);

    return posts.filter((post) => {
      const matchesTopic =
        selectedTopic === "all" || post.topics.includes(selectedTopic);
      const matchesSearch =
        !normalizedSearch || post.searchText.includes(normalizedSearch);

      return matchesTopic && matchesSearch;
    });
  }, [posts, searchTerm, selectedTopic]);

  const topicStats = useMemo(
    () =>
      topics.map((topic) => ({
        ...topic,
        count: posts.filter((post) => post.topics.includes(topic.value)).length,
      })),
    [posts, topics],
  );

  const seo = getSEOMeta({
    title: "Blog - Auditik",
    description:
      "Leia artigos sobre perda auditiva, aparelhos Philips HearLink, tecnologia, adaptação e cuidados com a audição.",
  });

  const hasActiveFilters = Boolean(searchTerm.trim()) || selectedTopic !== "all";

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
      <Header />
      <main>
        <section className="hero-gradient relative overflow-hidden py-16 md:py-24">
          <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-[-5%] right-[5%] w-96 h-96 bg-auditik-yellow/20 rounded-full blur-3xl" />

          <div className="container-wide relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-auditik-blue/10 text-auditik-blue rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Conteúdo para orientar sua decisão
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.05] mb-6 max-w-3xl">
                Blog Auditik sobre{" "}
                <span className="text-auditik-blue">
                  audição, tecnologia e cuidado real
                </span>
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
                Encontre artigos sobre sinais de perda auditiva, aparelhos Philips
                HearLink, adaptação, manutenção, convênios e tudo o que ajuda a tomar
                uma decisão mais segura.
              </p>
              <div className="grid gap-4 sm:grid-cols-[1fr_auto] max-w-2xl">
                <label className="block">
                  <span className="sr-only">Pesquisar artigos</span>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                      search
                    </span>
                    <input
                      type="search"
                      value={searchTerm}
                      onChange={(event) => {
                        const nextSearch = event.target.value;
                        setSearchTerm(nextSearch);
                        syncFilters(nextSearch, selectedTopic);
                      }}
                      placeholder="Pesquisar por tema, palavra-chave ou autor"
                      className="w-full rounded-full border border-white/70 bg-white/90 py-4 pl-14 pr-5 text-slate-900 shadow-xl shadow-slate-900/5 outline-none transition focus:border-auditik-blue focus:bg-white"
                    />
                  </div>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedTopic("all");
                    syncFilters("", "all");
                  }}
                  className={`rounded-full px-6 py-4 font-bold transition-colors ${
                    hasActiveFilters
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "bg-white/60 text-slate-400 cursor-default"
                  }`}
                >
                  Limpar filtros
                </button>
              </div>
            </div>

            <div className="bg-white/85 backdrop-blur rounded-[2rem] p-8 shadow-2xl shadow-slate-900/10 border border-white/60">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="rounded-3xl bg-bg-light-blue p-5">
                  <p className="text-3xl font-extrabold text-auditik-blue">
                    {posts.length}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">artigos publicados</p>
                </div>
                <div className="rounded-3xl bg-bg-light-blue p-5">
                  <p className="text-3xl font-extrabold text-auditik-blue">
                    {topicStats.length}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">temas especializados</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Use os filtros para afinar a leitura
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Os temas abaixo refletem a estrutura editorial do blog. Isso facilita
                  a manutenção do conteúdo no TinaCMS e torna a navegação mais
                  previsível para os visitantes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white border-b border-slate-100">
          <div className="container-wide">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">
                Temas do blog
              </h2>
              <p className="text-sm text-slate-500">
                {filteredPosts.length} de {posts.length} artigo(s) visível(is)
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedTopic("all");
                  syncFilters(searchTerm, "all");
                }}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  selectedTopic === "all"
                    ? "bg-auditik-blue text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Todos ({posts.length})
              </button>
              {topicStats.map((topic) => (
                <button
                  key={topic.value}
                  type="button"
                  onClick={() => {
                    setSelectedTopic(topic.value);
                    syncFilters(searchTerm, topic.value);
                    trackButtonClick("blog_topic_filter", {
                      section: "blog_index",
                      topic: topic.value,
                    });
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                    selectedTopic === topic.value
                      ? "bg-auditik-blue text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {topic.label} ({topic.count})
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-bg-light-blue">
          <div className="container-wide">
            {filteredPosts.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {filteredPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-white rounded-[2rem] overflow-hidden border border-white shadow-lg shadow-slate-900/5 transition-transform hover:-translate-y-1"
                  >
                    {post.featuredImage ? (
                      <div className="relative h-56 bg-slate-100">
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="h-56 bg-gradient-to-br from-auditik-blue/10 to-auditik-yellow/20" />
                    )}
                    <div className="p-7">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {post.topicLabels.slice(0, 2).map((topicLabel) => (
                          <span
                            key={topicLabel}
                            className="rounded-full bg-auditik-yellow px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-auditik-dark-blue"
                          >
                            {topicLabel}
                          </span>
                        ))}
                        {post.featured && (
                          <span className="rounded-full bg-auditik-blue/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-auditik-blue">
                            Destaque
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 mb-3 leading-tight line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed mb-5 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between gap-4 text-sm text-slate-500 mb-5">
                        <span>Por {post.author}</span>
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-semibold text-auditik-blue">
                          {post.readTime} min de leitura
                        </span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="font-bold text-slate-900 hover:text-auditik-blue transition-colors"
                        >
                          Ler artigo →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-12 text-center">
                <p className="text-xl font-bold text-slate-900 mb-3">
                  Nenhum artigo encontrado com esses filtros.
                </p>
                <p className="text-slate-600 mb-6 max-w-xl mx-auto">
                  Tente remover a busca, trocar o tema selecionado ou combinar uma
                  palavra-chave diferente para encontrar o conteúdo desejado.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedTopic("all");
                    syncFilters("", "all");
                  }}
                  className="cta-button-primary"
                >
                  Limpar filtros
                </button>
              </div>
            )}

            <section className="mt-20 bg-auditik-blue text-white rounded-[3rem] overflow-hidden relative">
              <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center p-10 md:p-14">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                    Precisa de orientação personalizada?
                  </span>
                  <h2 className="text-3xl md:text-5xl font-extrabold mb-4 max-w-2xl">
                    Quer ajuda para escolher o melhor caminho para sua audição?
                  </h2>
                  <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                    Fale com a equipe Auditik para tirar dúvidas, agendar uma avaliação
                    e entender qual solução faz sentido para o seu caso.
                  </p>
                </div>
                <div className="flex flex-col gap-4 lg:justify-self-end lg:min-w-[320px]">
                  <Link
                    href="/contato"
                    onClick={() =>
                      trackButtonClick("blog_index_cta_contact", {
                        section: "blog_index_cta",
                      })
                    }
                    className="bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-4 px-8 rounded-full text-center transition-colors"
                  >
                    Falar com a Auditik
                  </Link>
                  <a
                    href="https://wa.me/551933776941?text=Ol%C3%A1%20Auditik,%20gostaria%20de%20conversar%20sobre%20a%20audi%C3%A7%C3%A3o%20e%20os%20aparelhos%20Philips%20HearLink."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackButtonClick("blog_index_cta_whatsapp", {
                        section: "blog_index_cta",
                      })
                    }
                    className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full text-center border border-white/20 transition-colors"
                  >
                    Iniciar conversa no WhatsApp
                  </a>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  try {
    const posts = await getAllBlogPosts();
    const topics = await getAllBlogTopics();

    return {
      props: {
        posts,
        topics,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error loading blog posts:", error);

    return {
      props: {
        posts: [],
        topics: [],
      },
      revalidate: 300,
    };
  }
};
