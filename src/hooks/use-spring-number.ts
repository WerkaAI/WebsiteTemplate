import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animate } from "framer-motion";
import type { SpringOptions } from "framer-motion";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

export interface UseSpringNumberOptions {
  /** Additional spring configuration passed to framer-motion. */
  config?: SpringOptions;
  /** Custom formatter for the animated value. */
  formatter?: (value: number) => string;
  /** Number of decimal places to keep when no formatter is supplied. */
  precision?: number;
  /** Disable animation entirely (also implied when user prefers reduced motion). */
  disabled?: boolean;
}

const DEFAULT_CONFIG: SpringOptions = {
  stiffness: 180,
  damping: 24,
  mass: 0.8,
};

const DEFAULT_PRECISION = 0;

export function useSpringNumber(target: number, options: UseSpringNumberOptions = {}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { config, formatter, precision = DEFAULT_PRECISION, disabled } = options;
  const [value, setValue] = useState(target);
  const motionValueRef = useRef(target);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);

  const stopAnimation = useCallback(() => {
    animationRef.current?.stop();
    animationRef.current = null;
  }, []);

  useEffect(() => {
    motionValueRef.current = value;
  }, [value]);

  useEffect(() => {
    if (prefersReducedMotion || disabled) {
      stopAnimation();
      setValue(target);
      motionValueRef.current = target;
      return;
    }

    stopAnimation();

    const resolvedConfig: SpringOptions = {
      ...DEFAULT_CONFIG,
      ...config,
    };

    animationRef.current = animate(motionValueRef.current, target, {
      ...resolvedConfig,
      onUpdate: (next) => setValue(next),
    });

    return () => {
      stopAnimation();
    };
  }, [config, disabled, prefersReducedMotion, stopAnimation, target]);

  useEffect(() => () => stopAnimation(), [stopAnimation]);

  const formatted = useMemo(() => {
    if (formatter) {
      return formatter(value);
    }

    const factor = Math.pow(10, precision);
    const rounded = Math.round(value * factor) / factor;
    return rounded.toLocaleString("pl-PL", {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
  }, [formatter, precision, value]);

  return {
    value,
    formatted,
    isAnimating: !prefersReducedMotion && !disabled && animationRef.current !== null,
  };
}
