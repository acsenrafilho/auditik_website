import { NextSeo } from "next-seo";
import { getSEOMeta } from "@lib/seo";
import { generateProductSchema } from "@lib/schema";
import Head from "next/head";
import { Header } from "@components/Header";

export default function AparelhosPage() {
  const seo = getSEOMeta({
    title: "Aparelhos Auditivos Philips HearLink - Auditik",
    description:
      "Conheça nossa linha completa de aparelhos auditivos Philips HearLink. Tecnologia de IA avançada, discrição total e ajuste personalizado. Avaliação gratuita.",
  });

  const productSchema = generateProductSchema({
    name: "Philips HearLink",
    description: "Aparelhos auditivos com tecnologia IA da Philips",
    image: "https://auditik.com.br/hearlink-device.jpg",
    price: "A partir de R$ 3.000",
  });

  return (
    <>
      <NextSeo {...seo} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </Head>
      <Header />
      <main>
        <section className="page-section hero-gradient">
          <div className="container-wide">
            <h1>Aparelhos Auditivos Philips HearLink</h1>
            <p>Tecnologia de IA para melhor experiência auditiva</p>
          </div>
        </section>

        <section className="page-section">
          <div className="container-wide">
            <h2>Nossas Linhas de Produtos</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 bg-bg-light-blue rounded-2xl">
                <h3>HearLink 100H</h3>
                <p className="text-gray-600 mt-4">
                  Modelo de entrada com tecnologia IA básica. Ideal para primeiro uso.
                </p>
                <p className="text-auditik-blue font-bold mt-4">Consulte</p>
              </div>
              <div className="p-8 bg-bg-light-blue rounded-2xl">
                <h3>HearLink 500</h3>
                <p className="text-gray-600 mt-4">
                  Modelo intermediário com conectividade avançada. Controle por
                  smartphone.
                </p>
                <p className="text-auditik-blue font-bold mt-4">Consulte</p>
              </div>
              <div className="p-8 bg-bg-light-blue rounded-2xl">
                <h3>HearLink 700</h3>
                <p className="text-gray-600 mt-4">
                  Topo de linha com máxima clareza de som. Discreto e powerful.
                </p>
                <p className="text-auditik-blue font-bold mt-4">Consulte</p>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section bg-auditik-blue text-white">
          <div className="container-wide">
            <h2>Características Principais</h2>
            <ul className="grid md:grid-cols-2 gap-6 mt-8">
              <li>✓ Tecnologia AI de Processamento de Som</li>
              <li>✓ Discrição Total - Até 21x Menor</li>
              <li>✓ Conectividade Bluetooth</li>
              <li>✓ Bateria 50+ Horas</li>
              <li>✓ Resistência à Água</li>
              <li>✓ Garantia de 4 Anos</li>
            </ul>
          </div>
        </section>

        <section className="page-section">
          <div className="container-wide text-center">
            <h2>Pronto para Começar?</h2>
            <p className="text-lg text-gray-600 mt-4">
              Agende uma avaliação gratuita e descubra o dispositivo perfeito para você.
            </p>
            <button className="cta-button-primary mt-8">Agendar Avaliação</button>
          </div>
        </section>
      </main>
    </>
  );
}
