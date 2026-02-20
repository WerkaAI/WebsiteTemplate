/**
 * ChatFlow — main chat container for employee onboarding.
 *
 * Layout:
 * ┌─ Progress bar (4px, top) ──────────────┐
 * │ Chapter header (title + step count)     │
 * │                                         │
 * │  [Scrollable message area]              │
 * │   🐸 Żabek message                     │
 * │   🐸 Żabek message                     │
 * │              User response ■            │
 * │   🐸 Żabek message                     │
 * │                                         │
 * │  [Pill buttons area]                    │
 * │                                         │
 * │ ── Quick Help shortcuts (bottom) ──     │
 * └─────────────────────────────────────────┘
 *
 * Features:
 * - Progressive message disclosure
 * - Typing indicator (delay-based)
 * - Auto-scroll to latest message
 * - Chapter map (sidebar on desktop, sheet on mobile)
 * - Celebration overlay on chapter complete
 * - Streak messages
 * - Return flow greeting
 */

'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { Map, RotateCcw, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet';
import { useChatProgress } from '@/lib/onboarding/use-chat-progress';
import { EMPLOYEE_CHAT_CHAPTERS } from '@/lib/onboarding/chat-employee-content';
import { ChatBubble } from './chat-bubble';
import { ChatButtons } from './chat-buttons';
import { ZabekEvolutionAvatar } from './zabek-evolution';
import { ChatBadgeCollection } from './chat-badge-collection';
import type { ChatChapter } from '@/lib/onboarding/chat-types';
import type { ZabekEvolution } from '@/lib/onboarding/chat-types';

// ─── Main Component ───────────────────────────────────────────────────

export function ChatFlow() {
    const {
        progress,
        currentChapter,
        currentStep,
        visibleMessages,
        isWaitingForAction,

        returnScenario,
        returnGreeting,

        handleButtonClick,
        jumpToStep,
        jumpToChapter,
        resetProgress,

        totalSteps,
        completedStepCount,
        skippedStepCount,
        percentComplete,
        userStatus,
        zabekEvolution,
        chapterStatuses,

        activeBranch,

        pendingCelebration,
        dismissCelebration,
    } = useChatProgress({ chapters: EMPLOYEE_CHAT_CHAPTERS });

    // ── Local state ──
    const [showMap, setShowMap] = useState(false);
    const [typingQueue, setTypingQueue] = useState<string[]>([]);
    const [shownMessageIds, setShownMessageIds] = useState<Set<string>>(new Set());
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const greetingDismissedRef = useRef(false);

    // ── Typing indicator logic ──
    // When visibleMessages changes, queue new messages for typing animation
    useEffect(() => {
        const newIds = visibleMessages
            .filter((m) => !shownMessageIds.has(m.id) && m.sender === 'zabek' && m.type !== 'buttons')
            .map((m) => m.id);

        if (newIds.length === 0) return;

        let timeoutId: ReturnType<typeof setTimeout>;
        let current = 0;

        function showNext() {
            if (current >= newIds.length) return;
            const id = newIds[current];
            setShownMessageIds((prev) => new Set([...Array.from(prev), id]));
            setTypingQueue((prev) => prev.filter((qId) => qId !== id));
            current++;
            if (current < newIds.length) {
                const nextMsg = visibleMessages.find((m) => m.id === newIds[current]);
                timeoutId = setTimeout(showNext, nextMsg?.delay ?? 400);
            }
        }

        // Queue typing indicators
        setTypingQueue(newIds);
        // Start showing after first delay
        const firstMsg = visibleMessages.find((m) => m.id === newIds[0]);
        timeoutId = setTimeout(showNext, firstMsg?.delay ?? 400);

        return () => clearTimeout(timeoutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visibleMessages.length, currentStep.id]);

    // Also mark non-zabek messages (user, system, buttons) as shown immediately
    useEffect(() => {
        const nonZabek = visibleMessages
            .filter((m) => (m.sender !== 'zabek' || m.type === 'buttons') && !shownMessageIds.has(m.id))
            .map((m) => m.id);
        if (nonZabek.length > 0) {
            setShownMessageIds((prev) => new Set([...Array.from(prev), ...nonZabek]));
        }
    }, [visibleMessages, shownMessageIds]);

    // Reset shown messages when step changes
    useEffect(() => {
        setShownMessageIds(new Set());
        setTypingQueue([]);
        // After first step load, dismiss the return greeting
        greetingDismissedRef.current = true;
    }, [currentStep.id]);

    // ── Auto-scroll ──
    useEffect(() => {
        if (scrollContainerRef.current) {
            requestAnimationFrame(() => {
                scrollContainerRef.current?.scrollTo({
                    top: scrollContainerRef.current.scrollHeight,
                    behavior: 'smooth',
                });
            });
        }
    }, [shownMessageIds.size, typingQueue.length, percentComplete]);

    // ── Messages to render ──
    const renderedMessages = useMemo(() => {
        return visibleMessages.filter((m) => shownMessageIds.has(m.id));
    }, [visibleMessages, shownMessageIds]);

    // Is typing currently happening?
    const isTyping = typingQueue.length > 0;

    // ── Stable badge list for memo ──
    const allBadges = useMemo(
        () => EMPLOYEE_CHAT_CHAPTERS.map((ch) => ch.badge),
        [],
    );

    // ── Button handler wrapper ──
    const onButtonClick = useCallback(
        (action: string, target?: string, branchId?: string, xpReward?: number) => {
            handleButtonClick(action, target, branchId, xpReward);
        },
        [handleButtonClick],
    );

    // ── Last buttons message ──
    const buttonsMessage = useMemo(() => {
        if (!isWaitingForAction) return null;
        const last = renderedMessages[renderedMessages.length - 1];
        return last?.type === 'buttons' ? last : null;
    }, [renderedMessages, isWaitingForAction]);

    // ── Chapter/step nav for map ──
    const stepStatuses = useMemo(() => {
        return currentChapter.steps.map((s) => {
            if (progress.completedSteps.includes(s.id)) return 'completed' as const;
            if (progress.skippedSteps.includes(s.id)) return 'skipped' as const;
            if (s.id === currentStep.id) return 'current' as const;
            return 'available' as const;
        });
    }, [currentChapter.steps, progress.completedSteps, progress.skippedSteps, currentStep.id]);

    // ── Is final step (for completion card) ──
    const isOnFinalStep = useMemo(() => {
        const lastChapter = EMPLOYEE_CHAT_CHAPTERS[EMPLOYEE_CHAT_CHAPTERS.length - 1];
        const lastStep = lastChapter.steps[lastChapter.steps.length - 1];
        return currentStep.id === lastStep.id;
    }, [currentStep.id]);

    return (
        <MotionConfig reducedMotion="user">
        <div className="flex flex-col h-[calc(100vh-12rem)] max-h-[700px] w-full max-w-2xl mx-auto relative">
            {/* ── Progress bar (top, 4px) ── */}
            <div className="h-1 w-full bg-muted rounded-full overflow-hidden shrink-0">
                <div
                    className="h-full bg-brand-green transition-all duration-500 ease-out motion-reduce:transition-none"
                    style={{ width: `${percentComplete}%` }}
                    role="progressbar"
                    aria-valuenow={percentComplete}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${completedStepCount} z ${totalSteps} kroków`}
                />
            </div>

            {/* ── Chapter header ── */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                    {/* Żabek evolution avatar (sm) */}
                    <ZabekEvolutionAvatar evolution={zabekEvolution} size="sm" />
                    <div className="min-w-0">
                        <h2 className="text-sm font-semibold text-foreground truncate">
                            {currentChapter.title}
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            {currentStep.title}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    {/* XP counter */}
                    <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full">
                        ⭐ {progress.totalXP} XP
                    </span>

                    {/* Menu toggle (chapter map) */}
                    <button
                        onClick={() => setShowMap(!showMap)}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                        aria-label="Mapa rozdziałów"
                    >
                        <Map className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>
            </div>

            {/* ── Scrollable message area ── */}
            <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth"
                role="log"
                aria-live="polite"
                aria-label="Historia rozmowy z Żabkiem"
            >
                {/* Return greeting (context-aware, only on mount) */}
                {returnGreeting && returnScenario === 'resume' && !greetingDismissedRef.current && renderedMessages.length <= 1 && (
                    <div className="flex justify-center motion-safe:animate-fade-in">
                        <div className="bg-brand-green/10 rounded-xl px-4 py-2 text-sm text-brand-green text-center">
                            <BubbleInlineMarkdown text={returnGreeting} />
                        </div>
                    </div>
                )}

                {/* Messages */}
                {renderedMessages
                    .filter((m) => m.type !== 'buttons')
                    .map((msg, idx, arr) => (
                        <ChatBubble
                            key={msg.id}
                            message={msg}
                            isLast={idx === arr.length - 1 && !isTyping}
                        />
                    ))}

                {/* Typing indicator */}
                {isTyping && (
                    <ChatBubble
                        message={{ id: 'typing', sender: 'zabek', type: 'text', content: '' }}
                        isTyping
                    />
                )}

                {/* Retry prompt — Żabek invites to redo skipped step */}
                {!isTyping && progress.skippedSteps.includes(currentStep.id) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3 items-start"
                    >
                        <div className="pt-1 shrink-0">
                            <ZabekEvolutionAvatar evolution={zabekEvolution} size="sm" />
                        </div>
                        <div className="space-y-2">
                            <div className="bg-brand-green/10 border border-brand-green/30 rounded-xl px-4 py-2.5 text-sm text-foreground">
                                Chcesz to zrobić?
                            </div>
                            <button
                                onClick={() => onButtonClick('retry')}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-brand-green text-white hover:bg-brand-green/90 transition-colors"
                            >
                                Pokaż mi 👀
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Chapter celebration — compact inline toast */}
                <AnimatePresence>
                    {pendingCelebration && !isTyping && (
                        <ChapterToast
                            chapter={pendingCelebration}
                            onDismiss={dismissCelebration}
                        />
                    )}
                </AnimatePresence>

                {/* Onboarding completion — only when on final step */}
                {percentComplete === 100 && !pendingCelebration && !isTyping && isOnFinalStep && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
                        className="mx-auto w-full max-w-sm"
                    >
                        {/* Card container */}
                        <div className="relative overflow-hidden rounded-2xl border border-brand-green/30 bg-gradient-to-b from-brand-green/5 via-background to-amber-50/30 dark:to-amber-900/10 p-6">
                            {/* Subtle celebration dots */}
                            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                                <div className="absolute top-3 left-4 w-1.5 h-1.5 rounded-full bg-brand-green/20 motion-safe:animate-pulse" />
                                <div className="absolute top-6 right-8 w-1 h-1 rounded-full bg-amber-400/30 motion-safe:animate-pulse" style={{ animationDelay: '0.5s' }} />
                                <div className="absolute bottom-8 left-8 w-1 h-1 rounded-full bg-brand-green/15 motion-safe:animate-pulse" style={{ animationDelay: '1s' }} />
                            </div>

                            {/* Żabek hero */}
                            <div className="flex flex-col items-center text-center relative z-10">
                                <motion.div
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <ZabekEvolutionAvatar evolution={zabekEvolution} size="lg" animate />
                                </motion.div>

                                <motion.div
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="mt-4 space-y-1"
                                >
                                    <h3 className="text-base font-bold text-foreground">
                                        Masz to! 🎉
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed max-w-[250px]">
                                        Znasz już AutoŻabę. Jeśli zapomnisz — wróć tu w każdej chwili.
                                    </p>
                                </motion.div>

                                {/* Stats row — XP + Badges */}
                                <motion.div
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.9 }}
                                    className="mt-5 flex items-center gap-3"
                                >
                                    <div className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200/60 dark:border-amber-700/40 rounded-full px-3 py-1.5">
                                        <span className="text-amber-600 dark:text-amber-300 font-semibold text-xs">
                                            ⭐ {progress.totalXP} XP
                                        </span>
                                    </div>
                                    <div className="flex gap-1 text-lg">
                                        {allBadges.map((b) => (
                                            <span
                                                key={b.id}
                                                className={cn(
                                                    'transition-opacity duration-500',
                                                    progress.badges.includes(b.id) ? 'opacity-100' : 'opacity-20',
                                                )}
                                                title={b.name}
                                            >
                                                {b.icon}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Skipped steps CTA */}
                                {skippedStepCount > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.2 }}
                                        className="mt-4"
                                    >
                                        <button
                                            onClick={() => setShowMap(true)}
                                            className="text-xs text-muted-foreground hover:text-brand-green transition-colors underline underline-offset-2 decoration-dotted"
                                        >
                                            {skippedStepCount} {skippedStepCount === 1 ? 'krok pominięty' : 'kroków pominiętych'} — wróć z mapy
                                        </button>
                                    </motion.div>
                                )}

                                {/* CTA — open app */}
                                <motion.div
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1.1 }}
                                    className="mt-5"
                                >
                                    <a
                                        href="https://app.example.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-brand-green text-white hover:bg-brand-green/90 transition-colors shadow-sm"
                                    >
                                        Otwórz aplikację
                                        <ChevronRight className="w-4 h-4" />
                                    </a>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* ── Buttons area (bottom) — hidden for completed/skipped steps ── */}
            {buttonsMessage && !isTyping && buttonsMessage.buttons &&
             !progress.completedSteps.includes(currentStep.id) &&
             !progress.skippedSteps.includes(currentStep.id) && (
                <div className="px-4 py-3 border-t border-border shrink-0">
                    {/* Question text above buttons */}
                    {buttonsMessage.content && (
                        <p className="text-sm text-center text-muted-foreground mb-2">
                            <BubbleInlineMarkdown text={buttonsMessage.content} />
                        </p>
                    )}
                    <ChatButtons
                        buttons={buttonsMessage.buttons}
                        onButtonClick={onButtonClick}
                    />
                </div>
            )}

            {/* ── "Next step" button for completed/skipped read-only steps ── */}
            {!isTyping &&
             (progress.completedSteps.includes(currentStep.id) || progress.skippedSteps.includes(currentStep.id)) &&
             !isOnFinalStep && (
                <div className="px-4 py-3 border-t border-border shrink-0 flex justify-center">
                    <button
                        onClick={() => {
                            // Find the next step in the current chapter or advance to next chapter
                            const stepIdx = currentChapter.steps.findIndex((s) => s.id === currentStep.id);
                            if (stepIdx < currentChapter.steps.length - 1) {
                                jumpToStep(currentChapter.steps[stepIdx + 1].id);
                            } else {
                                // Last step in chapter — jump to next chapter
                                const chIdx = EMPLOYEE_CHAT_CHAPTERS.findIndex((ch) => ch.id === currentChapter.id);
                                const nextCh = EMPLOYEE_CHAT_CHAPTERS[chIdx + 1];
                                if (nextCh) jumpToChapter(nextCh.id);
                            }
                        }}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium bg-brand-green text-white hover:bg-brand-green/90 transition-colors"
                    >
                        Dalej
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* ── Navigation Drawer (Sheet, left slide-in) ── */}
            <Sheet open={showMap} onOpenChange={setShowMap}>
                <SheetContent side="left" className="w-[85vw] sm:max-w-sm overflow-y-auto p-0">
                    <SheetHeader className="px-4 pt-4 pb-2">
                        <SheetTitle>Menu</SheetTitle>
                        <SheetDescription className="sr-only">Nawigacja onboardingu</SheetDescription>
                    </SheetHeader>
                    <DrawerContent
                        chapterStatuses={chapterStatuses}
                        stepStatuses={stepStatuses}
                        currentChapter={currentChapter}
                        completedSteps={progress.completedSteps}
                        skippedSteps={progress.skippedSteps}
                        allBadges={allBadges}
                        earnedBadgeIds={progress.badges}
                        zabekLevel={progress.zabekLevel}
                        zabekEvolution={zabekEvolution}
                        totalXP={progress.totalXP}
                        completedStepCount={completedStepCount}
                        totalSteps={totalSteps}
                        percentComplete={percentComplete}
                        onJumpToChapter={(id) => {
                            jumpToChapter(id);
                            setShowMap(false);
                        }}
                        onJumpToStep={(id) => {
                            jumpToStep(id);
                            setShowMap(false);
                        }}
                        onReset={() => {
                            resetProgress();
                            setShowMap(false);
                        }}
                    />
                </SheetContent>
            </Sheet>


        </div>
        </MotionConfig>
    );
}

// ─── Inline Markdown (bold only) for return greeting ──────────────────

function BubbleInlineMarkdown({ text }: { text: string }) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return (
        <>
            {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
                }
                return <span key={i}>{part}</span>;
            })}
        </>
    );
}

// ─── Drawer Content (replaces ChapterMapOverlay) ──────────────────────

interface DrawerContentProps {
    chapterStatuses: Array<{ chapter: ChatChapter; status: string }>;
    stepStatuses: readonly ('completed' | 'skipped' | 'current' | 'available')[];
    currentChapter: ChatChapter;
    completedSteps: string[];
    skippedSteps: string[];
    allBadges: Array<{ id: string; name: string; icon: string }>;
    earnedBadgeIds: string[];
    zabekLevel: number;
    zabekEvolution: ZabekEvolution;
    totalXP: number;
    completedStepCount: number;
    totalSteps: number;
    percentComplete: number;
    onJumpToChapter: (id: string) => void;
    onJumpToStep: (id: string) => void;
    onReset: () => void;
}

function DrawerContent({
    chapterStatuses,
    stepStatuses,
    currentChapter,
    completedSteps,
    skippedSteps,
    allBadges,
    earnedBadgeIds,
    zabekLevel,
    zabekEvolution,
    totalXP,
    completedStepCount,
    totalSteps,
    percentComplete,
    onJumpToChapter,
    onJumpToStep,
    onReset,
}: DrawerContentProps) {
    return (
        <div className="px-4 pb-6 space-y-6">
            {/* ── Section: Mapa rozdziałów ── */}
            <section>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    🗺️ Mapa rozdziałów
                </h4>
                <div className="space-y-2">
                    {chapterStatuses.map(({ chapter, status }) => {
                        const isCurrentChapter = chapter.id === currentChapter.id;
                        const chDone = chapter.steps.filter((s) => completedSteps.includes(s.id) && !skippedSteps.includes(s.id)).length;
                        const chSkipped = chapter.steps.filter((s) => skippedSteps.includes(s.id)).length;

                        return (
                            <div
                                key={chapter.id}
                                className={cn(
                                    'rounded-xl border p-3 transition-colors',
                                    status === 'completed' && 'bg-brand-green/5 border-brand-green/30',
                                    isCurrentChapter && status !== 'completed' && 'bg-muted/50 border-brand-green',
                                    !isCurrentChapter && status !== 'completed' && 'border-border',
                                )}
                            >
                                <button
                                    onClick={() => onJumpToChapter(chapter.id)}
                                    className="w-full text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{chapter.badge.icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-foreground truncate">
                                                {chapter.title}
                                            </h4>
                                            <p className="text-xs text-muted-foreground">
                                                {chapter.steps.length} kroków •{' '}
                                                {status === 'completed' ? (
                                                    <span className="text-brand-green">Ukończony ✓</span>
                                                ) : (
                                                    'W trakcie'
                                                )}
                                                {(chDone > 0 || chSkipped > 0) && (
                                                    <span className="ml-1 text-muted-foreground/70">
                                                        ({chDone} ✓{chSkipped > 0 ? ` · ${chSkipped} ⏭` : ''})
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                                    </div>
                                </button>

                                {/* Steps list (only for current chapter) */}
                                {isCurrentChapter && (
                                    <div className="ml-8 mt-2 space-y-1">
                                        {chapter.steps.map((step, idx) => {
                                            const sts = stepStatuses[idx];
                                            return (
                                                <button
                                                    key={step.id}
                                                    onClick={() => onJumpToStep(step.id)}
                                                    className={cn(
                                                        'flex items-center gap-2 w-full text-left py-1 px-2 rounded-lg text-xs transition-colors',
                                                        sts === 'completed' && 'text-brand-green',
                                                        sts === 'skipped' && 'text-muted-foreground line-through',
                                                        sts === 'current' && 'text-foreground font-medium bg-brand-green/10',
                                                        sts !== 'completed' && sts !== 'skipped' && sts !== 'current' && 'text-muted-foreground',
                                                    )}
                                                >
                                                    {sts === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                                                    {sts === 'current' && <Circle className="w-3.5 h-3.5 shrink-0 text-brand-green" />}
                                                    {sts === 'skipped' && <Circle className="w-3.5 h-3.5 shrink-0" />}
                                                    {sts !== 'completed' && sts !== 'current' && sts !== 'skipped' && <Circle className="w-3.5 h-3.5 shrink-0 text-muted-foreground/50" />}
                                                    <span className="truncate">{step.title}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ── Section: Twoja karta ── */}
            <section>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    🎴 Twoja karta
                </h4>
                <ChatBadgeCollection
                    allBadges={allBadges}
                    earnedBadgeIds={earnedBadgeIds}
                    zabekLevel={zabekLevel}
                    zabekEvolution={zabekEvolution}
                    totalXP={totalXP}
                    completedStepCount={completedStepCount}
                    totalSteps={totalSteps}
                    percentComplete={percentComplete}
                />
            </section>

            {/* ── Reset (destructive — always last) ── */}
            <div className="pt-4 border-t border-border">
                <button
                    onClick={() => {
                        if (window.confirm('Na pewno chcesz zresetować cały postęp? Tej operacji nie można cofnąć.')) {
                            onReset();
                        }
                    }}
                    className="flex items-center gap-2 text-xs text-destructive hover:text-destructive/80 transition-colors"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Resetuj postęp
                </button>
            </div>
        </div>
    );
}

// ─── Chapter Toast (compact inline celebration) ──────────────────────

interface ChapterToastProps {
    chapter: ChatChapter;
    onDismiss: () => void;
}

function ChapterToast({ chapter, onDismiss }: ChapterToastProps) {
    // Auto-dismiss after 3s
    useEffect(() => {
        const t = setTimeout(onDismiss, 3000);
        return () => clearTimeout(t);
    }, [onDismiss]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="flex items-center gap-3 mx-auto bg-brand-green/10 border border-brand-green/30 rounded-xl px-4 py-3 max-w-xs cursor-pointer"
            onClick={onDismiss}
            role="status"
            aria-label={`Rozdział ukończony: ${chapter.badge.name}`}
        >
            <span className="text-2xl shrink-0">{chapter.badge.icon}</span>
            <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                    {chapter.badge.name}
                </p>
                <p className="text-xs text-muted-foreground">
                    +{chapter.completionBonusXP} XP bonus ✨
                </p>
            </div>
        </motion.div>
    );
}
