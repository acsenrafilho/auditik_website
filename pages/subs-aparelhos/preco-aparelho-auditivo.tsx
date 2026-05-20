import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@components/Header";
import { WhatsAppLeadButton } from "@components/Common/WhatsAppLeadButton";
import { trackButtonClick } from "@lib/analytics";
import { getSEOMeta } from "@lib/seo";
import { generateFAQSchema } from "@lib/schema";
import { APP_ROUTES, SUBS_APARELHOS_ROUTES } from "@lib/routes";

const PAGE_TRACKING = "subs-aparelhos/preco";

const HERO_IMAGE =
  "/images/philips/optimized/background/Philips_HearLink50_miniRITE_H1-2024_C116DarkBeige_Angle90_Close-up_In-On-Ear_MS-6152_Woman_1200x800px.jpg";

const CTA_BACKGROUND =
  "/images/philips/optimized/background/PHS_HL50_miniRITE_Portable_Charger_Lifestyle_blue_shadows_GettyImages-1530702944_MS_0255.jpg";

const CLINIC_IMAGE = "/images/auditik/background/sala_atendimento.webp";

const faqItems = [
  {
    question: "Qual o preço médio de um aparelho auditivo no Brasil?",
    answer:
      "Não há valor único: depende da tecnologia, do formato, do grau de perda e dos serviços inclusos. Na Auditik, o orçamento é personalizado após avaliação gratuita.",
  },
  {
    question: "Por que a Auditik não divulga preço fixo no site?",
    answer:
      "Porque indicar valor sem exame pode levar à escolha errada. Priorizamos segurança clínica e transparência na consulta presencial.",
  },
  {
    question: "Amplificador de som é igual a aparelho auditivo?",
    answer:
      "Não. Amplificadores genéricos não substituem avaliação, programação e acompanhamento fonoaudiológico.",
  },
  {
    question: "A avaliação auditiva é realmente gratuita?",
    answer:
      "Sim. Agende sem compromisso para conhecer seu perfil auditivo e as opções Philips HearLink.",
  },
  {
    question: "O valor inclui ajustes depois da compra?",
    answer:
      "Na Auditik, o acompanhamento com ajustes ao longo do tratamento faz parte do nosso modelo de cuidado contínuo (sem custo adicional de consulta de ajuste).",
  },
  {
    question: "Posso parcelar o aparelho auditivo?",
    answer:
      "Sim. Condições de parcelamento são apresentadas na clínica, com clareza, após a definição do modelo indicado.",
  },
];

const trustCards = [
  {
    icon: "visibility",
    title: "Transparência comercial",
    text: "Explicamos o que compõe o investimento antes de qualquer decisão — sem surpresas.",
  },
  {
    icon: "hearing",
    title: "Avaliação gratuita",
    text: "Orçamento personalizado só após exame e conversa clínica com fonoaudiólogos.",
  },
  {
    icon: "workspace_premium",
    title: "Acompanhamento vitalício",
    text: "Ajustes e orientações sem custo adicional de consulta ao longo do tratamento.",
  },
];

const priceFactors = [
  {
    icon: "memory",
    title: "Nível de tecnologia",
    subtitle: "Entrada vs. premium",
    bullets: [
      "Entrada: menos canais, conectividade limitada, rotinas mais calmas.",
      "Intermediária e premium: SpeechSensor, AutoSense, app HearLink 2 e melhor desempenho em ruído.",
      "Quanto mais exigente o dia a dia sonoro, maior a necessidade de tecnologia avançada.",
    ],
  },
  {
    icon: "graphic_eq",
    title: "Grau da perda auditiva",
    subtitle: "Leve a profunda",
    bullets: [
      "Perdas leves a moderadas: modelos discretos (RITE, intra) com boa performance.",
      "Perdas moderadas a severas: maior potência (BTE UP), moldes personalizados.",
      "Programação individual — cada ouvido pode ter necessidades diferentes.",
    ],
  },
  {
    icon: "medical_services",
    title: "Ecossistema no Brasil",
    subtitle: "Além do aparelho",
    bullets: [
      "Avaliação fonoaudiológica completa (audiometria e anamnese).",
      "Demonstração supervisionada, programação e ajustes finos.",
      "Garantia, procedência e suporte técnico de distribuidor autorizado.",
    ],
  },
];

const investmentTiers = [
  {
    icon: "looks_one",
    title: "Essencial",
    audience: "Rotina mais tranquila, primeiros passos no uso de aparelho",
    expectation: "Boa introdução à reabilitação auditiva com recursos fundamentais.",
  },
  {
    icon: "looks_two",
    title: "Intermediária",
    audience: "Vida social e profissional ativa, ambientes variados",
    expectation:
      "Melhor equilíbrio entre tecnologia, conectividade e conforto no dia a dia.",
  },
  {
    icon: "looks_3",
    title: "Premium",
    audience: "Alta exigência em ruído, conectividade e personalização",
    expectation:
      "Máximo desempenho Philips HearLink: SpeechSensor, AutoSense e HearLink 2.",
  },
];

const onlinePurchaseRisks = [
  "Amplificação indiscriminada — aumentam volume sem tratar distorções da perda auditiva.",
  "Ausência de programação individual nas frequências onde você perde audição.",
  "Sem acompanhamento profissional, ajustes ou monitoramento da adaptação cerebral.",
  "Procedência duvidosa — sem garantia nacional nem assistência técnica confiável.",
  "Frustração e abandono — muitas pessoas concluem que “aparelho não funciona” quando a solução estava errada desde o início.",
];

const includedServices = [
  {
    icon: "hearing",
    title: "Avaliação auditiva gratuita",
    text: "Mapeamento do perfil auditivo e expectativas realistas antes de qualquer proposta.",
  },
  {
    icon: "settings_voice",
    title: "Indicação Philips HearLink",
    text: "Modelo e formato (RITE, BTE, intra) adequados ao seu grau e estilo de vida.",
  },
  {
    icon: "tune",
    title: "Demonstração supervisionada",
    text: "Você ouve na prática antes de decidir — sem pressão na primeira visita.",
  },
  {
    icon: "build",
    title: "Acompanhamento vitalício",
    text: "Programação, ajustes finos e suporte ao app HearLink 2 ao longo do tratamento.",
  },
];

const fairPriceSteps = [
  {
    step: "1",
    title: "Agendamento da avaliação gratuita",
    text: "Presencial em Piracicaba, Americana, São Pedro ou Charqueada; ou contato pelo WhatsApp para tirar dúvidas iniciais.",
  },
  {
    step: "2",
    title: "Exame e conversa clínica",
    text: "Audiometria, entendimento da rotina (trabalho, família, lazer) e expectativas de quem usa e de quem acompanha.",
  },
  {
    step: "3",
    title: "Demonstração Philips HearLink",
    text: "Experimentação real e supervisionada para perceber a diferença exata entre tecnologias e formatos.",
  },
  {
    step: "4",
    title: "Proposta transparente",
    text: "Opções por faixa (essencial, intermediária, premium), condições de pagamento e o que está incluso — sem obrigação de compra.",
  },
];

const techFeatures = [
  {
    title: "SpeechSensor",
    text: "Prioriza vozes em ambientes desafiadores para conversas mais claras.",
  },
  {
    title: "AutoSense",
    text: "Ajusta programas conforme o ambiente muda ao seu redor.",
  },
  {
    title: "HearLink 2",
    text: "App para controle e personalização pelo smartphone no dia a dia.",
  },
];

export default function PrecoAparelhoAuditivoPage() {
  const seo = getSEOMeta({
    title: "Preço de aparelho auditivo | Transparência Philips HearLink na Auditik",
    description:
      "Entenda o que influencia o preço de aparelho auditivo no Brasil, os riscos de comprar online e como a Auditik em Piracicaba define um investimento justo na avaliação gratuita.",
    canonical: "https://www.auditik.com.br/preco-aparelho-auditivo/",
    ogImage:
      "https://www.auditik.com.br/images/philips/optimized/background/Philips_HearLink50_miniRITE_H1-2024_C116DarkBeige_Angle90_Close-up_In-On-Ear_MS-6152_Woman_1200x800px.jpg",
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
        name: "Preço de aparelho auditivo",
        item: "https://www.auditik.com.br/preco-aparelho-auditivo/",
      },
    ],
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
        {/* Hero */}
        <section className="hero-gradient relative overflow-hidden py-16 md:py-24">
          <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-[-5%] right-[5%] w-96 h-96 bg-auditik-yellow/20 rounded-full blur-3xl" />

          <div className="container-wide relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-auditik-blue/10 text-auditik-blue rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Distribuidor autorizado Philips · Avaliação gratuita
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.05] mb-6">
                Preço de aparelho auditivo:{" "}
                <span className="text-auditik-blue">transparência</span> para investir
                com segurança
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-4">
                Entender o <strong>preço de aparelho auditivo</strong> não precisa ser
                um mistério — nem um motivo para adiar o cuidado com a audição. Na{" "}
                <strong>Auditik Soluções Auditivas</strong>, em{" "}
                <strong>Piracicaba-SP</strong>, trabalhamos com transparência desde a
                primeira conversa: explicamos o que compõe o investimento, por que os
                valores variam no mercado brasileiro e como indicamos a solução{" "}
                <strong>Philips HearLink</strong> mais adequada ao seu perfil auditivo —
                sem pressão e sem jargão excessivo.
              </p>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                Conheça nossa seleção completa de{" "}
                <Link
                  href={APP_ROUTES.aparelhos}
                  onClick={() =>
                    trackButtonClick("preco_link_pilar_aparelhos", {
                      section: "hero",
                      page: PAGE_TRACKING,
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
                    trackButtonClick("preco_cta_agendar", { section: "hero" })
                  }
                  className="cta-button-primary text-center"
                >
                  Agendar avaliação gratuita
                </Link>
                <WhatsAppLeadButton
                  buttonName="preco_cta_whatsapp"
                  leadSource="Website Preço Aparelho Hero"
                  trackingParams={{
                    section: "hero",
                    page: PAGE_TRACKING,
                  }}
                  whatsappMessage="Olá Auditik, gostaria de entender o investimento em aparelho auditivo e agendar uma avaliação gratuita."
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
                  alt="Aparelho auditivo Philips HearLink — investimento em saúde auditiva na Auditik"
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

        {/* Trust cards */}
        <section className="py-20 bg-white">
          <div className="container-wide">
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

        {/* O que influencia o preço */}
        <section className="py-20 bg-bg-light-blue">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Por que o preço de aparelho auditivo varia tanto no Brasil?
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                No mercado brasileiro, não existe um único preço de aparelho auditivo. O
                investimento reflete fatores clínicos, tecnológicos e de serviço.
                Conhecer esses fatores ajuda você — ou quem você ama — a decidir com
                segurança, sem medo de que o tratamento seja inacessível.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {priceFactors.map((factor) => (
                <article
                  key={factor.title}
                  className="bg-white rounded-4xl p-8 border border-blue-50 shadow-sm"
                >
                  <span className="material-symbols-outlined text-3xl text-auditik-blue mb-4">
                    {factor.icon}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">
                    {factor.title}
                  </h3>
                  <p className="text-sm font-bold text-auditik-blue uppercase tracking-wider mb-4">
                    {factor.subtitle}
                  </p>
                  <ul className="space-y-3">
                    {factor.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed"
                      >
                        <span className="material-symbols-outlined text-auditik-blue shrink-0 text-lg mt-0.5">
                          check
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p className="mt-10 text-center text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Comparar apenas &ldquo;o preço do aparelho&rdquo; entre sites ou lojas
              genéricas raramente é justo: você pode estar comparando produtos — e
              serviços — completamente diferentes.
            </p>
          </div>
        </section>

        {/* Faixas de investimento */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">
              Quanto custa um aparelho auditivo? Entenda as faixas
            </h2>
            <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              Não publicamos tabela fixa de preços na internet porque{" "}
              <strong>cada caso é único</strong> — orçamento sem avaliação pode induzir
              ao erro. Na consulta gratuita, você recebe orientação alinhada à sua
              audição e ao seu planejamento financeiro.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {investmentTiers.map((tier) => (
                <article
                  key={tier.title}
                  className="bg-bg-light-blue rounded-4xl p-8 border border-blue-50 flex flex-col"
                >
                  <span className="material-symbols-outlined text-4xl text-auditik-blue mb-4">
                    {tier.icon}
                  </span>
                  <h3 className="text-2xl font-extrabold text-auditik-blue mb-3">
                    {tier.title}
                  </h3>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Para quem
                  </p>
                  <p className="text-slate-700 mb-4 leading-relaxed">{tier.audience}</p>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                    O que esperar
                  </p>
                  <p className="text-slate-600 leading-relaxed flex-1">
                    {tier.expectation}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-10 text-center text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
              <strong>Importante:</strong> parcelamento e condições comerciais são
              apresentados presencialmente, após a avaliação, com total transparência.{" "}
              Conheça as opções de{" "}
              <Link
                href={SUBS_APARELHOS_ROUTES.financiamento}
                onClick={() =>
                  trackButtonClick("preco_link_financiamento", {
                    section: "faixas_investimento",
                    page: PAGE_TRACKING,
                  })
                }
                className="text-auditik-blue font-bold hover:underline"
              >
                financiamento de aparelho auditivo
              </Link>{" "}
              — até 21x sem juros no cartão e Crédito Acessibilidade BB.
            </p>
          </div>
        </section>

        {/* Alerta — compras online */}
        <section className="py-20 bg-amber-50 border-y border-amber-100">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-200/60 text-amber-900 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  <span className="material-symbols-outlined text-base">warning</span>
                  Atenção
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                  O perigo de comprar amplificadores baratos ou genéricos na internet
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  É comum encontrar <strong>amplificadores de som</strong>, PSAPs ou
                  dispositivos genéricos vendidos online por valores muito abaixo do
                  mercado. Eles <strong>não substituem</strong> um aparelho auditivo
                  prescrito e adaptado por fonoaudiólogo.
                </p>
                <ul className="space-y-4">
                  {onlinePurchaseRisks.map((risk) => (
                    <li key={risk} className="flex items-start gap-3 text-slate-700">
                      <span className="material-symbols-outlined text-amber-600 shrink-0 mt-0.5">
                        cancel
                      </span>
                      <span className="leading-relaxed">{risk}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-slate-700 leading-relaxed">
                  Na <strong>Auditik</strong>, somos{" "}
                  <strong>distribuidor autorizado Philips Hearing Solutions</strong> —
                  produto original, suporte técnico e processo clínico completo.
                  Economizar sem orientação costuma sair mais caro.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Link
                    href={APP_ROUTES.contato}
                    onClick={() =>
                      trackButtonClick("preco_cta_alerta_agendar", {
                        section: "alerta_online",
                      })
                    }
                    className="cta-button-primary text-center"
                  >
                    Agendar avaliação gratuita
                  </Link>
                  <WhatsAppLeadButton
                    buttonName="preco_alerta_whatsapp"
                    leadSource="Website Preço Aparelho Alerta"
                    trackingParams={{
                      section: "alerta_online",
                      page: PAGE_TRACKING,
                    }}
                    whatsappMessage="Olá Auditik, quero agendar uma avaliação para comparar aparelhos auditivos com segurança."
                    className="cta-button-secondary text-center"
                  >
                    Falar no WhatsApp
                  </WhatsAppLeadButton>
                </div>
              </div>
              <div className="relative h-80 md:h-[420px] rounded-4xl overflow-hidden shadow-xl border border-amber-200/50">
                <Image
                  src={CLINIC_IMAGE}
                  alt="Consulta fonoaudiológica na Auditik — avaliação antes de definir investimento"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* O que está incluído */}
        <section className="py-20 bg-bg-light-blue">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">
              O que está incluído no investimento na Auditik
            </h2>
            <p className="text-slate-600 text-lg text-center max-w-2xl mx-auto mb-12">
              O preço de aparelho auditivo justo inclui aparelho, tecnologia, serviço e
              suporte local — não apenas o dispositivo.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {includedServices.map((service) => (
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

        {/* Como definimos preço justo */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">
              Como a Auditik define um preço justo para o seu caso
            </h2>
            <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              Definimos o investimento de forma ética e personalizada em quatro etapas.
              Você sai da consulta entendendo <strong>por que</strong> aquele modelo foi
              indicado e <strong>o que</strong> está pagando.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {fairPriceSteps.map((item) => (
                <article
                  key={item.step}
                  className="flex gap-6 bg-bg-light-blue rounded-4xl p-8 border border-blue-50"
                >
                  <div className="w-14 h-14 shrink-0 bg-auditik-blue text-white rounded-2xl flex items-center justify-center text-2xl font-extrabold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Tecnologia Philips */}
        <section className="py-20 bg-bg-light-blue">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">
              Tecnologia Philips HearLink: o que você leva além do aparelho
            </h2>
            <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-12">
              Recursos de ponta que justificam o investimento em qualidade de vida — com
              acompanhamento clínico da Auditik.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {techFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-4xl p-8 border border-blue-50 text-center shadow-sm"
                >
                  <h3 className="text-xl font-bold text-auditik-blue mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{feature.text}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-slate-600 text-lg leading-relaxed">
              Para comparar modelos RITE, BTE e intra-auriculares, veja a{" "}
              <Link
                href={APP_ROUTES.aparelhos}
                onClick={() =>
                  trackButtonClick("preco_link_pilar_tecnologia", {
                    section: "tecnologia",
                    page: PAGE_TRACKING,
                  })
                }
                className="text-auditik-blue font-bold hover:underline"
              >
                linha completa Philips HearLink
              </Link>
              . Busca máxima discrição? Veja o{" "}
              <Link
                href={SUBS_APARELHOS_ROUTES.invisivel}
                onClick={() =>
                  trackButtonClick("preco_link_invisivel", {
                    section: "tecnologia",
                    page: PAGE_TRACKING,
                  })
                }
                className="text-auditik-blue font-bold hover:underline"
              >
                aparelho auditivo invisível
              </Link>
              . Quer praticidade sem pilhas? Veja o{" "}
              <Link
                href={SUBS_APARELHOS_ROUTES.recarregavel}
                onClick={() =>
                  trackButtonClick("preco_link_recarregavel", {
                    section: "tecnologia",
                    page: PAGE_TRACKING,
                  })
                }
                className="text-auditik-blue font-bold hover:underline"
              >
                aparelho auditivo recarregável
              </Link>
              .
            </p>
          </div>
        </section>

        {/* CTA intermediário */}
        <section className="py-16 bg-auditik-blue text-white">
          <div className="container-wide text-center max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              Não arrisque sua audição com soluções não personalizadas
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Agende uma <strong>avaliação auditiva gratuita</strong> em Piracicaba e
              descubra o investimento certo para o seu perfil auditivo com Philips
              HearLink.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("preco_cta_intermediario_contato", {
                    section: "cta_intermediario",
                  })
                }
                className="inline-flex min-h-11 items-center justify-center bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-3 px-8 rounded-full transition-colors"
              >
                Agendar avaliação gratuita
              </Link>
              <WhatsAppLeadButton
                buttonName="preco_cta_intermediario_whatsapp"
                leadSource="Website Preço Aparelho CTA Intermediário"
                trackingParams={{
                  section: "cta_intermediario",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, gostaria de agendar uma avaliação auditiva gratuita para entender o investimento em aparelho auditivo."
                className="inline-flex min-h-11 items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full border border-white/30 transition-colors"
              >
                Falar com especialista
              </WhatsAppLeadButton>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-bg-light-blue">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-10 text-center">
              Dúvidas frequentes sobre preço de aparelho auditivo
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
              alt="Aparelhos auditivos Philips HearLink na Auditik"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="container-wide relative z-10 text-center max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Agende sua avaliação auditiva gratuita e descubra o investimento certo
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed">
              O primeiro passo para um <strong>preço de aparelho auditivo</strong> justo
              é entender sua audição com quem vive isso todos os dias. Na{" "}
              <strong>Auditik</strong>, em <strong>Piracicaba</strong>, você encontra{" "}
              <strong>Philips HearLink</strong>, equipe de fonoaudiólogos e
              acompanhamento que continua depois da entrega do aparelho.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("preco_final_cta_contato", {
                    section: "final_cta",
                  })
                }
                className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-3 px-6 sm:px-8 rounded-full transition-colors"
              >
                Agendar minha avaliação
              </Link>
              <WhatsAppLeadButton
                buttonName="preco_final_cta_whatsapp"
                leadSource="Website Preço Aparelho"
                trackingParams={{
                  section: "final_cta",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, quero agendar minha avaliação auditiva gratuita para entender o investimento em aparelho auditivo."
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
