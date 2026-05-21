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

const PAGE_TRACKING = "subs-aparelhos/idosos";

const HERO_IMAGE =
  "/images/philips/optimized/background/PHS_HL50_miniRITE_Lifestyle_iPhone14_MS_0059_AS_485092853.jpg";

const CTA_BACKGROUND =
  "/images/philips/optimized/background/PHS_HL50_miniRITE_Portable_Charger_Lifestyle_blue_shadows_GettyImages-1530702944_MS_0255.jpg";

const CLINIC_IMAGE = "/images/auditik/background/sala_atendimento.webp";

const IMAGE_MINIBTE_PRO =
  "/images/philips/optimized/aasi/Philips_HearLink_Pro_miniBTE_T_hook_BR_TP_Left_1200x1200px_Original file.webp";

const IMAGE_HEARLINK50 =
  "/images/philips/optimized/aasi/Philips_HearLink50_miniRITE_H1-2024_Left_C090Beige_LEDgreen_Speaker60_OpenBassDome_1200x1200px_Original file.webp";

const IMAGE_MINIRITE_PRO =
  "/images/philips/optimized/aasi/Philips_HearLink_Pro_miniRITE_T_Speaker60_OpenBassDome_BE_TP_Left_1200x1200px_Original file.webp";

const IMAGE_CHARGER_H1 =
  "/images/philips/optimized/acessories/Philips_Charger_H1-2024_Angled_w_miniRITE_C092_w_USB-cable_1200x1200px_Original file.webp";

const IMAGE_CHARGER_PLUS =
  "/images/philips/optimized/acessories/Philips_Charger_Plus_H2-2024_OpenLid_Angled_w_miniRITE_C092_w_USB-cable_1200x1200px_Original file.webp";

const faqItems = [
  {
    question: "Qual a diferença entre presbiacusia e surdez?",
    answer:
      "Presbiacusia é a perda auditiva gradual relacionada ao envelhecimento — a forma mais comum na terceira idade. Surdez é um termo mais amplo que pode ter várias causas. A avaliação auditiva na Auditik define o grau de perda e o tratamento mais adequado.",
  },
  {
    question: "Como convencer um idoso a usar aparelho auditivo?",
    answer:
      "Foque em qualidade de vida, não em “defeito”. Ofereça acompanhamento na consulta, demonstração sem compromisso e paciência nas primeiras semanas de adaptação. Na Auditik, familiares são bem-vindos e ajudamos a traduzir a tecnologia em benefícios concretos.",
  },
  {
    question: "Aparelho recarregável é melhor que pilha para idosos?",
    answer:
      "Em muitos casos sim, pelo manuseio mais simples — basta colocar no carregador, sem trocar microbaterias. A decisão final depende do formato indicado no exame auditivo e da rotina da pessoa.",
  },
  {
    question: "Qual o melhor aparelho auditivo para idosos?",
    answer:
      "Não existe um ranking universal. O melhor é o indicado após audiometria, considerando grau de perda, facilidade de manuseio, rotina social e preferências. Na Auditik, somos distribuidor autorizado Philips HearLink e personalizamos a indicação.",
  },
  {
    question: "Idoso pode usar aparelho auditivo com Bluetooth?",
    answer:
      "Sim, quando indicado pelo profissional. O app HearLink 2 permite ajustes pelo celular — o familiar pode ajudar no início da adaptação. A avaliação gratuita define se a conectividade faz sentido para o perfil.",
  },
  {
    question: "Quanto custa um aparelho auditivo para idoso?",
    answer:
      "O valor depende do nível tecnológico HearLink, formato e serviços inclusos. Na consulta explicamos investimento, parcelamento em até 21x sem juros e Crédito BB. Veja também nossos guias de preço e financiamento no site.",
  },
  {
    question: "A avaliação auditiva na Auditik é gratuita?",
    answer:
      "Sim, sem compromisso, para indicar o aparelho auditivo para idosos mais adequado, com expectativa realista de resultado e próximo passo sem pressão.",
  },
  {
    question: "Posso ir sozinho representando meu pai ou minha mãe?",
    answer:
      "Sim, mas o ideal é trazer o idoso para teste e adaptação. Orientamos familiar e usuário juntos — muitas famílias começam com uma visita de reconhecimento e retornam com o ente querido.",
  },
];

const trustCards = [
  {
    icon: "family_restroom",
    title: "Para toda a família",
    text: "Consulta acolhedora; familiar pode acompanhar, tirar dúvidas e participar da decisão com tranquilidade.",
  },
  {
    icon: "hearing",
    title: "Philips autorizado",
    text: "SpeechSensor, AutoSense, HearLink 2 e linha recarregável original — tecnologia de ponta com suporte clínico.",
  },
  {
    icon: "location_on",
    title: "Piracicaba e região",
    text: "Avaliação auditiva gratuita presencial com equipe fonoaudiológica especializada em reabilitação auditiva.",
  },
];

const presbiacusiaImpacts = [
  {
    title: "Isolamento social",
    text: "Deixa de ir à igreja, ao clube ou ao aniversário — “é muito barulho” vira desculpa para não sair.",
  },
  {
    title: "Mal-entendidos na família",
    text: "Parece desatento, irritado ou que “não quer conversar” — quando na verdade não ouviu metade da frase.",
  },
  {
    title: "Solidão e humor",
    text: "Frustração, tristeza ou sensação de estar “fora” da própria casa, mesmo cercado de quem ama.",
  },
  {
    title: "Segurança",
    text: "Não ouvir campainha, portão, carro na garagem ou avisos importantes no dia a dia.",
  },
  {
    title: "Cognição",
    text: "Estudos associam perda auditiva não tratada a maior risco de declínio de memória e atenção — tratar a audição é cuidar da saúde integral.",
  },
];

const sinaisAlerta = [
  "Pede com frequência: “Como?”, “Pode repetir?” ou responde fora de contexto.",
  "Aumenta muito o volume da TV ou rádio — e ainda reclama que “não entende”.",
  "Evita telefonemas ou vídeo chamadas com netos e familiares.",
  "Parece cansada após conversas em restaurante, festa ou reunião.",
  "Acusa os outros de “murmurar” ou de falar baixo demais.",
  "Deixa de participar de decisões simples por não pegar metade da conversa.",
];

const idealCriteria = [
  {
    icon: "graphic_eq",
    title: "Volume e clareza automáticos",
    text: "AutoSense reconhece o ambiente (casa, rua, restaurante) e ajusta sozinho. SpeechSensor prioriza vozes em locais ruidosos — onde o idoso mais sofre.",
  },
  {
    icon: "front_hand",
    title: "Facilidade de manuseio",
    text: "Formatos retroauriculares (miniBTE) com área de toque maior. Poucos botões; quando indicado, app HearLink 2 para ajustes discretos pelo familiar.",
  },
  {
    icon: "tune",
    title: "Adaptação progressiva",
    text: "Programação gradual para o ouvido se acostumar sem volume excessivo no primeiro dia. Retornos de ajuste na clínica sem custo adicional de consulta de ajuste.",
  },
  {
    icon: "volunteer_activism",
    title: "Acompanhamento humano",
    text: "Tecnologia Philips importa — mas quem convence o idoso a usar é confiança no profissional e paciência da família nas primeiras semanas.",
  },
];

const rechargeableBenefits = [
  {
    title: "Rotina simples",
    text: "À noite, coloca no carregador na mesa de cabeceira; de manhã, está pronto para o dia.",
  },
  {
    title: "Recarga rápida",
    text: "Cerca de 30 minutos no carregador podem oferecer até 8 horas extras — imprevistos sem drama.",
  },
  {
    title: "Menos dependência do familiar",
    text: "Sem comprar e trocar pilha 10 ou 312 toda semana — tarefa difícil com artrite, tremor ou baixa visão.",
  },
  {
    title: "Carregadores oficiais Philips",
    text: "Charger H1, Charger Plus e Pro Charger com LED e proteção durante a carga.",
  },
  {
    title: "Sustentabilidade",
    text: "Menos descarte de pilhas e menos abandono do aparelho por “pilha acabou”.",
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
    aspect: "Para idosos",
    disposable: "Exige visão e destreza fina dos dedos",
    rechargeable: "Mais acessível para terceira idade",
  },
  {
    aspect: "Cuidador",
    disposable: "Familiar precisa monitorar estoque de pilhas",
    rechargeable: "Hábito fixo: mesa de cabeceira à noite",
  },
  {
    aspect: "Indicação",
    disposable: "Alguns formatos intra ou preferência pessoal",
    rechargeable: "Prioridade em praticidade e adesão ao uso",
  },
];

const philipsProducts = [
  {
    name: "Philips HearLink Pro miniBTE T",
    badge: "Recarregável",
    image: IMAGE_MINIBTE_PRO,
    alt: "Philips HearLink Pro miniBTE T para idosos na Auditik Piracicaba",
    what: "Formato retroauricular compacto, robusto e de manuseio mais fácil que microcanais profundos.",
    forWho:
      "Idosos ou quem precisa de maior área de toque — quando praticidade pesa mais que discrição extrema no canal.",
    highlights: ["Pro Charger miniBTE", "Manuseio acessível", "Potência estável"],
    ideal:
      "Quando familiar e profissional priorizam colocar e retirar o aparelho com segurança.",
  },
  {
    name: "Philips HearLink 50 miniRITE",
    badge: "Recarregável",
    image: IMAGE_HEARLINK50,
    alt: "Philips HearLink 50 miniRITE recarregável para terceira idade na Auditik",
    what: "Aparelho discreto atrás da orelha, com opção recarregável e conectividade para o dia a dia.",
    forWho:
      "Idosos ativos que socializam e querem equilíbrio entre tecnologia, discrição e recarga simples.",
    highlights: ["HearLink 2", "Processamento inteligente", "Charger H1 ou Plus"],
    ideal: "Quando busca discrição sem abrir mão da praticidade da bateria integrada.",
  },
  {
    name: "Philips HearLink miniRITE Pro",
    badge: "Recarregável",
    image: IMAGE_MINIRITE_PRO,
    alt: "Philips HearLink Pro miniRITE para idosos com rotina social intensa",
    what: "Topo de linha miniRITE com SpeechSensor e AutoSense para ambientes exigentes.",
    forWho:
      "Quem frequenta restaurantes, igreja, clubes e reuniões familiares — onde a fala em ruído é o maior desafio.",
    highlights: ["SpeechSensor", "AutoSense", "Pro Charger Plus"],
    ideal:
      "Quando o isolamento veio da dificuldade em ouvir em grupo, não da falta de vontade de sair.",
  },
];

const chargerProducts = [
  {
    name: "Charger H1 miniRITE",
    image: IMAGE_CHARGER_H1,
    alt: "Charger H1 Philips para aparelho auditivo de idosos",
    description:
      "Base compacta na mesa de cabeceira — rotina noturna simples para o idoso e tranquilidade para o cuidador.",
  },
  {
    name: "Charger Plus H2",
    image: IMAGE_CHARGER_PLUS,
    alt: "Charger Plus H2 Philips portátil para aparelhos de idosos",
    description:
      "Estojo com bateria interna para passeios e viagens — recarrega o par sem depender de tomada.",
  },
];

const clinicSteps = [
  {
    step: "1",
    title: "Agendamento da avaliação auditiva gratuita",
    text: "Presencial em Piracicaba, Americana, São Pedro ou Charqueada; ou contato inicial pelo WhatsApp — traga quem você ama.",
  },
  {
    step: "2",
    title: "Avaliação com familiar",
    text: "Audiometria, anamnese e entendimento da rotina — manuseio, medos, expectativas e papel do cuidador.",
  },
  {
    step: "3",
    title: "Indicação personalizada",
    text: "Formato, recarregável ou pilha, tecnologia Philips HearLink — conforme grau de perda e estilo de vida.",
  },
  {
    step: "4",
    title: "Demonstração, programação e adaptação",
    text: "Programação individual, retornos de ajuste e suporte para família e usuário — sem custo adicional de consulta de ajuste.",
  },
];

const siloLinks = [
  {
    href: SUBS_APARELHOS_ROUTES.recarregavel,
    icon: "battery_charging_full",
    label: "Aparelho recarregável",
    tracking: "idosos_link_recarregavel",
  },
  {
    href: SUBS_APARELHOS_ROUTES.philipsHearingSolutions,
    icon: "verified",
    label: "Philips Hearing Solutions",
    tracking: "idosos_link_philips",
  },
  {
    href: SUBS_APARELHOS_ROUTES.piracicaba,
    icon: "location_on",
    label: "Aparelhos em Piracicaba",
    tracking: "idosos_link_piracicaba",
  },
  {
    href: SUBS_APARELHOS_ROUTES.preco,
    icon: "payments",
    label: "Preço de aparelho auditivo",
    tracking: "idosos_link_preco",
  },
  {
    href: SUBS_APARELHOS_ROUTES.financiamento,
    icon: "credit_card",
    label: "Financiamento (21x e Crédito BB)",
    tracking: "idosos_link_financiamento",
  },
  {
    href: SUBS_APARELHOS_ROUTES.invisivel,
    icon: "visibility_off",
    label: "Aparelho invisível",
    tracking: "idosos_link_invisivel",
  },
  {
    href: SUBS_APARELHOS_ROUTES.bluetooth,
    icon: "bluetooth",
    label: "Aparelho com Bluetooth",
    tracking: "idosos_link_bluetooth",
  },
  {
    href: SUBS_APARELHOS_ROUTES.manutencaoAjuste,
    icon: "build",
    label: "Manutenção e ajuste",
    tracking: "idosos_link_manutencao",
  },
];

export default function AparelhoAuditivoParaIdososPage() {
  const seo = getSEOMeta({
    title: "Aparelho auditivo para idosos | Philips HearLink na Auditik Piracicaba",
    description:
      "Aparelho auditivo para idosos em Piracicaba: presbiacusia, manuseio fácil e modelos recarregáveis Philips. Guia para familiares e cuidadores. Avaliação auditiva gratuita na Auditik. Agende.",
    canonical: "https://www.auditik.com.br/aparelho-auditivo-para-idosos/",
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
        name: "Aparelho auditivo para idosos",
        item: "https://www.auditik.com.br/aparelho-auditivo-para-idosos/",
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
                Terceira idade · Familiares e cuidadores · Avaliação gratuita
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.05] mb-6">
                Aparelho auditivo para idosos:{" "}
                <span className="text-auditik-blue">
                  devolva presença, conversa e tranquilidade
                </span>{" "}
                à família
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-4">
                Você percebeu que seu pai, sua mãe ou quem você cuida passou a evitar
                encontros, pede para repetir o que foi dito ou parece “distraído” na
                mesa do jantar? Muitas vezes isso não é teimosia nem esquecimento — é{" "}
                <strong>perda auditiva</strong> que vai isolando a pessoa sem que ela
                consiga nomear o que sente. Um{" "}
                <strong>aparelho auditivo para idosos</strong>, bem indicado e com
                acompanhamento, pode devolver participação na família, segurança no dia
                a dia e alívio para quem ama e acompanha de perto. Na{" "}
                <strong>Auditik Soluções Auditivas</strong>, em{" "}
                <strong>Piracicaba-SP</strong>, somos{" "}
                <strong>distribuidor autorizado Philips Hearing Solutions</strong> e
                ajudamos familiares a dar o próximo passo com clareza, sem pressão.
              </p>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                Conheça nossa seleção completa de{" "}
                <Link
                  href={APP_ROUTES.aparelhos}
                  onClick={() =>
                    trackButtonClick("idosos_link_pilar_aparelhos", {
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
                    trackButtonClick("idosos_cta_agendar", {
                      section: "hero",
                      page: PAGE_TRACKING,
                    })
                  }
                  className="cta-button-primary text-center"
                >
                  Agendar avaliação gratuita
                </Link>
                <WhatsAppLeadButton
                  buttonName="idosos_cta_whatsapp"
                  leadSource="Website Aparelho Para Idosos Hero"
                  trackingParams={{
                    section: "hero",
                    page: PAGE_TRACKING,
                  }}
                  whatsappMessage="Olá Auditik, busco aparelho auditivo para idoso da família e gostaria de agendar avaliação gratuita."
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
                  alt="Aparelho auditivo Philips HearLink para idosos — Auditik Piracicaba"
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

        {/* Presbiacusia */}
        <section className="py-20 bg-bg-light-blue" id="presbiacusia">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Presbiacusia: quando a audição envelhece junto com a pessoa
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                A <strong>presbiacusia</strong> é a perda auditiva relacionada ao
                envelhecimento — a forma mais comum de deficiência auditiva na terceira
                idade. Ela costuma começar de modo gradual: primeiro ficam difíceis os
                sons agudos (como conversas em ambientes com barulho), depois a
                compreensão da fala em grupo, televisão ou telefone altos.
              </p>
            </div>

            <div className="max-w-3xl mx-auto mb-10">
              <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
                Impactos que o familiar enxerga antes do idoso admitir
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {presbiacusiaImpacts.map((impact) => (
                  <article
                    key={impact.title}
                    className="bg-white rounded-4xl p-6 border border-blue-50 shadow-sm flex gap-4"
                  >
                    <span className="material-symbols-outlined text-auditik-blue shrink-0">
                      warning
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
            </div>

            <p className="text-center text-slate-700 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
              Buscar avaliação não é “provar que está surdo” — é oferecer ferramenta
              para continuar participando da vida que ainda importa para ele ou ela.
            </p>
          </div>
        </section>

        {/* Sinais */}
        <section className="py-20 bg-white" id="sinais">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                  Sinais de alerta para quem cuida
                </h2>
                <h3 className="text-xl font-bold text-auditik-blue mb-4">
                  No dia a dia, observe se a pessoa:
                </h3>
                <ul className="space-y-3 mb-10">
                  {sinaisAlerta.map((sinal) => (
                    <li key={sinal} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-auditik-blue shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span className="text-slate-600 leading-relaxed">{sinal}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-bold text-auditik-blue mb-4">
                  O que fazer agora (sem confronto)
                </h3>
                <ol className="space-y-4 list-decimal list-inside text-slate-600 leading-relaxed mb-8">
                  <li>
                    <strong className="text-slate-900">Converse com calma</strong> —
                    foque em qualidade de vida, não em “defeito”.
                  </li>
                  <li>
                    <strong className="text-slate-900">
                      Ofereça companhia na avaliação
                    </strong>{" "}
                    — na Auditik familiares são bem-vindos na consulta.
                  </li>
                  <li>
                    <strong className="text-slate-900">
                      Agende avaliação auditiva gratuita
                    </strong>{" "}
                    — o exame mostra o grau de perda e o que é realista esperar do
                    aparelho.
                  </li>
                </ol>
                <Link
                  href={APP_ROUTES.contato}
                  onClick={() =>
                    trackButtonClick("idosos_cta_sinais_agendar", {
                      section: "sinais",
                      page: PAGE_TRACKING,
                    })
                  }
                  className="cta-button-primary inline-flex"
                >
                  Agendar com acompanhante
                </Link>
              </div>

              <div className="bg-bg-light-blue rounded-4xl p-8 border border-blue-50">
                <span className="material-symbols-outlined text-5xl text-auditik-blue mb-4">
                  favorite
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-4">
                  Você não está exagerando
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Muitos familiares chegam à Auditik depois de meses observando o
                  isolamento — e com medo de “criar problema” ao sugerir o aparelho. O
                  isolamento social do idoso é real, mensurável e tratável.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Nosso papel é acolher você e quem você ama, com linguagem clara e sem
                  jargão médico excessivo. O primeiro passo é uma conversa na clínica,
                  não uma compra online.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Aparelho ideal */}
        <section className="py-20 bg-bg-light-blue" id="aparelho-ideal">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                O que torna um aparelho auditivo ideal para idosos
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Não existe um único “melhor aparelho” na prateleira — existe o{" "}
                <strong>mais adequado ao exame, à rotina e às mãos</strong> de quem vai
                usar. Para a terceira idade, estes critérios pesam mais:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {idealCriteria.map((item) => (
                <article
                  key={item.title}
                  className="bg-white rounded-4xl p-8 border border-blue-50 shadow-sm"
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

        {/* Recarregável para idosos */}
        <section className="py-20 bg-white" id="recarregavel-idosos">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Por que aparelhos recarregáveis Philips são ideais para idosos
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Trocar <strong>pilhas 10 ou 312</strong> exige visão boa, dedos firmes e
                paciência — tarefa cruel para quem tem artrite, tremor ou baixa visão.
                Muitos idosos (e cuidadores) abandonam o aparelho não por falta de
                vontade, mas porque <strong>a pilha acabou</strong> ou a gavetinha não
                abriu.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
              <article className="bg-bg-light-blue rounded-4xl p-8 border border-blue-50">
                <h3 className="text-2xl font-extrabold text-auditik-blue mb-6">
                  Com o aparelho auditivo recarregável Philips HearLink
                </h3>
                <ul className="space-y-4">
                  {rechargeableBenefits.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-auditik-blue shrink-0 mt-0.5">
                        battery_charging_full
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">{item.title}</p>
                        <p className="text-slate-600 leading-relaxed text-sm">
                          {item.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="bg-bg-light-blue rounded-4xl p-8 border border-blue-50 flex flex-col justify-center">
                <p className="text-slate-600 leading-relaxed mb-4">
                  Na <strong>Auditik</strong>, como{" "}
                  <strong>distribuidor autorizado Philips Hearing Solutions</strong>,
                  fazemos demonstração presencial em Piracicaba e indicamos o{" "}
                  <strong>modelo R (recarregável)</strong> certo após audiometria — com
                  SpeechSensor, AutoSense e app <strong>HearLink 2</strong> quando
                  indicado.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Quer aprofundar rotina de carga, carregadores e comparação com pilha?
                </p>
                <Link
                  href={SUBS_APARELHOS_ROUTES.recarregavel}
                  onClick={() =>
                    trackButtonClick("idosos_link_recarregavel_corpo", {
                      section: "recarregavel-idosos",
                      page: PAGE_TRACKING,
                    })
                  }
                  className="text-auditik-blue font-bold hover:underline inline-flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                  Saiba mais sobre aparelho auditivo recarregável
                </Link>
              </article>
            </div>

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

        {/* Modelos Philips */}
        <section className="py-20 bg-bg-light-blue" id="modelos-philips">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Modelos Philips que costumamos indicar para a terceira idade
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Indicamos o <strong>aparelho auditivo para idosos</strong> certo após{" "}
                <strong>avaliação auditiva gratuita</strong> — não há modelo único para
                todos.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {philipsProducts.map((product) => (
                <article
                  key={product.name}
                  className="bg-white rounded-4xl overflow-hidden border border-blue-50 flex flex-col shadow-sm"
                >
                  <div className="relative h-56 bg-bg-light-blue">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="inline-block px-3 py-1 bg-auditik-blue/10 text-auditik-blue rounded-full text-xs font-bold uppercase tracking-wider mb-3 w-fit">
                      {product.badge}
                    </span>
                    <h3 className="text-xl font-extrabold text-auditik-blue mb-3">
                      {product.name}
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed mb-3 flex-1">
                      {product.what}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {product.highlights.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-auditik-blue/10 text-auditik-blue text-xs font-semibold rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed border-t border-blue-50 pt-3">
                      <strong>Ideal quando:</strong> {product.ideal}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {chargerProducts.map((charger) => (
                <article
                  key={charger.name}
                  className="bg-white rounded-4xl overflow-hidden border border-blue-50 flex flex-col"
                >
                  <div className="relative h-40 bg-bg-light-blue">
                    <Image
                      src={charger.image}
                      alt={charger.alt}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-extrabold text-auditik-blue mb-2">
                      {charger.name}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {charger.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Processo Auditik */}
        <section className="py-20 bg-white" id="processo-auditik">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                  Como a Auditik acolhe familiares e idosos
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  Você não precisa decidir sozinho. Muitas famílias chegam com culpa por
                  ter demorado — nosso papel é orientar com respeito e clareza sobre o{" "}
                  <strong>aparelho auditivo para idosos</strong> mais adequado.
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
                  alt="Sala de atendimento Auditik em Piracicaba para avaliação de aparelho auditivo para idosos"
                  width={800}
                  height={600}
                  className="w-full h-[320px] md:h-[420px] object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA intermediário */}
        <section className="py-16 bg-auditik-blue text-white">
          <div className="container-wide text-center max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              O primeiro passo é uma conversa — não uma compra online
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Agende uma <strong>avaliação auditiva gratuita</strong> em Piracicaba.
              Traga quem você ama; saia com clareza sobre{" "}
              <strong>aparelho auditivo para idosos</strong>, expectativa realista e
              próximo passo sem pressão.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("idosos_cta_intermediario_contato", {
                    section: "cta_intermediario",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex min-h-11 items-center justify-center bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-3 px-8 rounded-full transition-colors"
              >
                Agendar avaliação gratuita
              </Link>
              <WhatsAppLeadButton
                buttonName="idosos_cta_intermediario_whatsapp"
                leadSource="Website Aparelho Para Idosos CTA Intermediário"
                trackingParams={{
                  section: "cta_intermediario",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, gostaria de agendar avaliação gratuita para aparelho auditivo para idoso da família."
                className="inline-flex min-h-11 items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full border border-white/30 transition-colors"
              >
                Falar com especialista
              </WhatsAppLeadButton>
            </div>
          </div>
        </section>

        {/* Links silo */}
        <section className="py-20 bg-bg-light-blue" id="mais-informacoes">
          <div className="container-wide max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Mais informações sobre Aparelhos Auditivos
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-4">
              Explore guias complementares sobre investimento, tecnologia e formatos.
              Para visão geral da linha Philips HearLink, volte à página pilar.
            </p>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              O aparelho invisível (IIC/CIC) nem sempre é o mais indicado para idosos —
              priorizamos manuseio e adesão; a avaliação define o formato certo.
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
                trackButtonClick("idosos_link_pilar_silo", {
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
              Dúvidas frequentes sobre aparelho auditivo para idosos
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
                  <p className="text-slate-600 leading-relaxed">
                    {faq.question ===
                    "Quanto custa um aparelho auditivo para idoso?" ? (
                      <>
                        O valor depende do nível tecnológico HearLink, formato e
                        serviços inclusos. Na consulta explicamos investimento e opções
                        de pagamento. Veja também nosso guia de{" "}
                        <Link
                          href={SUBS_APARELHOS_ROUTES.preco}
                          onClick={() =>
                            trackButtonClick("idosos_link_preco_faq", {
                              section: "faq",
                              page: PAGE_TRACKING,
                            })
                          }
                          className="text-auditik-blue font-bold hover:underline"
                        >
                          preço de aparelho auditivo
                        </Link>{" "}
                        e{" "}
                        <Link
                          href={SUBS_APARELHOS_ROUTES.financiamento}
                          onClick={() =>
                            trackButtonClick("idosos_link_financiamento_faq", {
                              section: "faq",
                              page: PAGE_TRACKING,
                            })
                          }
                          className="text-auditik-blue font-bold hover:underline"
                        >
                          financiamento de aparelho auditivo
                        </Link>
                        .
                      </>
                    ) : (
                      faq.answer
                    )}
                  </p>
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
              alt="Aparelho auditivo para idosos Philips HearLink na Auditik Piracicaba"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="container-wide relative z-10 text-center max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Devolva à pessoa idosa a alegria de ouvir a família — comece pela
              avaliação gratuita
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed">
              Na <strong>Auditik</strong>, em <strong>Piracicaba</strong>, você encontra{" "}
              <strong>Philips HearLink</strong>, equipe fonoaudiológica e ambiente
              pensado para <strong>adultos, idosos e familiares</strong>. O isolamento
              pode diminuir — o primeiro passo é agendar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("idosos_final_cta_contato", {
                    section: "final_cta",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-3 px-6 sm:px-8 rounded-full transition-colors"
              >
                Agendar minha avaliação
              </Link>
              <WhatsAppLeadButton
                buttonName="idosos_final_cta_whatsapp"
                leadSource="Website Aparelho Para Idosos"
                trackingParams={{
                  section: "final_cta",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá Auditik, quero agendar avaliação auditiva gratuita para aparelho auditivo para idoso da família."
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
