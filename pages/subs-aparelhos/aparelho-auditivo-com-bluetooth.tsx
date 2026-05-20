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

const PAGE_TRACKING = "subs-aparelhos/bluetooth";

const HERO_IMAGE =
  "/images/philips/optimized/background/PHS_HL50_miniRITE_Lifestyle_iPhone14_MS_0059_AS_485092853.jpg";

const CTA_BACKGROUND =
  "/images/philips/optimized/background/Philips_HearLink50_miniRITE_H1-2024_C116DarkBeige_AngleB45_Close-up_In-On-Ear_MS-6160_Woman_1200x800px.jpg";

const CLINIC_IMAGE = "/images/auditik/background/sala_atendimento.webp";

const IMAGE_HEARLINK50 =
  "/images/philips/optimized/aasi/Philips_HearLink50_miniRITE_H1-2024_Left_C090Beige_LEDgreen_Speaker60_OpenBassDome_1200x1200px_Original file.webp";

const IMAGE_MINIRITE_PRO =
  "/images/philips/optimized/aasi/Philips_HearLink_Pro_miniRITE_T_Speaker60_OpenBassDome_BE_TP_Left_1200x1200px_Original file.webp";

const IMAGE_HEARLINK30_PRO =
  "/images/philips/optimized/aasi/Philips_HearLink30_Pro_miniRITE_T_Left_DarkGray_DarkGray_Speaker60_OpenBassDome_1200x1200px_Original file.webp";

const IMAGE_TV_ADAPTER =
  "/images/philips/optimized/acessories/Philips_Pro_TV_Adapter_Angled_1200x1200px_Original file.webp";

const IMAGE_AUDIOCLIP =
  "/images/philips/optimized/acessories/Philips_Pro_AudioClip_Front_1200x1200px_Original file.webp";

const IMAGE_REMOTE =
  "/images/philips/optimized/acessories/Philips_Pro_Remote_Control_Front_1200x1200px_Original file.webp";

const IMAGE_APP =
  "/images/philips/optimized/acessories/Philips_HearLink_202_App_General_unmerged_Bezel_iPhone_15_Plus_1290x2796px_Original20file.webp";

const IMAGE_APP_ALT =
  "/images/philips/optimized/acessories/Philips_HearLink_2_App_23.webp";

const faqItems = [
  {
    question: "O que é um aparelho auditivo com Bluetooth?",
    answer:
      "É um aparelho auditivo que, além de amplificar sons do ambiente, transmite áudio de fontes compatíveis — como smartphone, acessórios Philips e TV via Pro TV Adapter — diretamente para os dois ouvidos, com processamento personalizado.",
  },
  {
    question: "Todo aparelho Philips HearLink tem Bluetooth?",
    answer:
      "A linha HearLink oferece conectividade em diversos formatos. Modelos intra muito discretos (IIC/CIC) podem ter limitações de espaço; a avaliação gratuita na Auditik define o modelo e acessórios ideais.",
  },
  {
    question: "Funciona com iPhone e Android?",
    answer:
      "Sim. iOS e Android possuem fluxos de pareamento em Acessibilidade ou Dispositivos conectados para aparelhos auditivos compatíveis. Na clínica demonstramos o vínculo com o seu celular.",
  },
  {
    question: "Posso ouvir TV sem aumentar o volume para todos?",
    answer:
      "Sim. Com o Pro TV Adapter Philips, o som da televisão é transmitido em streaming para os aparelhos HearLink, com volume independente da TV.",
  },
  {
    question: "Dá para atender chamadas e ouvir música?",
    answer:
      "Sim, conforme modelo e sistema operacional. A qualidade depende da programação fonoaudiológica e do perfil auditivo — por isso testamos na avaliação.",
  },
  {
    question: "O Bluetooth gasta mais bateria?",
    answer:
      "Streaming aumenta o consumo de energia. Em modelos recarregáveis, recomendamos carga noturna; orientamos expectativa realista de autonomia na consulta.",
  },
  {
    question: "Preciso do aplicativo HearLink 2?",
    answer:
      "Não é obrigatório para ouvir, mas facilita volume, programas e ajustes no dia a dia. Recomendamos instalar e parear na demonstração na Auditik.",
  },
  {
    question: "A avaliação na Auditik é gratuita?",
    answer:
      "Sim, em Piracicaba, sem compromisso, para indicar aparelho auditivo com Bluetooth, app HearLink 2 e acessórios Philips compatíveis com sua rotina.",
  },
];

const trustCards = [
  {
    icon: "groups",
    title: "Reinserção ativa",
    text: "Trabalho, lazer e redes sociais com chamadas, música e TV mais claras — sem depender só do alto-falante do celular.",
  },
  {
    icon: "workspace_premium",
    title: "Distribuidor Philips",
    text: "HearLink original, HearLink 2, Pro TV Adapter e AudioClip com acompanhamento fonoaudiológico na Auditik.",
  },
  {
    icon: "smartphone",
    title: "Ecossistema completo",
    text: "App oficial + acessórios de conectividade para ampliar streaming quando o formato do aparelho exige.",
  },
];

const lifestyleCards = [
  {
    icon: "work",
    title: "Trabalho",
    text: "Reuniões presenciais e online com menos cansaço para entender colegas e clientes.",
  },
  {
    icon: "headphones",
    title: "Lazer",
    text: "Músicas, podcasts e vídeos com volume confortável, sem fones genéricos por cima do aparelho.",
  },
  {
    icon: "forum",
    title: "Redes e família",
    text: "Chamadas de voz e vídeo no smartphone com voz mais inteligível para quem liga e para quem escuta.",
  },
  {
    icon: "tv",
    title: "TV em casa",
    text: "Som da televisão nos aparelhos, em volume próprio, sem briga de volume com a família.",
  },
];

const benefitCards = [
  {
    icon: "call",
    title: "Chamadas telefônicas mais claras",
    text: "Voz do interlocutor nos dois aparelhos, mãos livres, menos esforço para completar frases em ambientes com ruído moderado.",
  },
  {
    icon: "music_note",
    title: "Música e áudio com conforto",
    text: "Streaming direto quando o modelo suporta — sem remover o aparelho para colocar fones.",
  },
  {
    icon: "videocam",
    title: "Trabalho e videochamadas",
    text: "Zoom, Teams, Meet e apps de mensagem: áudio roteado para os aparelhos melhora foco em reuniões híbridas.",
  },
  {
    icon: "live_tv",
    title: "TV e entretenimento",
    text: "Com Pro TV Adapter, filme e programa com legibilidade de fala; família mantém volume confortável na sala.",
  },
];

const appFeatures = [
  {
    icon: "volume_up",
    title: "Volume e programas",
    text: "Ajuste de volume e troca entre ambientes sonoros (rua, conversa, ruído).",
  },
  {
    icon: "tune",
    title: "Perfis rápidos",
    text: "Alternância entre perfis conforme o momento do dia — casa, trabalho ou passeio.",
  },
  {
    icon: "battery_horiz_075",
    title: "Nível de bateria",
    text: "Indicação de carga em modelos compatíveis, útil com uso de streaming.",
  },
  {
    icon: "location_searching",
    title: "Localizar aparelhos",
    text: "Encontre os aparelhos quando esquecidos em casa — tranquilidade para o dia a dia.",
  },
  {
    icon: "support_agent",
    title: "Ajustes complementares",
    text: "Recursos que complementam o acompanhamento fonoaudiológico na Auditik.",
  },
  {
    icon: "devices",
    title: "Linha HearLink integrada",
    text: "Mesmo ecossistema da página de aparelhos auditivos Philips na Auditik.",
  },
];

const connectivityAccessories = [
  {
    name: "Pro TV Adapter",
    image: IMAGE_TV_ADAPTER,
    alt: "Pro TV Adapter Philips para streaming de TV no aparelho auditivo",
    description:
      "Transmissão direta da TV para os aparelhos HearLink, com escuta mais clara e confortável. Instalação orientada na clínica.",
  },
  {
    name: "Pro AudioClip",
    image: IMAGE_AUDIOCLIP,
    alt: "Pro AudioClip Philips para chamadas e áudio sem fio no aparelho auditivo",
    description:
      "Acessório para chamadas e áudio sem fio, ampliando possibilidades quando o formato do aparelho pede ponte adicional — útil em deslocamentos.",
  },
  {
    name: "Pro Remote Control",
    image: IMAGE_REMOTE,
    alt: "Pro Remote Control Philips para ajuste de volume e programa",
    description:
      "Controle remoto dedicado para ajustes rápidos de programa e volume — prático para quem prefere botões além do app.",
  },
  {
    name: "HearLink 2 App",
    image: IMAGE_APP_ALT,
    alt: "Aplicativo HearLink 2 Philips para iOS e Android",
    description:
      "Interface completa no smartphone para personalizar experiência sonora, volume e programas no dia a dia.",
  },
];

const philipsProducts = [
  {
    name: "Philips HearLink 50 miniRITE",
    badge: "Bluetooth",
    image: IMAGE_HEARLINK50,
    alt: "Philips HearLink 50 miniRITE com Bluetooth na Auditik",
    what: "Aparelho RITE discreto com conectividade para celular, app HearLink 2 e ecossistema de acessórios.",
    forWho:
      "Adultos ativos que querem reinserção no trabalho, lazer e chamadas com tecnologia acessível.",
    highlights: ["HearLink 2", "Streaming", "Pro TV Adapter"],
    ideal:
      "Quando você busca equilíbrio entre discrição, conectividade e processamento inteligente.",
  },
  {
    name: "Philips HearLink 30 Pro miniRITE",
    badge: "Bluetooth",
    image: IMAGE_HEARLINK30_PRO,
    alt: "Philips HearLink 30 Pro miniRITE com conectividade na Auditik",
    what: "Entrada premium na linha Pro com evolução confortável e conectividade para o cotidiano conectado.",
    forWho:
      "Quem quer tecnologia Pro com adaptação progressiva e uso de smartphone no dia a dia.",
    highlights: ["Linha Pro", "HearLink 2", "AutoSense"],
    ideal:
      "Quando você dá o passo certo desde o início com Bluetooth e acompanhamento clínico.",
  },
  {
    name: "Philips HearLink Pro miniRITE T",
    badge: "Bluetooth",
    image: IMAGE_MINIRITE_PRO,
    alt: "Philips HearLink Pro miniRITE T com Bluetooth na Auditik",
    what: "Topo de linha miniRITE com SpeechSensor, AutoSense e streaming para ambientes exigentes.",
    forWho:
      "Profissionais e perfis sociais ativos que não abrem mão de clareza em ruído e conectividade.",
    highlights: ["SpeechSensor", "AutoSense", "Pro TV Adapter", "AudioClip"],
    ideal:
      "Quando a prioridade é desempenho máximo com celular, TV e reuniões no mesmo aparelho.",
  },
];

const techFeatures = [
  {
    title: "SpeechSensor",
    text: "Prioriza vozes em ambientes ruidosos — essencial para chamadas, videochamadas e TV com diálogos.",
  },
  {
    title: "AutoSense",
    text: "Alterna programas conforme o ambiente muda (rua, carro, restaurante), sem ajustar botão o tempo todo.",
  },
  {
    title: "Programação Auditik",
    text: "Bluetooth só entrega valor com ajuste fonoaudiológico individual — testamos na avaliação gratuita.",
  },
];

const clinicSteps = [
  {
    step: "1",
    title: "Avaliação auditiva gratuita",
    text: "Entender grau de perda e expectativas com trabalho, TV, celular e redes sociais.",
  },
  {
    step: "2",
    title: "Demonstração de conectividade",
    text: "Testar pareamento com smartphone, app HearLink 2 e, se indicado, Pro TV Adapter ou AudioClip.",
  },
  {
    step: "3",
    title: "Programação individual",
    text: "Ajuste fino de ganho e programas para cada uso conectado — chamadas, streaming e ambiente.",
  },
  {
    step: "4",
    title: "Acompanhamento contínuo",
    text: "Retornos para refinar streaming, volume e conforto sem custo adicional de consulta de ajuste.",
  },
];

export default function AparelhoAuditivoComBluetoothPage() {
  const seo = getSEOMeta({
    title: "Aparelho auditivo com Bluetooth | Philips HearLink na Auditik",
    description:
      "Aparelho auditivo com Bluetooth em Piracicaba: chamadas, música e TV com mais clareza. App HearLink 2 e acessórios Philips. Avaliação auditiva gratuita na Auditik.",
    canonical: "https://www.auditik.com.br/aparelho-auditivo-com-bluetooth/",
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
        name: "Aparelho auditivo com Bluetooth",
        item: "https://www.auditik.com.br/aparelho-auditivo-com-bluetooth/",
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
                Bluetooth · App HearLink 2 · Avaliação gratuita
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.05] mb-6">
                Aparelho auditivo com Bluetooth:{" "}
                <span className="text-auditik-blue">
                  ouça chamadas, música e TV
                </span>{" "}
                com mais clareza
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-4">
                Voltar a participar de reuniões, ouvir o celular sem esforço,
                curtir uma playlist ou acompanhar a novela sem aumentar o volume
                da TV — isso é o que muitas pessoas buscam quando pesquisam{" "}
                <strong>aparelho auditivo com Bluetooth</strong>. Não é luxo
                tecnológico: é <strong>reinserção</strong> no trabalho, no lazer
                e nas redes sociais, com som enviado{" "}
                <strong>direto aos aparelhos</strong>. Na{" "}
                <strong>Auditik Soluções Auditivas</strong>, em{" "}
                <strong>Piracicaba-SP</strong>, somos{" "}
                <strong>distribuidor autorizado Philips Hearing Solutions</strong>{" "}
                com linha <strong>HearLink</strong>, <strong>SpeechSensor</strong>
                , <strong>AutoSense</strong> e aplicativo{" "}
                <strong>HearLink 2</strong>.
              </p>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                Conheça nossa seleção completa de{" "}
                <Link
                  href={APP_ROUTES.aparelhos}
                  onClick={() =>
                    trackButtonClick("bluetooth_link_pilar_aparelhos", {
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
                    trackButtonClick("bluetooth_cta_agendar", {
                      section: "hero",
                      page: PAGE_TRACKING,
                    })
                  }
                  className="cta-button-primary text-center"
                >
                  Agendar avaliação gratuita
                </Link>
                <WhatsAppLeadButton
                  buttonName="bluetooth_cta_whatsapp"
                  leadSource="Website Aparelho Bluetooth Hero"
                  trackingParams={{
                    section: "hero",
                    page: PAGE_TRACKING,
                  }}
                  whatsappMessage="Olá Auditik, quero saber sobre aparelho auditivo com Bluetooth e agendar uma avaliação gratuita."
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
                  alt="Aparelho auditivo Philips HearLink com Bluetooth conectado ao smartphone — Auditik Piracicaba"
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

        {/* Por que Bluetooth */}
        <section className="py-20 bg-bg-light-blue" id="por-que-bluetooth">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Por que um aparelho auditivo com Bluetooth muda sua rotina
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                A perda auditiva costuma afastar a pessoa de conversas em grupo,
                videochamadas e do prazer de ouvir música ou TV com nitidez. A
                conectividade sem fio devolve <strong>participação ativa</strong>
                : o áudio chega processado pelo seu aparelho — com ganho e
                clareza de fala pensados para <strong>você</strong>, não para o
                ambiente.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {lifestyleCards.map((card) => (
                <article
                  key={card.title}
                  className="bg-white rounded-4xl p-6 border border-blue-50 shadow-sm"
                >
                  <span className="material-symbols-outlined text-3xl text-auditik-blue mb-3">
                    {card.icon}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {card.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona conexão */}
        <section className="py-20 bg-white" id="como-funciona-conexao">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Como funciona a conexão com smartphone e TV
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Entenda como o <strong>aparelho auditivo com Bluetooth</strong>{" "}
                se integra ao celular e à televisão no dia a dia.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <article className="bg-bg-light-blue rounded-4xl p-8 border border-blue-50">
                <h3 className="text-2xl font-extrabold text-auditik-blue mb-4">
                  Smartphone (iOS e Android)
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Os aparelhos <strong>Philips HearLink</strong> compatíveis
                  utilizam conectividade sem fio para parear com o celular como{" "}
                  <strong>dispositivo auditivo</strong> — não como um fone
                  Bluetooth comum.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  <strong>iPhone (iOS):</strong> em{" "}
                  <em>Ajustes → Acessibilidade → Aparelhos auditivos</em>, o
                  sistema lista dispositivos compatíveis. Após o pareamento na
                  clínica ou com nosso passo a passo, chamadas e áudio
                  selecionados podem ser transmitidos{" "}
                  <strong>diretamente</strong> para os dois ouvidos.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  <strong>Android:</strong> em{" "}
                  <em>Configurações → Acessibilidade</em> (ou{" "}
                  <em>Dispositivos conectados</em>, conforme fabricante), há
                  suporte a aparelhos auditivos compatíveis. Vincule uma vez e
                  use no dia a dia para <strong>chamadas</strong> e{" "}
                  <strong>streaming de mídia</strong> suportado pelo sistema.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Importante:</strong> nem todo formato intra (IIC/CIC
                  muito discreto) oferece o mesmo nível de conectividade direta.
                  A <strong>avaliação gratuita na Auditik</strong> define o
                  modelo e, se necessário, acessórios como o{" "}
                  <strong>Pro AudioClip</strong>.
                </p>
              </article>

              <article className="bg-bg-light-blue rounded-4xl p-8 border border-blue-50">
                <h3 className="text-2xl font-extrabold text-auditik-blue mb-4">
                  Televisão
                </h3>
                <div className="relative w-full max-w-xs mx-auto mb-6">
                  <Image
                    src={IMAGE_TV_ADAPTER}
                    alt="Pro TV Adapter Philips para aparelho auditivo com streaming de TV"
                    width={1200}
                    height={1200}
                    className="w-full h-48 object-contain"
                    sizes="(max-width: 1024px) 80vw, 320px"
                  />
                </div>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A maioria das TVs não envia áudio diretamente para aparelhos
                  auditivos como o celular faz. A Philips oferece o{" "}
                  <strong>Pro TV Adapter</strong>: transmissor que conecta à TV
                  (áudio óptico ou analógico, conforme instalação) e envia o som
                  em <strong>streaming para os aparelhos HearLink</strong>.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Você controla o volume nos aparelhos, independente da TV —
                  ideal para jornal, futebol ou série sem incomodar quem está ao
                  lado e sem perder diálogos.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Benefícios práticos */}
        <section className="py-20 bg-bg-light-blue" id="beneficios">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">
              Benefícios práticos no dia a dia
            </h2>
            <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              Streaming de áudio, músicas e chamadas com mais clareza — o que o
              público em <strong>meio de funil</strong> busca ao pesquisar
              conectividade.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {benefitCards.map((card) => (
                <article
                  key={card.title}
                  className="bg-white rounded-4xl p-8 border border-blue-50 shadow-sm flex gap-4"
                >
                  <span className="material-symbols-outlined text-4xl text-auditik-blue shrink-0">
                    {card.icon}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{card.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="text-center text-slate-600 text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
              O streaming consome mais bateria; em modelos{" "}
              <strong>recarregáveis</strong>, planeje carga noturna — veja nosso
              guia de{" "}
              <Link
                href={SUBS_APARELHOS_ROUTES.recarregavel}
                onClick={() =>
                  trackButtonClick("bluetooth_link_recarregavel", {
                    section: "beneficios",
                    page: PAGE_TRACKING,
                  })
                }
                className="text-auditik-blue font-bold hover:underline"
              >
                aparelho auditivo recarregável
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("bluetooth_cta_beneficios_agendar", {
                    section: "beneficios",
                    page: PAGE_TRACKING,
                  })
                }
                className="cta-button-primary text-center"
              >
                Quero testar na avaliação gratuita
              </Link>
              <WhatsAppLeadButton
                buttonName="bluetooth_cta_beneficios_whatsapp"
                leadSource="Website Aparelho Bluetooth Beneficios"
                trackingParams={{
                  section: "beneficios",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, quero saber os benefícios do aparelho auditivo com Bluetooth."
                className="cta-button-secondary text-center"
              >
                Tirar dúvidas no WhatsApp
              </WhatsAppLeadButton>
            </div>
          </div>
        </section>

        {/* App HearLink 2 */}
        <section className="py-20 bg-white" id="app-hearlink-2">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative max-w-sm mx-auto lg:mx-0">
                <Image
                  src={IMAGE_APP}
                  alt="Aplicativo HearLink 2 Philips no iPhone para controle do aparelho auditivo"
                  width={1290}
                  height={2796}
                  className="w-full h-auto max-h-[520px] object-contain"
                  sizes="(max-width: 1024px) 90vw, 400px"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                  Aplicativo HearLink 2 (Philips)
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  O <strong>HearLink 2</strong> (iOS e Android) coloca o controle
                  na palma da mão — especialmente útil para quem alterna entre
                  casa, trabalho e rua. Na demonstração na clínica, mostramos o
                  pareamento no seu celular.
                </p>
                <ul className="space-y-4">
                  {appFeatures.map((feature) => (
                    <li key={feature.title} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-auditik-blue shrink-0 mt-0.5">
                        {feature.icon}
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">{feature.title}</p>
                        <p className="text-slate-600 leading-relaxed text-sm">
                          {feature.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Acessórios conectividade */}
        <section className="py-20 bg-bg-light-blue" id="acessorios">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">
              Acessórios exclusivos Philips para conectividade
            </h2>
            <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              Além do Bluetooth do aparelho, a Philips completa a experiência com
              acessórios oficiais — os mesmos do ecossistema da nossa{" "}
              <Link
                href={APP_ROUTES.aparelhos}
                onClick={() =>
                  trackButtonClick("bluetooth_link_pilar_acessorios", {
                    section: "acessorios",
                    page: PAGE_TRACKING,
                  })
                }
                className="text-auditik-blue font-bold hover:underline"
              >
                página de aparelhos auditivos
              </Link>
              .
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {connectivityAccessories.map((item) => (
                <article
                  key={item.name}
                  className="bg-white rounded-4xl p-6 border border-blue-50 shadow-sm"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={1200}
                    height={1200}
                    className="w-full h-40 object-contain mb-4"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("bluetooth_cta_acessorios_agendar", {
                    section: "acessorios",
                    page: PAGE_TRACKING,
                  })
                }
                className="cta-button-primary text-center"
              >
                Demonstrar TV Adapter na clínica
              </Link>
              <WhatsAppLeadButton
                buttonName="bluetooth_cta_acessorios_whatsapp"
                leadSource="Website Aparelho Bluetooth Acessorios"
                trackingParams={{
                  section: "acessorios",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, quero saber sobre Pro TV Adapter e acessórios Bluetooth Philips."
                className="cta-button-secondary text-center"
              >
                Falar no WhatsApp
              </WhatsAppLeadButton>
            </div>
          </div>
        </section>

        {/* Modelos */}
        <section className="py-20 bg-white" id="modelos">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">
              Modelos Philips HearLink com conectividade
            </h2>
            <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              A conectividade depende do <strong>formato</strong> e do{" "}
              <strong>nível tecnológico</strong> indicados no exame. Exemplos
              frequentes na Auditik:
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {philipsProducts.map((product) => (
                <article
                  key={product.name}
                  className="bg-bg-light-blue rounded-4xl border border-blue-50 overflow-hidden flex flex-col"
                >
                  <div className="relative h-56 bg-white">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <span className="inline-block px-3 py-1 bg-auditik-blue/10 text-auditik-blue rounded-full text-xs font-bold uppercase tracking-wider mb-3 w-fit">
                      {product.badge}
                    </span>
                    <h3 className="text-xl font-extrabold text-auditik-blue mb-4">
                      {product.name}
                    </h3>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">
                      O que é
                    </p>
                    <p className="text-slate-700 mb-4 leading-relaxed text-sm">
                      {product.what}
                    </p>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Para quem
                    </p>
                    <p className="text-slate-700 mb-4 leading-relaxed text-sm flex-1">
                      {product.forWho}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.highlights.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-auditik-blue/10 text-auditik-blue text-xs font-semibold rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed border-t border-blue-50 pt-4">
                      <strong>Ideal quando:</strong> {product.ideal}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-10 text-center text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Formatos <strong>IIC/CIC</strong> priorizam discrição; conectividade
              pode ser limitada — consulte nosso guia de{" "}
              <Link
                href={SUBS_APARELHOS_ROUTES.invisivel}
                onClick={() =>
                  trackButtonClick("bluetooth_link_invisivel", {
                    section: "modelos",
                    page: PAGE_TRACKING,
                  })
                }
                className="text-auditik-blue font-bold hover:underline"
              >
                aparelho auditivo invisível
              </Link>
              .
            </p>
            <p className="mt-6 text-center text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
              Para comparar <strong>todos os formatos</strong> e níveis
              tecnológicos, explore nossa{" "}
              <Link
                href={APP_ROUTES.aparelhos}
                onClick={() =>
                  trackButtonClick("bluetooth_link_pilar_modelos", {
                    section: "modelos",
                    page: PAGE_TRACKING,
                  })
                }
                className="text-auditik-blue font-bold hover:underline"
              >
                linha completa de aparelhos auditivos Philips HearLink
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("bluetooth_cta_modelos_agendar", {
                    section: "modelos",
                    page: PAGE_TRACKING,
                  })
                }
                className="cta-button-primary text-center"
              >
                Quero testar na avaliação gratuita
              </Link>
              <WhatsAppLeadButton
                buttonName="bluetooth_cta_modelos_whatsapp"
                leadSource="Website Aparelho Bluetooth Modelos"
                trackingParams={{
                  section: "modelos",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, quero conhecer aparelhos auditivos Philips HearLink com Bluetooth."
                className="cta-button-secondary text-center"
              >
                Tirar dúvidas no WhatsApp
              </WhatsAppLeadButton>
            </div>
          </div>
        </section>

        {/* Tecnologia */}
        <section className="py-20 bg-bg-light-blue">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">
              Tecnologia que sustenta a experiência conectada
            </h2>
            <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              Conectividade sem processamento inteligente não entrega o resultado
              que você merece. Os HearLink combinam streaming com recursos de
              ponta.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {techFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-4xl p-8 border border-blue-50 text-center"
                >
                  <h3 className="text-xl font-bold text-auditik-blue mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Processo clínico */}
        <section className="py-20 bg-white">
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
                        <p className="text-slate-600 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-4xl overflow-hidden shadow-xl border-8 border-white">
                <Image
                  src={CLINIC_IMAGE}
                  alt="Sala de atendimento Auditik em Piracicaba para avaliação de aparelho auditivo com Bluetooth"
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
        <section className="py-20 bg-bg-light-blue">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Investimento e formas de pagamento
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              O <strong>aparelho auditivo com Bluetooth</strong> é investimento em
              saúde e qualidade de vida — o valor depende do nível HearLink,
              acessórios e serviços inclusos. Transparência na clínica, sem preço
              surpresa no site.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center text-left sm:text-center">
              <Link
                href={SUBS_APARELHOS_ROUTES.preco}
                onClick={() =>
                  trackButtonClick("bluetooth_link_preco", {
                    section: "investimento",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
              >
                <span className="material-symbols-outlined">payments</span>
                Preço de aparelho auditivo
              </Link>
              <Link
                href={SUBS_APARELHOS_ROUTES.financiamento}
                onClick={() =>
                  trackButtonClick("bluetooth_link_financiamento", {
                    section: "investimento",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
              >
                <span className="material-symbols-outlined">credit_card</span>
                Financiamento (21x e Crédito BB)
              </Link>
              <Link
                href={SUBS_APARELHOS_ROUTES.recarregavel}
                onClick={() =>
                  trackButtonClick("bluetooth_link_recarregavel_silo", {
                    section: "investimento",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
              >
                <span className="material-symbols-outlined">battery_charging_full</span>
                Aparelho recarregável
              </Link>
              <Link
                href={SUBS_APARELHOS_ROUTES.invisivel}
                onClick={() =>
                  trackButtonClick("bluetooth_link_invisivel_silo", {
                    section: "investimento",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
              >
                <span className="material-symbols-outlined">visibility_off</span>
                Aparelho invisível
              </Link>
              <Link
                href={SUBS_APARELHOS_ROUTES.piracicaba}
                onClick={() =>
                  trackButtonClick("bluetooth_link_piracicaba", {
                    section: "investimento",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
              >
                <span className="material-symbols-outlined">location_on</span>
                Aparelhos em Piracicaba
              </Link>
            </div>
          </div>
        </section>

        {/* CTA intermediário */}
        <section className="py-16 bg-auditik-blue text-white">
          <div className="container-wide text-center max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              Volte a ouvir chamadas, música e TV com clareza
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Agende uma <strong>avaliação auditiva gratuita</strong> em
              Piracicaba e teste, com fonoaudiólogos, qual{" "}
              <strong>aparelho auditivo com Bluetooth</strong> Philips HearLink
              faz sentido para sua audição e sua rotina conectada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("bluetooth_cta_intermediario_contato", {
                    section: "cta_intermediario",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex min-h-11 items-center justify-center bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-3 px-8 rounded-full transition-colors"
              >
                Agendar avaliação gratuita
              </Link>
              <WhatsAppLeadButton
                buttonName="bluetooth_cta_intermediario_whatsapp"
                leadSource="Website Aparelho Bluetooth CTA Intermediário"
                trackingParams={{
                  section: "cta_intermediario",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, gostaria de agendar avaliação gratuita para aparelho auditivo com Bluetooth."
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
              Dúvidas frequentes sobre aparelho auditivo com Bluetooth
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
              alt="Aparelho auditivo com Bluetooth Philips HearLink na Auditik Piracicaba"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="container-wide relative z-10 text-center max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Agende sua avaliação auditiva gratuita e teste o aparelho auditivo
              com Bluetooth Philips HearLink
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed">
              O primeiro passo não é comprar acessório online — é{" "}
              <strong>entender sua audição</strong> e provar, na clínica, como
              chamadas, música e TV podem voltar à sua rotina. Na{" "}
              <strong>Auditik</strong>, em <strong>Piracicaba</strong>, você
              encontra <strong>Philips HearLink</strong> original,{" "}
              <strong>HearLink 2</strong>, <strong>Pro TV Adapter</strong> e
              equipe que acompanha sua adaptação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("bluetooth_final_cta_contato", {
                    section: "final_cta",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-3 px-6 sm:px-8 rounded-full transition-colors"
              >
                Agendar minha avaliação
              </Link>
              <WhatsAppLeadButton
                buttonName="bluetooth_final_cta_whatsapp"
                leadSource="Website Aparelho Bluetooth"
                trackingParams={{
                  section: "final_cta",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, quero agendar minha avaliação auditiva gratuita para aparelho auditivo com Bluetooth."
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
