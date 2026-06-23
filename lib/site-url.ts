import { ensureTrailingSlash } from "@lib/routes";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://auditik.com.br";

export const SATELLITE_SITE_URL = "https://www.auditik.com.br";

export const DEFAULT_OG_IMAGE_PATH = "/images/logo-auditik.png";

export const DEFAULT_LOGO_PATH = "/images/logo-auditik.png";

export function absoluteUrl(path: string, baseUrl: string = SITE_URL): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${ensureTrailingSlash(normalized)}`;
}

export function absoluteAssetUrl(
  assetPath: string,
  baseUrl: string = SITE_URL,
): string {
  if (!assetPath) {
    return absoluteUrl(DEFAULT_OG_IMAGE_PATH, baseUrl);
  }
  if (/^https?:\/\//i.test(assetPath)) {
    return assetPath;
  }
  const normalized = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return `${baseUrl}${normalized}`;
}
