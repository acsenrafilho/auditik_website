import Script from "next/script";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { buildGtmBootstrapScript, GTM_ID, GTM_ID_META } from "@lib/gtm";

const LP_IDLE_TIMEOUT_MS = 3500;

function isLandingPath(pathname: string): boolean {
  return pathname === "/lp" || pathname.startsWith("/lp/");
}

/**
 * Loads both GTM containers on the same schedule (shared dataLayer).
 * GTM-KHQP88V: GA4 + Google Ads. GTM-NVWQ3PF2: Meta Pixel only.
 * On /lp/*, waits for idle (~3.5s) or first user interaction — whichever comes first.
 */
export function DeferredMarketingScripts() {
  const router = useRouter();
  const onLp = isLandingPath(router.pathname);
  const [lpReady, setLpReady] = useState(false);

  useEffect(() => {
    if (!onLp) {
      setLpReady(false);
      return;
    }

    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      setLpReady(true);
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

  const shouldLoad = !onLp || lpReady;
  const scriptStrategy = onLp ? "lazyOnload" : "afterInteractive";

  return (
    <>
      {GTM_ID && shouldLoad ? (
        <Script
          id="gtm-bootstrap"
          strategy={scriptStrategy}
          dangerouslySetInnerHTML={{
            __html: buildGtmBootstrapScript(GTM_ID),
          }}
        />
      ) : null}
      {GTM_ID_META && shouldLoad ? (
        <Script
          id="gtm-bootstrap-meta"
          strategy={scriptStrategy}
          dangerouslySetInnerHTML={{
            __html: buildGtmBootstrapScript(GTM_ID_META),
          }}
        />
      ) : null}
    </>
  );
}
