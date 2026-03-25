"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  /** First visible card gets a one-time nudge hint */
  nudge?: boolean;
}

export function FlipCard({
  front,
  back,
  className = "",
  nudge = false,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  /* One-time nudge when the first card enters the viewport */
  useEffect(() => {
    if (!nudge || prefersReducedMotion) return;
    const el = cardRef.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setShowNudge(true), 1800);
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [nudge, prefersReducedMotion]);

  /* Clear nudge class after animation ends */
  useEffect(() => {
    if (!showNudge) return;
    const timer = setTimeout(() => setShowNudge(false), 1200);
    return () => clearTimeout(timer);
  }, [showNudge]);

  const toggle = useCallback(() => {
    setIsFlipped((prev) => !prev);
    setShowNudge(false);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flip-card${isFlipped ? " is-flipped" : ""}${showNudge ? " flip-nudge" : ""} ${className}`}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front" aria-hidden={isFlipped}>
          {front}
        </div>
        <div className="flip-card-back" aria-hidden={!isFlipped}>
          {back}
        </div>
      </div>
    </div>
  );
}
