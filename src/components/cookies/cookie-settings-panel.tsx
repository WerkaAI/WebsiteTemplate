'use client';

/**
 * Cookie Settings Panel — Layer 2
 *
 * Granular cookie preference management.
 * Opened from:
 *   - "Dostosuj" button in the Cookie Banner (Layer 1)
 *   - "Ustawienia Cookies" link in the footer
 *
 * Built on shadcn/ui Dialog (Radix) which provides:
 *   - Modal overlay with backdrop
 *   - Focus trap (automatic via Radix)
 *   - Escape to close
 *   - aria-modal, role="dialog"
 *   - Focus restoration on close
 *
 * Each category has a Switch toggle:
 *   - Necessary: always ON, disabled (cannot be toggled)
 *   - Analytics: OFF by default, user can toggle
 *   - Marketing: OFF by default, user can toggle
 */

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Shield, Lock, BarChart3, Megaphone } from 'lucide-react';
import { useConsent } from './consent-provider';
import { COOKIE_CATEGORIES } from '@/lib/cookies/consent-types';
import type { ConsentPreferences, ConsentCategory } from '@/lib/cookies/consent-types';

/** Icon mapping per category */
const CATEGORY_ICONS: Record<ConsentCategory, React.ElementType> = {
  necessary: Shield,
  analytics: BarChart3,
  marketing: Megaphone,
};

export function CookieSettingsPanel() {
  const {
    preferences,
    showSettings,
    closeSettings,
    savePreferences,
    acceptAll,
    rejectAll,
  } = useConsent();

  // Local toggle state (not committed until user clicks Save)
  const [localAnalytics, setLocalAnalytics] = useState(false);
  const [localMarketing, setLocalMarketing] = useState(false);

  // Sync toggles with current preferences when panel opens
  useEffect(() => {
    if (showSettings) {
      setLocalAnalytics(preferences?.analytics === 'granted');
      setLocalMarketing(preferences?.marketing === 'granted');
    }
  }, [showSettings, preferences]);

  const handleSave = () => {
    const prefs: ConsentPreferences = {
      analytics: localAnalytics ? 'granted' : 'denied',
      marketing: localMarketing ? 'granted' : 'denied',
    };
    savePreferences(prefs);
  };

  const handleAcceptAll = () => acceptAll();
  const handleRejectAll = () => rejectAll();

  // Map category ID to local state getter/setter
  const getToggleState = (id: ConsentCategory): boolean => {
    if (id === 'necessary') return true;
    if (id === 'analytics') return localAnalytics;
    return localMarketing;
  };

  const setToggleState = (id: ConsentCategory, value: boolean) => {
    if (id === 'analytics') setLocalAnalytics(value);
    if (id === 'marketing') setLocalMarketing(value);
  };

  return (
    <Dialog open={showSettings} onOpenChange={(open) => !open && closeSettings()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Ustawienia plików cookies
          </DialogTitle>
          <DialogDescription>
            Wybierz, które kategorie plików cookies chcesz zaakceptować. Pliki
            cookies niezbędne są zawsze aktywne, ponieważ zapewniają prawidłowe
            działanie strony.
          </DialogDescription>
        </DialogHeader>

        {/* ── Category toggles ─────────────────── */}
        <div className="space-y-3 py-4">
          {COOKIE_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category.id];
            const isChecked = getToggleState(category.id);
            const switchId = `cookie-switch-${category.id}`;

            return (
              <div
                key={category.id}
                className="rounded-xl border border-border/60 p-4 transition-colors dark:border-white/10"
              >
                {/* Category header with toggle */}
                <div className="flex items-center justify-between gap-4">
                  <Label
                    htmlFor={switchId}
                    className="flex cursor-pointer items-center gap-2 text-sm font-semibold"
                  >
                    <Icon
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    {category.name}
                    {category.required && (
                      <Lock
                        className="h-3 w-3 text-muted-foreground"
                        aria-hidden="true"
                      />
                    )}
                  </Label>
                  <Switch
                    id={switchId}
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      setToggleState(category.id, checked)
                    }
                    disabled={category.required}
                    aria-label={
                      category.required
                        ? `${category.name} — zawsze aktywne`
                        : `${category.name} — ${isChecked ? 'włączone' : 'wyłączone'}`
                    }
                  />
                </div>

                {/* Description */}
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {category.description}
                </p>

                {/* Providers list */}
                <p className="mt-1.5 text-xs text-muted-foreground/70">
                  <span className="font-medium">Dostawcy:</span>{' '}
                  {category.providers.join(', ')}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Footer buttons ───────────────────── */}
        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            className="min-h-[44px] sm:flex-1"
            onClick={handleRejectAll}
          >
            Odrzuć wszystkie
          </Button>
          <Button
            variant="secondary"
            className="min-h-[44px] font-semibold sm:flex-1"
            onClick={handleSave}
          >
            Zapisz wybory
          </Button>
          <Button
            variant="default"
            className="min-h-[44px] font-semibold sm:flex-1"
            onClick={handleAcceptAll}
          >
            Akceptuj wszystkie
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
