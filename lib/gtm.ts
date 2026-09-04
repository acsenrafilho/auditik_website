/**
 * GTM-KHQP88V — GA4 + Google Ads + Meta Pixel (NEXT_PUBLIC_GTM_ID).
 *
 * Cutover (production): set NEXT_PUBLIC_GTM_ID_META to a cutover sentinel
 * (`empty`, `none`, `off`, or `-`) — GitHub Variables cannot be blank.
 * Do not leave the variable unset (unset still defaults to legacy NVWQ3PF2).
 * Set NEXT_PUBLIC_META_LEAD_BROWSER_FBQ=false so GTM tag 49 owns Pixel Lead on CE meta_lead.
 *
 * Dual-GTM (legacy test): set NEXT_PUBLIC_GTM_ID_META=GTM-NVWQ3PF2 and pause Meta tags
 * in KHQP88V while the second container owns Pixel.
 */

/** GitHub Variables cannot be empty; these values mean “no second GTM”. */
const META_GTM_CUTOVER_SENTINELS = new Set(["", "empty", "none", "off", "-", "disabled"]);

const resolveMetaGtmId = (raw: string | undefined): string => {
  // Unset → legacy dual-GTM default (must not drop the GitHub variable).
  if (raw === undefined) return "GTM-NVWQ3PF2";
  const trimmed = raw.trim();
  if (META_GTM_CUTOVER_SENTINELS.has(trimmed.toLowerCase())) return "";
  return trimmed;
};

export const GTM_ID = (process.env.NEXT_PUBLIC_GTM_ID || "GTM-KHQP88V").trim();

export const GTM_ID_META = resolveMetaGtmId(process.env.NEXT_PUBLIC_GTM_ID_META);

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
