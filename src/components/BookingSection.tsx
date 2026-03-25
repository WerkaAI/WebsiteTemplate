"use client";

import { CalendarDays, MapPin, Clock, ExternalLink, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FadeInUp } from "@/components/ui/FadeInUp";

export function BookingSection() {
  const t = useTranslations("booking");
  const tTrust = useTranslations("trust");
  const tProcess = useTranslations("process");

  return (
    <section id="rezerwacja" className="py-14 md:py-24 bg-muted/30">
      <div className="container-spacing">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Clinic info ─────────────────────────────── */}
          <FadeInUp>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t("title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              {t("description")}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary-dark" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{t("locationTitle")}</h3>
                  <p className="text-muted-foreground mt-1">
                    ul. Grabiszyńska 241A<br />53-234 Wrocław
                  </p>
                  <p className="text-sm text-primary-dark mt-2 flex items-center gap-1.5">
                    <span aria-hidden="true">🅿️</span>
                    Bezpłatny parking dla pacjentów przy gabinecie
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary-dark" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{t("hoursTitle")}</h3>
                  <p className="text-muted-foreground mt-1 whitespace-pre-line">{t("hoursDesc")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-6 h-6 text-primary-dark" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{t("priceTitle")}</h3>
                  <p className="text-muted-foreground mt-1 whitespace-pre-line">{t("priceDesc")}</p>
                </div>
              </div>
            </div>
          </FadeInUp>

          {/* ── Right: CTA card with urgency ──────────────────── */}
          <FadeInUp delay={0.1} className="flex justify-center">
            <div className="w-full max-w-sm bg-card border border-border rounded-3xl shadow-lg p-7 md:p-10 text-center space-y-7">

              {/* Icon */}
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <CalendarDays className="w-8 h-8 text-primary-dark" />
              </div>

              {/* Copy */}
              <div className="space-y-3">
                <h3 className="font-serif text-2xl font-bold text-foreground">
                  {t("widgetTitle")}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  {t("widgetDesc")}
                </p>
              </div>

              {/* Social proof badge */}
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 text-primary-dark text-sm font-medium">
                <span aria-hidden="true">⭐</span>
                {tTrust("verified")} &middot; 5.0 {tTrust("onPortal")} ZnanyLekarz
              </div>

              {/* Urgency nudge */}
              <p className="text-sm font-medium text-primary-dark">
                {tProcess("urgency")}
              </p>

              {/* Magnetic CTA */}
              <div className="relative pt-1">
                <span className="booking-halo" />
                <MagneticButton
                  href="https://www.znanylekarz.pl/aneta-koloszynska/fizjoterapeuta/wroclaw"
                  external
                  aria-label={`${t("widgetCta")} — otwiera w nowej karcie`}
                >
                  <CalendarDays className="h-5 w-5" aria-hidden="true" />
                  {t("widgetCta")}
                  <ExternalLink className="h-4 w-4 opacity-55" aria-hidden="true" />
                </MagneticButton>
              </div>

              {/* Phone fallback */}
              <p className="text-xs text-muted-foreground pt-1">
                Wolisz umówić wizytę telefonicznie?{" "}
                <a
                  href="tel:+48532445410"
                  className="font-medium text-foreground hover:text-primary-dark transition-colors inline-flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" aria-hidden="true" />
                  532 445 410
                </a>
              </p>
            </div>
          </FadeInUp>

        </div>
      </div>
    </section>
  );
}
