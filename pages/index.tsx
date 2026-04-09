import { NextSeo } from 'next-seo';
import { getSEOMeta } from '@lib/seo';

export default function Home() {
  const seo = getSEOMeta({
    title: 'Auditik - Aparelhos Auditivos Philips HearLink',
    description: 'Aparelhos auditivos Philips HearLink com IA avançada. Atendimento humanizado em Piracicaba e Americana. Agende sua avaliação gratuita!',
  });

  return (
    <>
      <NextSeo {...seo} />
      <main>
        {/* Header will be added in component library */}
        <section className="page-section hero-gradient">
          <div className="container-wide">
            <h1>Bem-vindo à Auditik</h1>
            <p>Aparelhos auditivos Philips HearLink - Conteúdo em breve</p>
          </div>
        </section>
      </main>
    </>
  );
}
