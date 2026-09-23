/**
 * Processed sheet: one row per Google Calendar eventId.
 * Columns: event_id, processed_at, crm_status, capi_status, phone, email, full_name, start_iso, html_link, last_error
 */

var PROCESSED_HEADERS_ = [
  "event_id",
  "processed_at",
  "crm_status",
  "capi_status",
  "phone",
  "email",
  "full_name",
  "start_iso",
  "html_link",
  "last_error",
];

/**
 * @return {GoogleAppsScript.Spreadsheet.Sheet}
 */
function getProcessedSheet_() {
  return ensureSheet_(getConfig_("PROCESSED_SHEET"), PROCESSED_HEADERS_);
}

/**
 * @param {string} eventId
 * @return {{row: number, crm_status: string, capi_status: string}|null}
 */
function findProcessedRow_(eventId) {
  var sheet = getProcessedSheet_();
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(eventId)) {
      return {
        row: i + 1,
        crm_status: String(data[i][2] || ""),
        capi_status: String(data[i][3] || ""),
      };
    }
  }
  return null;
}

/**
 * Fully done = CRM ok and CAPI ok.
 * @param {string} eventId
 * @return {boolean}
 */
function isFullyProcessed_(eventId) {
  var row = findProcessedRow_(eventId);
  if (!row) {
    return false;
  }
  return row.crm_status === "ok" && row.capi_status === "ok";
}

/**
 * CRM already succeeded (may still need CAPI retry).
 * @param {string} eventId
 * @return {boolean}
 */
function isCrmDone_(eventId) {
  var row = findProcessedRow_(eventId);
  return !!(row && row.crm_status === "ok");
}

/**
 * Upsert processed row.
 * @param {Object} record
 */
function upsertProcessed_(record) {
  var sheet = getProcessedSheet_();
  var existing = findProcessedRow_(record.event_id);
  var values = [
    record.event_id,
    record.processed_at || new Date().toISOString(),
    record.crm_status || "",
    record.capi_status || "",
    record.phone || "",
    record.email || "",
    record.full_name || "",
    record.start_iso || "",
    record.html_link || "",
    record.last_error || "",
  ];
  if (existing) {
    sheet.getRange(existing.row, 1, 1, values.length).setValues([values]);
  } else {
    sheet.appendRow(values);
  }
}

/**
 * Rows where CRM ok but CAPI failed — for retry job.
 * @return {Object[]}
 */
function listCapiFailedRows_() {
  var sheet = getProcessedSheet_();
  var data = sheet.getDataRange().getValues();
  var out = [];
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][2]) === "ok" && String(data[i][3]) === "failed") {
      out.push({
        row: i + 1,
        event_id: String(data[i][0]),
        phone: String(data[i][4] || ""),
        email: String(data[i][5] || ""),
        full_name: String(data[i][6] || ""),
        start_iso: String(data[i][7] || ""),
        html_link: String(data[i][8] || ""),
      });
    }
  }
  return out;
}
