import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

export interface UseSpringNumberOptions {
  /** Length of the animation in milliseconds. */
  duration?: number;
  /** Custom formatter for the animated value. */
  formatter?: (value: number) => string;
  /** Number of decimal places to keep when no formatter is supplied. */
  precision?: number;
  /** Disable animation entirely (also implied when user prefers reduced motion). */
  disabled?: boolean;
}

const DEFAULT_DURATION = 640;

const DEFAULT_PRECISION = 0;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function useSpringNumber(target: number, options: UseSpringNumberOptions = {}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { duration = DEFAULT_DURATION, formatter, precision = DEFAULT_PRECISION, disabled } = options;
  const [value, setValue] = useState(target);
  const motionValueRef = useRef(target);
  const animationRef = useRef<number | null>(null);

  const stopAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
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

    if (motionValueRef.current === target) {
      return;
    }

    const startValue = motionValueRef.current;
    const changeInValue = target - startValue;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = duration <= 0 ? 1 : Math.min(1, elapsed / duration);
      const easedProgress = easeOutCubic(progress);
      const nextValue = startValue + changeInValue * easedProgress;

      motionValueRef.current = nextValue;
      setValue(nextValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(tick);
      } else {
        animationRef.current = null;
        motionValueRef.current = target;
        setValue(target);
      }
    };

    animationRef.current = requestAnimationFrame(tick);

    return () => {
      stopAnimation();
    };
  }, [disabled, duration, prefersReducedMotion, stopAnimation, target]);

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
