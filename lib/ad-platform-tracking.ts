import { pushToDataLayer } from "@lib/data-layer";

export interface AdsEventParams {
  [key: string]: string | number | boolean;
}

// Required ID for Meta Pixel base script initialization.
// Fill with your Pixel ID in .env.local / deployment env:
// NEXT_PUBLIC_META_PIXEL_ID=123456789012345
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

/** Google Ads conversion kinds emitted to dataLayer for GTM tags. */
export type GoogleAdsConversionKind = "contact" | "appointment" | "whatsapp" | "phone";

const pushGoogleAdsConversion = (conversionType: GoogleAdsConversionKind, params?: AdsEventParams) => {
  const extra = (params || {}) as Record<string, unknown>;
  pushToDataLayer({
    ...extra,
    event: "google_ads_conversion",
    conversion_type: conversionType,
  });
};

export const trackMetaEvent = (eventName: string, params?: AdsEventParams) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", eventName, params || {});
  }
};

export const trackCrossPlatformConversion = (
  goalName: string,
  params?: AdsEventParams,
) => {
  const goal = goalName.toLowerCase();
  const metaParams = {};

  if (goal === "contact_form_submit") {
    trackMetaEvent("Lead", metaParams);
  }

  if (goal === "whatsapp_lead_submitted") {
    trackMetaEvent("Lead", metaParams);
  }

  if (goal === "appointment_scheduled" || goal === "free_evaluation_requested") {
    trackMetaEvent("Schedule", metaParams);
    trackMetaEvent("Lead", metaParams);
  }

  if (goal === "whatsapp_click" || goal === "phone_call_initiated") {
    trackMetaEvent("Lead", metaParams);
  }

  if (goal === "contact_form_submit" || goal === "whatsapp_lead_submitted") {
    pushGoogleAdsConversion("contact", params);
  }

  if (goal === "appointment_scheduled" || goal === "free_evaluation_requested") {
    pushGoogleAdsConversion("appointment", params);
  }

  if (goal === "whatsapp_click") {
    pushGoogleAdsConversion("whatsapp", params);
  }

  if (goal === "phone_call_initiated") {
    pushGoogleAdsConversion("phone", params);
  }
};
