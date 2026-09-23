/**
 * Lead Control via the integrations create-lead contract.
 * POST JSON: companyID, integrationName, fullName, phone, city, source,
 * observation, statusLead, audiologist (required for Agendamento realizado).
 */

/**
 * @param {Object} contact from extractContactFromEvent_
 * @param {Object=} attribution matched session or null
 * @return {{ok: boolean, status: number, body: string}}
 */
function sendToLeadControl_(contact, attribution) {
  var url = getConfig_("LEAD_PROXY_URL");
  if (!url) {
    return { ok: false, status: 0, body: "LEAD_PROXY_URL missing" };
  }

  var source = getConfig_("LEAD_SOURCE_LABEL");
  var integrationName = getConfig_("LEAD_INTEGRATION_NAME");
  var companyID = getConfig_("LEAD_COMPANY_ID");
  var city = getConfig_("CITY_DEFAULT");

  var observationParts = [
    "Lead criado via " + source + " (integração: " + integrationName + ").",
    contact.startIso ? "Agendamento: " + contact.startIso + "." : "",
    contact.htmlLink ? "Calendar: " + contact.htmlLink + "." : "",
    contact.audiometryAnswer
      ? "Tem exame de audiometria (<1 ano): " + contact.audiometryAnswer + "."
      : "",
    contact.email ? "E-mail: " + contact.email + "." : "",
  ];

  if (attribution) {
    var campBits = [];
    if (attribution.utm_source) {
      campBits.push("utm_source=" + attribution.utm_source);
    }
    if (attribution.utm_campaign) {
      campBits.push("utm_campaign=" + attribution.utm_campaign);
    }
    if (attribution.utm_content) {
      campBits.push("utm_content=" + attribution.utm_content);
    }
    if (attribution.fbclid) {
      campBits.push("fbclid=" + attribution.fbclid);
    }
    if (campBits.length) {
      observationParts.push("Campanha: " + campBits.join(" | ") + ".");
    }
  }

  var payload = {
    companyID: companyID,
    integrationName: integrationName,
    fullName: contact.fullName,
    phone: normalizePhoneDigits_(contact.phone),
    city: city,
    source: source,
    statusLead: "Agendamento realizado",
    observation: observationParts.filter(Boolean).join(" "),
  };

  // Catalog match is required when statusLead is Agendamento realizado.
  var audiologist = getConfig_("LEAD_AUDIOLOGIST");
  if (audiologist) {
    payload.audiologist = audiologist;
  }

  var headers = {
    "Content-Type": "application/json",
  };
  var apiKey = getConfig_("LEAD_API_KEY");
  if (apiKey) {
    headers["X-Api-Key"] = apiKey;
  }

  try {
    var response = UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      headers: headers,
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    });
    var code = response.getResponseCode();
    var body = response.getContentText();
    return { ok: code >= 200 && code < 300, status: code, body: body };
  } catch (err) {
    return { ok: false, status: 0, body: String(err) };
  }
}
