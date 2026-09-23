/**
 * Attribution sessions from LP beacon (no PII required on write).
 * Match at booking time by phone and/or email when provided.
 *
 * Sheet columns:
 * session_id, created_at, expires_at, phone, email, fbp, fbc, fbclid,
 * utm_source, utm_medium, utm_campaign, utm_content, utm_term,
 * landing_page, consumed, consumed_at
 */

var ATTRIBUTION_HEADERS_ = [
  "session_id",
  "created_at",
  "expires_at",
  "phone",
  "email",
  "fbp",
  "fbc",
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "landing_page",
  "consumed",
  "consumed_at",
];

/**
 * @return {GoogleAppsScript.Spreadsheet.Sheet}
 */
function getAttributionSheet_() {
  return ensureSheet_(getConfig_("ATTRIBUTION_SHEET"), ATTRIBUTION_HEADERS_);
}

/**
 * @param {Object} session
 */
function saveAttributionSession_(session) {
  var sheet = getAttributionSheet_();
  var ttlMin = getConfigNumber_("ATTRIBUTION_TTL_MINUTES") || 60;
  var now = new Date();
  var expires = new Date(now.getTime() + ttlMin * 60 * 1000);

  sheet.appendRow([
    session.session_id || Utilities.getUuid(),
    now.toISOString(),
    expires.toISOString(),
    normalizePhoneDigits_(session.phone || ""),
    String(session.email || "")
      .trim()
      .toLowerCase(),
    session.fbp || "",
    session.fbc || "",
    session.fbclid || "",
    session.utm_source || "",
    session.utm_medium || "",
    session.utm_campaign || "",
    session.utm_content || "",
    session.utm_term || "",
    session.landing_page || "",
    "false",
    "",
  ]);
}

/**
 * @param {string} phone
 * @param {string} email
 * @return {Object|null}
 */
function matchAttributionSession_(phone, email) {
  var sheet = getAttributionSheet_();
  var data = sheet.getDataRange().getValues();
  var phoneNorm = normalizePhoneDigits_(phone);
  var emailNorm = String(email || "")
    .trim()
    .toLowerCase();
  var now = Date.now();
  var best = null;
  var bestRow = -1;

  for (var i = 1; i < data.length; i++) {
    var consumed = String(data[i][14]).toLowerCase() === "true";
    if (consumed) {
      continue;
    }
    var expiresAt = new Date(data[i][2]).getTime();
    if (!isNaN(expiresAt) && expiresAt < now) {
      continue;
    }

    var rowPhone = normalizePhoneDigits_(data[i][3]);
    var rowEmail = String(data[i][4] || "")
      .trim()
      .toLowerCase();

    var phoneMatch = phoneNorm && rowPhone && phoneNorm === rowPhone;
    var emailMatch = emailNorm && rowEmail && emailNorm === rowEmail;
    // Prefer sessions that have cookies even without PII (most recent unconsumed)
    var cookieOnly =
      !rowPhone &&
      !rowEmail &&
      (data[i][5] || data[i][6]) &&
      !phoneNorm &&
      !emailNorm;

    if (phoneMatch || emailMatch || cookieOnly) {
      var created = new Date(data[i][1]).getTime();
      if (!best || created > best.createdMs) {
        best = {
          createdMs: created,
          session_id: String(data[i][0]),
          fbp: String(data[i][5] || ""),
          fbc: String(data[i][6] || ""),
          fbclid: String(data[i][7] || ""),
          utm_source: String(data[i][8] || ""),
          utm_medium: String(data[i][9] || ""),
          utm_campaign: String(data[i][10] || ""),
          utm_content: String(data[i][11] || ""),
          utm_term: String(data[i][12] || ""),
          landing_page: String(data[i][13] || ""),
        };
        bestRow = i + 1;
      }
    }
  }

  // Fallback: most recent unconsumed session with fbp/fbc within TTL (no phone on beacon)
  if (!best) {
    for (var j = data.length - 1; j >= 1; j--) {
      var consumed2 = String(data[j][14]).toLowerCase() === "true";
      if (consumed2) {
        continue;
      }
      var expires2 = new Date(data[j][2]).getTime();
      if (!isNaN(expires2) && expires2 < now) {
        continue;
      }
      if (data[j][5] || data[j][6] || data[j][8] || data[j][10]) {
        best = {
          createdMs: new Date(data[j][1]).getTime(),
          session_id: String(data[j][0]),
          fbp: String(data[j][5] || ""),
          fbc: String(data[j][6] || ""),
          fbclid: String(data[j][7] || ""),
          utm_source: String(data[j][8] || ""),
          utm_medium: String(data[j][9] || ""),
          utm_campaign: String(data[j][10] || ""),
          utm_content: String(data[j][11] || ""),
          utm_term: String(data[j][12] || ""),
          landing_page: String(data[j][13] || ""),
        };
        bestRow = j + 1;
        break;
      }
    }
  }

  if (best && bestRow > 0) {
    best._row = bestRow;
  }
  return best;
}

/**
 * @param {Object} session from matchAttributionSession_
 */
function markAttributionConsumed_(session) {
  if (!session || !session._row) {
    return;
  }
  var sheet = getAttributionSheet_();
  sheet.getRange(session._row, 15).setValue("true");
  sheet.getRange(session._row, 16).setValue(new Date().toISOString());
}
