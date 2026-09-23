/**
 * LP Piracicaba — Google Appointment (self-schedule) for Meta Schedule campaigns.
 *
 * Photo brief (optional → public/images/auditik/lp/piracicaba/):
 * 1. Fachada / entrada Piracicaba — 16:9.
 * 2. Sala de atendimento — interior.
 * Until then, reuses Americana Philips bank assets.
 *
 * Conversion path: Google Appointment → Apps Script → Lead Control + Mail + Meta CAPI Schedule.
 * No site form CRM and no /obrigado/ LeadFormSubmit on this LP.
 */
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  GoogleAppointmentEmbed,
  LandingShell,
  LandingStickyCta,
  LandingIcon,
  LandingMapPreview,
} from "@components/Landing";
import type { LandingIconName } from "@components/Landing/LandingIcon";
import { WhatsAppLeadButton } from "@components/Common/WhatsAppLeadButton";
import { sendAttributionBeacon } from "@lib/attribution-beacon";
import { trackButtonClick } from "@lib/analytics";
import { APP_ROUTES, LP_ROUTES } from "@lib/routes";
import { getSEOMeta } from "@lib/seo";
import { absoluteUrl } from "@lib/site-url";

const LEAD_SOURCE = "LP Piracicaba Agendamento Meta";
const WHATSAPP_MESSAGE =
  "Olá Auditik, vim pela página de agendamento em Piracicaba e quero marcar minha avaliação gratuita na clínica.";

const EMBED_SRC =
  process.env.NEXT_PUBLIC_GOOGLE_APPOINTMENT_EMBED_SRC ||
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0bReaXUY72-pCVxlaAS-GkE6AkOVrShqUmRJFQ6kcAInMoofzZQcgGx4QMW87T3EzOnmDWTG1q?gv=true";
const FALLBACK_URL =
  process.env.NEXT_PUBLIC_GOOGLE_APPOINTMENT_FALLBACK_URL ||
  "https://calendar.app.google/PSa2k6ieR8A9Gai77";

const LP_IMG = "/images/auditik/lp/americana";
const PRODUCT_HAND = `${LP_IMG}/hero-hand.webp`;
const PRODUCT_SHOT = `${LP_IMG}/product-shot.webp`;
const CTA_BACKGROUND = `${LP_IMG}/cta-background.webp`;
const CLINIC_IMAGE = `${LP_IMG}/sala-atendimento.webp`;
const PHILIPS_LOGO = `${LP_IMG}/logo-philips.webp`;

const PIRACICABA_MAPS_URL = "https://maps.app.goo.gl/c6EiqgiPaQg3HUrK8";
const PIRACICABA_MAPS_EMBED =
  "https://maps.google.com/maps?q=Rua+Samuel+Neves,+1800,+Piracicaba+-+SP&hl=pt&z=15&output=embed";

const FOOTER_NOTE =
  "Clínica presencial: Rua Samuel Neves, 1800 — Jardim Europa, Piracicaba-SP";

const steps = [
  {
    step: "1",
    title: "Escolha o horário nesta página",
    text: "Selecione o dia e a hora que preferir e confirme seus dados. Você recebe a confirmação por e-mail.",
  },
  {
    step: "2",
    title: "Compareça na clínica de Piracicaba",
    text: "A consulta é presencial, na Rua Samuel Neves. O horário você marca pela internet; o atendimento é na clínica.",
  },
  {
    step: "3",
    title: "Avaliação gratuita, sem pressão",
    text: "Converse com a profissional, faça a avaliação e, se quiser, conheça os aparelhos Philips — sem obrigação de comprar.",
  },
];

const painPoints: {
  icon: LandingIconName;
  title: string;
  text: string;
}[] = [
  {
    icon: "forum",
    title: "Conversas cansativas",
    text: "Pedir para repetir o tempo todo, perder o fio da conversa ou evitar encontros porque não ouve bem.",
  },
  {
    icon: "tv",
    title: "TV e lugares barulhentos",
    text: "Volume alto em casa e dificuldade em restaurantes, igrejas ou ruas movimentadas.",
  },
  {
    icon: "visibility",
    title: "Receio de o aparelho aparecer",
    text: "Existem modelos Philips discretos. Na consulta você vê as opções e escolhe com calma.",
  },
];

const philipsBenefits: {
  icon: LandingIconName;
  title: string;
  text: string;
}[] = [
  {
    icon: "hearing",
    title: "Ouvir melhor a fala",
    text: "Aparelhos pensados para destacar a voz nas conversas do dia a dia.",
  },
  {
    icon: "bluetooth",
    title: "Discretos e recarregáveis",
    text: "Modelos pequenos, fáceis de usar no dia a dia — muitos sem precisar trocar pilha.",
  },
  {
    icon: "support_agent",
    title: "Acompanhamento na clínica",
    text: "Depois da adaptação, a equipe Auditik em Piracicaba continua ao seu lado nos ajustes.",
  },
];

const testimonials = [
  {
    text: "Fui muito bem atendida na Philips Aparelhos Auditivos em Piracicaba. Desde o primeiro contato, a equipe foi extremamente atenciosa, paciente e profissional.",
    author: "Amanda Soares",
  },
  {
    text: "Fomos bem recepcionados, a dra. domina o assunto, atenciosa, com explicações simples e objetivas. Muito amável e delicada com idosos.",
    author: "Antonio Carlos",
  },
  {
    text: "Excelente experiência com a fonoaudióloga. Eu e minha mãe fomos atendidas com extrema atenção, profissionalismo e cuidado.",
    author: "Sandra Melo",
  },
];

const faqItems = [
  {
    question: "A avaliação em Piracicaba é gratuita?",
    answer:
      "Sim. A avaliação não tem custo e você não precisa comprar nada. O objetivo é entender sua audição e, se fizer sentido, mostrar as opções de aparelhos Philips.",
  },
  {
    question: "A consulta é pela internet ou na clínica?",
    answer:
      "Só o horário é marcado pela internet, nesta página. A consulta é presencial, na clínica Auditik de Piracicaba, na Rua Samuel Neves.",
  },
  {
    question: "Preciso saber mexer bem no computador?",
    answer:
      "Não. Se preferir, peça ajuda a um filho, neto ou familiar para escolher o horário. Também pode falar conosco pelo WhatsApp.",
  },
  {
    question: "Posso levar um familiar?",
    answer:
      "Sim, e recomendamos. Ter alguém junto ajuda a entender as orientações e a decidir com mais tranquilidade.",
  },
  {
    question: "Quanto tempo dura a consulta?",
    answer:
      "Em geral cerca de uma hora e meia. É tempo para conversar, fazer a avaliação e conhecer os aparelhos com calma.",
  },
  {
    question: "Preciso levar um exame de audição?",
    answer:
      "Não é obrigatório. Se você já tiver um exame recente, pode trazer — isso ajuda. Caso contrário, a avaliação na clínica resolve.",
  },
  {
    question: "Como remarcar ou cancelar?",
    answer:
      "Use o link do e-mail de confirmação (Cancelar horário) ou fale conosco pelo WhatsApp da clínica. É simples e sem burocracia.",
  },
  {
    question: "O aparelho fica aparente?",
    answer:
      "Há modelos bem discretos. Na consulta presencial você vê as opções e escolhe o que se sente confortável para o dia a dia.",
  },
  {
    question: "Dá para parcelar o aparelho?",
    answer:
      "Sim. Se na avaliação você quiser seguir com um aparelho, explicamos o investimento e as formas de pagamento. A avaliação em si é gratuita.",
  },
];

function SectionHeader({
  eyebrow,
  title,
  lead,
  light = false,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  lead: string;
  light?: boolean;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div
      className={`mb-8 max-w-2xl md:mb-12 ${
        centered ? "mx-auto text-center" : ""
      }`}
    >
      <p
        className={`mb-3 text-xs font-bold uppercase tracking-widest ${
          light ? "text-auditik-yellow" : "text-auditik-blue"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mb-3 text-2xl font-extrabold leading-tight md:text-3xl lg:text-4xl ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      <p
        className={`text-base leading-relaxed md:text-lg ${
          light ? "text-white/85" : "text-slate-600"
        } ${centered ? "mx-auto max-w-xl" : ""}`}
      >
        {lead}
      </p>
    </div>
  );
}

export default function LpPiracicabaAgendamentoPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const seo = getSEOMeta({
    title: "Marque sua avaliação gratuita em Piracicaba | Auditik",
    description:
      "Escolha o horário pela internet. A consulta é presencial na clínica Auditik de Piracicaba — avaliação gratuita dos aparelhos Philips, sem compromisso.",
    canonical: absoluteUrl(LP_ROUTES.piracicabaAgendamento),
    noindex: true,
  });

  useEffect(() => {
    void sendAttributionBeacon();
  }, []);

  const scrollToAgenda = useCallback((buttonName: string) => {
    trackButtonClick(buttonName, {
      source: LEAD_SOURCE,
      page: "lp/piracicaba-agendamento",
    });
    void sendAttributionBeacon({ force: true });
    const el = document.getElementById("agenda");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const trustChips: { icon: LandingIconName; label: string }[] = [
    { icon: "event_available", label: "Avaliação gratuita" },
    { icon: "location_on", label: "Consulta na clínica" },
    { icon: "verified", label: "Aparelhos Philips originais" },
  ];

  const whatsappClassOutline =
    "w-full rounded-full border-2 border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition-colors hover:border-auditik-blue hover:text-auditik-blue";
  const whatsappClassSolid =
    "w-full rounded-full bg-auditik-blue px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-auditik-dark-blue sm:w-auto sm:px-8";
  const whatsappClassFinal =
    "inline-flex w-full items-center justify-center rounded-full border-2 border-white/40 bg-transparent px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10 sm:w-auto";
  const whatsappClassSticky =
    "flex h-full w-full items-center justify-center rounded-full border-2 border-auditik-blue bg-white px-4 text-sm font-extrabold text-auditik-blue transition-colors hover:bg-auditik-blue/5";

  return (
    <>
      <NextSeo {...seo} noindex nofollow />
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <LandingShell showReservedRights footerNote={FOOTER_NOTE}>
        <main className="overflow-x-hidden pb-32 md:pb-0">
          {/* Hero */}
          <section className="relative overflow-hidden py-8 sm:py-12 md:py-20">
            <Image
              src={PRODUCT_HAND}
              alt=""
              fill
              className="object-cover object-[12%_42%] sm:object-[18%_40%] lg:object-[22%_38%]"
              priority
              sizes="100vw"
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-cream/55 via-bg-cream/78 to-bg-cream/90" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg-cream/25 via-transparent to-bg-cream/40 md:hidden" />

            <div className="container-wide relative grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div className="relative z-[1]">
                <div className="mb-4 flex flex-wrap items-center gap-3 sm:mb-5">
                  <Image
                    src={PHILIPS_LOGO}
                    alt="Philips — aparelhos auditivos originais na Auditik"
                    width={200}
                    height={72}
                    className="h-12 w-auto object-contain sm:h-16"
                  />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-auditik-blue sm:text-xs">
                    Aparelhos Philips originais · Piracicaba-SP
                  </span>
                </div>

                <h1 className="mb-4 text-[1.65rem] font-extrabold leading-[1.15] text-slate-900 sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                  Marque sua avaliação gratuita em{" "}
                  <span className="text-auditik-blue">Piracicaba</span>
                </h1>
                <p className="mb-5 max-w-xl text-base leading-relaxed text-slate-800 sm:mb-6 md:text-lg">
                  Você escolhe o horário pela internet. A consulta é{" "}
                  <strong>presencial</strong>, na clínica Auditik da Rua Samuel
                  Neves — sem compromisso de compra.
                </p>

                <ul className="mb-6 flex flex-wrap gap-2">
                  {trustChips.map((chip) => (
                    <li
                      key={chip.label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-white/90 px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm sm:px-3 sm:text-sm"
                    >
                      <LandingIcon
                        name={chip.icon}
                        className="h-4 w-4 text-auditik-blue sm:h-5 sm:w-5"
                      />
                      {chip.label}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => scrollToAgenda("lp_piracicaba_hero_agenda")}
                  className="w-full min-h-12 rounded-full bg-auditik-yellow px-6 py-4 text-sm font-extrabold uppercase tracking-widest text-slate-900 shadow-lg shadow-auditik-yellow/25 transition-all hover:bg-yellow-400 hover:scale-[1.01] active:scale-[0.99] sm:w-auto sm:px-10"
                >
                  Ver horários disponíveis
                </button>
              </div>

              <div className="relative z-[1] rounded-3xl border border-blue-100/80 bg-white/75 p-5 shadow-layered backdrop-blur-sm sm:p-6 md:p-8">
                <h2 className="mb-2 text-xl font-extrabold text-slate-900 md:text-2xl">
                  Como funciona
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                  Três passos simples: marcar o horário, ir à clínica e fazer a
                  avaliação gratuita.
                </p>
                <ol className="space-y-4">
                  {steps.map((item) => (
                    <li key={item.step} className="flex gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-auditik-blue text-sm font-extrabold text-white">
                        {item.step}
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">{item.title}</p>
                        <p className="text-sm leading-relaxed text-slate-600">
                          {item.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* Agenda embed */}
          <section
            id="agenda"
            className="scroll-mt-24 border-t border-slate-100 bg-bg-light-blue py-10 sm:py-16 md:py-20"
          >
            <div className="container-wide">
              <SectionHeader
                eyebrow="Marque seu horário"
                title="Escolha o dia e a hora"
                lead="Confirme nome, e-mail e WhatsApp uma vez. Você recebe a confirmação por e-mail. A consulta será na clínica de Piracicaba."
              />

              <div className="-mx-1 sm:mx-0">
                <GoogleAppointmentEmbed
                  embedSrc={EMBED_SRC}
                  fallbackUrl={FALLBACK_URL}
                  title="Agendar avaliação gratuita em Piracicaba"
                  onReveal={() => {
                    trackButtonClick("lp_piracicaba_agenda_reveal", {
                      source: LEAD_SOURCE,
                      page: "lp/piracicaba-agendamento",
                    });
                    void sendAttributionBeacon({ force: true });
                  }}
                />
              </div>

              <p className="mt-4 px-1 text-center text-xs leading-relaxed text-slate-600 sm:px-0">
                Ao agendar, você autoriza o contato da Auditik sobre sua
                avaliação.{" "}
                <Link
                  href={APP_ROUTES.privacyPolicy}
                  className="font-semibold text-auditik-blue underline-offset-2 hover:underline"
                >
                  Política de Privacidade
                </Link>
              </p>
            </div>
          </section>

          {/* Clínica + objetivo da visita */}
          <section className="border-t border-slate-100 bg-white py-12 sm:py-16 md:py-24">
            <div className="container-wide">
              <SectionHeader
                eyebrow="Nossa clínica"
                title="Consulta presencial em Piracicaba"
                lead="A Auditik cuida da sua audição com paciência e clareza. Você marca o horário pela internet; o atendimento é na clínica, de frente com a nossa equipe."
              />

              <div className="mb-10 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: "Conversa com a profissional",
                    text: "Contamos como está sua audição no dia a dia — TV, conversas, família.",
                  },
                  {
                    title: "Avaliação na clínica",
                    text: "Se fizer sentido, fazemos o exame de audição ali mesmo, com calma.",
                  },
                  {
                    title: "Conhecer os aparelhos Philips",
                    text: "Você vê opções discretas e decide sem pressão de compra.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-blue-50 bg-bg-light-blue p-5 md:p-6"
                  >
                    <h3 className="mb-2 text-base font-bold text-slate-900 md:text-lg">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
                <div className="overflow-hidden rounded-3xl shadow-soft sm:rounded-4xl">
                  <Image
                    src={CLINIC_IMAGE}
                    alt="Sala de atendimento da clínica Auditik"
                    width={1200}
                    height={800}
                    className="h-52 w-full object-cover sm:h-64 md:h-full md:min-h-[22rem]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className="flex flex-col gap-5">
                  <div className="rounded-3xl border border-blue-50 bg-bg-light-blue p-5 sm:p-6 md:p-7">
                    <div className="mb-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                      <Image
                        src={PHILIPS_LOGO}
                        alt="Philips"
                        width={240}
                        height={80}
                        className="h-14 w-auto object-contain sm:h-20"
                      />
                      <p className="text-sm font-semibold text-slate-700 md:text-base">
                        Aparelhos Philips originais na Auditik
                      </p>
                    </div>

                    <p className="mb-1 text-base font-bold text-slate-900 sm:text-lg">
                      Rua Samuel Neves, 1800
                    </p>
                    <p className="mb-5 text-slate-600">
                      Jardim Europa, Piracicaba - SP
                    </p>

                    <a
                      href={PIRACICABA_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackButtonClick("lp_piracicaba_maps", {
                          source: LEAD_SOURCE,
                          section: "local_proof",
                        })
                      }
                      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border-2 border-auditik-blue bg-white px-5 py-2.5 text-sm font-bold text-auditik-blue transition-colors hover:bg-auditik-blue hover:text-white sm:w-auto"
                    >
                      <LandingIcon name="map" className="h-5 w-5" />
                      Abrir no Google Maps
                    </a>
                  </div>

                  <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-soft">
                    <LandingMapPreview
                      title="Mapa da clínica Auditik em Piracicaba"
                      embedSrc={PIRACICABA_MAPS_EMBED}
                      onReveal={() =>
                        trackButtonClick("lp_piracicaba_map_reveal", {
                          source: LEAD_SOURCE,
                          section: "local_proof",
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sinais do dia a dia */}
          <section className="bg-bg-light-blue py-12 sm:py-16 md:py-24">
            <div className="container-wide">
              <SectionHeader
                eyebrow="Sinais comuns"
                title="Se a audição está atrapalhando o dia a dia, há o que fazer"
                lead="Muitas pessoas em Piracicaba chegam com os mesmos sinais. A avaliação gratuita mostra o caminho com clareza — na clínica, com calma."
              />
              <div className="grid gap-6 md:grid-cols-3 md:gap-8">
                {painPoints.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-4xl border border-blue-50 bg-white p-6 md:p-8"
                  >
                    <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-auditik-blue/10">
                      <LandingIcon
                        name={item.icon}
                        className="h-6 w-6 text-auditik-blue"
                      />
                    </span>
                    <h3 className="mb-2 text-lg font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="leading-relaxed text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Philips */}
          <section className="bg-white py-12 sm:py-16 md:py-24">
            <div className="container-wide">
              <SectionHeader
                eyebrow="Aparelhos Philips"
                title="Por que Philips na Auditik de Piracicaba"
                lead="Trabalhamos com a linha Philips HearLink — aparelhos originais, com indicação e acompanhamento na nossa clínica. Sem catálogo confuso: a consulta mostra o que faz sentido para você."
              />

              <div className="mb-10 grid items-stretch gap-6 md:mb-12 lg:grid-cols-2 lg:gap-8">
                <div className="flex flex-col justify-center rounded-4xl border border-blue-50 bg-bg-light-blue p-6 md:p-8">
                  <Image
                    src={PRODUCT_SHOT}
                    alt="Aparelho auditivo Philips em detalhe"
                    width={1200}
                    height={1200}
                    className="mx-auto h-auto w-full max-w-md object-contain"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <p className="mt-4 text-center text-sm font-semibold text-slate-700">
                    Philips — design discreto para o dia a dia
                  </p>
                </div>
                <div className="relative overflow-hidden rounded-4xl shadow-soft">
                  <Image
                    src={PRODUCT_HAND}
                    alt="Tamanho real do aparelho Philips na mão"
                    width={1200}
                    height={800}
                    className="h-full min-h-[14rem] w-full object-cover object-[20%_40%] sm:min-h-[16rem] sm:object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/70 to-transparent p-5 md:p-6">
                    <p className="text-sm font-bold text-white md:text-base">
                      Pequeno o bastante para caber entre os dedos — discreto no
                      dia a dia
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3 md:gap-8">
                {philipsBenefits.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-4xl border border-blue-50 bg-bg-light-blue p-6 md:p-8"
                  >
                    <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white">
                      <LandingIcon
                        name={item.icon}
                        className="h-6 w-6 text-auditik-blue"
                      />
                    </span>
                    <h3 className="mb-2 text-lg font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="leading-relaxed text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Como funciona (seção expandida) */}
          <section className="bg-bg-light-blue py-12 sm:py-16 md:py-24">
            <div className="container-wide">
              <SectionHeader
                eyebrow="Passo a passo"
                title="Do horário na internet até a consulta na clínica"
                lead="Três passos simples até a avaliação presencial em Piracicaba."
              />

              <div className="relative mb-10 grid gap-6 md:grid-cols-3 md:gap-8">
                <div
                  className="pointer-events-none absolute left-[16%] right-[16%] top-8 hidden h-0.5 bg-auditik-blue/20 md:block"
                  aria-hidden
                />
                {steps.map((item) => (
                  <div
                    key={item.step}
                    className="relative rounded-4xl border border-blue-50 bg-white p-6 md:p-8"
                  >
                    <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-auditik-blue text-base font-extrabold text-white shadow-soft">
                      {item.step}
                    </span>
                    <h3 className="mb-2 text-lg font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="leading-relaxed text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 rounded-3xl border border-blue-50 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:rounded-4xl md:p-6">
                <p className="text-center text-sm font-semibold text-slate-700 sm:text-left md:text-base">
                  Pronto para escolher seu horário?
                </p>
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => scrollToAgenda("lp_piracicaba_mid_agenda")}
                    className="w-full min-h-12 rounded-full bg-auditik-yellow px-8 py-3.5 text-sm font-extrabold uppercase tracking-widest text-slate-900 transition-colors hover:bg-yellow-400 sm:w-auto"
                  >
                    Ver horários
                  </button>
                  <WhatsAppLeadButton
                    buttonName="lp_piracicaba_mid_whatsapp"
                    leadSource={LEAD_SOURCE}
                    trackingParams={{
                      section: "how_it_works",
                      page: "lp/piracicaba-agendamento",
                    }}
                    whatsappMessage={WHATSAPP_MESSAGE}
                    className={whatsappClassSolid}
                  >
                    Falar no WhatsApp
                  </WhatsAppLeadButton>
                </div>
              </div>
            </div>
          </section>

          {/* Depoimentos */}
          <section className="bg-white py-12 sm:py-16 md:py-24">
            <div className="container-wide">
              <SectionHeader
                eyebrow="Depoimentos"
                title="O que dizem nossos pacientes"
                lead="Experiências reais de quem passou pela avaliação e pelo cuidado da equipe Auditik."
              />
              <div className="grid gap-6 md:grid-cols-3 md:gap-8">
                {testimonials.map((item) => (
                  <blockquote
                    key={item.author}
                    className="relative rounded-4xl border border-blue-50 bg-bg-light-blue p-6 md:p-8"
                  >
                    <span
                      className="pointer-events-none absolute left-5 top-3 text-5xl font-extrabold leading-none text-auditik-blue/20"
                      aria-hidden
                    >
                      &ldquo;
                    </span>
                    <p className="relative z-[1] mb-5 pt-4 leading-relaxed text-slate-600">
                      {item.text}
                    </p>
                    <footer>
                      <cite className="not-italic text-sm font-bold text-slate-900">
                        {item.author}
                      </cite>
                      <p className="mt-0.5 text-sm text-slate-500">
                        Google Review
                      </p>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-bg-light-blue py-12 sm:py-16 md:py-24">
            <div className="container-wide mx-auto max-w-3xl">
              <SectionHeader
                eyebrow="Dúvidas"
                title="Perguntas frequentes"
                lead="Respostas simples antes de marcar sua avaliação presencial em Piracicaba."
              />
              <ul className="space-y-3">
                {faqItems.map((item, index) => {
                  const open = openFaqIndex === index;
                  return (
                    <li
                      key={item.question}
                      className="overflow-hidden rounded-2xl border border-blue-100 bg-white"
                    >
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-sm font-bold text-slate-900 sm:px-5 sm:text-base"
                        aria-expanded={open}
                        onClick={() =>
                          setOpenFaqIndex(open ? null : index)
                        }
                      >
                        <span className="min-w-0 flex-1 pr-1">{item.question}</span>
                        <LandingIcon
                          name={open ? "remove" : "add"}
                          className="h-6 w-6 shrink-0 text-auditik-blue"
                        />
                      </button>
                      {open ? (
                        <p className="border-t border-slate-100 px-4 py-4 text-sm leading-relaxed text-slate-600 sm:px-5 sm:text-base">
                          {item.answer}
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          {/* Final CTA */}
          <section className="relative overflow-hidden py-14 sm:py-20">
            <Image
              src={CTA_BACKGROUND}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              aria-hidden
            />
            <div className="absolute inset-0 bg-auditik-dark-blue/85" />
            <div className="container-wide relative mx-auto flex max-w-3xl flex-col items-center text-center">
              <SectionHeader
                light
                align="center"
                eyebrow="Pronto para ouvir melhor"
                title="Reserve seu horário agora"
                lead="Escolha o horário pela internet. A avaliação gratuita é presencial, na clínica Auditik de Piracicaba."
              />
              <div className="flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
                <button
                  type="button"
                  onClick={() => scrollToAgenda("lp_piracicaba_final_agenda")}
                  className="w-full min-h-12 rounded-full bg-auditik-yellow px-8 py-4 text-sm font-extrabold uppercase tracking-widest text-slate-900 transition-colors hover:bg-yellow-400 sm:w-auto"
                >
                  Ir para a agenda
                </button>
                <WhatsAppLeadButton
                  buttonName="lp_piracicaba_final_whatsapp"
                  leadSource={LEAD_SOURCE}
                  trackingParams={{
                    section: "final_cta",
                    page: "lp/piracicaba-agendamento",
                  }}
                  whatsappMessage={WHATSAPP_MESSAGE}
                  className={whatsappClassFinal}
                >
                  Preferir WhatsApp
                </WhatsAppLeadButton>
              </div>
              <p className="mt-4 max-w-md text-xs leading-relaxed text-white/70 sm:max-w-lg">
                Se a agenda não carregar no seu aparelho, fale conosco pelo
                WhatsApp — a equipe ajuda a marcar o horário da consulta na
                clínica.
              </p>
            </div>
          </section>

          {/* Secondary mid WhatsApp (desktop helper) */}
          <section className="hidden border-t border-slate-100 bg-white py-8 md:block">
            <div className="container-wide max-w-lg text-center">
              <WhatsAppLeadButton
                buttonName="lp_piracicaba_footer_whatsapp"
                leadSource={LEAD_SOURCE}
                trackingParams={{
                  section: "footer_helper",
                  page: "lp/piracicaba-agendamento",
                }}
                whatsappMessage={WHATSAPP_MESSAGE}
                className={whatsappClassOutline}
              >
                Falar no WhatsApp
              </WhatsAppLeadButton>
            </div>
          </section>
        </main>

        <LandingStickyCta
          onScheduleClick={() => scrollToAgenda("lp_piracicaba_sticky_agenda")}
          scheduleLabel="Horários"
          whatsappButton={
            <WhatsAppLeadButton
              buttonName="lp_piracicaba_sticky_whatsapp"
              leadSource={LEAD_SOURCE}
              trackingParams={{
                section: "sticky",
                page: "lp/piracicaba-agendamento",
              }}
              whatsappMessage={WHATSAPP_MESSAGE}
              className={whatsappClassSticky}
            >
              WhatsApp
            </WhatsAppLeadButton>
          }
        />
      </LandingShell>
    </>
  );
}
