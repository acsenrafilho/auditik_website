# E2E gates — LP Piracicaba + Apps Script

Run before spending Meta budget on Schedule optimization.

| # | Test | Expected | Status |
|---|------|----------|--------|
| 1 | Open `/lp/piracicaba-agendamento/?utm_campaign=gate1` | Network POST to beacon → 200; row in Sheet `AttributionSessions` | Manual after Web App deploy |
| 2 | Book via iframe or https://calendar.app.google/PSa2k6ieR8A9Gai77 | Event on `ana.zanardo@auditik.com.br`; 1 row in `Processed` | Manual |
| 3 | CRM | Lead in Lead Control with observation (slot + optional campaign) | Manual |
| 4 | Email | `NOTIFY_EMAILS` receive MailApp message | Manual |
| 5 | Meta | 1× `Schedule` in Events Manager (use `META_TEST_EVENT_CODE` first) | Manual |
| 6 | Idempotency | Edit event description → no second Schedule / CRM lead | Manual |
| 7 | Mobile | Embed usable or fallback link works | Manual |

## Deploy order

1. Copy [`integrations/piracicaba-appointment/`](.) into Apps Script bound to a Sheet (see README).
2. Set Script Properties; run `setupSpreadsheet`; install triggers; deploy Web App.
3. Set GitHub Variables for beacon (+ optional embed overrides).
4. Deploy website.
5. Tick gates 1–7 above.
6. Remove `META_TEST_EVENT_CODE`; launch Meta campaign optimized for **Schedule** (CAPI).

## Site smoke (no Google deploy)

- [x] Route `LP_ROUTES.piracicabaAgendamento` → `/lp/piracicaba-agendamento/`
- [x] Page builds with default embed/fallback URLs
- [x] No `markThankYouSuccess` / form CRM on this LP
- [x] Beacon helper + `GoogleAppointmentEmbed` exported
