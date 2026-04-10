import { NextSeo } from "next-seo";
import { getSEOMeta } from "@lib/seo";
import { generateLocalBusinessSchema } from "@lib/schema";
import Head from "next/head";
import { Header } from "@components/Header";
import Image from "next/image";
import Link from "next/link";
import { trackButtonClick } from "@lib/analytics";

export default function NossaClinicaPage() {
  const seo = getSEOMeta({
    title: "Nossa Clínica - Auditik | Aparelhos Auditivos Philips HearLink",
    description:
      "Conheça a Auditik - especialistas em aparelhos auditivos Philips HearLink. 70 anos de experiência através da Group Demant. Atendimento humanizado em Piracicaba e Americana.",
    ogImage: "https://auditik.com.br/images/nossa-clinica-og.jpg",
  });

  const piracicabaSchema = generateLocalBusinessSchema("piracicaba");
  const americanaSchema = generateLocalBusinessSchema("americana");

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Auditik Soluções Auditivas",
    description:
      "Especialistas em saúde auditiva e aparelhos auditivos Philips HearLink",
    url: "https://www.auditik.com.br",
    logo: "https://www.auditik.com.br/logo-auditik.png",
    foundingYear: 2014,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "(19) 3377-6941",
      contactType: "Customer Service",
      email: "atendimento@auditik.com.br",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Piracicaba",
        "@id": "https://www.wikidata.org/wiki/Q485811",
      },
      {
        "@type": "City",
        name: "Americana",
        "@id": "https://www.wikidata.org/wiki/Q485811",
      },
    ],
  };

  const handleCTA = () => {
    trackButtonClick("agende-visita-clinica", {
      page: "nossa-clinica",
      action: "cta-click",
    });
  };

  return (
    <>
      <NextSeo {...seo} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(piracicabaSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(americanaSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </Head>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-auditik-blue via-blue-500 to-auditik-dark-blue flex items-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-auditik-yellow rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400 rounded-full blur-3xl" />
          </div>
          <div className="container-wide relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Nossa Clínica
              </h1>
              <p className="text-xl text-blue-100">
                Especialistas em devolver a qualidade de vida através da saúde auditiva
              </p>
            </div>
          </div>
        </section>

        {/* Nossa História */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Nossa História
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    A <strong>Auditik Soluções Auditivas</strong> é uma clínica
                    especializada em saúde auditiva, autorizada e licenciada pela{" "}
                    <strong>Group Demant Brasil</strong>, herança de{" "}
                    <strong>70 anos de experiência</strong> global em dispositivos
                    auditivos.
                  </p>
                  <p>
                    Somos parceiros oficiais da <strong>Philips HearLink</strong>, marca
                    de confiança reconhecida mundialmente pela qualidade, inovação e
                    tecnologia de ponta em aparelhos auditivos.
                  </p>
                  <p>
                    Fundada com o compromisso de transformar vidas através da audição, a
                    Auditik atua em Piracicaba e Americana, regiões do interior de São
                    Paulo, oferecendo soluções personalizadas e humanizadas para cada
                    perfil de paciente.
                  </p>
                  <p>
                    Nossa equipe de profissionais qualificados trabalha com dedicação
                    para garantir que cada paciente recupere sua conexão com o mundo
                    sonoro e disfrute plenamente dos momentos importantes da vida.
                  </p>
                </div>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/clinica-equipe.jpg"
                  alt="Equipe Auditik - Especialistas em Saúde Auditiva"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Missão, Visão, Valores */}
        <section className="py-20 bg-gradient-to-b from-bg-cream to-white">
          <div className="container-wide">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
              Nossos Compromissos
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Missão */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-auditik-blue to-blue-600 flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v2h8v-2zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-2a4 4 0 00-8 0v2a2 2 0 002 2h4a2 2 0 002-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Nossa Missão</h3>
                <p className="text-gray-700 leading-relaxed">
                  Transformar vidas através de soluções auditivas personalizadas,
                  oferecendo tecnologia de ponta com atendimento humanizado e
                  acompanhamento contínuo.
                </p>
              </div>

              {/* Visão */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-auditik-yellow to-yellow-500 flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                      fillRule="evenodd"
                      d="M8.59 5.59a2 2 0 11-2.83-2.83 2 2 0 012.83 2.83zm6.82 0a2 2 0 11-2.83-2.83 2 2 0 012.83 2.83zM9 16a3 3 0 11-6 0 3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Nossa Visão</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ser a clínica referência em saúde auditiva no interior paulista,
                  reconhecida pela excelência no atendimento, inovação tecnológica e
                  compromisso com a qualidade de vida.
                </p>
              </div>

              {/* Valores */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-auditik-dark-blue to-blue-800 flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3 3 0 001.946 5.973 3 3 0 00-3.28 4.884A3 3 0 005 9.5H3a3 3 0 000 6h12a3 3 0 100-6h-1.05A3 3 0 007.213 8.933a4.996 4.996 0 002.821-5.066 2.993 2.993 0 00-2.767.933z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Nossos Valores
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Humanização, integridade, passionalidade pelo cuidado auditivo,
                  inovação contínua e compromisso com a acessibilidade à melhor
                  tecnologia em saúde.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <h2 className="text-4xl font-bold text-gray-900 mb-16">
              Por que escolher a Auditik?
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              {/* Esquerda - Benefícios */}
              <div className="space-y-6">
                {[
                  {
                    title: "Acompanhamento Vitalício Gratuito",
                    desc: "Suporte contínuo do início da adaptação até o final da vida, sem custos adicionais.",
                    icon: "🎯",
                  },
                  {
                    title: "Tecnologia Philips HearLink",
                    desc: "Aparelhos com IA integrada, conexão Bluetooth e som cristalino através de inovação Demant.",
                    icon: "🚀",
                  },
                  {
                    title: "Atendimento Humanizado",
                    desc: "Profissionais especializados que entendem suas necessidades e oferecem atendimento personalizado.",
                    icon: "❤️",
                  },
                  {
                    title: "Adaptação Precisa",
                    desc: "Testes auditivos avançados e ajuste fino para máximo conforto e qualidade sonora.",
                    icon: "🔧",
                  },
                  {
                    title: "Financiamento Facilitado",
                    desc: "Parcelamento sem juros e programas de financiamento acessíveis para todos.",
                    icon: "💳",
                  },
                  {
                    title: "Marcas de Confiança",
                    desc: "Autorizado Philips HearLink e parceiro Group Demant com 70 anos de expertise.",
                    icon: "✅",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="text-4xl flex-shrink-0">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direita - Logos e CTA */}
              <div className="flex flex-col justify-between">
                <div className="bg-gradient-to-br from-bg-light-blue to-bg-cream rounded-2xl p-8 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                    Marcas que respaldam nossa qualidade
                  </h3>
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded-xl flex items-center justify-center h-20">
                      <Image
                        src="/images/logo-philips.png"
                        alt="Philips HearLink"
                        width={150}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                    <div className="bg-white p-4 rounded-xl flex items-center justify-center h-20">
                      <Image
                        src="/images/logo-demant.png"
                        alt="Group Demant"
                        width={150}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                <Link
                  href="/contato"
                  onClick={handleCTA}
                  className="w-full bg-gradient-to-r from-auditik-blue to-auditik-dark-blue hover:shadow-lg text-white font-bold py-4 px-8 rounded-xl transition-all text-center text-lg"
                >
                  Agende uma Avaliação Gratuita
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Nossas Unidades */}
        <section className="py-20 bg-gradient-to-b from-white to-bg-cream">
          <div className="container-wide">
            <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
              Nossas Unidades
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Piracicaba */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 bg-gradient-to-br from-auditik-blue to-blue-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-24 h-24 text-white opacity-20"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Unidade Piracicaba
                  </h3>
                  <p className="text-gray-600 mb-6 font-semibold">
                    Rua Samuel Neves, 1800
                    <br />
                    Jardim Europa, Piracicaba - SP
                  </p>
                  <div className="space-y-3 mb-6">
                    <p className="flex items-center gap-2 text-gray-700">
                      <span className="text-auditik-blue font-bold">📞</span>
                      <a
                        href="tel:+551933776941"
                        className="hover:text-auditik-blue transition"
                      >
                        (19) 3377-6941
                      </a>
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-500 font-bold">💬</span>
                      <a
                        href="https://wa.me/551933776941"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-500 transition"
                      >
                        WhatsApp
                      </a>
                    </p>
                  </div>
                  <Link
                    href="https://maps.google.com/?q=Rua+Samuel+Neves+1800+Piracicaba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center bg-auditik-blue hover:bg-auditik-dark-blue text-white font-bold py-2 px-4 rounded-lg transition"
                  >
                    Ver no Mapa
                  </Link>
                </div>
              </div>

              {/* Americana */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 bg-gradient-to-br from-auditik-yellow to-yellow-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-24 h-24 text-white opacity-20"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Unidade Americana
                  </h3>
                  <p className="text-gray-600 mb-6 font-semibold">
                    Rua Luísa Meneghel Mancine, 72 - Sala 12
                    <br />
                    Jardim Paulista, Americana - SP
                  </p>
                  <div className="space-y-3 mb-6">
                    <p className="flex items-center gap-2 text-gray-700">
                      <span className="text-auditik-blue font-bold">📞</span>
                      <a
                        href="tel:+551933776941"
                        className="hover:text-auditik-blue transition"
                      >
                        (19) 3377-6941
                      </a>
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-500 font-bold">💬</span>
                      <a
                        href="https://wa.me/551933776941"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-500 transition"
                      >
                        WhatsApp
                      </a>
                    </p>
                  </div>
                  <Link
                    href="https://maps.google.com/?q=Rua+Luisa+Meneghel+Mancine+72+Americana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center bg-auditik-yellow hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg transition"
                  >
                    Ver no Mapa
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-r from-auditik-blue via-blue-500 to-auditik-dark-blue">
          <div className="container-wide text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Recupere a Qualidade de Vida
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Agende uma avaliação auditiva gratuita e descubra como nossos aparelhos
              Philips HearLink podem transformar sua audição e seu dia a dia.
            </p>
            <Link
              href="/contato"
              onClick={handleCTA}
              className="inline-block bg-auditik-yellow hover:bg-yellow-300 text-gray-900 font-bold py-4 px-12 rounded-full text-lg transition-all transform hover:scale-105"
            >
              Agende Sua Avaliação
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
