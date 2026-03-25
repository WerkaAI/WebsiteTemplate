"use client";

import { useTranslations } from "next-intl";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { FlipCard } from "@/components/ui/FlipCard";
import { motion } from "framer-motion";
import {
  HelpCircle,
  Stethoscope,
  CalendarCheck,
  FileText,
  CreditCard,
  Building2,
} from "lucide-react";

const faqItems = [
  { key: "q1", icon: CalendarCheck },
  { key: "q2", icon: Stethoscope },
  { key: "q3", icon: HelpCircle },
  { key: "q4", icon: FileText },
  { key: "q5", icon: CreditCard },
  { key: "q6", icon: Building2 },
] as const;

export function FAQ() {
  const t = useTranslations("faq");

  // Build FAQ items for JSON-LD (SEO preserved)
  const faqJsonLd = faqItems.map((item) => ({
    "@type": "Question" as const,
    name: t(`items.${item.key}.question`),
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: t(`items.${item.key}.answer`),
    },
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqJsonLd,
  };

  return (
    <section id="faq" className="py-14 md:py-24 bg-muted/30">
      <div className="container-spacing">
        {/* JSON-LD for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Header */}
        <FadeInUp className="text-center max-w-2xl mx-auto mb-12 md:mb-20">
          <span className="text-label text-primary-dark mb-4 block">
            {t("badge")}
          </span>
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-relaxed">
            {t("title")}
          </h2>
        </FadeInUp>

        {/* FAQ Flip Cards Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 justify-center">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.key}
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.45,
                delay: index * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="w-full min-w-[260px] max-w-[320px]">
                <FlipCard
                nudge={index === 0}
                className="h-full min-h-[190px]"
                front={
                  <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 md:p-6 shadow-sm transition-colors duration-300 hover:border-primary/30 h-full flex flex-col items-center justify-center text-center">
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 100%, rgba(117,241,235,0.12) 0%, transparent 70%)",
                      }}
                      aria-hidden="true"
                    />
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                        <item.icon className="w-5 h-5 text-primary-dark" />
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-foreground leading-snug">
                        {t(`items.${item.key}.question`)}
                      </h3>
                    </div>
                    <span className="flip-icon-hint" aria-hidden="true">↻</span>
                    <span className="flip-ear" aria-hidden="true" />
                  </div>
                }
                back={
                  <div className="flip-back-card h-full flex flex-col justify-center">
                    <p className="text-sm md:text-[0.9rem] text-foreground leading-relaxed">
                      {t(`items.${item.key}.answer`)}
                    </p>
                  </div>
                }
              />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
