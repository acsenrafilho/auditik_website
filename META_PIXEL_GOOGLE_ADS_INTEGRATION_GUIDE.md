# Meta Pixel and Google Ads Integration Guide

This document explains the complete process to configure, implement, validate, and optimize Meta Ads Pixel and Google Ads tracking in this website.

It is designed for engineering and digital marketing teams working together.

## Goal

Enable reliable conversion tracking for:

- Campaign optimization in Meta Ads and Google Ads
- Better attribution of leads and appointments
- Data-driven budget decisions

## Architecture Decision

There are two valid approaches:

- Direct code integration (faster initial setup, engineering-owned)
- Google Tag Manager (more flexible for marketing operations)

Recommended for this website:

- Keep direct integration for baseline technical events controlled by developers
- Optionally add GTM later for marketing agility (new tags without deploy)

## Prerequisites

### Accounts and access

- Meta Business Manager access with Pixel permissions
- Google Ads account with admin access
- Google Analytics 4 property connected to this website
- Google Tag Manager container (optional but recommended for scale)

### Required IDs

Collect these values before implementation:

- Meta Pixel ID (format: numeric)
- Google Ads Conversion ID (format: AW-XXXXXXXXX)
- Google Ads Conversion Labels (one label per conversion action)
- GA4 Measurement ID if not already configured (format: G-XXXXXXXXXX)

## Conversion Strategy Before Coding

Define conversion events before implementation.

### Primary conversions (optimize campaigns for these)

- Contact form submitted
- Appointment scheduled
- WhatsApp click (high-intent contact)
- Phone call initiated

### Secondary conversions (micro-conversions)

- Product/model page viewed
- Unit location map click
- Scroll and engagement milestones

### Event naming recommendation

Use stable, lowercase, snake_case names across all tools:

- contact_form_submit
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
6. Save Pixel ID for engineering.

## Step 2: Google Ads Conversion Setup

1. Open Google Ads.
2. Navigate to Goals and create conversion actions:
   - Contact form submit
   - Appointment scheduled
   - WhatsApp click
   - Phone call click
3. For each conversion action, capture:
   - Conversion ID (AW-XXXXXXXXX)
   - Conversion Label
4. Set attribution model and conversion window based on business cycle.
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

## Go-Live Checklist

- [ ] Meta Pixel ID configured in environment
- [ ] Google Ads ID and labels configured in environment
- [ ] Base scripts loaded only once
- [ ] Primary conversions firing on production flows
- [ ] Events validated in Meta Pixel Helper and Tag Assistant
- [ ] Conversion actions receiving data in both platforms
- [ ] Consent flow tested
- [ ] No PII in tracking payload
- [ ] Documentation updated with final event mapping

## Recommended Next Phase

After baseline client-side tracking is stable, implement:

- Meta Conversions API (CAPI)
- Google Enhanced Conversions

These improve reliability in privacy-constrained and ad-blocked environments.
