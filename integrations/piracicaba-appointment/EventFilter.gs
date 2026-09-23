/**
 * Booking detection + contact extraction from Google Appointment Schedule events.
 *
 * Observed structure (2026-09-23 test):
 * - summary: "Agendar Experiência Philips Piracicaba (Full Name)"
 * - description "Reservado por": name, email, phone (10–11 digits)
 * - custom Q: "Tem exame de audiometria (com menos de 1 ano)?" → Sim/Não
 * - footer clinic phone (19) 3377-6941 must NOT be used as lead phone
 */

/**
 * @param {Object} event Calendar API event
 * @return {boolean}
 */
function isBookingCandidate_(event) {
  if (!event || event.status === "cancelled") {
    return false;
  }
  var summary = String(event.summary || "");
  var prefix = getConfig_("BOOKING_SUMMARY_PREFIX");
  if (summary.indexOf(prefix) === -1) {
    return false;
  }

  var maxAgeMin = getConfigNumber_("BOOKING_MAX_AGE_MINUTES") || 120;
  if (event.created) {
    var createdMs = new Date(event.created).getTime();
    var ageMin = (Date.now() - createdMs) / 60000;
    // Allow slightly older on retry paths; still skip ancient events
    if (ageMin > Math.max(maxAgeMin, 7 * 24 * 60)) {
      return false;
    }
  }

  var contact = extractContactFromEvent_(event);
  if (!contact.phone && !contact.email) {
    logWarn_("booking candidate missing phone and email", event.id);
    return false;
  }
  return true;
}

/**
 * @param {Object} event
 * @return {{fullName: string, email: string, phone: string, audiometryAnswer: string, startIso: string, htmlLink: string}}
 */
function extractContactFromEvent_(event) {
  var description = String(event.description || "");
  var summary = String(event.summary || "");
  var clinicDigits = getConfig_("CLINIC_PHONE_DIGITS") || "1933776941";

  var fullName = "";
  var parenMatch = summary.match(/\(([^)]+)\)\s*$/);
  if (parenMatch) {
    fullName = parenMatch[1].trim();
  }

  // Prefer block after "Reservado por"
  var bookerBlock = description;
  var reservadoIdx = description.toLowerCase().indexOf("reservado por");
  if (reservadoIdx !== -1) {
    bookerBlock = description.slice(reservadoIdx, reservadoIdx + 800);
  }

  var email = "";
  var emailMatch = bookerBlock.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  );
  if (emailMatch) {
    email = emailMatch[0].toLowerCase();
  }

  // Attendee fallback (non-organizer)
  if (!email && event.attendees && event.attendees.length) {
    for (var i = 0; i < event.attendees.length; i++) {
      var a = event.attendees[i];
      if (a.organizer) {
        continue;
      }
      if (a.email) {
        email = String(a.email).toLowerCase();
        if (!fullName && a.displayName) {
          fullName = String(a.displayName).trim();
        }
        break;
      }
    }
  }

  if (!fullName) {
    var nameLine = bookerBlock.match(/Reservado por[:\s]*\n?\s*([^\n<]+)/i);
    if (nameLine) {
      fullName = nameLine[1].replace(/<[^>]+>/g, "").trim();
    }
  }

  var phone = "";
  var digitChunks = bookerBlock.match(/\d[\d\s().-]{8,}\d/g) || [];
  for (var j = 0; j < digitChunks.length; j++) {
    var digits = String(digitChunks[j]).replace(/\D/g, "");
    if (digits.length >= 10 && digits.length <= 11 && digits !== clinicDigits) {
      phone = digits.slice(0, 11);
      break;
    }
  }

  var audiometryAnswer = "";
  var audioMatch = description.match(
    /Tem exame de audiometria[^\n?]*\??\s*\n?\s*(Sim|Não|Nao)/i,
  );
  if (audioMatch) {
    audiometryAnswer = audioMatch[1];
  }

  var startIso = "";
  if (event.start) {
    startIso = event.start.dateTime || event.start.date || "";
  }

  return {
    fullName: fullName || "Lead Piracicaba",
    email: email,
    phone: phone,
    audiometryAnswer: audiometryAnswer,
    startIso: startIso,
    htmlLink: event.htmlLink || "",
  };
}

/**
 * Digits-only BR phone (max 11).
 * @param {string} value
 * @return {string}
 */
function normalizePhoneDigits_(value) {
  return String(value || "")
    .replace(/\D/g, "")
    .slice(0, 11);
}
