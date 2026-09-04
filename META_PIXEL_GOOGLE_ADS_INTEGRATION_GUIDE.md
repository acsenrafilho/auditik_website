# Meta Pixel and Google Ads Integration Guide

> **Single GTM (cutover):** Meta Pixel + GA4 + Google Ads run in **GTM-KHQP88V**. Agency container `GTM-NVWQ3PF2` is abandoned (`NEXT_PUBLIC_GTM_ID_META=empty`).
>
> **Lead:** Meta Lead fires on the **form page** via Custom Event **`meta_lead`** → tag **49** (before redirect). Google Ads Lead fires on `/obrigado/` via tag **35**.
> - Meta Pixel is loaded by GTM (no Next.js Pixel bootstrap). Production: `NEXT_PUBLIC_META_LEAD_BROWSER_FBQ=false` (GTM owns Lead).
> - Do **not** use Page Path `/obrigado/`, Form Submission, or Forminator for Meta Lead.
> - Google Ads Lead: tag **35** on `google_ads_conversion` + `conversion_type = contact` (CE **46**).
> - Meta PageView: tag **38** (All Pages + `page_view`). Schedule: tag **44** on `conversion_appointment_scheduled`.

This document explains how engineering and traffic keep Meta Ads and Google Ads aligned with the site contract.

## Source of truth

1. Site emits stable dataLayer events via `trackConversion` / `trackMetaLead` (in `markThankYouSuccess`) / `trackPageView` / `trackButtonClick`.
2. **GTM-KHQP88V** fires GA4, Google Ads, and Meta Pixel tags.
3. Legacy Forminator / `formSubmission` triggers may remain but must **not** fire Meta Lead or Ads Lead.

### Contract table

| Ação no site | dataLayer | Meta (GTM-KHQP88V) | Google Ads (GTM-KHQP88V) |
| --- | --- | --- | --- |
| Load / SPA navigation | `gtm.js` / `page_view` | PageView (tag 38) | Page View (tag 34) |
| Form / WhatsApp lead (form válido) | On form page: **`meta_lead`**; then redirect → `/obrigado/`; `conversion_*` + `google_ads_conversion` (`contact`) | Lead (tag **49**, CE **50** `meta_lead`) | Lead (tag 35, CE 46) on `/obrigado/` |
| Clique WhatsApp / telefone (sem form) | `google_ads_conversion` (`whatsapp` / `phone`) | Nenhum | Nenhum Lead |
| Agendamento real | `conversion_appointment_scheduled` | Schedule (tag 44) | (dataLayer only until Ads tag exists) |
| Forminator / native form submit / LP form event | legado / `lp_*_form_submit` | Não é Lead | Não é Lead |
| Acesso direto a `/obrigado/` | Nenhum (redireciona para `/contato/`) | Nenhum | Nenhum |

### GTM entities (live v30+)

| ID | Nome | Papel |
| --- | --- | --- |
| 45 | `DLV - conversion_type` | Lê `conversion_type` do dataLayer |
| 46 | `CE - google_ads_conversion contact` | Evento `google_ads_conversion` + type `contact` |
| 35 | Google Ads - Lead - Web | Dispara no CE 46 (`oncePerEvent`) |
| 38 | Meta Ads - Page View - Web | All Pages + CE `page_view` |
| 50 | `CE - meta_lead` | Custom Event `meta_lead` from site |
| 49 | Meta Ads - Lead - Web - novo | Standard Lead on CE 50 (`oncePerEvent`) |
| 44 | Meta Ads - Schedule - Web | CE `conversion_appointment_scheduled` |

## Goal

Enable reliable conversion tracking for:

- Campaign optimization in Meta Ads and Google Ads
- Better attribution of leads and appointments
- Data-driven budget decisions

## Architecture Decision

Recommended for this website:

- **Site (engineering):** push dataLayer (`lib/analytics.ts`, `lib/ad-platform-tracking.ts`); `markThankYouSuccess` emits `meta_lead` on the form page (even if CRM POST fails after a valid form)
- **GTM (ops):** Meta Pixel PageView (tag 38) + Lead on CE `meta_lead` (tag 49) + Schedule (tag 44); Google Ads conversion tags; change tags without a deploy when the dataLayer contract is stable

Do not re-introduce a full Meta Pixel bootstrap snippet in Next.js. Rely on GTM for `fbq` init; the site only calls `fbq('track'|'trackSingle', …)` when `NEXT_PUBLIC_META_LEAD_BROWSER_FBQ` is true (off in production cutover).

## Prerequisites

### Accounts and access

- Meta Business Manager access with Pixel permissions
- Google Ads account with admin access
- Google Analytics 4 property connected to this website
- Google Tag Manager container **GTM-KHQP88V** (GA4 + Google Ads + Meta Pixel)

### Required IDs (configured in GTM, not Next env)

- Meta Pixel ID (variable `Meta Pixel ID` in **GTM-KHQP88V** → `856128025882243`)
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

## Go-Live Checklist (KHQP88V single-container cutover)

- [ ] GitHub Variable `NEXT_PUBLIC_GTM_ID` = `GTM-KHQP88V`
- [ ] GitHub Variable `NEXT_PUBLIC_GTM_ID_META` = **`empty`** (GitHub cannot store blank; also `none` / `off` / `-`)
- [ ] GitHub Variable `NEXT_PUBLIC_META_LEAD_BROWSER_FBQ` = `false`
- [ ] Site redeployed; HTML has only `GTM-KHQP88V` (no `GTM-NVWQ3PF2`)
- [ ] GTM live: tag **49** on CE **50** (`meta_lead`), `oncePerEvent`; tag **35** unchanged
- [ ] Test: LP americana submit → 1× `meta_lead` + Meta Lead in Test Events; Google Ads Lead on `/obrigado/`
- [ ] Test: contato / home / WhatsApp modal → same Meta Lead
- [ ] Test: direct visit `/obrigado/` → redirect to `/contato/`, no conversions
- [ ] Test: CRM network failure after valid form → still Meta Lead + `/obrigado/`

## Go-Live Checklist (thank-you page / Google Ads)

- [ ] Site deployed with `/obrigado/` and Meta Lead on form page via `markThankYouSuccess` → CE `meta_lead`
- [ ] Google Ads tag 35 **unchanged** (no URL-based Ads conversion)
- [ ] Test: form → Meta Lead once on form page; Google Ads Lead on `/obrigado/`
- [ ] Test: direct visit `/obrigado/` → redirect to `/contato/`, no conversions

## GTM handoff (ops)

**Frase única:** No site, após formulário válido o Lead do Meta sai na **página do formulário** (`meta_lead` → tag 49). `/obrigado/` é UX + Google Ads. Não depender de path da LP nem de Form Submission.

### Validação (LP Americana → obrigado)

1. Deploy do site com cutover (META empty, browser fbq false)
2. `/lp/americana-philips/` → enviar form → “Recebemos seus dados”
3. Testar eventos (Pixel BM1): **Lead** na sessão da LP (antes/ao redirecionar)
4. GTM Preview **KHQP88V**: `meta_lead` no dataLayer **1** vez; tag 49 Fired; `/obrigado/` sem segundo Lead Meta
5. Pixel Helper: Pixel **`856128025882243`**

Controles: visita direta `/obrigado/` → `/contato/`, zero Lead; Form Submission / Forminator **não** disparam Meta Lead.

## Legacy notes (dual-GTM abandoned)

Agency container `GTM-NVWQ3PF2` is no longer loaded by the site. Optionally ask the agency to pause/archive it. Do not re-set `NEXT_PUBLIC_GTM_ID_META` unless intentionally re-testing dual-GTM.

## Recommended Next Phase

After baseline client-side tracking is stable, implement:

- Meta Conversions API (CAPI)
- Google Enhanced Conversions

These improve reliability in privacy-constrained and ad-blocked environments.
