/**
 * Badge Collection Card ("Twoja karta") for chat-based onboarding.
 *
 * Design specs (ONBOARDING_DEEP_RETHINK.md, Natalia):
 * - Grid of earned badges (circle SVGs)
 * - Unearned badges = not visible (no grey placeholders)
 * - Simple, clean, no excessive animations
 * - Mascot evolution preview at top
 * - Accessible from chapter map overlay
 *
 * Phase 1B feature — gamification polish.
 */

'use client';

import { memo } from 'react';
import { cn } from '@/lib/utils';
import { ZabekEvolutionAvatar, ZabekEvolutionPreview } from './zabek-evolution';
import type { ZabekEvolution } from '@/lib/onboarding/chat-types';

interface BadgeInfo {
    id: string;
    name: string;
    icon: string;
}

interface ChatBadgeCollectionProps {
    /** All badges defined in chapters */
    allBadges: BadgeInfo[];
    /** IDs of badges the user has earned */
    earnedBadgeIds: string[];
    /** Current mascot evolution level (0-4) */
    zabekLevel: number;
    /** Current mascot evolution type */
    zabekEvolution: ZabekEvolution;
    /** Total XP */
    totalXP: number;
    /** Number of completed steps (including skips) */
    completedStepCount: number;
    /** Total number of steps */
    totalSteps: number;
    /** Percent complete (0-100) */
    percentComplete: number;
    /** Additional CSS classes */
    className?: string;
}

export const ChatBadgeCollection = memo(function ChatBadgeCollection({
    allBadges,
    earnedBadgeIds,
    zabekLevel,
    zabekEvolution,
    totalXP,
    completedStepCount,
    totalSteps,
    percentComplete,
    className,
}: ChatBadgeCollectionProps) {
    const earnedBadges = allBadges.filter((b) => earnedBadgeIds.includes(b.id));
    const hasAnyBadge = earnedBadges.length > 0;

    return (
        <div
            role="region"
            aria-label="Twoja karta postępu"
            className={cn('space-y-5', className)}
        >
            {/* ── Mascot Evolution ── */}
            <div className="text-center">
                <ZabekEvolutionAvatar
                    evolution={zabekEvolution}
                    size="lg"
                    showLabel
                    className="mx-auto mb-3"
                />
                <ZabekEvolutionPreview
                    currentLevel={zabekLevel}
                    className="justify-center"
                />
            </div>

            {/* ── Stats row ── */}
            <div className="flex justify-center gap-4">
                <div className="text-center" aria-label={`${totalXP} punktów doświadczenia`}>
                    <span className="block text-lg font-bold text-amber-600 dark:text-amber-400" aria-hidden="true">
                        {totalXP}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wide" aria-hidden="true">
                        XP
                    </span>
                </div>
                <div className="w-px bg-border" aria-hidden="true" />
                <div className="text-center" aria-label={`${completedStepCount} z ${totalSteps} kroków przejrzanych`}>
                    <span className="block text-lg font-bold text-brand-green" aria-hidden="true">
                        {completedStepCount}/{totalSteps}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wide" aria-hidden="true">
                        Kroków
                    </span>
                </div>
                <div className="w-px bg-border" aria-hidden="true" />
                <div className="text-center" aria-label={`${earnedBadges.length} z ${allBadges.length} odznak zdobytych`}>
                    <span className="block text-lg font-bold text-foreground" aria-hidden="true">
                        {earnedBadges.length}/{allBadges.length}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wide" aria-hidden="true">
                        Odznaki
                    </span>
                </div>
            </div>

            {/* ── Earned Badges Grid ── */}
            {hasAnyBadge ? (
                <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                        Zdobyte odznaki
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                        {earnedBadges.map((badge) => (
                            <div
                                key={badge.id}
                                className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-700/30"
                            >
                                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-800/30 flex items-center justify-center text-xl shrink-0">
                                    {badge.icon}
                                </div>
                                <span className="text-xs font-medium text-foreground leading-snug">
                                    {badge.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">
                        Ukończ pierwszy rozdział aby zdobyć odznakę! 🏅
                    </p>
                </div>
            )}
        </div>
    );
});
