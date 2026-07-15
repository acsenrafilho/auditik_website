import { toPng } from "html-to-image";

export function getFirstName(fullName: string): string {
  const trimmed = fullName.trim();
  if (!trimmed) return "";
  return trimmed.split(/\s+/)[0] || "";
}

export function formatActivationDateTime(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

export function buildVoucherFilename(slug: string, activatedAt: Date): string {
  const parts = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(activatedAt);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value || "00";

  const stamp = `${get("year")}${get("month")}${get("day")}-${get("hour")}${get("minute")}`;
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, "-").toLowerCase() || "parceiro";
  return `comprovante-auditik-${safeSlug}-${stamp}.png`;
}

/** Strip data-URL prefix; return raw base64 for the activate API. */
export function dataUrlToRawBase64(dataUrl: string): string {
  const comma = dataUrl.indexOf(",");
  if (comma === -1) return dataUrl;
  return dataUrl.slice(comma + 1);
}

export async function renderVoucherToPngDataUrl(
  element: HTMLElement,
): Promise<string> {
  return toPng(element, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: "#fffcf0",
    // Avoid SecurityError reading cssRules from cross-origin stylesheets
    // (e.g. fonts.googleapis.com Material Symbols / Inter).
    skipFonts: true,
  });
}

export function downloadDataUrl(dataUrl: string, filename: string): void {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}
