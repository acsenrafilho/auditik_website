/**
 * Meta Conversions API — Schedule event.
 * https://developers.facebook.com/docs/marketing-api/conversions-api
 */

/**
 * @param {string} value
 * @return {string} lowercase SHA-256 hex
 */
function sha256Hex_(value) {
  var normalized = String(value || "")
    .trim()
    .toLowerCase();
  if (!normalized) {
    return "";
  }
  var digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    normalized,
    Utilities.Charset.UTF_8,
  );
  return digest
    .map(function (b) {
      var v = (b < 0 ? b + 256 : b).toString(16);
      return v.length === 1 ? "0" + v : v;
    })
    .join("");
}

/**
 * Normalize phone for Meta: digits with country code when possible (BR → 55).
 * @param {string} phone
 * @return {string}
 */
function phoneForMetaHash_(phone) {
  var digits = normalizePhoneDigits_(phone);
  if (!digits) {
    return "";
  }
  if (digits.length === 10 || digits.length === 11) {
    return "55" + digits;
  }
  return digits;
}

/**
 * @param {Object} contact
 * @param {Object=} attribution
 * @return {{ok: boolean, status: number, body: string}}
 */
function sendMetaSchedule_(contact, attribution) {
  var pixelId = getConfig_("META_PIXEL_ID");
  var token = getConfig_("META_CAPI_TOKEN");
  if (!pixelId || !token) {
    return { ok: false, status: 0, body: "META_PIXEL_ID or META_CAPI_TOKEN missing" };
  }

  var version = getConfig_("META_GRAPH_VERSION") || "v21.0";
  var eventName = getConfig_("META_EVENT_NAME") || "Schedule";
  var url =
    "https://graph.facebook.com/" +
    version +
    "/" +
    pixelId +
    "/events?access_token=" +
    encodeURIComponent(token);

  var eventTime = Math.floor(Date.now() / 1000);
  if (contact.startIso) {
    var startMs = new Date(contact.startIso).getTime();
    if (!isNaN(startMs)) {
      // Prefer booking confirmation time (now); slot start can be future
      // Use now for conversion event_time (Meta expects recent)
      eventTime = Math.floor(Date.now() / 1000);
    }
  }

  var userData = {};
  var em = sha256Hex_(contact.email);
  if (em) {
    userData.em = [em];
  }
  var ph = sha256Hex_(phoneForMetaHash_(contact.phone));
  if (ph) {
    userData.ph = [ph];
  }
  if (contact.fullName) {
    var parts = contact.fullName.trim().split(/\s+/);
    if (parts.length) {
      userData.fn = [sha256Hex_(parts[0])];
      if (parts.length > 1) {
        userData.ln = [sha256Hex_(parts[parts.length - 1])];
      }
    }
  }
  if (attribution && attribution.fbp) {
    userData.fbp = attribution.fbp;
  }
  if (attribution && attribution.fbc) {
    userData.fbc = attribution.fbc;
  }

  var customData = {
    content_name: getConfig_("BOOKING_SUMMARY_PREFIX"),
    city: getConfig_("CITY_DEFAULT"),
  };
  if (contact.startIso) {
    customData.appointment_time = contact.startIso;
  }

  var eventPayload = {
    event_name: eventName,
    event_time: eventTime,
    action_source: "website",
    event_source_url:
      "https://auditik.com.br/lp/piracicaba-agendamento/",
    user_data: userData,
    custom_data: customData,
  };

  if (contact.htmlLink || contact.eventId) {
    eventPayload.event_id = "gcal_" + (contact.eventId || String(eventTime));
  }

  var body = {
    data: [eventPayload],
  };

  var testCode = getConfig_("META_TEST_EVENT_CODE");
  if (testCode) {
    body.test_event_code = testCode;
  }

  try {
    var response = UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(body),
      muteHttpExceptions: true,
    });
    var code = response.getResponseCode();
    var text = response.getContentText();
    return { ok: code >= 200 && code < 300, status: code, body: text };
  } catch (err) {
    return { ok: false, status: 0, body: String(err) };
  }
}
