---
name: Fase 4 — Hardening
overview: Fascículo dedicado da Fase 4 — home trackConversion; Ads Lead tag 35 no dataLayer; docs ops. Gate 4 verde. GTM v26 + deploy 829dc60.
parent: meta_gtm_por_fases_da1460a7
todos:
  - id: home-trackConversion
    content: trackConversion(CONTACT_FORM_SUBMIT) em pages/index.tsx
    status: completed
  - id: gtm-ads-lead
    content: "DLV 45 + CE 46; retarget tag 35; publish v26"
    status: completed
  - id: docs-ops
    content: README + guia de integração com tabela contrato
    status: completed
  - id: gate-4
    content: "Produção: home/contato/LP/WA Meta+Ads; negativos; results JSON"
    status: completed
  - id: close-matrix
    content: Fascículo + matriz fase-4 completed
    status: completed
isProject: false
---

# Fase 4 — Hardening e alinhamento residual

**Plano matriz:** [meta_gtm_por_fases_da1460a7.plan.md](meta_gtm_por_fases_da1460a7.plan.md)  
**Fase anterior:** [fase-3-cutover.md](fase-3-cutover.md) (Gate 3 verde)  
**Evidência JSON:** [fase-4-hardening-results.json](fase-4-hardening-results.json)  
**Runner:** [`scripts/fase4-hardening-runner.py`](../../scripts/fase4-hardening-runner.py)

**Objetivo:** funil de Lead coerente em todas as superfícies (incluindo home) e Google Ads Lead no mesmo critério do Meta — dataLayer estável, não `formSubmission`.

**Gate 4:** **VERDE** (26 ago 2026). Home UI gera Meta Lead + Ads Lead; regressão contato/LP/WA ok; cliques / `formSubmission` / `conversion_type=whatsapp` → 0 Leads.

**Não feito nesta fase (correto):** call site `appointment_scheduled`; tags Ads para whatsapp/phone/appointment; remoção Forminator/Mida/trigger 33.

---

## 1. Código

| Arquivo | Mudança |
| ------- | ------- |
| [`pages/index.tsx`](../../pages/index.tsx) | `trackConversion(CONVERSION_GOALS.CONTACT_FORM_SUBMIT, { page: "home", ... })` após `trackFormSubmit` |

**Release site:** commit `829dc60` → deploy workflow success (Actions run `32997242210`).

---

## 2. GTM (workspace 27 → live v26)

Workspace Default antigo `25` estava stale pós-publish v25; mudanças feitas no workspace **27** (`Fase 4 — Ads Lead hardening`).

| Campo | Valor |
| ----- | ----- |
| Public ID | `GTM-KHQP88V` |
| Conta | `6119506907` |
| Container | `126875133` |
| Versão live | **26** — `Fase 4 — Ads Lead dataLayer contact` |
| Contagens | 12 tags, 10 triggers, 5 variables |

| Entidade | ID | Detalhe |
| -------- | -- | ------- |
| DLV | **45** | `DLV - conversion_type` → dataLayer `conversion_type` |
| Trigger CE | **46** | `CE - google_ads_conversion contact` — event `google_ads_conversion` + filter type `contact` |
| Tag Ads Lead | **35** | Firing **46** only (sem 33); `oncePerEvent` |
| Tag Meta Lead | **39** | Inalterada (CE 41 + 42) |
| Trigger 33 | órfão | Mantido; não dispara Meta nem Ads Lead |

---

## 3. Docs ops

- [README.md](../../README.md) — seção Analytics com tabela contrato
- [META_PIXEL_GOOGLE_ADS_INTEGRATION_GUIDE.md](../../META_PIXEL_GOOGLE_ADS_INTEGRATION_GUIDE.md) — fonte da verdade = dataLayer; Ads Lead = CE 46 / tag 35

---

## 4. Gate 4 (produção)

| Campo | Valor |
| ----- | ----- |
| Data | 26 ago 2026 (~18:17 UTC) |
| URL | `https://www.auditik.com.br/` |
| GTM | Live **v26** |
| Deploy | `829dc60` |
| Método | Playwright; Meta = `fbq('trackSingle')`; Ads Lead = network conversion hits |

| # | Ação | Esperado | OK |
| - | ---- | -------- | -- |
| home-ui | Submit form home | 1 Meta Lead + Ads Lead | Sim |
| contato / lp / whatsapp | `conversion_*` + `google_ads_conversion` contact | 1 Meta + Ads | Sim |
| wa-gate | Abrir modal sem submit | 0 / 0 | Sim |
| phone | Clique telefone | 0 / 0 | Sim |
| formSubmission | `gtm.formSubmission` | 0 / 0 | Sim |
| neg-whatsapp-type | `google_ads_conversion` whatsapp | 0 Ads Lead | Sim |

---

## 5. Gate 4 checklist

| Critério | Status |
| -------- | ------ |
| Home gera Lead via GTM (Meta) | OK |
| Ads Lead alinhado a `google_ads_conversion` / `contact` | OK |
| Cliques e formSubmission sem Lead | OK |
| Documentação do contrato publicada | OK |
| **Gate 4** | **VERDE** |

---

## 6. Status deste fascículo

| Item | Status |
| ---- | ------ |
| Home `trackConversion` + deploy | Feito — `829dc60` |
| GTM v26 (DLV 45, CE 46, tag 35) | Feito |
| Docs ops | Feito |
| Gate 4 | **VERDE** |
| Plano-matriz `fase-4-hardening` | Marcar completed |

**Plano-matriz completo** — fases 0–4 verdes. Itens fora de escopo (call site Schedule, CAPI, micro-conversões) permanecem fora até demanda explícita.
