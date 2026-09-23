/**
 * Incremental Calendar sync via syncToken (Advanced Calendar service).
 */

var SYNC_TOKEN_PROP_ = "SYNC_TOKEN";

/**
 * @return {Object[]} Calendar API event resources (changed since last sync)
 */
function fetchChangedEvents_() {
  var calendarId = getConfig_("CALENDAR_ID");
  var props = PropertiesService.getScriptProperties();
  var syncToken = props.getProperty(SYNC_TOKEN_PROP_);
  var events = [];
  var pageToken = null;
  var response;

  try {
    do {
      var opts = {
        maxResults: 100,
        singleEvents: true,
        showDeleted: false,
      };
      if (syncToken) {
        opts.syncToken = syncToken;
      } else {
        // First sync: only recent events (avoid replaying years of history)
        var maxAgeMin = getConfigNumber_("BOOKING_MAX_AGE_MINUTES") || 120;
        var updatedMin = new Date(Date.now() - maxAgeMin * 60 * 1000);
        opts.updatedMin = updatedMin.toISOString();
        opts.orderBy = "updated";
      }
      if (pageToken) {
        opts.pageToken = pageToken;
      }

      response = Calendar.Events.list(calendarId, opts);
      var items = response.items || [];
      for (var i = 0; i < items.length; i++) {
        events.push(items[i]);
      }
      pageToken = response.nextPageToken || null;
    } while (pageToken);

    if (response.nextSyncToken) {
      props.setProperty(SYNC_TOKEN_PROP_, response.nextSyncToken);
    }
  } catch (err) {
    var msg = String(err);
    // Invalid/expired sync token → clear and full recent window next time
    if (msg.indexOf("410") !== -1 || msg.toLowerCase().indexOf("sync") !== -1) {
      props.deleteProperty(SYNC_TOKEN_PROP_);
      logWarn_("syncToken invalid; cleared for next run: " + msg);
      return fetchChangedEvents_();
    }
    throw err;
  }

  return events;
}

/**
 * Fetch a single event by id (for CAPI retry).
 * @param {string} eventId
 * @return {Object|null}
 */
function fetchEventById_(eventId) {
  try {
    return Calendar.Events.get(getConfig_("CALENDAR_ID"), eventId);
  } catch (err) {
    logError_("fetchEventById_ failed: " + err, eventId);
    return null;
  }
}
