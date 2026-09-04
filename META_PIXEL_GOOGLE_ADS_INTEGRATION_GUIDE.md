# Meta Pixel and Google Ads Integration Guide

> **Dual GTM (ago 2026):** Meta Pixel runs in **GTM-NVWQ3PF2**; GA4 + Google Ads stay in **GTM-KHQP88V**. Both share `window.dataLayer`. Meta tags in the legacy container (38/39/44) must be **paused** during the test.
>
> **Thank-you page:** Meta Lead and Google Ads Lead use **different** triggers after successful CRM submit.
> - Meta Pixel is **not** injected by Next.js (no `NEXT_PUBLIC_META_PIXEL_ID` / site `fbq`).
> - Meta Lead: GTM-NVWQ3PF2 Custom Event **`meta_lead`** (via `trackMetaLead` on `/obrigado/` after CRM OK). Do **not** use Page Path `/obrigado/` or Contact as the web conversion.
> - Google Ads Lead: tag **35** on `google_ads_conversion` + `conversion_type = contact` (CE **46**), fired on `/obrigado/` via `trackConversion`.
> - Meta PageView: All Pages + `page_view` in GTM-NVWQ3PF2. Schedule: `conversion_appointment_scheduled`.
> - Do **not** map Lead to `gtm.formSubmission`, Forminator, LP form submit, or generic clicks.

This document explains how engineering and traffic (Pagan) keep Meta Ads and Google Ads aligned with the site contract.

## Source of truth

1. Site emits stable dataLayer events via `trackConversion` / `trackMetaLead` / `trackPageView` / `trackButtonClick`.
2. **GTM-KHQP88V** fires GA4 + Google Ads tags (Meta tags **paused** during dual-GTM test).
3. **GTM-NVWQ3PF2** fires Meta Pixel tags only (same dataLayer contract).
4. Legacy Forminator / `formSubmission` triggers may remain in either container but must **not** fire Meta Lead or Ads Lead.

### Contract table

| Ação no site | dataLayer | Meta (GTM-NVWQ3PF2) | Google Ads (GTM-KHQP88V) |
| --- | --- | --- | --- |
| Load / SPA navigation | `gtm.js` / `page_view` | PageView (All Pages + `page_view`) | Page View (tag 34) |
| Form / WhatsApp lead após CRM OK | Redirect → `/obrigado/`; **`meta_lead`** + `conversion_contact_form_submit` ou `conversion_whatsapp_lead_submitted` + `google_ads_conversion` (`contact`) | Lead via Custom Event **`meta_lead`** | Lead (tag 35, CE 46) |
| Clique WhatsApp / telefone (sem form) | `google_ads_conversion` (`whatsapp` / `phone`) | Nenhum | Nenhum Lead |
| Agendamento real | `conversion_appointment_scheduled` | Schedule | (dataLayer only until Ads tag exists) |
| Forminator / native form submit / LP form event | legado / `lp_*_form_submit` | Não é Lead | Não é Lead |
| Acesso direto a `/obrigado/` | Nenhum (redireciona para `/contato/`) | Nenhum | Nenhum |

### GTM entities (live v26+)

| ID | Nome | Papel |
| --- | --- | --- |
| 45 | `DLV - conversion_type` | Lê `conversion_type` do dataLayer |
| 46 | `CE - google_ads_conversion contact` | Evento `google_ads_conversion` + type `contact` |
| 35 | Google Ads - Lead - Web | Dispara no CE 46 (`oncePerEvent`) |
| 38 / 39 / 44 | Meta PageView / Lead / Schedule | CE `page_view` + `conversion_*` (legacy; Meta Lead must use **`meta_lead`**, not Page Path) |

## Goal

Enable reliable conversion tracking for:

- Campaign optimization in Meta Ads and Google Ads
- Better attribution of leads and appointments
- Data-driven budget decisions

## Architecture Decision

Recommended for this website:

- **Site (engineering):** push dataLayer only (`lib/analytics.ts`, `lib/ad-platform-tracking.ts`)
- **GTM (marketing ops):** Meta Pixel + Google Ads conversion tags; change tags without a deploy when the dataLayer contract is stable

Do not re-introduce Pixel / `fbq` in Next.js.

## Prerequisites

### Accounts and access

- Meta Business Manager access with Pixel permissions
- Google Ads account with admin access
- Google Analytics 4 property connected to this website
- Google Tag Manager container **GTM-KHQP88V** (GA4 + Google Ads)
- Google Tag Manager container **GTM-NVWQ3PF2** (Meta Pixel)

### Required IDs (configured in GTM, not Next env)

- Meta Pixel ID (variable `Meta Pixel ID` in **GTM-NVWQ3PF2**)
- Google Ads Conversion ID (`Google Ads - TAG ID` → `10939469130`)
- Google Ads Lead label (`Google Ads - Lead`)
- GA4 Measurement ID in GTM (`G-EWK59TMDTR`)

## Conversion Strategy Before Coding

Define conversion events before implementation.

### Primary conversions (optimize campaigns for these)

- Contact form submitted (`contact_form_submit` → Meta Lead + Ads Lead)
- WhatsApp lead submitted (same Lead path)
- Appointment scheduled (Meta Schedule when call site exists)
- WhatsApp / phone click (Google dataLayer only today — not Ads Lead)

### Secondary conversions (micro-conversions)

- Product/model page viewed
- Unit location map click
- Scroll and engagement milestones

### Event naming recommendation

Use stable, lowercase, snake_case names across all tools:

- contact_form_submit
- whatsapp_lead_submitted
- appointment_scheduled
- whatsapp_click
- phone_call_initiated

Avoid frequent renaming once campaigns are live.

## Step 1: Meta Pixel Setup in Meta Ads Manager

1. Open Meta Events Manager.
2. Create or select a Pixel for this website.
3. Register website domain and verify domain ownership in Business Settings.
4. Configure Aggregated Event Measurement (if required by your account setup).
5. Create prioritized web events for campaign optimization:
   - Lead
   - Contact
   - Schedule (or custom conversion mapped to appointment)
6. Save Pixel ID in GTM variable `Meta Pixel ID` (not in Next.js env).

## Step 2: Google Ads Conversion Setup

1. Open Google Ads.
2. Navigate to Goals and create conversion actions:
   - Contact form submit (Lead — wired to tag 35)
   - Appointment scheduled (optional future tag)
   - WhatsApp click / phone (optional future tags; site already emits `google_ads_conversion`)
3. For each conversion action, capture:
   - Conversion ID (AW-XXXXXXXXX)
   - Conversion Label
4. Store ID/label in GTM constants; tag 35 fires on `google_ads_conversion` + `conversion_type=contact` only.4. Set attribution model and conversion window based on business cycle.
5. Ensure each conversion has a clear value rule (fixed or dynamic).

## Step 3: Environment Variables

Add to environment configuration:

```bash
# Existing analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Meta Pixel
NEXT_PUBLIC_META_PIXEL_ID=123456789012345

# Google Ads
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-123456789

# Optional per-conversion labels
NEXT_PUBLIC_GOOGLE_ADS_LABEL_CONTACT=AbCdEfGhIjKlMnOpQr
NEXT_PUBLIC_GOOGLE_ADS_LABEL_APPOINTMENT=ZyXwVuTsRqPoNmLkJi
NEXT_PUBLIC_GOOGLE_ADS_LABEL_WHATSAPP=QwErTyUiOpAsDfGhJk
NEXT_PUBLIC_GOOGLE_ADS_LABEL_PHONE=LmNoPqRsTuVwXyZaBc
```

Important:

- Only public IDs and labels go into NEXT_PUBLIC variables.
- Never store private tokens or API secrets in public env vars.

## Step 4: Website Integration (Next.js Pages Router)

The snippets below are reference implementations for this project structure.

### 4.1 Create tracking utility

Create file lib/ad-platform-tracking.ts:

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface AdsEventParams {
  [key: string]: string | number | boolean;
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";

export const trackMetaEvent = (eventName: string, params?: AdsEventParams) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", eventName, params || {});
  }
};

export const trackGoogleAdsConversion = (sendTo: string, params?: AdsEventParams) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "conversion", {
      send_to: sendTo,
      ...params,
    });
  }
};

// Recommended wrappers
export const trackLead = (params?: AdsEventParams) => {
  trackMetaEvent("Lead", params);
};

export const trackContact = (params?: AdsEventParams) => {
  trackMetaEvent("Contact", params);
};

export const trackSchedule = (params?: AdsEventParams) => {
  trackMetaEvent("Schedule", params);
};
```

### 4.2 Load Meta Pixel and Google Ads base scripts

In pages/\_app.tsx, after app hydration:

```typescript
import Script from "next/script";

// Inside component return
{
  process.env.NEXT_PUBLIC_META_PIXEL_ID ? (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
        fbq('track', 'PageView');
      `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt="meta-pixel"
        />
      </noscript>
    </>
  ) : null;
}

{
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ? (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}');
      `}
      </Script>
    </>
  ) : null;
}
```

Notes:

- If GA4 gtag is already loaded, do not duplicate base initialization logic.
- Prefer a single shared gtag initialization path.

### 4.3 Fire conversion events from business actions

Example for form submission:

```typescript
import {
  trackContact,
  trackLead,
  trackGoogleAdsConversion,
} from "@lib/ad-platform-tracking";

const handleContactSubmit = async () => {
  // Existing business logic

  // Meta
  trackContact({ content_name: "contact_form" });
  trackLead({ source: "website" });

  // Google Ads
  trackGoogleAdsConversion(
    `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/${process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_CONTACT}`,
    { value: 1.0, currency: "BRL" },
  );
};
```

Example for appointment CTA click:

```typescript
import { trackSchedule, trackGoogleAdsConversion } from "@lib/ad-platform-tracking";

const onAppointmentClick = () => {
  trackSchedule({ source: "nossa_clinica_cta" });

  trackGoogleAdsConversion(
    `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/${process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_APPOINTMENT}`,
    { value: 1.0, currency: "BRL" },
  );
};
```

## Step 5: Event Mapping Table (Platform Alignment)

Use this mapping as the baseline contract.

| Website event         | Meta event          | Google Ads conversion action |
| --------------------- | ------------------- | ---------------------------- |
| contact_form_submit   | Contact + Lead      | contact_form_submit          |
| appointment_scheduled | Schedule            | appointment_scheduled        |
| whatsapp_click        | Contact (or custom) | whatsapp_click               |
| phone_call_initiated  | Contact (or custom) | phone_call_initiated         |

Keep this mapping unchanged unless there is a clear business reason.

## Step 6: Validation and QA

### Meta validation

- Install Meta Pixel Helper extension.
- Confirm PageView on every route.
- Trigger each conversion and verify event names and parameters.
- Check Event Match Quality and diagnostics in Events Manager.

### Google Ads validation

- Use Tag Assistant to verify gtag and conversion dispatch.
- Trigger each conversion and confirm request contains correct send_to.
- Verify conversion actions receive data in Google Ads diagnostics.

### Cross-check with GA4

- Validate event volume trend consistency between GA4 and ad platforms.
- Small differences are normal due to attribution and ad blockers.

## Step 7: Campaign Optimization Best Practices

### Meta Ads

- Optimize campaigns for the most valuable conversion (not only clicks).
- Use event prioritization aligned with business goals.
- Avoid optimizing for micro-events when lead quality is the primary objective.

### Google Ads

- Use conversion-based bidding once enough volume is available.
- Separate brand and non-brand campaigns.
- Use distinct conversion actions when intent and value differ.

### Shared recommendations

- Keep UTM structure consistent across all campaigns.
- Review search terms and placement quality weekly.
- Monitor lead quality, not just conversion quantity.

## Step 8: Consent, Privacy, and Compliance

- Implement consent-aware tracking (LGPD/GDPR compliant).
- Do not track personally identifiable information in event params.
- Trigger marketing tags only after appropriate consent where required.
- Keep data retention and access controls documented.

## Step 9: Ongoing Operations and Adjustment Cycle

Weekly:

- Check conversion volume anomalies
- Validate top campaign events
- Audit tracking errors in browser console and platform diagnostics

Monthly:

- Review attribution quality
- Review conversion action settings and value model
- Remove unused tags and deprecated events

Quarterly:

- Revisit funnel strategy and event taxonomy
- Evaluate adding server-side tracking (Meta CAPI, Google Enhanced Conversions)

## Troubleshooting

### Event not firing

- Confirm env variables are present in runtime.
- Confirm script loaded after hydration.
- Confirm handler executes exactly once.
- Check ad blocker impact.

### Conversion appears in GA4 but not in ads platform

- Check mapping and send_to format.
- Validate conversion action status in platform.
- Check account timezone and attribution windows.

### Duplicate conversions

- Ensure single firing point in code.
- Prevent multiple click handlers on nested elements.
- Add guard logic for idempotent conversion submission.

## Go-Live Checklist (dual GTM Meta test)

- [ ] Site deployed with both GTM snippets (`GTM-KHQP88V` + `GTM-NVWQ3PF2`)
- [ ] GitHub Variable `NEXT_PUBLIC_GTM_ID_META` = `GTM-NVWQ3PF2`
- [ ] Bruno: **Pause** all Meta tags in GTM-KHQP88V (38 PageView, Lead, 44 Schedule) and **publish**
- [ ] Bruno: Configure Meta Pixel in GTM-NVWQ3PF2 (PageView, Lead on Custom Event **`meta_lead`**, Schedule) and **publish**
- [ ] Bruno: Google Ads tag 35 in GTM-KHQP88V **unchanged**
- [ ] Test: Pixel Helper shows **one** Meta Pixel ID
- [ ] Test: successful form → 1 Meta Lead (`meta_lead`) + 1 Google Ads Lead (event)
- [ ] Test: direct visit `/obrigado/` → redirect to `/contato/`, no conversions
- [ ] Test: CRM failure → no redirect, no conversions

## Go-Live Checklist (thank-you page / `meta_lead`)

- [ ] Site deployed with `/obrigado/` and `trackMetaLead` after CRM success
- [ ] Bruno: Meta Lead tag in GTM-NVWQ3PF2 on Custom Event **`meta_lead`** (standard Pixel Lead)
- [ ] Bruno: Pause Contact/Lead on Page Path `/obrigado/`, LP form submit, or `conversion_*`
- [ ] Bruno: Legacy Meta tag 39 in GTM-KHQP88V **paused**
- [ ] Bruno: Google Ads tag 35 **unchanged** (no URL-based Ads conversion)
- [ ] Test: successful form → 1 Meta Lead (navegador) + 1 Google Ads Lead (event)
- [ ] Test: direct visit `/obrigado/` → redirect to `/contato/`, no conversions
- [ ] Test: CRM failure → no redirect, no conversions

## GTM handoff (agência — ajuste mínimo)

**Frase única:** No site, Lead do Meta é o dataLayer **`meta_lead`** em `/obrigado/` depois do formulário. No GTM-NVWQ3PF2, mapear esse Custom Event para o Pixel padrão **Lead** e publicar. PageView não mexe. Não usar URL da LP nem Contact como conversão web.

### Passos GTM-NVWQ3PF2 (mínimo)

1. Trigger: Evento personalizado = **`meta_lead`**
2. Tag Pixel: evento padrão **Lead** (`fbq('track','Lead')`) — reaproveitar a tag Contact do teste (trocar Contact → Lead) ou criar `Meta Ads - Lead - Web`
3. Pausar Contact/Lead duplicados por Page Path `/obrigado/` ou submit da LP
4. **Publicar** o container
5. Não alterar PageView; não criar tag Meta em GTM-KHQP88V

### Validação (LP Americana → obrigado)

1. Deploy do site com `meta_lead`
2. `/lp/americana-philips/` → enviar form → “Recebemos seus dados”
3. Console: `(window.dataLayer || []).filter(e => e && e.event === "meta_lead")` — **1** objeto
4. Preview NVWQ3PF2: tag Lead Fired
5. Testar eventos / Pixel Helper: **Lead**, URL `https://auditik.com.br/obrigado/`, origem Navegador

Controles: visita direta `/obrigado/` → `/contato/`, zero Lead; CRM falhou → sem redirect, zero Lead.

### GTM-KHQP88V (legado — Meta pausado)

1. **Pause** Meta tags 38, 39, 44 (and any Facebook/CAPI tags).
2. **Do not** add Google Ads conversion on `/obrigado/` URL — tag 35 stays on `google_ads_conversion` + `conversion_type = contact`.
3. Forms and WhatsApp modal redirect to `/obrigado/` only after successful CRM submit.

Validate in GTM Preview (NVWQ3PF2) + Pixel Helper + Test Events: one Meta Lead per successful submit, one Google Ads Lead via dataLayer event, no duplicates.

## Go-Live Checklist (legacy)

## Recommended Next Phase

After baseline client-side tracking is stable, implement:

- Meta Conversions API (CAPI)
- Google Enhanced Conversions

These improve reliability in privacy-constrained and ad-blocked environments.
