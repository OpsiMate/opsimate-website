# Google Analytics Integration Guide

This document explains how to set up and use Google Analytics tracking on the Opsimate website.

## Overview

The website now includes Google Analytics (GA4) integration that:
- Respects user cookie consent preferences
- Only loads when a valid tracking ID is provided
- Tracks page views automatically
- Supports custom event tracking
- Uses environment variables to keep the tracking ID secure

## Setup Instructions

### 1. Get Your Google Analytics Tracking ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or use an existing one
3. Copy your Measurement ID (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variable

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual tracking ID.

**Important:** Never commit `.env.local` to version control. It's already in `.gitignore`.

### 3. Verify Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser's developer console
3. Check the Network tab for requests to `googletagmanager.com`
4. Visit different pages and verify tracking in GA Real-Time reports

## How It Works

### Files Modified/Created

1. **`lib/gtag.ts`** - Core GA utility functions
   - `isGAEnabled()` - Checks if GA tracking ID exists
   - `pageview(url)` - Tracks page views
   - `event()` - Tracks custom events

2. **`pages/_document.tsx`** - Loads GA scripts
   - Conditionally includes GA scripts only when tracking ID is set
   - Initializes gtag with the tracking ID

3. **`pages/_app.tsx`** - Tracks page navigation
   - Listens to route changes
   - Respects cookie consent preferences
   - Only tracks when user has accepted cookies

4. **`.env.example`** - Documents required environment variables

### Cookie Consent Integration

The GA tracking respects the existing cookie consent system:
- Only tracks when `hasConsent === true`
- Checks `localStorage` for `opsimateCookieConsent`
- Listens for consent changes via `cookieConsentChange` event

## Custom Event Tracking

You can track custom events anywhere in your application:

```typescript
import * as gtag from '@/lib/gtag';

// Track a button click
gtag.event({
  action: 'click',
  category: 'Button',
  label: 'Download PDF',
  value: 1
});

// Track form submission
gtag.event({
  action: 'submit',
  category: 'Form',
  label: 'Contact Form'
});
```

## Production Deployment

### Vercel
Add the environment variable in your Vercel project settings:
1. Go to Project Settings → Environment Variables
2. Add `NEXT_PUBLIC_GA_ID` with your tracking ID
3. Redeploy

### Docker
Pass the environment variable when running the container:
```bash
docker run -e NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX your-image
```

Or add it to your `docker-compose.yml`:
```yaml
environment:
  - NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Other Platforms
Consult your hosting provider's documentation for setting environment variables.

## Testing

### Development
1. Set `NEXT_PUBLIC_GA_ID` in `.env.local`
2. Run `npm run dev`
3. Open browser DevTools → Network tab
4. Navigate between pages
5. Verify GA requests are being sent

### Production
1. Deploy with the environment variable set
2. Visit your live site
3. Check Google Analytics Real-Time reports
4. Verify page views are being tracked

## Troubleshooting

### GA Not Loading
- Verify `NEXT_PUBLIC_GA_ID` is set correctly
- Check browser console for errors
- Ensure ad blockers are disabled for testing
- Verify the tracking ID format is correct (G-XXXXXXXXXX)

### Page Views Not Tracking
- Check cookie consent is accepted
- Verify route changes are triggering events
- Check GA Real-Time reports (may take a few seconds)

### Events Not Tracking
- Ensure `gtag.isGAEnabled()` returns true
- Check event parameters are correct
- Verify user has accepted cookies

## Privacy Considerations

- GA only loads when user accepts cookies
- No tracking occurs without consent
- Tracking ID is not exposed in the codebase
- Complies with GDPR and privacy regulations

## Additional Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/10089681)
- [Next.js Analytics Guide](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [GA4 Event Tracking](https://developers.google.com/analytics/devguides/collection/ga4/events)
