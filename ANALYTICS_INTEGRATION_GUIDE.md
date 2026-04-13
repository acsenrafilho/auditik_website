# Analytics Integration Guide

## Quick Start

### 1. Automatic Tracking (Already Configured)

Page views are **automatically tracked** in `pages/_app.tsx`:

- Every route change is tracked as a page view event
- User properties can be set via URL parameters
- No additional code needed for basic page tracking

### 2. Verify GA4 Script is Loading

Check your `.env.local` file:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Get this from Google Analytics
```

## Tracking Best Practices (Code + Measurement)

This section is the recommended standard for all new analytics work in this website.

### 1. Start with business intent, then implement events

Before writing tracking code, define:

- What question this event answers (example: "Which CTA drives more appointments?")
- Which action indicates success (example: `conversion_appointment_scheduled`)
- Which event parameters are required to segment results (example: `page`, `location`, `button_name`)

If an event does not support a product or marketing decision, do not add it.

### 2. Prefer helper functions over raw `trackEvent`

Use wrapper helpers from [lib/analytics.ts](lib/analytics.ts) whenever possible:

- `trackButtonClick(...)` for CTA interactions
- `trackFormSubmit(...)` for form completions
- `trackConversion(...)` for conversion milestones
- `trackLinkClick(...)` for outbound/high-value links
- `trackProductView(...)` for product/device exposure
- `trackEngagement(...)` for depth/time engagement

Use `trackEvent(...)` only for events that do not fit a helper.

### 3. Keep event names consistent and stable

- Use lowercase and snake_case naming.
- Do not frequently rename events already used in GA4 reports.
- Reuse constants (`CONVERSION_GOALS`, `BUTTON_NAMES`, `PRODUCT_NAMES`) to avoid typos and fragmented reports.

### 4. Use meaningful parameters (and keep them small)

Always include context that supports reporting:

- `page`: page slug or screen context
- `location`: city/unit context when relevant
- `button_name` or `link_name`: semantic action name
- `item_name` and `item_category` for product-related interactions

Avoid adding high-cardinality parameters (random IDs, timestamps as strings, free text blobs) unless necessary.

### 5. Track once per user action

- Ensure click handlers do not fire duplicate events.
- In React effects, carefully scope dependencies so events do not re-fire on every render.
- For page-driven events, trigger on route change or first stable render only.

### 6. Define a funnel for key journeys

For critical journeys (contact, appointment, WhatsApp), track each step with clear progression:

- Step start
- Step progress
- Final conversion

This enables drop-off analysis and optimization.

### 7. Respect privacy and compliance

Never track PII or sensitive data:

- Phone numbers
- Email addresses
- Full addresses
- Document IDs
- Payment data

Only track aggregated, behavior-oriented context.

### 8. Validate instrumentation before release

For every new event:

- Confirm event appears in GA4 Real-time
- Confirm parameter names and values are correct
- Confirm event triggers only once per intended action
- Confirm mobile interactions are also tracked

### 9. Maintain a tracking inventory

When adding a new event, update this guide with:

- Event name
- Trigger location (page/component)
- Parameter contract
- Business owner or KPI tied to the event

This keeps analytics understandable and sustainable over time.

## Available Tracking Options in This Website

The current analytics module already supports the options below.

### Core Tracking API

- `trackEvent(eventName, params?)`
- `trackPageView(path, title)`
- `trackFormSubmit(formName, params?)`
- `trackButtonClick(buttonName, params?)`
- `trackLinkClick(linkName, params?)`
- `trackConversion(goalName, params?)`
- `trackProductView(productName, params?)`
- `trackEngagement(contentType, params?)`
- `setUserProperties(properties)`
- `trackException(description, fatal?)`
- `trackVideoEvent(action, videoId, params?)`

### Recommended Uses by Interaction Type

- Navigation: `trackPageView`
- CTA clicks (hero, section buttons, sticky CTAs): `trackButtonClick`
- Contact and lead forms: `trackFormSubmit` + `trackConversion`
- WhatsApp, maps, phone, and other outbound links: `trackLinkClick`
- Product and model interest: `trackProductView`
- Reading and engagement quality (time/scroll): `trackEngagement`
- Unexpected failures: `trackException`
- Video interactions: `trackVideoEvent`

### Built-in Constants You Should Reuse

- Conversion goals: `CONVERSION_GOALS.*`
- Button names: `BUTTON_NAMES.*`
- Product names: `PRODUCT_NAMES.*`

Reusing constants improves report quality and keeps event naming unified across pages.

### Suggested High-Value Events for This Site

Use these as priority events for meaningful and powerful tracking:

- `conversion_contact_form_submit`
  Lead intent submitted.
- `conversion_appointment_scheduled`
  Primary conversion outcome.
- `conversion_whatsapp_click`
  High-intent assisted conversion path.
- `button_click` on appointment CTAs
  CTA performance by page and section.
- `link_click` for Google Maps unit links
  Offline visit intent by city/unit.
- `view_item` for each product family/model
  Product interest and demand mapping.
- `engagement` with scroll/time on blog and clinic pages
  Content quality and qualification signal.

### Minimum Parameter Contract (Recommended)

For most events, include at least:

- `page`
- `section` (when applicable)
- `location` (when applicable)
- `source` or `campaign` (when available from UTM context)

This baseline allows actionable segmentation without overcomplicating implementation.

## Usage Examples

### Track Form Submission

**In `pages/contato.tsx`** (Contact Form):

```typescript
import { trackFormSubmit, trackConversion, CONVERSION_GOALS } from "@lib/analytics";

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();

  // Track the form submission event
  trackFormSubmit("contact", {
    page: "contato",
    fields: 4, // number of form fields
  });

  // Track conversion goal
  trackConversion(CONVERSION_GOALS.CONTACT_FORM_SUBMIT, {
    page: "contato",
  });

  // Send email, etc...
};
```

### Track Button Clicks

**In any component**:

```typescript
import { trackButtonClick, BUTTON_NAMES } from "@lib/analytics";

<button
  onClick={() => {
    trackButtonClick(BUTTON_NAMES.SCHEDULE_APPOINTMENT, {
      device: "HearLink 500",
      location: "piracicaba",
    });
    // handle button click
  }}
>
  Schedule Now
</button>;
```

### Track Link Clicks

**For external or important links**:

```typescript
import { trackLinkClick } from "@lib/analytics";

<a
  href="https://wa.me/5591399774156"
  onClick={() => {
    trackLinkClick("whatsapp", {
      page: "contato",
      location: "piracicaba",
    });
  }}
>
  💬 Open WhatsApp
</a>;
```

### Track Product Views

**In product pages** (`pages/aparelhos.tsx`):

```typescript
import { trackProductView, PRODUCT_NAMES } from "@lib/analytics";

// Track when product page loads
useEffect(() => {
  trackProductView(PRODUCT_NAMES.HEARLINK_500, {
    category: "hearing_aids",
    page: "aparelhos",
  });
}, []);
```

### Track Engagement Metrics

**For time-on-page or scroll depth**:

```typescript
import { trackEngagement } from "@lib/analytics";

useEffect(() => {
  const timer = setTimeout(() => {
    // User spent 30+ seconds on blog post
    trackEngagement("blog_post", {
      time_seconds: 30,
      scroll_depth: 50, // 50% of page scrolled
    });
  }, 30000);

  return () => clearTimeout(timer);
}, []);
```

### Track User Properties

**Set demographic or user information**:

```typescript
import { setUserProperties } from "@lib/analytics";

// After user registers or fills form
setUserProperties({
  user_type: "prospective_customer",
  interest_level: "high",
  location: "piracicaba",
  age_group: "45-54",
});
```

### Track Errors

**For exception handling**:

```typescript
import { trackException } from "@lib/analytics";

try {
  // some operation
} catch (error) {
  trackException("form_submission_error", true); // fatal: true
}
```

## Predefined Constants

### Conversion Goals

```typescript
CONVERSION_GOALS.CONTACT_FORM_SUBMIT;
CONVERSION_GOALS.APPOINTMENT_SCHEDULED;
CONVERSION_GOALS.WHATSAPP_CLICK;
CONVERSION_GOALS.FREE_EVALUATION_REQUESTED;
CONVERSION_GOALS.PHONE_CALL_INITIATED;
CONVERSION_GOALS.INSURANCE_INQUIRY;
```

### Button Names

```typescript
BUTTON_NAMES.SCHEDULE_APPOINTMENT;
BUTTON_NAMES.GET_FREE_EVALUATION;
BUTTON_NAMES.CONTACT_US;
BUTTON_NAMES.LEARN_MORE;
BUTTON_NAMES.VIEW_PRODUCTS;
BUTTON_NAMES.OPEN_WHATSAPP;
BUTTON_NAMES.CALL_NOW;
```

### Product Names

```typescript
PRODUCT_NAMES.HEARLINK_100H;
PRODUCT_NAMES.HEARLINK_500;
PRODUCT_NAMES.HEARLINK_700;
```

## Google Analytics Dashboard Setup

### Step 1: Create Conversion Goals

1. Go to **Google Analytics 4 → Admin → Conversions**
2. Create new conversion events:
   - `conversion_contact_form_submit`
   - `conversion_appointment_scheduled`
   - `conversion_whatsapp_click`
   - `conversion_free_evaluation_requested`
   - `conversion_phone_call_initiated`
   - `conversion_insurance_inquiry`

### Step 2: Create Custom Reports

**Visits by Device** (Products):

- Dimensions: Custom event - event_name
- Metrics: Users, Sessions, Engagement Rate
- Filter: event_name = "view_item"

**Form Performance**:

- Dimensions: Custom event - event_name
- Metrics: Event count, Conversion rate
- Filter: event_name = "\*form_submit"

**User Interest** (Demographics):

- Dimensions: Custom event - event_name
- Metrics: Users
- Filter: event*name = "conversion*\*"

### Step 3: Monitor Real-Time

1. In GA4, navigate to **Real-time**
2. Open your website in a new tab
3. Perform test actions:
   - Submit contact form
   - Click buttons
   - Change pages
4. Observe events appearing in real-time dashboard

## Testing Checklist

**Before production deployment**:

- [ ] GA4 script loads (check DevTools Network tab)
- [ ] Form submission triggers event in Real-time
- [ ] Button clicks tracked with correct parameters
- [ ] Page views recorded on navigation
- [ ] Link clicks show in event list
- [ ] Product views track device names
- [ ] User properties set correctly
- [ ] Conversion goals appear in Goals report
- [ ] No JavaScript console errors
- [ ] Mobile tracking works on touch devices

## Debugging

### Enable GA4 Debug Mode

**In browser console**:

```javascript
gtag("event", "page_view", {
  debug_mode: true,
});
```

### Check Event Payload

All events send this structure:

```json
{
  "event_name": "button_click",
  "event_parameters": {
    "button_name": "schedule_appointment",
    "device": "HearLink 500"
  }
}
```

### View Events in Real-Time

GA4 Admin → Real-time tab shows events as they occur

## Custom Event Data Structure

When using `trackEvent()` directly:

```typescript
trackEvent("custom_event_name", {
  param1: "value1",
  param2: 123,
  param3: true, // Only string, number, boolean accepted
});
```

## Important Notes

⚠️ **Do NOT track sensitive data**:

- Phone numbers
- Email addresses
- Credit card info
- Personal IDs
- Passwords

✅ **Safe to track**:

- Page names and URLs
- Button/link names
- Product names
- User interests/preferences
- Generic location (city, not address)
- Device type, browser

## Complex Event Examples

### Appointment Request with Details

```typescript
trackConversion(CONVERSION_GOALS.APPOINTMENT_SCHEDULED, {
  device_type: "bilateral",
  location: "piracicaba",
  preferred_date: "next_week",
  is_first_time: true,
});
```

### Insurance Inquiry Tracking

```typescript
trackEvent("insurance_inquiry", {
  insurance_name: "Unimed",
  coverage_type: "partial",
  product_interest: "HearLink 500",
  inquiry_method: "form", // vs phone, whatsapp, etc
});
```

### Multi-Step Form Tracking

```typescript
// Step 1: User starts form
trackEvent("form_step_1", { step: 1 });

// Step 2: User continues
trackEvent("form_step_2", { step: 2 });

// Final: User submits
trackConversion(CONVERSION_GOALS.CONTACT_FORM_SUBMIT, {
  total_steps: 2,
  time_minutes: 3.5,
});
```

## Performance Impact

- **GA4 library size**: ~30KB (compressed)
- **Script load time**: <500ms (async, "afterInteractive")
- **Event submission**: Batch sent, no page impact
- **Recommended**: Enable only in production (or staging for testing)

## Disabling Analytics

To temporarily disable GA4:

**Option 1**: Remove `.env.local` entry

```bash
# Delete or comment out:
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Option 2**: Run locally without tracking

```bash
NEXT_PUBLIC_GA_ID="" npm run dev
```

## Resources

- [GA4 Event Reference](https://support.google.com/analytics/answer/11091949)
- [Schema.org Documentation](https://schema.org/)
- [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script)
- [gray-matter Documentation](https://github.com/jonschlinkert/gray-matter)
