"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Shield,
  CheckCircle2,
  Play,
  ShieldCheck,
  Award,
  Clock3,
  AlertTriangle,
  FileWarning,
  Users,
  CalendarClock,
  ClipboardList,
} from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { APP_URLS } from "@/lib/config";
import { motion } from "framer-motion";

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

    const renderCard = (
      rotateX: number,
      rotateY: number,
      glowValue: number
    ) => {
      board.style.transform = `perspective(1100px) rotateX(${rotateX.toFixed(
        2
      )}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(0)`;

      const clampedGlow = Math.min(1, Math.max(0, glowValue));
      const softenedGlow = clampedGlow ** 1.4;
      const glowOpacity = 0.16 + softenedGlow * 0.28;

      board.style.boxShadow =
        softenedGlow > 0.02
          ? `0 35px 70px -40px rgba(16, 185, 129, ${glowOpacity.toFixed(3)})`
          : baseShadow;

      if (orb) {
        const orbX = (rotateY / 12) * 30;
        const orbY = (rotateX / 12) * -30;
        const orbScale = 1 + softenedGlow * 0.04;
        orb.style.transform = `translate3d(${orbX.toFixed(2)}px, ${orbY.toFixed(
          2
        )}px, 0) scale(${orbScale.toFixed(3)})`;
      }
    };

    const applyFrame = () => {
      const pointerStiffness = 0.24;
      const glowStiffness = 0.08;
      const pointerThreshold = 0.0085;
      const glowThreshold = 0.01;

      pointerState.currentX +=
        (pointerState.targetX - pointerState.currentX) * pointerStiffness;
      pointerState.currentY +=
        (pointerState.targetY - pointerState.currentY) * pointerStiffness;
      glowCurrent += (glowTarget - glowCurrent) * glowStiffness;

      const deltaX = Math.abs(pointerState.targetX - pointerState.currentX);
      const deltaY = Math.abs(pointerState.targetY - pointerState.currentY);
      const deltaGlow = Math.abs(glowTarget - glowCurrent);
      const isSettling =
        deltaX < pointerThreshold &&
        deltaY < pointerThreshold &&
        deltaGlow < glowThreshold;

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
      pointerState.targetX = ((offsetY - rect.height / 2) / rect.height) * -5;
      pointerState.targetY = ((offsetX - rect.width / 2) / rect.width) * 7;
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
      label: "Program beta w toku",
      caption: "Zapisz się na listę pierwszych wdrożeń",
    },
    {
      icon: Shield,
      label: "100% zgodność",
      caption: "Kodeks Pracy w pakiecie",
    },
    {
      icon: Award,
      label: "120+ kontroli PIP",
      caption: "Bez mandatów",
    },
    {
      icon: Clock3,
      label: "< 7 dni",
      caption: "Od wdrożenia do efektu",
    },
  ];

  const chaoticWeek = [
    {
      day: "Pon",
      person: "Jan 16h",
      issue: "Brak odpoczynku",
      accent: "bg-rose-500/10 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-100 dark:border-rose-500/30",
      icon: AlertTriangle,
    },
    {
      day: "Wt",
      person: "Anna 8h",
      issue: "UoP czy UZ?",
      accent: "bg-amber-500/10 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-100 dark:border-amber-500/30",
      icon: FileWarning,
    },
    {
      day: "Śr",
      person: "Piotr 12h",
      issue: "Przekroczone normy",
      accent: "bg-rose-500/10 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-100 dark:border-rose-500/30",
      icon: AlertTriangle,
    },
    {
      day: "Czw",
      person: "??? brak",
      issue: "Nie odbiera telefonów",
      accent: "bg-slate-200/50 text-slate-600 border-slate-200 dark:bg-slate-500/15 dark:text-slate-200 dark:border-slate-400/30",
      icon: Users,
    },
    {
      day: "Pt",
      person: "Kasia 10h",
      issue: "Brak umowy",
      accent: "bg-amber-500/10 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-100 dark:border-amber-500/30",
      icon: ClipboardList,
    },
    {
      day: "Sob",
      person: "Jan + Anna",
      issue: "Konflikt dostępności",
      accent: "bg-rose-500/10 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-100 dark:border-rose-500/30",
      icon: Users,
    },
    {
      day: "Nie",
      person: "Zamknięte?",
      issue: "Nikt nie potwierdził",
      accent: "bg-slate-200/50 text-slate-600 border-slate-200 dark:bg-slate-500/15 dark:text-slate-200 dark:border-slate-400/30",
      icon: CalendarClock,
    },
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="hero" className="relative section-padding overflow-hidden">
      {/* Refined Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-50/50 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-[120px] dark:bg-emerald-500/10"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] dark:bg-blue-500/10"
        />
      </div>

      <div className="container-spacing relative z-10 px-6 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="space-y-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-6">
              <motion.div
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200"
                variants={itemVariants}
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Automatyczna Tarcza Prawna</span>
              </motion.div>

              <motion.h1
                className="heading-display font-bold text-slate-900 dark:text-white"
                variants={itemVariants}
                data-testid="text-hero-title"
              >
                Twój Cyfrowy{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-400 dark:to-emerald-300">
                  Pomocnik
                </span>
              </motion.h1>
              <motion.p
                className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed copy-max"
                variants={itemVariants}
                data-testid="text-hero-subtitle"
              >
                Zarządzaj sklepem, a nie grafikami. AutoŻaba to Twój asystent,
                który automatyzuje pracę, chroni przed karami PIP i daje Ci spokój ducha.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col items-stretch text-center sm:text-left sm:flex-row sm:items-center sm:justify-start gap-4"
              variants={itemVariants}
            >
              <span className="cta-glow w-full sm:w-auto">
                <Button
                  size="touch"
                  className="bg-emerald-600 text-white hover:bg-emerald-700 text-lg px-9 shadow-xl shadow-emerald-500/20 transition-all duration-300 w-full sm:w-auto justify-center"
                  onClick={() =>
                    window.open(
                      APP_URLS.register,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  data-testid="button-hero-register"
                >
                  Zacznij teraz →
                </Button>
              </span>
              <Button
                variant="outline"
                size="touch"
                className="text-lg px-9 transition-transform duration-300 hover:-translate-y-0.5 bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-emerald-700 dark:bg-white/5 dark:text-white dark:border-white/10 dark:hover:bg-white/10 w-full sm:w-auto justify-center"
                onClick={() =>
                  document
                    .getElementById("demo")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-testid="button-hero-demo"
              >
                <Play className="w-5 h-5 mr-2" />
                Zobacz demo
              </Button>
            </motion.div>

            <motion.div
              className="pt-4 border-t border-slate-200 dark:border-white/10"
              variants={itemVariants}
            >
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
                Zaufali nam franczyzobiorcy z całej Polski:
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Placeholders for logos or stats */}
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-500" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">120+ Sklepów</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-500" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">0 Mandatów</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="relative hidden md:block perspective-1000">
            <motion.div
              className="relative isolate mx-auto w-full max-w-[460px]"
              initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <div
                ref={orbRef}
                className="absolute inset-0 -z-10 mx-auto aspect-square w-full max-w-[460px] rounded-full bg-emerald-400/20 blur-[80px] opacity-60 hero-orb mix-blend-multiply dark:mix-blend-screen dark:bg-emerald-500/30"
                aria-hidden="true"
              />

              <div
                ref={boardRef}
                className="relative w-full"
              >
                <motion.div
                  className="absolute -top-6 -right-6 z-20 rounded-2xl bg-white dark:bg-slate-800 p-4 shadow-xl badge-pulse border border-slate-100 dark:border-slate-700"
                  data-testid="stress-indicator"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Alert</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Kontrola PIP za 2 dni!</p>
                    </div>
                  </div>
                </motion.div>

                <div className="rounded-[32px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-2xl p-6 sm:p-8 transition-transform duration-500 ease-out will-change-transform">
                  <div className="space-y-6">
                    <header className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                          Obecny grafik
                        </p>
                        <h3
                          className="text-xl font-bold text-slate-900 dark:text-white"
                          data-testid="text-schedule-title"
                        >
                          Grudzień, tydzień 49
                        </h3>
                      </div>
                      <div className="rounded-full bg-rose-50 dark:bg-rose-500/10 px-3 py-1 text-xs font-bold text-rose-600 dark:text-rose-300 flex items-center gap-1.5 border border-rose-100 dark:border-rose-500/20">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        6 błędów
                      </div>
                    </header>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {chaoticWeek.map(
                        ({ day, person, issue, accent, icon: Icon }, index) => (
                          <motion.div
                            key={day}
                            className={`rounded-xl p-3 text-xs leading-tight border ${accent} transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default`}
                            data-testid={`schedule-tile-${index}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                          >
                            <div className="flex items-center justify-between mb-2 opacity-80">
                              <span className="font-semibold">{day}</span>
                              <Icon className="h-3.5 w-3.5" />
                            </div>
                            <p className="font-bold mb-1">{person}</p>
                            <p className="text-[10px] opacity-90 font-medium">
                              {issue}
                            </p>
                          </motion.div>
                        )
                      )}
                    </div>

                    <div className="pt-2 text-center">
                      <p className="text-xs text-slate-400 dark:text-slate-500 italic">
                        System wykrył naruszenia Kodeksu Pracy
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
