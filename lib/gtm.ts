/**
 * Public GTM container ID (e.g. GTM-KHQP88V). Set NEXT_PUBLIC_GTM_ID in .env / CI.
 * Fallback matches the agency-provided container if the env var is omitted.
 */
export const GTM_ID = (process.env.NEXT_PUBLIC_GTM_ID || "GTM-KHQP88V").trim();
