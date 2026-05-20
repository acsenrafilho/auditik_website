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

const PAGE_TRACKING = "subs-aparelhos/financiamento";

const HERO_IMAGE =
  "/images/philips/optimized/background/Philips_HearLink50_miniRITE_H1-2024_C116DarkBeige_Angle90_Close-up_In-On-Ear_MS-6152_Woman_1200x800px.jpg";

const CTA_BACKGROUND =
  "/images/philips/optimized/background/PHS_HL50_miniRITE_Portable_Charger_Lifestyle_blue_shadows_GettyImages-1530702944_MS_0255.jpg";

const CLINIC_IMAGE = "/images/auditik/background/sala_atendimento.webp";

const BB_OFFICIAL_URL =
  "https://www.bb.com.br/pbb/pagina-inicial/voce/produtos-e-servicos/financiamentos/financiar-material-de-construcao-eletronicos-ou-viagens/comprar-produtos-e-servicos-para-pessoas-com-deficiencia";

const faqItems = [
  {
    question: "Posso financiar aparelho auditivo no cartão sem juros?",
    answer:
      "Sim. Na Auditik você pode parcelar em até 21x sem juros no cartão de crédito, após avaliação gratuita e apresentação da proposta personalizada.",
  },
  {
    question: "Preciso passar por avaliação antes de simular parcelas?",
    answer:
      "Sim. A simulação respeita o modelo Philips HearLink e o investimento indicados clinicamente para o seu perfil auditivo.",
  },
  {
    question: "O Crédito Acessibilidade do BB é só para quem tem deficiência?",
    answer:
      "A linha destina-se a produtos de tecnologia assistiva. Quem contrata pode ser familiar, desde que atenda aos requisitos do Banco do Brasil.",
  },
  {
    question: "Quais documentos o Banco do Brasil exige?",
    answer:
      "Em geral, nota fiscal da compra em nome do cliente, emitida até 30 dias antes da contratação. Regras completas na simulação ou agência BB.",
  },
  {
    question: "Posso usar cartão e Crédito BB ao mesmo tempo?",
    answer:
      "Na prática, escolhe-se a modalidade principal da operação. A equipe da Auditik orienta na clínica qual opção faz mais sentido.",
  },
  {
    question: "A avaliação auditiva é gratuita?",
    answer:
      "Sim e é sem compromisso de compra. É o primeiro passo para simular parcelas com segurança.",
  },
  {
    question: "Financiar é igual a comprar aparelho barato na internet?",
    answer:
      "Não. Financiamento na Auditik inclui processo clínico completo e Philips HearLink original. Dispositivos genéricos online não substituem tratamento fonoaudiológico.",
  },
];

const trustCards = [
  {
    icon: "credit_card",
    title: "Até 21x sem juros",
    text: "Parcelamento no cartão de crédito com condições apresentadas na clínica, após avaliação.",
  },
  {
    icon: "calculate",
    title: "Simulação na clínica",
    text: "Você vê as parcelas na hora, sem burocracia excessiva e com orientação da equipe.",
  },
  {
    icon: "account_balance",
    title: "Crédito BB Acessibilidade",
    text: "Convênio para financiamento em até 60x com taxas reduzidas, quando elegível.",
  },
];

const barrierBullets = [
  {
    title: "Qualidade de vida imediata",
    text: "Ouvir melhor impacta segurança, trabalho e vínculos afetivos no dia a dia.",
  },
  {
    title: "Transparência",
    text: "Simulamos condições na clínica, sem letras miúdas escondidas no site.",
  },
  {
    title: "Segurança clínica",
    text: "O modelo certo é definido após avaliação gratuita, não só pelo valor da parcela.",
  },
];

const cardPaymentItems = [
  {
    icon: "payments",
    title: "Crédito parcelado",
    text: "Até 21x sem juros no cartão (sujeito à aprovação da operadora e ao valor da operação).",
  },
  {
    icon: "account_balance_wallet",
    title: "Débito e outras modalidades",
    text: "Consulte na clínica as opções disponíveis no dia da proposta personalizada.",
  },
  {
    icon: "credit_score",
    title: "Principais bandeiras",
    text: "Visa, Mastercard, Elo, American Express e demais habilitadas na maquininha.",
  },
];

const simulationSteps = [
  {
    step: "1",
    title: "Agende a avaliação auditiva gratuita",
    text: "Presencial em Piracicaba, Americana, São Pedro ou Charqueada; ou contato pelo WhatsApp para tirar dúvidas iniciais.",
  },
  {
    step: "2",
    title: "Consulta e demonstração Philips HearLink",
    text: "Fonoaudiólogos avaliam seu perfil auditivo e orientam modelos (RITE, BTE, intra) adequados à sua rotina.",
  },
  {
    step: "3",
    title: "Proposta clara",
    text: "Opções de tecnologia e investimento, com o que está incluso: programação, ajustes e suporte.",
  },
  {
    step: "4",
    title: "Simulação na hora",
    text: "Na clínica, simulamos parcelas no cartão (até 21x sem juros) e orientamos o Crédito Acessibilidade BB quando fizer sentido.",
  },
];

const bbConditions = [
  { label: "Valor", value: "Mín. R$ 70 — máx. R$ 30.000" },
  { label: "Prazo", value: "2 a 60 meses" },
  { label: "Juros", value: "Reduzidos (consultar na simulação)" },
  { label: "Prestações", value: "Débito automático em conta corrente" },
  {
    label: "Documento na compra",
    value: "Nota fiscal em nome do cliente, emitida até 30 dias antes da contratação",
  },
];

const bbEligibility = [
  "Correntista do Banco do Brasil com conta há mais de 6 meses, limite de crédito disponível e renda bruta de até 10 salários mínimos.",
  "Não é obrigatório que quem contrata seja a pessoa que usará o aparelho: familiares podem financiar em benefício de quem tem perda auditiva.",
  "Liberação sujeita à análise de crédito do Banco do Brasil.",
];

const auditikBbSupport = [
  {
    icon: "hearing",
    title: "Avaliação antes do crédito",
    text: "Orientamos se a linha BB faz sentido para o seu perfil após a avaliação auditiva gratuita.",
  },
  {
    icon: "description",
    title: "Apoio na documentação",
    text: "Ajudamos no entendimento da nota fiscal e no encaminhamento para simulação na agência ou canais do BB.",
  },
  {
    icon: "medical_services",
    title: "Cuidado clínico completo",
    text: "Você adquire Philips HearLink com acompanhamento fonoaudiológico — o financiamento viabiliza o tratamento.",
  },
];

const paymentComparison = [
  {
    icon: "credit_card",
    title: "Cartão 21x sem juros",
    profile: "Quer menos parcelas e resolver em até cerca de 2 anos",
    suggestion: "Parcelamento na Auditik após avaliação e proposta personalizada.",
  },
  {
    icon: "account_balance",
    title: "Crédito BB até 60x",
    profile: "Precisa de parcela mensal menor e é correntista BB elegível",
    suggestion:
      "Crédito Acessibilidade com taxas reduzidas — confirme na simulação oficial.",
  },
  {
    icon: "event_available",
    title: "Ainda sem modelo definido",
    profile: "Primeira visita ou dúvidas sobre investimento",
    suggestion:
      "Avaliação gratuita primeiro — depois simulamos todas as opções na clínica.",
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

export default function FinanciamentoAparelhoAuditivoPage() {
  const seo = getSEOMeta({
    title: "Financiamento de aparelho auditivo | Parcelamento e crédito na Auditik",
    description:
      "Parcelamento em até 21x sem juros no cartão, simulação na clínica em Piracicaba e Crédito Acessibilidade BB em até 60x. Philips HearLink com avaliação gratuita.",
    canonical: "https://www.auditik.com.br/financiamento-aparelho-auditivo/",
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
        name: "Financiamento de aparelho auditivo",
        item: "https://www.auditik.com.br/financiamento-aparelho-auditivo/",
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
                Parcelamento facilitado · Crédito BB · Avaliação gratuita
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.05] mb-6">
                Financiamento de aparelho auditivo:{" "}
                <span className="text-auditik-blue">planeje o investimento</span> sem
                adiar sua audição
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-4">
                O <strong>financiamento de aparelho auditivo</strong> não precisa ser um
                obstáculo entre você e uma vida com mais clareza nas conversas, na
                família e no dia a dia. Na <strong>Auditik Soluções Auditivas</strong>,
                em <strong>Piracicaba-SP</strong>, distribuidor autorizado{" "}
                <strong>Philips HearLink</strong>, ajudamos você — ou quem você ama — a
                encontrar a forma de pagamento que cabe no orçamento:{" "}
                <strong>parcelamento no cartão em até 21x sem juros</strong>, simulação
                transparente na clínica e, quando faz sentido, o{" "}
                <strong>Crédito Acessibilidade do Banco do Brasil</strong> em até{" "}
                <strong>60 parcelas</strong>, com condições pensadas para tornar a saúde
                auditiva mais acessível.
              </p>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                Conheça nossa seleção completa de{" "}
                <Link
                  href={APP_ROUTES.aparelhos}
                  onClick={() =>
                    trackButtonClick("financiamento_link_pilar_aparelhos", {
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
                    trackButtonClick("financiamento_cta_agendar", {
                      section: "hero",
                      page: PAGE_TRACKING,
                    })
                  }
                  className="cta-button-primary text-center"
                >
                  Agendar avaliação gratuita
                </Link>
                <WhatsAppLeadButton
                  buttonName="financiamento_cta_whatsapp"
                  leadSource="Website Financiamento Aparelho Hero"
                  trackingParams={{
                    section: "hero",
                    page: PAGE_TRACKING,
                  }}
                  whatsappMessage="Olá Auditik, gostaria de saber as opções de financiamento de aparelho auditivo e agendar uma avaliação gratuita."
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
                  alt="Financiamento de aparelho auditivo Philips HearLink na Auditik Piracicaba"
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

        {/* Barreira do preço */}
        <section className="py-20 bg-bg-light-blue">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Por que falar de financiamento antes de comprar?
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Muitas famílias adiam a avaliação porque imaginam um pagamento único e
                alto. Na prática, o investimento em{" "}
                <strong>aparelho auditivo Philips HearLink</strong> é um projeto de
                reabilitação: inclui exame, indicação clínica, programação, demonstração
                e acompanhamento na Auditik. <strong>Financiar ou parcelar</strong> é
                uma forma de distribuir esse investimento no tempo — sem abrir mão de
                orientação profissional nem de produto com procedência e garantia
                nacional.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {barrierBullets.map((item) => (
                <article
                  key={item.title}
                  className="bg-white rounded-4xl p-8 border border-blue-50 shadow-sm text-center"
                >
                  <h3 className="text-xl font-bold text-auditik-blue mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Parcelamento 21x */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Parcelamento facilitado na Auditik — até 21x sem juros no cartão
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Na unidade de <strong>Piracicaba</strong> (e demais unidades da rede,
                quando aplicável), você pode parcelar o aparelho auditivo{" "}
                <strong>em até 21 vezes no cartão de crédito, sem juros</strong>,
                conforme condições apresentadas após a avaliação e definição do modelo{" "}
                <strong>Philips HearLink</strong> indicado.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {cardPaymentItems.map((item) => (
                <article
                  key={item.title}
                  className="bg-bg-light-blue rounded-4xl p-8 border border-blue-50"
                >
                  <span className="material-symbols-outlined text-3xl text-auditik-blue mb-4">
                    {item.icon}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{item.text}</p>
                </article>
              ))}
            </div>
            <p className="text-center text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed mb-4">
              <strong>
                O parcelamento é apresentado junto ao orçamento personalizado
              </strong>
              , após você entender <strong>por que</strong> aquele aparelho foi indicado
              — nunca o contrário.
            </p>
            <p className="text-center text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Para saber o que influencia o valor antes de parcelar, veja nosso guia
              sobre{" "}
              <Link
                href={SUBS_APARELHOS_ROUTES.preco}
                onClick={() =>
                  trackButtonClick("financiamento_link_preco", {
                    section: "parcelamento",
                    page: PAGE_TRACKING,
                  })
                }
                className="text-auditik-blue font-bold hover:underline"
              >
                preço de aparelho auditivo
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Simulação */}
        <section className="py-20 bg-bg-light-blue">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">
              Como funciona a simulação de parcelas — simples e sem burocracia
            </h2>
            <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              Em quatro passos, você entende o investimento e vê as condições de
              pagamento com clareza — na mesma visita à clínica.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {simulationSteps.map((item) => (
                <article
                  key={item.step}
                  className="flex gap-6 bg-white rounded-4xl p-8 border border-blue-50 shadow-sm"
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
            <p className="mt-10 text-center text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Você sai da consulta sabendo <strong>quanto</strong>,{" "}
              <strong>como</strong> e <strong>por que</strong> — sem pressão para
              decidir no mesmo dia.
            </p>
          </div>
        </section>

        {/* Crédito BB */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="bg-auditik-blue text-white rounded-4xl p-8 md:p-12 mb-12 text-center max-w-4xl mx-auto">
              <span className="material-symbols-outlined text-5xl mb-4 opacity-90">
                account_balance
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                Crédito Acessibilidade BB — até 60 parcelas
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                Taxas reduzidas e prazo estendido para quem busca{" "}
                <strong>parcelas mensais menores</strong>. Condições competitivas,
                frequentemente inferiores à remuneração da poupança — confirme na
                simulação oficial do Banco do Brasil.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                  Crédito Acessibilidade do Banco do Brasil — até 60x com juros
                  reduzidos
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  A Auditik possui <strong>convênio</strong> para facilitar o acesso ao{" "}
                  <strong>BB Crédito Acessibilidade</strong> — linha para produtos e
                  serviços de tecnologia assistiva, incluindo{" "}
                  <strong>aparelhos auditivos</strong>. É uma alternativa relevante
                  quando você busca parcelas menores e prazo mais longo.
                </p>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  O que é o Crédito Acessibilidade?
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Financiamento do Banco do Brasil voltado a melhorar a qualidade de
                  vida de pessoas com deficiência, cobrindo aparelhos auditivos,
                  cadeiras de rodas, órteses, próteses e adaptações, entre produtos de
                  tecnologia assistiva listados pelo BB.
                </p>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Quem pode contratar?
                </h3>
                <ul className="space-y-3 mb-6">
                  {bbEligibility.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-slate-600 leading-relaxed"
                    >
                      <span className="material-symbols-outlined text-auditik-blue shrink-0 text-lg mt-0.5">
                        check
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <div className="relative h-64 md:h-80 rounded-4xl overflow-hidden shadow-xl border border-blue-50">
                  <Image
                    src={CLINIC_IMAGE}
                    alt="Atendimento na Auditik — orientação sobre financiamento de aparelho auditivo"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="bg-bg-light-blue rounded-4xl p-8 border border-blue-50">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Condições gerais (referência BB)
                  </h3>
                  <dl className="space-y-4">
                    {bbConditions.map((row) => (
                      <div key={row.label}>
                        <dt className="text-sm font-bold text-auditik-blue uppercase tracking-wider">
                          {row.label}
                        </dt>
                        <dd className="text-slate-700 mt-1">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 mb-6 text-center">
              Como a Auditik ajuda nesse financiamento
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {auditikBbSupport.map((item) => (
                <article
                  key={item.title}
                  className="bg-bg-light-blue rounded-4xl p-8 border border-blue-50"
                >
                  <span className="material-symbols-outlined text-3xl text-auditik-blue mb-4">
                    {item.icon}
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 leading-relaxed">{item.text}</p>
                </article>
              ))}
            </div>

            <p className="text-sm text-slate-500 max-w-3xl mx-auto text-center leading-relaxed">
              Operação de crédito sujeita à aprovação do Banco do Brasil. Antes de
              contratar, simule e verifique se a prestação cabe no seu orçamento. Taxas
              e limites podem variar; fonte oficial:{" "}
              <a
                href={BB_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-auditik-blue font-bold hover:underline"
              >
                BB — produtos para pessoas com deficiência
              </a>
              .
            </p>
          </div>
        </section>

        {/* Comparativo */}
        <section className="py-20 bg-bg-light-blue">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">
              Cartão em 21x ou Crédito BB em 60x — qual escolher?
            </h2>
            <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              Não existe resposta única: depende do seu orçamento mensal e do perfil no
              Banco do Brasil. Na consulta, simulamos as opções com você.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {paymentComparison.map((item) => (
                <article
                  key={item.title}
                  className="bg-white rounded-4xl p-8 border border-blue-50 shadow-sm flex flex-col"
                >
                  <span className="material-symbols-outlined text-4xl text-auditik-blue mb-4">
                    {item.icon}
                  </span>
                  <h3 className="text-xl font-extrabold text-auditik-blue mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Perfil
                  </p>
                  <p className="text-slate-700 mb-4 leading-relaxed flex-1">
                    {item.profile}
                  </p>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Sugestão
                  </p>
                  <p className="text-slate-600 leading-relaxed">{item.suggestion}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Philips tecnologia */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">
              Philips HearLink: tecnologia que justifica o investimento financiado
            </h2>
            <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              Ao parcelar ou financiar, você leva todas as vantagens de um distribuidor
              autorizado Philips com recursos de ponta e acompanhamento vitalício na
              Auditik — para que o financiamento se transforme em resultado auditivo,
              não só em uma compra.
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
            <p className="text-center text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
              <strong>Acompanhamento vitalício</strong> na Auditik: ajustes sem custo
              adicional de consulta de ajuste ao longo do tratamento. Para comparar
              modelos, veja a{" "}
              <Link
                href={APP_ROUTES.aparelhos}
                onClick={() =>
                  trackButtonClick("financiamento_link_pilar_tecnologia", {
                    section: "tecnologia",
                    page: PAGE_TRACKING,
                  })
                }
                className="text-auditik-blue font-bold hover:underline"
              >
                linha completa Philips HearLink
              </Link>
              . Interessado em formatos discretos? Conheça o{" "}
              <Link
                href={SUBS_APARELHOS_ROUTES.invisivel}
                onClick={() =>
                  trackButtonClick("financiamento_link_invisivel", {
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
                  trackButtonClick("financiamento_link_recarregavel", {
                    section: "tecnologia",
                    page: PAGE_TRACKING,
                  })
                }
                className="text-auditik-blue font-bold hover:underline"
              >
                aparelho auditivo recarregável
              </Link>
              . Quer celular e TV conectados? Veja o{" "}
              <Link
                href={SUBS_APARELHOS_ROUTES.bluetooth}
                onClick={() =>
                  trackButtonClick("financiamento_link_bluetooth", {
                    section: "tecnologia",
                    page: PAGE_TRACKING,
                  })
                }
                className="text-auditik-blue font-bold hover:underline"
              >
                aparelho auditivo com Bluetooth
              </Link>
              .
            </p>
          </div>
        </section>

        {/* CTA intermediário */}
        <section className="py-16 bg-auditik-blue text-white">
          <div className="container-wide text-center max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              Não deixe o orçamento adiar o cuidado com a audição
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Agende uma <strong>avaliação auditiva gratuita</strong> em Piracicaba e
              simule <strong>financiamento de aparelho auditivo</strong> com
              transparência: 21x sem juros no cartão ou orientação sobre Crédito BB
              quando elegível.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("financiamento_cta_intermediario_contato", {
                    section: "cta_intermediario",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex min-h-11 items-center justify-center bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-3 px-8 rounded-full transition-colors"
              >
                Agendar avaliação gratuita
              </Link>
              <WhatsAppLeadButton
                buttonName="financiamento_cta_intermediario_whatsapp"
                leadSource="Website Financiamento Aparelho CTA Intermediário"
                trackingParams={{
                  section: "cta_intermediario",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, gostaria de agendar uma avaliação gratuita para simular o financiamento de aparelho auditivo."
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
              Dúvidas frequentes sobre financiamento de aparelho auditivo
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
              alt="Aparelhos auditivos Philips HearLink — financiamento na Auditik"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="container-wide relative z-10 text-center max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Agende sua avaliação auditiva gratuita e planeje o pagamento ideal
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed">
              O primeiro passo para um{" "}
              <strong>financiamento de aparelho auditivo</strong> que cabe no bolso é
              entender sua audição com quem vive isso todos os dias. Na{" "}
              <strong>Auditik</strong>, em <strong>Piracicaba</strong>, você encontra{" "}
              <strong>Philips HearLink</strong>,{" "}
              <strong>21x sem juros no cartão</strong>, simulação transparente e
              orientação sobre <strong>Crédito Acessibilidade BB</strong> quando fizer
              sentido.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("financiamento_final_cta_contato", {
                    section: "final_cta",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-3 px-6 sm:px-8 rounded-full transition-colors"
              >
                Agendar minha avaliação
              </Link>
              <WhatsAppLeadButton
                buttonName="financiamento_final_cta_whatsapp"
                leadSource="Website Financiamento Aparelho"
                trackingParams={{
                  section: "final_cta",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, quero agendar minha avaliação auditiva gratuita para simular o financiamento de aparelho auditivo."
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
