import { APP_ROUTES } from "@lib/routes";

const STORAGE_KEY = "auditik_thankyou";

export type ThankYouFormKind = "contact" | "whatsapp";

export interface ThankYouToken {
  form: ThankYouFormKind;
  source: string;
  ts: number;
  whatsappUrl?: string;
}

export const THANK_YOU_PATH = APP_ROUTES.obrigado;

/**
 * After a validated form submit: persist thank-you token, optionally open WhatsApp,
 * then redirect to /obrigado/ (Meta Lead + Google Ads fire there via GTM). Callers may
 * invoke this even when the CRM POST fails so the thank-you path is not blocked by CRM.
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
    };
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
};
