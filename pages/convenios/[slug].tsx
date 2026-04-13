import { NextSeo } from "next-seo";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";

import { Header } from "@components/Header";
import { trackButtonClick } from "@lib/analytics";
import type { ConvenioPartner } from "@lib/convenios";
import { getSEOMeta } from "@lib/seo";

const getAllConvenioSlugs = async () => {
  const { getAllConvenioSlugs: loadAllConvenioSlugs } = await import("@lib/convenios");
  return loadAllConvenioSlugs();
};

const getConvenioPartnerBySlug = async (slug: string) => {
  const { getConvenioPartnerBySlug: loadConvenioPartnerBySlug } = await import(
    "@lib/convenios"
  );
  return loadConvenioPartnerBySlug(slug);
};

const getAllConvenioPartners = async () => {
  const { getAllConvenioPartners: loadAllConvenioPartners } = await import(
    "@lib/convenios"
  );
  return loadAllConvenioPartners();
};

const renderConvenioMarkdownToHtml = async (content: string) => {
  const { renderConvenioMarkdownToHtml: loadRenderer } = await import("@lib/convenios");
  return loadRenderer(content);
};

interface ConvenioPartnerPageProps {
  partner: ConvenioPartner | null;
  contentHtml: string;
  relatedPartners: ConvenioPartner[];
  photoGallery: string[];
}

function buildConvenioSchema(partner: ConvenioPartner) {
  const phoneDigits = partner.phone.replace(/\D/g, "");

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: partner.name,
    description: partner.description,
    url: `https://auditik.com.br/convenios/${partner.slug}`,
    logo: partner.logo ? `https://auditik.com.br${partner.logo}` : undefined,
    address: partner.address
      ? {
          "@type": "PostalAddress",
          streetAddress: partner.address,
          addressCountry: "BR",
        }
      : undefined,
    contactPoint: partner.phone
      ? {
          "@type": "ContactPoint",
          telephone: phoneDigits ? `+55${phoneDigits}` : partner.phone,
          contactType: "customer support",
          availableLanguage: ["Portuguese"],
        }
      : undefined,
    knowsAbout: [
      ...partner.cityLabels,
      ...partner.areaLabels,
      ...partner.benefitTypeLabels,
      ...partner.clientProfileLabels,
    ],
  };
}

export default function ConvenioPartnerPage({
  partner,
  contentHtml,
  relatedPartners,
  photoGallery,
}: ConvenioPartnerPageProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  if (!partner) {
    return (
      <main className="page-section">
        <div className="container-wide text-center">
          <h1>Parceiro não encontrado</h1>
          <Link
            href="/convenios"
            className="text-auditik-blue hover:text-auditik-dark-blue font-bold"
          >
            ← Voltar ao clube de benefícios
          </Link>
        </div>
      </main>
    );
  }

  const seo = getSEOMeta({
    title: `${partner.name} - Clube de Benefícios Auditik`,
    description: partner.description,
    ogImage: partner.logo,
  });

  const convenioSchema = buildConvenioSchema(partner);

  return (
    <>
      <NextSeo {...seo} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(convenioSchema) }}
        />
      </Head>
      <Header />
      <main>
        <section className="hero-gradient relative overflow-hidden py-16 md:py-24">
          <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-[-5%] right-[5%] w-96 h-96 bg-auditik-yellow/20 rounded-full blur-3xl" />

          <div className="container-wide relative z-10 max-w-5xl">
            <Link
              href="/convenios"
              className="text-auditik-blue hover:text-auditik-dark-blue font-bold mb-6 inline-flex items-center gap-2"
            >
              ← Voltar
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              {partner.cityLabels.map((cityLabel) => (
                <span
                  key={`city-${cityLabel}`}
                  className="rounded-full bg-auditik-blue/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-auditik-blue"
                >
                  {cityLabel}
                </span>
              ))}
              {partner.areaLabels.map((areaLabel) => (
                <span
                  key={`area-${areaLabel}`}
                  className="rounded-full bg-auditik-yellow px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-auditik-dark-blue"
                >
                  {areaLabel}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.05] max-w-4xl mb-6">
              {partner.name}
            </h1>
            <div className="mb-6">
              {partner.logo ? (
                <div className="relative h-20 w-20 overflow-hidden rounded-3xl border border-white/60 bg-white">
                  <Image
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    fill
                    className="object-contain p-3"
                    sizes="80px"
                  />
                </div>
              ) : (
                <div className="h-20 w-20 rounded-3xl bg-auditik-blue/10 text-auditik-blue flex items-center justify-center font-extrabold text-2xl">
                  {partner.initials}
                </div>
              )}
            </div>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mb-8">
              {partner.description}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-3xl bg-white/90 p-5 border border-white/60">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                  Endereço
                </p>
                <p className="font-semibold text-slate-800">
                  {partner.address || "A confirmar"}
                </p>
              </div>
              <div className="rounded-3xl bg-white/90 p-5 border border-white/60">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                  Telefone
                </p>
                <p className="font-semibold text-slate-800">
                  {partner.phone || "A confirmar"}
                </p>
              </div>
              <div className="rounded-3xl bg-white/90 p-5 border border-white/60">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                  Tipo de benefício
                </p>
                <p className="font-semibold text-slate-800">
                  {partner.benefitTypeLabels.join(", ") || "Benefício exclusivo"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-wide grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
            <article className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-lg shadow-slate-900/5">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
                Benefício em destaque
              </h2>
              <p className="text-slate-700 text-lg leading-relaxed mb-10">
                {partner.benefitSummary}
              </p>

              {photoGallery.length > 0 && (
                <div className="mb-10 rounded-[1.75rem] border border-slate-100 bg-slate-50 p-4 md:p-6">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <h3 className="text-lg font-extrabold text-slate-900">
                      Fotos do parceiro
                    </h3>
                    <p className="text-sm text-slate-500">
                      {activePhotoIndex + 1} de {photoGallery.length}
                    </p>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-100 mb-4">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={photoGallery[activePhotoIndex]}
                        alt={`${partner.name} - foto ${activePhotoIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 760px"
                      />
                    </div>
                  </div>

                  {photoGallery.length > 1 && (
                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setActivePhotoIndex(
                            activePhotoIndex === 0
                              ? photoGallery.length - 1
                              : activePhotoIndex - 1,
                          )
                        }
                        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-white transition-colors"
                      >
                        ← Anterior
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActivePhotoIndex(
                            activePhotoIndex === photoGallery.length - 1
                              ? 0
                              : activePhotoIndex + 1,
                          )
                        }
                        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-white transition-colors"
                      >
                        Próxima →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {contentHtml ? (
                <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-headings:mt-8 prose-headings:mb-4 prose-p:text-slate-700 prose-p:my-5 prose-a:text-auditik-blue prose-strong:text-slate-900 prose-ul:my-6 prose-li:my-2">
                  <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                </div>
              ) : (
                <p className="text-slate-600">
                  Este parceiro ainda não publicou os detalhes completos do benefício.
                </p>
              )}
            </article>

            <aside>
              <div className="bg-bg-light-blue p-6 rounded-[2rem] sticky top-4 border border-blue-50">
                <h3 className="font-bold text-lg mb-4 text-slate-900">Resumo rápido</h3>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="font-bold text-slate-700">Áreas</dt>
                    <dd className="text-slate-600">
                      {partner.areaLabels.join(", ") || "-"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-700">Cidades</dt>
                    <dd className="text-slate-600">
                      {partner.cityLabels.join(", ") || "-"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-700">Perfil atendido</dt>
                    <dd className="text-slate-600">
                      {partner.clientProfileLabels.join(", ") || "Público geral"}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 pt-6 border-t border-blue-100">
                  {partner.googleMapsUrl && (
                    <a
                      href={partner.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackButtonClick("convenio_detail_open_maps", {
                          section: "convenio_detail",
                          partner: partner.slug,
                        })
                      }
                      className="inline-flex w-full justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors mb-3"
                    >
                      Abrir local no Google Maps
                    </a>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </section>

        {relatedPartners.length > 0 && (
          <section className="py-16 bg-bg-light-blue">
            <div className="container-wide">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-8">
                Outros parceiros que podem ajudar
              </h2>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {relatedPartners.map((relatedPartner) => (
                  <article
                    key={relatedPartner.slug}
                    className="rounded-[1.75rem] border border-white bg-white p-6 shadow-lg shadow-slate-900/5"
                  >
                    <h3 className="text-xl font-extrabold text-slate-900 mb-3 line-clamp-2">
                      {relatedPartner.name}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-3">
                      {relatedPartner.description}
                    </p>
                    <Link
                      href={`/convenios/${relatedPartner.slug}`}
                      className="text-auditik-blue hover:text-auditik-dark-blue font-bold"
                    >
                      Ver benefício →
                    </Link>
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
    const slugs = await getAllConvenioSlugs();

    return {
      paths: slugs.map((slug) => ({
        params: { slug },
      })),
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error loading convenios slugs:", error);

    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps<ConvenioPartnerPageProps> = async ({
  params,
}) => {
  try {
    const slug = params?.slug as string;
    const partner = await getConvenioPartnerBySlug(slug);

    if (!partner) {
      return {
        notFound: true,
      };
    }

    const allPartners = await getAllConvenioPartners();
    const { getConvenioGalleryFromMaps } = await import("@lib/convenios");

    const extractedMapsGallery = await getConvenioGalleryFromMaps(
      partner.googleMapsUrl,
      5,
    );
    const photoGallery =
      extractedMapsGallery.length > 0
        ? extractedMapsGallery
        : partner.gallery.slice(0, 5);

    const relatedPartners = allPartners
      .filter((candidate) => candidate.slug !== slug)
      .map((candidate) => ({
        candidate,
        score:
          candidate.areas.filter((area) => partner.areas.includes(area)).length +
          candidate.cities.filter((city) => partner.cities.includes(city)).length,
      }))
      .filter((entry) => entry.score > 0)
      .sort((left, right) => right.score - left.score)
      .slice(0, 3)
      .map((entry) => entry.candidate);

    const contentHtml = await renderConvenioMarkdownToHtml(partner.content);

    return {
      props: {
        partner,
        relatedPartners,
        contentHtml,
        photoGallery,
      },
      // revalidate removed for static export compatibility
    };
  } catch (error) {
    console.error("Error loading convenio partner:", error);

    return {
      notFound: true,
    };
  }
};
