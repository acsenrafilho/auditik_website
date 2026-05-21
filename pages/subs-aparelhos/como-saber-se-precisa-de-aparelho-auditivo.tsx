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

const PAGE_TRACKING = "subs-aparelhos/como-saber-precisa";

const HERO_IMAGE =
  "/images/philips/optimized/background/PHS_HL50_miniRITE_Lifestyle_iPhone14_MS_0059_AS_485092853.jpg";

const CTA_BACKGROUND =
  "/images/philips/optimized/background/PHS_HL50_miniRITE_Portable_Charger_Lifestyle_blue_shadows_GettyImages-1530702944_MS_0255.jpg";

const CLINIC_IMAGE = "/images/auditik/background/sala_atendimento.webp";

const faqItems = [
  {
    question: "Como saber se preciso de aparelho auditivo?",
    answer:
      "Observe sinais cotidianos — volume alto da TV, pedir repetição com frequência, cansaço em ambientes ruidosos — e confirme com avaliação auditiva. Só o exame define necessidade e tipo de solução.",
  },
  {
    question: "Todo mundo que tem perda auditiva precisa de aparelho?",
    answer:
      "Não. Alguns casos pedem tratamento médico, acompanhamento ou apenas monitoramento. Na Auditik explicamos o resultado sem obrigar compra.",
  },
  {
    question: "Com que idade a perda auditiva aparece?",
    answer:
      "Pode surgir em qualquer fase da vida; presbiacusia é comum após os 60 anos, mas exposição a ruído afeta jovens e adultos.",
  },
  {
    question: "Aumentar o volume da TV é sinal de aparelho auditivo?",
    answer:
      "É um alerta frequente. Se persiste e a família reclama do volume, agende avaliação auditiva gratuita na Auditik em Piracicaba.",
  },
  {
    question: "Pedir para repetir o tempo todo é normal?",
    answer:
      "Ocasionalmente sim; com frequência, em vários ambientes, sugere investigação auditiva com audiometria.",
  },
  {
    question: "Ignorar a perda auditiva pode afetar a saúde mental?",
    answer:
      "Sim. Isolamento, frustração e conflitos familiares são comuns; tratar a audição ajuda a recuperar participação social e bem-estar.",
  },
  {
    question: "A avaliação na Auditik é gratuita e sem compromisso?",
    answer:
      "Sim, para diagnóstico e orientação em Piracicaba e região, com equipe fonoaudiológica especializada em reabilitação auditiva.",
  },
  {
    question: "Se precisar de aparelho, a Auditik trabalha com qual marca?",
    answer:
      "Somos distribuidor autorizado Philips Hearing Solutions (linha HearLink), com programação individual e retornos de ajuste na clínica.",
  },
];

const trustCards = [
  {
    icon: "volunteer_activism",
    title: "Avaliação sem compromisso",
    text: "Diagnóstico claro em linguagem acessível — você decide o próximo passo com calma, sem pressão para comprar.",
  },
  {
    icon: "hearing",
    title: "Philips autorizado",
    text: "Quando indicado, SpeechSensor, AutoSense e app HearLink 2 — tecnologia de ponta com suporte clínico na Auditik.",
  },
  {
    icon: "location_on",
    title: "Piracicaba e região",
    text: "Avaliação auditiva gratuita presencial com equipe fonoaudiológica especializada em saúde auditiva.",
  },
];

const sinaisSutis = [
  "Você acha que “todo mundo fala baixo” ou murmura.",
  "Evita lugares com barulho de fundo sem perceber que está se protegendo da dificuldade de ouvir.",
  "Sente que ouve, mas não entende — principalmente em telefone ou TV.",
  "Zumbido (tinnitus) passou a ser companhia frequente.",
];

const situacoesAlerta = [
  {
    icon: "tv",
    title: "Televisão e rádio",
    text: "Volume muito alto para você, enquanto outros acham “estourado”.",
  },
  {
    icon: "record_voice_over",
    title: "Repetir frases",
    text: "“Como?”, “Pode repetir?”, “Não entendi a última parte” em quase toda conversa.",
  },
  {
    icon: "call",
    title: "Telefone e vídeo chamada",
    text: "Evita ou encerra rápido por não captar a fala com clareza.",
  },
  {
    icon: "restaurant",
    title: "Restaurante e festas",
    text: "Cansaço, irritação ou silêncio após encontros sociais.",
  },
  {
    icon: "groups",
    title: "Família e trabalho",
    text: "Parece desatento ou distraído — quando na verdade não ouviu metade da frase.",
  },
  {
    icon: "doorbell",
    title: "Portas e segurança",
    text: "Não percebe campainha, interfone, alarme ou carro na garagem.",
  },
  {
    icon: "directions_car",
    title: "Direção e trânsito",
    text: "Dificuldade para localizar buzinas ou sirenes no ambiente.",
  },
  {
    icon: "headphones",
    title: "Fones e ruído",
    text: "Histórico de exposição a som alto com audição piorando aos poucos.",
  },
];

const riscosIgnorar = [
  {
    icon: "person_off",
    title: "Isolamento social",
    text: "Deixa de ir ao almoço de família, ao culto ou ao aniversário — “é muito barulho” vira desculpa para não sair.",
  },
  {
    icon: "sentiment_dissatisfied",
    title: "Saúde mental",
    text: "Frustração, tristeza e sensação de estar “fora” da própria casa — mal-entendidos viram conflito.",
  },
  {
    icon: "favorite",
    title: "Relacionamentos",
    text: "No trabalho parece despreparado; em casa parece desinteressado — afeta autoestima e vínculos.",
  },
  {
    icon: "warning",
    title: "Segurança",
    text: "Não ouvir avisos, veículos ou alarmes coloca em risco a independência — em qualquer idade.",
  },
  {
    icon: "psychology",
    title: "Saúde cognitiva",
    text: "Perda não tratada exige mais esforço mental para decifrar fala; estudos associam a maior risco de declínio de atenção.",
  },
];

const quandoProcurar = [
  {
    icon: "calendar_month",
    title: "Qualquer idade",
    text: "Perda auditiva não é “coisa de idoso”. Jovens e adultos com exposição a ruído também precisam de avaliação.",
  },
  {
    icon: "science",
    title: "Audiometria, não achismo",
    text: "Só o exame auditivo define se você precisa de aparelho, outro tratamento ou acompanhamento.",
  },
  {
    icon: "schedule",
    title: "Quanto antes, melhor",
    text: "Mapear a perda cedo preserva opções — orientação, proteção ou amplificação quando indicada.",
  },
];

const philipsFeatures = [
  {
    icon: "graphic_eq",
    title: "SpeechSensor",
    text: "Prioriza vozes em restaurantes, reuniões e locais ruidosos — onde a dificuldade costuma aparecer primeiro.",
  },
  {
    icon: "auto_awesome",
    title: "AutoSense",
    text: "Reconhece o ambiente (casa, rua, festa) e ajusta volume e clareza automaticamente.",
  },
  {
    icon: "smartphone",
    title: "HearLink 2",
    text: "App para ajustes discretos pelo celular — o familiar pode ajudar no início da adaptação.",
  },
];

const clinicSteps = [
  {
    step: "1",
    title: "Agendamento",
    text: "Presencial em Piracicaba, Americana, São Pedro ou Charqueada; ou contato inicial pelo WhatsApp.",
  },
  {
    step: "2",
    title: "Avaliação completa",
    text: "Audiometria, anamnese e entendimento da sua rotina — trabalho, lazer, telefone, TV.",
  },
  {
    step: "3",
    title: "Resultado em linguagem clara",
    text: "Grau de perda, o que é reversível ou não, e se aparelho faz sentido agora ou em outro momento.",
  },
  {
    step: "4",
    title: "Próximo passo sem pressão",
    text: "Orientação, demonstração Philips HearLink quando indicado, ou acompanhamento — você decide com calma.",
  },
];

const siloLinks = [
  {
    href: SUBS_APARELHOS_ROUTES.idosos,
    icon: "elderly",
    label: "Aparelho para idosos",
    tracking: "sinais_link_idosos",
  },
  {
    href: SUBS_APARELHOS_ROUTES.piracicaba,
    icon: "location_on",
    label: "Aparelhos em Piracicaba",
    tracking: "sinais_link_piracicaba",
  },
  {
    href: SUBS_APARELHOS_ROUTES.preco,
    icon: "payments",
    label: "Preço de aparelho auditivo",
    tracking: "sinais_link_preco",
  },
  {
    href: SUBS_APARELHOS_ROUTES.financiamento,
    icon: "credit_card",
    label: "Financiamento (21x e Crédito BB)",
    tracking: "sinais_link_financiamento",
  },
  {
    href: SUBS_APARELHOS_ROUTES.recarregavel,
    icon: "battery_charging_full",
    label: "Aparelho recarregável",
    tracking: "sinais_link_recarregavel",
  },
  {
    href: SUBS_APARELHOS_ROUTES.invisivel,
    icon: "visibility_off",
    label: "Aparelho invisível",
    tracking: "sinais_link_invisivel",
  },
  {
    href: SUBS_APARELHOS_ROUTES.bluetooth,
    icon: "bluetooth",
    label: "Aparelho com Bluetooth",
    tracking: "sinais_link_bluetooth",
  },
  {
    href: SUBS_APARELHOS_ROUTES.philipsHearingSolutions,
    icon: "verified",
    label: "Philips Hearing Solutions",
    tracking: "sinais_link_philips",
  },
  {
    href: SUBS_APARELHOS_ROUTES.manutencaoAjuste,
    icon: "build",
    label: "Manutenção e ajuste",
    tracking: "sinais_link_manutencao",
  },
];

export default function ComoSaberSePrecisaDeAparelhoAuditivoPage() {
  const seo = getSEOMeta({
    title: "Como saber se precisa de aparelho auditivo | Guia Auditik Piracicaba",
    description:
      "Sinais de perda auditiva, riscos de adiar o tratamento e quando fazer avaliação gratuita. Clínica Auditik em Piracicaba — distribuidor Philips HearLink. Agende sem compromisso.",
    canonical: "https://www.auditik.com.br/como-saber-se-precisa-de-aparelho-auditivo/",
    ogImage:
      "https://www.auditik.com.br/images/philips/optimized/background/PHS_HL50_miniRITE_Lifestyle_iPhone14_MS_0059_AS_485092853.jpg",
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
        name: "Como saber se precisa de aparelho auditivo",
        item: "https://www.auditik.com.br/como-saber-se-precisa-de-aparelho-auditivo/",
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
                Guia educativo · Avaliação gratuita · Piracicaba
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.05] mb-6">
                Como saber se precisa de aparelho auditivo:{" "}
                <span className="text-auditik-blue">
                  sinais, riscos e o próximo passo
                </span>{" "}
                com tranquilidade
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-4">
                Perceber que a audição não está como antes pode gerar dúvida, vergonha
                ou a sensação de que “ainda dá para esperar”. Na verdade,{" "}
                <strong>como saber se precisa de aparelho auditivo</strong> começa por
                observar situações simples do dia a dia — volume da TV, pedidos para
                repetir frases, cansaço em conversas — e confirmar com uma{" "}
                <strong>avaliação auditiva profissional</strong>, sem compromisso. Na{" "}
                <strong>Auditik Soluções Auditivas</strong>, em{" "}
                <strong>Piracicaba-SP</strong>, acolhemos quem está no início dessa
                jornada (e familiares que pesquisam por quem amam) com clareza, empatia
                e indicação personalizada quando o exame mostra necessidade — incluindo
                tecnologia <strong>Philips Hearing Solutions</strong> (SpeechSensor,
                AutoSense e app HearLink 2).
              </p>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                Conheça nossa seleção completa de{" "}
                <Link
                  href={APP_ROUTES.aparelhos}
                  onClick={() =>
                    trackButtonClick("sinais_link_pilar_aparelhos", {
                      section: "hero",
                      page: PAGE_TRACKING,
                    })
                  }
                  className="text-auditik-blue font-bold hover:underline"
                >
                  aparelhos auditivos
                </Link>{" "}
                para entender qual se adapta melhor à rotina.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={APP_ROUTES.contato}
                  onClick={() =>
                    trackButtonClick("sinais_cta_agendar", {
                      section: "hero",
                      page: PAGE_TRACKING,
                    })
                  }
                  className="cta-button-primary text-center"
                >
                  Agendar avaliação gratuita
                </Link>
                <WhatsAppLeadButton
                  buttonName="sinais_cta_whatsapp"
                  leadSource="Website Como Saber Se Precisa Hero"
                  trackingParams={{
                    section: "hero",
                    page: PAGE_TRACKING,
                  }}
                  whatsappMessage="Olá Auditik, quero saber se preciso de aparelho auditivo e gostaria de agendar avaliação gratuita."
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
                  alt="Como saber se precisa de aparelho auditivo — Philips HearLink na Auditik Piracicaba"
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

        {/* Perda auditiva */}
        <section className="py-20 bg-bg-light-blue" id="perda-auditiva">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                O que é perda auditiva e por que ela costuma passar despercebida no
                início
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                A <strong>perda auditiva</strong> é a redução da capacidade de ouvir
                sons em um ou ambos os ouvidos, de forma leve, moderada, severa ou
                profunda. Ela pode surgir por envelhecimento (presbiacusia), exposição a
                ruídos, infecções, medicamentos, genética ou outras causas — e{" "}
                <strong>não sempre aparece de repente</strong>.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                No começo, o cérebro compensa: você se concentra mais no rosto de quem
                fala, lê os lábios sem perceber e interpreta o contexto para “preencher”
                palavras que não chegaram nítidas. Por isso muita gente demora anos para
                admitir que a audição mudou.
              </p>
            </div>

            <div className="max-w-3xl mx-auto mb-10 bg-white rounded-4xl p-8 border border-blue-50 shadow-sm">
              <div className="flex items-start gap-4 mb-6">
                <span className="material-symbols-outlined text-4xl text-auditik-blue shrink-0">
                  psychology
                </span>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    O mecanismo de compensação
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Seu cérebro trabalha em dobro para decifrar a fala — até o cansaço
                    social, os mal-entendidos ou o isolamento pesarem.{" "}
                    <strong>Quanto antes a perda é mapeada</strong> (com audiometria e
                    anamnese), mais opções existem: orientação, proteção auditiva ou,
                    quando indicado, <strong>aparelho auditivo</strong> com programação
                    adequada.
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
                Sinais sutis que quase ninguém associa à audição
              </h3>
              <ul className="space-y-3">
                {sinaisSutis.map((sinal) => (
                  <li key={sinal} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-auditik-blue shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span className="text-slate-600 leading-relaxed">{sinal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Situações cotidianas */}
        <section className="py-20 bg-white" id="situacoes-alerta">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Situações cotidianas de alerta: será que preciso de aparelho auditivo?
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Marque mentalmente quantas situações abaixo fazem parte da sua rotina
                (ou da rotina de quem você ama).{" "}
                <strong>
                  Uma ou duas podem ser coincidência; várias, com frequência, merecem
                  avaliação.
                </strong>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {situacoesAlerta.map((item) => (
                <article
                  key={item.title}
                  className="bg-bg-light-blue rounded-4xl p-6 border border-blue-50 shadow-sm"
                >
                  <span className="material-symbols-outlined text-3xl text-auditik-blue mb-3">
                    {item.icon}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
                </article>
              ))}
            </div>

            <p className="text-center text-slate-700 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
              <strong>Importante:</strong> só o exame auditivo define se você precisa de
              aparelho auditivo, outro tratamento ou apenas acompanhamento. O objetivo
              desta página é tirar a dúvida do “será que estou imaginando?” e convidar
              para um passo seguro.
            </p>
          </div>
        </section>

        {/* Perceber cedo */}
        <section className="py-20 bg-bg-light-blue" id="perceber-cedo">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Perceber cedo não é exagero — é cuidar da sua qualidade de vida
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Muita gente adia a consulta por medo de “confirmar” a perda. Na Auditik,
                a avaliação é acolhedora e explicativa — não um julgamento.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {quandoProcurar.map((item) => (
                <article
                  key={item.title}
                  className="bg-white rounded-4xl p-8 border border-blue-50 shadow-sm text-center"
                >
                  <span className="material-symbols-outlined text-4xl text-auditik-blue mb-4">
                    {item.icon}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Riscos de ignorar */}
        <section className="py-20 bg-white" id="riscos">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Riscos de ignorar o problema: isolamento, saúde mental e qualidade de
                vida
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Adiar a investigação da audição não é “evitar aparelho” — é, muitas
                vezes, <strong>aceitar um isolamento lento</strong> que a pessoa nem
                sabe nomear.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              {riscosIgnorar.map((impact) => (
                <article
                  key={impact.title}
                  className="bg-bg-light-blue rounded-4xl p-6 border border-blue-50 shadow-sm flex gap-4"
                >
                  <span className="material-symbols-outlined text-auditik-blue shrink-0 text-3xl">
                    {impact.icon}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900 mb-1">{impact.title}</p>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {impact.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="max-w-3xl mx-auto bg-bg-light-blue rounded-4xl p-8 border border-blue-50 text-center">
              <span className="material-symbols-outlined text-5xl text-auditik-blue mb-4">
                favorite
              </span>
              <p className="text-slate-700 text-lg leading-relaxed font-medium mb-2">
                Buscar avaliação <strong>não é provar que está surdo</strong> nem
                assumir que vai usar aparelho amanhã.
              </p>
              <p className="text-slate-600 leading-relaxed">
                É ganhar diagnóstico claro e decidir com informação — na Auditik, a{" "}
                <strong>avaliação auditiva gratuita</strong> é presencial, humana e sem
                pressão para comprar.
              </p>
            </div>
          </div>
        </section>

        {/* CTA intermediário */}
        <section className="py-16 bg-auditik-blue text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src={CTA_BACKGROUND}
              alt="Avaliação auditiva gratuita Auditik Piracicaba"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="container-wide relative z-10 text-center max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              Não espere o isolamento decidir por você
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Agende uma <strong>avaliação auditiva gratuita</strong> em Piracicaba.
              Saia com clareza sobre sua audição, se precisa de aparelho auditivo e qual
              o próximo passo — sem pressão.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("sinais_cta_intermediario_contato", {
                    section: "cta_intermediario",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex min-h-11 items-center justify-center bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-3 px-8 rounded-full transition-colors"
              >
                Agendar avaliação gratuita
              </Link>
              <WhatsAppLeadButton
                buttonName="sinais_cta_intermediario_whatsapp"
                leadSource="Website Como Saber Se Precisa CTA Intermediário"
                trackingParams={{
                  section: "cta_intermediario",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, quero saber se preciso de aparelho auditivo e gostaria de agendar avaliação gratuita."
                className="inline-flex min-h-11 items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full border border-white/30 transition-colors"
              >
                Falar com especialista
              </WhatsAppLeadButton>
            </div>
          </div>
        </section>

        {/* Avaliação Auditik */}
        <section className="py-20 bg-white" id="avaliacao">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                  Como a Auditik confirma se você precisa de aparelho auditivo
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  Você não precisa chegar com certeza — muitas pessoas vêm apenas com a
                  dúvida. Nosso papel é orientar com respeito e clareza, em linguagem
                  acessível.
                </p>
                <div className="space-y-6">
                  {clinicSteps.map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-auditik-blue text-white font-bold">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-4xl overflow-hidden shadow-xl border-8 border-white">
                <Image
                  src={CLINIC_IMAGE}
                  alt="Sala de atendimento Auditik em Piracicaba para avaliação auditiva"
                  width={800}
                  height={600}
                  className="w-full h-[320px] md:h-[420px] object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Philips */}
        <section className="py-20 bg-bg-light-blue" id="philips">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Se a avaliação indicar aparelho: Philips HearLink na Auditik
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Quando o exame mostra benefício com amplificação, a escolha do modelo
                importa tanto quanto a tecnologia. Como{" "}
                <strong>distribuidor autorizado Philips Hearing Solutions</strong>, o
                formato — retroauricular, recarregável, discreto no canal — é definido{" "}
                <strong>junto com você</strong>, não por catálogo genérico.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
              {philipsFeatures.map((item) => (
                <article
                  key={item.title}
                  className="bg-white rounded-4xl p-8 border border-blue-50 shadow-sm text-center"
                >
                  <span className="material-symbols-outlined text-4xl text-auditik-blue mb-4">
                    {item.icon}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{item.text}</p>
                </article>
              ))}
            </div>
            <p className="text-center text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Para comparar modelos e acessórios, veja a{" "}
              <Link
                href={APP_ROUTES.aparelhos}
                onClick={() =>
                  trackButtonClick("sinais_link_pilar_philips", {
                    section: "philips",
                    page: PAGE_TRACKING,
                  })
                }
                className="text-auditik-blue font-bold hover:underline"
              >
                linha completa de aparelhos auditivos Philips HearLink
              </Link>{" "}
              ou o guia{" "}
              <Link
                href={SUBS_APARELHOS_ROUTES.philipsHearingSolutions}
                onClick={() =>
                  trackButtonClick("sinais_link_philips_guia", {
                    section: "philips",
                    page: PAGE_TRACKING,
                  })
                }
                className="text-auditik-blue font-bold hover:underline"
              >
                aparelhos auditivos Philips Hearing Solutions
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Familiar */}
        <section className="py-20 bg-white" id="familiar">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="material-symbols-outlined text-5xl text-auditik-blue mb-4">
              family_restroom
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Pesquisando por um pai, mãe ou familiar?
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Muitas famílias chegam aqui antes do ente querido admitir a dificuldade.
              Temos um guia dedicado com sinais para cuidadores, presbiacusia e modelos
              com manuseio facilitado.
            </p>
            <Link
              href={SUBS_APARELHOS_ROUTES.idosos}
              onClick={() =>
                trackButtonClick("sinais_link_idosos_corpo", {
                  section: "familiar",
                  page: PAGE_TRACKING,
                })
              }
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-auditik-blue text-white font-bold rounded-full hover:bg-blue-700 transition-colors"
            >
              <span className="material-symbols-outlined">elderly</span>
              Aparelho auditivo para idosos
            </Link>
          </div>
        </section>

        {/* Links silo */}
        <section className="py-20 bg-bg-light-blue" id="mais-informacoes">
          <div className="container-wide max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Mais informações sobre Aparelhos Auditivos
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Explore guias sobre investimento, tecnologia, formatos e atendimento em
              Piracicaba. Para visão geral da linha Philips HearLink, volte à página
              pilar.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mb-8">
              {siloLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() =>
                    trackButtonClick(link.tracking, {
                      section: "mais-informacoes",
                      page: PAGE_TRACKING,
                    })
                  }
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
                >
                  <span className="material-symbols-outlined">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href={APP_ROUTES.aparelhos}
              onClick={() =>
                trackButtonClick("sinais_link_pilar_silo", {
                  section: "mais-informacoes",
                  page: PAGE_TRACKING,
                })
              }
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-auditik-blue text-white font-bold rounded-full hover:bg-blue-700 transition-colors"
            >
              <span className="material-symbols-outlined">hearing</span>
              Ver todos os aparelhos auditivos
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-white" id="faq">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-10 text-center">
              Dúvidas frequentes: como saber se precisa de aparelho auditivo
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

        {/* CTA final */}
        <section className="py-24 bg-auditik-blue text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src={CTA_BACKGROUND}
              alt="Agendar avaliação auditiva gratuita Auditik Piracicaba"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="container-wide relative z-10 text-center max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Não espere o isolamento decidir por você — agende sua avaliação auditiva
              gratuita
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed">
              Na <strong>Auditik</strong>, em <strong>Piracicaba</strong>, você encontra
              acolhimento profissional, diagnóstico claro e, quando indicado,{" "}
              <strong>Philips HearLink</strong> com acompanhamento contínuo. O primeiro
              passo é simples: marcar uma avaliação sem compromisso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("sinais_final_cta_contato", {
                    section: "final_cta",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-3 px-6 sm:px-8 rounded-full transition-colors"
              >
                Agendar minha avaliação
              </Link>
              <WhatsAppLeadButton
                buttonName="sinais_final_cta_whatsapp"
                leadSource="Website Como Saber Se Precisa"
                trackingParams={{
                  section: "final_cta",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, quero agendar avaliação auditiva gratuita para saber se preciso de aparelho auditivo."
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
