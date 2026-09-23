/**
 * Script Properties + defaults for Piracicaba appointment pipeline.
 * Set secrets via Project Settings → Script properties (never commit tokens).
 */

var CONFIG_DEFAULTS = {
  CALENDAR_ID: "ana.zanardo@auditik.com.br",
  LEAD_COMPANY_ID: "company-d1ef844d-d65e-4e3b-9b05-bb6fe8f8cd62",
  LEAD_INTEGRATION_NAME: "agendamento-meta-piracicaba",
  LEAD_SOURCE_LABEL: "Google Appointment — LP Meta Piracicaba",
  CITY_DEFAULT: "Piracicaba",
  BOOKING_SUMMARY_PREFIX: "Agendar Experiência Philips Piracicaba",
  BOOKING_MAX_AGE_MINUTES: "120",
  ATTRIBUTION_TTL_MINUTES: "60",
  CLINIC_PHONE_DIGITS: "1933776941",
  META_GRAPH_VERSION: "v21.0",
  META_EVENT_NAME: "Schedule",
  PROCESSED_SHEET: "Processed",
  LOGS_SHEET: "Logs",
  ATTRIBUTION_SHEET: "AttributionSessions",
};

/**
 * @param {string} key
 * @param {string=} fallback
 * @return {string}
 */
function getConfig_(key, fallback) {
  var props = PropertiesService.getScriptProperties();
  var value = props.getProperty(key);
  if (value !== null && value !== "") {
    return value;
  }
  if (fallback !== undefined) {
    return fallback;
  }
  if (CONFIG_DEFAULTS[key] !== undefined) {
    return CONFIG_DEFAULTS[key];
  }
  return "";
}

/**
 * @param {string} key
 * @return {number}
 */
function getConfigNumber_(key) {
  var raw = getConfig_(key);
  var n = parseInt(raw, 10);
  return isNaN(n) ? 0 : n;
}

/**
 * Required secrets for production processing.
 * @return {{ok: boolean, missing: string[]}}
 */
function validateRequiredSecrets_() {
  var required = [
    "LEAD_PROXY_URL",
    "META_PIXEL_ID",
    "META_CAPI_TOKEN",
    "NOTIFY_EMAILS",
  ];
  var missing = [];
  for (var i = 0; i < required.length; i++) {
    if (!getConfig_(required[i])) {
      missing.push(required[i]);
    }
  }
  return { ok: missing.length === 0, missing: missing };
}
