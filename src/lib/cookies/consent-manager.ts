/**
 * Cookie Consent Manager
 *
 * Handles reading/writing consent preferences to a first-party cookie,
 * Global Privacy Control (GPC) signal detection, and consent resolution.
 *
 * Cookie scope: exact hostname only (no Domain= attribute) to prevent
 * leakage across subdomains.
 *
 * Legal basis: PKE art. 173, RODO art. 6/7, Digital Omnibus (GPC)
 */

import {
  type ConsentPreferences,
  type ConsentState,
  CONSENT_COOKIE_NAME,
  CONSENT_VERSION,
  CONSENT_MAX_AGE_SECONDS,
  DEFAULT_CONSENT,
} from './consent-types';

// ─── GPC Detection ──────────────────────────────────────

/**
 * Detect Global Privacy Control signal from browser.
 *
 * When GPC is enabled (navigator.globalPrivacyControl === true),
 * we MUST respect the user's privacy preference per Digital Omnibus 2026
 * and treat all optional cookies as denied without displaying a banner.
 */
export function detectGPC(): boolean {
  if (typeof navigator === 'undefined') return false;
  return !!(navigator as any).globalPrivacyControl;
}

// ─── Cookie Read / Write ────────────────────────────────

/**
 * Read consent state from the `az_consent` cookie.
 * Returns `null` if the cookie does not exist or is malformed.
 */
export function readConsentCookie(): ConsentState | null {
  if (typeof document === 'undefined') return null;

  try {
    const cookies = document.cookie.split(';');
    const match = cookies
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${CONSENT_COOKIE_NAME}=`));

    if (!match) return null;

    const raw = decodeURIComponent(match.split('=').slice(1).join('='));
    const parsed: unknown = JSON.parse(raw);

    // Validate expected shape
    if (
      parsed &&
      typeof parsed === 'object' &&
      'analytics' in parsed &&
      'marketing' in parsed &&
      'timestamp' in parsed &&
      'version' in parsed
    ) {
      const state = parsed as ConsentState;
      if (
        (state.analytics === 'granted' || state.analytics === 'denied') &&
        (state.marketing === 'granted' || state.marketing === 'denied') &&
        typeof state.timestamp === 'string' &&
        typeof state.version === 'string'
      ) {
        return state;
      }
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Write consent preferences to a first-party cookie.
 *
 * Important: We intentionally omit `Domain=` so the browser
 * scopes the cookie to the exact hostname,
 * preventing it from being readable by sibling subdomains.
 */
export function writeConsentCookie(preferences: ConsentPreferences): void {
  if (typeof document === 'undefined') return;

  const state: ConsentState = {
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };

  const value = encodeURIComponent(JSON.stringify(state));

  const parts: string[] = [
    `${CONSENT_COOKIE_NAME}=${value}`,
    'Path=/',
    `Max-Age=${CONSENT_MAX_AGE_SECONDS}`,
    'SameSite=Lax',
  ];

  // Secure flag only over HTTPS
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    parts.push('Secure');
  }

  document.cookie = parts.join('; ');
}

/**
 * Delete the consent cookie. Useful for testing or when user
 * explicitly requests data removal.
 */
export function deleteConsentCookie(): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${CONSENT_COOKIE_NAME}=; Path=/; Max-Age=0`;
}

// ─── Consent Resolution ─────────────────────────────────

export interface ResolvedConsent {
  /** Current preferences, or null if user hasn't decided yet */
  readonly preferences: ConsentPreferences | null;
  /** Whether the browser is sending a GPC signal */
  readonly isGpc: boolean;
  /** Whether the user has made an explicit consent choice (or GPC is active) */
  readonly hasConsented: boolean;
}

/**
 * Resolve the effective consent state.
 *
 * Priority:
 * 1. GPC signal → all optional denied, treated as explicit choice
 * 2. Stored cookie → return stored preferences
 * 3. No data → null preferences, user must make a choice
 */
export function resolveConsent(): ResolvedConsent {
  const isGpc = detectGPC();

  // GPC takes precedence — Digital Omnibus 2026 requirement
  if (isGpc) {
    return {
      preferences: DEFAULT_CONSENT, // analytics + marketing denied
      isGpc: true,
      hasConsented: true, // GPC counts as an explicit privacy choice
    };
  }

  const stored = readConsentCookie();

  if (stored) {
    return {
      preferences: {
        analytics: stored.analytics,
        marketing: stored.marketing,
      },
      isGpc: false,
      hasConsented: true,
    };
  }

  return {
    preferences: null,
    isGpc: false,
    hasConsented: false,
  };
}
