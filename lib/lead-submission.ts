import {
  formatAttributionSummary,
  getAttributionForSubmit,
  resolveSourceLabel,
} from "@lib/campaign-attribution";
import {
  fireConversionSheetSubmit,
  type ConversionSheetPayload,
} from "@lib/conversion-sheet-submission";
import { fetchWithRetry } from "@lib/fetch-with-retry";

export interface LeadSubmissionInput {
  fullName: string;
  phone: string;
  city: string;
  paraQuem?: string;
  fallbackSource: string;
  formName: string;
  companyID?: string;
}

export interface LeadProxyPayload {
  companyID: string;
  integrationName: string;
  fullName: string;
  phone: string;
  city: string;
  source: string;
  observation: string;
}

const DEFAULT_COMPANY_ID = "company-d1ef844d-d65e-4e3b-9b05-bb6fe8f8cd62";
const LEAD_PROXY_URL = process.env.NEXT_PUBLIC_LEAD_PROXY_URL || "";
const LEAD_PROXY_INTEGRATION_NAME = process.env.NEXT_PUBLIC_LEAD_INTEGRATION_NAME || "";
const LEAD_SUBMISSION_NETWORK_ERROR_MESSAGE =
  "Não foi possível conectar com nossa integração agora. Verifique sua conexão e tente novamente.";

const normalizeBrazilPhone = (value: string): string =>
  value.replace(/\D/g, "").slice(0, 11);

const buildObservation = (
  source: string,
  paraQuem: string,
  attributionSummary: string,
): string => {
  const integrationName = LEAD_PROXY_INTEGRATION_NAME || "não informado";
  const parts = [
    `Lead criado via ${source} (integração: ${integrationName}).`,
    paraQuem ? `Para quem é o AASI: ${paraQuem}.` : "",
    attributionSummary ? `Campanha: ${attributionSummary}.` : "",
  ].filter(Boolean);

  return parts.join(" ");
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

export const buildLeadProxyPayload = (input: LeadSubmissionInput): LeadProxyPayload => {
  const attribution = getAttributionForSubmit();
  const source = resolveSourceLabel(input.fallbackSource, attribution);
  const paraQuem = (input.paraQuem || "").trim();

  return {
    companyID: input.companyID || DEFAULT_COMPANY_ID,
    integrationName: LEAD_PROXY_INTEGRATION_NAME,
    fullName: input.fullName.trim(),
    phone: normalizeBrazilPhone(input.phone),
    city: input.city.trim(),
    source,
    observation: buildObservation(
      source,
      paraQuem,
      formatAttributionSummary(attribution),
    ),
  };
};

const buildConversionPayload = (
  input: LeadSubmissionInput,
  crmPayload: LeadProxyPayload,
): ConversionSheetPayload => ({
  fullName: crmPayload.fullName,
  phone: crmPayload.phone,
  city: crmPayload.city,
  paraQuem: (input.paraQuem || "").trim() || undefined,
  formName: input.formName,
  source: crmPayload.source,
  attribution: getAttributionForSubmit(),
});

export const submitLeadToCRM = async (
  input: LeadSubmissionInput,
): Promise<Response> => {
  if (!LEAD_PROXY_URL) {
    console.error("Lead proxy URL missing. Check NEXT_PUBLIC_LEAD_PROXY_URL at build time.");
    throw new Error(
      "Integração indisponível no momento. Tente novamente em instantes.",
    );
  }

  const payload = buildLeadProxyPayload(input);

  if (payload.phone.length < 10) {
    throw new Error("Informe um telefone válido com DDD.");
  }

  let response: Response;
  try {
    response = await fetchWithRetry(LEAD_PROXY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Lead proxy request failed before receiving a response.", {
      hasUrl: Boolean(LEAD_PROXY_URL),
      integrationNameConfigured: Boolean(LEAD_PROXY_INTEGRATION_NAME),
      source: payload.source,
      error,
    });
    throw new Error(LEAD_SUBMISSION_NETWORK_ERROR_MESSAGE);
  }

  if (!response.ok) {
    console.warn("Lead proxy returned non-OK status", {
      status: response.status,
      statusText: response.statusText,
      source: payload.source,
    });
  }

  fireConversionSheetSubmit(buildConversionPayload(input, payload));

  return response;
};
