import { NextSeo } from "next-seo";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import { Header } from "@components/Header";
import { trackButtonClick } from "@lib/analytics";
import type { ConvenioPartner } from "@lib/convenios";
import { getSEOMeta } from "@lib/seo";
import {
  generateBreadcrumbSchema,
  generateConvenioPartnerSchema,
} from "@lib/schema";
import { absoluteUrl } from "@lib/site-url";
import { formatBrazilPhone } from "@lib/lead-submission";

const DEFAULT_COMPANY_ID = "company-d1ef844d-d65e-4e3b-9b05-bb6fe8f8cd62";
const BENEFIT_ACTIVATE_URL = process.env.NEXT_PUBLIC_BENEFIT_ACTIVATE_URL || "";
const LEAD_INTEGRATION_NAME = process.env.NEXT_PUBLIC_LEAD_INTEGRATION_NAME || "";
const PHILIPS_STORES = ["Piracicaba", "Americana", "São Pedro", "Charqueada"];
const ACTIVATION_STORAGE_KEY_PREFIX = "convenio_benefit_activated_";

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
  aboutPartnerHtml: string;
  contentHtml: string;
  relatedPartners: ConvenioPartner[];
  photoGallery: string[];
}

const ABOUT_PARTNER_SECTION_REGEX =
  /(?:^|\n)##\s+Sobre o parceiro\s*\n+([\s\S]*?)(?=\n##\s+|$)/i;

function buildConvenioSchema(partner: ConvenioPartner) {
  return generateConvenioPartnerSchema({
    name: partner.name,
    description: partner.description,
    slug: partner.slug,
    logo: partner.logo,
  });
}

const getActivationStorageKey = (slug: string) =>
  `${ACTIVATION_STORAGE_KEY_PREFIX}${slug}`;

const maskPhone = (value: string) => {
  if (!value) return "Ative o benefício para desbloquear";
  const digits = value.replace(/\D/g, "");
  if (digits.length < 10) return "Ative o benefício para desbloquear";
  const ddd = digits.slice(0, 2);
  const end = digits.slice(-4);
  return `(${ddd}) *****-${end}`;
};

const maskAddress = (value: string) => {
  if (!value) return "Ative o benefício para desbloquear";
  return "Endereço oculto. Ative o benefício para desbloquear.";
};

export default function ConvenioPartnerPage({
  partner,
  aboutPartnerHtml,
  contentHtml,
  relatedPartners,
  photoGallery,
}: ConvenioPartnerPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({ nome: "", telefone: "", loja: "" });
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalError, setModalError] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false);
  const [hasActivatedBenefit, setHasActivatedBenefit] = useState(false);

  useEffect(() => {
    if (!partner || typeof window === "undefined") return;
    const storedValue = window.localStorage.getItem(
      getActivationStorageKey(partner.slug),
    );
    setHasActivatedBenefit(storedValue === "1");
  }, [partner]);

  const handleModalFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "telefone") {
      setModalForm((prev) => ({ ...prev, telefone: formatBrazilPhone(value) }));
      return;
    }
    setModalForm((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = () => {
    setIsModalOpen(true);
    setModalSuccess(false);
    setModalError("");
    setModalForm({ nome: "", telefone: "", loja: "" });
    if (partner) {
      trackButtonClick("convenio_activate_benefit_open", {
        section: "convenio_detail",
        partner: partner.slug,
      });
    }
  };

  const handleActivateBenefit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (modalSubmitting || !partner) return;

    setModalSubmitting(true);
    setModalError("");

    try {
      const phone = modalForm.telefone.replace(/\D/g, "");

      if (phone.length < 10) {
        throw new Error("Informe um telefone válido com DDD.");
      }

      if (!BENEFIT_ACTIVATE_URL) {
        throw new Error(
          "Serviço indisponível no momento. Tente novamente em instantes.",
        );
      }

      const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://auditik.com.br").replace(
        /\/$/,
        "",
      );

      const payload = {
        companyID: DEFAULT_COMPANY_ID,
        integrationName: LEAD_INTEGRATION_NAME,
        fullName: modalForm.nome.trim(),
        phone,
        philipsStore: modalForm.loja,
        benefitName: partner.name,
        benefitSlug: partner.slug,
        partnerPhone: partner.phone,
        partnerAddress: partner.address,
        partnerPageUrl: `${siteUrl}/convenios/${partner.slug}`,
      };

      const res = await fetch(BENEFIT_ACTIVATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.message || "Não foi possível ativar o benefício. Tente novamente.",
        );
      }

      trackButtonClick("convenio_benefit_activated", {
        section: "convenio_detail",
        partner: partner.slug,
      });

      setModalSuccess(true);
      setHasActivatedBenefit(true);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(getActivationStorageKey(partner.slug), "1");
      }
    } catch (err) {
      setModalError(
        err instanceof Error
          ? err.message
          : "Não foi possível ativar o benefício. Tente novamente.",
      );
    } finally {
      setModalSubmitting(false);
    }
  };

  if (!partner) {
    return (
      <main className="page-section">
        <div className="container-wide text-center">
          <h1>Parceiro não encontrado</h1>
          <Link
            href="/convenios"
            className="inline-flex min-h-11 items-center px-2 text-auditik-blue hover:text-auditik-dark-blue font-bold"
          >
            ← Voltar ao clube de benefícios
          </Link>
        </div>
      </main>
    );
  }

  const partnerUrl = absoluteUrl(`/convenios/${partner.slug}/`);

  const seo = getSEOMeta({
    title: `${partner.name} - Clube de Benefícios Auditik`,
    description: partner.description,
    canonical: partnerUrl,
    ogImage: partner.logo,
  });

  const convenioSchema = buildConvenioSchema(partner);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: absoluteUrl("/") },
    { name: "Clube de Benefícios", url: absoluteUrl("/convenios/") },
    { name: partner.name, url: partnerUrl },
  ]);

  return (
    <>
      <NextSeo {...seo} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(convenioSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
              className="mb-6 inline-flex min-h-11 items-center gap-2 px-2 text-auditik-blue hover:text-auditik-dark-blue font-bold"
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
                  {hasActivatedBenefit
                    ? partner.address || "A confirmar"
                    : maskAddress(partner.address)}
                </p>
              </div>
              <div className="rounded-3xl bg-white/90 p-5 border border-white/60">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                  Telefone
                </p>
                <p className="font-semibold text-slate-800">
                  {hasActivatedBenefit
                    ? partner.phone || "A confirmar"
                    : maskPhone(partner.phone)}
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
            <article className="rounded-[2rem] border-2 border-auditik-yellow bg-white p-8 shadow-lg shadow-slate-900/5">
              {aboutPartnerHtml && (
                <div className="mb-10 rounded-[1.75rem] border border-slate-100 bg-slate-50 p-6">
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
                    Sobre o parceiro
                  </h2>
                  <div className="prose prose-lg markdown-content">
                    <div dangerouslySetInnerHTML={{ __html: aboutPartnerHtml }} />
                  </div>
                </div>
              )}

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
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {photoGallery.map((photoUrl, index) => (
                      <div
                        key={`${partner.slug}-photo-${photoUrl}-${index}`}
                        className="relative aspect-square overflow-hidden rounded-2xl border border-slate-100 bg-white"
                      >
                        <Image
                          src={photoUrl}
                          alt={`${partner.name} - foto ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 260px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {contentHtml ? (
                <div className="prose prose-lg markdown-content">
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

                <div className="mt-6 pt-6 border-t border-blue-100 space-y-3">
                  {!hasActivatedBenefit && (
                    <p className="rounded-2xl bg-white px-4 py-3 text-xs font-semibold text-slate-600 border border-slate-100">
                      Endereço e telefone ficam visíveis após ativar o benefício.
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={openModal}
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-auditik-blue px-4 py-3 text-sm font-bold text-white hover:bg-auditik-dark-blue transition-colors shadow-sm"
                  >
                    Ativar benefício
                  </button>
                  {hasActivatedBenefit && partner.googleMapsUrl && (
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
                      className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
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
                      className="inline-flex min-h-11 items-center px-2 text-auditik-blue hover:text-auditik-dark-blue font-bold"
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

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-2xl w-full max-w-md relative">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Fechar modal"
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {modalSuccess ? (
              <div className="text-center py-4">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-8 w-8 text-green-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-3">
                  Benefício ativado!
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  Sua solicitação foi registrada com sucesso. Nossa equipe entrará em
                  contato em breve para confirmar o seu benefício.
                </p>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-auditik-blue px-4 py-3 text-sm font-bold text-white hover:bg-auditik-dark-blue transition-colors"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                  Ativar benefício
                </h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  Preencha seus dados para ativar o benefício{" "}
                  <strong className="text-slate-700">{partner.name}</strong>.
                </p>

                <form onSubmit={handleActivateBenefit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={modalForm.nome}
                      onChange={handleModalFormChange}
                      placeholder="Seu nome completo"
                      required
                      className="w-full px-6 py-4 rounded-3xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-auditik-blue/20 focus:border-auditik-blue focus:bg-white transition-all outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                      Telefone com DDD
                    </label>
                    <input
                      type="tel"
                      name="telefone"
                      value={modalForm.telefone}
                      onChange={handleModalFormChange}
                      placeholder="(00) 00000-0000"
                      maxLength={15}
                      required
                      className="w-full px-6 py-4 rounded-3xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-auditik-blue/20 focus:border-auditik-blue focus:bg-white transition-all outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                      Qual loja Philips você é cliente?
                    </label>
                    <select
                      name="loja"
                      value={modalForm.loja}
                      onChange={handleModalFormChange}
                      required
                      className="w-full px-6 py-4 rounded-3xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-auditik-blue/20 focus:border-auditik-blue focus:bg-white transition-all outline-none cursor-pointer text-sm"
                    >
                      <option value="">Selecione sua loja</option>
                      {PHILIPS_STORES.map((store) => (
                        <option key={store} value={store}>
                          {store}
                        </option>
                      ))}
                    </select>
                  </div>

                  {modalError && (
                    <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                      {modalError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={modalSubmitting}
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-auditik-blue px-4 py-3 text-sm font-bold text-white hover:bg-auditik-dark-blue disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors shadow-sm"
                  >
                    {modalSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Ativando...
                      </span>
                    ) : (
                      "Ativar benefício"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
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
      fallback: false,
    };
  } catch (error) {
    console.error("Error loading convenios slugs:", error);

    return {
      paths: [],
      fallback: false,
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
      4,
    );
    const photoGallery =
      extractedMapsGallery.length > 0
        ? extractedMapsGallery
        : partner.gallery.slice(0, 4);

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

    const aboutPartnerMatch = partner.content.match(ABOUT_PARTNER_SECTION_REGEX);
    const aboutPartnerMarkdown = aboutPartnerMatch?.[1]?.trim() || "";
    const contentWithoutAboutPartner = partner.content
      .replace(ABOUT_PARTNER_SECTION_REGEX, "\n")
      .trim();

    const [aboutPartnerHtml, contentHtml] = await Promise.all([
      aboutPartnerMarkdown ? renderConvenioMarkdownToHtml(aboutPartnerMarkdown) : "",
      renderConvenioMarkdownToHtml(contentWithoutAboutPartner),
    ]);

    return {
      props: {
        partner,
        aboutPartnerHtml,
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
