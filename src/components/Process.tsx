"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useTheme } from "next-themes";
import { BOOKING_URL } from "@/lib/config";

/* ── Step definitions ── */
const STEPS = [
  { key: "interview" as const, index: 0 },
  { key: "therapy" as const, index: 1 },
  { key: "plan" as const, index: 2 },
];

/* ── Colour palettes for the 3 phases ── */
const LIGHT_BG = [
  "rgb(241, 245, 249)",   // step 1 — slate-100 (cool, tense)
  "rgb(236, 253, 245)",   // step 2 — emerald-50 (warming)
  "rgb(240, 253, 252)",   // step 3 — mint-glow (relief)
];
const DARK_BG = [
  "rgb(15, 23, 42)",      // step 1 — slate-900 (dark, tense)
  "rgb(6, 30, 24)",       // step 2 — dark emerald (warming)
  "rgb(8, 30, 29)",       // step 3 — dark mint (relief)
];

const LIGHT_BLOB = [
  "rgba(148, 163, 184, 0.35)", // step 1 — slate-400
  "rgba(52, 211, 153, 0.30)",  // step 2 — emerald-400
  "rgba(117, 241, 235, 0.35)", // step 3 — primary mint
];
const DARK_BLOB = [
  "rgba(71, 85, 105, 0.40)",   // step 1 — slate-600
  "rgba(16, 185, 129, 0.25)",  // step 2 — emerald-500
  "rgba(117, 241, 235, 0.30)", // step 3 — primary mint
];

/* border-radius keyframes: angular → wavy → circle */
const BLOB_RADIUS = [
  "30% 70% 70% 30% / 30% 30% 70% 70%",    // step 1 — angular
  "50% 60% 40% 50% / 45% 55% 50% 55%",     // step 2 — wavy
  "50% 50% 50% 50% / 50% 50% 50% 50%",     // step 3 — perfect circle
];

/* ── Fallback for reduced-motion ── */
function ProcessFallback({ t }: { t: ReturnType<typeof useTranslations<"process">> }) {
  return (
    <section id="jak-wyglada-wizyta" className="py-14 md:py-24 bg-muted/30">
      <div className="container-spacing">
        <FadeInUp className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <span className="text-label text-primary-dark mb-4 block">{t("badge")}</span>
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            {t("title")}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </FadeInUp>

        <div className="max-w-3xl mx-auto space-y-10">
          {STEPS.map((step) => (
            <div key={step.key} className="flex gap-5 items-start">
              <span className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                {t(`steps.${step.key}.number`)}
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {t(`steps.${step.key}.title`)}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {t(`steps.${step.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <FadeInUp delay={0.2} className="text-center mt-12">
          <MagneticButton
            href={BOOKING_URL}
            external
            aria-label={`${t("cta")} — otwiera profil ZnanyLekarz w nowej karcie`}
          >
            <Calendar className="h-5 w-5" aria-hidden="true" />
            {t("cta")}
          </MagneticButton>
          <p className="text-sm text-muted-foreground mt-4">{t("note")}</p>
        </FadeInUp>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   Relief Tunnel — Sticky Scroll Storytelling
   ══════════════════════════════════════════════════════════════ */
export function Process() {
  const t = useTranslations("process");
  const prefersReducedMotion = usePrefersReducedMotion();
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const isDark = resolvedTheme === "dark";
  const bgColors = isDark ? DARK_BG : LIGHT_BG;
  const blobColorPalette = isDark ? DARK_BLOB : LIGHT_BLOB;

  /* Track scroll progress within the tall container (0 → 1) */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Smooth out the raw scroll value */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    mass: 0.8,
  });

  /* ── Derived motion values ── */

  // Background colour interpolation
  const bgColor = useTransform(smoothProgress, [0, 0.5, 1], bgColors);

  // Blob shape
  const blobColor = useTransform(smoothProgress, [0, 0.5, 1], blobColorPalette);
  const blobRadius = useTransform(smoothProgress, [0, 0.5, 1], BLOB_RADIUS);
  const blobScale = useTransform(smoothProgress, [0, 0.5, 1], [0.7, 0.85, 1]);
  const blobRotate = useTransform(smoothProgress, [0, 1], [0, 180]);

  // Step text opacity: each step fades in and out
  const step1Opacity = useTransform(smoothProgress, [0, 0.08, 0.28, 0.38], [0, 1, 1, 0]);
  const step2Opacity = useTransform(smoothProgress, [0.32, 0.42, 0.62, 0.72], [0, 1, 1, 0]);
  const step3Opacity = useTransform(smoothProgress, [0.66, 0.76, 0.92, 1], [0, 1, 1, 1]);

  // Step text vertical offset
  const step1Y = useTransform(smoothProgress, [0, 0.08, 0.28, 0.38], [30, 0, 0, -20]);
  const step2Y = useTransform(smoothProgress, [0.32, 0.42, 0.62, 0.72], [30, 0, 0, -20]);
  const step3Y = useTransform(smoothProgress, [0.66, 0.76, 0.92, 1], [30, 0, 0, 0]);

  // Progress bar (visual scroll indicator inside the section)
  const progressBarWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // CTA fade-in at the very end
  const ctaOpacity = useTransform(smoothProgress, [0.88, 0.96], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.88, 0.96], [20, 0]);

  // Step number indicators
  const activeStep = useTransform(smoothProgress, (v) =>
    v < 0.33 ? 0 : v < 0.66 ? 1 : 2
  );

  // Step number indicators — pre-computed colors (hooks at top level)
  const step1BgColor = useTransform(activeStep, (v) => v >= 0 ? "var(--primary)" : "var(--muted)");
  const step1TextColor = useTransform(activeStep, (v) => v >= 0 ? "var(--primary-foreground)" : "var(--muted-foreground)");
  const step2BgColor = useTransform(activeStep, (v) => v >= 1 ? "var(--primary)" : "var(--muted)");
  const step2TextColor = useTransform(activeStep, (v) => v >= 1 ? "var(--primary-foreground)" : "var(--muted-foreground)");
  const step3BgColor = useTransform(activeStep, (v) => v >= 2 ? "var(--primary)" : "var(--muted)");
  const step3TextColor = useTransform(activeStep, (v) => v >= 2 ? "var(--primary-foreground)" : "var(--muted-foreground)");
  const line1BgColor = useTransform(activeStep, (v) => v > 0 ? "var(--primary)" : "var(--border)");
  const line2BgColor = useTransform(activeStep, (v) => v > 1 ? "var(--primary)" : "var(--border)");

  const indicatorStyles = [
    { bg: step1BgColor, text: step1TextColor },
    { bg: step2BgColor, text: step2TextColor },
    { bg: step3BgColor, text: step3TextColor },
  ];
  const lineStyles = [line1BgColor, line2BgColor];

  const stepOpacities = [step1Opacity, step2Opacity, step3Opacity];
  const stepYs = [step1Y, step2Y, step3Y];

  if (prefersReducedMotion) {
    return <ProcessFallback t={t} />;
  }

  return (
    <section id="jak-wyglada-wizyta">
      {/* Tall scroll container — creates the "tunnel" effect */}
      <div ref={containerRef} className="relative" style={{ height: "300vh" }}>

        {/* Sticky viewport — pinned to screen during scroll */}
        <motion.div
          className="sticky top-16 w-full overflow-hidden flex flex-col items-center justify-center"
          style={{ backgroundColor: bgColor, height: "calc(100vh - 4rem)" }}
        >
          {/* ── Blob background ── */}
          <motion.div
            className="absolute w-[min(80vw,500px)] h-[min(80vw,500px)] pointer-events-none"
            style={{
              backgroundColor: blobColor,
              borderRadius: blobRadius,
              scale: blobScale,
              rotate: blobRotate,
              filter: "blur(60px)",
              willChange: "transform, background-color, border-radius",
            }}
            aria-hidden="true"
          />

          {/* ── Content layer ── */}
          <div className="relative z-10 max-w-2xl w-full px-6 text-center">
            {/* Section header — always visible */}
            <div className="mb-8">
              <span className="text-label text-primary-dark mb-3 block text-sm">
                {t("badge")}
              </span>
              <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {t("title")}
              </h2>
            </div>

            {/* Step number indicators */}
            <div className="flex items-center justify-center gap-3 mb-10">
              {STEPS.map((step, i) => (
                <div key={step.key} className="flex items-center gap-2">
                  <motion.span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: indicatorStyles[i].bg,
                      color: indicatorStyles[i].text,
                    }}
                  >
                    {t(`steps.${step.key}.number`)}
                  </motion.span>
                  {i < 2 && (
                    <motion.div
                      className="w-8 md:w-12 h-0.5 rounded-full"
                      style={{ backgroundColor: lineStyles[i] }}
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step content — overlapping, opacity-driven */}
            <div className="relative h-[180px] md:h-[160px] flex items-center justify-center">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.key}
                  className="absolute inset-0 flex flex-col items-center justify-center px-4"
                  style={{ opacity: stepOpacities[i], y: stepYs[i] }}
                >
                  <h3 className="font-serif text-xl md:text-3xl font-bold text-foreground mb-3">
                    {t(`steps.${step.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-md">
                    {t(`steps.${step.key}.description`)}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA — fades in at the end */}
            <motion.div
              className="mt-8"
              style={{ opacity: ctaOpacity, y: ctaY }}
            >
              <MagneticButton
                href={BOOKING_URL}
                external
                aria-label={`${t("cta")} — otwiera profil ZnanyLekarz w nowej karcie`}
              >
                <Calendar className="h-5 w-5" aria-hidden="true" />
                {t("cta")}
              </MagneticButton>
              <p className="text-sm text-muted-foreground mt-4">{t("note")}</p>
              <p className="text-xs text-primary-dark font-medium mt-2">
                {t("urgency")}
              </p>
            </motion.div>
          </div>

          {/* ── Progress bar at bottom ── */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-border/30">
            <motion.div
              className="h-full bg-primary/60 origin-left"
              style={{ width: progressBarWidth }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

