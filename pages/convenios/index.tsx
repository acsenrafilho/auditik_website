import { NextSeo } from 'next-seo';
import { getSEOMeta } from '@lib/seo';
import Head from 'next/head';
import { useState, useMemo } from 'react';
import type { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface InsurancePartner {
  name: string;
  logo?: string;
  description: string;
  coverage: string[];
  contact?: string;
}

interface ConveniosPageProps {
  partners: InsurancePartner[];
}

export default function ConveniosPage({ partners }: ConveniosPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCoverage, setSelectedCoverage] = useState<string | null>(null);

  // Extract unique coverage types
  const allCoverageTypes = useMemo(() => {
    const coverages = new Set<string>();
    partners.forEach((partner) => {
      partner.coverage.forEach((c) => coverages.add(c));
    });
    return Array.from(coverages).sort();
  }, [partners]);

  // Filter partners based on search and coverage
  const filteredPartners = useMemo(() => {
    return partners.filter((partner) => {
      const matchesSearch =
        partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCoverage =
        !selectedCoverage ||
        partner.coverage.some((c) =>
          c.toLowerCase().includes(selectedCoverage.toLowerCase())
        );

      return matchesSearch && matchesCoverage;
    });
  }, [partners, searchTerm, selectedCoverage]);

  const seo = getSEOMeta({
    title: 'Convênios - Auditik',
    description: 'Conheça os convênios e seguradoras que aceitam nossos aparelhos auditivos Philips HearLink. Cobertura em todo Brasil.',
  });

  return (
    <>
      <NextSeo {...seo} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Auditik - Convênios',
              description: 'Seguradoras e convênios parceiros',
              url: 'https://auditik.com.br/convenios',
            }),
          }}
        />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="page-section hero-gradient">
          <div className="container-wide">
            <h1>Convênios e Seguradoras</h1>
            <p>Encontre cobertura para seus aparelhos auditivos</p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="page-section bg-gray-50 border-b">
          <div className="container-wide">
            {/* Search Box */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Pesquisar convênio ou seguradora..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-auditik-blue"
              />
            </div>

            {/* Coverage Filter */}
            <div>
              <h3 className="font-bold mb-3">Filtrar por cobertura:</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCoverage(null)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                    selectedCoverage === null
                      ? 'bg-auditik-blue text-white'
                      : 'bg-white border border-gray-300 hover:border-auditik-blue'
                  }`}
                >
                  Todos
                </button>
                {allCoverageTypes.map((coverage) => (
                  <button
                    key={coverage}
                    onClick={() => setSelectedCoverage(coverage)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                      selectedCoverage === coverage
                        ? 'bg-auditik-blue text-white'
                        : 'bg-white border border-gray-300 hover:border-auditik-blue'
                    }`}
                  >
                    {coverage}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partners Grid */}
        <section className="page-section">
          <div className="container-wide">
            {filteredPartners.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPartners.map((partner, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    {partner.logo && (
                      <div className="mb-4 h-16 flex items-center justify-center bg-gray-50 rounded">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="h-12 object-contain"
                        />
                      </div>
                    )}
                    <h3 className="font-bold text-lg mb-2">{partner.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {partner.description}
                    </p>
                    <div className="mb-4">
                      <p className="text-xs font-bold text-gray-700 mb-2">
                        Cobertura:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {partner.coverage.map((coverage, cidx) => (
                          <span
                            key={cidx}
                            className="bg-auditik-yellow text-auditik-dark-blue text-xs px-2 py-1 rounded"
                          >
                            {coverage}
                          </span>
                        ))}
                      </div>
                    </div>
                    {partner.contact && (
                      <p className="text-sm text-gray-600 mb-4">
                        <strong>Contato:</strong> {partner.contact}
                      </p>
                    )}
                    <button className="cta-button-primary w-full text-sm">
                      Solicitar Informações
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <p className="text-gray-600 mb-4">
                  Nenhum convênio encontrado com os filtros selecionados.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCoverage(null);
                  }}
                  className="text-auditik-blue hover:text-auditik-dark-blue font-bold"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="page-section bg-auditik-blue text-white">
          <div className="container-wide text-center">
            <h2>Não encontrou seu convênio?</h2>
            <p className="mb-6 text-lg">
              Entre em contato conosco para verificar possibilidades de cobertura.
            </p>
            <button className="cta-button-primary bg-auditik-yellow text-auditik-dark-blue">
              Enviar Consulta
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<ConveniosPageProps> = async () => {
  const conveniosPath = path.join(
    process.cwd(),
    'content/convenios/index.md'
  );

  let partners: InsurancePartner[] = [];

  // Try to read the convenios file
  if (fs.existsSync(conveniosPath)) {
    const fileContents = fs.readFileSync(conveniosPath, 'utf8');
    const { data } = matter(fileContents);

    // Assuming the markdown file has a 'partners' or 'convenios' field with array of partners
    partners = data.partners || data.convenios || [];
  }

  // Fallback example data if file doesn't exist or is empty
  if (partners.length === 0) {
    partners = [
      {
        name: 'Unimed',
        description: 'Cobertura completa para aparelhos auditivos',
        coverage: ['Aparelhos Auditivos', 'Avaliação Audiológica', 'Manutenção'],
        contact: 'Central: 4003-3188',
      },
      {
        name: 'Bradesco Saúde',
        description: 'Planos com cobertura de audição',
        coverage: ['Aparelhos Auditivos', 'Consulta Especializada'],
        contact: 'Central: 0800 707 9000',
      },
      {
        name: 'Amil',
        description: 'Diversos planos com cobertura de audição',
        coverage: ['Aparelhos Auditivos', 'Avaliação', 'Prótese Auditiva'],
        contact: 'Central: 0800 788 2945',
      },
    ];
  }

  return {
    props: { partners },
    revalidate: 86400, // Revalidate daily
  };
};
