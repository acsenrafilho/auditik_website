import Script from "next/script";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { buildGtmBootstrapScript, GTM_ID, GTM_ID_META } from "@lib/gtm";

const LP_IDLE_TIMEOUT_MS = 3500;

function isLandingPath(pathname: string): boolean {
  return pathname === "/lp" || pathname.startsWith("/lp/");
}

/**
 * Loads GTM containers (shared dataLayer).
 * GTM-KHQP88V: GA4 + Google Ads — deferred on /lp/* (idle ~3.5s or first interaction).
 * GTM-NVWQ3PF2: Meta Pixel — afterInteractive everywhere (including LPs) so fbq is
 * ready before form submit / Lead.
 */
export function DeferredMarketingScripts() {
  const router = useRouter();
  const onLp = isLandingPath(router.pathname);
  const [lpAdsReady, setLpAdsReady] = useState(false);

  useEffect(() => {
    if (!onLp) {
      setLpAdsReady(false);
      return;
    }

    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      setLpAdsReady(true);
      cleanup();
    };

    const onInteract = () => load();
    const idleCallback =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(load, { timeout: LP_IDLE_TIMEOUT_MS })
        : null;
    const timeoutId =
      idleCallback == null
        ? window.setTimeout(load, LP_IDLE_TIMEOUT_MS)
        : window.setTimeout(load, LP_IDLE_TIMEOUT_MS);

    const opts: AddEventListenerOptions = { once: true, passive: true };
    window.addEventListener("pointerdown", onInteract, opts);
    window.addEventListener("keydown", onInteract, opts);
    window.addEventListener("scroll", onInteract, opts);
    window.addEventListener("touchstart", onInteract, opts);

    function cleanup() {
      if (idleCallback != null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleCallback);
      }
      window.clearTimeout(timeoutId);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("touchstart", onInteract);
    }

    return cleanup;
  }, [onLp, router.pathname]);

  const shouldLoadAds = !onLp || lpAdsReady;
  const adsStrategy = onLp ? "lazyOnload" : "afterInteractive";

  return (
    <>
      {GTM_ID && shouldLoadAds ? (
        <Script
          id="gtm-bootstrap"
          strategy={adsStrategy}
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
