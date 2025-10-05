import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

interface UseCarouselOptions {
  size: number;
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
  pauseOnHover?: boolean;
  initialIndex?: number;
}

const DEFAULT_INTERVAL = 6000;

export function useCarousel({
  size,
  autoPlay = true,
  interval = DEFAULT_INTERVAL,
  loop = true,
  pauseOnHover = true,
  initialIndex = 0,
}: UseCarouselOptions) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  const clear = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (!autoPlay || prefersReducedMotion || size <= 1 || isPausedRef.current) {
      return;
    }

    clear();

    timerRef.current = window.setInterval(() => {
      setIndex((current) => {
        const next = current + 1;
        if (next >= size) {
          return loop ? 0 : current;
        }
        return next;
      });
    }, interval);
  }, [autoPlay, clear, interval, loop, prefersReducedMotion, size]);

  const pause = useCallback(() => {
    isPausedRef.current = true;
    clear();
  }, [clear]);

  const resume = useCallback(() => {
    isPausedRef.current = false;
    start();
  }, [start]);

  useEffect(() => {
    start();
    return () => clear();
  }, [start, clear]);

  useEffect(() => {
    if (!pauseOnHover) return;

    const node = containerRef.current;
    if (!node) return;

    const handlePointerEnter = () => pause();
    const handlePointerLeave = () => resume();

    node.addEventListener("mouseenter", handlePointerEnter);
    node.addEventListener("mouseleave", handlePointerLeave);
    node.addEventListener("focusin", handlePointerEnter);
    node.addEventListener("focusout", handlePointerLeave);

    return () => {
      node.removeEventListener("mouseenter", handlePointerEnter);
      node.removeEventListener("mouseleave", handlePointerLeave);
      node.removeEventListener("focusin", handlePointerEnter);
      node.removeEventListener("focusout", handlePointerLeave);
    };
  }, [pause, pauseOnHover, resume]);

  const goTo = useCallback(
    (nextIndex: number) => {
      setIndex((current) => {
        if (nextIndex === current) return current;
        if (nextIndex < 0) {
          return loop ? size - 1 : 0;
        }
        if (nextIndex >= size) {
          return loop ? 0 : size - 1;
        }
        return nextIndex;
      });
    },
    [loop, size]
  );

  const next = useCallback(() => {
    goTo(index + 1);
  }, [goTo, index]);

  const prev = useCallback(() => {
    goTo(index - 1);
  }, [goTo, index]);

  return {
    index,
    containerRef,
    next,
    prev,
    goTo,
    pause,
    resume,
    isPaused: isPausedRef.current,
  };
}
