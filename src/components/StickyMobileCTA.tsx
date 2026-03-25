"use client";

import { Calendar, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { BOOKING_URL } from "@/lib/config";

/**
 * A slim sticky bar that slides up from the bottom on mobile (md:hidden)
 * after the user scrolls past the hero (~400px). Two actions: Call + Book.
 * Respects prefers-reduced-motion and iOS safe-area-inset-bottom.
 */
export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const THRESHOLD = 420;
    const onScroll = () => setVisible(window.scrollY > THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-mobile-cta"
          initial={prefersReducedMotion ? false : { y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          style={{
            paddingLeft: "0.75rem",
            paddingRight: "0.75rem",
            paddingTop: "0.5rem",
            paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
            background:
              "linear-gradient(to top, var(--background) 80%, transparent)",
          }}
        >
          <div className="flex gap-2.5">
            {/* Phone call button */}
            <a
              href="tel:+48532445410"
              aria-label="Zadzwoń teraz — 532 445 410"
              className="flex items-center justify-center gap-2 flex-1 py-4 rounded-2xl bg-card border border-border text-foreground font-semibold text-base shadow-lg active:scale-[0.98] transition-transform"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Zadzwoń
            </a>

            {/* Booking button — mint primary */}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zarezerwuj wizytę na ZnanyLekarz — otwiera w nowej karcie"
              className="flex items-center justify-center gap-2 flex-[2] py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-lg active:scale-[0.98] transition-transform"
            >
              <Calendar className="h-5 w-5" aria-hidden="true" />
              Zarezerwuj wizytę
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
