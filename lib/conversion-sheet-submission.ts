import type { CampaignAttribution } from "@lib/campaign-attribution";

export interface ConversionSheetPayload {
  fullName: string;
  phone: string;
  city: string;
  paraQuem?: string;
  formName: string;
  source: string;
  attribution: CampaignAttribution;
}

const CONVERSION_INGEST_URL =
  process.env.NEXT_PUBLIC_AUDITIK_CONVERSION_INGEST_URL || "";
const INGEST_TOKEN = process.env.NEXT_PUBLIC_AUDITIK_INGEST_TOKEN || "";

export const submitConversionToSheet = async (
  payload: ConversionSheetPayload,
): Promise<void> => {
  if (!CONVERSION_INGEST_URL || !INGEST_TOKEN) {
    return;
  }

  try {
    const response = await fetch(CONVERSION_INGEST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auditik-Ingest-Token": INGEST_TOKEN,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn("Conversion sheet ingest returned non-OK status", {
        status: response.status,
        statusText: response.statusText,
        formName: payload.formName,
      });
    }
  } catch (error) {
    console.warn("Conversion sheet ingest failed.", {
      formName: payload.formName,
      error,
    });
  }
};

export const fireConversionSheetSubmit = (
  payload: ConversionSheetPayload,
): void => {
  void submitConversionToSheet(payload);
};
