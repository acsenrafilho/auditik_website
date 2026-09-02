import { pushToDataLayer } from "@lib/data-layer";

export interface AdsEventParams {
  [key: string]: string | number | boolean;
}

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

/**
 * Cross-platform conversion mapping.
 *
 * Meta Lead / Schedule: fired by GTM-NVWQ3PF2 from dataLayer (site does not call fbq).
 * Google Ads: this helper still pushes `google_ads_conversion` for GTM.
 *
 * Meta Lead goals: GTM-NVWQ3PF2 Page Path `/obrigado/` (legacy tag 39 on `conversion_*` paused).
 * Meta Schedule goal: `appointment_scheduled` (real booking — not LP request).
 * Clicks (`whatsapp_click`, `phone_call_initiated`) stay Google Ads / GTM only.
 * `free_evaluation_requested` is intentionally a no-op for ads platforms
 *   (request ≠ scheduled appointment).
 */
export const trackCrossPlatformConversion = (
  goalName: string,
  params?: AdsEventParams,
) => {
  const goal = goalName.toLowerCase();

  if (goal === "contact_form_submit" || goal === "whatsapp_lead_submitted") {
    pushGoogleAdsConversion("contact", params);
  }

  if (goal === "appointment_scheduled") {
    pushGoogleAdsConversion("appointment", params);
  }

  if (goal === "whatsapp_click") {
    pushGoogleAdsConversion("whatsapp", params);
  }

  if (goal === "phone_call_initiated") {
    pushGoogleAdsConversion("phone", params);
  }
};
