'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuestItem } from './quest-item';
import type { Adventure } from '@/lib/onboarding/onboarding-content';

interface AdventureCardProps {
    adventure: Adventure;
    completedQuests: string[];
    onToggleQuest: (questId: string) => void;
    onBadgeEarned?: (badgeId: string) => void;
    defaultExpanded?: boolean;
}

export function AdventureCard({
    adventure,
    completedQuests,
    onToggleQuest,
    onBadgeEarned,
    defaultExpanded = false,
}: AdventureCardProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    // Calculate completion
    const completedCount = adventure.quests.filter((q) =>
        completedQuests.includes(q.id)
    ).length;
    const totalQuests = adventure.quests.length;
    const isComplete = completedCount === totalQuests;
    const progressPercent = Math.round((completedCount / totalQuests) * 100);

    // Trigger badge earned when adventure completes
    useEffect(() => {
        if (isComplete && onBadgeEarned) {
            onBadgeEarned(adventure.badge.id);
        }
    }, [isComplete, adventure.badge.id, onBadgeEarned]);

    return (
        <motion.div
            layout
            className={cn(
                'rounded-2xl border overflow-hidden transition-all duration-300',
                isComplete
                    ? 'bg-gradient-to-br from-brand-green/5 to-brand-green-secondary/5 border-brand-green/30'
                    : 'bg-card border-border'
            )}
        >
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-4 sm:p-5 flex items-center gap-3 sm:gap-4 text-left hover:bg-muted/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring min-h-[72px]"
                aria-expanded={isExpanded}
            >
                {/* Icon - smaller on mobile */}
                <div
                    className={cn(
                        'flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-2xl sm:text-3xl',
                        isComplete
                            ? 'bg-brand-green text-white'
                            : 'bg-muted'
                    )}
                >
                    {isComplete ? <Trophy className="w-6 h-6 sm:w-7 sm:h-7" /> : adventure.icon}
                </div>

                {/* Title & Progress */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-brand-green uppercase tracking-wider">
                            Przygoda {adventure.number}
                        </span>
                        {isComplete && (
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
                        {completedCount} / {totalQuests} ukończono
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
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
