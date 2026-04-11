import { NextSeo } from "next-seo";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import type { GetStaticProps } from "next";

import { Header } from "@components/Header";
import { trackButtonClick } from "@lib/analytics";
import {
  CONVENIO_AREAS,
  CONVENIO_BENEFIT_TYPES,
  CONVENIO_CITIES,
  CONVENIO_CLIENT_PROFILES,
} from "@lib/convenios-taxonomy";
import type { ConvenioPartner } from "@lib/convenios";
import { getSEOMeta } from "@lib/seo";

const getAllConvenioPartners = async () => {
  const { getAllConvenioPartners: loadAllConvenioPartners } = await import(
    "@lib/convenios"
  );
  return loadAllConvenioPartners();
};

interface ConveniosPageProps {
  partners: ConvenioPartner[];
}

const ALL_VALUE = "all";

const normalizeSearchValue = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const getSelectValueFromQuery = (
  queryValue: string | string[] | undefined,
  allowedValues: string[],
): string => {
  const value = Array.isArray(queryValue) ? queryValue[0] : queryValue;

  if (!value || !allowedValues.includes(value)) {
    return ALL_VALUE;
  }

  return value;
};

export default function ConveniosPage({ partners }: ConveniosPageProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState(ALL_VALUE);
  const [selectedArea, setSelectedArea] = useState(ALL_VALUE);
  const [selectedBenefitType, setSelectedBenefitType] = useState(ALL_VALUE);
  const [selectedProfile, setSelectedProfile] = useState(ALL_VALUE);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const querySearch = typeof router.query.q === "string" ? router.query.q : "";

    setSearchTerm(querySearch);
    setSelectedCity(
      getSelectValueFromQuery(
        router.query.city,
        CONVENIO_CITIES.map((option) => option.value),
      ),
    );
    setSelectedArea(
      getSelectValueFromQuery(
        router.query.area,
        CONVENIO_AREAS.map((option) => option.value),
      ),
    );
    setSelectedBenefitType(
      getSelectValueFromQuery(
        router.query.benefit,
        CONVENIO_BENEFIT_TYPES.map((option) => option.value),
      ),
    );
    setSelectedProfile(
      getSelectValueFromQuery(
        router.query.profile,
        CONVENIO_CLIENT_PROFILES.map((option) => option.value),
      ),
    );
  }, [
    router.isReady,
    router.query.area,
    router.query.benefit,
    router.query.city,
    router.query.profile,
    router.query.q,
  ]);

  const syncFilters = (
    nextSearch: string,
    nextCity: string,
    nextArea: string,
    nextBenefitType: string,
    nextProfile: string,
  ) => {
    if (!router.isReady) {
      return;
    }

    const query: Record<string, string> = {};

    if (nextSearch.trim()) {
      query.q = nextSearch.trim();
    }

    if (nextCity !== ALL_VALUE) {
      query.city = nextCity;
    }

    if (nextArea !== ALL_VALUE) {
      query.area = nextArea;
    }

    if (nextBenefitType !== ALL_VALUE) {
      query.benefit = nextBenefitType;
    }

    if (nextProfile !== ALL_VALUE) {
      query.profile = nextProfile;
    }

    void router.replace({ pathname: router.pathname, query }, undefined, {
      shallow: true,
      scroll: false,
    });
  };

  const filteredPartners = useMemo(() => {
    const normalizedSearch = normalizeSearchValue(searchTerm);

    return partners.filter((partner) => {
      const matchesSearch =
        !normalizedSearch || partner.searchText.includes(normalizedSearch);
      const matchesCity =
        selectedCity === ALL_VALUE || partner.cities.includes(selectedCity);
      const matchesArea =
        selectedArea === ALL_VALUE || partner.areas.includes(selectedArea);
      const matchesBenefitType =
        selectedBenefitType === ALL_VALUE ||
        partner.benefitTypes.includes(selectedBenefitType);
      const matchesProfile =
        selectedProfile === ALL_VALUE ||
        partner.clientProfiles.includes(selectedProfile);

      return (
        matchesSearch &&
        matchesCity &&
        matchesArea &&
        matchesBenefitType &&
        matchesProfile
      );
    });
  }, [
    partners,
    searchTerm,
    selectedArea,
    selectedBenefitType,
    selectedCity,
    selectedProfile,
  ]);

  const seo = getSEOMeta({
    title: "Clube de Benefícios - Auditik",
    description:
      "Conheça parceiros que oferecem benefícios exclusivos para clientes Auditik, com filtros por cidade, área e perfil.",
  });

  const hasActiveFilters =
    Boolean(searchTerm.trim()) ||
    selectedCity !== ALL_VALUE ||
    selectedArea !== ALL_VALUE ||
    selectedBenefitType !== ALL_VALUE ||
    selectedProfile !== ALL_VALUE;

  return (
    <>
      <NextSeo {...seo} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Clube de Benefícios Auditik",
              description: "Parcerias e benefícios exclusivos para clientes Auditik.",
              url: "https://auditik.com.br/convenios",
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
                Vantagens exclusivas para clientes Auditik
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.05] mb-6 max-w-3xl">
                Clube de benefícios com parceiros para seu dia a dia
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
                Filtre por cidade, área de atuação, tipo de benefício e perfil para
                descobrir onde você pode aproveitar vantagens imediatas.
              </p>
              <div className="grid gap-4 sm:grid-cols-[1fr_auto] max-w-2xl">
                <label className="block">
                  <span className="sr-only">Pesquisar parceiros</span>
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
                        syncFilters(
                          nextSearch,
                          selectedCity,
                          selectedArea,
                          selectedBenefitType,
                          selectedProfile,
                        );
                      }}
                      placeholder="Pesquisar parceiro, benefício ou palavra-chave"
                      className="w-full rounded-full border border-white/70 bg-white/90 py-4 pl-14 pr-5 text-slate-900 shadow-xl shadow-slate-900/5 outline-none transition focus:border-auditik-blue focus:bg-white"
                    />
                  </div>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCity(ALL_VALUE);
                    setSelectedArea(ALL_VALUE);
                    setSelectedBenefitType(ALL_VALUE);
                    setSelectedProfile(ALL_VALUE);
                    syncFilters("", ALL_VALUE, ALL_VALUE, ALL_VALUE, ALL_VALUE);
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
                    {partners.length}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">parceiros cadastrados</p>
                </div>
                <div className="rounded-3xl bg-bg-light-blue p-5">
                  <p className="text-3xl font-extrabold text-auditik-blue">
                    {filteredPartners.length}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">resultados atuais</p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Clique em <strong>Obtenha o benefício</strong> para abrir os detalhes
                completos de cada parceiro e ver as regras de utilização.
              </p>
            </div>
          </div>
        </section>

        <section className="py-10 bg-white border-b border-slate-100">
          <div className="container-wide grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <label className="text-sm font-bold text-slate-700">
              Cidade
              <select
                value={selectedCity}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  setSelectedCity(nextValue);
                  syncFilters(
                    searchTerm,
                    nextValue,
                    selectedArea,
                    selectedBenefitType,
                    selectedProfile,
                  );
                  trackButtonClick("convenios_filter_city", {
                    section: "convenios_index",
                    value: nextValue,
                  });
                }}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-auditik-blue"
              >
                <option value={ALL_VALUE}>Todas</option>
                {CONVENIO_CITIES.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-bold text-slate-700">
              Área
              <select
                value={selectedArea}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  setSelectedArea(nextValue);
                  syncFilters(
                    searchTerm,
                    selectedCity,
                    nextValue,
                    selectedBenefitType,
                    selectedProfile,
                  );
                  trackButtonClick("convenios_filter_area", {
                    section: "convenios_index",
                    value: nextValue,
                  });
                }}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-auditik-blue"
              >
                <option value={ALL_VALUE}>Todas</option>
                {CONVENIO_AREAS.map((area) => (
                  <option key={area.value} value={area.value}>
                    {area.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-bold text-slate-700">
              Tipo de benefício
              <select
                value={selectedBenefitType}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  setSelectedBenefitType(nextValue);
                  syncFilters(
                    searchTerm,
                    selectedCity,
                    selectedArea,
                    nextValue,
                    selectedProfile,
                  );
                  trackButtonClick("convenios_filter_benefit_type", {
                    section: "convenios_index",
                    value: nextValue,
                  });
                }}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-auditik-blue"
              >
                <option value={ALL_VALUE}>Todos</option>
                {CONVENIO_BENEFIT_TYPES.map((benefitType) => (
                  <option key={benefitType.value} value={benefitType.value}>
                    {benefitType.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-bold text-slate-700">
              Perfil
              <select
                value={selectedProfile}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  setSelectedProfile(nextValue);
                  syncFilters(
                    searchTerm,
                    selectedCity,
                    selectedArea,
                    selectedBenefitType,
                    nextValue,
                  );
                  trackButtonClick("convenios_filter_profile", {
                    section: "convenios_index",
                    value: nextValue,
                  });
                }}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-auditik-blue"
              >
                <option value={ALL_VALUE}>Todos</option>
                {CONVENIO_CLIENT_PROFILES.map((profile) => (
                  <option key={profile.value} value={profile.value}>
                    {profile.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="py-16 bg-bg-light-blue">
          <div className="container-wide">
            {filteredPartners.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {filteredPartners.map((partner) => (
                  <article
                    key={partner.slug}
                    className="bg-white rounded-[2rem] overflow-hidden border border-white shadow-lg shadow-slate-900/5 transition-transform hover:-translate-y-1"
                  >
                    <div className="h-2 bg-gradient-to-r from-auditik-blue to-auditik-yellow" />
                    <div className="p-7">
                      <div className="flex items-center gap-4 mb-5">
                        {partner.logo ? (
                          <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-slate-100 bg-white">
                            <Image
                              src={partner.logo}
                              alt={`Logo ${partner.name}`}
                              fill
                              className="object-contain p-2"
                              sizes="56px"
                            />
                          </div>
                        ) : (
                          <div className="h-14 w-14 rounded-2xl bg-auditik-blue/10 text-auditik-blue flex items-center justify-center font-extrabold text-lg">
                            {partner.initials}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                            Parceiro Auditik
                          </p>
                          <h2 className="text-2xl font-extrabold text-slate-900 leading-tight line-clamp-2">
                            {partner.name}
                          </h2>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {partner.cityLabels.map((cityLabel) => (
                          <span
                            key={`${partner.slug}-${cityLabel}`}
                            className="rounded-full bg-auditik-yellow px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-auditik-dark-blue"
                          >
                            {cityLabel}
                          </span>
                        ))}
                        {partner.featured && (
                          <span className="rounded-full bg-auditik-blue/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-auditik-blue">
                            Destaque
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 leading-relaxed mb-5 line-clamp-2">
                        {partner.description}
                      </p>

                      <dl className="space-y-3 mb-6 text-sm">
                        <div>
                          <dt className="font-bold text-slate-700">Endereço</dt>
                          <dd className="text-slate-600">
                            {partner.address || "A confirmar"}
                            {partner.googleMapsUrl && (
                              <a
                                href={partner.googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() =>
                                  trackButtonClick("convenios_partner_open_maps", {
                                    section: "convenios_index",
                                    partner: partner.slug,
                                  })
                                }
                                className="ml-2 text-auditik-blue hover:text-auditik-dark-blue font-semibold"
                              >
                                Ver no mapa
                              </a>
                            )}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-bold text-slate-700">Telefone</dt>
                          <dd className="text-slate-600">
                            {partner.phone || "A confirmar"}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-bold text-slate-700">Área</dt>
                          <dd className="text-slate-600">
                            {partner.areaLabels.join(", ")}
                          </dd>
                        </div>
                      </dl>

                      <div className="mt-auto">
                        <div className="grid gap-3">
                          <Link
                            href={`/convenios/${partner.slug}`}
                            onClick={() =>
                              trackButtonClick("convenios_partner_open_benefit", {
                                section: "convenios_index",
                                partner: partner.slug,
                              })
                            }
                            className="cta-button-primary inline-flex w-full justify-center text-sm"
                          >
                            Obtenha o benefício
                          </Link>
                          {partner.googleMapsUrl && (
                            <a
                              href={partner.googleMapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() =>
                                trackButtonClick("convenios_partner_route_cta", {
                                  section: "convenios_index",
                                  partner: partner.slug,
                                })
                              }
                              className="inline-flex w-full justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                              Abrir rota no Google Maps
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-12 text-center">
                <p className="text-xl font-bold text-slate-900 mb-3">
                  Nenhum parceiro encontrado com esses filtros.
                </p>
                <p className="text-slate-600 mb-6 max-w-xl mx-auto">
                  Ajuste os filtros para encontrar parceiros por cidade, perfil ou tipo
                  de benefício.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCity(ALL_VALUE);
                    setSelectedArea(ALL_VALUE);
                    setSelectedBenefitType(ALL_VALUE);
                    setSelectedProfile(ALL_VALUE);
                    syncFilters("", ALL_VALUE, ALL_VALUE, ALL_VALUE, ALL_VALUE);
                  }}
                  className="cta-button-primary"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<ConveniosPageProps> = async () => {
  try {
    const partners = await getAllConvenioPartners();

    return {
      props: { partners },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error loading convenios:", error);

    return {
      props: { partners: [] },
      revalidate: 300,
    };
  }
};
