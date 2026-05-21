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

const PAGE_TRACKING = "subs-aparelhos/manutencao-ajuste";

const HERO_IMAGE =
  "/images/philips/optimized/background/PHS_HL50_miniRITE_Portable_Charger_Lifestyle_blue_shadows_GettyImages-1530702944_MS_0255.jpg";

const CTA_BACKGROUND =
  "/images/philips/optimized/background/PHS_HL50_miniRITE_Portable_Charger_Lifestyle_blue_shadows_GettyImages-1530702944_MS_0255.jpg";

const CLINIC_IMAGE = "/images/auditik/background/sala_atendimento.webp";

const faqItems = [
  {
    question: "Com que frequência devo trocar o filtro de cera?",
    answer:
      "Depende da produção de cera; em geral a cada 1 a 4 semanas. Troque ao notar som abafado ou quando o filtro estiver escuro ou entupido.",
  },
  {
    question: "Posso limpar o aparelho auditivo com álcool?",
    answer:
      "Não no corpo do aparelho nem nos microfones. Use pano seco e escova específica; na dúvida, traga à Auditik em Piracicaba.",
  },
  {
    question: "De quanto em quanto tempo fazer revisão técnica?",
    answer:
      "Recomendamos a cada 4 a 6 meses, ou antes se houver queixa de som, volume ou desconforto.",
  },
  {
    question: "A Auditik conserta aparelho de outra marca?",
    answer:
      "Fazemos limpeza, triagem e orientação para qualquer marca. Reparos profundos dependem de peças e autorização do fabricante; a linha Philips HearLink tem fluxo completo na clínica.",
  },
  {
    question: "Por que o aparelho auditivo apita?",
    answer:
      "Geralmente é feedback por encaixe do molde, cera ou ganho alto. O fonoaudiólogo ajusta na consulta — não aumente o volume por hábito.",
  },
  {
    question: "Reprogramação é a mesma coisa que aumentar o volume?",
    answer:
      "Não. Reprogramação recalibra frequências e programas conforme seu exame atual; o botão de volume não substitui o ajuste clínico.",
  },
  {
    question: "O desumidificador é obrigatório?",
    answer:
      "Altamente recomendado em clima quente e úmido como Piracicaba; previne falhas por umidade e prolonga a vida útil da eletrônica.",
  },
  {
    question: "Como agendar manutenção em Piracicaba?",
    answer:
      "Pelo site de contato, WhatsApp ou telefone (19) 3377-6941. Traga o aparelho e descreva os sintomas para agilizar o atendimento.",
  },
];

const trustCards = [
  {
    icon: "location_on",
    title: "Assistência em Piracicaba",
    text: "Clínica presencial para limpeza profunda, ajuste fino e diagnóstico quando o aparelho não rende como antes.",
  },
  {
    icon: "verified",
    title: "Distribuidor Philips autorizado",
    text: "Peças, acessórios e reprogramação oficial da linha HearLink com equipe treinada.",
  },
  {
    icon: "medical_services",
    title: "Fonoaudiólogo no ajuste",
    text: "Revisão da audição e do ganho — não só conserto mecânico — para você ouvir bem de novo.",
  },
];

const rotinaDiaria = [
  "Ao retirar o aparelho: limpe o invólucro com pano seco e macio; nunca use álcool, solvente ou água em excesso no corpo do aparelho.",
  "Microfone e saída de som: use a escova fina fornecida na adaptação; movimentos suaves, sem forçar.",
  "Filtros de cera (wax guard): troque conforme orientação (em média a cada 1–4 semanas). Filtro escurecido ou entupido = troca imediata.",
  "Desumidificação noturna: coloque os aparelhos no desumidificador (sílica ou eletrônico com UV) todas as noites — essencial em Piracicaba pelo calor e suor.",
  "Bateria recarregável: encaixe na base à noite; modelos com pilha: abra a gaveta ao guardar no desumidificador.",
  "Manhã: inspecione se o som voltou ao normal; se não, agende revisão antes de conviver com volume baixo.",
];

const cuidadosCards = [
  {
    icon: "cleaning_services",
    title: "Limpeza caseira",
    text: "Remove suor e poeira externa; evita entupimento prematuro dos microfones.",
  },
  {
    icon: "filter_alt",
    title: "Filtro de cera",
    text: "Barreira que protege o receptor; troca barata com enorme impacto na clareza do som.",
  },
  {
    icon: "water_drop",
    title: "Desumidificador",
    text: "Combate a umidade — principal inimigo da eletrônica do aparelho auditivo.",
  },
  {
    icon: "inventory_2",
    title: "Estojo fechado",
    text: "Transporte seguro; evita queda, poeira e umidade na bolsa.",
  },
];

const sinaisManutencao = [
  {
    icon: "volume_off",
    title: "Chiado ou estalo",
    text: "Pode ser umidade, microfone obstruído ou componente com desgaste.",
  },
  {
    icon: "hearing_disabled",
    title: "Volume de repente baixo",
    text: "Filtro, cera no molde ou necessidade de reprogramação do ganho.",
  },
  {
    icon: "notifications_active",
    title: "Apito (feedback)",
    text: "Encaixe do molde/oliva, cera ou ajuste de ganho — fonoaudiólogo resolve na consulta.",
  },
  {
    icon: "graphic_eq",
    title: "Som abafado",
    text: "Filtro saturado ou saída obstruída; limpeza profissional se persistir.",
  },
  {
    icon: "battery_alert",
    title: "Bateria que não dura",
    text: "Recarregável: contatos ou ciclo; pilha: gaveta ou umidade.",
  },
  {
    icon: "sentiment_dissatisfied",
    title: "Dor ou desconforto",
    text: "Molde pode precisar de retoque — nunca force o aparelho no ouvido.",
  },
];

const clinicSteps = [
  {
    step: "1",
    title: "Recepção e histórico",
    text: "Como está ouvindo? Em quais lugares piorou? Desde quando? Registramos para orientar o ajuste.",
  },
  {
    step: "2",
    title: "Inspeção e higiene técnica",
    text: "Limpeza profunda, troca de filtros e teste acústico básico na bancada.",
  },
  {
    step: "3",
    title: "Audiometria de controle",
    text: "Quando indicada, comparamos com exame anterior para detectar mudança na perda auditiva.",
  },
  {
    step: "4",
    title: "Reprogramação e teste real",
    text: "Ajuste de ganho, programas (ruído, TV, restaurante) e orientação ao familiar.",
  },
];

const labSteps = [
  {
    step: "1",
    title: "Agendamento",
    text: "WhatsApp, telefone ou formulário; descreva o sintoma (chiado, sem som, bateria, etc.).",
  },
  {
    step: "2",
    title: "Triagem na recepção",
    text: "Registro do modelo, idade do aparelho e data da última revisão.",
  },
  {
    step: "3",
    title: "Avaliação + bancada",
    text: "Testes na clínica, limpeza profunda; decisão entre ajuste em consultório ou envio ao laboratório.",
  },
  {
    step: "4",
    title: "Laboratório Philips",
    text: "Reparo, troca de componentes (microfone, receptor, carcaça), firmware quando aplicável.",
  },
  {
    step: "5",
    title: "Devolução e reprogramação",
    text: "Entrega com teste de fala, orientação de cuidados e data para próxima revisão.",
  },
];

const servicosTabela = [
  {
    servico: "Limpeza profissional e filtros",
    philips: "Sim",
    outras: "Sim",
  },
  {
    servico: "Ajuste fino / reprogramação",
    philips: "Sim (software oficial)",
    outras: "Orientação; encaminhamento se fora de escopo",
  },
  {
    servico: "Troca de receptor, molde, tubo",
    philips: "Sim (peças Philips)",
    outras: "Avaliação caso a caso",
  },
  {
    servico: "Reparo eletrônico em laboratório",
    philips: "Sim (autorizado)",
    outras: "Triagem; indicação da rede do fabricante",
  },
  {
    servico: "Acessórios (filtros, desumidificador, carregador)",
    philips: "Estoque Philips",
    outras: "Orientação de compatibilidade",
  },
  {
    servico: "Atualização app HearLink 2",
    philips: "Sim, com treinamento",
    outras: "—",
  },
];

const philipsTech = [
  {
    icon: "graphic_eq",
    title: "SpeechSensor",
    text: "Prioriza voz em ruído; após reparo, recalibração garante que o recurso volte a responder ao ambiente.",
  },
  {
    icon: "auto_awesome",
    title: "AutoSense",
    text: "Programas automáticos dependem de software íntegro; revisões evitam travamento em um único modo.",
  },
  {
    icon: "smartphone",
    title: "HearLink 2",
    text: "Bluetooth e ajustes pelo celular; na manutenção verificamos pareamento e bateria dos acessórios.",
  },
];

const acessoriosCards = [
  {
    icon: "dry",
    title: "Desumidificador",
    text: "Eletrônico com UV ou sílica — venda e orientação de uso na Auditik.",
  },
  {
    icon: "build",
    title: "Kit de limpeza e filtros",
    text: "Reposição programada na revisão técnica periódica.",
  },
  {
    icon: "battery_charging_full",
    title: "Carregador portátil Philips",
    text: "Para modelos recarregáveis miniRITE — praticidade no dia a dia.",
  },
];

const porQueAuditik = [
  {
    icon: "local_hospital",
    title: "Clínica, não só loja",
    text: "Fonoaudiólogo em cada etapa de ajuste; foco em audição, não só em consertar peça.",
  },
  {
    icon: "location_on",
    title: "Piracicaba e região",
    text: "Atendimento presencial com equipe especializada em saúde auditiva.",
  },
  {
    icon: "event_repeat",
    title: "Acompanhamento contínuo",
    text: "Revisões programadas evitam o aparelho parado na gaveta quando o som decepciona.",
  },
];

const siloLinks = [
  {
    href: SUBS_APARELHOS_ROUTES.philipsHearingSolutions,
    icon: "verified",
    label: "Philips Hearing Solutions",
    tracking: "manutencao_link_philips",
  },
  {
    href: SUBS_APARELHOS_ROUTES.piracicaba,
    icon: "location_on",
    label: "Aparelhos em Piracicaba",
    tracking: "manutencao_link_piracicaba",
  },
  {
    href: SUBS_APARELHOS_ROUTES.comoSaberPrecisa,
    icon: "help",
    label: "Como saber se precisa",
    tracking: "manutencao_link_como_saber",
  },
  {
    href: SUBS_APARELHOS_ROUTES.idosos,
    icon: "elderly",
    label: "Aparelho para idosos",
    tracking: "manutencao_link_idosos",
  },
  {
    href: SUBS_APARELHOS_ROUTES.recarregavel,
    icon: "battery_charging_full",
    label: "Aparelho recarregável",
    tracking: "manutencao_link_recarregavel",
  },
  {
    href: SUBS_APARELHOS_ROUTES.preco,
    icon: "payments",
    label: "Preço de aparelho auditivo",
    tracking: "manutencao_link_preco",
  },
  {
    href: SUBS_APARELHOS_ROUTES.financiamento,
    icon: "credit_card",
    label: "Financiamento",
    tracking: "manutencao_link_financiamento",
  },
  {
    href: SUBS_APARELHOS_ROUTES.bluetooth,
    icon: "bluetooth",
    label: "Aparelho com Bluetooth",
    tracking: "manutencao_link_bluetooth",
  },
];

export default function ManutencaoEAjusteDeAparelhoAuditivoPage() {
  const seo = getSEOMeta({
    title: "Manutenção e ajuste de aparelho auditivo | Assistência Auditik Piracicaba",
    description:
      "Limpeza, revisão técnica, reprogramação e laboratório Philips na Auditik. Atendemos qualquer marca em Piracicaba-SP. Agende manutenção ou avaliação gratuita.",
    canonical: "https://www.auditik.com.br/manutencao-e-ajuste-de-aparelho-auditivo/",
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
        name: "Manutenção e ajuste de aparelho auditivo",
        item: "https://www.auditik.com.br/manutencao-e-ajuste-de-aparelho-auditivo/",
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
                Assistência técnica · Pós-venda · Piracicaba-SP
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.05] mb-6">
                Manutenção e ajuste de aparelho auditivo:{" "}
                <span className="text-auditik-blue">
                  cuidados em casa e suporte especializado
                </span>{" "}
                na Auditik
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-4">
                Se você já usa um aparelho auditivo — seja Philips, de outra marca ou
                adquirido em outra clínica — sabe que{" "}
                <strong>manutenção e ajuste de aparelho auditivo</strong> não são
                detalhes: são o que mantém o som claro, o conforto no ouvido e a
                confiança no dia a dia. Na <strong>Auditik Soluções Auditivas</strong>,
                em <strong>Piracicaba-SP</strong>, oferecemos orientação de cuidados em
                casa, revisão técnica com fonoaudiólogo e laboratório para a linha{" "}
                <strong>Philips Hearing Solutions</strong> (SpeechSensor, AutoSense e
                app <strong>HearLink 2</strong>), com acolhimento profissional para quem
                busca assistência na região — inclusive quem deseja conhecer um
                acompanhamento mais completo.
              </p>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                Conheça nossa seleção completa de{" "}
                <Link
                  href={APP_ROUTES.aparelhos}
                  onClick={() =>
                    trackButtonClick("manutencao_link_pilar_aparelhos", {
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
                    trackButtonClick("manutencao_cta_agendar", {
                      section: "hero",
                      page: PAGE_TRACKING,
                    })
                  }
                  className="cta-button-primary text-center"
                >
                  Agendar manutenção ou avaliação
                </Link>
                <WhatsAppLeadButton
                  buttonName="manutencao_cta_whatsapp"
                  leadSource="Website Manutenção Aparelho Hero"
                  trackingParams={{
                    section: "hero",
                    page: PAGE_TRACKING,
                  }}
                  whatsappMessage="Olá! Preciso de manutenção ou ajuste do meu aparelho auditivo em Piracicaba."
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
                  alt="Manutenção e ajuste de aparelho auditivo Philips HearLink na Auditik Piracicaba"
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

        {/* Cuidados diários */}
        <section className="py-20 bg-bg-light-blue" id="cuidados-diarios">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Cuidados essenciais diários: limpeza caseira e troca de filtros de cera
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                A maior parte dos problemas — som abafado, chiado, apito — começa com{" "}
                <strong>cera, umidade ou filtro saturado</strong>. Uma rotina simples,
                feita em casa, protege microfones e prolonga a vida útil, sem substituir
                a revisão na clínica.
              </p>
            </div>

            <div className="max-w-3xl mx-auto mb-12">
              <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
                Rotina recomendada em 6 passos
              </h3>
              <ol className="space-y-4">
                {rotinaDiaria.map((passo, index) => (
                  <li
                    key={passo}
                    className="flex items-start gap-4 bg-white rounded-4xl p-6 border border-blue-50 shadow-sm"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-auditik-blue text-white font-bold">
                      {index + 1}
                    </span>
                    <span className="text-slate-600 leading-relaxed pt-1.5">
                      {passo}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {cuidadosCards.map((card) => (
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
                  <p className="text-slate-600 text-sm leading-relaxed">{card.text}</p>
                </article>
              ))}
            </div>

            <div className="max-w-3xl mx-auto bg-auditik-blue/5 rounded-4xl p-8 border border-auditik-blue/20 text-center">
              <span className="material-symbols-outlined text-4xl text-auditik-blue mb-3">
                info
              </span>
              <p className="text-slate-700 text-lg leading-relaxed font-medium">
                Se após trocar o filtro e desumidificar o problema continuar,{" "}
                <strong>não aumente o volume por hábito</strong> — isso mascara perda
                auditiva nova ou falha técnica.{" "}
                <Link
                  href={APP_ROUTES.contato}
                  onClick={() =>
                    trackButtonClick("manutencao_cta_cuidados_contato", {
                      section: "cuidados-diarios",
                      page: PAGE_TRACKING,
                    })
                  }
                  className="text-auditik-blue font-bold hover:underline"
                >
                  Agende revisão na Auditik
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Sinais manutenção */}
        <section className="py-20 bg-white" id="sinais-manutencao">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Quando a manutenção caseira não basta: sinais para procurar a clínica
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Reconhecer estes sinais evita semanas ouvindo mal — e protege o
                investimento no seu aparelho auditivo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {sinaisManutencao.map((item) => (
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
          </div>
        </section>

        {/* Revisão e reprogramação */}
        <section className="py-20 bg-bg-light-blue" id="revisao-reprogramacao">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                  Revisão técnica periódica e reprogramação: estender a vida útil do
                  aparelho
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-4">
                  Mesmo com cuidados diários, o aparelho trabalha em ambientes quentes,
                  úmidos e ruidosos. A <strong>revisão técnica periódica</strong>{" "}
                  (recomendada a cada <strong>4 a 6 meses</strong>, ou antes se notar
                  mudança) inclui inspeção de microfones e receptores, limpeza
                  profissional, troca de consumíveis, teste de desempenho e{" "}
                  <strong>reavaliação auditiva com reprogramação</strong> quando a
                  audição mudou.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  A audição não é estática: medicamentos, barulho, idade ou saúde geral
                  alteram o que você precisa ouvir.{" "}
                  <strong>Ajuste de aparelho auditivo</strong> feito só no volume do
                  botão não substitui o mapeamento com fonoaudiólogo — na Auditik usamos
                  medição clínica (incluindo verificação in-situ quando indicado) para
                  recalibrar Philips HearLink e orientar usuários de outras marcas sobre
                  o próximo passo.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  O que acontece na revisão na Auditik
                </h3>
                <div className="space-y-6">
                  {clinicSteps.map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-auditik-blue text-white font-bold">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-slate-600 leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link
                    href={APP_ROUTES.contato}
                    onClick={() =>
                      trackButtonClick("manutencao_cta_revisao", {
                        section: "revisao-reprogramacao",
                        page: PAGE_TRACKING,
                      })
                    }
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-auditik-blue text-white font-bold rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <span className="material-symbols-outlined">calendar_month</span>
                    Agendar revisão técnica
                  </Link>
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative rounded-4xl overflow-hidden shadow-xl border-8 border-white">
                  <Image
                    src={CLINIC_IMAGE}
                    alt="Revisão técnica e ajuste de aparelho auditivo na Auditik Piracicaba"
                    width={800}
                    height={600}
                    className="w-full h-[280px] md:h-[360px] object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="bg-white rounded-4xl p-8 border border-blue-50 shadow-sm">
                  <span className="material-symbols-outlined text-4xl text-auditik-blue mb-4">
                    help
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Minha audição piorou — é o aparelho?
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Pode ser os dois. Por isso a revisão combina{" "}
                    <strong>ouvido + dispositivo</strong>. Se o aparelho estiver no
                    limite da amplificação segura, orientamos opções com transparência —
                    sem pressão para trocar de marca ou modelo.
                  </p>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Familiares e cuidadores são bem-vindos na consulta para entender
                    cuidados e sinais de alerta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Laboratório Auditik */}
        <section className="py-20 bg-white" id="laboratorio-auditik">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Como funciona o suporte e laboratório técnico da Auditik para a linha
                Philips
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Como <strong>distribuidor autorizado Philips Hearing Solutions</strong>,
                a Auditik dispõe de fluxo técnico alinhado ao fabricante: diagnóstico na
                clínica, envio para análise quando necessário e retorno com{" "}
                <strong>reprogramação</strong> pelo fonoaudiólogo. Para aparelhos de{" "}
                <strong>outras marcas</strong>, oferecemos limpeza, orientação e
                encaminhamento honesto — muitos pacientes de Piracicaba nos procuram por
                não ter assistência local após a compra.
              </p>
            </div>

            <div className="max-w-4xl mx-auto mb-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                Fluxo do atendimento técnico em 5 etapas
              </h3>
              <div className="space-y-6">
                {labSteps.map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-4 bg-bg-light-blue rounded-4xl p-6 border border-blue-50"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-auditik-blue text-white font-bold text-lg">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-slate-600 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-5xl mx-auto mb-16 overflow-x-auto">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                Serviços disponíveis: Philips HearLink vs outras marcas
              </h3>
              <table className="w-full min-w-[640px] border-collapse bg-bg-light-blue rounded-4xl overflow-hidden border border-blue-50 shadow-sm">
                <thead>
                  <tr className="bg-auditik-blue text-white">
                    <th className="text-left p-4 font-bold">Serviço</th>
                    <th className="text-left p-4 font-bold">Philips HearLink</th>
                    <th className="text-left p-4 font-bold">Outras marcas</th>
                  </tr>
                </thead>
                <tbody>
                  {servicosTabela.map((row, index) => (
                    <tr
                      key={row.servico}
                      className={index % 2 === 0 ? "bg-white" : "bg-bg-light-blue/50"}
                    >
                      <td className="p-4 text-slate-900 font-medium border-t border-blue-50">
                        {row.servico}
                      </td>
                      <td className="p-4 text-slate-600 border-t border-blue-50">
                        {row.philips}
                      </td>
                      <td className="p-4 text-slate-600 border-t border-blue-50">
                        {row.outras}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="max-w-3xl mx-auto mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                Tecnologias que exigem acompanhamento técnico contínuo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {philipsTech.map((item) => (
                  <article
                    key={item.title}
                    className="bg-bg-light-blue rounded-4xl p-6 border border-blue-50 text-center"
                  >
                    <span className="material-symbols-outlined text-4xl text-auditik-blue mb-3">
                      {item.icon}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="max-w-3xl mx-auto mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                Acessórios e prevenção na Auditik
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {acessoriosCards.map((card) => (
                  <article
                    key={card.title}
                    className="bg-bg-light-blue rounded-4xl p-6 border border-blue-50 text-center"
                  >
                    <span className="material-symbols-outlined text-4xl text-auditik-blue mb-3">
                      {card.icon}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                      {card.title}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {card.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="max-w-3xl mx-auto bg-bg-light-blue rounded-4xl p-8 border border-blue-50 text-center mb-10">
              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                Você <strong>não precisa ter comprado na Auditik</strong> para buscar{" "}
                <strong>manutenção e ajuste de aparelho auditivo em Piracicaba</strong>.
                Se a assistência da sua marca for distante ou demorada, traga o aparelho
                para uma avaliação transparente. Muitos pacientes conhecem, na revisão,
                o acompanhamento próximo da Auditik e a linha{" "}
                <strong>Philips HearLink</strong> — a decisão de migrar fica sempre com
                você.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={APP_ROUTES.contato}
                  onClick={() =>
                    trackButtonClick("manutencao_cta_laboratorio_contato", {
                      section: "laboratorio-auditik",
                      page: PAGE_TRACKING,
                    })
                  }
                  className="inline-flex min-h-11 items-center justify-center bg-auditik-blue text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Agendar manutenção
                </Link>
                <WhatsAppLeadButton
                  buttonName="manutencao_cta_laboratorio_whatsapp"
                  leadSource="Website Manutenção Laboratório"
                  trackingParams={{
                    section: "laboratorio-auditik",
                    page: PAGE_TRACKING,
                  }}
                  whatsappMessage="Olá! Preciso de manutenção ou ajuste do meu aparelho auditivo em Piracicaba."
                  className="inline-flex min-h-11 items-center justify-center bg-white text-auditik-blue font-bold py-3 px-8 rounded-full border border-auditik-blue transition-colors"
                >
                  Falar no WhatsApp
                </WhatsAppLeadButton>
              </div>
              <p className="mt-6 text-slate-600 text-sm">
                Conheça também o guia{" "}
                <Link
                  href={SUBS_APARELHOS_ROUTES.philipsHearingSolutions}
                  onClick={() =>
                    trackButtonClick("manutencao_link_philips_corpo", {
                      section: "laboratorio-auditik",
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
          </div>
        </section>

        {/* CTA intermediário */}
        <section className="py-16 bg-auditik-blue text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src={CTA_BACKGROUND}
              alt="Manutenção de aparelho auditivo Auditik Piracicaba"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="container-wide relative z-10 text-center max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              Som abafado ou apito constante? Não adie a revisão
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Agende <strong>manutenção ou ajuste de aparelho auditivo</strong> na
              Auditik, em Piracicaba. Atendemos Philips com laboratório autorizado e
              outras marcas com triagem e orientação profissional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("manutencao_cta_intermediario_contato", {
                    section: "cta_intermediario",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex min-h-11 items-center justify-center bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-3 px-8 rounded-full transition-colors"
              >
                Agendar manutenção
              </Link>
              <WhatsAppLeadButton
                buttonName="manutencao_cta_intermediario_whatsapp"
                leadSource="Website Manutenção CTA Intermediário"
                trackingParams={{
                  section: "cta_intermediario",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá! Preciso de manutenção ou ajuste do meu aparelho auditivo em Piracicaba."
                className="inline-flex min-h-11 items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full border border-white/30 transition-colors"
              >
                Falar com especialista
              </WhatsAppLeadButton>
            </div>
          </div>
        </section>

        {/* Por que Auditik */}
        <section className="py-20 bg-bg-light-blue" id="por-que-auditik">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Por que confiar a manutenção do seu aparelho à Auditik
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
              {porQueAuditik.map((item) => (
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
            <p className="text-center text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Atendimento presencial em{" "}
              <Link
                href={SUBS_APARELHOS_ROUTES.piracicaba}
                onClick={() =>
                  trackButtonClick("manutencao_link_piracicaba_corpo", {
                    section: "por-que-auditik",
                    page: PAGE_TRACKING,
                  })
                }
                className="text-auditik-blue font-bold hover:underline"
              >
                aparelhos auditivos em Piracicaba
              </Link>{" "}
              e região — com equipe fonoaudiológica dedicada à sua audição.
            </p>
          </div>
        </section>

        {/* Links silo */}
        <section className="py-20 bg-white" id="mais-informacoes">
          <div className="container-wide max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Mais informações sobre Aparelhos Auditivos
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Explore guias sobre tecnologia, investimento e atendimento. Para visão
              geral da linha Philips HearLink, volte à página pilar.
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
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-light-blue text-auditik-blue font-bold rounded-full border border-blue-50 hover:border-auditik-blue transition-colors"
                >
                  <span className="material-symbols-outlined">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href={APP_ROUTES.aparelhos}
              onClick={() =>
                trackButtonClick("manutencao_link_pilar_silo", {
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
        <section className="py-24 bg-bg-light-blue" id="faq">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-10 text-center">
              Dúvidas frequentes: manutenção e ajuste de aparelho auditivo
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
              alt="Agendar manutenção e ajuste de aparelho auditivo Auditik Piracicaba"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="container-wide relative z-10 text-center max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Seu aparelho merece ouvir bem todos os dias — agende na Auditik
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed">
              Na <strong>Auditik Soluções Auditivas</strong>, em{" "}
              <strong>Piracicaba-SP</strong>, unimos{" "}
              <strong>manutenção e ajuste de aparelho auditivo</strong> com cuidado
              humano e expertise <strong>Philips Hearing Solutions</strong>. Seja para
              revisão de rotina, reprogramação ou porque o som não está igual, nossa
              equipe está pronta. <strong>Avaliação auditiva gratuita</strong> para quem
              ainda não tem acompanhamento ou deseja segunda opinião — sem compromisso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APP_ROUTES.contato}
                onClick={() =>
                  trackButtonClick("manutencao_final_cta_contato", {
                    section: "final_cta",
                    page: PAGE_TRACKING,
                  })
                }
                className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center bg-auditik-yellow hover:bg-yellow-400 text-slate-900 font-bold py-3 px-6 sm:px-8 rounded-full transition-colors"
              >
                Agendar avaliação gratuita
              </Link>
              <WhatsAppLeadButton
                buttonName="manutencao_final_cta_whatsapp"
                leadSource="Website Manutenção Aparelho"
                trackingParams={{
                  section: "final_cta",
                  page: PAGE_TRACKING,
                }}
                whatsappMessage="Olá! Preciso de manutenção ou ajuste do meu aparelho auditivo em Piracicaba."
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
