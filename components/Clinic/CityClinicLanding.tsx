import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@components/Header";
import { WhatsAppLeadButton } from "@components/Common/WhatsAppLeadButton";
import { ClinicCityLinks } from "@components/Clinic/ClinicCityLinks";
import { trackButtonClick } from "@lib/analytics";
import { getSEOMeta, absoluteUrl } from "@lib/seo";
import {
  generateFAQSchema,
  generateLocalBusinessSchema,
  type ClinicLocationId,
} from "@lib/schema";
import { APP_ROUTES } from "@lib/routes";

const HERO_IMAGE =
  "/images/philips/optimized/background/Philips_HearLink50_miniRITE_H1-2024_C116DarkBeige_Angle90_Close-up_In-On-Ear_MS-6152_Woman_1200x800px.jpg";

const CTA_BACKGROUND =
  "/images/philips/optimized/background/PHS_HL50_miniRITE_Portable_Charger_Lifestyle_blue_shadows_GettyImages-1530702944_MS_0255.jpg";

export interface CityClinicLandingProps {
  path: string;
  city: string;
  title: string;
  description: string;
  tracking: string;
  isUnit: boolean;
  clinicId?: ClinicLocationId;
  nearestClinicName?: string;
  addressLines?: string[];
  mapsUrl?: string;
  mapsEmbed?: string;
  mapTitle?: string;
}

const services = [
  {
    icon: "hearing",
    title: "Avaliação auditiva",
    text: "A consulta começa pelo exame e pela conversa sobre a rotina. O fonoaudiólogo explica o que a audição mostra antes de falar em aparelho.",
  },
  {
    icon: "settings_voice",
    title: "Adaptação acompanhada",
    text: "Quando o tratamento pede aparelho, a demonstração acontece na clínica, com programação e orientação de uso.",
  },
  {
    icon: "tune",
    title: "Ajustes ao longo do tratamento",
    text: "O acompanhamento continua depois da adaptação, para conforto, clareza de fala e segurança no dia a dia.",
  },
];

export function CityClinicLanding({
  path,
  city,
  title,
  description,
  tracking,
  isUnit,
  clinicId,
  nearestClinicName,
  addressLines,
  mapsUrl,
  mapsEmbed,
  mapTitle,
}: CityClinicLandingProps) {
  const placeLabel = isUnit ? city : nearestClinicName || city;

  const faqItems = isUnit
    ? [
        {
          question: `A avaliação na clínica de ${city} é gratuita?`,
          answer:
            "Sim. A primeira avaliação é clínica e gratuita, com fonoaudiólogo, para entender a audição e explicar o caminho do tratamento.",
        },
        {
          question: "Quanto tempo dura a primeira consulta?",
          answer:
            "Em geral, uma hora e meia. O tempo cobre o exame, a conversa sobre a rotina e a orientação sobre o que faz sentido no tratamento.",
        },
        {
          question: "O aparelho entra na primeira visita?",
          answer:
            "Só se a avaliação indicar. A clínica explica a adaptação e o acompanhamento. A decisão não precisa acontecer no mesmo dia.",
        },
      ]
    : [
        {
          question: `A Auditik tem unidade em ${city}?`,
          answer: `Quem mora em ${city} é atendido na clínica de ${placeLabel}. A avaliação é presencial, com fonoaudiólogo, e gratuita.`,
        },
        {
          question: `O que acontece na clínica de ${placeLabel}?`,
          answer:
            "Exame, conversa clínica e, quando indicado, adaptação do aparelho Philips HearLink com acompanhamento depois da consulta.",
        },
        {
          question: "Preciso decidir pelo aparelho no primeiro contato?",
          answer:
            "Não. A consulta serve para esclarecer a audição e o tratamento. O aparelho só entra se fizer sentido para o caso.",
        },
      ];

  const seo = getSEOMeta({
    title,
    description,
    canonical: absoluteUrl(path),
    ogImage: HERO_IMAGE,
  });

  const faqSchema = generateFAQSchema(faqItems);
  const localBusinessSchema = clinicId
    ? generateLocalBusinessSchema(clinicId)
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: absoluteUrl(APP_ROUTES.home),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Aparelhos Auditivos",
        item: absoluteUrl(APP_ROUTES.aparelhos),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: absoluteUrl(path),
      },
    ],
  };

  const whatsappMessage = isUnit
    ? `Olá Auditik, quero agendar uma avaliação auditiva na clínica de ${city}.`
    : `Olá Auditik, moro em ${city} e quero agendar uma avaliação na clínica de ${placeLabel}.`;

  return (
    <>
      <NextSeo {...seo} />
      <Head>
        {localBusinessSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(localBusinessSchema),
            }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>
      <Header />
      <main>
        <section className="hero-gradient relative overflow-hidden py-16 md:py-24">
          <div className="container-wide relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-auditik-blue/10 text-auditik-blue rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                {isUnit
                  ? `Clínica de tratamento auditivo · ${city}-SP`
                  : `Atendimento clínico para ${city}`}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.05] mb-6">
                {title.replace(` em ${city}`, "")} em{" "}
                <span className="text-auditik-blue">{city}</span>
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
                {isUnit
                  ? `A clínica Auditik em ${city} faz avaliação auditiva, adaptação e acompanhamento com fonoaudiólogos. O aparelho Philips HearLink entra no tratamento quando o exame mostra que ele ajuda.`
                  : `Quem mora em ${city} faz a avaliação na clínica de ${placeLabel}. O atendimento é presencial: exame, orientação e acompanhamento, com Philips HearLink quando o tratamento pede aparelho.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={APP_ROUTES.contato}
                  onClick={() =>
                    trackButtonClick(`${tracking}_cta_agendar`, { section: "hero" })
                  }
                  className="cta-button-primary text-center"
                >
                  Agendar avaliação
                </Link>
                <WhatsAppLeadButton
                  buttonName={`${tracking}_cta_whatsapp`}
                  leadSource={`Website Clínica ${city}`}
                  trackingParams={{ section: "hero", page: tracking }}
                  whatsappMessage={whatsappMessage}
                  className="cta-button-secondary text-center"
                >
                  Falar com a clínica
                </WhatsAppLeadButton>
              </div>
            </div>
            <div className="relative w-full max-w-[640px] mx-auto">
              <div className="relative rounded-[2rem] overflow-hidden border-8 border-white/80 shadow-2xl">
                <Image
                  src={HERO_IMAGE}
                  alt={`Avaliação auditiva na clínica Auditik para ${city}`}
                  width={1200}
                  height={800}
                  className="w-full h-[380px] md:h-[460px] object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">
              O que a consulta inclui
            </h2>
            <p className="text-slate-600 text-lg text-center max-w-2xl mx-auto mb-12">
              {description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="bg-bg-light-blue rounded-4xl p-8 border border-blue-50"
                >
                  <span className="material-symbols-outlined text-4xl text-auditik-blue mb-4">
                    {service.icon}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-600">{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-bg-light-blue" id="unidade">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">
              {isUnit
                ? `Como chegar na clínica de ${city}`
                : `Clínica que atende ${city}`}
            </h2>
            <p className="text-slate-600 text-lg text-center max-w-2xl mx-auto mb-12">
              {isUnit
                ? "A avaliação é presencial. Agende um horário para ser recebido pela equipe da unidade."
                : `Não há unidade em ${city}. O atendimento clínico acontece em ${placeLabel}.`}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white border border-blue-50 rounded-4xl p-8 md:p-10">
                <h3 className="text-xl font-extrabold text-slate-800 mb-2">
                  Auditik — {placeLabel}
                </h3>
                {addressLines && (
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {addressLines.map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                )}
                <p className="text-lg font-bold text-auditik-blue mb-6">
                  <a href="tel:+551933776941">(19) 3377-6941</a>
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {mapsUrl && (
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-button-secondary text-center"
                    >
                      Abrir no Google Maps
                    </a>
                  )}
                  <WhatsAppLeadButton
                    buttonName={`${tracking}_location_whatsapp`}
                    leadSource={`Website Clínica ${city}`}
                    trackingParams={{ section: "location", page: tracking }}
                    whatsappMessage={whatsappMessage}
                    className="cta-button-primary text-center"
                  >
                    Agendar pelo WhatsApp
                  </WhatsAppLeadButton>
                </div>
              </div>
              {mapsEmbed && (
                <div className="relative aspect-video rounded-4xl overflow-hidden border border-blue-50 shadow-sm bg-white">
                  <iframe
                    title={mapTitle || `Mapa da clínica Auditik em ${placeLabel}`}
                    src={mapsEmbed}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-10 text-center">
              Dúvidas sobre o atendimento
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {faqItems.map((faq) => (
                <article
                  key={faq.question}
                  className="bg-bg-light-blue rounded-4xl p-7 border border-blue-50"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ClinicCityLinks currentPath={path} />

        <section className="py-24 bg-auditik-blue text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src={CTA_BACKGROUND}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="container-wide relative z-10 text-center max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Agende a avaliação em {placeLabel}
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              A consulta esclarece a audição e o tratamento. O aparelho só é indicado
              se ajudar no seu caso.
            </p>
            <Link
              href={APP_ROUTES.contato}
              onClick={() =>
                trackButtonClick(`${tracking}_final_cta`, { section: "final_cta" })
              }
              className="inline-flex min-h-11 items-center justify-center bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-3 px-8 rounded-full"
            >
              Agendar minha avaliação
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
