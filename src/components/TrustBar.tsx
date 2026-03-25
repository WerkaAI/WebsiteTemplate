"use client";

import { motion } from "framer-motion";
import { Star, Shield, Award } from "lucide-react";
import { useTranslations } from "next-intl";

export function TrustBar() {
  const t = useTranslations("trust");

  return (
    <section className="relative z-20 -mt-10 mb-12 px-4">
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-3xl mx-auto bg-card border border-border rounded-2xl shadow-lg px-5 py-4 md:px-8 md:py-5"
      >
        {/* Main row — wraps on mobile */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {/* Rating: stars + score */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-lg font-bold text-foreground leading-none">5.0</span>
          </div>

          <span className="hidden sm:block w-px h-5 bg-border" aria-hidden="true" />

          {/* Verified reviews */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{t("verified")}</span>
            {t("onPortal")}{" "}
            <span className="font-bold text-[#00B39B]">ZnanyLekarz</span>
          </div>

          <span className="hidden sm:block w-px h-5 bg-border" aria-hidden="true" />

          {/* Certifications — compact badges */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary-dark">
              <Award className="w-3 h-3" aria-hidden="true" />
              Maitland
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary-dark">
              <Shield className="w-3 h-3" aria-hidden="true" />
              FDM
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary-dark">
              <Award className="w-3 h-3" aria-hidden="true" />
              Ackermann
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}