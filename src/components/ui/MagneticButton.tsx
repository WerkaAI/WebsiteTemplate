"use client";

import { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Opens link in a new tab with rel="noopener noreferrer" */
  external?: boolean;
  /** Magnetic pull strength: 0.2 = gentle, 0.4 = strong. Default: 0.28 */
  strength?: number;
  "aria-label"?: string;
}

/**
 * A CTA anchor that magnetically drifts toward the cursor on hover,
 * with a soft sage glow. Respects prefers-reduced-motion.
 */
export function MagneticButton({
  href,
  children,
  className,
  external = false,
  strength = 0.28,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const x = useSpring(0, { stiffness: 220, damping: 22, mass: 0.5 });
  const y = useSpring(0, { stiffness: 220, damping: 22, mass: 0.5 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const externalProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <motion.div
      ref={ref}
      style={prefersReducedMotion ? {} : { x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-flex"
    >
      <a
        href={href}
        aria-label={ariaLabel}
        className={cn(
          // Layout & shape
          "inline-flex items-center justify-center gap-2 rounded-full",
          // Colour: mint primary
          "bg-primary text-primary-foreground",
          // Typography
          "font-semibold text-base leading-none",
          // Padding
          "px-8 py-4",
          // Mint glow on hover
          "shadow-[0_0_0_0_rgba(117,241,235,0)] hover:shadow-[0_0_26px_6px_rgba(117,241,235,0.38)]",
          "transition-all duration-300 ease-out",
          // Subtle scale-up on hover
          "hover:scale-[1.03]",
          // Focus ring for keyboard nav
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          // Active press
          "active:scale-[0.97]",
          className,
        )}
        {...externalProps}
      >
        {children}
      </a>
    </motion.div>
  );
}
