interface CampaignSourceMap {
  [campaignId: string]: string;
}

export interface LeadSubmissionInput {
  fullName: string;
  phone: string;
  city: string;
  paraQuem: string;
  fallbackSource: string;
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

const CAMPAIGN_SOURCE_BY_ID: CampaignSourceMap = {
  "21231083976": "Google Search",
  "23019456363": "Google Max Leads",
};

const CAMPAIGN_PARAM_KEYS = [
  "campaignid",
  "campaignId",
  "campaign_id",
  "utm_campaignid",
  "utm_id",
] as const;

const normalizeBrazilPhone = (value: string): string =>
  value.replace(/\D/g, "").slice(0, 11);

const getCampaignIdFromSearch = (search: string): string => {
  if (!search) return "";

  const params = new URLSearchParams(search);

  for (const key of CAMPAIGN_PARAM_KEYS) {
    const value = params.get(key);
    if (value) return value;
  }

  return "";
};

const resolveSource = (fallbackSource: string): string => {
  if (typeof window === "undefined") return fallbackSource;

  const campaignId = getCampaignIdFromSearch(window.location.search);
  if (!campaignId) return fallbackSource;

  return CAMPAIGN_SOURCE_BY_ID[campaignId] || fallbackSource;
};

const buildObservation = (source: string, paraQuem: string): string => {
  const integrationName = LEAD_PROXY_INTEGRATION_NAME || "não informado";
  return `Lead criado via ${source} (integração: ${integrationName}). Para quem é o AASI: ${paraQuem}.`;
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
  const source = resolveSource(input.fallbackSource);

  return {
    companyID: input.companyID || DEFAULT_COMPANY_ID,
    integrationName: LEAD_PROXY_INTEGRATION_NAME,
    fullName: input.fullName.trim(),
    phone: normalizeBrazilPhone(input.phone),
    city: input.city.trim(),
    source,
    observation: buildObservation(source, input.paraQuem.trim()),
  };
};

export const submitLeadToCRM = async (
  input: LeadSubmissionInput,
): Promise<Response> => {
  if (!LEAD_PROXY_URL) {
    throw new Error(
      "Integração indisponível no momento. Tente novamente em instantes.",
    );
  }

  const payload = buildLeadProxyPayload(input);

  if (payload.phone.length < 10) {
    throw new Error("Informe um telefone válido com DDD.");
  }

  const response = await fetch(LEAD_PROXY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  // The CRM API may return non-2xx for duplicated leads even when the contact is stored.
  // We still proceed with user success flow to avoid false-negative UX.
  if (!response.ok) {
    console.warn("Lead proxy returned non-OK status", {
      status: response.status,
      statusText: response.statusText,
    });
  }

  return response;
};
