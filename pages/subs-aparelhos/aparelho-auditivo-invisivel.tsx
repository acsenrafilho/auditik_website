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

const PAGE_TRACKING = "subs-aparelhos/invisivel";

const HERO_IMAGE =
  "/images/philips/optimized/background/Philips_HearLink50_miniRITE_H1-2024_C116DarkBeige_Angle90_Close-up_In-On-Ear_MS-6152_Woman_1200x800px.jpg";

const CTA_BACKGROUND =
  "/images/philips/optimized/background/PHS_HL50_miniRITE_Portable_Charger_Lifestyle_blue_shadows_GettyImages-1530702944_MS_0255.jpg";

const CLINIC_IMAGE = "/images/auditik/background/sala_atendimento.webp";

const IMAGE_IIC =
  "/images/philips/optimized/aasi/Philips_HearLink_Pro_IIC_Left_MediumBrownShell_MediumBrownFaceplate_Bat10_Front_1200x1200px_Original file.webp";

const IMAGE_CIC =
  "/images/philips/optimized/aasi/Philips_HearLink_Pro_CIC_Right_MediumBrown_Bat10_PB_Front_1200x1200px_Original file.webp";

const faqItems = [
  {
    question: "Aparelho auditivo invisível funciona para qualquer grau de surdez?",
    answer:
      "Não. É indicado principalmente para perdas leves a moderadas e canal auditivo compatível. Perdas severas ou profundas podem exigir modelos com maior potência, como BTE UP.",
  },
  {
    question: "Qual a diferença entre IIC e CIC?",
    answer:
      "Ambos ficam no canal auditivo. O IIC é inserido mais profundamente e é o mais discreto; o CIC fica completamente no canal, um pouco menos profundo, em geral com manuseio mais acessível.",
  },
  {
    question: "Alguém consegue ver que estou usando aparelho invisível?",
    answer:
      "Na maioria dos ângulos do dia a dia, não. No formato IIC a visibilidade é mínima; no CIC, só quem olhar diretamente dentro do ouvido pode notar.",
  },
  {
    question: "É desconfortável usar algo dentro do ouvido?",
    answer:
      "Após o período de adaptação e com molde bem feito, a maioria relata conforto. Desconforto persistente deve ser avaliado pelo fonoaudiólogo na Auditik.",
  },
  {
    question: 'Aparelho barato "invisível" da internet é a mesma coisa?',
    answer:
      "Não. Dispositivos genéricos não substituem avaliação, moldagem e programação. Há risco de amplificação inadequada e abandono do tratamento.",
  },
  {
    question: "Idosos conseguem colocar e tirar um IIC?",
    answer:
      "Depende de destreza manual e visão. Muitas famílias optam por CIC ou RITE quando o manuseio é prioridade — orientamos sem julgamento na clínica.",
  },
  {
    question: "Philips HearLink Pro invisível tem garantia e assistência?",
    answer:
      "Sim. Na Auditik, distribuidor autorizado Philips, você tem procedência nacional, suporte técnico e acompanhamento clínico contínuo.",
  },
  {
    question: "Preciso de avaliação antes de saber se posso usar invisível?",
    answer:
      "Sim. A avaliação auditiva gratuita define formato, expectativa realista e demonstração dos modelos Philips HearLink.",
  },
];

const trustCards = [
  {
    icon: "visibility_off",
    title: "Discrição estética",
    text: "Formatos IIC e CIC dentro do canal — sem haste visível atrás da orelha.",
  },
  {
    icon: "hearing",
    title: "Molde personalizado",
    text: "Fabricados sob medida a partir da anatomia do seu ouvido, não tamanho único.",
  },
  {
    icon: "workspace_premium",
    title: "Distribuidor Philips",
    text: "HearLink Pro original, programação clínica e ajustes vitalícios na Auditik.",
  },
];

const vanityBullets = [
  {
    title: "Estigma social",
    text: "Conversas em família costumam normalizar o uso quando o benefício sonoro é claro — muitas vezes ninguém percebe o aparelho.",
  },
  {
    title: "Vaidade e autoestima",
    text: "Modelos IIC/CIC permitem penteados, óculos e máscaras sem “peça atrás da orelha”.",
  },
  {
    title: "Profissionalismo",
    text: "Executivos, professores e profissionais liberais buscam discrição sem abrir mão de tecnologia Philips.",
  },
  {
    title: "Primeiro aparelho",
    text: "Quem nunca usou tende a aceitar melhor um formato que “some” visualmente.",
  },
];

const formatModels = [
  {
    id: "iic",
    badge: "Máxima discrição",
    title: "IIC — Invisível no Canal",
    image: IMAGE_IIC,
    alt: "Philips HearLink Pro IIC — aparelho auditivo invisível no canal",
    bullets: [
      "Posicionamento bem profundo no canal auditivo, próximo ao tímpano.",
      "Praticamente imperceptível de frente ou de lado.",
      "Indicação típica: perdas leves a moderadas (candidatura depende do exame).",
    ],
  },
  {
    id: "cic",
    badge: "Quase invisível",
    title: "CIC — Completamente no Canal",
    image: IMAGE_CIC,
    alt: "Philips HearLink Pro CIC — aparelho auditivo completamente no canal",
    bullets: [
      "Totalmente dentro do canal, um pouco menos profundo que o IIC.",
      "Muito discreto; visível apenas se alguém olhar diretamente no ouvido.",
      "Equilíbrio entre discrição, recursos e manuseio em muitos perfis.",
    ],
  },
];

const comparisonRows = [
  {
    aspect: "Estética",
    invisible: "Máxima discrição, sem haste atrás da orelha",
    conventional: "Componente externo visível; miniaturização moderna ajuda",
  },
  {
    aspect: "Conforto",
    invisible: "Molde anatômico; sensação de encaixe no próprio ouvido",
    conventional: "Leve; alguns preferem não ter molde profundo no canal",
  },
  {
    aspect: "Naturalidade sonora",
    invisible: "Posição no canal favorece captura natural e reduz efeito de eco",
    conventional: "Excelente com dome aberto e programação Philips",
  },
  {
    aspect: "Manuseio",
    invisible: "Exige destreza para colocar, retirar e trocar bateria",
    conventional: "Geralmente mais fácil para idosos ou mãos com limitação",
  },
  {
    aspect: "Conectividade",
    invisible: "Variável conforme tamanho; Pro CIC conforme indicação clínica",
    conventional: "RITE costuma ser referência em Bluetooth e streaming",
  },
];

const candidacyOk = [
  "Perda auditiva leve a moderada confirmada em audiometria.",
  "Canal auditivo com anatomia compatível (largura e curvatura adequadas).",
  "Desejo forte de discrição estética no trabalho, social ou primeiro aparelho.",
  "Disposição para período de adaptação e retornos de ajuste na clínica.",
];

const candidacyAlert = [
  "Canal muito estreito ou curvatura acentuada.",
  "Perda auditiva severa ou profunda (pode exigir BTE UP ou maior potência).",
  "Limitação importante de destreza manual para manuseio diário.",
  "Perfuração timpânica ativa ou condição médica em avaliação — decisão com o fonoaudiólogo.",
];

const philipsProducts = [
  {
    name: "Philips HearLink Pro IIC",
    image: IMAGE_IIC,
    alt: "Philips HearLink Pro IIC — aparelho auditivo invisível na Auditik",
    what: "Aparelho invisível no canal, molde personalizado, pensado para máxima discrição.",
    forWho:
      "Adultos com perda leve a moderada que resistem ao uso por aparência e buscam tecnologia de ponta em formato intra-canal profundo.",
    highlights: ["SpeechSensor", "AutoSense", "Programação individual", "Acompanhamento vitalício"],
    ideal: "Quando a prioridade número um é que ninguém perceba que você usa aparelho.",
  },
  {
    name: "Philips HearLink Pro CIC",
    image: IMAGE_CIC,
    alt: "Philips HearLink Pro CIC — aparelho discreto completamente no canal",
    what: "Aparelho completamente no canal, discretíssimo, com equilíbrio entre tamanho e recursos.",
    forWho:
      "Quem quer aparelho quase invisível com manuseio um pouco mais acessível que o IIC extremo.",
    highlights: [
      "Clareza de fala HearLink Pro",
      "Conforto acústico",
      "Adaptação progressiva",
      "Distribuidor autorizado",
    ],
    ideal:
      "Quando você quer discrição forte, mas valoriza um pouco mais de flexibilidade técnica que o IIC mais profundo.",
  },
];

const techFeatures = [
  {
    title: "SpeechSensor",
    text: "Prioriza vozes em ambientes com ruído — fundamental em restaurantes, reuniões e família.",
  },
  {
    title: "AutoSense",
    text: "Alterna programas conforme o ambiente muda, sem ficar ajustando botão o tempo todo.",
  },
  {
    title: "Moldagem personalizada",
    text: "Impressão do canal para encaixe seguro, confortável e acústica estável.",
  },
];

const clinicSteps = [
  {
    step: "1",
    title: "Agendamento da avaliação auditiva gratuita",
    text: "Presencial em Piracicaba, Americana, São Pedro ou Charqueada; ou contato inicial pelo WhatsApp.",
  },
  {
    step: "2",
    title: "Exame e conversa clínica",
    text: "Audiometria, anamnese e entendimento da sua rotina — trabalho, lazer e limitações de manuseio.",
  },
  {
    step: "3",
    title: "Indicação de formato",
    text: "IIC, CIC ou outro modelo Philips HearLink se o canal ou grau auditivo exigir.",
  },
  {
    step: "4",
    title: "Molde, demonstração e adaptação",
    text: "Programação individual, retornos de ajuste e suporte contínuo sem custo adicional de consulta de ajuste.",
  },
];

export default function AparelhoAuditivoInvisivelPage() {
  const seo = getSEOMeta({
    title: "Aparelho auditivo invisível | Philips HearLink discreto na Auditik",
    description:
      "Aparelho auditivo invisível IIC e CIC Philips HearLink na Auditik, Piracicaba. Discrição, conforto e avaliação gratuita. Agende com fonoaudiólogos.",
    canonical: "https://www.auditik.com.br/aparelho-auditivo-invisivel/",
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
        name: "Aparelho auditivo invisível",
        item: "https://www.auditik.com.br/aparelho-auditivo-invisivel/",
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
                Discrição máxima · Philips HearLink Pro · Avaliação gratuita
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.05] mb-6">
                Aparelho auditivo invisível:{" "}
                <span className="text-auditik-blue">ouça melhor</span> sem abrir mão
                da discrição
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-4">
                Muitas pessoas adiam o tratamento da perda auditiva não por falta de
                necessidade, mas por <strong>medo do estigma</strong> ou pela{" "}
                <strong>vaidade</strong> — a sensação de que um aparelho “vai aparecer”
                e mudar a imagem que projetam no trabalho, na família ou no espelho. Na{" "}
                <strong>Auditik Soluções Auditivas</strong>, em{" "}
                <strong>Piracicaba-SP</strong>, distribuidor autorizado{" "}
                <strong>Philips Hearing Solutions</strong>, oferecemos{" "}
                <strong>aparelhos auditivos invisíveis</strong> (formatos{" "}
                <strong>IIC</strong> e <strong>CIC</strong>) moldados sob medida para o
                seu ouvido: discretos quase à totalidade, confortáveis e com a tecnologia{" "}
                <strong>HearLink Pro</strong> para uma escuta mais natural no dia a dia.
              </p>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                Conheça nossa seleção completa de{" "}
                <Link
                  href={APP_ROUTES.aparelhos}
                  onClick={() =>
                    trackButtonClick("invisivel_link_pilar_aparelhos", {
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
                    trackButtonClick("invisivel_cta_agendar", {
                      section: "hero",
                      page: PAGE_TRACKING,
                    })
                  }
                  className="cta-button-primary text-center"
                >
                  Agendar avaliação gratuita
                </Link>
                <WhatsAppLeadButton
                  buttonName="invisivel_cta_whatsapp"
                  leadSource="Website Aparelho Invisivel Hero"
                  trackingParams={{
                    section: "hero",
                    page: PAGE_TRACKING,
                  }}
                  whatsappMessage="Olá Auditik, quero saber sobre aparelho auditivo invisível e agendar uma avaliação gratuita."
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
                  alt="Aparelho auditivo discreto Philips HearLink em uso — Auditik Piracicaba"
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
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-slate-600">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vaidade e estigma */}
        <section className="py-20 bg-bg-light-blue">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Por que a discrição importa (e não deveria adiar o cuidado)
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Adiar a avaliação por vergonha é compreensível — e mais comum do que se
                imagina. O problema é que a <strong>perda auditiva não tratada</strong>{" "}
                afeta memória, convívio social e segurança (não ouvir o interfone, o carro
                na rua, perguntas dos netos). O{" "}
                <strong>aparelho auditivo invisível</strong> existe para quem quer{" "}
                <strong>resultado clínico</strong> com{" "}
                <strong>mínima exposição visual</strong>: o dispositivo fica dentro do
                canal auditivo, com cor e formato personalizados na impressão do molde.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {vanityBullets.map((item) => (
                <article
                  key={item.title}
                  className="bg-white rounded-4xl p-8 border border-blue-50 shadow-sm"
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

        {/* IIC vs CIC */}
        <section className="py-20 bg-white" id="formatos-iic-cic">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                O que são aparelhos auditivos invisíveis (IIC e CIC)
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Os chamados <strong>micro-canais</strong> ou{" "}
                <strong>completamente no canal</strong> são aparelhos{" "}
                <strong>sob medida</strong>, fabricados a partir da anatomia do{" "}
                <strong>seu</strong> ouvido — não são “tamanho único” de prateleira.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {formatModels.map((model) => (
                <article
                  key={model.id}
                  className="bg-bg-light-blue rounded-4xl overflow-hidden border border-blue-50"
                >
                  <div className="relative aspect-square max-h-[320px] mx-auto p-8">
                    <Image
                      src={model.image}
                      alt={model.alt}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-8 pt-0">
                    <span className="inline-block px-3 py-1 bg-auditik-blue/10 text-auditik-blue rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                      {model.badge}
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-4">
                      {model.title}
                    </h3>
                    <ul className="space-y-3">
                      {model.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 text-slate-600"
                        >
                          <span className="material-symbols-outlined text-auditik-blue shrink-0 text-xl mt-0.5">
                            check_circle
                          </span>
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-10 text-center text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
              <strong>Importante:</strong> nem todo ouvido comporta IIC ou CIC. Canal
              estreito, curvatura acentuada ou perda <strong>severa/profunda</strong>{" "}
              podem indicar modelos <strong>RITE</strong> ou <strong>BTE</strong> — também
              discretos, porém com componente atrás da orelha. Na Auditik, a escolha é{" "}
              <strong>clínica</strong>, nunca apenas estética.
            </p>
          </div>
        </section>

        {/* Comparativo */}
        <section className="py-20 bg-bg-light-blue">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Benefícios do aparelho invisível em relação aos modelos convencionais
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Compare de forma honesta o que muda na experiência — além da aparência.
              </p>
            </div>
            <div className="overflow-x-auto rounded-4xl border border-blue-50 bg-white shadow-sm">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="bg-auditik-blue text-white">
                    <th className="p-4 md:p-6 font-bold">Aspecto</th>
                    <th className="p-4 md:p-6 font-bold">Invisível (IIC/CIC)</th>
                    <th className="p-4 md:p-6 font-bold">Convencional (RITE/BTE)</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, index) => (
                    <tr
                      key={row.aspect}
                      className={index % 2 === 0 ? "bg-white" : "bg-bg-light-blue/50"}
                    >
                      <td className="p-4 md:p-6 font-bold text-slate-900">
                        {row.aspect}
                      </td>
                      <td className="p-4 md:p-6 text-slate-600 leading-relaxed">
                        {row.invisible}
                      </td>
                      <td className="p-4 md:p-6 text-slate-600 leading-relaxed">
                        {row.conventional}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-10 text-center text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
              O <strong>aparelho auditivo invisível</strong> não é “melhor” em absoluto —
              é <strong>melhor para quem precisa de discrição</strong> e tem perfil
              auditivo e anatômico compatível. O ganho real vem da{" "}
              <strong>programação individual</strong> e do acompanhamento
              fonoaudiológico, não só do tamanho.
            </p>
          </div>
        </section>

        {/* Candidatura */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                  Quem é candidato ao aparelho auditivo invisível?
                </h2>
                <ul className="space-y-4 mb-8">
                  {candidacyOk.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-700">
                      <span className="material-symbols-outlined text-auditik-blue shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={APP_ROUTES.contato}
                  onClick={() =>
                    trackButtonClick("invisivel_cta_candidatura", {
                      section: "candidatura",
                      page: PAGE_TRACKING,
                    })
                  }
                  className="cta-button-primary inline-flex"
                >
                  Verificar minha candidatura na avaliação
                </Link>
              </div>
              <div className="bg-amber-50 rounded-4xl p-8 border border-amber-100">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-200/60 text-amber-900 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  <span className="material-symbols-outlined text-base">info</span>
                  Atenção
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Quando o invisível pode não ser a melhor opção
                </h3>
                <ul className="space-y-4">
                  {candidacyAlert.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-700">
                      <span className="material-symbols-outlined text-amber-600 shrink-0 mt-0.5">
                        warning
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Philips produtos */}
        <section className="py-20 bg-bg-light-blue" id="philips-invisivel">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Soluções Philips HearLink invisíveis na Auditik
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Na Auditik você não testa “um aparelho genérico pequeno”: trabalhamos com{" "}
                <strong>Philips HearLink Pro</strong>, linha premium com processamento
                inteligente e suporte de distribuidor autorizado em Piracicaba e região.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {philipsProducts.map((product) => (
                <article
                  key={product.name}
                  className="bg-white rounded-4xl overflow-hidden border border-blue-50 shadow-sm flex flex-col"
                >
                  <div className="relative h-64 bg-bg-light-blue">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-2xl font-extrabold text-auditik-blue mb-4">
                      {product.name}
                    </h3>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">
                      O que é
                    </p>
                    <p className="text-slate-700 mb-4 leading-relaxed">{product.what}</p>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Para quem
                    </p>
                    <p className="text-slate-700 mb-4 leading-relaxed flex-1">
                      {product.forWho}
                    </p>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Destaques
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.highlights.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-auditik-blue/10 text-auditik-blue text-sm font-semibold rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-slate-600 leading-relaxed border-t border-blue-50 pt-4">
                      <strong>Ideal quando:</strong> {product.ideal}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-10 text-center text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
              Somos <strong>distribuidor autorizado Philips Hearing Solutions</strong>:
              procedência nacional, garantia, programação, demonstração supervisionada e{" "}
              <strong>ajustes sem custo adicional de consulta de ajuste</strong> ao longo
              do tratamento. O aparelho invisível certo é o que o exame mostra — na
              consulta você <strong>vê e ouve</strong> a diferença antes de decidir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("invisivel_cta_philips_agendar", {
                    section: "philips",
                    page: PAGE_TRACKING,
                  })
                }
                className="cta-button-primary text-center"
              >
                Quero testar modelos discretos na avaliação gratuita
              </Link>
              <WhatsAppLeadButton
                buttonName="invisivel_cta_philips_whatsapp"
                leadSource="Website Aparelho Invisivel Philips"
                trackingParams={{
                  section: "philips",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, quero conhecer os aparelhos Philips HearLink Pro IIC e CIC na avaliação gratuita."
                className="cta-button-secondary text-center"
              >
                Tirar dúvidas no WhatsApp
              </WhatsAppLeadButton>
            </div>
          </div>
        </section>

        {/* Tecnologia */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">
              Tecnologia que sustenta a experiência (além do tamanho)
            </h2>
            <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              Discrição sem processamento inteligente não entrega o resultado que você
              merece. A linha HearLink Pro combina miniaturização com recursos de ponta.
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
            <div className="bg-bg-light-blue rounded-4xl p-8 border border-blue-50 max-w-3xl mx-auto text-center">
              <p className="text-slate-600 text-lg leading-relaxed mb-2">
                <strong>Acompanhamento Auditik:</strong> adaptação progressiva, orientação
                familiar e reavaliações quando a audição ou rotina mudam.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                Para comparar <strong>todos os formatos</strong> (RITE, BTE,
                intra-auricular), veja nossa{" "}
                <Link
                  href={APP_ROUTES.aparelhos}
                  onClick={() =>
                    trackButtonClick("invisivel_link_pilar_tecnologia", {
                      section: "tecnologia",
                      page: PAGE_TRACKING,
                    })
                  }
                  className="text-auditik-blue font-bold hover:underline"
                >
                  linha completa de aparelhos auditivos Philips HearLink
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Processo clínico */}
        <section className="py-20 bg-bg-light-blue">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                  Como funciona na prática na clínica Auditik (Piracicaba)
                </h2>
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
                  alt="Sala de atendimento Auditik em Piracicaba para avaliação de aparelho auditivo invisível"
                  width={800}
                  height={600}
                  className="w-full h-[320px] md:h-[420px] object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Links silo */}
        <section className="py-20 bg-white">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Investimento e formas de pagamento
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              O <strong>aparelho auditivo invisível</strong> é um investimento em saúde e
              qualidade de vida — o valor depende do nível tecnológico HearLink Pro e dos
              serviços clínicos inclusos. Transparência na clínica, sem “preço surpresa”
              no site.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center text-left sm:text-center">
              <Link
                href={SUBS_APARELHOS_ROUTES.preco}
                onClick={() =>
                  trackButtonClick("invisivel_link_preco", {
                    section: "investimento",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-light-blue text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
              >
                <span className="material-symbols-outlined">payments</span>
                Preço de aparelho auditivo
              </Link>
              <Link
                href={SUBS_APARELHOS_ROUTES.financiamento}
                onClick={() =>
                  trackButtonClick("invisivel_link_financiamento", {
                    section: "investimento",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-light-blue text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
              >
                <span className="material-symbols-outlined">credit_card</span>
                Financiamento (21x e Crédito BB)
              </Link>
              <Link
                href={SUBS_APARELHOS_ROUTES.piracicaba}
                onClick={() =>
                  trackButtonClick("invisivel_link_piracicaba", {
                    section: "investimento",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-light-blue text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
              >
                <span className="material-symbols-outlined">location_on</span>
                Aparelhos em Piracicaba
              </Link>
              <Link
                href={SUBS_APARELHOS_ROUTES.recarregavel}
                onClick={() =>
                  trackButtonClick("invisivel_link_recarregavel", {
                    section: "investimento",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-light-blue text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
              >
                <span className="material-symbols-outlined">battery_charging_full</span>
                Aparelho recarregável
              </Link>
              <Link
                href={SUBS_APARELHOS_ROUTES.idosos}
                onClick={() =>
                  trackButtonClick("invisivel_link_idosos", {
                    section: "investimento",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-light-blue text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
              >
                <span className="material-symbols-outlined">elderly</span>
                Aparelho para idosos
              </Link>
              <Link
                href={SUBS_APARELHOS_ROUTES.bluetooth}
                onClick={() =>
                  trackButtonClick("invisivel_link_bluetooth", {
                    section: "investimento",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-light-blue text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
              >
                <span className="material-symbols-outlined">bluetooth</span>
                Aparelho com Bluetooth
              </Link>
            </div>
          </div>
        </section>

        {/* CTA intermediário */}
        <section className="py-16 bg-auditik-blue text-white">
          <div className="container-wide text-center max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              Sua vaidade importa — e sua audição também
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Agende uma <strong>avaliação auditiva gratuita</strong> em Piracicaba e
              descubra, com fonoaudiólogos, se o <strong>aparelho auditivo invisível</strong>{" "}
              Philips HearLink Pro IIC ou CIC é o caminho certo para você.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("invisivel_cta_intermediario_contato", {
                    section: "cta_intermediario",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex min-h-11 items-center justify-center bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-3 px-8 rounded-full transition-colors"
              >
                Agendar avaliação gratuita
              </Link>
              <WhatsAppLeadButton
                buttonName="invisivel_cta_intermediario_whatsapp"
                leadSource="Website Aparelho Invisivel CTA Intermediário"
                trackingParams={{
                  section: "cta_intermediario",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, gostaria de agendar uma avaliação gratuita para aparelho auditivo invisível."
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
              Dúvidas frequentes sobre aparelho auditivo invisível
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
              alt="Philips HearLink — aparelho auditivo invisível na Auditik Piracicaba"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="container-wide relative z-10 text-center max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Agende sua avaliação auditiva gratuita e descubra se o aparelho invisível é
              para você
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed">
              O primeiro passo não é escolher o menor aparelho no catálogo — é{" "}
              <strong>entender sua audição</strong> com quem vive reabilitação auditiva
              todos os dias. Na <strong>Auditik</strong>, em <strong>Piracicaba</strong>,
              você encontra <strong>Philips HearLink Pro</strong> em formatos{" "}
              <strong>IIC e CIC</strong>, avaliação <strong>sem compromisso</strong> e
              equipe que respeita sua <strong>vaidade</strong> sem abrir mão da{" "}
              <strong>saúde auditiva</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("invisivel_final_cta_contato", {
                    section: "final_cta",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-3 px-6 sm:px-8 rounded-full transition-colors"
              >
                Agendar minha avaliação
              </Link>
              <WhatsAppLeadButton
                buttonName="invisivel_final_cta_whatsapp"
                leadSource="Website Aparelho Invisivel"
                trackingParams={{
                  section: "final_cta",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, quero agendar minha avaliação auditiva gratuita para aparelho auditivo invisível."
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
