import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { GA_ID, trackPageView } from "@lib/analytics";
import { GOOGLE_ADS_ID, META_PIXEL_ID } from "@lib/ad-platform-tracking";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hasGtagTracking = Boolean(GA_ID || GOOGLE_ADS_ID);

  useEffect(() => {
    if (!GA_ID && !META_PIXEL_ID) return;

    // Track page views on route change
    const handleRouteChange = (url: string) => {
      const pageName = url.split("/")[1] || "home";
      if (GA_ID) {
        trackPageView(url, pageName);
      }

      // Meta Pixel route tracking for SPA navigation.
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "PageView");
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // Cleanup
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Google Analytics + Google Ads base gtag */}
      {hasGtagTracking && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${
              GA_ID || GOOGLE_ADS_ID
            }`}
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
                ${
                  GA_ID
                    ? `gtag('config', '${GA_ID}', { page_path: window.location.pathname });`
                    : ""
                }
                ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}
              `,
            }}
          />
        </>
      )}

      {/* Meta Pixel: set NEXT_PUBLIC_META_PIXEL_ID in environment variables */}
      {META_PIXEL_ID && (
        <>
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt="meta-pixel"
            />
          </noscript>
        </>
      )}

      <DefaultSeo
        titleTemplate="%s | Auditik"
        defaultTitle="Auditik - Aparelhos Auditivos Philips HearLink"
        description="Aparelhos auditivos Philips HearLink com IA avançada. Atendimento humanizado em Piracicaba e Americana."
        canonical="https://auditik.com.br"
        openGraph={{
          type: "website",
          locale: "pt_BR",
          url: "https://auditik.com.br",
          siteName: "Auditik",
        }}
        twitter={{
          handle: "@auditik",
          cardType: "summary_large_image",
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
