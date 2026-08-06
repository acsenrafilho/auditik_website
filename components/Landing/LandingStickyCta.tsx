import type { ReactNode } from "react";

type LandingStickyCtaProps = {
  onScheduleClick: () => void;
  scheduleLabel?: string;
  whatsappButton: ReactNode;
};

/**
 * Fixed bottom bar for mobile conversion LPs.
 * Pair with bottom padding on <main> so content is not covered.
 */
export function LandingStickyCta({
  onScheduleClick,
  scheduleLabel = "Agendar",
  whatsappButton,
}: LandingStickyCtaProps) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-slate-200 bg-white/95 px-3 pt-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-md md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-lg gap-2">
        <button
          type="button"
          onClick={onScheduleClick}
          className="flex h-12 flex-1 items-center justify-center rounded-full bg-auditik-yellow px-4 text-sm font-extrabold uppercase tracking-wide text-slate-900 transition-colors hover:bg-yellow-400"
        >
          {scheduleLabel}
        </button>
        <div className="flex h-12 flex-1 items-stretch">{whatsappButton}</div>
      </div>
    </div>
  );
}
