"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

export default function PricingSection() {
  const plans = [
    {
      id: "trial",
      name: "Trial 14 dni",
      price: "0 zł",
      period: "/2 tygodnie",
      features: [
        "Pełny dostęp do wszystkich funkcji",
        "Do 10 pracowników", 
        "Wsparcie przez email",
        "Bez zobowiązań"
      ],
      cta: "Rozpocznij trial",
      variant: "outline" as const
    },
    {
      id: "pro",
      name: "AutoŻaba Pro",
      price: "149 zł", 
      period: "/msc za sklep",
      features: [
        "Nieograniczona liczba pracowników",
        "Automatyczne grafiki zgodne z prawem",
        "Tarcza Prawna § - kontekstowa pomoc",
        "Mobilny dostęp dla pracowników",
        "Priorytetowe wsparcie",
        "Eksporty dla PIP i księgowości"
      ],
      cta: "Wybierz plan",
      variant: "default" as const,
      popular: true,
      disclaimer: "Anuluj w każdej chwili • Bez ukrytych kosztów"
    }
  ];

  const comparison = [
    { label: "Inne systemy HR", price: "299-599 zł/msc", note: "+ 20-50 zł za pracownika" },
    { label: "AutoŻaba", price: "149 zł/msc", note: "0 zł za pracownika", highlight: true },
    { label: "Koszt braku systemu", price: "30 000 zł", note: "Maksymalna kara PIP", warning: true }
  ];

  return (
    <section id="pricing" className="section-padding bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground" data-testid="text-pricing-title">
            Prosta <span className="text-primary">cena</span>, wielka wartość
          </h2>
          <p className="text-xl text-muted-foreground copy-max mx-auto" data-testid="text-pricing-subtitle">
            149 zł za sklep, bez względu na liczbę pracowników
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card 
              key={plan.id} 
              data-animate="scale"
              data-animate-delay={`${index * 120}`}
              className={`relative transition-shadow pricing-card ${
                plan.variant === 'default'
                  ? 'pricing-card--featured text-white'
                  : 'pricing-card--standard'
              }`}
              data-testid={`card-plan-${plan.id}`}
            >
              {plan.popular && (
                <div className="pricing-card__badge" data-testid={`badge-plan-${plan.id}`}>
                  Najpopularniejszy
                </div>
              )}
              
              <CardHeader className="space-y-2 pb-6 pt-2">
                <h3 className="text-2xl font-bold" data-testid={`text-plan-name-${plan.id}`}>
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold" data-testid={`text-plan-price-${plan.id}`}>
                  {plan.price}
                  <span className={`text-lg font-normal ${plan.variant === 'default' ? 'text-white/80' : 'text-muted-foreground'}`}>
                    {plan.period}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center" data-testid={`feature-${plan.id}-${index}`}>
                      <CheckCircle className="w-5 h-5 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.variant}
                  size="touch"
                  className={`w-full font-semibold pricing-card__button ${
                    plan.variant === 'default' ? 'pricing-card__button--featured' : ''
                  }`}
                  onClick={() => window.open('https://app.autozaba.pl/trial', '_blank')}
                  data-testid={`button-plan-${plan.id}`}
                >
                  {plan.cta}
                </Button>
                
                {plan.disclaimer && (
                  <div className={`text-center text-sm opacity-80 ${plan.variant === 'default' ? 'text-white/80' : ''}`} data-testid={`text-disclaimer-${plan.id}`}>
                    {plan.disclaimer}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Price comparison */}
  <Card
          className="dark:bg-slate-900/70 border border-border/70 dark:border-white/10 pricing-comparison"
          data-animate="rise"
          data-animate-delay="180"
        >
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center" data-testid="text-comparison-title">
              Porównaj z konkurencją
            </h3>
            
            <div className="grid gap-6 text-sm md:grid-cols-3 lg:gap-8">
              {comparison.map((item, index) => {
                const toneClasses = item.highlight
                  ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-300/40 dark:bg-emerald-500/15 dark:text-emerald-200"
                  : item.warning
                    ? "border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-300/40 dark:bg-orange-500/15 dark:text-orange-200"
                    : "border-border/70 bg-white/95 text-muted-foreground dark:bg-slate-900/70 dark:border-white/12 dark:text-foreground";
                const priceClasses = item.highlight
                  ? "text-emerald-600 dark:text-emerald-200"
                  : item.warning
                    ? "text-orange-600 dark:text-orange-200"
                    : "text-foreground";

                return (
                  <div
                    key={index}
                    className={`flex h-full flex-col items-center gap-4 rounded-2xl border px-6 py-8 text-center backdrop-blur-md shadow-[0_18px_44px_-30px_rgba(15,23,42,0.55)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_-26px_rgba(15,23,42,0.65)] ${toneClasses}`}
                    data-testid={`comparison-item-${index}`}
                  >
                    <div
                      className="text-xs font-semibold uppercase tracking-[0.28em] opacity-90"
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
                    <div className="text-sm opacity-90" data-testid={`comparison-note-${index}`}>
                      {item.note}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
