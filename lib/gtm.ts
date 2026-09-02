/**
 * GTM-KHQP88V — GA4 + Google Ads (NEXT_PUBLIC_GTM_ID).
 * GTM-NVWQ3PF2 — Meta Pixel only (NEXT_PUBLIC_GTM_ID_META).
 * Both share window.dataLayer; Meta tags in the legacy container must stay paused.
 */
export const GTM_ID = (process.env.NEXT_PUBLIC_GTM_ID || "GTM-KHQP88V").trim();

export const GTM_ID_META = (
  process.env.NEXT_PUBLIC_GTM_ID_META || "GTM-NVWQ3PF2"
).trim();

/** Standard GTM bootstrap snippet (shared dataLayer). */
export const buildGtmBootstrapScript = (containerId: string): string =>
  `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${containerId}');`;
