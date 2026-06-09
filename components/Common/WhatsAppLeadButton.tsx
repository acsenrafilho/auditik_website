import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { EventParams } from "@lib/analytics";
import {
  trackButtonClick,
  trackConversion,
  trackEvent,
  trackFormSubmit,
} from "@lib/analytics";
import { formatBrazilPhone, submitLeadToCRM } from "@lib/lead-submission";
import { WHATSAPP_LEAD_CITIES } from "@lib/whatsapp-cities";

interface WhatsAppLeadButtonProps {
  className: string;
  buttonName: string;
  children: ReactNode;
  whatsappMessage: string;
  leadSource: string;
  trackingParams?: EventParams;
  companyID?: string;
}

interface LeadFormData {
  fullName: string;
  phone: string;
  city: string;
}

const BRAZIL_WHATSAPP_PHONE = "551933776941";

export function WhatsAppLeadButton({
  className,
  buttonName,
  children,
  whatsappMessage,
  leadSource,
  trackingParams,
  companyID,
}: WhatsAppLeadButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: "",
    phone: "",
    city: "",
  });

  const normalizedPhone = useMemo(
    () => formData.phone.replace(/\D/g, ""),
    [formData.phone],
  );

  useEffect(() => {
    if (!isModalOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("keydown", onEscape);
    };
  }, [isModalOpen]);

  const handleOpen = () => {
    setSubmitError("");
    setIsModalOpen(true);
    trackEvent("whatsapp_lead_gate_opened", {
      source: leadSource,
      button_name: buttonName,
    });
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    if (name === "phone") {
      setFormData((prev) => ({ ...prev, phone: formatBrazilPhone(value) }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (normalizedPhone.length < 10) {
      setSubmitError("Informe um telefone válido com DDD.");
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    try {
      await submitLeadToCRM({
        fullName: formData.fullName,
        phone: formData.phone,
        city: formData.city,
        fallbackSource: leadSource,
        formName: `WhatsApp — ${leadSource}`,
        companyID,
      });

      const metrics = {
        source: leadSource,
        city: formData.city,
        button_name: buttonName,
      };

      trackFormSubmit("whatsapp_lead", metrics);
      trackConversion("whatsapp_lead_submitted", metrics);
      trackButtonClick(buttonName, {
        source: leadSource,
        city: formData.city,
        ...trackingParams,
      });

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/${BRAZIL_WHATSAPP_PHONE}?text=${encodedMessage}`;

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      trackEvent("whatsapp_chat_opened_after_lead", metrics);

      setIsModalOpen(false);
      setFormData({ fullName: "", phone: "", city: "" });
    } catch (error) {
      console.error("WhatsApp lead submit error:", error);
      setSubmitError(
        "Não conseguimos iniciar o WhatsApp agora. Tente novamente em instantes.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button type="button" className={className} onClick={handleOpen}>
        {children}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60"
            onClick={handleClose}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-5">
              <h3 className="text-xl font-extrabold text-slate-900">
                Antes de abrir o WhatsApp
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Preencha rapidamente seus dados para nossa equipe priorizar seu
                atendimento.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="whatsapp-lead-name"
                  className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500"
                >
                  Nome
                </label>
                <input
                  id="whatsapp-lead-name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  maxLength={100}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all focus:border-auditik-blue focus:bg-white focus:ring-2 focus:ring-auditik-blue/20"
                  placeholder="Como gostaria de ser chamado(a)?"
                />
              </div>

              <div>
                <label
                  htmlFor="whatsapp-lead-phone"
                  className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500"
                >
                  Telefone com DDD
                </label>
                <input
                  id="whatsapp-lead-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={15}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all focus:border-auditik-blue focus:bg-white focus:ring-2 focus:ring-auditik-blue/20"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label
                  htmlFor="whatsapp-lead-city"
                  className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500"
                >
                  Cidade
                </label>
                <select
                  id="whatsapp-lead-city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all focus:border-auditik-blue focus:bg-white focus:ring-2 focus:ring-auditik-blue/20"
                >
                  <option value="">Selecione uma cidade</option>
                  {WHATSAPP_LEAD_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {submitError && (
                <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
                  {submitError}
                </p>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="w-1/2 rounded-full border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-1/2 rounded-full bg-auditik-yellow px-4 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-yellow-400 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    "Abrir WhatsApp"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
