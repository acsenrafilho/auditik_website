import { useState } from "react";
import { LandingIcon } from "./LandingIcon";

type LandingMapPreviewProps = {
  embedSrc: string;
  title: string;
  onReveal?: () => void;
  className?: string;
};

/**
 * Defers Google Maps iframe until the visitor asks — keeps Maps JS off the LCP path.
 */
export function LandingMapPreview({
  embedSrc,
  title,
  onReveal,
  className = "h-48 w-full sm:h-56",
}: LandingMapPreviewProps) {
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return (
      <iframe
        title={title}
        src={embedSrc}
        className={`${className} border-0`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setRevealed(true);
        onReveal?.();
      }}
      className={`${className} flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-100 via-bg-light-blue to-slate-200 text-auditik-blue transition-colors hover:from-blue-50 hover:to-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-auditik-blue`}
      aria-label="Carregar mapa interativo"
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-soft">
        <LandingIcon name="map" className="h-7 w-7" />
      </span>
      <span className="text-sm font-bold">Ver mapa</span>
      <span className="max-w-[14rem] text-center text-xs font-medium text-slate-500">
        Carrega o Google Maps somente quando você pedir
      </span>
    </button>
  );
}
