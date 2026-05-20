import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@components/Header";
import { WhatsAppLeadButton } from "@components/Common/WhatsAppLeadButton";
import { trackButtonClick } from "@lib/analytics";
import { getSEOMeta } from "@lib/seo";
import { generateFAQSchema, generateLocalBusinessSchema } from "@lib/schema";
import { APP_ROUTES } from "@lib/routes";

const HERO_IMAGE =
  "/images/philips/optimized/background/Philips_HearLink50_miniRITE_H1-2024_C116DarkBeige_Angle90_Close-up_In-On-Ear_MS-6152_Woman_1200x800px.jpg";

const CTA_BACKGROUND =
  "/images/philips/optimized/background/PHS_HL50_miniRITE_Portable_Charger_Lifestyle_blue_shadows_GettyImages-1530702944_MS_0255.jpg";

const CLINIC_IMAGE = "/images/auditik/background/sala_atendimento.webp";

const PIRACICABA_MAPS_URL = "https://maps.app.goo.gl/c6EiqgiPaQg3HUrK8";

const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=Rua+Samuel+Neves,+1800,+Jardim+Europa,+Piracicaba+-+SP&hl=pt&z=15&output=embed";

const faqItems = [
  {
    question: "A avaliação auditiva em Piracicaba é gratuita?",
    answer:
      "Sim. Agende sem compromisso para conhecer seu perfil auditivo e as opções Philips HearLink com nossa equipe de fonoaudiólogos.",
  },
  {
    question: "Quanto tempo dura a primeira consulta?",
    answer:
      "A primeira consulta geralmente dura 1 hora e meia, pois a fonoaudióloga precisa realizar uma avaliação auditiva completa e entender sua rotina e necessidades para indicar o modelo mais adequado. Depois da consulta, você pode experimentar o aparelho no conforto da sua casa e tomar a decisão com mais tranquilidade.",
  },
  {
    question: "Vocês atendem outras cidades?",
    answer:
      "Sim: Americana, São Pedro e Charqueada. A unidade de Piracicaba é a referência para quem busca atendimento na cidade.",
  },
  {
    question: "Posso levar um familiar na consulta?",
    answer:
      "Sim, e recomendamos. O apoio da família facilita a adaptação e a decisão sobre o tratamento auditivo.",
  },
];

const trustCards = [
  {
    icon: "verified",
    title: "Autorização oficial",
    text: "Philips HearLink com garantia de procedência e suporte técnico especializado.",
  },
  {
    icon: "psychology",
    title: "Atendimento humanizado",
    text: "Consulta acolhedora para adultos, idosos e familiares que acompanham a decisão.",
  },
  {
    icon: "workspace_premium",
    title: "Acompanhamento vitalício",
    text: "Ajustes e orientações de uso sem custo adicional ao longo do tratamento.",
  },
];

const services = [
  {
    icon: "hearing",
    title: "Avaliação auditiva gratuita",
    text: "Exame completo para mapear seu perfil auditivo, entender o grau de perda e indicar o modelo Philips HearLink mais adequado — com transparência sobre expectativas e etapas do tratamento.",
  },
  {
    icon: "settings_voice",
    title: "Adaptação e demonstração supervisionada",
    text: "Teste dos aparelhos em ambiente clínico, programação inicial e orientação de uso. Você percebe na prática como a tecnologia responde à sua rotina (conversas, TV, ambientes ruidosos).",
  },
  {
    icon: "tune",
    title: "Ajuste fino e calibração",
    text: "Revisões para conforto, clareza de fala e equilíbrio sonoro. A adaptação evolui com o uso; nossos profissionais acompanham essa curva de aprendizagem.",
  },
  {
    icon: "build",
    title: "Manutenção e suporte contínuo",
    text: "Limpeza, revisão técnica, orientação sobre acessórios (carregadores, conectividade) e suporte ao app HearLink 2 — para manter desempenho e durabilidade do equipamento.",
  },
];

const techFeatures = [
  {
    title: "SpeechSensor",
    text: "Prioriza a voz em ambientes desafiadores para conversas mais claras.",
  },
  {
    title: "AutoSense",
    text: "Ajusta automaticamente os programas conforme o ambiente ao seu redor.",
  },
  {
    title: "HearLink 2",
    text: "Controle e personalização pelo smartphone, com praticidade no dia a dia.",
  },
];

const audienceBullets = [
  "Quem já tem diagnóstico e quer testar e comprar com segurança na região.",
  "Familiares que pesquisam solução para pais ou avós e precisam de orientação presencial.",
  "Quem sente dificuldade em conversas, aumenta o volume da TV ou evita ambientes barulhentos.",
  "Usuários de outros aparelhos que buscam upgrade para Philips HearLink com suporte local.",
];

export default function AparelhosAuditivosEmPiracicabaPage() {
  const seo = getSEOMeta({
    title: "Aparelhos Auditivos em Piracicaba | Philips HearLink na Auditik",
    description:
      "Distribuidor autorizado Philips HearLink em Piracicaba. Avaliação auditiva gratuita, adaptação, ajuste e manutenção com fonoaudiólogos. Agende na Rua Samuel Neves, 1800.",
    canonical: "https://www.auditik.com.br/aparelhos-auditivos-em-piracicaba/",
    ogImage:
      "https://www.auditik.com.br/images/philips/optimized/background/Philips_HearLink50_miniRITE_H1-2024_C116DarkBeige_Angle90_Close-up_In-On-Ear_MS-6152_Woman_1200x800px.jpg",
  });

  const localBusinessSchema = generateLocalBusinessSchema("piracicaba");
  const faqSchema = generateFAQSchema(faqItems);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: "https://www.auditik.com.br/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Aparelhos Auditivos",
        item: "https://www.auditik.com.br/aparelhos/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Aparelhos auditivos em Piracicaba",
        item: "https://www.auditik.com.br/aparelhos-auditivos-em-piracicaba/",
      },
    ],
  };

  return (
    <>
      <NextSeo {...seo} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
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
        {/* Hero */}
        <section className="hero-gradient relative overflow-hidden py-16 md:py-24">
          <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-[-5%] right-[5%] w-96 h-96 bg-auditik-yellow/20 rounded-full blur-3xl" />

          <div className="container-wide relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-auditik-blue/10 text-auditik-blue rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Distribuidor autorizado Philips · Piracicaba-SP
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.05] mb-6">
                Aparelhos auditivos em Piracicaba com tecnologia{" "}
                <span className="text-auditik-blue">Philips HearLink</span>
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-4">
                Se você está buscando <strong>aparelhos auditivos em Piracicaba</strong>
                , a Auditik Soluções Auditivas oferece atendimento presencial,
                humanizado e baseado em evidência — do diagnóstico à adaptação e ao
                acompanhamento contínuo. Somos{" "}
                <strong>distribuidor autorizado Philips Hearing Solutions</strong>, com
                a linha HearLink e recursos como SpeechSensor, AutoSense e o aplicativo
                HearLink 2 para uma audição mais natural no dia a dia.
              </p>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                Conheça nossa seleção completa de{" "}
                <Link
                  href={APP_ROUTES.aparelhos}
                  onClick={() =>
                    trackButtonClick("piracicaba_link_pilar_aparelhos", {
                      section: "hero",
                      page: "subs-aparelhos/piracicaba",
                    })
                  }
                  className="text-auditik-blue font-bold hover:underline"
                >
                  aparelhos auditivos
                </Link>{" "}
                para entender qual se adapta melhor à sua rotina.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={APP_ROUTES.contato}
                  onClick={() =>
                    trackButtonClick("piracicaba_cta_agendar", { section: "hero" })
                  }
                  className="cta-button-primary text-center"
                >
                  Agendar avaliação gratuita
                </Link>
                <WhatsAppLeadButton
                  buttonName="piracicaba_cta_whatsapp"
                  leadSource="Website Aparelhos Piracicaba Hero"
                  trackingParams={{
                    section: "hero",
                    page: "subs-aparelhos/piracicaba",
                  }}
                  whatsappMessage="Olá Auditik, quero agendar uma avaliação para aparelhos auditivos em Piracicaba."
                  className="cta-button-secondary text-center"
                >
                  Falar no WhatsApp
                </WhatsAppLeadButton>
              </div>
            </div>

            <div className="relative w-full max-w-[640px] mx-auto">
              <div className="absolute inset-0 bg-white/50 blur-2xl rounded-[2rem] scale-105" />
              <div className="relative rounded-[2rem] overflow-hidden border-8 border-white/80 shadow-2xl">
                <Image
                  src={HERO_IMAGE}
                  alt="Aparelho auditivo Philips HearLink em uso na clínica Auditik em Piracicaba"
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

        {/* Por que Auditik */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Por que escolher a Auditik para aparelhos auditivos em Piracicaba?
              </h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>
                  A <strong>Auditik</strong> é uma clínica especializada em saúde
                  auditiva, com unidade física em <strong>Piracicaba</strong> e atuação
                  também em Americana, São Pedro e Charqueada. Diferente de lojas
                  genéricas, trabalhamos com <strong>processo clínico completo</strong>:
                  avaliação, indicação personalizada, demonstração supervisionada e
                  suporte pós-adaptação.
                </p>
                <p>
                  Como <strong>parceiro autorizado Philips Hearing Solutions</strong>,
                  oferecemos a linha <strong>Philips HearLink</strong> — aparelhos com
                  processamento inteligente, conectividade e design pensado para
                  conforto e discrição. Você conta com orientação de{" "}
                  <strong>fonoaudiólogos</strong> que explicam cada etapa em linguagem
                  clara, sem jargão excessivo — ideal para quem busca solução para si ou
                  para um familiar.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trustCards.map((card) => (
                <div
                  key={card.title}
                  className="bg-bg-light-blue rounded-4xl p-8 border border-blue-50"
                >
                  <span className="material-symbols-outlined text-4xl text-auditik-blue mb-4">
                    {card.icon}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-slate-600">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section className="py-20 bg-bg-light-blue">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">
              O que fazemos na clínica em Piracicaba
            </h2>
            <p className="text-slate-600 text-lg text-center max-w-2xl mx-auto mb-12">
              Atendimento presencial com equipe especializada em cada etapa da sua
              jornada auditiva.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="bg-white rounded-4xl p-8 border border-blue-50 shadow-sm"
                >
                  <span className="material-symbols-outlined text-3xl text-auditik-blue mb-4">
                    {service.icon}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Tecnologia Philips */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">
              Tecnologia Philips HearLink na Auditik Piracicaba
            </h2>
            <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-12">
              Recursos de ponta que complementam o acompanhamento clínico — sem
              substituir a avaliação personalizada com nossos especialistas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {techFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-bg-light-blue rounded-4xl p-8 border border-blue-50 text-center"
                >
                  <h3 className="text-xl font-bold text-auditik-blue mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{feature.text}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-slate-600 text-lg">
              Para comparar modelos RITE, BTE e intra-auriculares, veja a{" "}
              <Link
                href={APP_ROUTES.aparelhos}
                onClick={() =>
                  trackButtonClick("piracicaba_link_pilar_tecnologia", {
                    section: "tecnologia",
                    page: "subs-aparelhos/piracicaba",
                  })
                }
                className="text-auditik-blue font-bold hover:underline"
              >
                linha completa Philips HearLink
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Público-alvo */}
        <section className="py-20 bg-bg-light-blue">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                  Quem procura aparelhos auditivos em Piracicaba encontra na Auditik
                </h2>
                <ul className="space-y-4">
                  {audienceBullets.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-700">
                      <span className="material-symbols-outlined text-auditik-blue shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-80 md:h-96 rounded-4xl overflow-hidden shadow-xl">
                <Image
                  src={CLINIC_IMAGE}
                  alt="Sala de atendimento da Auditik em Piracicaba para avaliação auditiva"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Localização e contato */}
        <section className="py-20 bg-white" id="unidade-piracicaba">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">
              Como chegar e agendar na unidade Piracicaba
            </h2>
            <p className="text-slate-600 text-lg text-center max-w-2xl mx-auto mb-12">
              Visite nossa clínica no Jardim Europa ou fale conosco pelo WhatsApp para
              agendar sua avaliação auditiva gratuita.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
              <div className="bg-bg-light-blue border border-blue-50 rounded-4xl p-8 md:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-auditik-blue shadow-sm shrink-0">
                    <span className="material-symbols-outlined text-3xl">
                      location_on
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-800 mb-2">
                      Auditik Soluções Auditivas — Piracicaba
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      Rua Samuel Neves, 1800
                      <br />
                      Jardim Europa, Piracicaba - SP
                    </p>
                  </div>
                </div>
                <dl className="space-y-4 text-slate-600">
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">
                      Telefone
                    </dt>
                    <dd>
                      <a
                        href="tel:+551933776941"
                        onClick={() =>
                          trackButtonClick("piracicaba_phone_click", {
                            section: "location",
                          })
                        }
                        className="text-lg font-bold text-auditik-blue hover:underline"
                      >
                        (19) 3377-6941
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">
                      E-mail
                    </dt>
                    <dd>
                      <a
                        href="mailto:atendimento@auditik.com.br"
                        className="font-bold text-auditik-blue hover:underline"
                      >
                        atendimento@auditik.com.br
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">
                      Horário de atendimento
                    </dt>
                    <dd className="font-bold text-slate-800">
                      Segunda a sexta: 08h às 17h30
                    </dd>
                  </div>
                </dl>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <a
                    href={PIRACICABA_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackButtonClick("piracicaba_maps_click", { section: "location" })
                    }
                    className="cta-button-secondary text-center inline-flex items-center justify-center gap-2"
                  >
                    Abrir no Google Maps
                    <span className="material-symbols-outlined text-sm">
                      open_in_new
                    </span>
                  </a>
                  <WhatsAppLeadButton
                    buttonName="piracicaba_location_whatsapp"
                    leadSource="Website Aparelhos Piracicaba"
                    trackingParams={{
                      section: "location",
                      page: "subs-aparelhos/piracicaba",
                    }}
                    whatsappMessage="Olá Auditik, gostaria de agendar uma avaliação na unidade de Piracicaba (Rua Samuel Neves, 1800)."
                    className="cta-button-primary text-center"
                  >
                    Agendar pelo WhatsApp
                  </WhatsAppLeadButton>
                </div>
              </div>

              <div className="relative aspect-video rounded-4xl overflow-hidden border border-blue-50 shadow-sm">
                <iframe
                  title="Mapa da Auditik em Piracicaba - Rua Samuel Neves, 1800"
                  src={MAPS_EMBED_URL}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="bg-auditik-blue rounded-4xl p-8 md:p-10 text-white grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-blue-100/70 font-bold">
                  Telefone
                </p>
                <p className="text-2xl font-extrabold">(19) 3377-6941</p>
              </div>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-blue-100/70 font-bold">
                  E-mail
                </p>
                <p className="text-lg font-bold">atendimento@auditik.com.br</p>
              </div>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-blue-100/70 font-bold">
                  Horário
                </p>
                <p className="text-lg font-bold">Seg - Sex: 08h às 17h30</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-bg-light-blue">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-10 text-center">
              Dúvidas frequentes sobre aparelhos auditivos em Piracicaba
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqItems.map((faq) => (
                <article
                  key={faq.question}
                  className="bg-white rounded-4xl p-7 border border-blue-50 shadow-sm"
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

        {/* CTA final */}
        <section className="py-24 bg-auditik-blue text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src={CTA_BACKGROUND}
              alt="Aparelhos auditivos Philips HearLink"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="container-wide relative z-10 text-center max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Agende sua avaliação auditiva gratuita em Piracicaba
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed">
              O primeiro passo para recuperar clareza nas conversas, na TV e na vida
              social é uma <strong>avaliação presencial</strong>. Na Auditik, em
              Piracicaba, você encontra aparelhos auditivos Philips HearLink, equipe
              especializada e acompanhamento que não termina na entrega do aparelho.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("piracicaba_final_cta_contato", {
                    section: "final_cta",
                  })
                }
                className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-3 px-6 sm:px-8 rounded-full transition-colors"
              >
                Agendar minha avaliação
              </Link>
              <WhatsAppLeadButton
                buttonName="piracicaba_final_cta_whatsapp"
                leadSource="Website Aparelhos Piracicaba"
                trackingParams={{
                  section: "final_cta",
                  page: "subs-aparelhos/piracicaba",
                }}
                whatsappMessage="Olá Auditik, quero agendar minha avaliação auditiva gratuita em Piracicaba."
                className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 sm:px-8 rounded-full border border-white/30 transition-colors"
              >
                Falar com especialista
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
