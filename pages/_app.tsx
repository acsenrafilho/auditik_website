import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GA_ID, trackPageView } from '@lib/analytics';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!GA_ID) return;

    // Track page views on route change
    const handleRouteChange = (url: string) => {
      const pageName = url.split('/')[1] || 'home';
      trackPageView(url, pageName);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Google Analytics */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      <DefaultSeo
        titleTemplate="%s | Auditik"
        defaultTitle="Auditik - Aparelhos Auditivos Philips HearLink"
        description="Aparelhos auditivos Philips HearLink com IA avançada. Atendimento humanizado em Piracicaba e Americana."
        canonical="https://auditik.com.br"
        openGraph={{
          type: 'website',
          locale: 'pt_BR',
          url: 'https://auditik.com.br',
          siteName: 'Auditik',
        }}
        twitter={{
          handle: '@auditik',
          cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
