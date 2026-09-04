/**
 * Site measurement signals for Google Tag Manager (dataLayer).
 * GA4 / Google Ads: GTM-KHQP88V. Meta Pixel: GTM-NVWQ3PF2 (shared dataLayer).
 */

import { trackCrossPlatformConversion } from "@lib/ad-platform-tracking";
import { pushToDataLayer } from "@lib/data-layer";

export interface EventParams {
  [key: string]: string | number | boolean;
}

/**
 * Track a custom event (GTM listens on `event` name).
 * Usage: trackEvent('contact_form_submit', { location: 'piracicaba' })
 */
export const trackEvent = (eventName: string, params?: EventParams) => {
  const base = (params || {}) as Record<string, unknown>;
  pushToDataLayer({
    ...base,
    event: eventName,
  });
};

/**
 * Track page view with custom title and path
 * Usage: trackPageView('/nossa-clinica', 'Nossa Clínica')
 */
export const trackPageView = (path: string, title: string) => {
  trackEvent("page_view", {
    page_path: path,
    page_title: title,
  });
};

/**
 * Track form submission
 * Usage: trackFormSubmit('contact', { location: 'piracicaba' })
 */
export const trackFormSubmit = (formName: string, params?: EventParams) => {
  trackEvent(`${formName}_form_submit`, {
    form_name: formName,
    ...params,
  });
};

/**
 * Track button click
 * Usage: trackButtonClick('schedule_appointment', { device: 'HearLink 500' })
 */
export const trackButtonClick = (buttonName: string, params?: EventParams) => {
  trackEvent(`button_click`, {
    button_name: buttonName,
    ...params,
  });

  const normalizedName = buttonName.toLowerCase();

  if (normalizedName.includes("whatsapp")) {
    trackCrossPlatformConversion("whatsapp_click", {
      source: normalizedName,
      ...params,
    });
  }

  if (normalizedName.includes("phone") || normalizedName.includes("call")) {
    trackCrossPlatformConversion("phone_call_initiated", {
      source: normalizedName,
      ...params,
    });
  }
};

/**
 * Track link click (external or important links)
 * Usage: trackLinkClick('whatsapp', { location: 'contato_page' })
 */
export const trackLinkClick = (linkName: string, params?: EventParams) => {
  trackEvent(`link_click`, {
    link_name: linkName,
    ...params,
  });
};

/**
 * Track conversion goal: dataLayer `conversion_*` + Google Ads fan-out via
 * `trackCrossPlatformConversion`. Does **not** emit Meta Lead — use `trackMetaLead`.
 *
 * Google Ads Lead (GTM-KHQP88V): `contact_form_submit` / `whatsapp_lead_submitted` via
 *   `trackConversion` on `/obrigado/` → `google_ads_conversion` (tag 35).
 *
 * Usage: trackConversion('contact_form_submit', { location: 'piracicaba' })
 */
export const trackConversion = (goalName: string, params?: EventParams) => {
  trackEvent(`conversion_${goalName}`, {
    goal_name: goalName,
    ...params,
  });

  trackCrossPlatformConversion(goalName, params);
};

export type MetaLeadType = "contact" | "whatsapp";

export interface MetaLeadParams extends EventParams {
  lead_type: MetaLeadType;
}

/**
 * Meta Lead dataLayer signal (Custom Event `meta_lead`).
 * Fired from `markThankYouSuccess` on the form page after CRM OK — not on `/obrigado/`,
 * clicks, or Schedule. GTM maps this to Pixel standard Lead when browser fbq is off
 * (`NEXT_PUBLIC_META_LEAD_BROWSER_FBQ=false`).
 *
 * Usage: trackMetaLead({ lead_type: 'contact', lead_source: 'Website Contato', page: '/lp/...' })
 */
export const trackMetaLead = (params: MetaLeadParams) => {
  const { lead_type, ...rest } = params;
  pushToDataLayer({
    ...rest,
    lead_type,
    event: "meta_lead",
  });
};

/**
 * Track product view (device/product page visit)
 * Usage: trackProductView('HearLink 500', { category: 'hearing_aids' })
 */
export const trackProductView = (productName: string, params?: EventParams) => {
  trackEvent("view_item", {
    item_name: productName,
    item_category: "hearing_aids",
    ...params,
  });
};

/**
 * Track content engagement (scroll depth, time on page)
 * Usage: trackEngagement('blog_post', { time_seconds: 120, scroll_depth: 75 })
 */
export const trackEngagement = (contentType: string, params?: EventParams) => {
  trackEvent("engagement", {
    content_type: contentType,
    ...params,
  });
};

/**
 * User properties for GA4 — map this event in GTM to GA4 user_properties.
 * Usage: setUserProperties({ user_type: 'prospective_customer', interest: 'hearing_aids' })
 */
export const setUserProperties = (properties: EventParams) => {
  pushToDataLayer({
    event: "set_user_properties",
    user_properties: properties as Record<string, unknown>,
  });
};

/**
 * Track exception/error
 * Usage: trackException('contact_form_error', 'Email validation failed')
 */
export const trackException = (description: string, fatal: boolean = false) => {
  trackEvent("exception", {
    description,
    fatal,
  });
};

/**
 * Track video engagement (if website includes video content)
 * Usage: trackVideoEvent('play', 'product_demo_video', { position: 0 })
 */
export const trackVideoEvent = (
  action: "play" | "pause" | "complete" | "start",
  videoId: string,
  params?: EventParams,
) => {
  trackEvent(`video_${action}`, {
    video_id: videoId,
    ...params,
  });
};

/**
 * Common conversion goals for hearing aid clinic.
 *
 * Ads mapping:
 * - CONTACT_FORM_SUBMIT / WHATSAPP_LEAD_SUBMITTED → Meta Lead on form page via
 *   `markThankYouSuccess` (`meta_lead` + optional browser fbq); Google Ads on `/obrigado/`
 *   via `trackConversion` → `google_ads_conversion` (tag 35)
 * - APPOINTMENT_SCHEDULED → dataLayer (Meta Schedule in GTM) + Google appointment
 * - WHATSAPP_CLICK / PHONE_CALL_INITIATED → Google only (not Meta Lead)
 * - FREE_EVALUATION_REQUESTED → no Meta/Google ads event (pedido ≠ agendamento)
 */
export const CONVERSION_GOALS = {
  CONTACT_FORM_SUBMIT: "contact_form_submit",
  APPOINTMENT_SCHEDULED: "appointment_scheduled",
  WHATSAPP_CLICK: "whatsapp_click",
  WHATSAPP_LEAD_SUBMITTED: "whatsapp_lead_submitted",
  FREE_EVALUATION_REQUESTED: "free_evaluation_requested",
  PHONE_CALL_INITIATED: "phone_call_initiated",
  INSURANCE_INQUIRY: "insurance_inquiry",
};

/**
 * Common button names for tracking
 */
export const BUTTON_NAMES = {
  SCHEDULE_APPOINTMENT: "schedule_appointment",
  GET_FREE_EVALUATION: "get_free_evaluation",
  CONTACT_US: "contact_us",
  LEARN_MORE: "learn_more",
  VIEW_PRODUCTS: "view_products",
  OPEN_WHATSAPP: "open_whatsapp",
  CALL_NOW: "call_now",
};

/**
 * Common product names for tracking
 */
export const PRODUCT_NAMES = {
  HEARLINK_100H: "HearLink 100H",
  HEARLINK_500: "HearLink 500",
  HEARLINK_700: "HearLink 700",
};
