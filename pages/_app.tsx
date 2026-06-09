import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { captureAttributionFromUrl } from "@lib/campaign-attribution";
import { trackPageView } from "@lib/analytics";
import { META_PIXEL_ID } from "@lib/ad-platform-tracking";
import { ScrollToTopButton } from "@components/Common/ScrollToTopButton";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    captureAttributionFromUrl();
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      captureAttributionFromUrl();
      const pageName = url.split("/")[1] || "home";
      trackPageView(url, pageName);

      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "PageView");
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
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
      <ScrollToTopButton />
    </>
  );
}
