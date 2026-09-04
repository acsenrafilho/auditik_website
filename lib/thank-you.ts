import { trackMetaLead } from "@lib/analytics";
import { META_LEAD_BROWSER_FBQ, META_PIXEL_ID } from "@lib/gtm";
import { APP_ROUTES } from "@lib/routes";

const STORAGE_KEY = "auditik_thankyou";
const FBQ_WAIT_MS = 8000;
const FBQ_POLL_MS = 50;
const PIXEL_FLUSH_MS = 1000;

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

const createEventId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
};

const buildMetaLeadPixelUrl = (eventID: string): string => {
  const params = new URLSearchParams({
    id: META_PIXEL_ID,
    ev: "Lead",
    noscript: "1",
    eid: eventID,
  });
  return `https://www.facebook.com/tr?${params.toString()}`;
};

/** Noscript-style pixel when fbq is unavailable (requires META_PIXEL_ID). */
const fireImagePixelLead = (eventID: string): void => {
  if (!META_PIXEL_ID) return;

  const url = buildMetaLeadPixelUrl(eventID);

  try {
    if (typeof navigator.sendBeacon === "function") {
      navigator.sendBeacon(url);
    }
  } catch {
    // ignore beacon failures; image fallback below
  }

  const img = new Image();
  img.src = url;
};

/**
 * Wait for GTM-initialized fbq, then fire standard Lead (browser).
 * Falls back to image/beacon pixel if fbq never becomes ready.
 */
const fireBrowserMetaLead = async (eventID: string): Promise<void> => {
  if (!META_LEAD_BROWSER_FBQ) return;

  const started = Date.now();
  while (typeof window.fbq !== "function" && Date.now() - started < FBQ_WAIT_MS) {
    await wait(FBQ_POLL_MS);
  }

  const eventData = {};
  const eventOptions = { eventID };

  if (typeof window.fbq === "function") {
    if (META_PIXEL_ID) {
      window.fbq("trackSingle", META_PIXEL_ID, "Lead", eventData, eventOptions);
      window.fbq("track", "Lead", eventData, eventOptions);
    } else {
      window.fbq("track", "Lead", eventData, eventOptions);
    }
  } else {
    console.warn("Meta Pixel fbq not ready; using image/beacon Lead fallback.");
    fireImagePixelLead(eventID);
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

  const eventID = createEventId();

  trackMetaLead({
    lead_type: payload.form,
    lead_source: payload.source,
    page: window.location.pathname,
    eventID,
  });

  await fireBrowserMetaLead(eventID);

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
