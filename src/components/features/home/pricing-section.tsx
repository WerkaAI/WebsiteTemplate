"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { APP_URLS } from "@/lib/config";
import { motion } from "framer-motion";

export default function PricingSection() {
  const plans = [
    {
      id: "trial",
      name: "Przetestuj — 14 dni",
      price: "0 zł",
      period: "/14 dni",
      features: [
        "Pełny dostęp do wszystkich funkcji",
        "Bez limitu pracowników",
        "Wsparcie przez czat i e-mail",
        "Bez zobowiązań",
      ],
      cta: "Przetestuj za darmo",
      variant: "outline" as const,
    },
    {
      id: "pro",
      name: "System",
      price: "149 zł",
      originalPrice: "199 zł",
      period: "/miesiąc",
      features: [
        "Bez limitu pracowników",
        "Automatyczne grafiki zgodne z regułami",
        "Wsparcie zgodności w aplikacji",
        "Pomoc we wdrożeniu — krok po kroku",
        "Dokumenty operacyjne gotowe do eksportu",
      ],
      cta: "Sprawdź cennik",
      variant: "default" as const,
      popular: true,
      disclaimer: "Cena promocyjna -25% gwarantowana przez 12 miesięcy",
    },
  ];

  const comparison = [
    {
      label: "Inne systemy HR",
      price: "299–599 zł/msc",
      note: "+ 20–50 zł za pracownika",
    },
    {
      label: "System",
      price: "149 zł/msc",
      note: "Bez limitu pracowników · Dodatkowa lokalizacja +75 zł · Cena gwarantowana 12 mies.",
      highlight: true,
    },
    {
      label: "Koszt braku systemu",
      price: "Wysoki",
      note: "Koszt chaosu i poprawek",
      warning: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="pricing" className="section-padding bg-muted flex flex-col items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="text-center space-y-4 mb-10 sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl lg:text-4xl font-bold text-foreground"
            data-testid="text-pricing-title"
            variants={itemVariants}
          >
            Prosta{" "}
            <span className="text-primary dark:text-emerald-300">cena</span>,
            wielka wartość
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground copy-max mx-auto"
            data-testid="text-pricing-subtitle"
            variants={itemVariants}
          >
            Jedna lokalizacja, jedna cena — 149 zł/mies. bez limitu pracowników
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 md:gap-8 mb-10 sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card
                className={`relative transition-shadow pricing-card h-full ${plan.variant === "default"
                  ? "pricing-card--featured text-white"
                  : "glass-premium"
                  }`}
                data-testid={`card-plan-${plan.id}`}
              >
                {plan.popular && (
                  <motion.div
                    className="pricing-card__badge"
                    data-testid={`badge-plan-${plan.id}`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Najpopularniejszy
                  </motion.div>
                )}

                <CardHeader className="space-y-2 pb-6 pt-2">
                  <h3
                    className="text-2xl font-bold"
                    data-testid={`text-plan-name-${plan.id}`}
                  >
                    {plan.name}
                  </h3>
                  <div
                    className="text-4xl font-bold"
                    data-testid={`text-plan-price-${plan.id}`}
                  >
                    {plan.originalPrice && (
                      <span className={`text-lg line-through font-normal mr-2 ${plan.variant === "default" ? "text-white/50" : "text-muted-foreground/60"}`}>
                        {plan.originalPrice}
                      </span>
                    )}
                    {plan.price}
                    <span
                      className={`text-lg font-normal ${plan.variant === "default"
                        ? "text-white/80"
                        : "text-muted-foreground"
                        }`}
                    >
                      {plan.period}
                    </span>
                    {plan.originalPrice && (
                      <div className={`text-sm font-semibold mt-1 ${plan.variant === "default" ? "text-emerald-300" : "text-emerald-500"}`}>
                        Oszczędzasz 25%
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-6 sm:p-8 space-y-6">
                  <ul className="space-y-3 text-sm sm:text-base">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center"
                        data-testid={`feature-${plan.id}-${index}`}
                      >
                        <CheckCircle className="w-5 h-5 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.variant}
                    size="touch"
                    className={`w-full font-semibold pricing-card__button ${plan.variant === "default"
                      ? "pricing-card__button--featured"
                      : ""
                      }`}
                    onClick={() => {
                      if (plan.variant === "default") {
                        window.location.href = "/cennik";
                      } else {
                        window.open(APP_URLS.register, "_blank");
                      }
                    }}
                    data-testid={`button-plan-${plan.id}`}
                  >
                    {plan.cta}
                  </Button>

                  {plan.disclaimer && (
                    <div
                      className={`text-center text-sm opacity-80 ${plan.variant === "default" ? "text-white/80" : ""
                        }`}
                      data-testid={`text-disclaimer-${plan.id}`}
                    >
                      {plan.disclaimer}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Price comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card
            className="dark:bg-slate-900/70 border border-border/70 dark:border-white/10 pricing-comparison"
          >
            <CardContent className="p-6 sm:p-8">
              <h3
                className="text-xl font-semibold text-foreground mb-6 text-center"
                data-testid="text-comparison-title"
              >
                Porównaj z konkurencją
              </h3>

              <div className="grid gap-5 text-sm md:grid-cols-3 md:gap-6 lg:gap-8">
                {comparison.map((item, index) => {
                  const toneClasses = item.highlight
                    ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-300/40 dark:bg-emerald-500/15 dark:text-emerald-200 z-10 overflow-visible"
                    : item.warning
                      ? "border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-300/40 dark:bg-orange-500/15 dark:text-orange-200"
                      : "border-border/70 bg-white/95 text-muted-foreground dark:bg-slate-900/70 dark:border-white/12 dark:text-foreground";
                  const priceClasses = item.highlight
                    ? "text-emerald-600 dark:text-emerald-200"
                    : item.warning
                      ? "text-orange-600 dark:text-orange-200"
                      : "text-foreground";

                  return (
                    <motion.div
                      key={index}
                      className={`flex h-full flex-col items-center gap-4 rounded-2xl border px-6 py-8 text-center backdrop-blur-md shadow-[0_18px_44px_-30px_rgba(15,23,42,0.55)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_-26px_rgba(15,23,42,0.65)] ${toneClasses}`}
                      data-testid={`comparison-item-${index}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                    >
                      <div
                        className="text-label opacity-90"
                        data-testid={`comparison-label-${index}`}
                      >
                        {item.label}
                      </div>
                      <div
                        className={`text-3xl font-bold drop-shadow-[0_8px_16px_rgba(0,0,0,0.28)] ${priceClasses}`}
                        data-testid={`comparison-price-${index}`}
                      >
                        {item.price}
                      </div>
                      <div
                        className="text-sm opacity-90"
                        data-testid={`comparison-note-${index}`}
                      >
                        {item.note}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
