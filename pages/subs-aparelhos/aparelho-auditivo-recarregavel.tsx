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

const PAGE_TRACKING = "subs-aparelhos/recarregavel";

const HERO_IMAGE =
  "/images/philips/optimized/background/PHS_HL50_miniRITE_Portable_Charger_Lifestyle_blue_shadows_GettyImages-1530702944_MS_0255.jpg";

const CTA_BACKGROUND =
  "/images/philips/optimized/background/PHS_HL50_miniRITE_Portable_Charger_Lifestyle_blue_shadows_GettyImages-1530702944_MS_0255.jpg";

const CLINIC_IMAGE = "/images/auditik/background/sala_atendimento.webp";

const IMAGE_HEARLINK50 =
  "/images/philips/optimized/aasi/Philips_HearLink50_miniRITE_H1-2024_Left_C090Beige_LEDgreen_Speaker60_OpenBassDome_1200x1200px_Original file.webp";

const IMAGE_MINIRITE_PRO =
  "/images/philips/optimized/aasi/Philips_HearLink_Pro_miniRITE_T_Speaker60_OpenBassDome_BE_TP_Left_1200x1200px_Original file.webp";

const IMAGE_HEARLINK30_PRO =
  "/images/philips/optimized/aasi/Philips_HearLink30_Pro_miniRITE_T_Left_DarkGray_DarkGray_Speaker60_OpenBassDome_1200x1200px_Original file.webp";

const IMAGE_MINIBTE_PRO =
  "/images/philips/optimized/aasi/Philips_HearLink_Pro_miniBTE_T_hook_BR_TP_Left_1200x1200px_Original file.webp";

const IMAGE_CHARGER_H1 =
  "/images/philips/optimized/acessories/Philips_Charger_H1-2024_Angled_w_miniRITE_C092_w_USB-cable_1200x1200px_Original file.webp";

const IMAGE_CHARGER_PLUS =
  "/images/philips/optimized/acessories/Philips_Charger_Plus_H2-2024_OpenLid_Angled_w_miniRITE_C092_w_USB-cable_1200x1200px_Original file.webp";

const IMAGE_PRO_CHARGER_PLUS =
  "/images/philips/optimized/acessories/Philips_Pro_Charger_Plus_miniRITE_LidOpen_Angled_1200x1200px_Original file.webp";

const IMAGE_PRO_CHARGER_MINIBTE =
  "/images/philips/optimized/acessories/Philips_Pro_Charger_miniBTE_T_R_Empty_Angled_1200x1200px_Original file.webp";

const faqItems = [
  {
    question: "Quanto tempo dura a bateria de um aparelho auditivo recarregável?",
    answer:
      "Em uso típico, planeja-se um dia inteiro; com streaming intenso, a autonomia pode variar. A carga noturna cobre a rotina diária; a recarga rápida (cerca de 30 minutos) oferece até 8 horas extras de uso, conforme grau de perda, programação e hábitos de uso.",
  },
  {
    question: "Preciso comprar pilhas mesmo com aparelho recarregável?",
    answer:
      "Não. A energia vem da bateria de íon-lítio integrada e do carregador Philips indicado para o seu modelo. Na Auditik orientamos o carregador compatível após a avaliação.",
  },
  {
    question: "Recarregável é melhor que pilha para idosos?",
    answer:
      "Muitas vezes sim, pelo manuseio mais simples — basta colocar no carregador, sem trocar microbaterias. A decisão final depende do formato indicado no exame auditivo.",
  },
  {
    question: "Posso carregar no carro ou no trabalho?",
    answer:
      "Sim, com cabo USB e fonte adequada conforme o manual Philips. O Charger Plus ainda permite recarregar o par de aparelhos várias vezes fora de casa, sem tomada.",
  },
  {
    question: "O carregador seca o aparelho?",
    answer:
      "O processo de recarga Philips contribui para reduzir umidade durante a carga. Para manutenção completa, recomendamos também o uso de desumidificador conforme orientação da clínica.",
  },
  {
    question: "Todos os aparelhos Philips são recarregáveis?",
    answer:
      "Não. Há versões com pilha descartável e versões recarregáveis (miniRITE R, miniBTE R). Na Auditik indicamos o modelo certo após avaliação gratuita.",
  },
  {
    question: "E se eu esquecer de carregar à noite?",
    answer:
      "A recarga rápida foi pensada para esses imprevistos: cerca de 30 minutos no carregador podem oferecer até 8 horas de autonomia. Manter o carregador em local fixo (mesa de cabeceira) ajuda a criar hábito.",
  },
  {
    question: "A avaliação na Auditik é gratuita?",
    answer:
      "Sim, sem compromisso, para indicar modelo recarregável, carregador compatível e expectativa realista de autonomia para o seu perfil auditivo.",
  },
];

const trustCards = [
  {
    icon: "battery_charging_full",
    title: "Praticidade diária",
    text: "Recarregue à noite ou em poucos minutos — sem trocar pilhas minúsculas toda semana.",
  },
  {
    icon: "eco",
    title: "Menos descarte",
    text: "Bateria de íon-lítio integrada reduz pilhas descartáveis e o impacto ambiental.",
  },
  {
    icon: "workspace_premium",
    title: "Distribuidor Philips",
    text: "HearLink original, carregadores oficiais e acompanhamento fonoaudiológico na Auditik.",
  },
];

const benefitCards = [
  {
    icon: "savings",
    title: "Economia a longo prazo",
    text: "O aparelho recarregável pode incluir o carregador, mas você deixa de gastar com pilhas descartáveis mês após mês. Para quem usa 8 horas ou mais por dia, a economia acumula ao longo dos anos.",
  },
  {
    icon: "recycling",
    title: "Sustentabilidade",
    text: "Cada pilha descartável representa embalagem, transporte e lixo. O aparelho auditivo recarregável reduz esse ciclo com uma bateria bem cuidada que acompanha o aparelho por anos.",
  },
  {
    icon: "front_hand",
    title: "Facilidade de manuseio",
    text: "Idosos e quem tem artrite, tremor ou baixa visão costumam sofrer com pilhas 312/10. Colocar no estojo substitui a troca fina — familiares e cuidadores também ganham tranquilidade.",
  },
  {
    icon: "devices",
    title: "Rotina moderna",
    text: "Carregue no quarto, escritório ou carro (USB). O Charger Plus permite várias recargas portáteis sem tomada — ideal para viagens e passeios.",
  },
];

const comparisonRows = [
  {
    aspect: "Rotina",
    disposable: "Comprar e trocar pilhas (semanal ou quinzenal)",
    rechargeable: "Colocar no carregador à noite",
  },
  {
    aspect: "Manuseio",
    disposable: "Abrir gaveta, encaixar pilha minúscula",
    rechargeable: "Encaixar no carregador — sem peça solta",
  },
  {
    aspect: "Custo contínuo",
    disposable: "Gasto recorrente com pilhas",
    rechargeable: "Investimento no carregador; sem pilhas",
  },
  {
    aspect: "Meio ambiente",
    disposable: "Descarte frequente de pilhas",
    rechargeable: "Menos resíduos",
  },
  {
    aspect: "Imprevistos",
    disposable: "Pilha acaba fora de casa",
    rechargeable: "Recarga rápida para horas extras de uso",
  },
  {
    aspect: "Indicação",
    disposable: "Alguns formatos intra ou preferência pessoal",
    rechargeable: "Quem busca praticidade e rotina simples",
  },
];

const chargerProducts = [
  {
    name: "Charger H1 miniRITE",
    image: IMAGE_CHARGER_H1,
    alt: "Charger H1 Philips para aparelho auditivo recarregável miniRITE",
    description:
      "Base compacta para rotina em casa; recarga noturna estável com indicação LED.",
  },
  {
    name: "Charger Plus H2",
    image: IMAGE_CHARGER_PLUS,
    alt: "Charger Plus H2 Philips — carregador portátil para aparelhos auditivos",
    description:
      "Estojo com bateria interna: recarrega o par de aparelhos várias vezes fora de casa, com tampa protetora.",
  },
  {
    name: "Pro Charger Plus miniRITE",
    image: IMAGE_PRO_CHARGER_PLUS,
    alt: "Pro Charger Plus Philips para linha HearLink Pro miniRITE",
    description:
      "Versão premium para linha Pro, com praticidade e proteção no dia a dia.",
  },
  {
    name: "Pro Charger miniBTE",
    image: IMAGE_PRO_CHARGER_MINIBTE,
    alt: "Pro Charger miniBTE Philips para aparelhos retroauriculares recarregáveis",
    description:
      "Solução dedicada para formatos miniBTE recarregáveis, com encaixe confiável.",
  },
];

const philipsProducts = [
  {
    name: "Philips HearLink 50 miniRITE",
    badge: "Recarregável",
    image: IMAGE_HEARLINK50,
    alt: "Philips HearLink 50 miniRITE recarregável na Auditik",
    what: "Aparelho RITE discreto atrás da orelha, com opção recarregável e conectividade para o dia a dia conectado.",
    forWho:
      "Adultos ativos que querem Bluetooth, boa performance em ruído e fim das pilhas.",
    highlights: [
      "HearLink 2",
      "Processamento inteligente",
      "Charger H1 ou Charger Plus",
    ],
    ideal:
      "Quando você busca equilíbrio entre tecnologia, discrição e praticidade de recarga.",
  },
  {
    name: "Philips HearLink miniRITE Pro",
    badge: "Recarregável",
    image: IMAGE_MINIRITE_PRO,
    alt: "Philips HearLink Pro miniRITE recarregável na Auditik",
    what: "Topo de linha miniRITE com foco em naturalidade da fala e adaptação automática ao ambiente.",
    forWho:
      "Quem não abre mão de SpeechSensor e AutoSense em rotina social e profissional exigente.",
    highlights: ["SpeechSensor", "AutoSense", "Pro Charger Plus", "Streaming"],
    ideal:
      "Quando a prioridade é desempenho máximo com a mesma praticidade da recarga.",
  },
  {
    name: "Philips HearLink 30 Pro miniRITE",
    badge: "Recarregável",
    image: IMAGE_HEARLINK30_PRO,
    alt: "Philips HearLink 30 Pro miniRITE recarregável na Auditik",
    what: "Entrada premium na linha Pro, com evolução confortável para quem está no primeiro aparelho.",
    forWho:
      "Quem quer tecnologia avançada com adaptação progressiva e recarga simples.",
    highlights: ["Linha Pro", "Conforto acústico", "Adaptação progressiva"],
    ideal:
      "Quando você quer dar o passo certo desde o início, sem complicar a rotina com pilhas.",
  },
  {
    name: "Philips HearLink Pro miniBTE T",
    badge: "Recarregável",
    image: IMAGE_MINIBTE_PRO,
    alt: "Philips HearLink Pro miniBTE T recarregável na Auditik",
    what: "Formato retroauricular compacto, robusto e de manuseio mais fácil que microcanais profundos.",
    forWho:
      "Perfis que preferem aparelho atrás da orelha, idosos ou quem precisa de maior área de toque.",
    highlights: ["Pro Charger miniBTE", "Manuseio acessível", "Potência estável"],
    ideal: "Quando praticidade de manuseio pesa mais que discrição extrema no canal.",
  },
];

const techFeatures = [
  {
    title: "SpeechSensor",
    text: "Prioriza vozes em ambientes ruidosos — fundamental em restaurantes, reuniões e família.",
  },
  {
    title: "AutoSense",
    text: "Alterna programas conforme o ambiente muda, sem ficar ajustando botão o tempo todo.",
  },
  {
    title: "HearLink 2",
    text: "Controle pelo celular, orientação de uso e suporte à adaptação no dia a dia.",
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
    text: "Audiometria, anamnese e entendimento da sua rotina — manuseio, viagens e expectativa com recarga.",
  },
  {
    step: "3",
    title: "Indicação do modelo recarregável",
    text: "miniRITE R, miniBTE R e carregador Philips compatível — conforme grau de perda e estilo de vida.",
  },
  {
    step: "4",
    title: "Demonstração, programação e adaptação",
    text: "Programação individual, retornos de ajuste e suporte contínuo sem custo adicional de consulta de ajuste.",
  },
];

const chargingBullets = [
  {
    title: "Carga completa (rotina recomendada)",
    text: "Deixe os aparelhos no carregador durante a noite; pela manhã, eles estão prontos para trabalho, lazer e família.",
  },
  {
    title: "Recarga rápida",
    text: "Em cerca de 30 minutos no carregador, você obtém autonomia de até 8 horas de uso — útil se esqueceu de carregar ou tem um compromisso importante.",
  },
  {
    title: "Primeiro uso",
    text: "Recarregue totalmente antes da primeira utilização, conforme orientação do fabricante, para preservar a vida útil da bateria.",
  },
];

export default function AparelhoAuditivoRecarregavelPage() {
  const seo = getSEOMeta({
    title: "Aparelho auditivo recarregável | Philips HearLink na Auditik",
    description:
      "Aparelho auditivo recarregável Philips HearLink em Piracicaba: fim das pilhas, carga rápida e dia inteiro de uso. Avaliação auditiva gratuita na Auditik. Agende.",
    canonical: "https://www.auditik.com.br/aparelho-auditivo-recarregavel/",
    ogImage:
      "https://www.auditik.com.br/images/philips/optimized/background/PHS_HL50_miniRITE_Portable_Charger_Lifestyle_blue_shadows_GettyImages-1530702944_MS_0255.jpg",
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
        name: "Aparelho auditivo recarregável",
        item: "https://www.auditik.com.br/aparelho-auditivo-recarregavel/",
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
                Sem pilhas · Philips HearLink · Avaliação gratuita
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.05] mb-6">
                Aparelho auditivo recarregável:{" "}
                <span className="text-auditik-blue">praticidade</span> e fim da
                dependência de pilhas
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-4">
                Trocar microbaterias toda semana, abrir a gavetinha com dificuldade ou
                ficar sem energia no meio do dia — situações que ainda afastam muita
                gente do tratamento auditivo. O{" "}
                <strong>aparelho auditivo recarregável</strong> mudou essa rotina: com{" "}
                <strong>bateria de íon-lítio integrada</strong>, você recarrega à noite
                (ou em poucos minutos, quando precisa) e segue ouvindo com mais
                tranquilidade. Na <strong>Auditik Soluções Auditivas</strong>, em{" "}
                <strong>Piracicaba-SP</strong>, somos{" "}
                <strong>distribuidor autorizado Philips Hearing Solutions</strong> com a
                linha <strong>HearLink</strong> — SpeechSensor, AutoSense e app{" "}
                <strong>HearLink 2</strong>.
              </p>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                Conheça nossa seleção completa de{" "}
                <Link
                  href={APP_ROUTES.aparelhos}
                  onClick={() =>
                    trackButtonClick("recarregavel_link_pilar_aparelhos", {
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
                    trackButtonClick("recarregavel_cta_agendar", {
                      section: "hero",
                      page: PAGE_TRACKING,
                    })
                  }
                  className="cta-button-primary text-center"
                >
                  Agendar avaliação gratuita
                </Link>
                <WhatsAppLeadButton
                  buttonName="recarregavel_cta_whatsapp"
                  leadSource="Website Aparelho Recarregavel Hero"
                  trackingParams={{
                    section: "hero",
                    page: PAGE_TRACKING,
                  }}
                  whatsappMessage="Olá Auditik, quero saber sobre aparelho auditivo recarregável e agendar uma avaliação gratuita."
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
                  alt="Carregador portátil Philips HearLink para aparelho auditivo recarregável — Auditik Piracicaba"
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

        {/* Como funciona a recarga */}
        <section className="py-20 bg-bg-light-blue" id="como-funciona-recarga">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Como funciona a tecnologia de carregamento
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Entenda a diferença entre pilhas descartáveis e o{" "}
                <strong>aparelho auditivo recarregável</strong> com bateria integrada.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
              <article className="bg-white rounded-4xl p-8 border border-blue-50 shadow-sm">
                <h3 className="text-2xl font-extrabold text-auditik-blue mb-4">
                  Bateria de íon-lítio: o que muda no dia a dia
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Diferente das pilhas zinco-ar (10, 312, 13 ou 675), o aparelho
                  recarregável traz a bateria <strong>dentro do dispositivo</strong>.
                  Ela é recarregada por indução no <strong>carregador Philips</strong> —
                  sem contatos expostos para você limpar.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Ao colocar os aparelhos na base, eles{" "}
                  <strong>desligam automaticamente</strong>; ao retirar,{" "}
                  <strong>ligam sozinhos</strong>, prontos para usar. A autonomia de um
                  dia inteiro depende do grau de perda, volume de uso e tempo em{" "}
                  <strong>streaming</strong> — por isso a avaliação na clínica é
                  essencial.
                </p>
              </article>

              <article className="bg-white rounded-4xl p-8 border border-blue-50 shadow-sm">
                <h3 className="text-2xl font-extrabold text-auditik-blue mb-4">
                  Recarga noturna e recarga rápida
                </h3>
                <ul className="space-y-4">
                  {chargingBullets.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-auditik-blue shrink-0 mt-0.5">
                        bolt
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">{item.title}</p>
                        <p className="text-slate-600 leading-relaxed">{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <p className="text-center text-slate-500 text-sm max-w-2xl mx-auto mb-10 leading-relaxed">
              A autonomia varia com perda auditiva, programação e streaming — na
              consulta explicamos expectativa realista para o seu perfil.
            </p>

            <div className="overflow-x-auto rounded-4xl border border-blue-50 bg-white shadow-sm">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="bg-auditik-blue text-white">
                    <th className="p-4 md:p-6 font-bold">Aspecto</th>
                    <th className="p-4 md:p-6 font-bold">Pilha descartável</th>
                    <th className="p-4 md:p-6 font-bold">Aparelho recarregável</th>
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
                        {row.disposable}
                      </td>
                      <td className="p-4 md:p-6 text-slate-600 leading-relaxed">
                        {row.rechargeable}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Benefícios do aparelho auditivo recarregável
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Economia, sustentabilidade e facilidade de manuseio — especialmente para
                quem tem dificuldades motoras.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {benefitCards.map((card) => (
                <article
                  key={card.title}
                  className="bg-bg-light-blue rounded-4xl p-8 border border-blue-50"
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
          </div>
        </section>

        {/* Carregadores */}
        <section className="py-20 bg-bg-light-blue" id="carregadores-philips">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Carregadores Philips HearLink na Auditik
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                O carregador certo depende do <strong>modelo indicado</strong> após o
                exame — não é um tamanho único para todos os aparelhos.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {chargerProducts.map((charger) => (
                <article
                  key={charger.name}
                  className="bg-white rounded-4xl overflow-hidden border border-blue-50 shadow-sm flex flex-col"
                >
                  <div className="relative h-48 bg-bg-light-blue">
                    <Image
                      src={charger.image}
                      alt={charger.alt}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-extrabold text-auditik-blue mb-2">
                      {charger.name}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed flex-1">
                      {charger.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Modelos recarregáveis */}
        <section className="py-20 bg-white" id="modelos-recarregaveis">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Modelos recarregáveis Philips HearLink na Auditik
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Conheça as opções da linha HearLink com bateria integrada — indicação
                personalizada após <strong>avaliação auditiva gratuita</strong>.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {philipsProducts.map((product) => (
                <article
                  key={product.name}
                  className="bg-bg-light-blue rounded-4xl overflow-hidden border border-blue-50 flex flex-col"
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
            <p className="mt-10 text-center text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
              <strong>Observação:</strong> formatos <strong>IIC/CIC</strong> da linha
              Pro costumam usar <strong>pilha descartável</strong> por limitação de
              espaço no canal. Se discrição extrema for prioridade, veja nosso guia de{" "}
              <Link
                href={SUBS_APARELHOS_ROUTES.invisivel}
                onClick={() =>
                  trackButtonClick("recarregavel_link_invisivel", {
                    section: "modelos",
                    page: PAGE_TRACKING,
                  })
                }
                className="text-auditik-blue font-bold hover:underline"
              >
                aparelho auditivo invisível
              </Link>
              ; se a prioridade for <strong>recarga</strong>, os modelos{" "}
              <strong>miniRITE R</strong> e <strong>miniBTE R</strong> são o caminho — a
              avaliação define o melhor para você.
            </p>
            <p className="mt-6 text-center text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
              Para comparar <strong>todos os formatos</strong> e níveis tecnológicos,
              explore nossa{" "}
              <Link
                href={APP_ROUTES.aparelhos}
                onClick={() =>
                  trackButtonClick("recarregavel_link_pilar_modelos", {
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
                  trackButtonClick("recarregavel_cta_modelos_agendar", {
                    section: "modelos",
                    page: PAGE_TRACKING,
                  })
                }
                className="cta-button-primary text-center"
              >
                Quero testar na avaliação gratuita
              </Link>
              <WhatsAppLeadButton
                buttonName="recarregavel_cta_modelos_whatsapp"
                leadSource="Website Aparelho Recarregavel Modelos"
                trackingParams={{
                  section: "modelos",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, quero conhecer os aparelhos auditivos recarregáveis Philips HearLink na avaliação gratuita."
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
              Tecnologia que vai além da bateria
            </h2>
            <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              Autonomia sem processamento inteligente não entrega o resultado que você
              merece. Os recarregáveis HearLink combinam praticidade com recursos de
              ponta.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
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
                        <p className="text-slate-600 leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-4xl overflow-hidden shadow-xl border-8 border-white">
                <Image
                  src={CLINIC_IMAGE}
                  alt="Sala de atendimento Auditik em Piracicaba para avaliação de aparelho auditivo recarregável"
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
              O <strong>aparelho auditivo recarregável</strong> é investimento em saúde
              e qualidade de vida — o valor depende do nível HearLink e dos serviços
              inclusos. Transparência na clínica, sem preço surpresa no site.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center text-left sm:text-center">
              <Link
                href={SUBS_APARELHOS_ROUTES.preco}
                onClick={() =>
                  trackButtonClick("recarregavel_link_preco", {
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
                  trackButtonClick("recarregavel_link_financiamento", {
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
                href={SUBS_APARELHOS_ROUTES.invisivel}
                onClick={() =>
                  trackButtonClick("recarregavel_link_invisivel_silo", {
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
                href={SUBS_APARELHOS_ROUTES.bluetooth}
                onClick={() =>
                  trackButtonClick("recarregavel_link_bluetooth", {
                    section: "investimento",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
              >
                <span className="material-symbols-outlined">bluetooth</span>
                Aparelho com Bluetooth
              </Link>
              <Link
                href={SUBS_APARELHOS_ROUTES.idosos}
                onClick={() =>
                  trackButtonClick("recarregavel_link_idosos", {
                    section: "investimento",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
              >
                <span className="material-symbols-outlined">elderly</span>
                Aparelho para idosos
              </Link>
              <Link
                href={SUBS_APARELHOS_ROUTES.piracicaba}
                onClick={() =>
                  trackButtonClick("recarregavel_link_piracicaba", {
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
              Chega de depender de pilha — descubra o recarregável certo para você
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Agende uma <strong>avaliação auditiva gratuita</strong> em Piracicaba e
              teste, com fonoaudiólogos, qual{" "}
              <strong>aparelho auditivo recarregável</strong> Philips HearLink faz
              sentido para sua audição e sua rotina.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("recarregavel_cta_intermediario_contato", {
                    section: "cta_intermediario",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex min-h-11 items-center justify-center bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-3 px-8 rounded-full transition-colors"
              >
                Agendar avaliação gratuita
              </Link>
              <WhatsAppLeadButton
                buttonName="recarregavel_cta_intermediario_whatsapp"
                leadSource="Website Aparelho Recarregavel CTA Intermediário"
                trackingParams={{
                  section: "cta_intermediario",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, gostaria de agendar uma avaliação gratuita para aparelho auditivo recarregável."
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
              Dúvidas frequentes sobre aparelho auditivo recarregável
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
              alt="Aparelho auditivo recarregável Philips HearLink na Auditik Piracicaba"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="container-wide relative z-10 text-center max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Agende sua avaliação auditiva gratuita e conheça o aparelho recarregável
              Philips HearLink
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed">
              O primeiro passo não é escolher o carregador no site — é{" "}
              <strong>entender sua audição</strong> com quem acompanha reabilitação
              auditiva todos os dias. Na <strong>Auditik</strong>, em{" "}
              <strong>Piracicaba</strong>, você encontra{" "}
              <strong>Philips HearLink</strong> recarregável, avaliação{" "}
              <strong>sem compromisso</strong> e equipe que traduz tecnologia em{" "}
              <strong>qualidade de vida</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("recarregavel_final_cta_contato", {
                    section: "final_cta",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-3 px-6 sm:px-8 rounded-full transition-colors"
              >
                Agendar minha avaliação
              </Link>
              <WhatsAppLeadButton
                buttonName="recarregavel_final_cta_whatsapp"
                leadSource="Website Aparelho Recarregavel"
                trackingParams={{
                  section: "final_cta",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, quero agendar minha avaliação auditiva gratuita para aparelho auditivo recarregável."
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
