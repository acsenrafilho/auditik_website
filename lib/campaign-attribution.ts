const STORAGE_KEY = "auditik_attribution";

const CAMPAIGN_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_adgroup",
  "utm_network",
  "utm_device",
  "gclid",
  "gbraid",
  "wbraid",
  "campaign_id",
  "campaignid",
  "campaignId",
  "ad_group_id",
  "adgroupid",
  "ad_id",
  "keyword",
  "matchtype",
] as const;

export type CampaignAttributionField = (typeof CAMPAIGN_PARAM_KEYS)[number];

export interface CampaignAttribution {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  utm_adgroup: string;
  utm_network: string;
  utm_device: string;
  gclid: string;
  gbraid: string;
  wbraid: string;
  campaign_id: string;
  ad_group_id: string;
  ad_id: string;
  keyword: string;
  matchtype: string;
  landing_page: string;
  submit_page: string;
}

const EMPTY_ATTRIBUTION = (): CampaignAttribution => ({
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
  utm_adgroup: "",
  utm_network: "",
  utm_device: "",
  gclid: "",
  gbraid: "",
  wbraid: "",
  campaign_id: "",
  ad_group_id: "",
  ad_id: "",
  keyword: "",
  matchtype: "",
  landing_page: "",
  submit_page: "",
});

const hasCampaignSignal = (params: URLSearchParams): boolean =>
  CAMPAIGN_PARAM_KEYS.some((key) => {
    const value = params.get(key);
    return Boolean(value && value.trim());
  });

const firstParam = (params: URLSearchParams, keys: string[]): string => {
  for (const key of keys) {
    const value = params.get(key);
    if (value && value.trim()) return value.trim();
  }
  return "";
};

const parseAttributionFromSearch = (
  search: string,
  landingPage: string,
): CampaignAttribution | null => {
  if (!search) return null;

  const params = new URLSearchParams(search);
  if (!hasCampaignSignal(params)) return null;

  const utmAdgroup = firstParam(params, ["utm_adgroup", "ad_group_id", "adgroupid"]);
  const campaignId = firstParam(params, [
    "campaign_id",
    "campaignid",
    "campaignId",
    "utm_campaignid",
    "utm_id",
  ]);

  return {
    utm_source: firstParam(params, ["utm_source"]),
    utm_medium: firstParam(params, ["utm_medium"]),
    utm_campaign: firstParam(params, ["utm_campaign"]),
    utm_content: firstParam(params, ["utm_content"]),
    utm_term: firstParam(params, ["utm_term"]),
    utm_adgroup: utmAdgroup,
    utm_network: firstParam(params, ["utm_network"]),
    utm_device: firstParam(params, ["utm_device"]),
    gclid: firstParam(params, ["gclid"]),
    gbraid: firstParam(params, ["gbraid"]),
    wbraid: firstParam(params, ["wbraid"]),
    campaign_id: campaignId,
    ad_group_id: utmAdgroup || firstParam(params, ["ad_group_id", "adgroupid"]),
    ad_id: firstParam(params, ["ad_id", "creative", "utm_content"]),
    keyword: firstParam(params, ["keyword", "utm_keyword"]),
    matchtype: firstParam(params, ["matchtype", "utm_matchtype"]),
    landing_page: landingPage,
    submit_page: "",
  };
};

export const captureAttributionFromUrl = (): void => {
  if (typeof window === "undefined") return;

  const parsed = parseAttributionFromSearch(
    window.location.search,
    window.location.href,
  );
  if (!parsed) return;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch (error) {
    console.warn("Unable to persist campaign attribution.", error);
  }
};

export const getStoredAttribution = (): CampaignAttribution => {
  if (typeof window === "undefined") return EMPTY_ATTRIBUTION();

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_ATTRIBUTION();

    const stored = JSON.parse(raw) as Partial<CampaignAttribution>;
    return { ...EMPTY_ATTRIBUTION(), ...stored };
  } catch {
    return EMPTY_ATTRIBUTION();
  }
};

export const getAttributionForSubmit = (): CampaignAttribution => {
  const attribution = getStoredAttribution();
  if (typeof window === "undefined") return attribution;

  return {
    ...attribution,
    submit_page: window.location.href,
  };
};

const CAMPAIGN_SOURCE_BY_ID: Record<string, string> = {
  "21231083976": "Google Search",
  "23019456363": "Google Max Leads",
};

export const resolveSourceLabel = (
  fallbackSource: string,
  attribution?: CampaignAttribution,
): string => {
  const data = attribution ?? getStoredAttribution();

  if (data.campaign_id && CAMPAIGN_SOURCE_BY_ID[data.campaign_id]) {
    return CAMPAIGN_SOURCE_BY_ID[data.campaign_id];
  }

  const isGoogleAds =
    data.utm_source.toLowerCase() === "google" ||
    data.utm_source.toLowerCase() === "adwords" ||
    Boolean(data.gclid);

  if (isGoogleAds) {
    const parts = ["Google Ads", data.utm_campaign, data.utm_medium].filter(Boolean);
    return parts.join(" / ");
  }

  if (data.utm_source) {
    const parts = [data.utm_source, data.utm_campaign, data.utm_medium].filter(Boolean);
    return parts.join(" / ");
  }

  return fallbackSource;
};

export const formatAttributionSummary = (
  attribution: CampaignAttribution,
): string => {
  const pairs: [string, string][] = [
    ["utm_source", attribution.utm_source],
    ["utm_medium", attribution.utm_medium],
    ["utm_campaign", attribution.utm_campaign],
    ["utm_content", attribution.utm_content],
    ["utm_term", attribution.utm_term],
    ["utm_adgroup", attribution.utm_adgroup],
    ["utm_network", attribution.utm_network],
    ["utm_device", attribution.utm_device],
    ["gclid", attribution.gclid],
    ["campaign_id", attribution.campaign_id],
    ["ad_group_id", attribution.ad_group_id],
    ["landing_page", attribution.landing_page],
    ["submit_page", attribution.submit_page],
  ];

  const filled = pairs
    .filter(([, value]) => value.trim())
    .map(([key, value]) => `${key}=${value}`);

  return filled.length ? filled.join("; ") : "";
};
