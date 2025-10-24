"use client";

import { useId, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useSpringNumber } from "@/hooks/use-spring-number";

const currencyFormatter = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  maximumFractionDigits: 0,
});

export default function CalculatorSection() {
  const shopsFieldId = useId();
  const hoursFieldId = useId();
  const pipFieldId = useId();

  const [shops, setShops] = useState(1);
  const [hoursPerWeek, setHoursPerWeek] = useState(8);
  const [hadPIPControl, setHadPIPControl] = useState(false);
  
  const calculations = useMemo(() => {
    const monthlyHours = hoursPerWeek * 4.33; // Average weeks per month
    const timeSavedPerShop = monthlyHours * 0.75; // 75% time reduction with AutoŻaba
    const totalTimeSaved = Math.round(timeSavedPerShop * shops);

    const weekendsSaved = Math.round(shops * 6);

    const riskAvoided = hadPIPControl ? 30000 * shops : 30000;

    const monthlyCost = 149 * shops;

    const monthlyRiskValue = riskAvoided / 12;
    const monthlyBenefit = Math.round(monthlyRiskValue - monthlyCost);

    return {
      timeSaved: totalTimeSaved,
      weekendsSaved,
      riskAvoided,
      autozabaCost: monthlyCost,
      monthlyBenefit,
    };
  }, [hadPIPControl, hoursPerWeek, shops]);

  const timeSavedSpring = useSpringNumber(calculations.timeSaved);
  const weekendsSavedSpring = useSpringNumber(calculations.weekendsSaved);
  const riskAvoidedSpring = useSpringNumber(calculations.riskAvoided, {
    formatter: (val) => currencyFormatter.format(Math.round(val)),
  });

  return (
    <section className="section-padding bg-white dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground" data-testid="text-calculator-title">
            Sprawdź, ile <span className="text-primary dark:text-emerald-300">zaoszczędzisz</span>
          </h2>
          <p className="text-xl text-muted-foreground copy-max mx-auto" data-testid="text-calculator-subtitle">
            Kalkulator uwzględnia oszczędność czasu, uniknięte kary i spokój ducha
          </p>
        </div>
        
        <Card className="calm-shadow-lg">
          <CardContent className="p-6 sm:p-8 space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Inputs */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground" data-testid="text-calculator-inputs-title">Twoja sytuacja</h3>
                
                <div className="space-y-5">
                  <div className="floating-field" data-animate="rise">
                    <Input
                      id={shopsFieldId}
                      type="number"
                      value={shops}
                      placeholder=" "
                      onChange={(e) =>
                        setShops(Math.max(1, Math.min(5, parseInt(e.target.value, 10) || 1)))
                      }
                      min="1"
                      max="5"
                      className="floating-input peer"
                      data-testid="input-calculator-shops"
                    />
                    <Label
                      htmlFor={shopsFieldId}
                      className="floating-label"
                    >
                      Liczba sklepów
                    </Label>
                    <p className="floating-hint">Większość franczyzobiorców ma 1-2 sklepy</p>
                  </div>

                  <div className="floating-field" data-animate="rise" data-animate-delay="80">
                    <Input
                      id={hoursFieldId}
                      type="number"
                      value={hoursPerWeek}
                      placeholder=" "
                      onChange={(e) =>
                        setHoursPerWeek(Math.max(1, Math.min(30, parseInt(e.target.value, 10) || 8)))
                      }
                      min="1"
                      max="30"
                      className="floating-input peer"
                      data-testid="input-calculator-hours"
                    />
                    <Label htmlFor={hoursFieldId} className="floating-label">
                      Godzin tygodniowo spędzasz na grafikach i papierkach
                    </Label>
                    <p className="floating-hint">Średnio franczyzobiorcy spędzają 8-12h tygodniowo</p>
                  </div>

                  <div
                    className="flex items-start gap-3 rounded-xl border border-border/70 bg-muted/40 dark:bg-slate-900/60 px-4 py-3"
                    data-animate="rise"
                    data-animate-delay="140"
                  >
                    <input
                      type="checkbox"
                      id={pipFieldId}
                      checked={hadPIPControl}
                      onChange={(e) => setHadPIPControl(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      data-testid="checkbox-pip-control"
                    />
                    <Label
                      htmlFor={pipFieldId}
                      className="text-sm font-medium text-muted-foreground cursor-pointer leading-tight"
                    >
                      Miałeś już kontrolę PIP w ciągu ostatnich 2 lat?
                    </Label>
                  </div>
                </div>
              </div>
              
              {/* Results */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground" data-testid="text-calculator-results-title">
                  Co zyskujesz
                </h3>

                <div className="space-y-4">
                  <div className="metric-card metric-card--time" data-animate="rise" data-animate-delay="60">
                    <div className="metric-card__label">Odzyskany czas miesięcznie</div>
                    <div className="metric-card__value" data-testid="stat-time-saved">
                      {timeSavedSpring.formatted} godzin
                    </div>
                    <div className="metric-card__hint">Czas dla rodziny i odpoczynku</div>
                    <dl className="mt-4 grid grid-cols-2 gap-2 rounded-lg bg-primary/5 px-4 py-3 text-sm text-primary">
                      <dt className="font-medium text-primary/80">Wolne weekendy</dt>
                      <dd className="text-right font-semibold" data-testid="stat-weekends-saved">
                        +{weekendsSavedSpring.formatted} / rok
                      </dd>
                    </dl>
                  </div>

                  <div className="metric-card metric-card--risk" data-animate="rise" data-animate-delay="120">
                    <div
                      className="metric-card__swap"
                      aria-live="polite"
                      data-state={hadPIPControl ? "back" : "front"}
                    >
                      <div
                        className="metric-card__panel"
                        data-panel="front"
                        data-active={(!hadPIPControl).toString()}
                        aria-hidden={hadPIPControl}
                      >
                        <div className="metric-card__label">Ochrona przed karami PIP</div>
                        <div
                          className="metric-card__value"
                          data-testid="stat-penalty-avoided"
                          suppressHydrationWarning
                        >
                          {riskAvoidedSpring.formatted}
                        </div>
                        <div className="metric-card__hint">
                          Maksymalna kara za naruszenia Kodeksu pracy to 30 000 zł.
                        </div>
                      </div>

                      <div
                        className="metric-card__panel"
                        data-panel="back"
                        data-active={hadPIPControl.toString()}
                        aria-hidden={!hadPIPControl}
                      >
                        <div className="metric-card__label">Kontrola wraca częściej</div>
                        <div className="metric-card__value" suppressHydrationWarning>
                          {riskAvoidedSpring.formatted}
                        </div>
                        <div className="metric-card__hint">
                          Jeśli PIP był u Ciebie w ciągu ostatnich 2 lat, szansa na powtórkę rośnie, a kara 30 000 zł nadal grozi.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="metric-card metric-card--investment" data-animate="rise" data-animate-delay="180">
                    <div className="metric-card__label">AutoŻaba na teraz</div>
                    <div className="metric-card__value" data-testid="stat-autozaba-cost">
                      Beta testy trwają
                    </div>
                    <div className="metric-card__hint">Dołącz i odbierz pierwszeństwo wdrożenia</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-border">
              <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
                <div className="flex flex-col items-center gap-2 md:items-start">
                  <Button
                    size="touch"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 text-lg calm-shadow transition-all duration-300 hover:scale-105"
                    onClick={() => window.open("https://app.autozaba.pl/register", "_blank")}
                    data-testid="button-calculator-register"
                  >
                    Zacznij oszczędzać czas →
                  </Button>
                  <p className="text-sm text-muted-foreground" data-testid="text-calculator-disclaimer">
                    Tylko {calculations.autozabaCost} zł/msc • Nieograniczona liczba pracowników
                  </p>
                </div>
                <div className="relative flex-shrink-0" aria-hidden>
                  <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl" />
                  <Image
                    src="/illustrations/kalkulator-zaba.png"
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
