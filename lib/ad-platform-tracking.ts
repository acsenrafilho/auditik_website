export interface AdsEventParams {
  [key: string]: string | number | boolean;
}

// Required ID for Meta Pixel base script initialization.
// Fill with your Pixel ID in .env.local / deployment env:
// NEXT_PUBLIC_META_PIXEL_ID=123456789012345
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

// Optional Google Ads account ID used by gtag config.
// Fill with your account ID in .env.local / deployment env:
// NEXT_PUBLIC_GOOGLE_ADS_ID=AW-123456789
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";

// Conversion labels (one per Google Ads conversion action).
// Replace placeholders with real labels from Google Ads conversion setup.
export const GOOGLE_ADS_LABELS = {
  CONTACT: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_CONTACT || "", // e.g. AbCdEfGhIjKlMnOpQr
  APPOINTMENT: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_APPOINTMENT || "", // e.g. ZyXwVuTsRqPoNmLkJi
  WHATSAPP: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_WHATSAPP || "", // e.g. QwErTyUiOpAsDfGhJk
  PHONE: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_PHONE || "", // e.g. LmNoPqRsTuVwXyZaBc
} as const;

const getGoogleAdsSendTo = (label: string) => {
  if (!GOOGLE_ADS_ID || !label) return "";
  return `${GOOGLE_ADS_ID}/${label}`;
};

export const trackMetaEvent = (eventName: string, params?: AdsEventParams) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", eventName, params || {});
  }
};

export const trackGoogleAdsConversion = (label: string, params?: AdsEventParams) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    const sendTo = getGoogleAdsSendTo(label);
    if (!sendTo) return;

    (window as any).gtag("event", "conversion", {
      send_to: sendTo,
      ...params,
    });
  }
};

export const trackCrossPlatformConversion = (
  goalName: string,
  params?: AdsEventParams,
) => {
  const goal = goalName.toLowerCase();

  // Meta mapping
  if (goal === "contact_form_submit") {
    trackMetaEvent("Lead", params);
    trackMetaEvent("Contact", params);
  }

  if (goal === "appointment_scheduled" || goal === "free_evaluation_requested") {
    trackMetaEvent("Schedule", params);
    trackMetaEvent("Lead", params);
  }

  if (goal === "whatsapp_click" || goal === "phone_call_initiated") {
    trackMetaEvent("Contact", params);
  }

  // Google Ads mapping
  if (goal === "contact_form_submit") {
    trackGoogleAdsConversion(GOOGLE_ADS_LABELS.CONTACT, params);
  }

  if (goal === "appointment_scheduled" || goal === "free_evaluation_requested") {
    trackGoogleAdsConversion(GOOGLE_ADS_LABELS.APPOINTMENT, params);
  }

  if (goal === "whatsapp_click") {
    trackGoogleAdsConversion(GOOGLE_ADS_LABELS.WHATSAPP, params);
  }

  if (goal === "phone_call_initiated") {
    trackGoogleAdsConversion(GOOGLE_ADS_LABELS.PHONE, params);
  }
};
