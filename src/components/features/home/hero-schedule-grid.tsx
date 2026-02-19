"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Calendar, ShieldCheck } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const EMPLOYEES = ["Tadeusz", "Olga", "Andrzej", "Tomek", "Asia"] as const;
const DAYS = ["Pon", "Wt", "Śr", "Czw", "Pt"] as const;
const DAY_DATES = ["10.02", "11.02", "12.02", "13.02", "14.02"] as const;

type ShiftType = "morning" | "afternoon";

interface Shift {
  row: number;    // employee index
  col: number;    // day index
  start: string;
  end: string;
  type: ShiftType;
}

const SHIFTS: Shift[] = [
  { row: 0, col: 0, start: "05:30", end: "15:30", type: "morning" },
  { row: 0, col: 3, start: "05:30", end: "15:30", type: "morning" },
  { row: 1, col: 2, start: "08:00", end: "16:00", type: "morning" },
  { row: 2, col: 1, start: "05:30", end: "15:30", type: "morning" },
  { row: 3, col: 2, start: "13:30", end: "21:30", type: "afternoon" },
  { row: 3, col: 4, start: "13:30", end: "21:30", type: "afternoon" },
  { row: 4, col: 3, start: "13:30", end: "21:30", type: "afternoon" },
  { row: 4, col: 4, start: "13:30", end: "21:30", type: "afternoon" },
];

// Staffing status per day: negative = deficit before generation
const STAFFING_BEFORE = [-2, -1, -2, -1, -1];

/* ------------------------------------------------------------------ */
/*  ANIMATION PHASES                                                   */
/* ------------------------------------------------------------------ */

type Phase = "empty" | "problem" | "filling" | "complete";

const PHASE_TIMINGS = {
  empty: 800,       // grid fades in
  problem: 1200,    // status shows red deficits
  filling: 2000,    // tiles cascade in
  complete: 6000,   // green status + badge + toast, then reset
} as const;

const CYCLE_DURATION = Object.values(PHASE_TIMINGS).reduce((a, b) => a + b, 0);

/* ------------------------------------------------------------------ */
/*  SHIFT TILE STYLES                                                  */
/* ------------------------------------------------------------------ */

const SHIFT_STYLES: Record<ShiftType, string> = {
  morning:
    "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-500/15 dark:border-emerald-500/30 dark:text-emerald-200",
  afternoon:
    "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-500/15 dark:border-amber-500/30 dark:text-amber-200",
};

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function HeroScheduleGrid() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>(
    prefersReducedMotion ? "complete" : "empty"
  );
  const [cycleKey, setCycleKey] = useState(0);

  const advancePhase = useCallback(() => {
    setPhase((prev) => {
      switch (prev) {
        case "empty":
          return "problem";
        case "problem":
          return "filling";
        case "filling":
          return "complete";
        case "complete":
          return "empty";
      }
    });
  }, []);

  // Animation cycle controller
  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase("complete");
      return;
    }

    setPhase("empty");

    const timers: ReturnType<typeof setTimeout>[] = [];
    let cumulative = 0;

    const phases: Phase[] = ["problem", "filling", "complete", "empty"];
    const durations = [
      PHASE_TIMINGS.empty,
      PHASE_TIMINGS.problem,
      PHASE_TIMINGS.filling,
      PHASE_TIMINGS.complete,
    ];

    phases.forEach((p, i) => {
      cumulative += durations[i];
      timers.push(
        setTimeout(() => {
          if (p === "empty") {
            setCycleKey((k) => k + 1);
          }
          setPhase(p);
        }, cumulative)
      );
    });

    // Loop
    const loopTimer = setInterval(() => {
      setPhase("empty");
      setCycleKey((k) => k + 1);

      let innerCumulative = 0;
      phases.forEach((p, i) => {
        innerCumulative += durations[i];
        timers.push(
          setTimeout(() => {
            if (p === "empty") {
              setCycleKey((k) => k + 1);
            }
            setPhase(p);
          }, innerCumulative)
        );
      });
    }, CYCLE_DURATION);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loopTimer);
    };
  }, [prefersReducedMotion]);

  const showTiles = phase === "filling" || phase === "complete";
  const showProblem = phase === "problem";
  const showSuccess = phase === "complete";

  // Helper: does a shift exist at row,col?
  const getShift = (row: number, col: number) =>
    SHIFTS.find((s) => s.row === row && s.col === col);

  return (
    <div className="w-full select-none" aria-label="Podgląd harmonogramu pracy">
      {/* ── Card wrapper ── */}
      <div className="rounded-2xl lg:rounded-[28px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-2xl overflow-hidden">
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Harmonogram pracy
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 ml-2">
                Luty, tydzień 7
              </span>
            </div>
          </div>

          {/* Status pill */}
          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30"
              >
                <CheckCircle2 className="h-3 w-3" />
                Gotowy
              </motion.div>
            ) : showProblem ? (
              <motion.div
                key="err"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1 rounded-full bg-rose-50 dark:bg-rose-500/15 px-2.5 py-1 text-[10px] font-bold text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30"
              >
                <XCircle className="h-3 w-3" />
                Braki w obsadzie
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* ── Grid ── */}
        <div className="px-3 py-3 sm:px-4 sm:py-3">
          {/* Column headers */}
          <div className="grid grid-cols-[72px_repeat(5,1fr)] gap-[3px] sm:gap-1 mb-[3px] sm:mb-1">
            <div /> {/* empty corner */}
            {DAYS.map((day, i) => (
              <motion.div
                key={day}
                className="text-center py-1"
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.3 }}
              >
                <div className="text-[10px] font-bold text-slate-700 dark:text-slate-200 leading-none">
                  {day}
                </div>
                <div className="text-[9px] text-slate-400 dark:text-slate-500 leading-none mt-0.5">
                  {DAY_DATES[i]}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Rows */}
          {EMPLOYEES.map((emp, rowIdx) => (
            <motion.div
              key={`${emp}-${cycleKey}`}
              className="grid grid-cols-[72px_repeat(5,1fr)] gap-[3px] sm:gap-1 mb-[3px] sm:mb-1"
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + rowIdx * 0.06, duration: 0.3 }}
            >
              {/* Employee name */}
              <div className="flex items-center pr-1">
                <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 truncate leading-tight">
                  {emp}
                </span>
              </div>

              {/* Day cells */}
              {DAYS.map((_, colIdx) => {
                const shift = getShift(rowIdx, colIdx);
                const hasShift = !!shift;

                return (
                  <div
                    key={colIdx}
                    className={`relative rounded-md h-10 sm:h-11 transition-colors duration-300 ${
                      showProblem && !hasShift
                        ? "bg-rose-50/60 dark:bg-rose-500/5"
                        : "bg-slate-50/50 dark:bg-slate-800/30"
                    }`}
                  >
                    {/* Shift tile */}
                    {hasShift && (
                      <AnimatePresence>
                        {showTiles && (
                          <motion.div
                            key={`tile-${rowIdx}-${colIdx}-${cycleKey}`}
                            className={`absolute inset-0.5 rounded-md border flex flex-col items-center justify-center ${SHIFT_STYLES[shift.type]}`}
                            initial={
                              prefersReducedMotion
                                ? { opacity: 1, scale: 1 }
                                : { opacity: 0, scale: 0.3 }
                            }
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{
                              delay: prefersReducedMotion
                                ? 0
                                : colIdx * 0.15 + rowIdx * 0.06,
                              duration: 0.4,
                              ease: [0.34, 1.56, 0.64, 1], // backOut
                            }}
                          >
                            <span className="text-[9px] sm:text-[10px] font-bold leading-none">
                              {shift.start}
                            </span>
                            <span className="text-[9px] sm:text-[10px] font-bold leading-none mt-0.5">
                              {shift.end}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </motion.div>
          ))}

          {/* ── Staffing status row ── */}
          <div className="grid grid-cols-[72px_repeat(5,1fr)] gap-[3px] sm:gap-1 mt-1 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center">
              <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Obsada
              </span>
            </div>
            {STAFFING_BEFORE.map((deficit, i) => (
              <div key={i} className="flex items-center justify-center h-6">
                <AnimatePresence mode="wait">
                  {showSuccess ? (
                    <motion.div
                      key={`ok-${i}-${cycleKey}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        delay: prefersReducedMotion ? 0 : i * 0.08,
                        duration: 0.3,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                    </motion.div>
                  ) : showProblem ? (
                    <motion.div
                      key={`err-${i}-${cycleKey}`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{
                        delay: prefersReducedMotion ? 0 : i * 0.08,
                        duration: 0.3,
                      }}
                      className="flex items-center gap-0.5"
                    >
                      <XCircle className="h-3.5 w-3.5 text-rose-500 dark:text-rose-400" />
                      <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">
                        {deficit}
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`empty-${i}-${cycleKey}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      className="w-3 h-0.5 rounded-full bg-slate-300 dark:bg-slate-600"
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* ── Success toast ── */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              key={`toast-${cycleKey}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.5, duration: 0.4 }}
              className="mx-3 mb-3 sm:mx-4 sm:mb-4 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-3 py-2 flex items-center gap-2"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                Harmonogram pracy został pomyślnie utworzony
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Floating compliance badge ── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            key={`badge-${cycleKey}`}
            initial={{ opacity: 0, y: 12, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.3,
              duration: 0.5,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="absolute -top-4 -right-3 lg:-top-5 lg:-right-5 z-20 rounded-xl bg-white dark:bg-slate-800 p-3 shadow-xl border border-emerald-100 dark:border-emerald-500/20"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider leading-none">
                  Zgodność
                </p>
                <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight mt-0.5">
                  0 naruszeń KP
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
