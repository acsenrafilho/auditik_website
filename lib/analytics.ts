/**
 * Google Analytics 4 tracking utilities
 * Requires: NEXT_PUBLIC_GA_ID environment variable configured
 */

export interface EventParams {
  [key: string]: string | number | boolean;
}

/**
 * Track a custom event in Google Analytics 4
 * Usage: trackEvent('contact_form_submit', { location: 'piracicaba' })
 */
export const trackEvent = (eventName: string, params?: EventParams) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, params);
  }
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
 * Track conversion goal (appointment scheduled, form submitted, etc)
 * Usage: trackConversion('free_evaluation_scheduled', { location: 'piracicaba' })
 */
export const trackConversion = (goalName: string, params?: EventParams) => {
  trackEvent(`conversion_${goalName}`, {
    goal_name: goalName,
    ...params,
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
 * Track user demographics and custom properties
 * Usage: setUserProperties({ user_type: 'prospective_customer', interest: 'hearing_aids' })
 */
export const setUserProperties = (properties: EventParams) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
      user_properties: properties,
    });
  }
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
 * Initialize GA4 script in the page head
 * This is typically done in pages/_app.tsx or pages/_document.tsx
 * Usage in _document.tsx:
 *   import { GA_ID } from '@lib/analytics'
 *   <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

/**
 * Common conversion goals for hearing aid clinic
 */
export const CONVERSION_GOALS = {
  CONTACT_FORM_SUBMIT: "contact_form_submit",
  APPOINTMENT_SCHEDULED: "appointment_scheduled",
  WHATSAPP_CLICK: "whatsapp_click",
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
