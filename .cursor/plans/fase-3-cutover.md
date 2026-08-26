---
name: Fase 3 — Cutover Pixel do código
overview: Fascículo dedicado da Fase 3 — remover fbq/Pixel do Next; única origem Meta = GTM v25. Gate 3 verde. Deploy b1cb187.
parent: meta_gtm_por_fases_da1460a7
todos:
  - id: precheck-gtm-v25
    content: "Pré-check MCP: live GTM ainda v25, tags 38/39/44 + CE 40–43 sem drift"
    status: completed
  - id: cut-fbq-code
    content: Remover Pixel/fbq de DeferredMarketingScripts, _app.tsx, ad-platform-tracking; JSDoc analytics.ts
    status: completed
  - id: optional-env-docs
    content: Tirar NEXT_PUBLIC_META_PIXEL_ID do deploy.yml, .env.example, README, DEPLOYMENT; aviso no guia
    status: completed
  - id: local-verify
    content: "Grep + build: HTML sem fbevents/meta-pixel; GTM bootstrap presente"
    status: completed
  - id: gate-3-prod
    content: "Pós-deploy: unicidade 1 Pixel / 1 PageView / 1 Lead; fase-3-cutover-results.json"
    status: completed
  - id: mark-matrix
    content: Gate 3 verde → marcar fase-3 completed no plano-matriz + anexos
    status: completed
isProject: false
---

# Fase 3 — Cortar Pixel do código (cutover)

**Plano matriz:** [meta_gtm_por_fases_da1460a7.plan.md](meta_gtm_por_fases_da1460a7.plan.md)  
**Fase anterior:** [fase-2-paridade.md](fase-2-paridade.md) (Gate 2 verde)  
**Evidência JSON:** [fase-3-cutover-results.json](fase-3-cutover-results.json)  
**Runner:** [`scripts/fase3-cutover-runner.py`](../../scripts/fase3-cutover-runner.py)

**Objetivo:** uma única origem Meta = GTM. Remover `fbq` / Pixel do site.

**Gate 3:** **VERDE** (26 ago 2026). HTML do Next sem Pixel; 1 PageView no load; 1 Lead por conversão via GTM; 0 Lead em cliques.

**Não feito nesta fase (correto):** `trackConversion` na home; retarget tag 35; call site `appointment_scheduled`; nova versão GTM.

---

## 1. Pré-check GTM (MCP, 26 ago 2026)

| Campo | Valor |
| ----- | ----- |
| Public ID | `GTM-KHQP88V` |
| Conta | `6119506907` |
| Container | `126875133` |
| Workspace | `25` (Default) |
| Versão live | **25** — `Fase 1 — Meta dataLayer paralelo` |
| Drift vs handoff Fase 1/2 | **Nenhum** |

| Tag | Evento Meta | Triggers | Firing |
| --- | ----------- | -------- | ------ |
| **38** PageView | `PageView` | All Pages + CE **40** | `oncePerEvent` |
| **39** Lead | `Lead` | CE **41** + CE **42** (**sem** 33) | `oncePerEvent` |
| **44** Schedule | `Schedule` | CE **43** | `oncePerEvent`, ativa |

---

## 2. Código e deploy

| Área | Mudança |
| ---- | ------- |
| [`DeferredMarketingScripts.tsx`](../../components/Analytics/DeferredMarketingScripts.tsx) | Removido bloco `meta-pixel` / `fbevents` / noscript; GTM + defer `/lp/*` mantidos |
| [`pages/_app.tsx`](../../pages/_app.tsx) | Removido `fbq('track','PageView')` no route change; `trackPageView` mantido |
| [`lib/ad-platform-tracking.ts`](../../lib/ad-platform-tracking.ts) | Removidos `META_PIXEL_ID` / `trackMetaEvent`; Google Ads dataLayer mantido |
| [`lib/analytics.ts`](../../lib/analytics.ts) | JSDoc: Meta via GTM `conversion_*` |
| [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml) | `NEXT_PUBLIC_META_PIXEL_ID` removido (env + validação + build) |
| Docs | `.env.example`, README, DEPLOYMENT, aviso no guia de integração |

**Release:** commit `b1cb187` → deploy workflow success (Actions run `32992248166`).

---

## 3. Gate 3 (produção)

| Campo | Valor |
| ----- | ----- |
| Data | 26 ago 2026 (~17:16 UTC) |
| URL | `https://www.auditik.com.br/` |
| GTM | Live **v25** |
| Método | Playwright; HTML via response Next; Leads 3–5 via `dataLayer.push`; spy `trackSingle` Stape |

| # | Ação | Esperado | OK |
| - | ---- | -------- | -- |
| HTML | Response sem `meta-pixel` / `fbevents` no Next; GTM presente | Só GTM carrega Pixel | Sim |
| 1 | Home load | 1 PageView Network; 0 site `fbq('track')`; 0 Lead | Sim |
| 2 | SPA → `/contato` | `page_view` + PageView GTM; 0 site track | Sim |
| 3–5 | conversion contact / LP / WA | **1** Lead `trackSingle`; 0 site track | Sim |
| 6–7 | Gate WA / telefone | **0** Lead | Sim |
| Neg | `gtm.formSubmission` | **0** Lead | Sim |
| Opt | Schedule | 1× tag 44 | Sim |

---

## 4. Gate 3 checklist

| Critério | Status |
| -------- | ------ |
| HTML Next sem Pixel embutido | OK |
| 1 PageView no load (unicidade) | OK |
| 1 Lead por conversão (GTM) | OK |
| Cliques sem Lead Meta | OK |
| `NEXT_PUBLIC_META_PIXEL_ID` fora do deploy obrigatório | OK |
| **Gate 3** | **VERDE** |

---

## 5. Handoff → Fase 4

1. Home: `trackConversion(CONTACT_FORM_SUBMIT)` em [`index.tsx`](../../pages/index.tsx).
2. Google Ads Lead (tag 35): alinhar a `google_ads_conversion` / contact (não formSubmission).
3. Docs ops curtos para o Pagan.

---

## 6. Status deste fascículo

| Item | Status |
| ---- | ------ |
| Pré-check GTM v25 | Feito |
| Cutover código + deploy | Feito — `b1cb187` |
| Gate 3 | **VERDE** |
| Plano-matriz `fase-3-cutover-codigo` | Marcar completed |
