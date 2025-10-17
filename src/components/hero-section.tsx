"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle2, Play, ShieldCheck, Award, Clock3, ArrowRight, AlertTriangle, ClipboardList, FileWarning, Users, CalendarClock } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export default function HeroSection() {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeHighlight, setActiveHighlight] = useState(0);

  useEffect(() => {
    const board = boardRef.current;
    const orb = orbRef.current;

    if (!board || prefersReducedMotion) {
      if (board) {
        board.style.transform = "";
        board.style.boxShadow = "";
      }
      if (orb) {
        orb.style.transform = "";
      }
      return;
    }

    const baseTransform = board.style.transform;
    const { boxShadow: baseShadow } = getComputedStyle(board);
    const baseOrbTransform = orb?.style.transform ?? "";
    const pointerState = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
    };

  let glowTarget = 0;
  let glowCurrent = 0;
    let rafId: number | null = null;
    let animating = false;

    const renderCard = (rotateX: number, rotateY: number, glowValue: number) => {
      board.style.transform = `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(0)`;

      const clampedGlow = Math.min(1, Math.max(0, glowValue));
      const softenedGlow = clampedGlow ** 1.4;
      const glowOpacity = 0.16 + softenedGlow * 0.28;
      board.style.boxShadow = softenedGlow > 0.02 ? `0 35px 70px -40px rgba(16, 185, 129, ${glowOpacity.toFixed(3)})` : baseShadow;

      if (orb) {
        const orbX = (rotateY / 12) * 30;
        const orbY = (rotateX / 12) * -30;
        const orbScale = 1 + softenedGlow * 0.04;
        orb.style.transform = `translate3d(${orbX.toFixed(2)}px, ${orbY.toFixed(2)}px, 0) scale(${orbScale.toFixed(3)})`;
      }
    };

    const applyFrame = () => {
      const pointerStiffness = 0.24;
      const glowStiffness = 0.08;
      const pointerThreshold = 0.0085;
      const glowThreshold = 0.01;

      pointerState.currentX += (pointerState.targetX - pointerState.currentX) * pointerStiffness;
      pointerState.currentY += (pointerState.targetY - pointerState.currentY) * pointerStiffness;
      glowCurrent += (glowTarget - glowCurrent) * glowStiffness;

      const deltaX = Math.abs(pointerState.targetX - pointerState.currentX);
      const deltaY = Math.abs(pointerState.targetY - pointerState.currentY);
      const deltaGlow = Math.abs(glowTarget - glowCurrent);
      const isSettling = deltaX < pointerThreshold && deltaY < pointerThreshold && deltaGlow < glowThreshold;

      if (isSettling && glowTarget === 0) {
        board.style.transform = baseTransform;
        board.style.boxShadow = baseShadow;
        if (orb) {
          orb.style.transform = baseOrbTransform;
        }
        animating = false;
        rafId = null;
        return;
      }

      renderCard(pointerState.currentX, pointerState.currentY, glowCurrent);

      if (!isSettling || glowTarget !== 0) {
        rafId = requestAnimationFrame(applyFrame);
      } else {
        animating = false;
        rafId = null;
      }
    };

    const ensureAnimation = () => {
      if (animating) {
        return;
      }
      animating = true;
      pointerState.currentX = pointerState.targetX;
      pointerState.currentY = pointerState.targetY;
      rafId = requestAnimationFrame(applyFrame);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = board.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      pointerState.targetX = ((offsetY - rect.height / 2) / rect.height) * -9;
      pointerState.targetY = ((offsetX - rect.width / 2) / rect.width) * 11;
      pointerState.currentX = pointerState.targetX;
      pointerState.currentY = pointerState.targetY;
      glowCurrent = Math.max(glowCurrent, 0.35);
      glowTarget = 1;
      renderCard(pointerState.currentX, pointerState.currentY, glowCurrent);
      ensureAnimation();
    };

    const resetTilt = () => {
      pointerState.targetX = 0;
      pointerState.targetY = 0;
      glowTarget = 0;
      ensureAnimation();
    };

    board.addEventListener("pointermove", handlePointerMove);
    board.addEventListener("pointerenter", ensureAnimation);
    board.addEventListener("pointerleave", resetTilt);
    board.addEventListener("pointerdown", resetTilt);

    return () => {
      board.removeEventListener("pointermove", handlePointerMove);
      board.removeEventListener("pointerenter", ensureAnimation);
      board.removeEventListener("pointerleave", resetTilt);
      board.removeEventListener("pointerdown", resetTilt);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      animating = false;
      pointerState.targetX = 0;
      pointerState.targetY = 0;
      board.style.transform = baseTransform;
      board.style.boxShadow = baseShadow;
      if (orb) {
        orb.style.transform = baseOrbTransform;
      }
    };
  }, [prefersReducedMotion]);

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

  const highlightCount = heroHighlights.length;

  useEffect(() => {
    if (prefersReducedMotion || highlightCount <= 1) {
      setActiveHighlight(0);
      return;
    }
    const interval = window.setInterval(() => {
      setActiveHighlight((current) => (current + 1) % highlightCount);
    }, 3600);
    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, highlightCount]);

  return (
    <section id="hero" className="hero-gradient section-padding">
      <div className="container-spacing">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1
                className="heading-display font-bold text-foreground"
                data-animate="headline"
                data-animate-once
                data-testid="text-hero-title"
              >
                Odzyskaj <span className="text-primary dark:text-primary-foreground">swój czas</span>
              </h1>
              <p
                className="text-xl text-muted-foreground leading-relaxed copy-max"
                data-animate="rise"
                data-animate-delay="120"
                data-animate-once
                data-testid="text-hero-subtitle"
              >
                Zarządzaj sklepem, a nie grafikami. AutoŻaba to Twoja automatyczna tarcza prawna, 
                która chroni przed karami PIP i daje spokój ducha.
              </p>
            </div>
            
            <div
              className="flex flex-col items-stretch text-center sm:text-left sm:flex-row sm:items-center sm:justify-start gap-4"
              data-animate="rise"
              data-animate-delay="200"
              data-animate-once
            >
              <span className="cta-glow w-full sm:w-auto">
                <Button 
                  size="touch" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-9 calm-shadow transition-all duration-300 w-full sm:w-auto justify-center"
                  onClick={() => window.open('https://app.autozaba.pl/register', '_blank', 'noopener,noreferrer')}
                  data-testid="button-hero-register"
                >
                  Zacznij teraz →
                </Button>
              </span>
              <Button 
                variant="outline" 
                size="touch" 
                className="text-lg px-9 transition-transform duration-300 hover:-translate-y-0.5 bg-white text-primary border-white/70 hover:bg-white/90 dark:bg-white/10 dark:text-white dark:border-white/30 w-full sm:w-auto justify-center"
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-hero-demo"
              >
                <Play className="w-5 h-5 mr-2" />
                Zobacz demo
              </Button>
            </div>

            <div className="text-sm text-muted-foreground copy-max">
              <Link href="#contact" className="inline-flex items-center gap-2 text-primary dark:text-primary-foreground hover:text-primary/80 dark:hover:text-primary-foreground/80 transition-colors">
                <ShieldCheck className="w-4 h-4" />
                Dowiedz się, jak wygląda wdrożenie AutoŻaby
              </Link>
            </div>
            
            <div
              className="rounded-3xl border border-white/30 dark:border-white/10 bg-white/15 dark:bg-white/5 backdrop-blur-md shadow-[0_25px_60px_-35px_rgba(15,23,42,0.6)] p-5 sm:p-7 flex flex-col gap-5 w-full max-w-[340px] sm:max-w-md mx-auto sm:mx-0"
              data-animate="rise"
              data-animate-delay="260"
              data-animate-once
              data-testid="hero-trust-strip"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-900/70 dark:text-emerald-200/70">Dlaczego AutoŻaba?</p>
              {prefersReducedMotion ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {heroHighlights.map(({ icon: Icon, label, caption }, index) => (
                    <div
                      key={label}
                      className="group rounded-2xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-white/5 px-4 py-3 flex items-start gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-white/60"
                      data-testid={`hero-highlight-${index}`}
                    >
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
              ) : (
                <div className="relative" aria-live="polite">
                  <div className="overflow-hidden rounded-2xl">
                    <div className="relative flex" style={{ transform: `translateX(-${activeHighlight * 100}%)`, transition: "transform 600ms var(--motion-ease-out)" }}>
                      {heroHighlights.map(({ icon: Icon, label, caption }, index) => (
                        <div
                          key={label}
                          className="min-w-full px-4 py-3 flex items-start gap-3 bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-2xl"
                          data-testid={`hero-highlight-${index}`}
                        >
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
                  <div className="mt-3 flex items-center gap-2">
                    {heroHighlights.map((highlight, index) => (
                      <button
                        key={highlight.label}
                        onClick={() => setActiveHighlight(index)}
                        aria-pressed={index === activeHighlight}
                        className={`h-2.5 w-8 rounded-full transition-all duration-300 ${
                          index === activeHighlight ? "bg-emerald-400/90" : "bg-emerald-400/20 hover:bg-emerald-400/40"
                        }`}
                        aria-label={`Pokaż wyróżnienie ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="relative hidden md:block">
            <div className="relative isolate mx-auto w-full max-w-[420px] overflow-hidden rounded-[36px]">
              <div
                ref={orbRef}
                className="absolute inset-0 -z-10 mx-auto aspect-square w-full max-w-[420px] rounded-full bg-emerald-500/20 blur-3xl opacity-30 hero-orb"
                aria-hidden="true"
              />
              <div
                ref={boardRef}
                data-animate="scale"
                data-animate-delay="120"
                data-animate-once
                className="relative w-full rounded-[32px] border border-white/40 dark:border-white/10 bg-gradient-to-br from-emerald-400/15 via-slate-900/70 to-slate-950/80 px-6 py-10 shadow-[0_35px_55px_-30px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-transform duration-500 ease-out will-change-transform sm:px-8"
              >
                <div className="absolute -top-5 left-8 rounded-full bg-amber-500 text-amber-50 px-5 py-2 text-sm font-semibold shadow-lg badge-pulse" data-testid="stress-indicator">
                  📣 Kontrola PIP za 2 dni!
                </div>
                <div className="space-y-6">
                  <header className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-white/90 dark:text-emerald-200/80">Obecny grafik</p>
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
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <div className="rounded-3xl border border-emerald-200/60 bg-emerald-50/90 dark:bg-emerald-500/10 dark:border-emerald-400/25 p-5 space-y-4 shadow-[0_18px_48px_-28px_rgba(16,185,129,0.45)] w-full max-w-[340px] mx-auto">
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-900/70 dark:text-emerald-100/75">AutoŻaba w skrócie</p>
              <ul className="space-y-3 text-sm text-emerald-900/90 dark:text-emerald-100">
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5" />
                  <span>Automatyczna tarcza prawna – grafiki zgodne z Kodeksem Pracy.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock3 className="h-5 w-5" />
                  <span>Odzyskaj do 26 godzin miesięcznie bez chaosu w grafikach.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="h-5 w-5" />
                  <span>Zespół zgłasza dostępność w aplikacji – Ty masz pełną kontrolę.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
