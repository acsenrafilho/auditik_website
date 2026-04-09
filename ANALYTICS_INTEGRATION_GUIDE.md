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

## Usage Examples

### Track Form Submission

**In `pages/contato.tsx`** (Contact Form):
```typescript
import { trackFormSubmit, trackConversion, CONVERSION_GOALS } from '@lib/analytics';

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  
  // Track the form submission event
  trackFormSubmit('contact', {
    page: 'contato',
    fields: 4,  // number of form fields
  });
  
  // Track conversion goal
  trackConversion(CONVERSION_GOALS.CONTACT_FORM_SUBMIT, {
    page: 'contato',
  });
  
  // Send email, etc...
};
```

### Track Button Clicks

**In any component**:
```typescript
import { trackButtonClick, BUTTON_NAMES } from '@lib/analytics';

<button 
  onClick={() => {
    trackButtonClick(BUTTON_NAMES.SCHEDULE_APPOINTMENT, {
      device: 'HearLink 500',
      location: 'piracicaba',
    });
    // handle button click
  }}
>
  Schedule Now
</button>
```

### Track Link Clicks

**For external or important links**:
```typescript
import { trackLinkClick } from '@lib/analytics';

<a
  href="https://wa.me/5591399774156"
  onClick={() => {
    trackLinkClick('whatsapp', {
      page: 'contato',
      location: 'piracicaba',
    });
  }}
>
  💬 Open WhatsApp
</a>
```

### Track Product Views

**In product pages** (`pages/aparelhos.tsx`):
```typescript
import { trackProductView, PRODUCT_NAMES } from '@lib/analytics';

// Track when product page loads
useEffect(() => {
  trackProductView(PRODUCT_NAMES.HEARLINK_500, {
    category: 'hearing_aids',
    page: 'aparelhos',
  });
}, []);
```

### Track Engagement Metrics

**For time-on-page or scroll depth**:
```typescript
import { trackEngagement } from '@lib/analytics';

useEffect(() => {
  const timer = setTimeout(() => {
    // User spent 30+ seconds on blog post
    trackEngagement('blog_post', {
      time_seconds: 30,
      scroll_depth: 50,  // 50% of page scrolled
    });
  }, 30000);
  
  return () => clearTimeout(timer);
}, []);
```

### Track User Properties

**Set demographic or user information**:
```typescript
import { setUserProperties } from '@lib/analytics';

// After user registers or fills form
setUserProperties({
  user_type: 'prospective_customer',
  interest_level: 'high',
  location: 'piracicaba',
  age_group: '45-54',
});
```

### Track Errors

**For exception handling**:
```typescript
import { trackException } from '@lib/analytics';

try {
  // some operation
} catch (error) {
  trackException('form_submission_error', true);  // fatal: true
}
```

## Predefined Constants

### Conversion Goals
```typescript
CONVERSION_GOALS.CONTACT_FORM_SUBMIT
CONVERSION_GOALS.APPOINTMENT_SCHEDULED
CONVERSION_GOALS.WHATSAPP_CLICK
CONVERSION_GOALS.FREE_EVALUATION_REQUESTED
CONVERSION_GOALS.PHONE_CALL_INITIATED
CONVERSION_GOALS.INSURANCE_INQUIRY
```

### Button Names
```typescript
BUTTON_NAMES.SCHEDULE_APPOINTMENT
BUTTON_NAMES.GET_FREE_EVALUATION
BUTTON_NAMES.CONTACT_US
BUTTON_NAMES.LEARN_MORE
BUTTON_NAMES.VIEW_PRODUCTS
BUTTON_NAMES.OPEN_WHATSAPP
BUTTON_NAMES.CALL_NOW
```

### Product Names
```typescript
PRODUCT_NAMES.HEARLINK_100H
PRODUCT_NAMES.HEARLINK_500
PRODUCT_NAMES.HEARLINK_700
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
- Filter: event_name = "*form_submit"

**User Interest** (Demographics):
- Dimensions: Custom event - event_name
- Metrics: Users
- Filter: event_name = "conversion_*"

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
gtag('event', 'page_view', {
  'debug_mode': true
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
trackEvent('custom_event_name', {
  param1: 'value1',
  param2: 123,
  param3: true,  // Only string, number, boolean accepted
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
  device_type: 'bilateral',
  location: 'piracicaba',
  preferred_date: 'next_week',
  is_first_time: true,
});
```

### Insurance Inquiry Tracking
```typescript
trackEvent('insurance_inquiry', {
  insurance_name: 'Unimed',
  coverage_type: 'partial',
  product_interest: 'HearLink 500',
  inquiry_method: 'form',  // vs phone, whatsapp, etc
});
```

### Multi-Step Form Tracking
```typescript
// Step 1: User starts form
trackEvent('form_step_1', { step: 1 });

// Step 2: User continues
trackEvent('form_step_2', { step: 2 });

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

