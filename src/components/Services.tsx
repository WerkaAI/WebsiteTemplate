"use client";

import { motion } from "framer-motion";
import {
  Scan,
  Stethoscope,
  SearchCheck,
  HeartPulse,
  Dumbbell,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { FlipCard } from "@/components/ui/FlipCard";

const HERO_VIDEO_SRC =
  process.env.NEXT_PUBLIC_HERO_VIDEO_SRC || "/Anetawebhero.webm";

/* ── 5 pillars — first 2 are "hero" cards, last 3 are secondary ── */
const pillars = [
  { key: "dental", icon: Scan, hero: true },
  { key: "orthopedic", icon: Stethoscope, hero: true },
  { key: "diagnostics", icon: SearchCheck, hero: false },
  { key: "manual", icon: HeartPulse, hero: false },
  { key: "training", icon: Dumbbell, hero: false },
] as const;

export function Services() {
  const t = useTranslations("services");

  return (
    <section
      id="uslugi"
      className="py-14 md:py-24 bg-background relative overflow-hidden"
    >
      <div className="container-spacing relative z-10">
        {/* Top Section: Text + Spine Video */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-serif">
              {t("title")}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-video lg:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 border border-primary/10"
          >
            <video
              className="absolute inset-0 w-full h-full object-cover object-center"
              src={HERO_VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
            />
            <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] pointer-events-none" />
          </motion.div>
        </div>

        {/* ── Hero row: 2 large cards (Stomatologiczna + Ortopedyczna) ── */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-8 mb-5 md:mb-8">
          {pillars
            .filter((p) => p.hero)
            .map((pillar, index) => (
              <motion.div
                key={pillar.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FlipCard
                  nudge={index === 0}
                  className="h-full"
                  front={
                    <div className="relative overflow-hidden bg-card border border-border rounded-2xl p-7 md:p-10 shadow-sm transition-colors hover:border-primary/30 group h-full">
                      {/* Subtle glow on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 100%, rgba(117,241,235,0.10) 0%, transparent 70%)",
                        }}
                        aria-hidden="true"
                      />
                      <div className="relative z-10">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                          <pillar.icon className="w-7 h-7 text-primary-dark" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                          {t(`items.${pillar.key}.title`)}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {t(`items.${pillar.key}.description`)}
                        </p>
                      </div>

                      <span className="flip-icon-hint" aria-hidden="true">↻</span>
                      <span className="flip-ear" aria-hidden="true" />
                    </div>
                  }
                  back={
                    <div className="flip-back-card">
                      <span className="text-xs font-semibold text-primary-dark uppercase tracking-wider mb-2 block">
                        {t(`items.${pillar.key}.backLabel`)}
                      </span>
                      <p className="text-sm md:text-base text-foreground leading-relaxed mb-3">
                        {t(`items.${pillar.key}.backText`)}
                      </p>
                      {t(`items.${pillar.key}.backMethods`) && (
                        <p className="text-xs text-muted-foreground italic">
                          {t(`items.${pillar.key}.backMethods`)}
                        </p>
                      )}
                    </div>
                  }
                />
              </motion.div>
            ))}
        </div>

        {/* ── Secondary row: 3 smaller cards ── */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
          {pillars
            .filter((p) => !p.hero)
            .map((pillar, index) => (
              <motion.div
                key={pillar.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FlipCard
                  className="h-full"
                  front={
                    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm transition-colors hover:border-primary/30 group h-full relative overflow-hidden">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <pillar.icon className="w-6 h-6 text-primary-dark" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">
                        {t(`items.${pillar.key}.title`)}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                        {t(`items.${pillar.key}.description`)}
                      </p>

                      <span className="flip-icon-hint" aria-hidden="true">↻</span>
                      <span className="flip-ear" aria-hidden="true" />
                    </div>
                  }
                  back={
                    <div className="flip-back-card">
                      <span className="text-xs font-semibold text-primary-dark uppercase tracking-wider mb-2 block">
                        {t(`items.${pillar.key}.backLabel`)}
                      </span>
                      <p className="text-sm md:text-base text-foreground leading-relaxed mb-3">
                        {t(`items.${pillar.key}.backText`)}
                      </p>
                      {t(`items.${pillar.key}.backMethods`) && (
                        <p className="text-xs text-muted-foreground italic">
                          {t(`items.${pillar.key}.backMethods`)}
                        </p>
                      )}
                    </div>
                  }
                />
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}