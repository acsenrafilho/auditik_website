import Script from "next/script";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GTM_ID } from "@lib/gtm";

const LP_IDLE_TIMEOUT_MS = 3500;

function isLandingPath(pathname: string): boolean {
  return pathname === "/lp" || pathname.startsWith("/lp/");
}

/**
 * Loads GTM immediately on institutional pages.
 * On /lp/*, waits for idle (~3.5s) or first user interaction — whichever comes first.
 * Meta Pixel is owned by GTM (not injected here).
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

  return (
    <>
      {GTM_ID && shouldLoad ? (
        <Script
          id="gtm-bootstrap"
          strategy={onLp ? "lazyOnload" : "afterInteractive"}
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      ) : null}
    </>
  );
}
