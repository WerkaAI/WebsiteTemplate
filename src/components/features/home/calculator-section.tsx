"use client";

import { useId, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useSpringNumber } from "@/hooks/use-spring-number";
import { APP_URLS } from "@/lib/config";
import { motion } from "framer-motion";

const currencyFormatter = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  maximumFractionDigits: 0,
});

export default function CalculatorSection() {
  const shopsFieldId = useId();
  const hoursFieldId = useId();
  const complianceFieldId = useId();

  const [shops, setShops] = useState(1);
  const [hoursPerWeek, setHoursPerWeek] = useState(8);
  const [hadComplianceAudit, setHadComplianceAudit] = useState(false);

  const calculations = useMemo(() => {
    const monthlyHours = hoursPerWeek * 4.33; // Average weeks per month
    const timeSavedPerShop = monthlyHours * 0.75; // 75% time reduction with the system
    const totalTimeSaved = Math.round(timeSavedPerShop * shops);

    const weekendsSaved = Math.round(shops * 6);

    const riskAvoided = hadComplianceAudit ? 30000 * shops : 30000;

    const monthlyCost = 149 * shops;

    const monthlyRiskValue = riskAvoided / 12;
    const monthlyBenefit = Math.round(monthlyRiskValue - monthlyCost);

    return {
      timeSaved: totalTimeSaved,
      weekendsSaved,
      riskAvoided,
      systemCost: monthlyCost,
      monthlyBenefit,
    };
  }, [hadComplianceAudit, hoursPerWeek, shops]);

  const timeSavedSpring = useSpringNumber(calculations.timeSaved);
  const weekendsSavedSpring = useSpringNumber(calculations.weekendsSaved);
  const riskAvoidedSpring = useSpringNumber(calculations.riskAvoided, {
    formatter: (val) => currencyFormatter.format(Math.round(val)),
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="section-padding bg-white dark:bg-background flex flex-col items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="text-center space-y-4 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl lg:text-4xl font-bold text-foreground"
            data-testid="text-calculator-title"
            variants={itemVariants}
          >
            Sprawdź, ile{" "}
            <span className="text-primary dark:text-emerald-300">
              zaoszczędzisz
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground copy-max mx-auto"
            data-testid="text-calculator-subtitle"
            variants={itemVariants}
          >
            Kalkulator uwzględnia oszczędność czasu, uniknięte kary i spokój
            ducha
          </motion.p>
        </motion.div>

        <Card className="calm-shadow-lg">
          <CardContent className="p-6 sm:p-8 space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Inputs */}
              <div className="space-y-6">
                <h3
                  className="text-xl font-semibold text-foreground"
                  data-testid="text-calculator-inputs-title"
                >
                  Twoja sytuacja
                </h3>

                <motion.div
                  className="space-y-5"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={containerVariants}
                >
                  <motion.div className="floating-field" variants={itemVariants}>
                    <Input
                      id={shopsFieldId}
                      type="number"
                      value={shops}
                      placeholder=" "
                      onChange={(e) =>
                        setShops(
                          Math.max(
                            1,
                            Math.min(5, parseInt(e.target.value, 10) || 1)
                          )
                        )
                      }
                      min="1"
                      max="5"
                      className="floating-input peer h-14 text-base px-4"
                      data-testid="input-calculator-shops"
                    />
                    <Label htmlFor={shopsFieldId} className="floating-label">
                      Liczba lokalizacji
                    </Label>
                    <p className="floating-hint">
                      Większość klientów zaczyna od 1-2 lokalizacji
                    </p>
                  </motion.div>

                  <motion.div
                    className="floating-field"
                    variants={itemVariants}
                  >
                    <Input
                      id={hoursFieldId}
                      type="number"
                      value={hoursPerWeek}
                      placeholder=" "
                      onChange={(e) =>
                        setHoursPerWeek(
                          Math.max(
                            1,
                            Math.min(30, parseInt(e.target.value, 10) || 8)
                          )
                        )
                      }
                      min="1"
                      max="30"
                      className="floating-input peer h-14 text-base px-4"
                      data-testid="input-calculator-hours"
                    />
                    <Label htmlFor={hoursFieldId} className="floating-label">
                      Godzin tygodniowo spędzasz na grafikach i papierkach
                    </Label>
                    <p className="floating-hint">
                      Średnio zespoły spędzają 8-12h tygodniowo
                    </p>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-3 rounded-xl border border-border/70 bg-muted/40 dark:bg-slate-900/60 px-4 py-3"
                    variants={itemVariants}
                  >
                    <input
                      type="checkbox"
                      id={complianceFieldId}
                      checked={hadComplianceAudit}
                      onChange={(e) => setHadComplianceAudit(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      data-testid="checkbox-compliance-audit"
                    />
                    <Label
                      htmlFor={complianceFieldId}
                      className="text-sm font-medium text-muted-foreground cursor-pointer leading-tight"
                    >
                      Czy miałeś audyt zgodności w ciągu ostatnich 2 lat?
                    </Label>
                  </motion.div>
                </motion.div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <h3
                  className="text-xl font-semibold text-foreground"
                  data-testid="text-calculator-results-title"
                >
                  Co zyskujesz
                </h3>

                <motion.div
                  className="space-y-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={containerVariants}
                >
                  <motion.div
                    className="metric-card metric-card--time"
                    variants={itemVariants}
                  >
                    <div className="metric-card__label">
                      Odzyskany czas miesięcznie
                    </div>
                    <div
                      className={`metric-card__value transition-colors duration-300 ${timeSavedSpring.isAnimating
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-foreground"
                        }`}
                      data-testid="stat-time-saved"
                    >
                      {timeSavedSpring.formatted} godzin
                    </div>
                    <div className="metric-card__hint">
                      Czas dla rodziny i odpoczynku
                    </div>
                    <dl className="mt-4 grid grid-cols-2 gap-2 rounded-lg bg-primary/5 px-4 py-3 text-sm text-primary">
                      <dt className="font-medium text-primary/80">
                        Wolne weekendy
                      </dt>
                      <dd
                        className={`text-right font-semibold transition-colors duration-300 ${weekendsSavedSpring.isAnimating
                          ? "text-emerald-700 dark:text-emerald-300"
                          : ""
                          }`}
                        data-testid="stat-weekends-saved"
                      >
                        +{weekendsSavedSpring.formatted} / rok
                      </dd>
                    </dl>
                  </motion.div>

                  <motion.div
                    className="metric-card metric-card--risk"
                    variants={itemVariants}
                  >
                    <div
                      className="metric-card__swap"
                      aria-live="polite"
                      data-state={hadComplianceAudit ? "back" : "front"}
                    >
                      <div
                        className="metric-card__panel"
                        data-panel="front"
                        data-active={(!hadComplianceAudit).toString()}
                        aria-hidden={hadComplianceAudit}
                      >
                        <div className="metric-card__label">
                          Ochrona przed kosztownymi błędami
                        </div>
                        <div
                          className={`metric-card__value transition-colors duration-300 ${riskAvoidedSpring.isAnimating
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-foreground"
                            }`}
                          data-testid="stat-penalty-avoided"
                          suppressHydrationWarning
                        >
                          {riskAvoidedSpring.formatted}
                        </div>
                        <div className="metric-card__hint">
                          Koszt poważnych naruszeń procesowych może sięgać
                          nawet 30 000 zł.
                        </div>
                      </div>

                      <div
                        className="metric-card__panel"
                        data-panel="back"
                        data-active={hadComplianceAudit.toString()}
                        aria-hidden={!hadComplianceAudit}
                      >
                        <div className="metric-card__label">
                          Kontrola wraca częściej
                        </div>
                        <div
                          className={`metric-card__value transition-colors duration-300 ${riskAvoidedSpring.isAnimating
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-foreground"
                            }`}
                          suppressHydrationWarning
                        >
                          {riskAvoidedSpring.formatted}
                        </div>
                        <div className="metric-card__hint">
                          Jeśli audyt był u Ciebie w ciągu ostatnich 2 lat,
                          ryzyko kolejnej kontroli i kosztownych poprawek rośnie.
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="metric-card metric-card--investment"
                    variants={itemVariants}
                  >
                    <div className="metric-card__label">System na teraz</div>
                    <div
                      className="metric-card__value"
                      data-testid="stat-system-cost"
                    >
                      149 zł/mies.
                    </div>
                    <div className="metric-card__hint">
                      Cena gwarantowana przez 12 miesięcy
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
                <div className="flex flex-col items-center gap-2 md:items-start">
                  <Button
                    size="touch"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 text-lg calm-shadow transition-all duration-300 hover:scale-105"
                    onClick={() => window.open(APP_URLS.register, "_blank")}
                    data-testid="button-calculator-register"
                  >
                    Zacznij oszczędzać czas →
                  </Button>
                  <p
                    className="text-sm text-muted-foreground"
                    data-testid="text-calculator-disclaimer"
                  >
                    149 zł/mies. • Nieograniczona liczba pracowników
                  </p>
                </div>
                <div className="relative flex-shrink-0" aria-hidden>
                  <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl" />
                  <Image
                    src="/illustrations/neutral-feature.svg"
                    alt=""
                    width={240}
                    height={240}
                    className="relative h-36 w-auto drop-shadow-[0_24px_45px_rgba(16,185,129,0.45)] md:h-40"
                    sizes="(min-width: 768px) 200px, 45vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
