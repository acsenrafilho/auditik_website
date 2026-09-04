import Script from "next/script";
import { buildGtmBootstrapScript, GTM_ID, GTM_ID_META } from "@lib/gtm";

/**
 * Loads GTM container(s) with a shared dataLayer.
 * GTM-KHQP88V (NEXT_PUBLIC_GTM_ID): GA4 + Google Ads + Meta Pixel (single-container cutover).
 * Optional NEXT_PUBLIC_GTM_ID_META: second container only if explicitly set (legacy dual-GTM).
 * AfterInteractive on all routes so Meta Pixel is ready before form submit / Lead.
 */
export function DeferredMarketingScripts() {
  return (
    <>
      {GTM_ID ? (
        <Script
          id="gtm-bootstrap"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: buildGtmBootstrapScript(GTM_ID),
          }}
        />
      ) : null}
      {GTM_ID_META ? (
        <Script
          id="gtm-bootstrap-meta"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: buildGtmBootstrapScript(GTM_ID_META),
          }}
        />
      ) : null}
    </>
  );
}
