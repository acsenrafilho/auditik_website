import { trackMetaLead } from "@lib/analytics";
import { META_LEAD_BROWSER_FBQ, META_PIXEL_ID } from "@lib/gtm";
import { APP_ROUTES } from "@lib/routes";

const STORAGE_KEY = "auditik_thankyou";
const FBQ_WAIT_MS = 2000;
const FBQ_POLL_MS = 50;
const PIXEL_FLUSH_MS = 400;

export type ThankYouFormKind = "contact" | "whatsapp";

export interface ThankYouToken {
  form: ThankYouFormKind;
  source: string;
  ts: number;
  whatsappUrl?: string;
}

export const THANK_YOU_PATH = APP_ROUTES.obrigado;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

/**
 * Wait for GTM-initialized fbq, then fire standard Lead (browser).
 * Used so Meta Test Events sees Lead on the form URL before redirect.
 */
const fireBrowserMetaLead = async (): Promise<void> => {
  if (!META_LEAD_BROWSER_FBQ) return;

  const started = Date.now();
  while (typeof window.fbq !== "function" && Date.now() - started < FBQ_WAIT_MS) {
    await wait(FBQ_POLL_MS);
  }

  if (typeof window.fbq !== "function") {
    console.warn("Meta Pixel fbq not ready; Lead not sent via browser.");
    return;
  }

  if (META_PIXEL_ID) {
    window.fbq("trackSingle", META_PIXEL_ID, "Lead");
  } else {
    window.fbq("track", "Lead");
  }

  await wait(PIXEL_FLUSH_MS);
};

/**
 * After CRM success: persist thank-you token, fire Meta Lead on this page,
 * optionally open WhatsApp, then redirect to /obrigado/ (Google Ads fires there).
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

  trackMetaLead({
    lead_type: payload.form,
    lead_source: payload.source,
    page: window.location.pathname,
  });

  await fireBrowserMetaLead();

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
