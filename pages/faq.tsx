import { NextSeo } from "next-seo";
import { getSEOMeta } from "@lib/seo";
import { generateFAQSchema } from "@lib/schema";
import Head from "next/head";
import { useState } from "react";
import { Header } from "@components/Header";

const faqData = [
  {
    question: "Como funciona um aparelho auditivo?",
    answer:
      "Um aparelho auditivo funciona amplificando sons por meio de um microfone, processador e receptor. A tecnologia IA analisa o ambiente e ajusta o som em tempo real para máxima clareza.",
  },
  {
    question: "Qual é a diferença entre os modelos HearLink?",
    answer:
      "O HearLink 100H é de entrada, o 500 oferece conectividade avançada, e o 700 é o topo de linha com máxima performance. Todos compartilham a tecnologia IA de processamento de som.",
  },
  {
    question: "Quanto tempo dura a bateria?",
    answer:
      "Depende do modelo e uso. A maioria dura entre 48 a 72 horas. Oferecemos múltiplas opções de carregamento incluindo casos de carregamento rápido.",
  },
  {
    question: "Os aparelhos cobrem meu convênio?",
    answer:
      'Muitos convênios cobrem aparelhos auditivos. Verifique na aba "Convênios" do site ou entre em contato conosco para verificar sua cobertura específica.',
  },
  {
    question: "Qual é o período de adaptação?",
    answer:
      "Geralmente, de 2 a 4 semanas. Nossa equipe oferece ajustes gratuitos durante este período para garantir máximo conforto.",
  },
  {
    question: "Vocês fazem teste de audição?",
    answer:
      "Sim! Oferecemos avaliação completa de audição gratuita. Agende sua consulta sem compromisso.",
  },
];

export default function FAQPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const seo = getSEOMeta({
    title: "Perguntas Frequentes - Auditik",
    description:
      "Dúvidas sobre aparelhos auditivos, adaptação e convênios? Encontre respostas às perguntas mais frequentes sobre saúde auditiva.",
  });

  const faqSchema = generateFAQSchema(faqData);

  return (
    <>
      <NextSeo {...seo} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <Header />
      <main>
        <section className="page-section hero-gradient">
          <div className="container-wide">
            <h1>Perguntas Frequentes</h1>
            <p>Respostas às dúvidas mais comuns sobre aparelhos auditivos</p>
          </div>
        </section>

        <section className="page-section">
          <div className="container-wide max-w-3xl">
            <div className="space-y-4">
              {faqData.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition flex justify-between items-center"
                  >
                    <h3 className="font-bold text-lg">{faq.question}</h3>
                    <span
                      className={`text-2xl transition-transform ${
                        expandedIndex === idx ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {expandedIndex === idx && (
                    <div className="px-6 pb-6 pt-0 bg-bg-light-blue text-gray-700">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section bg-auditik-yellow/10">
          <div className="container-wide text-center">
            <h2>Não encontrou sua pergunta?</h2>
            <p className="text-lg text-gray-600 mt-4">
              Entre em contato conosco! Nossa equipe está pronta para responder.
            </p>
            <button className="cta-button-primary mt-8">Entrar em Contato</button>
          </div>
        </section>
      </main>
    </>
  );
}
