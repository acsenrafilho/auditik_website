/**
 * GTM-KHQP88V — GA4 + Google Ads (NEXT_PUBLIC_GTM_ID).
 * GTM-NVWQ3PF2 — Meta Pixel only (NEXT_PUBLIC_GTM_ID_META) during dual-GTM test.
 * Both share window.dataLayer; Meta tags in the legacy container must stay paused
 * while NEXT_PUBLIC_GTM_ID_META is set.
 *
 * Cutover to single container (KHQP88V): set NEXT_PUBLIC_GTM_ID_META to empty
 * (variable present but blank — do not leave unset, or the default NVWQ3PF2 applies),
 * set NEXT_PUBLIC_META_LEAD_BROWSER_FBQ=false, unpause Meta tags 38/39/44 in KHQP88V.
 */

/** True when env is unset; false when explicitly set to "" (cutover). */
const metaGtmEnv = process.env.NEXT_PUBLIC_GTM_ID_META;

export const GTM_ID = (process.env.NEXT_PUBLIC_GTM_ID || "GTM-KHQP88V").trim();

export const GTM_ID_META = (
  metaGtmEnv === undefined ? "GTM-NVWQ3PF2" : metaGtmEnv
).trim();

/**
 * When true (default), after CRM OK the site calls fbq('track','Lead') on the form page
 * so Meta Test Events sees Lead before redirect to /obrigado/.
 * Set to "false" when Meta Lead is fired only by GTM (tag 39 on Custom Event meta_lead).
 */
export const META_LEAD_BROWSER_FBQ = (
  process.env.NEXT_PUBLIC_META_LEAD_BROWSER_FBQ ?? "true"
)
  .trim()
  .toLowerCase() !== "false";

/** Optional Pixel ID for fbq('trackSingle', id, 'Lead') when multiple pixels may be present. */
export const META_PIXEL_ID = (
  process.env.NEXT_PUBLIC_META_PIXEL_ID || ""
).trim();

/** Standard GTM bootstrap snippet (shared dataLayer). */
export const buildGtmBootstrapScript = (containerId: string): string =>
  `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${containerId}');`;
