declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Push to GTM dataLayer (no-op during SSR). */
export const pushToDataLayer = (payload: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
};
