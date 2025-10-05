import { useEffect, useState } from "react";

/**
 * Shared hook that reads the user's reduced motion preference.
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = (event?: MediaQueryListEvent) => {
      setPrefersReducedMotion(event ? event.matches : mediaQuery.matches);
    };

    updatePreference();

    const supportsEventListener = typeof mediaQuery.addEventListener === "function";

    if (supportsEventListener) {
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  return prefersReducedMotion;
}
