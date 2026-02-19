'use client';

/**
 * Cookie Consent React Context Provider
 *
 * Provides consent state and actions to all client components.
 * Handles hydration safety by deferring banner visibility until after mount.
 *
 * Usage:
 *   <ConsentProvider>{children}</ConsentProvider>
 *
 *   const { hasConsent, acceptAll, openSettings } = useConsent();
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { ConsentCategory, ConsentPreferences } from '@/lib/cookies/consent-types';
import { ALL_DENIED, ALL_GRANTED } from '@/lib/cookies/consent-types';
import {
  resolveConsent,
  writeConsentCookie,
} from '@/lib/cookies/consent-manager';
import { updateGcmConsent } from '@/lib/cookies/gcm-v2';

// ─── Context shape ──────────────────────────────────────

interface ConsentContextValue {
  /** Current consent preferences (null = user hasn't decided yet) */
  preferences: ConsentPreferences | null;
  /** Whether the user has made any consent choice (or GPC is active) */
  hasConsented: boolean;
  /** Whether the Global Privacy Control signal is active */
  isGpc: boolean;
  /** Whether the cookie banner should be visible */
  showBanner: boolean;
  /** Whether the settings panel is open */
  showSettings: boolean;
  /** Accept all optional cookies */
  acceptAll: () => void;
  /** Reject all optional cookies */
  rejectAll: () => void;
  /** Save custom preferences from the settings panel */
  savePreferences: (prefs: ConsentPreferences) => void;
  /** Check if consent is granted for a specific category */
  hasConsent: (category: ConsentCategory) => boolean;
  /** Open the cookie settings panel (Layer 2) */
  openSettings: () => void;
  /** Close the cookie settings panel */
  closeSettings: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

// ─── Provider ───────────────────────────────────────────

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null);
  const [hasConsented, setHasConsented] = useState(false);
  const [isGpc, setIsGpc] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  // Track client-side mount to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  // On mount: read stored consent or detect GPC
  useEffect(() => {
    const resolved = resolveConsent();

    setPreferences(resolved.preferences);
    setHasConsented(resolved.hasConsented);
    setIsGpc(resolved.isGpc);

    // Show banner only if user hasn't made a choice and GPC isn't active
    if (!resolved.hasConsented) {
      setShowBanner(true);
    }

    // If we have stored preferences, sync GCM v2
    if (resolved.preferences) {
      updateGcmConsent(resolved.preferences);
    }

    setMounted(true);
  }, []);

  // Core action: apply consent, persist, sync GCM, close UI
  const applyConsent = useCallback((prefs: ConsentPreferences) => {
    setPreferences(prefs);
    setHasConsented(true);
    setShowBanner(false);
    setShowSettings(false);

    // Persist to cookie
    writeConsentCookie(prefs);

    // Update Google Consent Mode v2
    updateGcmConsent(prefs);
  }, []);

  const acceptAll = useCallback(() => {
    applyConsent(ALL_GRANTED);
  }, [applyConsent]);

  const rejectAll = useCallback(() => {
    applyConsent(ALL_DENIED);
  }, [applyConsent]);

  const savePreferences = useCallback(
    (prefs: ConsentPreferences) => {
      applyConsent(prefs);
    },
    [applyConsent],
  );

  const hasConsent = useCallback(
    (category: ConsentCategory): boolean => {
      if (category === 'necessary') return true;
      if (!preferences) return false;
      return preferences[category] === 'granted';
    },
    [preferences],
  );

  const openSettings = useCallback(() => {
    setShowBanner(false);
    setShowSettings(true);
  }, []);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
    // Restore banner if user still hasn't made a choice
    if (!hasConsented) {
      setShowBanner(true);
    }
  }, [hasConsented]);

  const value = useMemo<ConsentContextValue>(
    () => ({
      preferences,
      hasConsented,
      isGpc,
      // Only show banner after client mount to prevent SSR flash
      showBanner: mounted && showBanner,
      showSettings,
      acceptAll,
      rejectAll,
      savePreferences,
      hasConsent,
      openSettings,
      closeSettings,
    }),
    [
      preferences,
      hasConsented,
      isGpc,
      showBanner,
      showSettings,
      mounted,
      acceptAll,
      rejectAll,
      savePreferences,
      hasConsent,
      openSettings,
      closeSettings,
    ],
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
    </ConsentContext.Provider>
  );
}

// ─── Hook ───────────────────────────────────────────────

/**
 * Access cookie consent state and actions.
 * Must be used within a <ConsentProvider>.
 */
export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error(
      'useConsent must be used within a <ConsentProvider>. ' +
      'Ensure ConsentProvider wraps your component tree in providers.tsx.',
    );
  }
  return context;
}
