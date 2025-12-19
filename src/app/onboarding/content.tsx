'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, RotateCcw, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    AdventureCard,
    BadgeDisplay,
    ZabekGuide,
    CheatSheetPanel,
} from '@/components/features/onboarding';
import { ShopLevelDisplay } from '@/components/features/onboarding/shop-level-display';
import { OnboardingSkeleton } from '@/components/features/onboarding/skeleton-loader';
import { ADVENTURES, getAllQuests } from '@/lib/onboarding/onboarding-content';
import { useOnboardingProgress, HIDDEN_ACHIEVEMENTS } from '@/lib/onboarding/use-progress';

export function OnboardingPageContent() {
    const {
        progress,
        isLoaded,
        isFirstVisit,
        showStreakCelebration,
        newAchievement,
        toggleQuest,
        earnBadge,
        isBadgeEarned,
        getCompletionPercentage,
        resetProgress,
        clearNewAchievement,
        completeQuiz,
    } = useOnboardingProgress();

    const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    // Calculate total quests
    const totalQuests = useMemo(() => getAllQuests().length, []);
    const completionPercentage = getCompletionPercentage(totalQuests);

    // All badges
    const allBadges = useMemo(
        () => ADVENTURES.map((adventure) => adventure.badge),
        []
    );

    // Żabek messages based on progress - with anxiety reduction
    const zabekMessage = useMemo(() => {
        if (!isLoaded) return null;

        // First visit - warm welcome
        if (isFirstVisit) {
            return 'Cześć, Żabianie! 👋 Witaj w swojej przygodzie! Spokojnie, wszystko jest proste - idź krok po kroku. 🐸';
        }

        // Streak celebration
        if (showStreakCelebration) {
            return '🔥 SERIA 3! Jesteś w gazie! Tak trzymaj! 🔥';
        }

        // Achievement earned
        if (newAchievement && HIDDEN_ACHIEVEMENTS[newAchievement]) {
            const achievement = HIDDEN_ACHIEVEMENTS[newAchievement];
            return `${achievement.icon} Odkryłeś ukryte osiągnięcie: ${achievement.name}! ${achievement.icon}`;
        }

        if (completionPercentage === 0) {
            return 'Gotowy na przygodę? Kliknij pierwszą misję! Nie martw się - możesz to cofnąć w każdej chwili. 😊';
        }
        if (completionPercentage < 25) {
            return 'Świetny start! Pamiętaj - to normalne, że na początku jest dużo nowego. Idź swoim tempem! 💪';
        }
        if (completionPercentage < 50) {
            return 'Już prawie połowa! Widzisz? To wcale nie takie trudne! 🌟';
        }
        if (completionPercentage < 75) {
            return 'Wow, robisz niesamowite postępy! Jesteś naturalnym talentem! 🚀';
        }
        if (completionPercentage < 100) {
            return 'Prawie mistrz! Jeszcze kilka kroków i będziesz znać system jak własną kieszeń! 🏆';
        }
        return 'Gratulacje, Żabozbawco! Ukończyłeś wszystkie przygody! 🎉🐸';
    }, [completionPercentage, isLoaded, isFirstVisit, showStreakCelebration, newAchievement]);

    // Clear achievement notification after 5 seconds
    useEffect(() => {
        if (newAchievement) {
            const timer = setTimeout(() => clearNewAchievement(), 5000);
            return () => clearTimeout(timer);
        }
    }, [newAchievement, clearNewAchievement]);

    // Show confetti when 100% complete
    useEffect(() => {
        if (completionPercentage === 100 && isLoaded) {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [completionPercentage, isLoaded]);

    // Loading state
    if (!isLoaded) {
        return <OnboardingSkeleton />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
            {/* Cheat Sheet Panel (side drawer) */}
            <CheatSheetPanel
                isOpen={isCheatSheetOpen}
                onClose={() => setIsCheatSheetOpen(false)}
            />

            {/* Fixed Cheat Sheet Button - iOS safe area + larger touch target on mobile */}
            <motion.button
                onClick={() => setIsCheatSheetOpen(true)}
                className="fixed bottom-6 right-4 sm:right-6 z-30 flex items-center justify-center gap-2 min-w-[56px] min-h-[56px] sm:min-w-0 sm:min-h-0 px-4 py-3 rounded-full bg-brand-green text-white shadow-lg hover:bg-brand-green/90 transition-colors"
                style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Otwórz ściągę"
            >
                <Book className="w-6 h-6 sm:w-5 sm:h-5" />
                <span className="font-medium hidden sm:inline">Ściąga</span>
            </motion.button>

            {/* Main Content - extra bottom padding for iOS safe area */}
            <div className="container-spacing pt-4 sm:pt-8 pb-28 sm:pb-24" style={{ paddingBottom: 'max(7rem, calc(6rem + env(safe-area-inset-bottom)))' }}>
                {/* Hero Section - simplified for mobile */}
                <section className="text-center mb-6 sm:mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-4 sm:mb-8"
                    >
                        {/* Żabek Mascot - smaller on mobile */}
                        <div className="flex justify-center mb-3 sm:mb-6">
                            <ZabekGuide message={zabekMessage ?? undefined} isVisible />
                        </div>

                        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-1 sm:mb-3 px-2">
                            Witaj w{' '}
                            <span className="text-brand-green">Przygodzie Żabiana</span>! 🐸
                        </h1>
                        {/* Description - hidden on mobile */}
                        <p className="hidden sm:block text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                            Rozwiń swój sklep od małego Kiosku do wielkiego Imperium! Wykonuj misje, zdobywaj wiedzę i awansuj na kolejne poziomy.
                        </p>
                    </motion.div>

                    {/* Shop Level Display & Progress */}
                    <div className="max-w-xl mx-auto mb-4 sm:mb-10">
                        <ShopLevelDisplay
                            currentLevel={progress.currentLevel}
                            currentExp={progress.currentExp}
                        />
                    </div>

                    {/* Badges - compact row on mobile */}
                    <div className="flex flex-col items-center gap-3 sm:gap-6">
                        <BadgeDisplay
                            badges={allBadges}
                            earnedBadges={progress.earnedBadges}
                        />

                        {/* Secondary Stats - smaller and sideby side */}
                        <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                            <div className="flex items-center gap-1 sm:gap-2 bg-white dark:bg-slate-900/80 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-gray-200 dark:border-slate-700 shadow-sm">
                                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                                <span className="font-medium">{progress.currentStreak}</span>
                                <span className="hidden sm:inline">dni serii</span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2 bg-white dark:bg-slate-900/80 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-gray-200 dark:border-slate-700 shadow-sm">
                                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                                <span className="font-medium">{completionPercentage}%</span>
                                <span className="hidden sm:inline">kursu</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Adventures Section */}
                <section>
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center px-2">
                        Twoje Przygody
                    </h2>
                    <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto">
                        {ADVENTURES.map((adventure, index) => (
                            <motion.div
                                key={adventure.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index, duration: 0.4 }}
                            >
                                <AdventureCard
                                    adventure={adventure}
                                    completedQuests={progress.completedQuests}
                                    completedQuizzes={progress.completedQuizzes}
                                    onToggleQuest={toggleQuest}
                                    onCompleteQuiz={completeQuiz}
                                    onBadgeEarned={earnBadge}
                                    defaultExpanded={index === 0}
                                />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Reset button (small, subtle) - moved to bottom */}
                <div className="mt-8 pt-4 border-t border-border/30 max-w-3xl mx-auto">
                    <button
                        type="button"
                        onClick={() => {
                            if (confirm('Czy na pewno chcesz zresetować postępy? Tej akcji nie można cofnąć.')) {
                                resetProgress();
                            }
                        }}
                        className="text-xs text-muted-foreground/60 hover:text-foreground transition-colors flex items-center gap-1 mx-auto"
                    >
                        <RotateCcw className="w-3 h-3" />
                        Resetuj postępy
                    </button>
                </div>

                {/* Completion celebration */}
                <AnimatePresence>
                    {showConfetti && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
                        >
                            <div className="text-6xl animate-bounce">🎉🐸🎉</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
