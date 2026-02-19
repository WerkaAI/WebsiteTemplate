'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const DEFAULT_STORAGE_KEY = 'autozaba-onboarding-progress';
const DEFAULT_WELCOME_QUEST_ID = 'a0-witaj';

// Shop Levels Configuration
export const XP_PER_QUEST = 100;

export interface ShopLevel {
    level: number;
    title: string;
    minExp: number;
    icon: string;
}

export const SHOP_LEVELS: ShopLevel[] = [
    { level: 1, title: 'Kiosk', minExp: 0, icon: '🏪' },
    { level: 2, title: 'Mały Sklep', minExp: 300, icon: '🛒' },
    { level: 3, title: 'Supermarket', minExp: 1000, icon: '🏬' },
    { level: 4, title: 'Centrum', minExp: 2000, icon: '🏙️' },
    { level: 5, title: 'Imperium', minExp: 3500, icon: '👑' },
];

export const getLevelForExp = (exp: number): ShopLevel => {
    // Find the highest level where minExp <= exp
    return [...SHOP_LEVELS].reverse().find(l => exp >= l.minExp) || SHOP_LEVELS[0];
};

export const getNextLevel = (level: number): ShopLevel | null => {
    return SHOP_LEVELS.find(l => l.level === level + 1) || null;
};

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
    completedQuizzes: string[]; // Track completed quizzes
    earnedBadges: string[];
    earnedAchievements: AchievementId[];
    lastVisit: string;
    isFirstVisit: boolean;
    currentStreak: number;
    lastQuestCompletedAt: string | null;
    // New leveling fields
    currentExp: number;
    currentLevel: number; // 1-5
}

const DEFAULT_PROGRESS: OnboardingProgress = {
    completedQuests: [],
    completedQuizzes: [],
    earnedBadges: [],
    earnedAchievements: [],
    lastVisit: new Date().toISOString(),
    isFirstVisit: true,
    currentStreak: 0,
    lastQuestCompletedAt: null,
    currentExp: 0,
    currentLevel: 1,
};

export interface UseOnboardingProgressOptions {
    /** localStorage key — use different keys per role */
    storageKey?: string;
    /** ID of the welcome quest that auto-completes on first visit */
    welcomeQuestId?: string;
}

export function useOnboardingProgress(options?: UseOnboardingProgressOptions) {
    const storageKey = options?.storageKey ?? DEFAULT_STORAGE_KEY;
    const welcomeQuestId = options?.welcomeQuestId ?? DEFAULT_WELCOME_QUEST_ID;

    const [progress, setProgress] = useState<OnboardingProgress>(DEFAULT_PROGRESS);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showStreakCelebration, setShowStreakCelebration] = useState(false);
    const [newAchievement, setNewAchievement] = useState<AchievementId | null>(null);
    const streakTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Load from localStorage on mount + auto-complete welcome quest on first visit
    useEffect(() => {
        try {
            const stored = localStorage.getItem(storageKey);
            if (stored) {
                const parsed = JSON.parse(stored) as OnboardingProgress;
                // Validate parsed data has required fields
                if (parsed.completedQuests && Array.isArray(parsed.completedQuests)) {
                    // Migration: Ensure new fields exist if loading old data
                    const currentExp = parsed.currentExp || (parsed.completedQuests.length * XP_PER_QUEST);
                    const currentLevel = parsed.currentLevel || getLevelForExp(currentExp).level;
                    const completedQuizzes = parsed.completedQuizzes || [];

                    setProgress({
                        ...DEFAULT_PROGRESS, // Ensure all fields exist
                        ...parsed,
                        currentExp,
                        currentLevel,
                        completedQuizzes,
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
                    completedQuests: [welcomeQuestId],
                    currentExp: XP_PER_QUEST, // Award XP for welcome quest
                    lastVisit: new Date().toISOString(),
                    isFirstVisit: true,
                });
            }
        } catch (error) {
            console.warn('Failed to load onboarding progress, resetting:', error);
            localStorage.removeItem(storageKey); // Clear corrupt data
            setProgress({
                ...DEFAULT_PROGRESS,
                completedQuests: [welcomeQuestId],
                currentExp: XP_PER_QUEST,
                lastVisit: new Date().toISOString(),
                isFirstVisit: true,
            });
        }
        setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storageKey, welcomeQuestId]);

    // Save to localStorage whenever progress changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(storageKey, JSON.stringify(progress));
        }
    }, [progress, isLoaded, storageKey]);

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
        const dateNow = new Date();
        const newCompleted = [...prev.completedQuests, questId];

        // Calculate new streak
        let newStreak = prev.currentStreak;
        if (!prev.lastQuestCompletedAt) {
            newStreak = 1;
        } else {
            const lastDate = new Date(prev.lastQuestCompletedAt);
            const isSameDay = lastDate.toDateString() === dateNow.toDateString();

            // Check if last completion was yesterday
            const yesterday = new Date(dateNow);
            yesterday.setDate(yesterday.getDate() - 1);
            const isYesterday = lastDate.toDateString() === yesterday.toDateString();

            if (isSameDay) {
                // Streak stays the same, completed more quests today
            } else if (isYesterday) {
                newStreak += 1;
            } else {
                // Streak broken, reset to 1
                newStreak = 1;
            }
        }

        // Calculate XP and Level
        // Prevent XP exploit: Ensure we don't double count if something went wrong, 
        // but primarily relies on toggleQuest removing XP correctly.
        const newExp = prev.currentExp + XP_PER_QUEST;
        const newLevel = getLevelForExp(newExp).level;

        // Check for streak achievement
        let newAchievements = [...prev.earnedAchievements];
        // Earn streak achievement only if we actually hit the streak count (and strictly daily streaks)
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
            currentExp: newExp,
            currentLevel: newLevel,
        };
    }, [checkTimeAchievements]);

    // Helper for quest uncompletion
    const processQuestUncompletion = useCallback((prev: OnboardingProgress, questId: string): OnboardingProgress => {
        const newExp = Math.max(0, prev.currentExp - XP_PER_QUEST);
        const newLevel = getLevelForExp(newExp).level;

        return {
            ...prev,
            completedQuests: prev.completedQuests.filter(id => id !== questId),
            currentStreak: prev.currentStreak, // Keep streak on uncomplete
            currentExp: newExp,
            currentLevel: newLevel,
        };
    }, []);

    const completeQuiz = useCallback((quizId: string, xpReward: number) => {
        setProgress(prev => {
            if (prev.completedQuizzes.includes(quizId)) {
                return prev;
            }

            const newCompleted = [...prev.completedQuizzes, quizId];
            const newExp = prev.currentExp + xpReward;
            const newLevel = getLevelForExp(newExp).level;

            return {
                ...prev,
                completedQuizzes: newCompleted,
                currentExp: newExp,
                currentLevel: newLevel,
            };
        });
    }, []);

    const completeQuest = useCallback((questId: string) => {
        setProgress(prev => {
            if (prev.completedQuests.includes(questId)) {
                return prev;
            }
            return processQuestCompletion(prev, questId);
        });
    }, [processQuestCompletion]);

    const uncompleteQuest = useCallback((questId: string) => {
        setProgress(prev => {
            return processQuestUncompletion(prev, questId);
        });
    }, [processQuestUncompletion]);

    const toggleQuest = useCallback((questId: string) => {
        setProgress(prev => {
            if (prev.completedQuests.includes(questId)) {
                return processQuestUncompletion(prev, questId);
            }
            return processQuestCompletion(prev, questId);
        });
    }, [processQuestCompletion, processQuestUncompletion]);

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

    const isQuizCompleted = useCallback((quizId: string): boolean => {
        return progress.completedQuizzes.includes(quizId);
    }, [progress.completedQuizzes]);

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
            completedQuests: [welcomeQuestId], // Keep welcome quest
            isFirstVisit: false,
        });
        localStorage.removeItem(storageKey);
    }, [storageKey, welcomeQuestId]);

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
        completeQuiz,
        isQuestCompleted,
        isQuizCompleted,
        isBadgeEarned,
        isAchievementEarned,
        getCompletionPercentage,
        resetProgress,
        clearNewAchievement,
    };
}

