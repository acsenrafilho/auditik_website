# Piracicaba appointment pipeline (Google Apps Script)

Processes **Google Calendar Appointment Schedule** bookings on `ana.zanardo@auditik.com.br` and:

1. Creates a lead in **Lead Control** (same JSON contract as the website proxy)
2. Sends an internal **email** (`MailApp`) to reception
3. Sends Meta **Conversions API** event `Schedule`
4. Accepts an **attribution beacon** from the LP (UTMs + `_fbp` / `_fbc`) via Web App `doPost`

Site LP: `/lp/piracicaba-agendamento/` (embed only — no form CRM / `/obrigado/`).

## Deployed project (clasp)

| Item | Value |
|------|--------|
| **Script** | https://script.google.com/d/1fIp67_Ouj5vuDty4i6dQorewZ86kMIUT8B-1oawt7sMeGW6AX7dDFuzv/edit |
| **Bound spreadsheet** | https://docs.google.com/spreadsheets/d/1zla14kuFTpEZhtCx9EzDYrl7NYzo7nusg7osySWJPB8/edit |
| **Local + push** | `cd integrations/piracicaba-appointment && clasp push` |

Código já foi enviado via `clasp push` (2026-09-23). Segue a configuração **manual** abaixo.

## Confirmed booking shape (2026-09-23)

| Field | Example |
|-------|---------|
| `summary` | `Agendar Experiência Philips Piracicaba (Full Name)` |
| Description | Block **Reservado por** with name, email, phone |
| Custom Q | `Tem exame de audiometria (com menos de 1 ano)?` → Sim/Não |
| Custom Q | `Qual a sua cidade?` → free text → CRM `city` |
| Clinic phone in footer | `(19) 3377-6941` — ignored by parser (`CLINIC_PHONE_DIGITS`) |

Booking URLs:

- Fallback: https://calendar.app.google/PSa2k6ieR8A9Gai77
- Embed `src`: `https://calendar.google.com/calendar/appointments/schedules/AcZssZ0bReaXUY72-pCVxlaAS-GkE6AkOVrShqUmRJFQ6kcAInMoofzZQcgGx4QMW87T3EzOnmDWTG1q?gv=true`

## Install (manual steps remaining)

### 1. Spreadsheet tabs

No editor do Apps Script (conta Auditik), rode uma vez a função **`setupSpreadsheet`** (Run ▶). Isso cria as abas `Processed`, `Logs`, `AttributionSessions`.

Na primeira execução o Google pedirá autorização (Calendar, Sheets, UrlFetch, Mail) — aceite com a conta Auditik.

### 2. Script properties (você configura)

**Project Settings → Script properties** — adicione:

| Key | Obrigatório | O que colocar |
|-----|-------------|---------------|
| `CALENDAR_ID` | recomendado | `ana.zanardo@auditik.com.br` (já é o default no código) |
| `LEAD_PROXY_URL` | **sim** | Mesmo valor de `NEXT_PUBLIC_LEAD_PROXY_URL` do site |
| `LEAD_API_KEY` | se o proxy exigir | Header `X-Api-Key` |
| `LEAD_COMPANY_ID` | recomendado | UUID da empresa no Lead Control (default no código = mesmo do site) |
| `LEAD_INTEGRATION_NAME` | recomendado | `agendamento-meta-piracicaba` |
| `LEAD_SOURCE_LABEL` | recomendado | `Google Appointment — LP Meta Piracicaba` |
| `LEAD_AUDIOLOGIST` | **sim** (status) | Nome **exato** do catálogo Lead Control. Default no código: `Fga. Karolyne Dell Ducas Senra`. Obrigatório para `statusLead: Agendamento realizado` |
| `NOTIFY_EMAILS` | **sim** | e-mails da secretária/balcão, separados por vírgula |
| `META_PIXEL_ID` | **sim** | ID do Pixel |
| `META_CAPI_TOKEN` | **sim** | Token da Conversions API |
| `META_TEST_EVENT_CODE` | só homologação | Código de Test Events no Events Manager |
| `ATTRIBUTION_BEACON_SECRET` | **sim** (para LP) | Gere um segredo aleatório; use o **mesmo** em `NEXT_PUBLIC_ATTRIBUTION_BEACON_TOKEN` |
| `BOOKING_MAX_AGE_MINUTES` | opcional | default `120` |
| `ATTRIBUTION_TTL_MINUTES` | opcional | default `60` |

### 3. Triggers (manual)

No Apps Script → **Triggers** (ícone de relógio):

| Function | Event |
|----------|--------|
| `onCalendarEventUpdated` | From calendar → **Calendar updated** → calendário `ana.zanardo@auditik.com.br` |
| `retryFailedCapi` | Time-driven → Every **15 minutes** |

### 4. Web App (beacon) — manual

1. **Deploy → New deployment → Web app**
2. Execute as: **Me** (conta Auditik)
3. Who has access: **Anyone**
4. Copie a URL `/exec` → GitHub Variable `NEXT_PUBLIC_ATTRIBUTION_BEACON_URL`
5. Token = mesmo valor de `ATTRIBUTION_BEACON_SECRET` → Variable `NEXT_PUBLIC_ATTRIBUTION_BEACON_TOKEN`

### 5. Smoke tests

1. `runManualTest` após um agendamento novo (ou apague a property `SYNC_TOKEN` e rode de novo).
2. Aba `Processed`: `crm_status=ok`, `capi_status=ok`.
3. Lead no CRM + e-mail + Meta Test Events (`Schedule`).
4. Editar o evento → não deve duplicar Schedule.
5. Beacon: `curl` na URL do Web App com `token` + JSON de teste.

## Processing order

1. Incremental `Events.list` + `syncToken`
2. Filter: summary prefix + phone/email extractable
3. Skip if `Processed` already CRM+CAPI ok
4. Match attribution session (phone/email or recent cookie/UTM session)
5. POST Lead Control → MailApp → CAPI `Schedule`
6. Upsert `Processed`; CAPI failures retried by `retryFailedCapi`

## Runbook

| Symptom | Check |
|---------|--------|
| No row in Processed | Trigger auth/calendar; Logs; summary prefix; syncToken |
| CRM failed | `LEAD_PROXY_URL` / key / `LEAD_AUDIOLOGIST`; Logs `last_error` |
| Lead com status “Aguardando contato” | Falta `audiologist` no catálogo — confira `LEAD_AUDIOLOGIST` = `Fga. Karolyne Dell Ducas Senra` |
| CAPI failed | Token/pixel; Test Events; retry job |
| Unattributed Schedule | Beacon URL/token on LP; TTL; session within window |
| Wrong phone | Clinic footer vs booker block — see `CLINIC_PHONE_DIGITS` |

## Files

| File | Role |
|------|------|
| `Config.gs` | Properties + defaults |
| `SheetStore.gs` | Logs / sheet bootstrap |
| `CalendarSync.gs` | syncToken list |
| `EventFilter.gs` | Candidate + extract contact |
| `Idempotency.gs` | Processed sheet |
| `LeadControl.gs` | CRM POST |
| `Notify.gs` | MailApp |
| `MetaCapi.gs` | CAPI Schedule |
| `Attribution.gs` | Session match |
| `WebApp.gs` | `doPost` / `doGet` |
| `Main.gs` | Triggers + pipeline |
