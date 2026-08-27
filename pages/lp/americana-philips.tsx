/**
 * LP Americana × Philips HearLink — paid traffic conversion page.
 *
 * Photo brief (produce later → public/images/auditik/lp/americana/):
 * 1. Fachada / entrada da unidade Americana — 16:9, placa Auditik legível.
 * 2. Sala de atendimento Americana — interior acolhedor.
 * 3. Fono + paciente (com termo) — conversa/orientação, luz natural.
 * 4. Close discreto HearLink no uso cotidiano (55–70 anos).
 * 5. Selo “Distribuidor autorizado Philips · Americana” (arte gráfica).
 *
 * Until then, reuses Philips bank + sala_atendimento.webp.
 */
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { LandingShell, LandingStickyCta, LandingIcon, LandingMapPreview } from "@components/Landing";
import type { LandingIconName } from "@components/Landing/LandingIcon";
import { WhatsAppLeadButton } from "@components/Common/WhatsAppLeadButton";
import {
  trackButtonClick,
  trackFormSubmit,
} from "@lib/analytics";
import { formatBrazilPhone, submitLeadToCRM } from "@lib/lead-submission";
import { markThankYouSuccess } from "@lib/thank-you";
import { LP_ROUTES } from "@lib/routes";
import { getSEOMeta } from "@lib/seo";
import { absoluteUrl } from "@lib/site-url";
import { WHATSAPP_LEAD_CITIES } from "@lib/whatsapp-cities";

const LEAD_SOURCE = "LP Americana Philips";
const WHATSAPP_MESSAGE =
  "Olá Auditik, vim pela página de Americana e quero agendar avaliação gratuita dos aparelhos Philips HearLink.";

const LP_IMG = "/images/auditik/lp/americana";
const PRODUCT_HAND = `${LP_IMG}/hero-hand.webp`;
const PRODUCT_SHOT = `${LP_IMG}/product-shot.webp`;
const CTA_BACKGROUND = `${LP_IMG}/cta-background.webp`;
const CLINIC_IMAGE = `${LP_IMG}/sala-atendimento.webp`;
const PHILIPS_LOGO = `${LP_IMG}/logo-philips.webp`;

const AMERICANA_MAPS_URL = "https://maps.app.goo.gl/j4sTcPKXbBirS1JUA";
const AMERICANA_MAPS_EMBED =
  "https://maps.google.com/maps?q=Rua+Lu%C3%ADza+Meneghel+Mancine,+72,+Americana+-+SP&hl=pt&z=15&output=embed";

const painPoints: {
  icon: LandingIconName;
  title: string;
  text: string;
}[] = [
  {
    icon: "forum",
    title: "Conversas cansativas",
    text: "Peça para repetir, perca o fio em reuniões ou evite encontros por não ouvir bem.",
  },
  {
    icon: "tv",
    title: "TV e ambientes ruidosos",
    text: "Volume alto em casa e dificuldade em restaurantes, igrejas ou ruas movimentadas.",
  },
  {
    icon: "visibility",
    title: "Medo do aparelho aparecer",
    text: "Modelos Philips HearLink discretos — a avaliação mostra opções alinhadas ao seu perfil.",
  },
];

const philipsBenefits: {
  icon: LandingIconName;
  title: string;
  text: string;
}[] = [
  {
    icon: "hearing",
    title: "Clareza de fala",
    text: "Tecnologia pensada para destacar voz em situações reais do dia a dia.",
  },
  {
    icon: "bluetooth",
    title: "Conectividade e recarga",
    text: "Linha com opções recarregáveis e conexão ao celular quando indicado na consulta.",
  },
  {
    icon: "support_agent",
    title: "Acompanhamento na Auditik",
    text: "Distribuidor autorizado Philips com ajustes e orientação clínica em Americana.",
  },
];

const steps = [
  {
    step: "1",
    title: "Agende a avaliação gratuita",
    text: "Preencha o formulário ou fale no WhatsApp. Confirmamos horário na unidade de Americana.",
  },
  {
    step: "2",
    title: "Avaliação com fonoaudiólogo",
    text: "Exame e conversa sobre sua rotina para indicar o Philips HearLink mais adequado.",
  },
  {
    step: "3",
    title: "Teste e adaptação",
    text: "Você conhece a tecnologia na prática e decide com tranquilidade, sem pressão.",
  },
];

const testimonials = [
  {
    text: "Excelente experiência com a fonoaudióloga. Eu e minha mãe fomos atendidas com extrema atenção, profissionalismo e cuidado.",
    author: "Sandra Melo",
  },
  {
    text: "Fomos bem recepcionados, a dra. domina o assunto, atenciosa, com explicações simples e objetivas. Muito amável com idosos.",
    author: "Antonio Carlos",
  },
  {
    text: "Atendimento com excelência, desde a venda e pós-venda. Ambiente acolhedor. Satisfeito com meu aparelho Philips.",
    author: "Meire Ribeiro de Souza",
  },
];

const faqItems = [
  {
    question: "A avaliação auditiva em Americana é gratuita?",
    answer:
      "Sim. Agende sem compromisso para conhecer seu perfil auditivo e as opções Philips HearLink com nossa equipe.",
  },
  {
    question: "Quanto tempo dura a primeira consulta?",
    answer:
      "Em geral cerca de 1h30: avaliação completa, entendimento da rotina e indicação do modelo. Depois você pode testar com mais tranquilidade.",
  },
  {
    question: "Posso levar um familiar?",
    answer:
      "Sim, e recomendamos. O apoio da família facilita a adaptação e a decisão sobre o tratamento.",
  },
  {
    question: "O aparelho fica visível?",
    answer:
      "Há formatos discretos. Na consulta você vê opções e escolhe com orientação profissional, sem surpresa estética.",
  },
  {
    question: "Dá para parcelar o aparelho?",
    answer:
      "Sim. Na consulta explicamos investimento e condições de parcelamento disponíveis. A avaliação em si não tem custo.",
  },
];

type FormState = {
  nome: string;
  whatsapp: string;
  cidade: string;
  paraQuem: string;
};

const emptyForm = (): FormState => ({
  nome: "",
  whatsapp: "",
  cidade: "Americana",
  paraQuem: "",
});

function LeadFormFields({
  formData,
  onChange,
  formError,
  formSubmitting,
  idPrefix,
}: {
  formData: FormState;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  formError: string;
  formSubmitting: boolean;
  idPrefix: string;
}) {
  const fieldClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-800 outline-none transition-all focus:border-auditik-blue focus:bg-white focus:ring-2 focus:ring-auditik-blue/20";
  const labelClass =
    "mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500";

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor={`${idPrefix}-nome`} className={labelClass}>
          Nome
        </label>
        <input
          id={`${idPrefix}-nome`}
          name="nome"
          value={formData.nome}
          onChange={onChange}
          placeholder="Como gostaria de ser chamado(a)?"
          required
          maxLength={100}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor={`${idPrefix}-whatsapp`} className={labelClass}>
          Telefone com DDD
        </label>
        <input
          id={`${idPrefix}-whatsapp`}
          name="whatsapp"
          type="tel"
          value={formData.whatsapp}
          onChange={onChange}
          placeholder="(00) 00000-0000"
          maxLength={15}
          required
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor={`${idPrefix}-cidade`} className={labelClass}>
          Cidade
        </label>
        <select
          id={`${idPrefix}-cidade`}
          name="cidade"
          value={formData.cidade}
          onChange={onChange}
          required
          className={`${fieldClass} cursor-pointer`}
        >
          <option value="">Selecione uma cidade</option>
          {WHATSAPP_LEAD_CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-paraQuem`} className={labelClass}>
          Para quem será o aparelho?
        </label>
        <select
          id={`${idPrefix}-paraQuem`}
          name="paraQuem"
          value={formData.paraQuem}
          onChange={onChange}
          required
          className={`${fieldClass} cursor-pointer`}
        >
          <option value="">Selecione uma opção</option>
          <option value="Para eu mesmo(a)">Para eu mesmo(a)</option>
          <option value="Para um amigo ou familiar">Para um amigo ou familiar</option>
          <option value="Para outra pessoa">Para outra pessoa</option>
        </select>
      </div>

      {formError ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={formSubmitting}
        className="w-full min-h-12 rounded-full bg-auditik-yellow px-6 py-4 text-sm font-extrabold uppercase tracking-widest text-slate-900 shadow-lg shadow-auditik-yellow/25 transition-all hover:bg-yellow-400 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
      >
        {formSubmitting ? "Enviando..." : "Quero agendar minha avaliação"}
      </button>

      <p className="text-center text-xs leading-relaxed text-slate-600">
        Sem compromisso · Dados protegidos · Unidade em Americana
      </p>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  lead,
  light = false,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  light?: boolean;
}) {
  return (
    <div className="mb-10 max-w-2xl md:mb-12">
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
        }`}
      >
        {lead}
      </p>
    </div>
  );
}

export default function LpAmericanaPhilipsPage() {
  const [formData, setFormData] = useState<FormState>(emptyForm);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const seo = getSEOMeta({
    title: "Aparelhos auditivos Philips em Americana — avaliação gratuita | Auditik",
    description:
      "Avaliação auditiva gratuita em Americana-SP. Distribuidor autorizado Philips HearLink. Agende na Auditik ou fale no WhatsApp.",
    canonical: absoluteUrl(LP_ROUTES.americanaPhilips),
    noindex: true,
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "whatsapp") {
      setFormData((prev) => ({ ...prev, whatsapp: formatBrazilPhone(value) }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formSubmitting) return;

    setFormSubmitting(true);
    setFormError("");

    try {
      await submitLeadToCRM({
        fullName: formData.nome,
        phone: formData.whatsapp,
        city: formData.cidade,
        paraQuem: formData.paraQuem,
        fallbackSource: LEAD_SOURCE,
        formName: LEAD_SOURCE,
      });

      trackFormSubmit("lp_americana_philips", {
        cidade: formData.cidade,
        para_quem: formData.paraQuem,
        page: "lp/americana-philips",
      });

      markThankYouSuccess({
        form: "contact",
        source: LEAD_SOURCE,
      });
    } catch (error) {
      console.error("LP Americana form submission error:", error);
      setFormError(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar seus dados agora. Tente novamente.",
      );
    } finally {
      setFormSubmitting(false);
    }
  };

  const scrollToForm = (buttonName: string) => {
    trackButtonClick(buttonName, {
      source: LEAD_SOURCE,
      page: "lp/americana-philips",
    });
    const el = document.getElementById("form");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const whatsappClassOutline =
    "w-full rounded-full border-2 border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition-colors hover:border-auditik-blue hover:text-auditik-blue";
  const whatsappClassSolid =
    "w-full rounded-full bg-auditik-blue px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-auditik-dark-blue sm:w-auto sm:px-8";
  const whatsappClassFinal =
    "w-full rounded-full bg-auditik-yellow px-8 py-4 text-sm font-extrabold uppercase tracking-widest text-slate-900 transition-colors hover:bg-yellow-400 sm:w-auto";
  const whatsappClassSticky =
    "flex h-full w-full items-center justify-center rounded-full border-2 border-auditik-blue bg-white px-4 text-sm font-extrabold text-auditik-blue transition-colors hover:bg-auditik-blue/5";

  const trustChips: { icon: LandingIconName; label: string }[] = [
    { icon: "verified", label: "Philips autorizado" },
    { icon: "event_available", label: "Avaliação gratuita" },
    { icon: "location_on", label: "Unidade em Americana" },
  ];

  return (
    <>
      <NextSeo {...seo} noindex nofollow />
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <LandingShell>
        <main className="pb-32 md:pb-0">
          {/* Hero */}
          <section className="relative overflow-hidden py-10 sm:py-12 md:py-20">
            <Image
              src={PRODUCT_HAND}
              alt=""
              fill
              className="object-cover object-[12%_42%] sm:object-[18%_40%] lg:object-[22%_38%]"
              priority
              sizes="100vw"
              aria-hidden
            />
            {/* Asymmetric wash: lighter on the left so hand/device read behind copy; denser on the right for the form */}
            <div className="absolute inset-0 bg-gradient-to-r from-bg-cream/50 via-bg-cream/72 to-bg-cream/88" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg-cream/25 via-transparent to-bg-cream/35 md:hidden" />

            <div className="container-wide relative grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div className="relative z-[1]">
                <div className="mb-4 flex flex-wrap items-center gap-3 sm:mb-5">
                  <Image
                    src={PHILIPS_LOGO}
                    alt="Philips Hearing Solutions — distribuidor autorizado"
                    width={200}
                    height={72}
                    className="h-12 w-auto object-contain sm:h-16"
                  />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-auditik-blue sm:text-xs">
                    Distribuidor autorizado · Americana-SP
                  </span>
                </div>

                <h1 className="mb-4 text-[1.65rem] font-extrabold leading-[1.15] text-slate-900 sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                  Aparelhos auditivos Philips em Americana —{" "}
                  <span className="text-auditik-blue">avaliação gratuita</span>
                </h1>
                <p className="mb-5 max-w-xl text-base leading-relaxed text-slate-800 sm:mb-6 md:text-lg">
                  Avalie sua audição na Auditik em Americana e conheça os aparelhos
                  Philips HearLink com orientação de fonoaudiólogos — sem compromisso.
                </p>

                <ul className="flex flex-wrap gap-2">
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
              </div>

              <div
                id="form"
                className="scroll-mt-28 rounded-3xl border border-blue-100/80 bg-white/70 p-5 shadow-layered backdrop-blur-sm sm:p-6 md:p-8"
              >
                <h2 className="mb-1 text-xl font-extrabold text-slate-900 md:text-2xl">
                  Agende sua avaliação em Americana
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-slate-600">
                  Preencha e nossa equipe retorna para confirmar o horário.
                </p>

                <form onSubmit={handleFormSubmit}>
                  <LeadFormFields
                    formData={formData}
                    onChange={handleFormChange}
                    formError={formError}
                    formSubmitting={formSubmitting}
                    idPrefix="hero"
                  />
                </form>

                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center" aria-hidden>
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white/70 px-3 text-xs font-bold uppercase tracking-widest text-slate-500">
                      ou
                    </span>
                  </div>
                </div>

                <WhatsAppLeadButton
                  buttonName="lp_americana_hero_whatsapp"
                  leadSource={LEAD_SOURCE}
                  trackingParams={{
                    section: "hero",
                    page: "lp/americana-philips",
                  }}
                  whatsappMessage={WHATSAPP_MESSAGE}
                  className={whatsappClassOutline}
                >
                  Preferir WhatsApp
                </WhatsAppLeadButton>
              </div>
            </div>
          </section>

          {/* Prova local */}
          <section className="border-t border-slate-100 bg-white py-12 sm:py-16 md:py-24">
            <div className="container-wide">
              <SectionHeader
                eyebrow="Unidade local"
                title="Clínica Auditik em Americana"
                lead="Atendimento presencial na unidade de Americana, com aparelhos Philips HearLink e acompanhamento clínico humanizado."
              />

              <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
                <div className="overflow-hidden rounded-3xl shadow-soft sm:rounded-4xl">
                  <Image
                    src={CLINIC_IMAGE}
                    alt="Sala de atendimento Auditik"
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
                        alt="Philips Hearing Solutions"
                        width={240}
                        height={80}
                        className="h-14 w-auto object-contain sm:h-20"
                      />
                      <p className="text-sm font-semibold text-slate-700 md:text-base">
                        Distribuidor autorizado Philips
                      </p>
                    </div>

                    <p className="mb-1 text-base font-bold text-slate-900 sm:text-lg">
                      Rua Luíza Meneghel Mancine, 72 — Sala 12
                    </p>
                    <p className="mb-5 text-slate-600">
                      Jardim Paulista, Americana - SP
                    </p>

                    <a
                      href={AMERICANA_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackButtonClick("lp_americana_maps", {
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
                      title="Mapa Auditik Americana"
                      embedSrc={AMERICANA_MAPS_EMBED}
                      onReveal={() =>
                        trackButtonClick("lp_americana_map_reveal", {
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

          {/* Dor → alívio */}
          <section className="bg-bg-light-blue py-12 sm:py-16 md:py-24">
            <div className="container-wide">
              <SectionHeader
                eyebrow="Sinais comuns"
                title="Se a audição está atrapalhando o dia a dia, há o que fazer"
                lead="Muitas pessoas em Americana chegam com os mesmos sinais. A avaliação gratuita mostra o caminho com clareza."
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

          {/* Por que Philips */}
          <section className="bg-white py-12 sm:py-16 md:py-24">
            <div className="container-wide">
              <SectionHeader
                eyebrow="Philips HearLink"
                title="Por que Philips HearLink na Auditik"
                lead="Tecnologia Philips com indicação e acompanhamento clínico em Americana — sem catálogo confuso: a consulta define o que faz sentido para você."
              />

              {/* Product spotlight: packshot + hand (discreet scale) */}
              <div className="mb-10 grid items-stretch gap-6 md:mb-12 lg:grid-cols-2 lg:gap-8">
                <div className="flex flex-col justify-center rounded-4xl border border-blue-50 bg-bg-light-blue p-6 md:p-8">
                  <Image
                    src={PRODUCT_SHOT}
                    alt="Philips HearLink 50 miniRITE em detalhe"
                    width={1200}
                    height={1200}
                    className="mx-auto h-auto w-full max-w-md object-contain"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <p className="mt-4 text-center text-sm font-semibold text-slate-700">
                    Philips HearLink — design discreto e tecnologia de ponta
                  </p>
                </div>
                <div className="relative overflow-hidden rounded-4xl shadow-soft">
                  <Image
                    src={PRODUCT_HAND}
                    alt="Tamanho real do aparelho Philips HearLink na mão"
                    width={1200}
                    height={800}
                    className="h-full min-h-[14rem] w-full object-cover object-[20%_40%] sm:min-h-[16rem] sm:object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/70 to-transparent p-5 md:p-6">
                    <p className="text-sm font-bold text-white md:text-base">
                      Compacto o bastante para caber entre os dedos — discreto no dia a
                      dia
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

          {/* Como funciona */}
          <section className="bg-white py-12 sm:py-16 md:py-24">
            <div className="container-wide">
              <SectionHeader
                eyebrow="Passo a passo"
                title="Como funciona"
                lead="Três passos simples até a avaliação na unidade de Americana."
              />

              <div className="relative mb-10 grid gap-6 md:grid-cols-3 md:gap-8">
                <div
                  className="pointer-events-none absolute left-[16%] right-[16%] top-8 hidden h-0.5 bg-auditik-blue/20 md:block"
                  aria-hidden
                />
                {steps.map((item) => (
                  <div
                    key={item.step}
                    className="relative rounded-4xl border border-blue-50 bg-bg-light-blue p-6 md:p-8"
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

              <div className="flex flex-col gap-3 rounded-4xl border border-blue-50 bg-bg-light-blue p-4 sm:flex-row sm:items-center sm:justify-between md:p-6">
                <p className="text-sm font-semibold text-slate-700 md:text-base">
                  Pronto para o próximo passo?
                </p>
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => scrollToForm("lp_americana_mid_form")}
                    className="w-full rounded-full bg-auditik-yellow px-8 py-3.5 text-sm font-extrabold uppercase tracking-widest text-slate-900 transition-colors hover:bg-yellow-400 sm:w-auto"
                  >
                    Agendar avaliação
                  </button>
                  <WhatsAppLeadButton
                    buttonName="lp_americana_mid_whatsapp"
                    leadSource={LEAD_SOURCE}
                    trackingParams={{
                      section: "how_it_works",
                      page: "lp/americana-philips",
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

          {/* Prova social */}
          <section className="bg-bg-light-blue py-12 sm:py-16 md:py-24">
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
                    className="relative rounded-4xl border border-blue-50 bg-white p-6 md:p-8"
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
                      <p className="mt-0.5 text-sm text-slate-500">Google Review</p>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white py-12 sm:py-16 md:py-24">
            <div className="container-wide max-w-3xl">
              <SectionHeader
                eyebrow="Dúvidas"
                title="Perguntas frequentes"
                lead="Respostas diretas antes de agendar sua avaliação em Americana."
              />
              <div className="space-y-3">
                {faqItems.map((item, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={item.question}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50"
                        aria-expanded={isOpen}
                      >
                        <span className="font-bold text-slate-900">
                          {item.question}
                        </span>
                        <LandingIcon
                          name={isOpen ? "remove" : "add"}
                          className="h-6 w-6 shrink-0 text-auditik-blue"
                        />
                      </button>
                      {isOpen ? (
                        <p className="border-t border-slate-100 px-5 pb-5 pt-4 text-base leading-relaxed text-slate-600">
                          {item.answer}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA final */}
          <section className="relative overflow-hidden py-12 sm:py-16 md:py-24">
            <Image
              src={CTA_BACKGROUND}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              aria-hidden
            />
            <div className="absolute inset-0 bg-slate-900/80" />

            <div className="container-wide relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div className="text-white">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-auditik-yellow">
                  Agende agora
                </p>
                <h2 className="mb-4 text-3xl font-extrabold leading-tight md:text-4xl">
                  Pronto para ouvir melhor em Americana?
                </h2>
                <p className="mb-8 max-w-md text-lg leading-relaxed text-white/85">
                  Avaliação gratuita com Philips HearLink. Deixe seus dados ou fale
                  agora no WhatsApp.
                </p>
                <WhatsAppLeadButton
                  buttonName="lp_americana_final_whatsapp"
                  leadSource={LEAD_SOURCE}
                  trackingParams={{
                    section: "final_cta",
                    page: "lp/americana-philips",
                  }}
                  whatsappMessage={WHATSAPP_MESSAGE}
                  className={whatsappClassFinal}
                >
                  Falar no WhatsApp
                </WhatsAppLeadButton>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-white/20 md:p-8">
                <h3 className="mb-2 text-xl font-extrabold text-slate-900 md:text-2xl">
                  Agendar avaliação gratuita
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-600">
                  Retornamos para confirmar o horário na unidade de Americana.
                </p>
                <form onSubmit={handleFormSubmit}>
                  <LeadFormFields
                    formData={formData}
                    onChange={handleFormChange}
                    formError={formError}
                    formSubmitting={formSubmitting}
                    idPrefix="final"
                  />
                </form>
              </div>
            </div>
          </section>
        </main>

        <LandingStickyCta
          onScheduleClick={() => scrollToForm("lp_americana_sticky_form")}
          scheduleLabel="Agendar"
          whatsappButton={
            <WhatsAppLeadButton
              buttonName="lp_americana_sticky_whatsapp"
              leadSource={LEAD_SOURCE}
              trackingParams={{
                section: "sticky",
                page: "lp/americana-philips",
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
