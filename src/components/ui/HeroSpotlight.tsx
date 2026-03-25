"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * HeroSpotlight — CSS-mask "diagnostic light" that follows the pointer.
 *
 * Implementation notes:
 *  - Updates CSS custom properties directly on the DOM element (no React
 *    re-renders) for 60 fps tracking.
 *  - On mobile / reduced-motion the spotlight is static (center) or hidden.
 *  - SSR-safe: the layer starts fully transparent so text is always readable.
 *  - The spotlight reveals a calmer, lighter texture underneath the
 *    "chaotic" noise layer — reinforcing the "pain → relief" narrative.
 */

interface HeroSpotlightProps {
  /** Extra classes forwarded to the wrapper */
  className?: string;
}

export function HeroSpotlight({ className = "" }: HeroSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const reduced = usePrefersReducedMotion();

  /* ── pointer tracking (desktop only) ─────────────────────── */
  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;

      // Cancel previous frame to avoid stacking
      cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--spot-x", `${x}%`);
        el.style.setProperty("--spot-y", `${y}%`);
        el.style.setProperty("--spot-opacity", "1");
      });
    },
    [reduced],
  );

  const handlePointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--spot-opacity", "0");
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    // Only track coarse pointers (no touch)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    el.addEventListener("pointermove", handlePointerMove);
    el.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [handlePointerMove, handlePointerLeave, reduced]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`hero-spotlight ${className}`}
      style={
        {
          "--spot-x": "50%",
          "--spot-y": "50%",
          "--spot-opacity": "0",
        } as React.CSSProperties
      }
    />
  );
}
