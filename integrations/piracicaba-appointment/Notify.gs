/**
 * Internal notification via MailApp (Workspace daily quotas apply).
 */

/**
 * @param {Object} contact
 * @param {Object=} attribution
 */
function sendInternalEmail_(contact, attribution) {
  var raw = getConfig_("NOTIFY_EMAILS");
  if (!raw) {
    logWarn_("NOTIFY_EMAILS empty; skip email");
    return { ok: false, reason: "no recipients" };
  }

  var recipients = raw
    .split(",")
    .map(function (s) {
      return s.trim();
    })
    .filter(Boolean);
  if (!recipients.length) {
    return { ok: false, reason: "no recipients" };
  }

  var subject =
    "[Auditik] Novo agendamento Piracicaba — " +
    (contact.fullName || "Lead");

  var lines = [
    "Novo agendamento via Google Appointment (LP Meta Piracicaba).",
    "",
    "Nome: " + (contact.fullName || "—"),
    "Telefone: " + (contact.phone || "—"),
    "E-mail: " + (contact.email || "—"),
    "Cidade: " + (contact.city || getConfig_("CITY_DEFAULT") || "—"),
    "Horário: " + (contact.startIso || "—"),
    "Audiometria (<1 ano): " + (contact.audiometryAnswer || "—"),
    "Link: " + (contact.htmlLink || "—"),
    "",
  ];

  if (attribution) {
    lines.push(
      "Campanha: " +
        [
          attribution.utm_source,
          attribution.utm_campaign,
          attribution.utm_content,
        ]
          .filter(Boolean)
          .join(" / "),
    );
    lines.push("");
  }

  lines.push("Agenda: " + getConfig_("CALENDAR_ID"));

  try {
    MailApp.sendEmail({
      to: recipients.join(","),
      subject: subject,
      body: lines.join("\n"),
    });
    return { ok: true };
  } catch (err) {
    logError_("MailApp failed: " + err);
    return { ok: false, reason: String(err) };
  }
}
