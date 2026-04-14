import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Header } from "@components/Header";
import { WhatsAppLeadButton } from "@components/Common/WhatsAppLeadButton";
import { trackButtonClick } from "@lib/analytics";
import { getSEOMeta } from "@lib/seo";
import { generateFAQSchema, generateProductSchema } from "@lib/schema";

type ProductItem = {
  name: string;
  category: string;
  description: string;
  idealFor: string;
  image: string;
};

type AccessoryItem = {
  name: string;
  category: "Carregamento" | "Conectividade" | "App";
  description: string;
  image: string;
};

const aasiProducts: ProductItem[] = [
  {
    name: "HearLink miniRITE Pro",
    category: "RITE",
    description:
      "Modelo moderno com foco em naturalidade sonora, leitura de fala e adaptação confortável no dia a dia.",
    idealFor: "Quem busca discrição com alto desempenho em ambientes dinâmicos.",
    image:
      "/images/philips/optimized/aasi/Philips_HearLink_Pro_miniRITE_T_Speaker60_OpenBassDome_BE_TP_Left_1200x1200px_Original file.webp",
  },
  {
    name: "HearLink 50 miniRITE",
    category: "RITE",
    description:
      "Combina processamento inteligente com conectividade robusta para streaming e ajustes finos.",
    idealFor: "Usuários conectados e com rotina ativa entre casa, trabalho e social.",
    image:
      "/images/philips/optimized/aasi/Philips_HearLink50_miniRITE_H1-2024_Left_C090Beige_LEDgreen_Speaker60_OpenBassDome_1200x1200px_Original file.webp",
  },
  {
    name: "HearLink 30 Pro miniRITE",
    category: "RITE",
    description:
      "Entrada premium para quem quer evoluir a escuta com conforto e desempenho consistente.",
    idealFor:
      "Primeiros usuários que desejam tecnologia avançada com adaptação progressiva.",
    image:
      "/images/philips/optimized/aasi/Philips_HearLink30_Pro_miniRITE_T_Left_DarkGray_DarkGray_Speaker60_OpenBassDome_1200x1200px_Original file.webp",
  },
  {
    name: "HearLink Pro BTE UP",
    category: "BTE",
    description:
      "Potência ampliada com foco em estabilidade, controle de feedback e clareza em volume elevado.",
    idealFor:
      "Perdas auditivas severas a profundas que exigem maior reserva de potência.",
    image:
      "/images/philips/optimized/aasi/Philips_HearLink_Pro_BTE_UP_Hook_TP_BE_Left_1200x1200px_Original file.webp",
  },
  {
    name: "HearLink Pro miniBTE T",
    category: "BTE",
    description:
      "Formato clássico e confiável com construção robusta para uso contínuo.",
    idealFor: "Quem prioriza praticidade de manuseio e durabilidade no uso diário.",
    image:
      "/images/philips/optimized/aasi/Philips_HearLink_Pro_miniBTE_T_hook_BR_TP_Left_1200x1200px_Original file.webp",
  },
  {
    name: "HearLink Pro CIC",
    category: "Intra-auricular",
    description:
      "Solução compacta com ajuste personalizado para maior discrição estética.",
    idealFor: "Usuários que valorizam invisibilidade e conforto em moldes sob medida.",
    image:
      "/images/philips/optimized/aasi/Philips_HearLink_Pro_CIC_Right_MediumBrown_Bat10_PB_Front_1200x1200px_Original file.webp",
  },
  {
    name: "HearLink Pro IIC",
    category: "Intra-auricular",
    description:
      "Modelo intra-canal profundo com performance otimizada para escuta natural.",
    idealFor: "Perfis que querem máxima discrição sem abrir mão de qualidade sonora.",
    image:
      "/images/philips/optimized/aasi/Philips_HearLink_Pro_IIC_Left_MediumBrownShell_MediumBrownFaceplate_Bat10_Front_1200x1200px_Original file.webp",
  },
  {
    name: "HearLink Pro ITE Full Shell",
    category: "Intra-auricular",
    description:
      "Formato personalizado de maior superfície, com ótima ergonomia de toque e ajuste.",
    idealFor: "Quem busca controle prático com molde total do conduto auditivo.",
    image:
      "/images/philips/optimized/aasi/Philips_HearLink_Pro_ITEFullshell_Right_MediumBrown_Bat312_NFM_2.4G_Front_1200x1200px_Original file.webp",
  },
  {
    name: "HearLink Pro ITE Half Shell",
    category: "Intra-auricular",
    description:
      "Equilíbrio entre discrição e usabilidade em formato intra sob medida.",
    idealFor:
      "Usuários que desejam encaixe customizado e experiência auditiva estável.",
    image:
      "/images/philips/optimized/aasi/Philips_Hearlink_Pro_ITEHalfshell_Right_MediumBrown_Bat312_NFM_2.4G_Front_1200x1200px_Original file.webp",
  },
];

const accessories: AccessoryItem[] = [
  {
    name: "Charger H1 miniRITE",
    category: "Carregamento",
    description:
      "Base de recarga para rotina diária segura, com design compacto para bancada.",
    image:
      "/images/philips/optimized/acessories/Philips_Charger_H1-2024_Angled_w_miniRITE_C092_w_USB-cable_1200x1200px_Original file.webp",
  },
  {
    name: "Charger Plus H2",
    category: "Carregamento",
    description:
      "Estojo de recarga portátil com tampa e autonomia para acompanhar deslocamentos.",
    image:
      "/images/philips/optimized/acessories/Philips_Charger_Plus_H2-2024_OpenLid_Angled_w_miniRITE_C092_w_USB-cable_1200x1200px_Original file.webp",
  },
  {
    name: "Pro Charger Plus miniRITE",
    category: "Carregamento",
    description:
      "Carregador premium com enfoque em praticidade e proteção dos dispositivos.",
    image:
      "/images/philips/optimized/acessories/Philips_Pro_Charger_Plus_miniRITE_LidOpen_Angled_1200x1200px_Original file.webp",
  },
  {
    name: "Pro Charger miniBTE",
    category: "Carregamento",
    description:
      "Solução dedicada para miniBTE com encaixe confiável e operação simplificada.",
    image:
      "/images/philips/optimized/acessories/Philips_Pro_Charger_miniBTE_T_R_Empty_Angled_1200x1200px_Original file.webp",
  },
  {
    name: "Pro AudioClip",
    category: "Conectividade",
    description:
      "Acessório para chamadas e áudio sem fio, ampliando possibilidades de uso.",
    image:
      "/images/philips/optimized/acessories/Philips_Pro_AudioClip_Front_1200x1200px_Original file.webp",
  },
  {
    name: "Pro Remote Control",
    category: "Conectividade",
    description: "Controle remoto dedicado para ajustes rápidos de programa e volume.",
    image:
      "/images/philips/optimized/acessories/Philips_Pro_Remote_Control_Front_1200x1200px_Original file.webp",
  },
  {
    name: "Pro TV Adapter",
    category: "Conectividade",
    description:
      "Transmissão direta da TV para os aparelhos, com escuta mais clara e confortável.",
    image:
      "/images/philips/optimized/acessories/Philips_Pro_TV_Adapter_Angled_1200x1200px_Original file.webp",
  },
  {
    name: "HearLink 2 App (iOS e Android)",
    category: "App",
    description:
      "Interface completa para personalizar experiência sonora no smartphone.",
    image:
      "/images/philips/optimized/acessories/Philips_HearLink_202_App_General_unmerged_Bezel_iPhone_15_Plus_1290x2796px_Original20file.webp",
  },
  {
    name: "HearLink 2 App (iOS e Android)",
    category: "App",
    description: "Gestão de programas, ajustes e suporte diário na palma da mão.",
    image: "/images/philips/optimized/acessories/Philips_HearLink_2_App_23.webp",
  },
  {
    name: "HearLink 2 App (iOS e Android)",
    category: "App",
    description:
      "Facilidade no dia a dia para ajustes finos e recursos do seu aparelho auditivo.",
    image: "/images/philips/optimized/acessories/Philips_HearLink_2_App_23 (1).webp",
  },
];

const backgroundHighlights = [
  "/images/philips/optimized/background/Philips_HearLink50_miniRITE_H1-2024_C116DarkBeige_AngleB45_Close-up_In-On-Ear_MS-6160_Woman_1200x800px.jpg",
  "/images/philips/optimized/background/Philips_HearLink50_miniRITE_H1-2024_C116DarkBeige_AngleB45_Close-up_In-On-Ear_MS-6136_Man_1200x800px.jpg",
  "/images/philips/optimized/background/PHS_HL50_miniRITE_Lifestyle_iPhone14_MS_0059_AS_485092853.jpg",
  "/images/philips/optimized/background/PHS_HL50_miniRITE_Portable_Charger_Lifestyle_backpack_MS_0017.jpg",
  "/images/philips/optimized/background/PHS_HL50_miniRITE_Case_holding_AS30A_0938Expires_On2_14_2032.jpg",
  "/images/philips/optimized/background/PHS_HL50_miniRITE_In_hand1_orange_AS_399253071_MS_0063Expires_On2_14_2032.jpg",
  "/images/philips/optimized/background/PHS_HL50_miniRITE_Portable_Charger_Lifestyle_blue_shadows_GettyImages-1530702944_MS_0255.jpg",
  "/images/philips/optimized/background/Philips_HearLink50_miniRITE_H1-2024_C116DarkBeige_Angle90_Close-up_In-On-Ear_MS-6152_Woman_1200x800px.jpg",
  "/images/philips/optimized/background/Philips_HearLink50_Key_miniRITE_H1-2024_Left_C063Black_LEDgreen_Speaker60_OpenBassDome_Large.png",
];

const faqItems = [
  {
    question: "Qual aparelho Philips HearLink é ideal para mim?",
    answer:
      "A escolha depende do grau de perda auditiva, rotina, preferências de discrição e conectividade. Na Auditik, a indicação é feita após avaliação auditiva completa e teste supervisionado.",
  },
  {
    question: "Como saber se eu realmente preciso usar aparelho auditivo?",
    answer:
      "Os sinais mais comuns são dificuldade para entender conversas, necessidade de aumentar volume da TV, cansaço em ambientes ruidosos e sensação de isolamento social. A confirmação é feita por avaliação auditiva com profissional especializado.",
  },
  {
    question: "Perda auditiva tem tratamento ou o aparelho é para sempre?",
    answer:
      "Cada caso é único. Em muitas situações o aparelho auditivo é a melhor estratégia para reabilitação e qualidade de vida, mas a conduta correta depende do diagnóstico clínico e audiológico completo.",
  },
  {
    question: "O aparelho auditivo fica visível?",
    answer:
      "Hoje existem formatos muito discretos, incluindo modelos intra-auriculares e miniRITE. Na consultoria da Auditik, você conhece opções com diferentes níveis de discrição e conforto estético.",
  },
  {
    question: "Aparelho auditivo incomoda ou dói no ouvido?",
    answer:
      "Com seleção correta do modelo, adaptação progressiva e ajustes finos, a tendência é de conforto no uso diário. Eventuais incômodos iniciais podem ser corrigidos nas revisões de acompanhamento.",
  },
  {
    question: "Os aparelhos Philips HearLink conectam ao celular?",
    answer:
      "Sim. A linha oferece conectividade para chamadas, áudio e ajustes personalizados por aplicativo, além de acessórios dedicados para ampliar a experiência.",
  },
  {
    question:
      "Posso ouvir música, assistir TV e atender ligações com aparelho auditivo?",
    answer:
      "Sim. Dependendo do modelo e dos acessórios escolhidos, é possível transmitir áudio da TV, receber chamadas com melhor clareza e personalizar o som para diferentes momentos do dia.",
  },
  {
    question: "Qual a diferença entre modelos recarregáveis e com pilha?",
    answer:
      "Modelos recarregáveis oferecem praticidade na rotina, enquanto versões com pilha podem ser uma alternativa para perfis específicos de uso. A recomendação ideal considera estilo de vida e necessidade auditiva.",
  },
  {
    question: "Quanto tempo dura a bateria de um aparelho auditivo?",
    answer:
      "A autonomia varia conforme modelo, nível de processamento e uso de conectividade. Em consulta, mostramos estimativas reais de duração e a melhor estratégia para sua rotina.",
  },
  {
    question: "Quanto tempo dura a adaptação ao aparelho auditivo?",
    answer:
      "A adaptação varia de pessoa para pessoa. Com programação individual, acompanhamento fonoaudiológico e ajustes progressivos, o processo tende a ser mais confortável e eficiente.",
  },
  {
    question: "Preciso usar aparelho nos dois ouvidos?",
    answer:
      "Quando há perda bilateral, muitas vezes a adaptação binaural traz melhor localização sonora, compreensão de fala e equilíbrio auditivo. A decisão final é clínica e personalizada.",
  },
  {
    question: "Existe risco de o aparelho piorar minha audição?",
    answer:
      "Não, quando o dispositivo é indicado e regulado corretamente por profissional qualificado. A programação adequada respeita seus limiares auditivos e prioriza segurança sonora.",
  },
  {
    question: "Como funciona a manutenção e limpeza dos aparelhos?",
    answer:
      "A manutenção inclui higienização regular, cuidados com umidade, troca de filtros quando necessário e revisões periódicas. Na Auditik, você recebe orientação completa de uso e conservação.",
  },
  {
    question: "Qual é o investimento em um aparelho auditivo Philips HearLink?",
    answer:
      "O valor depende da tecnologia, formato e recursos de conectividade. Na consultoria, você recebe indicação transparente com opções alinhadas à sua necessidade auditiva e orçamento.",
  },
  {
    question: "Posso testar antes de decidir a compra?",
    answer:
      "Sim. A avaliação com demonstração prática é essencial para entender desempenho, conforto e expectativa real de benefício no seu contexto de vida.",
  },
  {
    question: "Em quanto tempo começo a perceber melhora na comunicação?",
    answer:
      "Muitos usuários percebem benefício inicial rapidamente, mas a consolidação da escuta costuma evoluir ao longo das semanas com uso consistente e ajustes orientados.",
  },
  {
    question: "A Auditik oferece suporte pós-adaptação?",
    answer:
      "Sim. Nossa equipe realiza acompanhamento contínuo, revisões técnicas, calibrações e orientações para garantir desempenho e bem-estar ao longo do uso. E todo nosso suporte é vitalício e sem custo algum.",
  },
];

export default function AparelhosPage() {
  const [activeAasiIndex, setActiveAasiIndex] = useState(0);
  const [accessoryTab, setAccessoryTab] =
    useState<AccessoryItem["category"]>("Carregamento");

  const seo = getSEOMeta({
    title: "Aparelhos Auditivos Philips HearLink em Piracicaba | Auditik",
    description:
      "Conheça a linha completa Philips HearLink na Auditik: modelos intra e retroauriculares, app HearLink 2, acessórios oficiais, tecnologia com IA e acompanhamento especializado.",
    canonical: "https://auditik.com.br/aparelhos",
    ogImage:
      "https://auditik.com.br/images/philips/optimized/background/Philips_HearLink50_miniRITE_H1-2024_C116DarkBeige_AngleB45_Close-up_In-On-Ear_MS-6160_Woman_1200x800px.jpg",
  });

  const productSchema = generateProductSchema({
    name: "Linha Philips HearLink - Auditik",
    description:
      "Portfólio Philips HearLink com inteligência artificial, conectividade e acessórios oficiais, com adaptação profissional na Auditik.",
    image:
      "https://auditik.com.br/images/philips/optimized/background/Philips_HearLink50_miniRITE_H1-2024_C116DarkBeige_AngleB45_Close-up_In-On-Ear_MS-6160_Woman_1200x800px.jpg",
    price: "Sob consulta",
  });

  const faqSchema = generateFAQSchema(faqItems);

  const activeAasi = aasiProducts[activeAasiIndex];
  const filteredAccessories = useMemo(
    () => accessories.filter((item) => item.category === accessoryTab),
    [accessoryTab],
  );

  const handleNextAasi = () => {
    setActiveAasiIndex((prev) => (prev === aasiProducts.length - 1 ? 0 : prev + 1));
    trackButtonClick("aparelhos_next_model", { section: "aasi_gallery" });
  };

  const handlePrevAasi = () => {
    setActiveAasiIndex((prev) => (prev === 0 ? aasiProducts.length - 1 : prev - 1));
    trackButtonClick("aparelhos_prev_model", { section: "aasi_gallery" });
  };

  return (
    <>
      <NextSeo {...seo} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
                Tecnologia Philips HearLink
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.05] mb-6">
                Aparelhos Auditivos com
                <span className="text-auditik-blue">
                  {" "}
                  IA, precisão clínica e conforto real
                </span>
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
                Na Auditik, você encontra a linha completa Philips HearLink com
                atendimento fonoaudiológico especializado, programação individual e
                acompanhamento contínuo para escutar melhor em todos os momentos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contato"
                  onClick={() =>
                    trackButtonClick("aparelhos_cta_agendar", { section: "hero" })
                  }
                  className="cta-button-primary text-center"
                >
                  Agendar avaliação gratuita
                </Link>
                <WhatsAppLeadButton
                  buttonName="aparelhos_cta_whatsapp"
                  leadSource="Website Aparelhos Hero"
                  trackingParams={{ section: "hero" }}
                  whatsappMessage="Olá Auditik, quero conhecer a linha Philips HearLink."
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
                  src={backgroundHighlights[3]}
                  alt="Mulher usando aparelho auditivo Philips HearLink"
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

        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Excelência Auditik + inovação Philips
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Nossa proposta combina tecnologia auditiva de alto padrão com um
                processo clínico humanizado: avaliação, seleção de modelo, adaptação
                progressiva, ajustes finos e monitoramento da sua evolução auditiva.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-bg-light-blue rounded-4xl p-8 border border-blue-50">
                <p className="text-4xl font-extrabold text-auditik-blue mb-2">+20</p>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Anos de experiência
                </h3>
                <p className="text-slate-600">
                  Atendimento especializado em saúde auditiva com foco em resultado
                  funcional e qualidade de vida.
                </p>
              </div>
              <div className="bg-bg-light-blue rounded-4xl p-8 border border-blue-50">
                <p className="text-4xl font-extrabold text-auditik-blue mb-2">100%</p>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Ajuste personalizado
                </h3>
                <p className="text-slate-600">
                  Cada programação é calibrada para sua percepção sonora, rotina e
                  objetivos de comunicação.
                </p>
              </div>
              <div className="bg-bg-light-blue rounded-4xl p-8 border border-blue-50">
                <p className="text-4xl font-extrabold text-auditik-blue mb-2">360º</p>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Jornada completa
                </h3>
                <p className="text-slate-600">
                  Da primeira consulta ao pós-adaptação, com suporte contínuo da equipe
                  Auditik.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-bg-light-blue">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-12 text-center">
              Processamento de som com IA para escuta natural
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="bg-white rounded-4xl p-8 border border-blue-50 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Filtro de ruído inteligente
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  A tecnologia analisa o ambiente em tempo real, reduz interferências e
                  prioriza sinais relevantes para melhorar entendimento de fala em
                  locais com múltiplas fontes sonoras.
                </p>
              </article>
              <article className="bg-white rounded-4xl p-8 border border-blue-50 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Realce de conversação
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Algoritmos avançados favorecem clareza vocal e naturalidade de timbre,
                  facilitando participação em reuniões, encontros em família e ambientes
                  com reverberação.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                  Linha completa de aparelhos auditivos Philips HearLink
                </h2>
                <p className="text-slate-600 max-w-3xl">
                  Explore formatos RITE, BTE e intra-auriculares. Na Auditik, você
                  testa, compara e recebe indicação técnica para escolher o aparelho
                  mais adequado ao seu perfil auditivo e estilo de vida.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handlePrevAasi}
                  className="w-12 h-12 rounded-full bg-auditik-blue text-white hover:bg-blue-700 transition-colors"
                  aria-label="Modelo anterior"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <button
                  onClick={handleNextAasi}
                  className="w-12 h-12 rounded-full bg-auditik-blue text-white hover:bg-blue-700 transition-colors"
                  aria-label="Próximo modelo"
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-bg-light-blue rounded-[2rem] p-8 md:p-10 border border-blue-50 mb-10">
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-auditik-blue mb-3">
                  {activeAasi.category}
                </p>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-3">
                  {activeAasi.name}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {activeAasi.description}
                </p>
                <p className="text-slate-800 font-semibold">
                  Ideal para: {activeAasi.idealFor}
                </p>
              </div>
              <div className="bg-white rounded-4xl p-6 border border-blue-50 shadow-sm">
                <Image
                  src={activeAasi.image}
                  alt={activeAasi.name}
                  width={1200}
                  height={1200}
                  className="w-full h-[320px] md:h-[420px] object-contain"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {aasiProducts.map((item, index) => (
                <button
                  key={item.image}
                  onClick={() => {
                    setActiveAasiIndex(index);
                    trackButtonClick("aparelhos_select_model", {
                      section: "aasi_gallery",
                      model: item.name,
                    });
                  }}
                  className={`rounded-3xl border p-3 text-left transition-all ${
                    index === activeAasiIndex
                      ? "border-auditik-blue bg-bg-light-blue"
                      : "border-gray-100 bg-white hover:border-auditik-blue/40"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={1200}
                    height={1200}
                    className="w-full h-28 object-contain mb-2"
                    sizes="(max-width: 768px) 45vw, 16vw"
                  />
                  <p className="text-sm font-bold text-slate-800 leading-tight">
                    {item.name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-bg-light-blue">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">
              Ecossistema de acessórios e app HearLink 2
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-10">
              Além do aparelho auditivo, a experiência completa depende de carregadores,
              conectividade e controle inteligente por aplicativo. Esses recursos
              aumentam autonomia, conveniência e desempenho auditivo no dia a dia.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {(["Carregamento", "Conectividade", "App"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setAccessoryTab(tab);
                    trackButtonClick("aparelhos_tab_accessory", {
                      section: "accessories",
                      tab,
                    });
                  }}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-colors ${
                    accessoryTab === tab
                      ? "bg-auditik-blue text-white"
                      : "bg-white text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {filteredAccessories.map((item) => (
                <article
                  key={item.image}
                  className="bg-white rounded-4xl p-6 border border-blue-50 shadow-sm"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={1290}
                    height={2796}
                    className="w-full h-56 object-contain mb-4"
                    sizes="(max-width: 768px) 100vw, 30vw"
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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {accessories.map((item) => (
                <div
                  key={`thumb-${item.image}`}
                  className="bg-white rounded-3xl p-3 border border-gray-100"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={1290}
                    height={2796}
                    className="w-full h-24 object-contain"
                    sizes="(max-width: 768px) 45vw, 14vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 text-center">
              Comparativo por perfil de uso
            </h2>
            <div className="overflow-x-auto rounded-4xl border border-blue-50 shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-auditik-blue text-white">
                  <tr>
                    <th className="text-left px-6 py-4 uppercase tracking-wider font-bold">
                      Categoria
                    </th>
                    <th className="text-left px-6 py-4 uppercase tracking-wider font-bold">
                      Diferenciais
                    </th>
                    <th className="text-left px-6 py-4 uppercase tracking-wider font-bold">
                      Indicação
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white text-slate-700">
                  <tr className="border-t border-gray-100">
                    <td className="px-6 py-4 font-bold">RITE / miniRITE</td>
                    <td className="px-6 py-4">
                      Conectividade avançada, ótima estética, conforto de uso
                      prolongado.
                    </td>
                    <td className="px-6 py-4">
                      Quem busca equilíbrio entre desempenho, discrição e recursos
                      digitais.
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-bg-light-blue">
                    <td className="px-6 py-4 font-bold">BTE / miniBTE</td>
                    <td className="px-6 py-4">
                      Maior potência, robustez e estabilidade de sinal para perdas mais
                      exigentes.
                    </td>
                    <td className="px-6 py-4">
                      Perfis que precisam de reserva de ganho e uso confiável no longo
                      prazo.
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-6 py-4 font-bold">
                      Intra-auricular (CIC, IIC, ITE)
                    </td>
                    <td className="px-6 py-4">
                      Molde personalizado, discrição elevada e ergonomia adaptada ao
                      ouvido.
                    </td>
                    <td className="px-6 py-4">
                      Usuários que priorizam design discreto e personalização anatômica.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-24 bg-bg-light-blue">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-10 text-center">
              FAQ: dúvidas frequentes sobre aparelhos Philips HearLink
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

        <section className="py-24 bg-auditik-blue text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src={backgroundHighlights[2]}
              alt="Conectividade HearLink com smartphone"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="container-wide relative z-10 text-center max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Descubra qual Philips HearLink combina com você
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-8">
              Agende sua avaliação com a equipe Auditik e experimente recursos de IA,
              conectividade e ajustes personalizados para sua rotina.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contato"
                onClick={() =>
                  trackButtonClick("aparelhos_final_cta_contato", {
                    section: "final_cta",
                  })
                }
                className="bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-4 px-8 rounded-full transition-colors"
              >
                Agendar minha avaliação
              </Link>
              <WhatsAppLeadButton
                buttonName="aparelhos_final_cta_whatsapp"
                leadSource="Website Aparelhos Final CTA"
                trackingParams={{ section: "final_cta" }}
                whatsappMessage="Olá Auditik, quero testar os aparelhos Philips HearLink."
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full border border-white/30 transition-colors"
              >
                Falar com especialista
              </WhatsAppLeadButton>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
