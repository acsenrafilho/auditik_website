import type { CampaignAttribution } from "@lib/campaign-attribution";
import { fetchWithRetry } from "@lib/fetch-with-retry";

export interface ConversionSheetPayload {
  fullName: string;
  phone: string;
  city: string;
  paraQuem?: string;
  formName: string;
  source: string;
  attribution: CampaignAttribution;
  lead_id: string;
  companyID?: string;
  integrationName?: string;
  fbp?: string;
  fbc?: string;
  event_source_url?: string;
}

export interface ConversionIngestResult {
  sheet: "ok";
  lead_id: string;
  crm_status: string;
  meta_status: string;
  mode?: string;
  attempts?: string;
}

const CONVERSION_INGEST_URL =
  process.env.NEXT_PUBLIC_AUDITIK_CONVERSION_INGEST_URL || "";
const INGEST_TOKEN = process.env.NEXT_PUBLIC_AUDITIK_INGEST_TOKEN || "";

const INGEST_UNAVAILABLE_MESSAGE =
  "Não foi possível registrar seus dados agora. Tente novamente em instantes.";

export const submitConversionToSheet = async (
  payload: ConversionSheetPayload,
): Promise<ConversionIngestResult> => {
  if (!CONVERSION_INGEST_URL || !INGEST_TOKEN) {
    console.error(
      "Conversion ingest URL/token missing. Check NEXT_PUBLIC_AUDITIK_CONVERSION_INGEST_URL and NEXT_PUBLIC_AUDITIK_INGEST_TOKEN.",
    );
    throw new Error(INGEST_UNAVAILABLE_MESSAGE);
  }

  let response: Response;
  try {
    response = await fetchWithRetry(CONVERSION_INGEST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auditik-Ingest-Token": INGEST_TOKEN,
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch (error) {
    console.error("Conversion sheet ingest failed before a response.", {
      formName: payload.formName,
      lead_id: payload.lead_id,
      error,
    });
    throw new Error(INGEST_UNAVAILABLE_MESSAGE);
  }

  if (!response.ok) {
    console.warn("Conversion sheet ingest returned non-OK status", {
      status: response.status,
      statusText: response.statusText,
      formName: payload.formName,
      lead_id: payload.lead_id,
    });
    throw new Error(INGEST_UNAVAILABLE_MESSAGE);
  }

  let body: Partial<ConversionIngestResult> = {};
  try {
    body = (await response.json()) as Partial<ConversionIngestResult>;
  } catch {
    body = {};
  }

  if (body.sheet !== "ok" || !body.lead_id) {
    console.warn("Conversion sheet ingest response missing confirmation", {
      formName: payload.formName,
      body,
    });
    throw new Error(INGEST_UNAVAILABLE_MESSAGE);
  }

  return {
    sheet: "ok",
    lead_id: body.lead_id,
    crm_status: body.crm_status || "",
    meta_status: body.meta_status || "",
    mode: body.mode,
    attempts: body.attempts,
  };
};
