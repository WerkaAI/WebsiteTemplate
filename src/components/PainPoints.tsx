"use client";

import { motion } from "framer-motion";
import {
  Bone,
  Scan,
  HeartPulse,
  Dumbbell,
  Brain,
  Monitor,
  Ear,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { FlipCard } from "@/components/ui/FlipCard";

const painItems = [
  { key: "spine", icon: Bone, span: "col-span-2 md:col-span-3" },
  { key: "tmj", icon: Scan, span: "col-span-2 md:col-span-3" },
  { key: "postop", icon: HeartPulse, span: "col-span-1 md:col-span-2" },
  { key: "sport", icon: Dumbbell, span: "col-span-1 md:col-span-2" },
  { key: "headache", icon: Brain, span: "col-span-1 md:col-span-2" },
  { key: "posture", icon: Monitor, span: "col-span-1 md:col-span-3" },
  { key: "tinnitus", icon: Ear, span: "col-span-2 md:col-span-3" },
] as const;

export function PainPoints() {
  const t = useTranslations("painPoints");

  return (
    <section id="dolegliwosci" className="py-14 md:py-24 bg-background">
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

        {/* Bento Grid: 2-col on mobile, 6-col on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-5">
          {painItems.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={item.span}
            >
              <FlipCard
                nudge={index === 0}
                className="h-full"
                front={
                  <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 md:p-8 shadow-sm transition-colors duration-300 hover:border-primary/30 h-full">
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 100%, rgba(117,241,235,0.12) 0%, transparent 70%)",
                      }}
                      aria-hidden="true"
                    />

                    <div className="relative z-10">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 md:mb-5 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                        <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary-dark" />
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-foreground mb-1.5 md:mb-2">
                        {t(`items.${item.key}.title`)}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-[0.95rem]">
                        {t(`items.${item.key}.description`)}
                      </p>
                    </div>

                    {/* Flip hint icon */}
                    <span className="flip-icon-hint" aria-hidden="true">↻</span>
                    <span className="flip-ear" aria-hidden="true" />
                  </div>
                }
                back={
                  <div className="flip-back-card">
                    <span className="text-xs font-semibold text-primary-dark uppercase tracking-wider mb-3 block">
                      {t("tipLabel")}
                    </span>
                    <p className="text-sm md:text-base text-foreground leading-relaxed">
                      {t(`items.${item.key}.tip`)}
                    </p>
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
