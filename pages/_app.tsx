import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { DefaultSeo } from "next-seo";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { DeferredMarketingScripts } from "@components/Analytics/DeferredMarketingScripts";
import { MaterialSymbolsLink } from "@components/Analytics/MaterialSymbolsLink";
import { captureAttributionFromUrl } from "@lib/campaign-attribution";
import { trackPageView } from "@lib/analytics";
import { SITE_URL } from "@lib/site-url";
import { ScrollToTopButton } from "@components/Common/ScrollToTopButton";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

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
    <div className={`${inter.variable} ${inter.className} font-sans`}>
      <MaterialSymbolsLink />
      <DeferredMarketingScripts />

      <DefaultSeo
        titleTemplate="%s | Auditik"
        defaultTitle="Auditik - Aparelhos Auditivos Philips HearLink"
        description="Aparelhos auditivos Philips HearLink com IA avançada. Atendimento humanizado em Piracicaba e Americana."
        canonical={SITE_URL}
        openGraph={{
          type: "website",
          locale: "pt_BR",
          url: SITE_URL,
          siteName: "Auditik",
        }}
        twitter={{
          handle: "@auditik",
          cardType: "summary_large_image",
        }}
      />
      <Component {...pageProps} />
      <ScrollToTopButton />
    </div>
  );
}
