import { useEffect } from "react";

interface LeadSubmitSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhatsApp: () => void;
}

export function LeadSubmitSuccessModal({
  isOpen,
  onClose,
  onOpenWhatsApp,
}: LeadSubmitSuccessModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("keydown", onEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
            <path
              d="M20 7L9 18l-5-5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900">Recebemos seus dados</h3>
        <p className="mt-2 text-sm text-slate-600">
          Obrigado! Nossa equipe vai priorizar seu atendimento. Se preferir, continue
          agora pelo WhatsApp.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 rounded-full border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Fechar
          </button>
          <button
            type="button"
            onClick={onOpenWhatsApp}
            className="w-1/2 rounded-full bg-auditik-yellow px-4 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-yellow-400"
          >
            Ir para WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
