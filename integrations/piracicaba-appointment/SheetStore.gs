/**
 * Spreadsheet helpers: Logs, Processed, AttributionSessions.
 * Bind this Apps Script project to a Google Sheet (Extensions → Apps Script).
 */

/**
 * @return {SpreadsheetApp.Spreadsheet}
 */
function getSpreadsheet_() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * @param {string} name
 * @param {string[]} headers
 * @return {GoogleAppsScript.Spreadsheet.Sheet}
 */
function ensureSheet_(name, headers) {
  var ss = getSpreadsheet_();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  if (sheet.getLastRow() === 0 && headers && headers.length) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * @param {string} level
 * @param {string} message
 * @param {string=} eventId
 */
function logRow_(level, message, eventId) {
  try {
    var sheet = ensureSheet_(getConfig_("LOGS_SHEET"), [
      "timestamp",
      "level",
      "message",
      "event_id",
    ]);
    sheet.appendRow([
      new Date().toISOString(),
      level,
      String(message).slice(0, 2000),
      eventId || "",
    ]);
  } catch (err) {
    Logger.log("logRow_ failed: " + err);
  }
}

function logInfo_(message, eventId) {
  logRow_("INFO", message, eventId);
  Logger.log("[INFO] " + message + (eventId ? " event=" + eventId : ""));
}

function logWarn_(message, eventId) {
  logRow_("WARN", message, eventId);
  Logger.log("[WARN] " + message + (eventId ? " event=" + eventId : ""));
}

function logError_(message, eventId) {
  logRow_("ERROR", message, eventId);
  Logger.log("[ERROR] " + message + (eventId ? " event=" + eventId : ""));
}
