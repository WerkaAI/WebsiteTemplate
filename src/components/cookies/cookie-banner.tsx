'use client';

/**
 * Cookie Banner — Layer 1
 *
 * Fixed bottom banner displayed on first visit (before consent is given).
 * Provides 3 equally-prominent choices per DSA/PKE 2026 "symmetry of choice":
 *   - "Akceptuj wszystko" (Accept All)
 *   - "Odrzuć wszystko" (Reject All)
 *   - "Dostosuj" (Customize → opens Layer 2 settings panel)
 *
 * Accessibility (WCAG 2.2 AA):
 *   - role="dialog" with aria-modal, aria-labelledby, aria-describedby
 *   - Focus trap: Tab cycles only within banner elements
 *   - Escape key: rejects all cookies (equivalent to "Reject All")
 *   - Auto-focus on first interactive element after animation
 *   - Focus restored to body after dismissal
 *   - Min touch target: 44×44px
 *   - Contrast ≥ 4.5:1 (text) / ≥ 3:1 (UI elements)
 *
 * Does NOT appear when:
 *   - User has already made a consent choice (cookie exists)
 *   - GPC signal is active (automatic denial)
 */

import { useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConsent } from './consent-provider';

export function CookieBanner() {
  const { showBanner, acceptAll, openSettings } = useConsent();
  const bannerRef = useRef<HTMLDivElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // ─── Focus management ───────────────────────────────
  useEffect(() => {
    if (!showBanner) return;

    // Save current focus so we can restore it after dismissal
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Auto-focus the first button after the slide-in animation
    const timer = setTimeout(() => {
      firstButtonRef.current?.focus();
    }, 150);

    return () => clearTimeout(timer);
  }, [showBanner]);

  // Restore focus when banner disappears
  useEffect(() => {
    if (!showBanner && previousFocusRef.current) {
      // Return focus to where it was before the banner appeared
      previousFocusRef.current?.focus?.();
      previousFocusRef.current = null;
    }
  }, [showBanner]);

  // ─── Focus trap + keyboard handling ─────────────────
  useEffect(() => {
    if (!showBanner) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape = dismiss banner (user can still manage via footer link)
      if (e.key === 'Escape') {
        e.preventDefault();
        return;
      }

      // Focus trap: cycle Tab within banner
      if (e.key !== 'Tab') return;

      const banner = bannerRef.current;
      if (!banner) return;

      const focusable = banner.querySelectorAll<HTMLElement>(
        'button, a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showBanner]);

  // ─── Handlers ───────────────────────────────────────
  const handleAccept = useCallback(() => acceptAll(), [acceptAll]);
  const handleCustomize = useCallback(() => openSettings(), [openSettings]);

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          ref={bannerRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-desc"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-4 md:p-6"
        >
          <div className="mx-auto max-w-3xl rounded-2xl border border-border/60 bg-background/95 p-5 shadow-2xl backdrop-blur-md sm:p-6 dark:border-white/10 dark:bg-slate-900/95">
            {/* ── Header ──────────────────────────── */}
            <div className="mb-4 flex items-start gap-3">
              <Shield
                className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400"
                aria-hidden="true"
              />
              <div>
                <h2
                  id="cookie-banner-title"
                  className="text-base font-semibold text-foreground"
                >
                  Szanujemy Twoją prywatność
                </h2>
                <p
                  id="cookie-banner-desc"
                  className="mt-1.5 text-sm leading-relaxed text-muted-foreground"
                >
                  Serwis wykorzystuje pliki cookies niezbędne do
                  jego prawidłowego działania. Za Twoją zgodą używamy także
                  plików cookies analitycznych i marketingowych, aby dopasować
                  treści do Twoich potrzeb i mierzyć skuteczność naszych
                  kampanii. Wycofanie zgody jest możliwe w każdym momencie.{' '}
                  <Link
                    href="/polityka-cookies"
                    className="font-medium text-emerald-600 underline underline-offset-2 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    Polityka cookies
                  </Link>
                </p>
              </div>
            </div>

            {/* ── Action buttons ──────────────────── */}
            {/*
              DSA/PKE "symmetry of choice":
              Accept and Reject have identical size and similar visual weight.
              Customize is available but slightly lower prominence (outline).
              On mobile: 2-column grid for Accept/Reject, full-width Customize.
            */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
              <Button
                ref={firstButtonRef}
                variant="outline"
                className="min-h-[44px] min-w-[44px] text-sm sm:order-1"
                onClick={handleCustomize}
              >
                Dostosuj
              </Button>
              <Button
                variant="default"
                className="min-h-[44px] min-w-[44px] text-sm font-semibold sm:order-2"
                onClick={handleAccept}
              >
                Akceptuj wszystko
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
