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

const PAGE_TRACKING = "subs-aparelhos/philips-hearing-solutions";

const HERO_IMAGE =
  "/images/philips/optimized/background/Philips_HearLink50_miniRITE_H1-2024_C116DarkBeige_AngleB45_Close-up_In-On-Ear_MS-6160_Woman_1200x800px.jpg";

const CTA_BACKGROUND =
  "/images/philips/optimized/background/Philips_HearLink50_miniRITE_H1-2024_C116DarkBeige_AngleB45_Close-up_In-On-Ear_MS-6136_Man_1200x800px.jpg";

const CLINIC_IMAGE = "/images/auditik/background/sala_atendimento.webp";

const IMAGE_HEARLINK50 =
  "/images/philips/optimized/aasi/Philips_HearLink50_miniRITE_H1-2024_Left_C090Beige_LEDgreen_Speaker60_OpenBassDome_1200x1200px_Original file.webp";

const IMAGE_MINIRITE_PRO =
  "/images/philips/optimized/aasi/Philips_HearLink_Pro_miniRITE_T_Speaker60_OpenBassDome_BE_TP_Left_1200x1200px_Original file.webp";

const IMAGE_HEARLINK30_PRO =
  "/images/philips/optimized/aasi/Philips_HearLink30_Pro_miniRITE_T_Left_DarkGray_DarkGray_Speaker60_OpenBassDome_1200x1200px_Original file.webp";

const IMAGE_BTE_UP =
  "/images/philips/optimized/aasi/Philips_HearLink_Pro_BTE_UP_Hook_TP_BE_Left_1200x1200px_Original file.webp";

const IMAGE_IIC =
  "/images/philips/optimized/aasi/Philips_HearLink_Pro_IIC_Left_MediumBrownShell_MediumBrownFaceplate_Bat10_Front_1200x1200px_Original file.webp";

const IMAGE_APP =
  "/images/philips/optimized/acessories/Philips_HearLink_202_App_General_unmerged_Bezel_iPhone_15_Plus_1290x2796px_Original20file.webp";

const IMAGE_TV_ADAPTER =
  "/images/philips/optimized/acessories/Philips_Pro_TV_Adapter_Angled_1200x1200px_Original file.webp";

const IMAGE_AUDIOCLIP =
  "/images/philips/optimized/acessories/Philips_Pro_AudioClip_Front_1200x1200px_Original file.webp";

const faqItems = [
  {
    question: "O que são aparelhos auditivos Philips Hearing Solutions?",
    answer:
      "São dispositivos da linha Philips HearLink, desenvolvidos com processamento inteligente, recursos como SpeechSensor e AutoSense, conectividade e aplicativo HearLink 2. Na Auditik, em Piracicaba, você conhece o portfólio completo com avaliação fonoaudiológica gratuita.",
  },
  {
    question: "A Auditik é distribuidor autorizado oficial da Philips?",
    answer:
      "Sim. A Auditik Soluções Auditivas é distribuidor autorizado Philips Hearing Solutions na região, com procedência nacional, garantia, programação individual, demonstração na clínica e suporte técnico contínuo.",
  },
  {
    question: "Qual a diferença entre HearLink 30, 50 e Pro?",
    answer:
      "São níveis tecnológicos da mesma linha: HearLink 30 Pro oferece entrada premium com adaptação progressiva; HearLink 50 equilibra desempenho e conectividade; HearLink Pro concentra o topo de linha (SpeechSensor, AutoSense e máximo desempenho em ruído). A indicação depende do exame auditivo e da sua rotina.",
  },
  {
    question: "O que fazem SpeechSensor e AutoSense na prática?",
    answer:
      "O SpeechSensor prioriza vozes em ambientes desafiadores, facilitando conversas e TV com diálogo. O AutoSense alterna programas conforme o ambiente muda (rua, carro, silêncio, ruído), sem ajustes manuais constantes. Ambos trabalham junto com a programação feita na Auditik.",
  },
  {
    question: "Preciso usar o aplicativo HearLink 2?",
    answer:
      "Não é obrigatório para ouvir, mas recomendamos: o app permite ajustar volume e programas, ativar streaming e, quando indicado, conectar-se ao fonoaudiólogo para ajustes remotos. Na clínica demonstramos o pareamento no seu smartphone.",
  },
  {
    question: "Os aparelhos Philips têm garantia e assistência no Brasil?",
    answer:
      "Sim, quando adquiridos por distribuidor autorizado como a Auditik. Você tem garantia nacional, suporte técnico e acompanhamento fonoaudiológico — diferente de equipamentos paralelos sem rede de assistência.",
  },
  {
    question: "A avaliação auditiva na Auditik é gratuita?",
    answer:
      "Sim, em Piracicaba e unidades da região, sem compromisso. Inclui exame, conversa sobre rotina e indicação do modelo Philips HearLink mais adequado, com possibilidade de demonstração supervisionada.",
  },
  {
    question: "Vocês atendem apenas Piracicaba?",
    answer:
      "A unidade de referência fica em Piracicaba (Rua Samuel Neves, 1800). Também atendemos Americana, São Pedro e Charqueada. Agende pelo site ou WhatsApp.",
  },
];

const trustCards = [
  {
    icon: "public",
    title: "Tradição Philips",
    text: "Mais de 130 anos de inovação em saúde; Philips Hearing Solutions com foco em conexão humana e bem-estar auditivo.",
  },
  {
    icon: "verified",
    title: "Distribuidor autorizado",
    text: "HearLink original, garantia nacional e suporte técnico na Auditik — não revenda sem procedência.",
  },
  {
    icon: "medical_services",
    title: "Cuidado clínico local",
    text: "Avaliação gratuita, programação individual e ajustes contínuos com fonoaudiólogos em Piracicaba e região.",
  },
];

const techFeatures = [
  {
    title: "SpeechSensor",
    text: "Identifica e prioriza vozes em ambientes desafiadores (restaurante, reunião, TV com diálogo). Menos esforço para completar frases; mais participação em conversas.",
  },
  {
    title: "AutoSense",
    text: "Alterna programas automaticamente conforme o ambiente muda (rua, carro, silêncio, ruído) — sem ficar trocando modo manualmente o tempo todo.",
  },
  {
    title: "HearLink 2",
    text: "App oficial: volume, programas, mudo, streaming e conexão com fonoaudiólogo para ajustes remotos quando indicado — smartphone como controle discreto.",
  },
];

const appFeatures = [
  {
    icon: "volume_up",
    title: "Volume e programas",
    text: "Ajuste de volume e troca entre ambientes sonoros com discrição no bolso.",
  },
  {
    icon: "settings_remote",
    title: "Ajuste remoto",
    text: "Conexão com fonoaudiólogo para refinamentos quando indicado na adaptação.",
  },
  {
    icon: "stream",
    title: "Streaming",
    text: "Integração com fontes compatíveis para chamadas e áudio no dia a dia.",
  },
  {
    icon: "support_agent",
    title: "Suporte Auditik",
    text: "O app complementa o acompanhamento presencial — não substitui a programação clínica.",
  },
];

const ecosystemAccessories = [
  {
    name: "Pro TV Adapter",
    image: IMAGE_TV_ADAPTER,
    alt: "Pro TV Adapter Philips para streaming de TV nos aparelhos HearLink",
    description:
      "Transmite o som da televisão diretamente para os aparelhos, com volume independente da TV.",
  },
  {
    name: "Pro AudioClip",
    image: IMAGE_AUDIOCLIP,
    alt: "Pro AudioClip Philips para chamadas e áudio sem fio",
    description:
      "Amplia conectividade quando o formato do aparelho pede ponte adicional para o smartphone.",
  },
];

const philipsProducts = [
  {
    name: "Philips HearLink 50 miniRITE",
    badge: "HearLink 50",
    image: IMAGE_HEARLINK50,
    alt: "Philips HearLink 50 miniRITE na Auditik Piracicaba",
    what: "Aparelho RITE discreto com processamento inteligente, conectividade robusta e ecossistema HearLink 2.",
    forWho:
      "Adultos ativos que buscam equilíbrio entre desempenho sonoro, discrição e uso conectado no cotidiano.",
    highlights: ["HearLink 2", "AutoSense", "Streaming"],
    ideal:
      "Quando você quer tecnologia moderna com adaptação confortável e boa relação desempenho-investimento.",
  },
  {
    name: "Philips HearLink 30 Pro miniRITE",
    badge: "Linha Pro",
    image: IMAGE_HEARLINK30_PRO,
    alt: "Philips HearLink 30 Pro miniRITE na Auditik",
    what: "Entrada premium na linha Pro com evolução confortável e recursos de processamento avançado.",
    forWho:
      "Primeiros usuários ou quem renova aparelho e deseja linha Pro com adaptação progressiva.",
    highlights: ["Linha Pro", "HearLink 2", "AutoSense"],
    ideal:
      "Quando você dá o passo certo desde o início com acompanhamento fonoaudiológico na Auditik.",
  },
  {
    name: "Philips HearLink Pro miniRITE T",
    badge: "Topo de linha",
    image: IMAGE_MINIRITE_PRO,
    alt: "Philips HearLink Pro miniRITE T na Auditik",
    what: "Topo de linha miniRITE com SpeechSensor, AutoSense e máximo desempenho em ambientes exigentes.",
    forWho:
      "Profissionais e perfis sociais ativos que priorizam clareza de fala em ruído e conectividade.",
    highlights: ["SpeechSensor", "AutoSense", "HearLink 2"],
    ideal:
      "Quando a prioridade é desempenho máximo com suporte de distribuidor autorizado em Piracicaba.",
  },
  {
    name: "Philips HearLink Pro BTE UP",
    badge: "Alta potência",
    image: IMAGE_BTE_UP,
    alt: "Philips HearLink Pro BTE UP para perdas severas na Auditik",
    what: "Formato retroauricular com reserva de potência, estabilidade e controle de feedback.",
    forWho:
      "Perdas auditivas severas a profundas que exigem maior potência e manuseio acessível.",
    highlights: ["SpeechSensor", "AutoSense", "Potência"],
    ideal:
      "Quando o exame indica necessidade de amplificação robusta sem abrir mão da linha Philips.",
  },
  {
    name: "Philips HearLink Pro IIC / CIC",
    badge: "Discrição",
    image: IMAGE_IIC,
    alt: "Philips HearLink Pro IIC discreto na Auditik",
    what: "Modelos intra-canal profundos ou compactos com processamento Pro e moldagem personalizada.",
    forWho:
      "Quem valoriza invisibilidade estética e conforto em molde sob medida.",
    highlights: ["SpeechSensor", "Discrição", "Moldagem"],
    ideal:
      "Quando discrição é prioridade — veja também nosso guia de aparelho invisível.",
    invisivelLink: true,
  },
];

const authorizedBullets = [
  {
    icon: "verified_user",
    title: "Procedência nacional",
    text: "Garantia Philips e suporte técnico — sem risco de equipamento paralelo importado sem assistência.",
  },
  {
    icon: "tune",
    title: "Programação fonoaudiológica",
    text: "O chip Philips só atinge potencial com calibração individual para seu perfil auditivo e rotina.",
  },
  {
    icon: "visibility",
    title: "Demonstração supervisionada",
    text: "Teste na clínica antes da decisão — você ouve a diferença na prática, com orientação profissional.",
  },
  {
    icon: "autorenew",
    title: "Ajustes contínuos",
    text: "Retornos de adaptação sem custo adicional de consulta de ajuste ao longo do tratamento.",
  },
  {
    icon: "smartphone",
    title: "App e acessórios oficiais",
    text: "Suporte ao HearLink 2 e orientação sobre carregadores, Pro TV Adapter e AudioClip.",
  },
  {
    icon: "location_on",
    title: "Presença em Piracicaba",
    text: "Rua Samuel Neves, 1800 — referência regional para aparelhos auditivos Philips Hearing Solutions.",
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
    text: "Audiometria, anamnese e entendimento da sua rotina — trabalho, família, lazer e expectativas com a marca Philips.",
  },
  {
    step: "3",
    title: "Indicação do modelo HearLink e demonstração",
    text: "Seleção técnica do aparelho auditivo Philips adequado ao exame, com teste supervisionado na clínica.",
  },
  {
    step: "4",
    title: "Programação, adaptação e acompanhamento",
    text: "Calibração individual, retornos de ajuste e suporte contínuo até você se sentir seguro no dia a dia.",
  },
];

export default function AparelhosAuditivosPhilipsHearingSolutionsPage() {
  const seo = getSEOMeta({
    title:
      "Aparelhos auditivos Philips Hearing Solutions | Distribuidor Auditik Piracicaba",
    description:
      "Distribuidor autorizado Philips HearLink em Piracicaba. SpeechSensor, AutoSense, app HearLink 2 e avaliação auditiva gratuita. Agende na Auditik.",
    canonical:
      "https://www.auditik.com.br/aparelhos-auditivos-philips-hearing-solutions/",
    ogImage:
      "https://www.auditik.com.br/images/philips/optimized/background/Philips_HearLink50_miniRITE_H1-2024_C116DarkBeige_AngleB45_Close-up_In-On-Ear_MS-6160_Woman_1200x800px.jpg",
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
        name: "Aparelhos auditivos Philips Hearing Solutions",
        item: "https://www.auditik.com.br/aparelhos-auditivos-philips-hearing-solutions/",
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
                Philips Hearing Solutions · Distribuidor autorizado · Piracicaba-SP
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.05] mb-6">
                Aparelhos auditivos{" "}
                <span className="text-auditik-blue">
                  Philips Hearing Solutions
                </span>
                : tradição global, tecnologia HearLink na Auditik
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-4">
                Quando você pesquisa{" "}
                <strong>aparelhos auditivos Philips Hearing Solutions</strong>,
                não está só escolhendo um equipamento — está buscando uma marca
                que une décadas de inovação em saúde com soluções pensadas para{" "}
                <strong>reconectar você</strong> ao que importa: conversas em
                família, trabalho, lazer e segurança no dia a dia. A{" "}
                <strong>Auditik Soluções Auditivas</strong>, em{" "}
                <strong>Piracicaba-SP</strong>, é{" "}
                <strong>distribuidor autorizado oficial</strong> da linha{" "}
                <strong>Philips HearLink</strong>, com{" "}
                <strong>SpeechSensor</strong>, <strong>AutoSense</strong>,
                aplicativo <strong>HearLink 2</strong> e acompanhamento
                fonoaudiológico humanizado — da avaliação à adaptação.
              </p>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                Conheça nossa seleção completa de{" "}
                <Link
                  href={APP_ROUTES.aparelhos}
                  onClick={() =>
                    trackButtonClick("philips_link_pilar_aparelhos", {
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
                    trackButtonClick("philips_cta_agendar", {
                      section: "hero",
                      page: PAGE_TRACKING,
                    })
                  }
                  className="cta-button-primary text-center"
                >
                  Agendar avaliação gratuita
                </Link>
                <WhatsAppLeadButton
                  buttonName="philips_cta_whatsapp"
                  leadSource="Website Philips Hearing Solutions Hero"
                  trackingParams={{
                    section: "hero",
                    page: PAGE_TRACKING,
                  }}
                  whatsappMessage="Olá Auditik, quero conhecer os aparelhos auditivos Philips Hearing Solutions e agendar uma avaliação gratuita."
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
                  alt="Aparelho auditivo Philips HearLink — Auditik distribuidor autorizado em Piracicaba"
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

        {/* História Philips */}
        <section className="py-20 bg-bg-light-blue" id="historia-philips">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                  Por que a Philips é referência em saúde auditiva no mundo
                </h2>
                <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                  <p>
                    A <strong>Philips</strong> é empresa de tecnologia de saúde
                    com mais de <strong>130 anos</strong> de história, presente
                    em diagnóstico, tratamento e cuidado — incluindo soluções
                    auditivas de alto padrão.
                  </p>
                  <p>
                    A marca pretende{" "}
                    <strong>melhorar 2,5 bilhões de vidas até 2030</strong>,
                    com inovação que vai da prevenção ao tratamento — o que
                    reforça compromisso com impacto real na qualidade de vida.
                  </p>
                  <p>
                    <strong>Philips Hearing Solutions</strong> opera sob o lema{" "}
                    <strong>“Criando conexões”</strong>: quando a audição
                    melhora, a pessoa se comunica com mais segurança, participa
                    da família e retoma autonomia social — alinhado ao propósito
                    da Auditik.
                  </p>
                  <p>
                    A divisão de aparelhos auditivos Philips é{" "}
                    <strong>gerenciada pela Demant</strong>, grupo global
                    especializado em audição — o que sustenta P&D, atualizações
                    de software e a linha de produtos <strong>HearLink</strong>.
                  </p>
                  <p>
                    No Brasil, a linha <strong>Philips HearLink</strong> oferece
                    modelos <strong>RITE, BTE e intra-auriculares</strong>, com
                    processamento <strong>alimentado por IA</strong> para
                    qualidade sonora premium.{" "}
                    <Link
                      href={APP_ROUTES.aparelhos}
                      onClick={() =>
                        trackButtonClick("philips_link_pilar_historia", {
                          section: "historia",
                          page: PAGE_TRACKING,
                        })
                      }
                      className="text-auditik-blue font-bold hover:underline"
                    >
                      Veja todos os modelos HearLink na página de aparelhos
                      auditivos
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <aside className="bg-white rounded-4xl p-8 border border-blue-50 shadow-sm">
                <span className="material-symbols-outlined text-5xl text-auditik-blue mb-4">
                  eco
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-3">
                  Sustentabilidade
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  A Philips Aparelhos Auditivos investe em materiais reciclados,
                  embalagens responsáveis e eficiência energética — inovação que
                  importa para o usuário e para o planeta.
                </p>
              </aside>
            </div>
          </div>
        </section>

        {/* IA */}
        <section className="py-20 bg-white" id="tecnologia-ia">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-12 text-center">
              Qualidade sonora premium com inteligência artificial
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="bg-bg-light-blue rounded-4xl p-8 border border-blue-50 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Filtro de ruído inteligente
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  A tecnologia analisa o ambiente em tempo real, reduz
                  interferências e prioriza sinais relevantes para melhorar
                  entendimento de fala em locais com múltiplas fontes sonoras.
                </p>
              </article>
              <article className="bg-bg-light-blue rounded-4xl p-8 border border-blue-50 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Realce de conversação
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Algoritmos avançados favorecem clareza vocal e naturalidade de
                  timbre, facilitando participação em reuniões, encontros em
                  família e ambientes com reverberação.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Tecnologias patenteadas */}
        <section className="py-20 bg-bg-light-blue" id="tecnologias-patenteadas">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">
              Tecnologias Philips HearLink que fazem diferença no dia a dia
            </h2>
            <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              Recursos exclusivos da marca que, combinados com a programação na
              Auditik, transformam a experiência com{" "}
              <strong>aparelhos auditivos Philips Hearing Solutions</strong>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {techFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-4xl p-8 border border-blue-50 text-center"
                >
                  <h3 className="text-xl font-bold text-auditik-blue mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
            <article className="bg-white rounded-4xl p-8 border border-blue-50 max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-3">
                Ecossistema conectado
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Além do processamento inteligente, a Philips oferece{" "}
                <strong>Pro TV Adapter</strong>, <strong>Pro AudioClip</strong> e
                compatibilidade com smartphones — para ampliar streaming e
                chamadas quando o modelo indicado suporta.
              </p>
              <Link
                href={SUBS_APARELHOS_ROUTES.bluetooth}
                onClick={() =>
                  trackButtonClick("philips_link_bluetooth", {
                    section: "tecnologias",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center gap-2 text-auditik-blue font-bold hover:underline"
              >
                <span className="material-symbols-outlined">bluetooth</span>
                Conectividade detalhada (Bluetooth e HearLink 2)
              </Link>
            </article>
          </div>
        </section>

        {/* Linha HearLink */}
        <section className="py-20 bg-white" id="linha-hearlink">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Aparelhos auditivos Philips HearLink: modelos que você encontra na
                clínica
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Portfólio completo com indicação técnica após avaliação — não
                existe “melhor aparelho” universal, e sim o{" "}
                <strong>adequado ao seu exame e rotina</strong>.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {philipsProducts.map((product) => (
                <article
                  key={product.name}
                  className="bg-bg-light-blue rounded-4xl overflow-hidden border border-blue-50 shadow-sm flex flex-col"
                >
                  <div className="relative h-64 bg-white">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <span className="inline-block px-3 py-1 bg-auditik-blue/10 text-auditik-blue rounded-full text-xs font-bold uppercase tracking-wider mb-3 w-fit">
                      {product.badge}
                    </span>
                    <h3 className="text-2xl font-extrabold text-auditik-blue mb-4">
                      {product.name}
                    </h3>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">
                      O que é
                    </p>
                    <p className="text-slate-700 mb-4 leading-relaxed">
                      {product.what}
                    </p>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Para quem
                    </p>
                    <p className="text-slate-700 mb-4 leading-relaxed flex-1">
                      {product.forWho}
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
                      {"invisivelLink" in product && product.invisivelLink ? (
                        <>
                          {" "}
                          <Link
                            href={SUBS_APARELHOS_ROUTES.invisivel}
                            onClick={() =>
                              trackButtonClick("philips_link_invisivel_produto", {
                                section: "linha",
                                page: PAGE_TRACKING,
                              })
                            }
                            className="text-auditik-blue font-bold hover:underline"
                          >
                            Saiba mais sobre aparelho invisível
                          </Link>
                          .
                        </>
                      ) : null}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-10 text-center text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed mb-4">
              Modelos <strong>recarregáveis</strong> Philips HearLink também
              estão disponíveis na Auditik —{" "}
              <Link
                href={SUBS_APARELHOS_ROUTES.recarregavel}
                onClick={() =>
                  trackButtonClick("philips_link_recarregavel", {
                    section: "linha",
                    page: PAGE_TRACKING,
                  })
                }
                className="text-auditik-blue font-bold hover:underline"
              >
                veja o guia de aparelho auditivo recarregável
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("philips_cta_linha_agendar", {
                    section: "linha",
                    page: PAGE_TRACKING,
                  })
                }
                className="cta-button-primary text-center"
              >
                Quero testar Philips HearLink na avaliação gratuita
              </Link>
              <WhatsAppLeadButton
                buttonName="philips_cta_linha_whatsapp"
                leadSource="Website Philips Hearing Solutions Linha"
                trackingParams={{
                  section: "linha",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, quero testar aparelhos auditivos Philips HearLink na avaliação gratuita."
                className="cta-button-secondary text-center"
              >
                Tirar dúvidas no WhatsApp
              </WhatsAppLeadButton>
            </div>
          </div>
        </section>

        {/* Ecossistema app */}
        <section className="py-20 bg-bg-light-blue" id="ecossistema">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative max-w-sm mx-auto lg:mx-0">
                <Image
                  src={IMAGE_APP}
                  alt="Aplicativo HearLink 2 Philips para aparelhos auditivos Hearing Solutions"
                  width={1290}
                  height={2796}
                  className="w-full h-auto max-h-[520px] object-contain"
                  sizes="(max-width: 1024px) 90vw, 400px"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                  Aplicativo Philips HearLink 2
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  Use o smartphone como controle remoto dos seus{" "}
                  <strong>aparelhos auditivos Philips Hearing Solutions</strong>:
                  programas, volume, mudo e streaming — com discrição no dia a
                  dia. Na demonstração na Auditik, mostramos o pareamento no seu
                  celular.
                </p>
                <ul className="space-y-4">
                  {appFeatures.map((feature) => (
                    <li key={feature.title} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-auditik-blue shrink-0 mt-0.5">
                        {feature.icon}
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">
                          {feature.title}
                        </p>
                        <p className="text-slate-600 leading-relaxed text-sm">
                          {feature.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-8 text-center">
              Acessórios oficiais do ecossistema
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {ecosystemAccessories.map((item) => (
                <article
                  key={item.name}
                  className="bg-white rounded-4xl p-8 border border-blue-50 shadow-sm text-center"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={1200}
                    height={1200}
                    className="w-full h-40 object-contain mb-4"
                    sizes="(max-width: 768px) 50vw, 400px"
                  />
                  <h4 className="text-lg font-extrabold text-slate-900 mb-2">
                    {item.name}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Distribuidor autorizado */}
        <section className="py-20 bg-white" id="distribuidor-autorizado">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-auditik-blue/10 rounded-full mb-6">
                  <span className="material-symbols-outlined text-auditik-blue text-3xl">
                    workspace_premium
                  </span>
                  <span className="text-sm font-bold text-auditik-blue uppercase tracking-wider">
                    Selo oficial
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                  Auditik: distribuidor autorizado Philips Hearing Solutions na
                  região
                </h2>
                <div className="space-y-6">
                  {authorizedBullets.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <span className="material-symbols-outlined text-3xl text-auditik-blue shrink-0">
                        {item.icon}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-slate-600 text-lg leading-relaxed">
                  Comprar <strong>aparelhos auditivos Philips Hearing Solutions</strong>{" "}
                  na Auditik é unir <strong>marca global</strong> e{" "}
                  <strong>cuidado local</strong> — o que quem está no meio do
                  funil precisa para decidir com segurança. Também atendemos quem
                  busca{" "}
                  <Link
                    href={SUBS_APARELHOS_ROUTES.piracicaba}
                    onClick={() =>
                      trackButtonClick("philips_link_piracicaba", {
                        section: "distribuidor",
                        page: PAGE_TRACKING,
                      })
                    }
                    className="text-auditik-blue font-bold hover:underline"
                  >
                    aparelhos auditivos em Piracicaba
                  </Link>{" "}
                  com a mesma equipe e estrutura.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Link
                    href={APP_ROUTES.contato}
                    onClick={() =>
                      trackButtonClick("philips_cta_distribuidor_agendar", {
                        section: "distribuidor",
                        page: PAGE_TRACKING,
                      })
                    }
                    className="cta-button-primary text-center"
                  >
                    Agendar avaliação gratuita
                  </Link>
                  <WhatsAppLeadButton
                    buttonName="philips_cta_distribuidor_whatsapp"
                    leadSource="Website Philips Hearing Solutions Distribuidor"
                    trackingParams={{
                      section: "distribuidor",
                      page: PAGE_TRACKING,
                    }}
                    whatsappMessage="Olá Auditik, quero saber sobre aparelhos auditivos Philips Hearing Solutions como distribuidor autorizado."
                    className="cta-button-secondary text-center"
                  >
                    Falar no WhatsApp
                  </WhatsAppLeadButton>
                </div>
              </div>
              <div className="relative rounded-4xl overflow-hidden shadow-xl border-8 border-bg-light-blue">
                <Image
                  src={CLINIC_IMAGE}
                  alt="Clínica Auditik em Piracicaba — distribuidor autorizado Philips Hearing Solutions"
                  width={800}
                  height={600}
                  className="w-full h-[320px] md:h-[480px] object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Processo clínico */}
        <section className="py-20 bg-bg-light-blue" id="como-funciona">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                  Como adquirir seus aparelhos auditivos Philips na Auditik (passo
                  a passo)
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
                        <p className="text-slate-600 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-4xl p-8 border border-blue-50 shadow-sm">
                <h3 className="text-2xl font-extrabold text-auditik-blue mb-4">
                  Por que não comprar só pela internet?
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Aparelhos auditivos Philips Hearing Solutions exigem{" "}
                  <strong>exame auditivo</strong>, indicação de formato e nível
                  tecnológico, <strong>programação individual</strong> e
                  acompanhamento na adaptação. Na Auditik você tem marca global com
                  processo clínico completo — da avaliação gratuita ao suporte
                  vitalício.
                </p>
                <Link
                  href={APP_ROUTES.aparelhos}
                  onClick={() =>
                    trackButtonClick("philips_link_pilar_processo", {
                      section: "processo",
                      page: PAGE_TRACKING,
                    })
                  }
                  className="text-auditik-blue font-bold hover:underline"
                >
                  Comparar toda a linha na página de aparelhos auditivos →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Links silo */}
        <section className="py-20 bg-white" id="mais-informacoes">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Continue sua pesquisa no guia Auditik
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Depois de conhecer a marca Philips, explore tópicos que ajudam na
              decisão com transparência.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <Link
                href={SUBS_APARELHOS_ROUTES.preco}
                onClick={() =>
                  trackButtonClick("philips_link_preco", {
                    section: "silo",
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
                  trackButtonClick("philips_link_financiamento", {
                    section: "silo",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-light-blue text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
              >
                <span className="material-symbols-outlined">credit_card</span>
                Financiamento
              </Link>
              <Link
                href={SUBS_APARELHOS_ROUTES.invisivel}
                onClick={() =>
                  trackButtonClick("philips_link_invisivel_silo", {
                    section: "silo",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-light-blue text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
              >
                <span className="material-symbols-outlined">visibility_off</span>
                Aparelho invisível
              </Link>
              <Link
                href={SUBS_APARELHOS_ROUTES.recarregavel}
                onClick={() =>
                  trackButtonClick("philips_link_recarregavel_silo", {
                    section: "silo",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-light-blue text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
              >
                <span className="material-symbols-outlined">
                  battery_charging_full
                </span>
                Aparelho recarregável
              </Link>
              <Link
                href={SUBS_APARELHOS_ROUTES.bluetooth}
                onClick={() =>
                  trackButtonClick("philips_link_bluetooth_silo", {
                    section: "silo",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-light-blue text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
              >
                <span className="material-symbols-outlined">bluetooth</span>
                Aparelho com Bluetooth
              </Link>
              <Link
                href={SUBS_APARELHOS_ROUTES.piracicaba}
                onClick={() =>
                  trackButtonClick("philips_link_piracicaba_silo", {
                    section: "silo",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-light-blue text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
              >
                <span className="material-symbols-outlined">location_on</span>
                Aparelhos em Piracicaba
              </Link>
              <Link
                href={SUBS_APARELHOS_ROUTES.manutencaoAjuste}
                onClick={() =>
                  trackButtonClick("philips_link_manutencao_silo", {
                    section: "silo",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-light-blue text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
              >
                <span className="material-symbols-outlined">build</span>
                Manutenção e ajuste
              </Link>
            </div>
          </div>
        </section>

        {/* CTA intermediário */}
        <section className="py-16 bg-auditik-blue text-white">
          <div className="container-wide text-center max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              Experimente a confiança Philips com quem adapta o aparelho para você
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Agende uma <strong>avaliação auditiva gratuita</strong> em
              Piracicaba e conheça, com fonoaudiólogos, os{" "}
              <strong>aparelhos auditivos Philips Hearing Solutions</strong>{" "}
              indicados para sua audição e rotina.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("philips_cta_intermediario_contato", {
                    section: "cta_intermediario",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex min-h-11 items-center justify-center bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-3 px-8 rounded-full transition-colors"
              >
                Agendar avaliação gratuita
              </Link>
              <WhatsAppLeadButton
                buttonName="philips_cta_intermediario_whatsapp"
                leadSource="Website Philips Hearing Solutions CTA Intermediário"
                trackingParams={{
                  section: "cta_intermediario",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, gostaria de agendar avaliação gratuita para aparelhos auditivos Philips Hearing Solutions."
                className="inline-flex min-h-11 items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full border border-white/30 transition-colors"
              >
                Falar com especialista
              </WhatsAppLeadButton>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-white">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-10 text-center">
              Dúvidas frequentes sobre aparelhos auditivos Philips Hearing
              Solutions
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
              alt="Aparelhos auditivos Philips HearLink na Auditik Piracicaba"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="container-wide relative z-10 text-center max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Agende sua avaliação auditiva gratuita e conheça os aparelhos
              auditivos Philips HearLink
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed">
              O primeiro passo não é escolher marca no escuro — é{" "}
              <strong>entender sua audição</strong> e provar, na clínica, como a
              tecnologia Philips pode melhorar sua qualidade de vida. Na{" "}
              <strong>Auditik</strong>, em <strong>Piracicaba</strong>, você
              encontra <strong>Philips Hearing Solutions</strong> original,
              <strong> HearLink 2</strong> e equipe que acompanha sua adaptação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("philips_final_cta_contato", {
                    section: "final_cta",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-3 px-6 sm:px-8 rounded-full transition-colors"
              >
                Agendar minha avaliação
              </Link>
              <WhatsAppLeadButton
                buttonName="philips_final_cta_whatsapp"
                leadSource="Website Philips Hearing Solutions"
                trackingParams={{
                  section: "final_cta",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, quero agendar minha avaliação auditiva gratuita para aparelhos auditivos Philips Hearing Solutions."
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
