import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, XCircle } from "lucide-react";
import Image from "next/image";

const numberFormatter = new Intl.NumberFormat("pl-PL", {
  maximumFractionDigits: 0,
});

const formatNumber = (value: number) => numberFormatter.format(value);

export default function ProblemSection() {
  const waveGradientPrimaryId = "problem-wave-primary";
  const waveGradientSecondaryId = "problem-wave-secondary";

  const problems = [
    {
      id: "schedule-chaos",
      title: "Chaos w grafikach",
      description:
        '"Spędzam wieczory nad Excelem zamiast z rodziną. Każdy grafik to 3 godziny kombinowania i strach, czy nie pomyliłem się w prawie."',
      risk: {
        label: "Ryzyko kary do",
        amount: 30000,
        suffix: " zł",
      },
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    },
    {
      id: "legal-compliance",
      title: "Strach przed PIP",
      description:
        '"Kodeks Pracy to dla mnie czarna magia. Nie wiem, czy ewidencja czasu pracy jest poprawna. Każda kontrola to łoteria."',
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      legalIssues: [
        "11h odpoczynku między zmianami",
        "Różnice UoP vs umowa zlecenie",
        "Ewidencja czasu pracy (RCP)",
      ],
    },
    {
      id: "work-life-balance",
      title: "Brak czasu dla siebie",
      description:
        '"240 godzin miesięcznie w sklepie plus papierkowa robota w domu. Kiedy mam żyć?"',
      image:
        "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      timeBreakdown: {
        shop: { label: "Praca w sklepie", value: 240 },
        paperwork: { label: "Grafiki i papiery", value: 40, prefix: "+" },
        total: { label: "Razem", value: 280 },
      },
    },
  ];

  return (
    <section
      id="problem"
      className="section-padding relative isolate overflow-hidden bg-white dark:bg-background"
    >
      <div className="problem-wave" aria-hidden="true">
        <svg
          className="problem-wave__layer problem-wave__layer--back"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`${waveGradientPrimaryId}-gradient`} x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 102, 37, 0.4)" />
              <stop offset="50%" stopColor="rgba(22, 163, 74, 0.25)" />
              <stop offset="100%" stopColor="rgba(3, 196, 161, 0.2)" />
            </linearGradient>
          </defs>
          <path
            d="M0,192L60,202.7C120,213,240,235,360,240C480,245,600,235,720,213.3C840,192,960,160,1080,160C1200,160,1320,192,1380,208L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            fill={`url(#${waveGradientPrimaryId}-gradient)`}
          />
        </svg>
        <svg
          className="problem-wave__layer problem-wave__layer--front"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`${waveGradientSecondaryId}-gradient`} x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.7)" />
              <stop offset="45%" stopColor="rgba(240, 253, 244, 0.65)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
          </defs>
          <path
            d="M0,256L48,234.7C96,213,192,171,288,144C384,117,480,107,576,117.3C672,128,768,160,864,176C960,192,1056,192,1152,186.7C1248,181,1344,171,1392,165.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            fill={`url(#${waveGradientSecondaryId}-gradient)`}
          />
        </svg>
      </div>

      <div className="container-spacing relative z-10">
  <div className="text-center space-y-4 mb-14 sm:mb-16" data-animate>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground" data-testid="text-problem-title">
            Wiemy, <span className="text-primary dark:text-emerald-300">przez co przechodzisz</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto copy-max" data-testid="text-problem-subtitle">
            16 godzin pracy dziennie, chaos w grafikach i ciągły strach przed kontrolą PIP.
            Nie jesteś sam z tymi problemami.
          </p>
        </div>

  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {problems.map((problem, index) => (
            <Card
              key={problem.id}
              data-animate="rise"
              data-animate-delay={`${index * 120}`}
              className="hover:calm-shadow-lg transition-all duration-500 bg-card/95 dark:bg-slate-900/70 border border-border/70 dark:border-white/10 backdrop-blur-sm"
              data-testid={`card-problem-${problem.id}`}
            >
              <div className="tinted-media w-full h-48 bg-muted rounded-t-xl overflow-hidden">
                <Image
                  src={problem.image}
                  alt={problem.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  priority={problem.id === "schedule-chaos" || problem.id === "legal-compliance"}
                  data-testid={`img-problem-${problem.id}`}
                />
              </div>
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground" data-testid={`text-title-${problem.id}`}>
                    {problem.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground" data-testid={`text-description-${problem.id}`}>
                    {problem.description}
                  </p>

                  {problem.risk && (
                    <div
                      className="rounded-xl border border-accent/20 bg-accent/10 p-4 sm:p-5 shadow-[0_12px_30px_-24px_rgba(253,126,20,0.65)]"
                      data-testid={`risk-warning-${problem.id}`}
                      data-animate="rise"
                      data-animate-once
                      data-animate-delay="80"
                    >
                      <div className="flex items-start gap-3 text-accent">
                        <AlertTriangle className="mt-0.5 h-5 w-5" />
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold uppercase tracking-wide text-accent/80">
                            {problem.risk.label}
                          </span>
                          <span className="text-2xl font-semibold">
                            {formatNumber(problem.risk.amount)}
                            {problem.risk.suffix}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {problem.legalIssues && (
                    <div className="space-y-2 text-sm text-muted-foreground">
                      {problem.legalIssues.map((issue, issueIndex) => (
                        <div key={issueIndex} className="flex items-center" data-testid={`legal-issue-${issueIndex}`}>
                          <XCircle className="mr-2 h-4 w-4 text-red-500" />
                          {issue}
                        </div>
                      ))}
                    </div>
                  )}

                  {problem.timeBreakdown && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{problem.timeBreakdown.shop.label}</span>
                        <span className="font-medium" data-testid="stat-shop-hours">
                          {formatNumber(problem.timeBreakdown.shop.value)}h/msc
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{problem.timeBreakdown.paperwork.label}</span>
                        <span className="font-medium" data-testid="stat-paperwork-hours">
                          {problem.timeBreakdown.paperwork.prefix}
                          {formatNumber(problem.timeBreakdown.paperwork.value)}h/msc
                        </span>
                      </div>
                      <hr className="border-border" />
                      <div className="flex items-center justify-between font-semibold text-accent">
                        <span>{problem.timeBreakdown.total.label}</span>
                        <span data-testid="stat-total-hours">
                          {formatNumber(problem.timeBreakdown.total.value)}h/msc
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
