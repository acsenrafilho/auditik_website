/**
 * Entry points: calendar trigger, CAPI retry, manual test.
 *
 * Install triggers (after authorizing as ana.zanardo@auditik.com.br):
 * 1. onCalendarEventUpdated — Event source: From calendar → Calendar updated
 * 2. retryFailedCapi — Time-driven → Every 15 minutes
 *
 * First run: enable Advanced Calendar service + authorize OAuth.
 */

/**
 * Calendar installable trigger handler.
 * @param {Object} e EventUpdated event (calendarId)
 */
function onCalendarEventUpdated(e) {
  try {
    processNewBookings_();
  } catch (err) {
    logError_("onCalendarEventUpdated: " + err);
  }
}

/**
 * Time-driven: retry CAPI when CRM already ok.
 */
function retryFailedCapi() {
  try {
    var rows = listCapiFailedRows_();
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var event = fetchEventById_(row.event_id);
      if (!event) {
        continue;
      }
      var contact = extractContactFromEvent_(event);
      contact.eventId = row.event_id;
      var attribution = matchAttributionSession_(contact.phone, contact.email);
      var capi = sendMetaSchedule_(contact, attribution);
      if (capi.ok) {
        if (attribution) {
          markAttributionConsumed_(attribution);
        }
        upsertProcessed_({
          event_id: row.event_id,
          crm_status: "ok",
          capi_status: "ok",
          phone: contact.phone,
          email: contact.email,
          full_name: contact.fullName,
          start_iso: contact.startIso,
          html_link: contact.htmlLink,
          last_error: "",
        });
        logInfo_("CAPI retry ok", row.event_id);
      } else {
        upsertProcessed_({
          event_id: row.event_id,
          crm_status: "ok",
          capi_status: "failed",
          phone: contact.phone,
          email: contact.email,
          full_name: contact.fullName,
          start_iso: contact.startIso,
          html_link: contact.htmlLink,
          last_error: "capi " + capi.status + " " + String(capi.body).slice(0, 300),
        });
        logWarn_("CAPI retry failed: " + capi.body, row.event_id);
      }
    }
  } catch (err) {
    logError_("retryFailedCapi: " + err);
  }
}

/**
 * Manual run from editor — process sync window.
 */
function runManualTest() {
  var secrets = validateRequiredSecrets_();
  if (!secrets.ok) {
    logWarn_("Missing secrets: " + secrets.missing.join(", "));
  }
  processNewBookings_();
}

/**
 * Core pipeline.
 */
function processNewBookings_() {
  var events = fetchChangedEvents_();
  logInfo_("sync returned " + events.length + " event(s)");

  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    try {
      processOneEvent_(event);
    } catch (err) {
      logError_("processOneEvent_: " + err, event && event.id);
    }
  }
}

/**
 * @param {Object} event
 */
function processOneEvent_(event) {
  if (!event || !event.id) {
    return;
  }
  if (!isBookingCandidate_(event)) {
    return;
  }
  if (isFullyProcessed_(event.id)) {
    logInfo_("skip fully processed", event.id);
    return;
  }

  var contact = extractContactFromEvent_(event);
  contact.eventId = event.id;

  var attribution = matchAttributionSession_(contact.phone, contact.email);

  var crmOk = isCrmDone_(event.id);
  if (!crmOk) {
    var crm = sendToLeadControl_(contact, attribution);
    if (!crm.ok) {
      upsertProcessed_({
        event_id: event.id,
        crm_status: "failed",
        capi_status: "pending",
        phone: contact.phone,
        email: contact.email,
        full_name: contact.fullName,
        start_iso: contact.startIso,
        html_link: contact.htmlLink,
        last_error: "crm " + crm.status + " " + String(crm.body).slice(0, 300),
      });
      logError_("Lead Control failed: " + crm.body, event.id);
      return;
    }
    sendInternalEmail_(contact, attribution);
    crmOk = true;
    logInfo_("CRM + email ok", event.id);
  }

  var capi = sendMetaSchedule_(contact, attribution);
  if (capi.ok) {
    if (attribution) {
      markAttributionConsumed_(attribution);
    }
    upsertProcessed_({
      event_id: event.id,
      crm_status: "ok",
      capi_status: "ok",
      phone: contact.phone,
      email: contact.email,
      full_name: contact.fullName,
      start_iso: contact.startIso,
      html_link: contact.htmlLink,
      last_error: "",
    });
    logInfo_("Schedule CAPI ok", event.id);
  } else {
    upsertProcessed_({
      event_id: event.id,
      crm_status: "ok",
      capi_status: "failed",
      phone: contact.phone,
      email: contact.email,
      full_name: contact.fullName,
      start_iso: contact.startIso,
      html_link: contact.htmlLink,
      last_error: "capi " + capi.status + " " + String(capi.body).slice(0, 300),
    });
    logWarn_("Schedule CAPI failed (will retry): " + capi.body, event.id);
  }
}

/**
 * One-time helper: create sheet tabs with headers.
 */
function setupSpreadsheet() {
  getProcessedSheet_();
  ensureSheet_(getConfig_("LOGS_SHEET"), [
    "timestamp",
    "level",
    "message",
    "event_id",
  ]);
  getAttributionSheet_();
  logInfo_("setupSpreadsheet complete");
}
