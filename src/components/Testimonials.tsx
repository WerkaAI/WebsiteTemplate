"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, ExternalLink, Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { BOOKING_URL } from "@/lib/config";

const reviewKeys = [
  "review1",
  "review2",
  "review3",
  "review4",
  "review5",
] as const;

/** Generate initials from a name like "Anna K." → "AK" */
function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .join("")
    .replace(".", "")
    .toUpperCase();
}

/** Deterministic soft color for avatar background based on name */
const AVATAR_COLORS = [
  "bg-primary/20 text-primary-dark",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-violet-100 text-violet-700",
  "bg-sky-100 text-sky-700",
];

export function Testimonials() {
  const t = useTranslations("testimonials");
  const prefersReducedMotion = usePrefersReducedMotion();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % reviewKeys.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + reviewKeys.length) % reviewKeys.length);
  }, []);

  // Auto-advance every 6s
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => (prefersReducedMotion ? {} : { x: dir > 0 ? 120 : -120, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => (prefersReducedMotion ? {} : { x: dir > 0 ? -120 : 120, opacity: 0 }),
  };

  const currentKey = reviewKeys[current];
  const currentName = t(`reviews.${currentKey}.name`);
  const currentInitials = getInitials(currentName);

  return (
    <section id="opinie" className="py-14 md:py-24 bg-background">
      <div className="container-spacing">
        {/* Header */}
        <FadeInUp className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <span className="text-label text-primary-dark mb-4 block">
            {t("badge")}
          </span>
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            {t("title")}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </FadeInUp>

        {/* Carousel */}
        <div className="max-w-2xl mx-auto">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-md"
              >
                {/* Top row: Avatar + Author info + Stars */}
                <div className="flex items-start gap-4 mb-5">
                  {/* Avatar with initials */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${AVATAR_COLORS[current % AVATAR_COLORS.length]}`}
                  >
                    {currentInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <cite className="not-italic font-bold text-foreground block">
                      {currentName}
                    </cite>
                    {/* Condition badge */}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary-dark mt-1">
                      {t(`reviews.${currentKey}.condition`)}
                    </span>
                  </div>
                  {/* Stars */}
                  <div className="flex items-center gap-0.5 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="absolute -top-1 -left-1 w-5 h-5 text-primary/20 rotate-180" aria-hidden="true" />
                  <blockquote className="text-foreground text-lg leading-relaxed pl-6">
                    {t(`reviews.${currentKey}.text`)}
                  </blockquote>
                </div>

                {/* Source badge */}
                <div className="flex justify-end mt-5">
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 whitespace-nowrap">
                    80+ {t("sourceLabel")}{" "}
                    <span className="font-bold text-[#00B39B]">
                      ZnanyLekarz
                    </span>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Poprzednia opinia"
              className="w-12 h-12 md:w-10 md:h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2" role="tablist">
              {reviewKeys.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Opinia ${i + 1}`}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-primary-dark scale-125"
                      : "bg-border hover:bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Następna opinia"
              className="w-12 h-12 md:w-10 md:h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Link to all reviews */}
          <FadeInUp delay={0.1} className="text-center mt-8">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-dark hover:text-foreground transition-colors"
            >
              {t("allReviews")}
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
