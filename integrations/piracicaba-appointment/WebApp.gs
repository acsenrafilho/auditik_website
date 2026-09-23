/**
 * Web App endpoint for LP attribution beacon.
 * Deploy: Deploy → New deployment → Web app
 * Execute as: Me | Who has access: Anyone
 * Validate with Script Property ATTRIBUTION_BEACON_SECRET (header X-Auditik-Beacon-Token).
 */

/**
 * @param {GoogleAppsScript.Events.DoPost} e
 * @return {GoogleAppsScript.Content.TextOutput}
 */
function doPost(e) {
  return handleBeaconPost_(e);
}

/**
 * Health check.
 * @return {GoogleAppsScript.Content.TextOutput}
 */
function doGet() {
  return jsonResponse_({ ok: true, service: "piracicaba-appointment-beacon" });
}

/**
 * @param {GoogleAppsScript.Events.DoPost} e
 * @return {GoogleAppsScript.Content.TextOutput}
 */
function handleBeaconPost_(e) {
  try {
    var secret = getConfig_("ATTRIBUTION_BEACON_SECRET");
    var provided =
      (e && e.parameter && e.parameter.token) ||
      (e &&
        e.postData &&
        e.postData.type === "application/json" &&
        "") ||
      "";

    // Apps Script does not expose custom headers reliably on Web Apps;
    // accept token in JSON body or query ?token=
    var payload = {};
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    }
    if (payload.token) {
      provided = payload.token;
    }
    if (e && e.parameter && e.parameter.token) {
      provided = e.parameter.token;
    }

    if (secret && provided !== secret) {
      return jsonResponse_({ ok: false, error: "unauthorized" }, 401);
    }

    if (!payload.session_id) {
      payload.session_id = Utilities.getUuid();
    }

    saveAttributionSession_({
      session_id: payload.session_id,
      phone: payload.phone || "",
      email: payload.email || "",
      fbp: payload.fbp || "",
      fbc: payload.fbc || "",
      fbclid: payload.fbclid || "",
      utm_source: payload.utm_source || "",
      utm_medium: payload.utm_medium || "",
      utm_campaign: payload.utm_campaign || "",
      utm_content: payload.utm_content || "",
      utm_term: payload.utm_term || "",
      landing_page: payload.landing_page || "",
    });

    logInfo_("attribution beacon saved " + payload.session_id);
    return jsonResponse_({ ok: true, session_id: payload.session_id });
  } catch (err) {
    logError_("doPost failed: " + err);
    return jsonResponse_({ ok: false, error: String(err) }, 500);
  }
}

/**
 * @param {Object} obj
 * @param {number=} _status ignored by ContentService
 * @return {GoogleAppsScript.Content.TextOutput}
 */
function jsonResponse_(obj, _status) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
