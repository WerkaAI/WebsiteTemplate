"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { BOOKING_URL } from "@/lib/config";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroSpotlight } from "@/components/ui/HeroSpotlight";

/**
 * B-roll video configuration.
 * Set NEXT_PUBLIC_HERO_VIDEO_SRC (WebM, max ~3MB, 10s, muted loop)
 * and NEXT_PUBLIC_HERO_VIDEO_POSTER (WebP still frame) to enable the
 * cinematic video background on desktop. Falls back to gradient on mobile.
 */
const HERO_VIDEO_SRC = process.env.NEXT_PUBLIC_HERO_VIDEO_SRC || "/Anetawebhero.webm";
const HERO_VIDEO_POSTER = process.env.NEXT_PUBLIC_HERO_VIDEO_POSTER;

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-24 md:pt-32 md:pb-40 lg:pt-44 lg:pb-52">
      {/* ── Background layer ─────────────────────────────────── */}
      {/* Gradient: always visible */}
      <div
        className="absolute inset-0 hero-gradient transition-opacity duration-500"
        aria-hidden="true"
      />

      {/* ── Spotlight "diagnostic light" layer ───── */}
      <HeroSpotlight className="z-[2]" />

      {/* ── Decorative orbs (soft pulse) ─────────────── */}
      <div
        className="hero-soft-pulse absolute -top-20 -right-20 w-[36rem] h-[36rem] rounded-full bg-primary/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="hero-soft-pulse absolute bottom-0 -left-24 w-96 h-96 rounded-full bg-secondary/15 blur-3xl pointer-events-none"
        style={{ animationDelay: "-7s" }}
        aria-hidden="true"
      />
      {/* Floating ambient shimmer */}
      <div
        className="hero-ambient-float absolute top-1/3 left-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(117, 241, 235, 0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="container-spacing relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text Content */}
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            {/* H1 — Playfair Display via font-serif */}
            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-foreground"
            >
              {t("title")}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.17 }}
              className="text-lg md:text-xl mb-12 leading-relaxed text-muted-foreground"
            >
              {t("description")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.26 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              {/* Primary: direct to ZnanyLekarz */}
              <MagneticButton
                href={BOOKING_URL}
                external
                aria-label={`${t("primaryCta")} — otwiera profil ZnanyLekarz w nowej karcie`}
              >
                <Calendar className="h-5 w-5" aria-hidden="true" />
                {t("primaryCta")}
              </MagneticButton>

              {/* Secondary: scroll to services */}
              <Link
                href={`/${locale}/#uslugi`}
                className="inline-flex items-center gap-2 text-base font-medium transition-colors group text-muted-foreground hover:text-foreground"
              >
                {t("secondaryCta")}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Aneta's Photo Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-none max-h-[340px] sm:max-h-[400px] lg:max-h-none aspect-[4/5] lg:aspect-square flex items-end justify-center"
          >
            {/* Organic Mint Blob Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[85%] h-[85%] bg-primary/25 rounded-full blur-3xl hero-soft-pulse" />
              <div className="absolute w-[60%] h-[60%] bg-primary/35 rounded-full blur-2xl translate-x-8 -translate-y-8" />
            </div>

            {/* Aneta's Photo */}
            <div 
              className="relative z-10 w-[90%] h-[95%]"
              style={{
                // Fades out the bottom of the image so it blends smoothly without a hard cut
                maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)"
              }}
            >
              <Image
                src="/illustrations/anetaphoto.png"
                alt="Aneta Kołoszyńska - Fizjoterapeuta we Wrocławiu"
                fill
                priority
                fetchPriority="high"
                className="object-contain object-bottom drop-shadow-2xl"
                sizes="(max-width: 768px) 280px, (max-width: 1024px) 384px, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
