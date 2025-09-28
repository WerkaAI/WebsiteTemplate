"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle2, Play, ShieldCheck, Award, Clock3, ArrowRight, AlertTriangle, ClipboardList, FileWarning, Users, CalendarClock } from "lucide-react";

export default function HeroSection() {
  const heroHighlights = [
    {
      icon: CheckCircle2,
      label: "149 zł miesięcznie",
      caption: "Stała cena za sklep"
    },
    {
      icon: Shield,
      label: "100% zgodność",
      caption: "Kodeks Pracy w pakiecie"
    },
    {
      icon: Award,
      label: "120+ kontroli PIP",
      caption: "Bez mandatów"
    },
    {
      icon: Clock3,
      label: "< 7 dni",
      caption: "Od wdrożenia do efektu"
    }
  ];

  const chaoticWeek = [
    {
      day: "Pon",
      person: "Jan 16h",
      issue: "Brak odpoczynku",
      accent: "bg-rose-500/15 text-rose-100 border border-rose-500/30",
      icon: AlertTriangle
    },
    {
      day: "Wt",
      person: "Anna 8h",
      issue: "UoP czy UZ?",
      accent: "bg-amber-500/15 text-amber-100 border border-amber-500/30",
      icon: FileWarning
    },
    {
      day: "Śr",
      person: "Piotr 12h",
      issue: "Przekroczone normy",
      accent: "bg-rose-500/15 text-rose-100 border border-rose-500/30",
      icon: AlertTriangle
    },
    {
      day: "Czw",
      person: "??? brak",
      issue: "Nie odbiera telefonów",
      accent: "bg-slate-500/15 text-slate-200 border border-slate-400/30",
      icon: Users
    },
    {
      day: "Pt",
      person: "Kasia 10h",
      issue: "Brak umowy",
      accent: "bg-amber-500/15 text-amber-100 border border-amber-500/30",
      icon: ClipboardList
    },
    {
      day: "Sob",
      person: "Jan + Anna",
      issue: "Konflikt dostępności",
      accent: "bg-rose-500/15 text-rose-100 border border-rose-500/30",
      icon: Users
    },
    {
      day: "Nie",
      person: "Zamknięte?",
      issue: "Nikt nie potwierdził",
      accent: "bg-slate-500/15 text-slate-200 border border-slate-400/30",
      icon: CalendarClock
    }
  ];

  return (
    <section className="hero-gradient section-padding">
      <div className="container-spacing">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 fade-in-up">
            <div className="space-y-4">
              <h1 className="heading-display font-bold text-foreground" data-testid="text-hero-title">
                Odzyskaj <span className="text-primary">swój czas</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed copy-max" data-testid="text-hero-subtitle">
                Zarządzaj sklepem, a nie grafikami. AutoŻaba to Twoja automatyczna tarcza prawna, 
                która chroni przed karami PIP i daje spokój ducha.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <span className="cta-glow">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4 calm-shadow transition-all duration-300"
                  onClick={() => window.open('https://app.autozaba.pl/register', '_blank', 'noopener,noreferrer')}
                  data-testid="button-hero-register"
                >
                  Zacznij teraz →
                </Button>
              </span>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 transition-transform duration-300 hover:-translate-y-0.5"
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-hero-demo"
              >
                <Play className="w-5 h-5 mr-2" />
                Zobacz demo
              </Button>
            </div>

            <div className="text-sm text-muted-foreground copy-max">
              <Link href="#contact" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                <ShieldCheck className="w-4 h-4" />
                Dowiedz się, jak wygląda wdrożenie AutoŻaby
              </Link>
            </div>
            
            <div className="rounded-3xl border border-white/30 dark:border-white/10 bg-white/15 dark:bg-white/5 backdrop-blur-md shadow-[0_25px_60px_-35px_rgba(15,23,42,0.6)] p-6 sm:p-7 flex flex-col gap-5" data-testid="hero-trust-strip">
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-900/70 dark:text-emerald-200/70">Dlaczego AutoŻaba?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {heroHighlights.map(({ icon: Icon, label, caption }, index) => (
                  <div key={label} className="group rounded-2xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-white/5 px-4 py-3 flex items-start gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/60" data-testid={`hero-highlight-${index}`}>
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-200 flex items-center justify-center shadow-inner">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{label}</div>
                      <p className="text-xs text-muted-foreground/80">{caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative isolate">
              <div className="absolute inset-0 mx-auto h-[420px] w-[420px] rounded-full bg-emerald-500/20 blur-3xl opacity-30" aria-hidden="true" />
              <div className="relative rounded-[32px] border border-white/40 dark:border-white/10 bg-gradient-to-br from-emerald-400/15 via-slate-900/70 to-slate-950/80 px-8 py-10 shadow-[0_35px_55px_-30px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                <div className="absolute -top-5 left-8 rounded-full bg-amber-500 text-amber-50 px-5 py-2 text-sm font-semibold shadow-lg" data-testid="stress-indicator">
                  📣 Kontrola PIP za 2 dni!
                </div>
                <div className="space-y-6">
                  <header className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-emerald-200/70">Obecny grafik</p>
                      <h3 className="text-2xl font-semibold text-white" data-testid="text-schedule-title">Grudzień, tydzień 49</h3>
                    </div>
                    <div className="rounded-full bg-white/10 px-4 py-2 text-xs text-white/80 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-300" />
                      6 krytycznych alertów
                    </div>
                  </header>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {chaoticWeek.map(({ day, person, issue, accent, icon: Icon }, index) => (
                      <div key={day} className={`rounded-2xl p-4 text-xs sm:text-sm leading-tight ${accent} shadow-inner min-h-[110px] flex flex-col gap-2`} data-testid={`schedule-tile-${index}`}>
                        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em]">
                          <span>{day}</span>
                          <Icon className="h-4 w-4" />
                        </div>
                        <p className="text-sm font-semibold">{person}</p>
                        <p className="text-[11px] leading-snug opacity-90">{issue}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute -right-9 top-1/2 hidden translate-y-[-50%] lg:flex">
                  <div className="h-20 w-20 rounded-full bg-emerald-500 text-emerald-950 flex items-center justify-center shadow-[0_20px_45px_-25px_rgba(16,185,129,0.8)]">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
