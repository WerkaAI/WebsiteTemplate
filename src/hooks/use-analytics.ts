/**
 * Analytics hook — consent-aware.
 *
 * Checks cookie consent before sending analytics events.
 * In development: logs to console regardless of consent.
 * In production: only sends events when analytics consent is granted.
 *
 * Integrates with GA4 gtag() when available.
 */

import { useConsent } from '@/components/cookies/consent-provider';

type AnalyticsEvent = {
  name: string
  payload?: Record<string, unknown>
}

export function useAnalytics() {
  const { hasConsent } = useConsent();

  function track(event: AnalyticsEvent) {
    // Always log in development for debugging
    if (process.env.NODE_ENV !== 'production') {
      console.info('[analytics]', event)
    }

    // In production, only send if user has granted analytics consent
    if (process.env.NODE_ENV === 'production' && !hasConsent('analytics')) {
      return
    }

    // Send to GA4 via gtag if available
    if (typeof window !== 'undefined') {
      const w: { gtag?: (...args: unknown[]) => void } = window as never;
      if (typeof w.gtag === 'function') {
        w.gtag('event', event.name, event.payload || {});
      }
    }
  }

  return { track }
}
