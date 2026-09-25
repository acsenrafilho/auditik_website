import { APP_ROUTES } from "@lib/routes";

const STORAGE_KEY = "auditik_thankyou";

export type ThankYouFormKind = "contact" | "whatsapp";

export interface ThankYouToken {
  form: ThankYouFormKind;
  source: string;
  ts: number;
  whatsappUrl?: string;
  /** Same id as sheet lead_id / Meta event_id for dedupe. */
  eventId?: string;
}

export const THANK_YOU_PATH = APP_ROUTES.obrigado;

/**
 * After the conversion sheet confirms the row: persist thank-you token,
 * optionally open WhatsApp, then redirect to /obrigado/ (browser Meta
 * LeadFormSubmit + Google Ads fire there via GTM, with event_id for CAPI dedupe).
 */
export const markThankYouSuccess = async (
  payload: Omit<ThankYouToken, "ts">,
): Promise<void> => {
  if (typeof window === "undefined") return;

  const token: ThankYouToken = {
    ...payload,
    ts: Date.now(),
  };

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(token));
  } catch (error) {
    console.warn("Unable to persist thank-you token.", error);
  }

  if (payload.whatsappUrl) {
    window.open(payload.whatsappUrl, "_blank", "noopener,noreferrer");
  }

  window.location.assign(THANK_YOU_PATH);
};

export const consumeThankYouToken = (): ThankYouToken | null => {
  if (typeof window === "undefined") return null;

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    sessionStorage.removeItem(STORAGE_KEY);

    const parsed = JSON.parse(raw) as Partial<ThankYouToken>;
    if (
      (parsed.form !== "contact" && parsed.form !== "whatsapp") ||
      typeof parsed.source !== "string" ||
      typeof parsed.ts !== "number"
    ) {
      return null;
    }

    return {
      form: parsed.form,
      source: parsed.source,
      ts: parsed.ts,
      whatsappUrl:
        typeof parsed.whatsappUrl === "string" ? parsed.whatsappUrl : undefined,
      eventId: typeof parsed.eventId === "string" ? parsed.eventId : undefined,
    };
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
};
