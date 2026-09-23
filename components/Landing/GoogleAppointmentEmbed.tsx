import { useCallback, useEffect, useRef, useState } from "react";

type GoogleAppointmentEmbedProps = {
  embedSrc: string;
  fallbackUrl: string;
  title?: string;
  /** Floor for iframe height (px). Default adapts by viewport. */
  minHeight?: number;
  onReveal?: () => void;
};

/**
 * Google Appointment Schedule needs a tall iframe: on phones the calendar and
 * time list stack, so a fixed 600–640px height forces an inner scrollbar.
 * We size from the viewport and grow further if Google posts a resize message.
 */
function computeEmbedHeight(
  viewportWidth: number,
  viewportHeight: number,
  floor = 0,
): number {
  let target: number;
  if (viewportWidth < 480) {
    // Narrow phones: stacked date picker + times + form fields
    target = Math.max(1200, Math.min(Math.round(viewportHeight * 1.6), 1520));
  } else if (viewportWidth < 768) {
    target = Math.max(1100, Math.min(Math.round(viewportHeight * 1.4), 1400));
  } else if (viewportWidth < 1024) {
    target = Math.max(920, Math.min(Math.round(viewportHeight * 1.05), 1200));
  } else {
    target = Math.max(780, Math.min(Math.round(viewportHeight * 0.92), 1040));
  }
  return Math.max(target, floor);
}

/**
 * Responsive Google Appointment Schedule iframe + open-in-new-tab fallback.
 */
export function GoogleAppointmentEmbed({
  embedSrc,
  fallbackUrl,
  title = "Agendar avaliação na Auditik Piracicaba",
  minHeight = 0,
  onReveal,
}: GoogleAppointmentEmbedProps) {
  const [revealed, setRevealed] = useState(false);
  const [height, setHeight] = useState(900);
  const revealedOnce = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const syncHeight = useCallback(() => {
    if (typeof window === "undefined") return;
    setHeight(
      computeEmbedHeight(window.innerWidth, window.innerHeight, minHeight),
    );
  }, [minHeight]);

  useEffect(() => {
    syncHeight();
    window.addEventListener("resize", syncHeight);
    window.addEventListener("orientationchange", syncHeight);
    return () => {
      window.removeEventListener("resize", syncHeight);
      window.removeEventListener("orientationchange", syncHeight);
    };
  }, [syncHeight]);

  // Some Google embeds announce content size via postMessage
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (
        typeof event.origin === "string" &&
        !event.origin.includes("google.com") &&
        !event.origin.includes("googleusercontent.com")
      ) {
        return;
      }

      const data = event.data;
      let next: number | null = null;

      if (typeof data === "number" && data > 400) {
        next = data;
      } else if (data && typeof data === "object") {
        const record = data as Record<string, unknown>;
        const candidates = [
          record.height,
          record.frameHeight,
          record.iframeHeight,
          typeof record.params === "object" && record.params
            ? (record.params as Record<string, unknown>).height
            : undefined,
        ];
        for (const value of candidates) {
          if (typeof value === "number" && value > 400) {
            next = value;
            break;
          }
          if (typeof value === "string") {
            const parsed = Number.parseInt(value, 10);
            if (Number.isFinite(parsed) && parsed > 400) {
              next = parsed;
              break;
            }
          }
        }
      }

      if (next != null) {
        setHeight((prev) => Math.max(prev, next!, minHeight));
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [minHeight]);

  useEffect(() => {
    if (!revealed || revealedOnce.current) return;
    revealedOnce.current = true;
    onReveal?.();
  }, [revealed, onReveal]);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setRevealed(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  if (!embedSrc) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900 sm:rounded-3xl sm:p-6">
        Agenda indisponível no momento.{" "}
        {fallbackUrl ? (
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline underline-offset-2"
          >
            Abrir agendamento em nova aba
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-soft sm:rounded-3xl">
      {revealed ? (
        <iframe
          ref={iframeRef}
          src={embedSrc}
          title={title}
          width="100%"
          height={height}
          className="block w-full max-w-full bg-white"
          style={{ border: 0, height, minHeight: height }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allow="clipboard-write"
        />
      ) : (
        <div
          className="flex items-center justify-center bg-slate-50 text-sm text-slate-500"
          style={{ minHeight: height }}
        >
          Carregando agenda…
        </div>
      )}

      {fallbackUrl ? (
        <div className="border-t border-slate-100 bg-slate-50 px-3 py-3 text-center sm:px-4">
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-auditik-blue underline-offset-2 hover:underline"
          >
            Abrir agendamento em nova aba
          </a>
          <p className="mt-1 text-xs text-slate-500 sm:hidden">
            Se a agenda ficar apertada no celular, abra em nova aba.
          </p>
        </div>
      ) : null}
    </div>
  );
}
