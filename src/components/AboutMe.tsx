"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Award, GraduationCap, BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export function AboutMe() {
  const t = useTranslations("about");

  return (
    <section id="o-mnie" className="py-14 md:py-24 bg-muted/50">
      <div className="container-spacing">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* ── Left column: Bio text ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6">
              {t("name")}
            </h2>

            {/* Paragraphs — Aneta's real bio, split for readability */}
            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
              <p>{t("paragraph3")}</p>
              <p>{t("paragraph4")}</p>
              <p>{t("paragraph5")}</p>
            </div>

            {/* Education line */}
            <p className="text-sm text-muted-foreground italic mb-8">
              {t("education")}
            </p>

            {/* Key strengths */}
            <div className="space-y-4 mb-8">
              {[t("bullet1"), t("bullet2"), t("bullet3")].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium text-sm md:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium text-muted-foreground">
              <Award className="w-4 h-4 text-primary" />
              {t("pwz")}{" "}
              <span className="text-foreground font-bold">58984</span>
            </div>
          </motion.div>

          {/* ── Right column: Certifications card + method badges ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-6"
          >
            {/* Certifications card */}
            <div className="bg-card border border-border rounded-2xl p-7 md:p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {t("certificates")}
                </h3>
              </div>
              <ul className="space-y-6 mt-6">
                <li className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">
                    {t("cert1Title")}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {t("cert1Desc")}
                  </span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">
                    {t("cert2Title")}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {t("cert2Desc")}
                  </span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">
                    {t("cert3Title")}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {t("cert3Desc")}
                  </span>
                </li>
              </ul>
            </div>

            {/* Method badges — visual summary */}
            <div className="flex flex-wrap gap-2">
              {["Maitland", "Ackermann", "FDM", "AWF Wrocław"].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary-dark text-xs md:text-sm font-medium border border-primary/20"
                >
                  <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}