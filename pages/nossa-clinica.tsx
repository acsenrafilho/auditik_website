import { NextSeo } from 'next-seo';
import { getSEOMeta } from '@lib/seo';
import { generateLocalBusinessSchema } from '@lib/schema';
import Head from 'next/head';

export default function NossaClinicaPage() {
  const seo = getSEOMeta({
    title: 'Nossa Clínica - Auditik',
    description: 'Conheça a história da Auditik, distribuidora licenciada Philips HearLink. Atendimento humanizado em Piracicaba e Americana. Profissionais especializados em saúde auditiva.',
  });

  const piracicabaSchema = generateLocalBusinessSchema('piracicaba');
  const americanaSchema = generateLocalBusinessSchema('americana');

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
      </Head>
      <main>
        <section className="page-section hero-gradient">
          <div className="container-wide">
            <h1>Nossa Clínica</h1>
            <p>Especialistas em devolver a alegria de ouvir</p>
          </div>
        </section>

        <section className="page-section">
          <div className="container-wide">
            <h2>Sobre a Auditik</h2>
            <p>
              Somos uma clínica de aparelhos auditivos referência na região, com mais de 10 anos de experiência
              no mercado de saúde auditiva. Nossa missão é melhorar a qualidade de vida de nossos pacientes através
              de tecnologia de ponta e atendimento humanizado.
            </p>

            <h2 className="mt-12">Nossas Unidades</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 border border-gray-200 rounded-2xl">
                <h3>Piracicaba</h3>
                <p className="text-gray-600 mt-2">
                  Rua de Cavvarteira, 320<br/>
                  Centro, Piracicaba - SP
                </p>
                <p className="text-auditik-blue font-bold mt-4">(91) 9977-4156</p>
              </div>
              <div className="p-8 border border-gray-200 rounded-2xl">
                <h3>Americana</h3>
                <p className="text-gray-600 mt-2">
                  Rua Praras de Carellho, 3338<br/>
                  Vila Santa Catarina, Americana - SP
                </p>
                <p className="text-auditik-blue font-bold mt-4">(91) 9977-4156</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
