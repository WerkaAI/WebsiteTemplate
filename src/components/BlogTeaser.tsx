"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeInUp } from "@/components/ui/FadeInUp";

const articleKeys = ["article1", "article2", "article3"] as const;

// Placeholder gradient covers when no real blog images exist yet
const gradients = [
  "from-primary/20 via-primary/5 to-transparent",
  "from-blue-200/30 via-primary/5 to-transparent",
  "from-amber-100/40 via-primary/5 to-transparent",
];

export function BlogTeaser() {
  const t = useTranslations("blogTeaser");

  return (
    <section id="baza-wiedzy" className="py-14 md:py-24 bg-background">
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

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {articleKeys.map((key, index) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Gradient cover placeholder */}
              <div
                className={`relative h-44 bg-gradient-to-br ${gradients[index]} flex items-center justify-center`}
              >
                <BookOpen
                  className="w-10 h-10 text-primary-dark/30"
                  aria-hidden="true"
                />
                {/* Category badge */}
                <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-card/80 backdrop-blur-sm text-primary-dark border border-primary/15">
                  {t(`articles.${key}.category`)}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary-dark transition-colors line-clamp-2">
                  {t(`articles.${key}.title`)}
                </h3>
                <p className="text-muted-foreground text-[0.95rem] leading-relaxed mb-5 flex-1 line-clamp-3">
                  {t(`articles.${key}.excerpt`)}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border/60">
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    {t(`articles.${key}.readTime`)}
                  </span>
                  <span className="text-sm font-medium text-primary-dark flex items-center gap-1 group-hover:gap-2 transition-all">
                    {t("readMore")}
                    <ArrowRight
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View all link (future blog page) */}
        <FadeInUp delay={0.2} className="text-center mt-12">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            {t("viewAll")} — wkrótce
          </span>
        </FadeInUp>
      </div>
    </section>
  );
}
