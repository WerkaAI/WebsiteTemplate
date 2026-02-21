import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Calendar, Shield, Smartphone, AlertTriangle } from "lucide-react";
import Image from "next/image";

export default function SolutionSection() {
  const beforeAfter = {
    before: [
      "3h na każdy grafik",
      "Ryzyko kar do 30k zł", 
      "Chaos w SMS-ach",
      "Papiery do 2 w nocy"
    ],
    after: [
      "15 min - automatycznie",
      "100% zgodność prawna",
      "Wszystko w 1 app", 
      "Weekendy dla rodziny"
    ]
  };

  const features = [
    {
      id: "auto-schedule",
      icon: Calendar,
      title: "Automatyczne harmonogramy",
      description: "System układa grafiki za Ciebie, respektując przepisy Kodeksu pracy, które sam wybierzesz – od odpoczynku dobowego po limity nadgodzin.",
      savings: "2h 45min / grafik"
    },
    {
      id: "time-tracking",
      icon: Smartphone,
      title: "Ewidencja czasu pracy",
      description: "Pracownicy logują wejścia w aplikacji mobilnej, a ewidencja godzin i nadgodzin aktualizuje się sama.",
      benefit: "Rozliczenia z telefonu i bez papierologii"
    },
    {
      id: "legal-shield",
      icon: Shield,
      title: "Tarcza prawna",
      description: "Konkretnie wskazuje, co poprawić, ostrzega przed błędami i przygotowuje na kontrolę PIP.",
      protection: "Chronisz się przed karami do 30 000 zł"
    }
  ];

  return (
    <section id="solution" className="section-padding bg-muted">
      <div className="container-spacing">
        <div className="text-center space-y-4 mb-14 sm:mb-16" data-animate>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground" data-testid="text-solution-title">
            Twoja <span className="text-primary dark:text-emerald-300">Automatyczna Tarcza Prawna</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto copy-max" data-testid="text-solution-subtitle">
            To nie kolejne narzędzie HR. To system ochrony, który automatyzuje 
            najbardziej ryzykowne procesy i daje spokój ducha.
          </p>
        </div>

        {/* Before/After Comparison */}
        <div className="relative grid gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12 mb-14 lg:mb-20">
          <div
            className="group relative"
            data-animate="slide-left"
            data-animate-delay="60"
            data-animate-once
          >
            <div
              className="pointer-events-none absolute -inset-x-6 -top-10 bottom-4 rounded-[2.5rem] bg-gradient-to-br from-red-100/60 via-transparent to-transparent opacity-60 blur-3xl transition-opacity duration-700 ease-out group-hover:opacity-80 dark:from-red-900/40"
              aria-hidden="true"
            />
            <div className="relative flex h-full flex-col justify-between space-y-5 text-center">
              <h3
                className="text-2xl font-semibold text-foreground"
                data-testid="text-before-title"
              >
                Bez systemu
              </h3>
              <div className="h-full">
                <div className="h-full rounded-[1.75rem] border border-red-200/70 bg-red-50/90 p-6 sm:p-8 shadow-sm transition-transform duration-500 motion-ease-out group-hover:-translate-y-1 dark:border-red-500/35 dark:bg-red-900/25">
                  <ul className="space-y-3">
                    {beforeAfter.before.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-red-700 dark:text-red-200"
                        data-testid={`before-item-${index}`}
                      >
                        <XCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span className="text-left">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div
            className="group relative"
            data-animate="slide-right"
            data-animate-delay="140"
            data-animate-once
          >
            <div
              className="pointer-events-none absolute -inset-x-6 -top-10 bottom-4 rounded-[2.5rem] bg-gradient-to-bl from-emerald-100/70 via-transparent to-transparent opacity-60 blur-3xl transition-opacity duration-700 ease-out group-hover:opacity-85 dark:from-emerald-900/35"
              aria-hidden="true"
            />
            <div className="relative flex h-full flex-col justify-between space-y-5 text-center">
              <h3
                className="text-2xl font-semibold text-foreground"
                data-testid="text-after-title"
              >
                Z systemem
              </h3>
              <div className="h-full">
                <div className="h-full rounded-[1.75rem] border border-green-200/70 bg-green-50/95 p-6 sm:p-8 shadow-sm transition-transform duration-500 motion-ease-out group-hover:-translate-y-1 dark:border-emerald-500/30 dark:bg-emerald-900/25">
                  <div className="flex h-full flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-10 sm:text-left">
                  <div className="relative flex-shrink-0" aria-hidden>
                    <div className="absolute inset-0 rounded-full bg-emerald-200/35 blur-2xl" />
                    <Image
                      src="/illustrations/neutral-feature.svg"
                      alt=""
                      width={220}
                      height={220}
                      className="relative h-40 w-auto drop-shadow-[0_24px_45px_rgba(5,150,105,0.45)]"
                      sizes="(min-width: 1024px) 200px, 40vw"
                      priority
                    />
                  </div>
                    <ul className="space-y-3 text-left max-sm:w-full">
                      {beforeAfter.after.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-green-700 dark:text-emerald-200"
                          data-testid={`after-item-${index}`}
                        >
                          <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                          <span className="text-left">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="pointer-events-none absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent lg:block"
            aria-hidden="true"
          />
        </div>

        {/* Feature Showcase */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.id}
                data-animate="rise"
                data-animate-delay={`${index * 120}`}
                data-animate-once
                className="feature-card border border-border/60 bg-card/95 transition-colors duration-500 dark:border-white/10 dark:bg-slate-900/70"
                data-testid={`card-feature-${feature.id}`}
              >
                <div className="feature-card__halo" aria-hidden="true" />
                <CardContent className="relative p-6 sm:p-8 space-y-5">
                  <div className="feature-card__icon flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
            </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground" data-testid={`text-feature-title-${feature.id}`}>
                      {feature.title}
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground" data-testid={`text-feature-description-${feature.id}`}>
                      {feature.description}
                    </p>
                    
                    {feature.savings && (
                      <div className="rounded-lg bg-muted/70 p-4 shadow-inner dark:bg-slate-800/60">
                        <div className="mb-2 text-sm text-muted-foreground">Oszczędność czasu:</div>
                        <div className="text-2xl font-bold text-primary" data-testid={`stat-savings-${feature.id}`}>
                          {feature.savings}
                        </div>
                      </div>
                    )}
                    
                    {feature.protection && (
                      <div className="rounded-lg border border-accent/30 bg-accent/10 p-4 dark:border-accent/40 dark:bg-accent/20">
                        <div className="flex items-center gap-2 text-sm font-medium text-accent" data-testid={`stat-protection-${feature.id}`}>
                          <AlertTriangle className="h-4 w-4" />
                          {feature.protection}
                        </div>
                      </div>
                    )}
                    
                    {feature.benefit && (
                      <div className="flex items-center text-sm text-muted-foreground" data-testid={`stat-benefit-${feature.id}`}>
                        <CheckCircle className="mr-2 h-4 w-4 text-secondary" />
                        <span>{feature.benefit}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
  </div>
      </div>
    </section>
  );
}
