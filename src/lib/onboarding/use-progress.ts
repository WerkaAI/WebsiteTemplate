'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_KEY = 'autozaba-onboarding-progress';
const WELCOME_QUEST_ID = 'a0-witaj';

// Hidden achievements (Easter Eggs)
export const HIDDEN_ACHIEVEMENTS = {
    'night-owl': { id: 'night-owl', name: 'Nocny Maratończyk', icon: '🦉', description: 'Ukończono quest po 22:00' },
    'speedrunner': { id: 'speedrunner', name: 'Speedrunner', icon: '⚡', description: 'Ukończono 5 questów w 5 minut' },
    'streak-3': { id: 'streak-3', name: 'Seria Mistrza', icon: '🔥', description: 'Ukończono 3 questy pod rząd' },
    'early-bird': { id: 'early-bird', name: 'Ranny Ptaszek', icon: '🐦', description: 'Ukończono quest przed 8:00' },
    'weekend-warrior': { id: 'weekend-warrior', name: 'Wojownik Weekendu', icon: '⚔️', description: 'Ukończono quest w weekend' },
} as const;

export type AchievementId = keyof typeof HIDDEN_ACHIEVEMENTS;

export interface OnboardingProgress {
    completedQuests: string[];
    earnedBadges: string[];
    earnedAchievements: AchievementId[];
    lastVisit: string;
    isFirstVisit: boolean;
    currentStreak: number;
    lastQuestCompletedAt: string | null;
}

const DEFAULT_PROGRESS: OnboardingProgress = {
    completedQuests: [],
    earnedBadges: [],
    earnedAchievements: [],
    lastVisit: new Date().toISOString(),
    isFirstVisit: true,
    currentStreak: 0,
    lastQuestCompletedAt: null,
};

export function useOnboardingProgress() {
    const [progress, setProgress] = useState<OnboardingProgress>(DEFAULT_PROGRESS);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showStreakCelebration, setShowStreakCelebration] = useState(false);
    const [newAchievement, setNewAchievement] = useState<AchievementId | null>(null);
    const streakTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Load from localStorage on mount + auto-complete welcome quest on first visit
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as OnboardingProgress;
                // Validate parsed data has required fields
                if (parsed.completedQuests && Array.isArray(parsed.completedQuests)) {
                    setProgress({
                        ...DEFAULT_PROGRESS, // Ensure all fields exist
                        ...parsed,
                        lastVisit: new Date().toISOString(),
                        isFirstVisit: false,
                    });
                } else {
                    throw new Error('Invalid progress data structure');
                }
            } else {
                // First visit - auto-complete the welcome quest
                setProgress({
                    ...DEFAULT_PROGRESS,
                    completedQuests: [WELCOME_QUEST_ID],
                    lastVisit: new Date().toISOString(),
                    isFirstVisit: true,
                });
            }
        } catch (error) {
            console.warn('Failed to load onboarding progress, resetting:', error);
            localStorage.removeItem(STORAGE_KEY); // Clear corrupt data
            setProgress({
                ...DEFAULT_PROGRESS,
                completedQuests: [WELCOME_QUEST_ID],
                lastVisit: new Date().toISOString(),
                isFirstVisit: true,
            });
        }
        setIsLoaded(true);
    }, []);

    // Cleanup streak timeout on unmount
    useEffect(() => {
        return () => {
            if (streakTimeoutRef.current) {
                clearTimeout(streakTimeoutRef.current);
            }
        };
    }, []);

    // Save to localStorage whenever progress changes
    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
            } catch (error) {
                console.warn('Failed to save onboarding progress:', error);
            }
        }
    }, [progress, isLoaded]);

    // Check for time-based achievements
    const checkTimeAchievements = useCallback((): AchievementId[] => {
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay();
        const newAchievements: AchievementId[] = [];

        // Night Owl: after 22:00
        if (hour >= 22 || hour < 5) {
            newAchievements.push('night-owl');
        }
        // Early Bird: before 8:00
        if (hour >= 5 && hour < 8) {
            newAchievements.push('early-bird');
        }
        // Weekend Warrior: Saturday (6) or Sunday (0)
        if (day === 0 || day === 6) {
            newAchievements.push('weekend-warrior');
        }

        return newAchievements;
    }, []);

    // Helper function for quest completion logic (shared between completeQuest and toggleQuest)
    const processQuestCompletion = useCallback((prev: OnboardingProgress, questId: string): OnboardingProgress => {
        const now = new Date().toISOString();
        const newCompleted = [...prev.completedQuests, questId];

        // Calculate new streak
        const newStreak = prev.currentStreak + 1;

        // Check for streak achievement
        let newAchievements = [...prev.earnedAchievements];
        if (newStreak >= 3 && !prev.earnedAchievements.includes('streak-3')) {
            newAchievements.push('streak-3');
            setNewAchievement('streak-3');
            setShowStreakCelebration(true);
            // Clear previous timeout and set new one
            if (streakTimeoutRef.current) {
                clearTimeout(streakTimeoutRef.current);
            }
            streakTimeoutRef.current = setTimeout(() => setShowStreakCelebration(false), 3000);
        }

        // Check time-based achievements
        const timeAchievements = checkTimeAchievements();
        timeAchievements.forEach(a => {
            if (!newAchievements.includes(a)) {
                newAchievements.push(a);
                setNewAchievement(a);
            }
        });

        return {
            ...prev,
            completedQuests: newCompleted,
            currentStreak: newStreak,
            lastQuestCompletedAt: now,
            earnedAchievements: newAchievements,
        };
    }, [checkTimeAchievements]);

    const completeQuest = useCallback((questId: string) => {
        setProgress(prev => {
            if (prev.completedQuests.includes(questId)) {
                return prev;
            }
            return processQuestCompletion(prev, questId);
        });
    }, [processQuestCompletion]);

    const uncompleteQuest = useCallback((questId: string) => {
        setProgress(prev => ({
            ...prev,
            completedQuests: prev.completedQuests.filter(id => id !== questId),
            currentStreak: 0, // Reset streak on uncomplete
        }));
    }, []);

    const toggleQuest = useCallback((questId: string) => {
        setProgress(prev => {
            if (prev.completedQuests.includes(questId)) {
                return {
                    ...prev,
                    completedQuests: prev.completedQuests.filter(id => id !== questId),
                    currentStreak: 0,
                };
            }
            return processQuestCompletion(prev, questId);
        });
    }, [processQuestCompletion]);

    const earnBadge = useCallback((badgeId: string) => {
        setProgress(prev => {
            if (prev.earnedBadges.includes(badgeId)) {
                return prev;
            }
            return {
                ...prev,
                earnedBadges: [...prev.earnedBadges, badgeId],
            };
        });
    }, []);

    const earnAchievement = useCallback((achievementId: AchievementId) => {
        setProgress(prev => {
            if (prev.earnedAchievements.includes(achievementId)) {
                return prev;
            }
            setNewAchievement(achievementId);
            return {
                ...prev,
                earnedAchievements: [...prev.earnedAchievements, achievementId],
            };
        });
    }, []);

    const isQuestCompleted = useCallback((questId: string): boolean => {
        return progress.completedQuests.includes(questId);
    }, [progress.completedQuests]);

    const isBadgeEarned = useCallback((badgeId: string): boolean => {
        return progress.earnedBadges.includes(badgeId);
    }, [progress.earnedBadges]);

    const isAchievementEarned = useCallback((achievementId: AchievementId): boolean => {
        return progress.earnedAchievements.includes(achievementId);
    }, [progress.earnedAchievements]);

    const getCompletionPercentage = useCallback((totalQuests: number): number => {
        if (totalQuests === 0) return 0;
        return Math.round((progress.completedQuests.length / totalQuests) * 100);
    }, [progress.completedQuests.length]);

    const resetProgress = useCallback(() => {
        setProgress({
            ...DEFAULT_PROGRESS,
            completedQuests: [WELCOME_QUEST_ID], // Keep welcome quest
            isFirstVisit: false,
        });
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    const clearNewAchievement = useCallback(() => {
        setNewAchievement(null);
    }, []);

    return {
        progress,
        isLoaded,
        isFirstVisit: progress.isFirstVisit,
        showStreakCelebration,
        newAchievement,
        completeQuest,
        uncompleteQuest,
        toggleQuest,
        earnBadge,
        earnAchievement,
        isQuestCompleted,
        isBadgeEarned,
        isAchievementEarned,
        getCompletionPercentage,
        resetProgress,
        clearNewAchievement,
    };
}

