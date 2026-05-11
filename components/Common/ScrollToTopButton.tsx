import { useCallback, useEffect, useState } from "react";
import { trackButtonClick } from "@lib/analytics";

function scrollThresholdPx(): number {
  if (typeof window === "undefined") return 400;
  return Math.min(400, Math.max(240, window.innerHeight * 0.28));
}

function reducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      setVisible(window.scrollY > scrollThresholdPx());
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    // iOS Safari: barra de endereço altera altura útil — recalcula limiar e visibilidade
    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener("resize", update);
      vv.addEventListener("scroll", update);
    }

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (vv) {
        vv.removeEventListener("resize", update);
        vv.removeEventListener("scroll", update);
      }
    };
  }, []);

  const handleClick = useCallback(() => {
    trackButtonClick("scroll_to_top", { section: "floating" });
    window.scrollTo({
      top: 0,
      behavior: reducedMotion() ? "auto" : "smooth",
    });
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label="Voltar ao topo"
      onClick={handleClick}
      className="fixed z-40 flex min-h-11 min-w-11 touch-manipulation select-none items-center justify-center rounded-full border border-slate-200/90 bg-white/95 text-auditik-blue shadow-md shadow-slate-900/10 backdrop-blur-sm transition-[opacity,box-shadow,transform] hover:scale-105 hover:shadow-lg hover:shadow-slate-900/15 active:scale-95 active:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-auditik-blue opacity-90 hover:opacity-100 bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] right-[max(1.25rem,env(safe-area-inset-right,0px))]"
    >
      <span className="material-symbols-outlined text-[24px] leading-none" aria-hidden>
        keyboard_arrow_up
      </span>
    </button>
  );
}
