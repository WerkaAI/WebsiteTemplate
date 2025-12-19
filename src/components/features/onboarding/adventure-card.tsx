'use client';

import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuestItem } from './quest-item';
import { QuizModal } from './quiz-modal';
import type { Adventure } from '@/lib/onboarding/onboarding-content';

interface AdventureCardProps {
    adventure: Adventure;
    completedQuests: string[];
    completedQuizzes?: string[];
    onToggleQuest: (questId: string) => void;
    onCompleteQuiz?: (quizId: string, xpReward: number) => void;
    onBadgeEarned?: (badgeId: string) => void;
    defaultExpanded?: boolean;
}

export const AdventureCard = memo(function AdventureCard({
    adventure,
    completedQuests,
    completedQuizzes = [],
    onToggleQuest,
    onCompleteQuiz,
    onBadgeEarned,
    defaultExpanded = false,
}: AdventureCardProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const [isQuizOpen, setIsQuizOpen] = useState(false);

    // Calculate completion
    const completedCount = adventure.quests.filter((q) =>
        completedQuests.includes(q.id)
    ).length;
    const totalQuests = adventure.quests.length;
    const isQuestsComplete = completedCount === totalQuests;
    const progressPercent = Math.round((completedCount / totalQuests) * 100);

    // Quiz logic
    const hasQuiz = !!adventure.quiz;
    const isQuizCompleted = hasQuiz && completedQuizzes?.includes(adventure.quiz!.id);
    const isQuizUnlocked = isQuestsComplete; // Quiz unlocks when all quests are done

    // Badge condition: All quests done AND (no quiz OR quiz completed)
    const isBadgeEarned = hasQuiz ? isQuizCompleted : isQuestsComplete;

    // Trigger badge earned when conditions met
    useEffect(() => {
        if (isBadgeEarned && onBadgeEarned) {
            onBadgeEarned(adventure.badge.id);
        }
    }, [isBadgeEarned, adventure.badge.id, onBadgeEarned]);

    return (
        <>
            <motion.div
                layout
                className={cn(
                    'rounded-2xl border overflow-hidden transition-all duration-300 backdrop-blur-sm',
                    isBadgeEarned
                        ? 'bg-gradient-to-br from-brand-green/10 to-brand-green-secondary/5 border-brand-green/30 shadow-[0_0_25px_-5px_rgba(var(--brand-green-rgb),0.15)]'
                        : 'bg-card/80 border-border/50 hover:border-brand-green/30 hover:shadow-lg hover:shadow-brand-green/5'
                )}
            >
                {/* Header */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full p-5 sm:p-6 flex items-center gap-4 sm:gap-5 text-left hover:bg-muted/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring min-h-[80px]"
                    aria-expanded={isExpanded}
                >
                    {/* Icon - smaller on mobile */}
                    <div
                        className={cn(
                            'flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-105 shadow-inner',
                            isBadgeEarned
                                ? 'bg-gradient-to-br from-brand-green to-brand-green-secondary text-white shadow-brand-green/20'
                                : 'bg-muted/50 text-muted-foreground'
                        )}
                    >
                        {isBadgeEarned ? <Trophy className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-md" /> : adventure.icon}
                    </div>

                    {/* Title & Progress */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-brand-green uppercase tracking-wider">
                                Przygoda {adventure.number}
                            </span>
                            {isBadgeEarned && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-green text-white"
                                >
                                    {adventure.badge.icon} {adventure.badge.name}
                                </motion.span>
                            )}
                        </div>
                        <h3 className="text-lg font-bold text-foreground mt-0.5">
                            {adventure.title}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                            {adventure.subtitle}
                        </p>

                        {/* Progress bar */}
                        <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-brand-green to-brand-green-secondary rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercent}%` }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {completedCount} / {totalQuests} misji ukończono
                        </p>
                    </div>

                    {/* Expand button */}
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                    >
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                </button>

                {/* Quests list */}
                <AnimatePresence initial={false}>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                        >
                            <div className="px-5 pb-5 space-y-3">
                                {adventure.quests.map((quest) => (
                                    <QuestItem
                                        key={quest.id}
                                        id={quest.id}
                                        title={quest.title}
                                        description={quest.description}
                                        timeEstimate={quest.timeEstimate}
                                        isCompleted={completedQuests.includes(quest.id)}
                                        onToggle={onToggleQuest}
                                        steps={quest.steps}
                                        media={quest.media}
                                        mediaVariants={quest.mediaVariants}
                                        difficulty={quest.difficulty}
                                        deepLink={quest.deepLink}
                                        canSkip={quest.canSkip}
                                        autoComplete={quest.autoComplete}
                                    />
                                ))}

                                {/* Boss Battle Section */}
                                {hasQuiz && (
                                    <div className="mt-6 pt-4 border-t border-dashed">
                                        <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                                            <div className="flex items-center justify-between gap-4 mb-3">
                                                <div>
                                                    <h4 className="font-bold flex items-center gap-2">
                                                        ⚔️ Boss Battle: Test Wiedzy
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Sprawdź się i zdobądź odznakę!
                                                    </p>
                                                </div>
                                                <div className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-md border border-amber-200">
                                                    +{adventure.quiz!.xpReward} XP
                                                </div>
                                            </div>

                                            {isQuizCompleted ? (
                                                <div className="w-full py-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-bold rounded-lg flex items-center justify-center gap-2 border border-green-200 dark:border-green-800">
                                                    <Trophy className="w-5 h-5" />
                                                    Boss Pokonany!
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setIsQuizOpen(true)}
                                                    disabled={!isQuizUnlocked}
                                                    className={cn(
                                                        "w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all",
                                                        isQuizUnlocked
                                                            ? "bg-brand-green text-white hover:bg-brand-green/90 shadow-md hover:shadow-lg"
                                                            : "bg-muted text-muted-foreground cursor-not-allowed opacity-70"
                                                    )}
                                                >
                                                    {isQuizUnlocked ? (
                                                        <>
                                                            <span className="text-xl">⚔️</span>
                                                            Rozpocznij Walkę
                                                        </>
                                                    ) : (
                                                        <>
                                                            🔒 Ukończ misje aby odblokować
                                                        </>
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Quiz Modal */}
            {hasQuiz && (
                <QuizModal
                    quiz={adventure.quiz!}
                    isOpen={isQuizOpen}
                    onClose={() => setIsQuizOpen(false)}
                    onComplete={(xp) => {
                        if (onCompleteQuiz) {
                            onCompleteQuiz(adventure.quiz!.id, xp);
                        }
                    }}
                />
            )}
        </>
    );
});
