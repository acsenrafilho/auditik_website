/**
 * GTM-KHQP88V — GA4 + Google Ads + Meta Pixel (NEXT_PUBLIC_GTM_ID).
 *
 * Cutover (default production): set NEXT_PUBLIC_GTM_ID_META to empty string
 * (variable present but blank — do not leave unset, or the legacy NVWQ3PF2 default applies),
 * and set NEXT_PUBLIC_META_LEAD_BROWSER_FBQ=false so GTM tag 49 owns Pixel Lead on CE meta_lead.
 *
 * Dual-GTM (legacy test): set NEXT_PUBLIC_GTM_ID_META=GTM-NVWQ3PF2 and pause Meta tags
 * in KHQP88V while the second container owns Pixel.
 */

/** True when env is unset; false when explicitly set to "" (cutover). */
const metaGtmEnv = process.env.NEXT_PUBLIC_GTM_ID_META;

export const GTM_ID = (process.env.NEXT_PUBLIC_GTM_ID || "GTM-KHQP88V").trim();

export const GTM_ID_META = (
  metaGtmEnv === undefined ? "GTM-NVWQ3PF2" : metaGtmEnv
).trim();

/**
 * When true, after form submit the site calls fbq('track','Lead') on the form page.
 * Production cutover: set to "false" — GTM tag 49 fires standard Lead on Custom Event meta_lead.
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
