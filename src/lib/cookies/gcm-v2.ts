/**
 * Google Consent Mode v2 Integration
 *
 * Implements GCM v2 in "Advanced" mode:
 * - Default state: all consent parameters set to 'denied'
 * - Google tags (GA4, Ads) load immediately but respect consent state
 * - When denied: tags send "cookieless pings" for conversion modeling
 * - When granted: tags operate normally with full cookie access
 *
 * The default consent script MUST execute BEFORE GTM/gtag.js loads.
 * It is rendered in layout.tsx via next/script with strategy="beforeInteractive".
 *
 * Reference: https://developers.google.com/tag-platform/security/guides/consent
 */

import type { ConsentPreferences, GcmConsentState } from './consent-types';
import { DEFAULT_GCM_CONSENT } from './consent-types';

/**
 * Map our consent preferences to Google Consent Mode v2 parameters.
 *
 * Mapping:
 * - analytics → analytics_storage, personalization_storage
 * - marketing → ad_storage, ad_user_data, ad_personalization
 * - functionality_storage, security_storage → always granted
 */
export function mapToGcmConsent(preferences: ConsentPreferences): GcmConsentState {
  return {
    ad_storage: preferences.marketing,
    ad_user_data: preferences.marketing,
    ad_personalization: preferences.marketing,
    analytics_storage: preferences.analytics,
    functionality_storage: 'granted',
    personalization_storage: preferences.analytics,
    security_storage: 'granted',
  };
}

/**
 * Generate the inline script content for GCM v2 default consent.
 *
 * This script:
 * 1. Initializes the dataLayer
 * 2. Defines the gtag() helper function
 * 3. Sets all consent parameters to 'denied' by default
 * 4. Enables ads_data_redaction (extra privacy when denied)
 * 5. Enables url_passthrough (preserves ad click info in URLs)
 * 6. Sets wait_for_update to 500ms (waits for CMP to update consent)
 *
 * CRITICAL: This must execute before any Google tags load.
 */
export function generateGcmDefaultScript(): string {
  const d = DEFAULT_GCM_CONSENT;

  return `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
'ad_storage':'${d.ad_storage}',
'ad_user_data':'${d.ad_user_data}',
'ad_personalization':'${d.ad_personalization}',
'analytics_storage':'${d.analytics_storage}',
'functionality_storage':'${d.functionality_storage}',
'personalization_storage':'${d.personalization_storage}',
'security_storage':'${d.security_storage}',
'wait_for_update':500
});
gtag('set','ads_data_redaction',true);
gtag('set','url_passthrough',true);
`.trim();
}

/**
 * Update Google Consent Mode state after user makes a choice.
 *
 * This pushes a consent update to gtag/dataLayer, causing Google tags
 * to immediately adjust their behavior (start/stop using cookies).
 */
export function updateGcmConsent(preferences: ConsentPreferences): void {
  if (typeof window === 'undefined') return;

  const w = window as any;

  // Ensure dataLayer and gtag exist
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag !== 'function') {
    w.gtag = function gtag() {
      w.dataLayer.push(arguments);
    };
  }

  w.gtag('consent', 'update', mapToGcmConsent(preferences));
}
