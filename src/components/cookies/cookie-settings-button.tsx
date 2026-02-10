'use client';

/**
 * Cookie Settings Button — opens the cookie settings panel from the policy page.
 * Separated into its own component because the page is a server component.
 */

import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useConsent } from '@/components/cookies/consent-provider';

export function CookieSettingsButton() {
  const { openSettings } = useConsent();

  return (
    <Button
      variant="outline"
      className="mt-4 gap-2"
      onClick={openSettings}
    >
      <Settings className="h-4 w-4" />
      Otwórz ustawienia cookies
    </Button>
  );
}
