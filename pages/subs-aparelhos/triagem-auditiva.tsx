import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Header } from "@components/Header";
import { WhatsAppLeadButton } from "@components/Common/WhatsAppLeadButton";
import {
  trackButtonClick,
  trackFormSubmit,
} from "@lib/analytics";
import { getSEOMeta, absoluteUrl } from "@lib/seo";
import { generateFAQSchema } from "@lib/schema";
import {
  formatBrazilPhone,
  isValidBrazilPhone,
  submitLeadToCRM,
} from "@lib/lead-submission";
import { WHATSAPP_LEAD_CITIES } from "@lib/whatsapp-cities";
import { markThankYouSuccess } from "@lib/thank-you";
import { APP_ROUTES, SUBS_APARELHOS_ROUTES } from "@lib/routes";
import {
  composeTriagemParaQuem,
  TRIAGEM_HEARWHO_STATUS_OPTIONS,
  TRIAGEM_PARA_QUEM_OPTIONS,
} from "@lib/triagem-lead";

const PAGE_TRACKING = "triagem-auditiva";
const LEAD_SOURCE = "Website Triagem Auditiva";

const CLINIC_IMAGE = "/images/auditik/background/sala_atendimento.webp";
const CTA_BACKGROUND =
  "/images/philips/optimized/background/PHS_HL50_miniRITE_Portable_Charger_Lifestyle_blue_shadows_GettyImages-1530702944_MS_0255.jpg";

const HEARWHO_APP_STORE_URL =
  "https://apps.apple.com/br/app/hearwho-check-your-hearing/id1449966543";
const HEARWHO_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.hearxgroup.hearwho&hl=pt_BR";

const steps = [
  {
    step: "1",
    title: "Baixe o hearWHO",
    text: "Procure o aplicativo gratuito hearWHO nas lojas oficiais. O teste é em português.",
    icon: "download",
  },
  {
    step: "2",
    title: "Escolha um lugar silencioso e use fone",
    text: "Televisão desligada, sem conversa ao lado. Fone de ouvido comum, de preferência com fio. Siga o volume que o próprio aplicativo pedir.",
    icon: "headphones",
  },
  {
    step: "3",
    title: "Ouça os números e digite o que escutou",
    text: "São conjuntos de três dígitos misturados a um ruído. Leva menos de cinco minutos. No final, o aplicativo mostra se a triagem sugere uma avaliação mais completa.",
    icon: "pin",
  },
];

const audienceItems = [
  {
    icon: "tv",
    title: "Volume da televisão",
    text: "Você aumenta o volume da televisão e a família pede para baixar.",
  },
  {
    icon: "groups",
    title: "Conversas com barulho",
    text: "Em restaurante ou reunião, você ouve a voz e perde o que foi dito.",
  },
  {
    icon: "record_voice_over",
    title: "Pedir para repetir",
    text: "Você pede para repetir com frequência, no telefone ou pessoalmente.",
  },
  {
    icon: "elderly",
    title: "Fatores de risco",
    text: "Você tem mais de 60 anos, trabalha em lugar barulhento ou usa fone alto por muito tempo.",
  },
  {
    icon: "family_restroom",
    title: "Familiar preocupado",
    text: "Um familiar quer uma primeira checagem antes de marcar consulta.",
  },
];

const resultCards = [
  {
    icon: "assignment_late",
    title: "Se o aplicativo indicar avaliação",
    text: "Marque uma avaliação auditiva. Na Auditik, a consulta é presencial, com fonoaudiólogo, em Piracicaba, Americana, São Pedro e Charqueada. É nela que se faz a audiometria e se explica o que o resultado significa. Aparelho só entra na conversa se a avaliação mostrar que faz diferença.",
  },
  {
    icon: "hearing",
    title: "Se o resultado não indicar alteração e a dificuldade continuar",
    text: "A avaliação presencial continua útil. A triagem não vê tudo o que um exame vê, inclusive cera, ouvido médio e o quanto a fala fica difícil em cada ouvido.",
  },
];

const locations = [
  {
    name: "Unidade Piracicaba",
    address: "Rua Samuel Neves, 1800",
    city: "Jardim Europa, Piracicaba - SP",
    maps: "https://maps.app.goo.gl/c6EiqgiPaQg3HUrK8",
    href: SUBS_APARELHOS_ROUTES.piracicaba,
  },
  {
    name: "Unidade Americana",
    address: "Rua Luísa Meneghel Mancine, 72 - Sala 12",
    city: "Jardim Paulista, Americana - SP",
    maps: "https://maps.app.goo.gl/j4sTcPKXbBirS1JUA",
    href: SUBS_APARELHOS_ROUTES.americana,
  },
  {
    name: "Unidade São Pedro",
    address: "Rua Malaquias Guerra, 290",
    city: "Centro, São Pedro - SP",
    maps: "https://maps.app.goo.gl/HAKJ6zmwJ3JjvhseA",
    href: SUBS_APARELHOS_ROUTES.saoPedro,
  },
  {
    name: "Unidade Charqueada",
    address: "Avenida Brasil, 151",
    city: "Centro, Charqueada - SP",
    maps: "https://maps.app.goo.gl/PcWnKA3BTexc2FFm9",
    href: SUBS_APARELHOS_ROUTES.charqueada,
  },
];

const faqItems = [
  {
    question: "A triagem pelo celular substitui a audiometria?",
    answer:
      "Não. A audiometria é feita na clínica, com equipamento e um fonoaudiólogo. A triagem do celular só indica se essa avaliação merece ser marcada.",
  },
  {
    question: "O hearWHO é um exame da Auditik?",
    answer:
      "Não. É um aplicativo gratuito da Organização Mundial da Saúde. Nesta página a Auditik explica como usá-lo e oferece a avaliação presencial para quem quiser seguir.",
  },
  {
    question: "Preciso pagar para fazer a triagem?",
    answer:
      "O aplicativo é gratuito. A avaliação auditiva na Auditik, para diagnóstico e orientação, também é gratuita e sem compromisso de compra.",
  },
  {
    question: "Qual fone eu uso?",
    answer:
      "Um fone comum, nos dois ouvidos. Fone com fio costuma ser mais estável. O lugar precisa estar silencioso, e o volume deve ser o que o aplicativo indicar.",
  },
  {
    question: "A partir de qual idade?",
    answer:
      "A versão em português foi pensada para adultos a partir de 18 anos. Para crianças, o caminho é a avaliação presencial.",
  },
  {
    question: "E se o resultado vier alterado?",
    answer:
      "O aplicativo orienta a procurar um serviço de saúde. Se quiser fazer isso com a equipe da Auditik, peça o agendamento no formulário. O próximo passo é a avaliação, não a escolha de um aparelho.",
  },
  {
    question: "Moro em Limeira, Rio Claro ou Campinas. Posso agendar?",
    answer:
      "Sim. O formulário lista as cidades da região. A equipe confirma a unidade mais próxima no retorno pelo WhatsApp.",
  },
];

type StorePlatform = "ios" | "android" | "other";

function detectStorePlatform(): StorePlatform {
  if (typeof navigator === "undefined") {
    return "other";
  }

  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod/i.test(ua)) {
    return "ios";
  }
  if (/Android/i.test(ua)) {
    return "android";
  }
  return "other";
}

export default function TriagemAuditivaPage() {
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    cidade: "",
    paraQuem: "",
    hearWhoStatus: "",
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [phoneInvalid, setPhoneInvalid] = useState(false);
  const [storePlatform, setStorePlatform] = useState<StorePlatform>("other");

  useEffect(() => {
    setStorePlatform(detectStorePlatform());
  }, []);

  const storeButtons = useMemo(() => {
    const buttons = [
      {
        platform: "ios" as const,
        label: "Baixar na App Store",
        href: HEARWHO_APP_STORE_URL,
        tracking: "triagem_store_ios",
        icon: "phone_iphone",
      },
      {
        platform: "android" as const,
        label: "Baixar no Google Play",
        href: HEARWHO_PLAY_STORE_URL,
        tracking: "triagem_store_android",
        icon: "android",
      },
    ];

    if (storePlatform === "ios") {
      return [...buttons].sort((a, b) => (a.platform === "ios" ? -1 : 1));
    }
    if (storePlatform === "android") {
      return [...buttons].sort((a, b) => (a.platform === "android" ? -1 : 1));
    }
    return buttons;
  }, [storePlatform]);

  const seo = getSEOMeta({
    title: "Triagem auditiva pelo celular",
    description:
      "Faça uma triagem auditiva no celular com o aplicativo gratuito hearWHO, da OMS. Se o resultado indicar avaliação, agende com a equipe da Auditik em Piracicaba e região.",
    canonical: absoluteUrl(SUBS_APARELHOS_ROUTES.triagemAuditiva),
    ogImage: CLINIC_IMAGE,
  });

  const faqSchema = generateFAQSchema(faqItems);

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
        name: "Triagem auditiva",
        item: absoluteUrl(SUBS_APARELHOS_ROUTES.triagemAuditiva),
      },
    ],
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "whatsapp") {
      const maskedPhone = formatBrazilPhone(value);
      setFormData((prev) => ({ ...prev, whatsapp: maskedPhone }));
      if (isValidBrazilPhone(maskedPhone)) {
        setPhoneInvalid(false);
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formSubmitting) return;

    if (!isValidBrazilPhone(formData.whatsapp)) {
      setPhoneInvalid(true);
      setFormError("Informe um telefone válido com DDD.");
      return;
    }

    setFormSubmitting(true);
    setFormError("");
    setPhoneInvalid(false);

    const paraQuemComposto = composeTriagemParaQuem(
      formData.paraQuem,
      formData.hearWhoStatus,
    );

    try {
      const lead = await submitLeadToCRM({
        fullName: formData.nome,
        phone: formData.whatsapp,
        city: formData.cidade,
        paraQuem: paraQuemComposto,
        fallbackSource: LEAD_SOURCE,
        formName: LEAD_SOURCE,
      });

      trackFormSubmit("triagem_auditiva", {
        page: PAGE_TRACKING,
        cidade: formData.cidade,
        para_quem: formData.paraQuem,
        hearwho_status: formData.hearWhoStatus,
        lead_id: lead.lead_id,
      });

      await markThankYouSuccess({
        form: "contact",
        source: LEAD_SOURCE,
        eventId: lead.lead_id,
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setFormError(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar seus dados agora. Tente novamente.",
      );
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <>
      <NextSeo {...seo} />
      <Head>
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
          <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-[-5%] right-[5%] w-96 h-96 bg-auditik-yellow/20 rounded-full blur-3xl" />

          <div className="container-wide relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-auditik-blue/10 text-auditik-blue rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Triagem gratuita · A partir de 18 anos
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.05] mb-6">
                Triagem auditiva{" "}
                <span className="text-auditik-blue">pelo celular</span>
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-4">
                Em poucos minutos, no seu celular e com um fone, você faz uma triagem
                gratuita com o <strong>hearWHO</strong>, aplicativo da Organização
                Mundial da Saúde. O resultado indica se vale procurar uma avaliação
                com um profissional. A triagem não substitui o exame.
              </p>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl mb-8">
                O aplicativo é gratuito, da OMS, e abre na loja oficial. A Auditik não
                aplica o teste nesta página. Indicado para pessoas a partir de 18 anos.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <a
                  href={storeButtons[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackButtonClick(storeButtons[0].tracking, {
                      section: "hero",
                      page: PAGE_TRACKING,
                    })
                  }
                  className="cta-button-primary text-center inline-flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">
                    {storeButtons[0].icon}
                  </span>
                  {storeButtons[0].label}
                </a>
                <a
                  href="#agendar"
                  onClick={() =>
                    trackButtonClick("triagem_cta_agendar_hero", {
                      section: "hero",
                      page: PAGE_TRACKING,
                    })
                  }
                  className="cta-button-secondary text-center inline-flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">event_available</span>
                  Quero agendar a avaliação
                </a>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                {storeButtons.slice(1).map((button) => (
                  <a
                    key={button.platform}
                    href={button.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackButtonClick(button.tracking, {
                        section: "hero_secondary_store",
                        page: PAGE_TRACKING,
                      })
                    }
                    className="inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 rounded-full border border-blue-100 bg-white text-auditik-blue font-bold text-sm hover:border-auditik-blue transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {button.icon}
                    </span>
                    {button.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="relative w-full max-w-[560px] mx-auto">
              <div className="absolute inset-0 bg-white/50 blur-2xl rounded-[2rem] scale-105" />
              <div className="relative rounded-[2rem] overflow-hidden border-8 border-white/80 shadow-2xl bg-white p-8 md:p-10">
                <p className="text-xs font-bold uppercase tracking-widest text-auditik-blue mb-6">
                  Em três passos
                </p>
                <ol className="space-y-6">
                  {steps.map((item) => (
                    <li key={item.step} className="flex items-start gap-4">
                      <span className="shrink-0 w-10 h-10 rounded-2xl bg-auditik-blue/10 text-auditik-blue font-extrabold flex items-center justify-center">
                        {item.step}
                      </span>
                      <div>
                        <p className="text-lg font-bold text-slate-900 mb-1">
                          {item.title}
                        </p>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white" id="como-fazer">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Como fazer a triagem
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Menos de cinco minutos, com fone e um ambiente silencioso.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((item) => (
                <article
                  key={item.step}
                  className="bg-bg-light-blue rounded-4xl p-8 border border-blue-50 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-2xl bg-white text-auditik-blue font-extrabold flex items-center justify-center shadow-sm">
                      {item.step}
                    </span>
                    <span className="material-symbols-outlined text-3xl text-auditik-blue">
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-bg-light-blue" id="o-que-verifica">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                  O que essa triagem verifica
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-4">
                  A triagem usa o teste de dígitos no ruído. Você ouve números com um
                  ruído de fundo e responde o que conseguiu entender. O aplicativo
                  estima como está a sua capacidade de entender fala nessa condição.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed mb-4">
                  Ela serve como um primeiro olhar, do mesmo modo que medir a pressão
                  numa ação de rua serve para decidir se a pessoa procura um médico.
                  Quem desenvolveu a versão em português foram pesquisadores da USP
                  Bauru, da UFRN e da UFPB, a pedido da OMS.
                </p>
              </div>
              <aside className="bg-white rounded-4xl p-8 border border-amber-100 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <span className="material-symbols-outlined text-3xl text-amber-500">
                    info
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Limite importante
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  A triagem do hearWHO não é audiometria e não diz se você precisa de
                  aparelho auditivo. Um resultado dentro do esperado também não fecha
                  o assunto quando a dificuldade no dia a dia continua. A decisão sobre
                  exame, acompanhamento ou aparelho fica com a avaliação feita por um
                  fonoaudiólogo.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white" id="para-quem">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Para quem essa triagem faz sentido
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                A triagem em português foi orientada para adultos a partir de 18 anos.
                Criança e adolescente precisam de avaliação presencial, com protocolo
                próprio.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {audienceItems.map((item) => (
                <article
                  key={item.title}
                  className="bg-bg-light-blue rounded-4xl p-7 border border-blue-50"
                >
                  <span className="material-symbols-outlined text-3xl text-auditik-blue mb-3">
                    {item.icon}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-bg-light-blue" id="resultado">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                O que fazer com o resultado
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {resultCards.map((card) => (
                <article
                  key={card.title}
                  className="bg-white rounded-4xl p-8 border border-blue-50 shadow-sm"
                >
                  <span className="material-symbols-outlined text-4xl text-auditik-blue mb-4">
                    {card.icon}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{card.text}</p>
                </article>
              ))}
            </div>
            <p className="text-center text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Se você prefere não fazer pelo celular, use o formulário abaixo e venha
              direto para a avaliação na clínica.
            </p>
          </div>
        </section>

        <section className="py-24 bg-white" id="agendar">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row gap-16 items-stretch">
              <div className="flex-1">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
                  Agende a avaliação com um profissional
                </h2>
                <p className="text-slate-500 mb-6 text-lg leading-relaxed">
                  Conte como prefere ser chamado e em qual cidade atende. A equipe
                  retorna pelo WhatsApp para marcar a avaliação auditiva. Não precisa
                  informar o número que apareceu no aplicativo.
                </p>
                <p className="text-slate-400 text-sm mb-10 leading-relaxed">
                  Ao enviar, você pede contato para agendar uma avaliação auditiva. A
                  Auditik trata nome e telefone para esse retorno, como nas outras
                  páginas de contato do site.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="group">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-4">
                      Nome
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleFormChange}
                      placeholder="Como gostaria de ser chamado(a)?"
                      required
                      className="w-full px-8 py-5 rounded-3xl border-gray-100 bg-slate-50 focus:ring-2 focus:ring-auditik-blue/20 focus:border-auditik-blue focus:bg-white transition-all outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-4">
                        Seu Telefone com DDD
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleFormChange}
                        placeholder="(00) 00000-0000"
                        required
                        aria-invalid={phoneInvalid}
                        className={`w-full px-8 py-5 rounded-3xl bg-slate-50 focus:ring-2 focus:bg-white transition-all outline-none ${
                          phoneInvalid
                            ? "border border-red-400 focus:border-red-400 focus:ring-red-200"
                            : "border-gray-100 focus:ring-auditik-blue/20 focus:border-auditik-blue"
                        }`}
                      />
                    </div>
                    <div className="group">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-4">
                        Sua Cidade
                      </label>
                      <select
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleFormChange}
                        required
                        className="w-full px-8 py-5 rounded-3xl border-gray-100 bg-slate-50 focus:ring-2 focus:ring-auditik-blue/20 focus:border-auditik-blue focus:bg-white transition-all outline-none cursor-pointer"
                      >
                        <option value="">Selecione uma cidade</option>
                        {WHATSAPP_LEAD_CITIES.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-4">
                      Para quem é a avaliação?
                    </label>
                    <select
                      name="paraQuem"
                      value={formData.paraQuem}
                      onChange={handleFormChange}
                      required
                      className="w-full px-8 py-5 rounded-3xl border-gray-100 bg-slate-50 focus:ring-2 focus:ring-auditik-blue/20 focus:border-auditik-blue focus:bg-white transition-all outline-none cursor-pointer"
                    >
                      <option value="">Selecione uma opção</option>
                      {TRIAGEM_PARA_QUEM_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="group">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-4">
                      Você já fez a triagem no hearWHO?
                    </label>
                    <select
                      name="hearWhoStatus"
                      value={formData.hearWhoStatus}
                      onChange={handleFormChange}
                      required
                      className="w-full px-8 py-5 rounded-3xl border-gray-100 bg-slate-50 focus:ring-2 focus:ring-auditik-blue/20 focus:border-auditik-blue focus:bg-white transition-all outline-none cursor-pointer"
                    >
                      <option value="">Selecione uma opção</option>
                      {TRIAGEM_HEARWHO_STATUS_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formError && (
                    <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full min-h-12 bg-auditik-yellow hover:bg-yellow-400 disabled:bg-gray-300 text-slate-900 font-extrabold py-6 rounded-3xl shadow-xl shadow-auditik-yellow/10 transition-all hover:scale-[1.01] active:scale-[0.99] uppercase tracking-widest disabled:cursor-not-allowed"
                  >
                    {formSubmitting ? "Enviando..." : "Pedir agendamento"}
                  </button>
                </form>

                <div className="mt-6">
                  <WhatsAppLeadButton
                    buttonName="triagem_whatsapp_form"
                    leadSource={LEAD_SOURCE}
                    trackingParams={{
                      section: "form",
                      page: PAGE_TRACKING,
                    }}
                    whatsappMessage="Olá Auditik, gostaria de agendar uma avaliação auditiva após a triagem pelo celular."
                    className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 rounded-full border border-auditik-blue text-auditik-blue font-bold hover:bg-auditik-blue/5 transition-colors"
                  >
                    Preferir falar no WhatsApp
                  </WhatsAppLeadButton>
                </div>
              </div>

              <div className="flex-1 relative rounded-4xl overflow-hidden shadow-xl border-8 border-white min-h-[320px]">
                <Image
                  src={CLINIC_IMAGE}
                  alt="Sala de atendimento da Auditik para avaliação auditiva presencial"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-bg-light-blue" id="unidades">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Avaliação auditiva nas unidades da Auditik
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                A triagem você faz onde estiver; a audiometria é na clínica.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {locations.map((location, index) => (
                <article
                  key={location.name}
                  className="bg-white border border-blue-50 rounded-4xl p-8 flex items-start gap-6"
                >
                  <div className="w-14 h-14 bg-bg-light-blue rounded-2xl flex items-center justify-center text-auditik-blue shadow-sm shrink-0">
                    <span className="material-symbols-outlined text-3xl">
                      location_on
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-800 mb-2">
                      {location.name}
                    </h3>
                    <p className="text-slate-500 mb-4 leading-relaxed">
                      {location.address}
                      <br />
                      {location.city}
                    </p>
                    <div className="flex flex-col items-start gap-1">
                      <Link
                        href={location.href}
                        onClick={() =>
                          trackButtonClick(`triagem_unit_${index}`, {
                            section: "units",
                            page: PAGE_TRACKING,
                          })
                        }
                        className="inline-flex min-h-11 items-center px-2 text-auditik-blue font-bold gap-2"
                      >
                        Ver clínica
                        <span className="material-symbols-outlined text-sm">
                          arrow_forward
                        </span>
                      </Link>
                      <a
                        href={location.maps}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackButtonClick(`triagem_maps_${index}`, {
                            section: "units",
                            page: PAGE_TRACKING,
                          })
                        }
                        className="inline-flex min-h-11 items-center px-2 text-auditik-blue font-bold gap-2"
                      >
                        Ver no Google Maps
                        <span className="material-symbols-outlined text-sm">
                          arrow_forward
                        </span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white" id="faq">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-10 text-center">
              Dúvidas frequentes sobre a triagem auditiva
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqItems.map((faq) => (
                <article
                  key={faq.question}
                  className="bg-bg-light-blue rounded-4xl p-7 border border-blue-50 shadow-sm"
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

        <section className="py-20 bg-bg-light-blue" id="mais-informacoes">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Quer entender os sinais antes de marcar?
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Se a avaliação indicar aparelho, a Auditik é distribuidor autorizado
              Philips HearLink. A escolha do modelo acontece depois do exame, na
              clínica.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <Link
                href={SUBS_APARELHOS_ROUTES.comoSaberPrecisa}
                onClick={() =>
                  trackButtonClick("triagem_link_como_saber", {
                    section: "mais-informacoes",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
              >
                <span className="material-symbols-outlined">help</span>
                Como saber se precisa de aparelho
              </Link>
              <Link
                href={SUBS_APARELHOS_ROUTES.idosos}
                onClick={() =>
                  trackButtonClick("triagem_link_idosos", {
                    section: "mais-informacoes",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
              >
                <span className="material-symbols-outlined">elderly</span>
                Aparelho auditivo para idosos
              </Link>
            </div>
          </div>
        </section>

        <section className="py-24 bg-auditik-blue text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src={CTA_BACKGROUND}
              alt="Agendar avaliação auditiva gratuita Auditik"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="container-wide relative z-10 text-center max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Fez a triagem ou prefere ir direto? Agende a avaliação gratuita
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed">
              Na <strong>Auditik</strong>, em Piracicaba e região, a avaliação é
              presencial, com fonoaudiólogo, sem compromisso de compra.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#agendar"
                onClick={() =>
                  trackButtonClick("triagem_final_cta_agendar", {
                    section: "final_cta",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-3 px-6 sm:px-8 rounded-full transition-colors"
              >
                Pedir agendamento
              </a>
              <WhatsAppLeadButton
                buttonName="triagem_final_cta_whatsapp"
                leadSource={LEAD_SOURCE}
                trackingParams={{
                  section: "final_cta",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, quero agendar uma avaliação auditiva gratuita."
                className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 sm:px-8 rounded-full border border-white/30 transition-colors"
              >
                Falar no WhatsApp
              </WhatsAppLeadButton>
            </div>
            <p className="mt-8 text-blue-100/90 text-sm">
              Unidade Piracicaba: Rua Samuel Neves, 1800 —{" "}
              <a
                href="tel:+551933776941"
                className="font-bold text-white hover:underline"
              >
                (19) 3377-6941
              </a>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
