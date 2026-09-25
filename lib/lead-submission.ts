import {
  formatAttributionSummary,
  getAttributionForSubmit,
  resolveSourceLabel,
} from "@lib/campaign-attribution";
import {
  submitConversionToSheet,
  type ConversionIngestResult,
} from "@lib/conversion-sheet-submission";

export interface LeadSubmissionInput {
  fullName: string;
  phone: string;
  city: string;
  paraQuem?: string;
  fallbackSource: string;
  formName: string;
  companyID?: string;
  /** Reuse after a failed attempt so the sheet outbox stays idempotent. */
  leadId?: string;
}

export interface LeadSubmissionResult extends ConversionIngestResult {
  source: string;
}

const DEFAULT_COMPANY_ID = "company-d1ef844d-d65e-4e3b-9b05-bb6fe8f8cd62";
const LEAD_PROXY_INTEGRATION_NAME =
  process.env.NEXT_PUBLIC_LEAD_INTEGRATION_NAME || "";
const LEAD_ID_STORAGE_PREFIX = "auditik_lead_id:";

const normalizeBrazilPhone = (value: string): string =>
  value.replace(/\D/g, "").slice(0, 11);

const readCookie = (name: string): string => {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : "";
};

export const createLeadId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `lead_${crypto.randomUUID()}`;
  }
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
};

const leadIdStorageKey = (formName: string, phone: string): string =>
  `${LEAD_ID_STORAGE_PREFIX}${formName}:${phone}`;

export const resolveLeadId = (formName: string, phone: string, explicit?: string): string => {
  if (explicit?.trim()) return explicit.trim();

  if (typeof window === "undefined") return createLeadId();

  const key = leadIdStorageKey(formName, phone);
  try {
    const existing = sessionStorage.getItem(key);
    if (existing) return existing;
  } catch {
    // ignore
  }

  const generated = createLeadId();
  try {
    sessionStorage.setItem(key, generated);
  } catch {
    // ignore
  }
  return generated;
};

export const clearLeadId = (formName: string, phone: string): void => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(leadIdStorageKey(formName, phone));
  } catch {
    // ignore
  }
};

export const formatBrazilPhone = (value: string): string => {
  const digits = normalizeBrazilPhone(value);

  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

/**
 * Registers the lead in the conversion sheet outbox (source of truth).
 * The ingest Lambda certifies CRM + Meta from that row.
 * Only redirects to /obrigado/ after the sheet confirms the row.
 */
export const submitLeadToCRM = async (
  input: LeadSubmissionInput,
): Promise<LeadSubmissionResult> => {
  const phone = normalizeBrazilPhone(input.phone);
  if (phone.length < 10) {
    throw new Error("Informe um telefone válido com DDD.");
  }

  const attribution = getAttributionForSubmit();
  const source = resolveSourceLabel(input.fallbackSource, attribution);
  const leadId = resolveLeadId(input.formName, phone, input.leadId);
  const paraQuem = (input.paraQuem || "").trim();
  const eventSourceUrl =
    attribution.submit_page ||
    (typeof window !== "undefined" ? window.location.href : "");

  const result = await submitConversionToSheet({
    fullName: input.fullName.trim(),
    phone,
    city: input.city.trim(),
    paraQuem: paraQuem || undefined,
    formName: input.formName,
    source,
    attribution,
    lead_id: leadId,
    companyID: input.companyID || DEFAULT_COMPANY_ID,
    integrationName: LEAD_PROXY_INTEGRATION_NAME || undefined,
    fbp: readCookie("_fbp") || undefined,
    fbc: readCookie("_fbc") || undefined,
    event_source_url: eventSourceUrl || undefined,
  });

  // Attribution summary kept for debugging if needed by callers.
  void formatAttributionSummary(attribution);

  clearLeadId(input.formName, phone);

  return {
    ...result,
    source,
  };
};
