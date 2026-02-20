/**
 * Cookie Consent Types & Constants
 *
 * Central definitions for the cookie consent system.
 * Covers marketing site consent handling for this template.
 *
 * Legal basis: PKE 2026, RODO Art. 6/7, DSA, Digital Omnibus, Google Consent Mode v2
 */

// ─── Core types ─────────────────────────────────────────

/** Cookie consent category identifiers */
export type ConsentCategory = 'necessary' | 'analytics' | 'marketing';

/** Consent state for a single category */
export type ConsentStatus = 'granted' | 'denied';

/** User's consent preferences (excludes 'necessary' which is always granted) */
export interface ConsentPreferences {
  readonly analytics: ConsentStatus;
  readonly marketing: ConsentStatus;
}

/** Full consent state persisted in the cookie */
export interface ConsentState extends ConsentPreferences {
  /** ISO-8601 timestamp of when consent was given/updated */
  readonly timestamp: string;
  /** Schema version — allows future migrations */
  readonly version: string;
}

/** Google Consent Mode v2 parameter map */
export interface GcmConsentState {
  readonly ad_storage: ConsentStatus;
  readonly ad_user_data: ConsentStatus;
  readonly ad_personalization: ConsentStatus;
  readonly analytics_storage: ConsentStatus;
  readonly functionality_storage: ConsentStatus;
  readonly personalization_storage: ConsentStatus;
  readonly security_storage: ConsentStatus;
}

// ─── UI metadata ────────────────────────────────────────

/** Cookie category metadata displayed in the settings panel */
export interface CookieCategoryInfo {
  readonly id: ConsentCategory;
  readonly name: string;
  readonly description: string;
  /** Whether this category is always active and cannot be disabled */
  readonly required: boolean;
  /** List of third-party providers using this category */
  readonly providers: readonly string[];
}

// ─── Constants ──────────────────────────────────────────

export const CONSENT_COOKIE_NAME = 'az_consent' as const;

export const CONSENT_VERSION =
  process.env.NEXT_PUBLIC_COOKIE_CONSENT_VERSION || '1.0';

/** 365 days ≈ 12 months — maximum retention per PKE */
export const CONSENT_MAX_AGE_DAYS = 365;
export const CONSENT_MAX_AGE_SECONDS = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60;

// ─── Preset states ──────────────────────────────────────

/** Default: all optional categories denied (prior consent) */
export const DEFAULT_CONSENT: ConsentPreferences = {
  analytics: 'denied',
  marketing: 'denied',
} as const;

/** All optional categories granted */
export const ALL_GRANTED: ConsentPreferences = {
  analytics: 'granted',
  marketing: 'granted',
} as const;

/** All optional categories denied */
export const ALL_DENIED: ConsentPreferences = {
  analytics: 'denied',
  marketing: 'denied',
} as const;

// ─── Google Consent Mode v2 defaults ────────────────────

/** Default GCM v2 state — everything denied except functional/security */
export const DEFAULT_GCM_CONSENT: GcmConsentState = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  personalization_storage: 'denied',
  security_storage: 'granted',
} as const;

// ─── Category metadata for UI ───────────────────────────

export const COOKIE_CATEGORIES: readonly CookieCategoryInfo[] = [
  {
    id: 'necessary',
    name: 'Niezbędne',
    description:
      'Pliki cookies wymagane do prawidłowego działania strony. Zapewniają podstawowe funkcje, takie jak nawigacja, bezpieczeństwo i zapamiętanie Twoich preferencji zgody. Nie można ich wyłączyć.',
    required: true,
    providers: [
      'Serwis (sesja, preferencje)',
      'Cloudflare (bezpieczeństwo, CAPTCHA)',
    ],
  },
  {
    id: 'analytics',
    name: 'Analityczne',
    description:
      'Pomagają nam zrozumieć, jak użytkownicy korzystają ze strony. Zbierają pseudonimizowane dane o ruchu, źródłach odwiedzin i ścieżkach nawigacji, co pozwala nam ulepszać treści i funkcjonalność.',
    required: false,
    providers: ['Google Analytics 4'],
  },
  {
    id: 'marketing',
    name: 'Marketingowe',
    description:
      'Wykorzystywane do wyświetlania spersonalizowanych reklam i mierzenia skuteczności kampanii reklamowych. Mogą być udostępniane platformom reklamowym w celu remarketingu.',
    required: false,
    providers: ['Google Ads', 'Meta (Facebook) Pixel'],
  },
] as const;
