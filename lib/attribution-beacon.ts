/**
 * Silent attribution beacon for Meta Schedule matching (Apps Script Web App).
 * No PII required — sends UTMs + Meta cookies (_fbp / _fbc) + session_id.
 */

import { getAttributionForSubmit } from "@lib/campaign-attribution";
import { fetchWithRetry } from "@lib/fetch-with-retry";

const SESSION_KEY = "auditik_lp_session_id";
const BEACON_SENT_KEY = "auditik_attribution_beacon_sent";

const BEACON_URL = process.env.NEXT_PUBLIC_ATTRIBUTION_BEACON_URL || "";
const BEACON_TOKEN = process.env.NEXT_PUBLIC_ATTRIBUTION_BEACON_TOKEN || "";

const readCookie = (name: string): string => {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : "";
};

export const readMetaCookies = (): { fbp: string; fbc: string } => ({
  fbp: readCookie("_fbp"),
  fbc: readCookie("_fbc"),
});

export const getOrCreateLpSessionId = (): string => {
  if (typeof window === "undefined") return "";

  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `sess_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return `sess_${Date.now()}`;
  }
};

export type AttributionBeaconPayload = {
  session_id: string;
  token?: string;
  fbp?: string;
  fbc?: string;
  fbclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_page?: string;
};

/**
 * Fire-and-forget beacon. Safe to call multiple times; dedupes per sessionStorage key
 * unless `force` is true.
 */
export const sendAttributionBeacon = async (
  options?: { force?: boolean },
): Promise<boolean> => {
  if (typeof window === "undefined") return false;
  if (!BEACON_URL) return false;

  try {
    if (!options?.force && sessionStorage.getItem(BEACON_SENT_KEY) === "1") {
      return true;
    }
  } catch {
    // continue
  }

  const attribution = getAttributionForSubmit();
  const { fbp, fbc } = readMetaCookies();
  const session_id = getOrCreateLpSessionId();

  let fbclid = "";
  try {
    fbclid = new URLSearchParams(window.location.search).get("fbclid") || "";
  } catch {
    fbclid = "";
  }

  const payload: AttributionBeaconPayload = {
    session_id,
    token: BEACON_TOKEN || undefined,
    fbp: fbp || undefined,
    fbc: fbc || undefined,
    fbclid: fbclid || undefined,
    utm_source: attribution.utm_source || undefined,
    utm_medium: attribution.utm_medium || undefined,
    utm_campaign: attribution.utm_campaign || undefined,
    utm_content: attribution.utm_content || undefined,
    utm_term: attribution.utm_term || undefined,
    landing_page: window.location.href,
  };

  try {
    const url = BEACON_TOKEN
      ? `${BEACON_URL}${BEACON_URL.includes("?") ? "&" : "?"}token=${encodeURIComponent(BEACON_TOKEN)}`
      : BEACON_URL;

    const response = await fetchWithRetry(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });

    if (!response.ok) {
      console.warn("Attribution beacon non-OK", response.status);
      return false;
    }

    try {
      sessionStorage.setItem(BEACON_SENT_KEY, "1");
    } catch {
      // ignore
    }
    return true;
  } catch (error) {
    console.warn("Attribution beacon failed", error);
    return false;
  }
};
