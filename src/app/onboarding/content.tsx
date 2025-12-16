'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    ProgressRing,
    AdventureCard,
    BadgeDisplay,
    ZabekGuide,
    CheatSheetPanel,
} from '@/components/features/onboarding';
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
    } = useOnboardingProgress();

    const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [ringSize, setRingSize] = useState(140); // Default for SSR

    // Handle responsive ring size
    useEffect(() => {
        const updateRingSize = () => {
            setRingSize(window.innerWidth < 640 ? 100 : 140);
        };
        updateRingSize();
        window.addEventListener('resize', updateRingSize);
        return () => window.removeEventListener('resize', updateRingSize);
    }, []);

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
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-pulse text-muted-foreground">
                    Ładowanie postępów...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
            {/* Cheat Sheet Panel (side drawer) */}
            <CheatSheetPanel
                isOpen={isCheatSheetOpen}
                onClose={() => setIsCheatSheetOpen(false)}
            />

            {/* Fixed Cheat Sheet Button */}
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

            {/* Main Content */}
            {/* Main Content - extra bottom padding for iOS safe area */}
            <div className="container-spacing pt-6 sm:pt-8 pb-28 sm:pb-24" style={{ paddingBottom: 'max(7rem, calc(6rem + env(safe-area-inset-bottom)))' }}>
                {/* Hero Section */}
                <section className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Żabek Mascot */}
                        <div className="flex justify-center mb-6">
                            <ZabekGuide message={zabekMessage ?? undefined} isVisible />
                        </div>

                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-3 px-2">
                            Witaj w{' '}
                            <span className="text-brand-green">Przygodzie Żabiana</span>! 🐸
                        </h1>
                        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                            Naucz się korzystać z AutoŻaba krok po kroku. Ukończ wszystkie
                            przygody i zdobądź odznakę{' '}
                            <span className="font-semibold">Żabozbawcy</span>!
                        </p>
                    </motion.div>
                </section>

                {/* Progress Section */}
                <section className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="glass-premium rounded-2xl p-4 sm:p-6 md:p-8 text-center"
                    >
                        {/* Stack vertically on mobile, side-by-side on larger screens */}
                        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
                            {/* Progress Ring - responsive via state */}
                            <ProgressRing
                                percentage={completionPercentage}
                                size={ringSize}
                                className="flex-shrink-0"
                            />

                            {/* Badges - horizontal scroll on mobile */}
                            <div className="w-full">
                                <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center justify-center gap-2">
                                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                                    Twoje Odznaki
                                </h2>
                                <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
                                    <BadgeDisplay
                                        badges={allBadges}
                                        earnedBadges={progress.earnedBadges}
                                        className="flex-nowrap sm:flex-wrap justify-start sm:justify-center"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Reset button (small, subtle) */}
                        <div className="mt-6 pt-4 border-t border-border/50">
                            <button
                                type="button"
                                onClick={() => {
                                    if (
                                        confirm(
                                            'Czy na pewno chcesz zresetować postępy? Tej akcji nie można cofnąć.'
                                        )
                                    ) {
                                        resetProgress();
                                    }
                                }}
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 mx-auto"
                            >
                                <RotateCcw className="w-3 h-3" />
                                Resetuj postępy
                            </button>
                        </div>
                    </motion.div>
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
                                    onToggleQuest={toggleQuest}
                                    onBadgeEarned={earnBadge}
                                    defaultExpanded={index === 0}
                                />
                            </motion.div>
                        ))}
                    </div>
                </section>

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
