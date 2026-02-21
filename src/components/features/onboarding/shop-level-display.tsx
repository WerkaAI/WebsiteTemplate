'use client';

import { motion } from 'framer-motion';
import { Trophy, Star, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ShopLevel, SHOP_LEVELS, getNextLevel } from '@/lib/onboarding/use-progress';

interface ShopLevelDisplayProps {
    currentLevel: number;
    currentExp: number;
    className?: string;
}

export function ShopLevelDisplay({ currentLevel, currentExp, className }: ShopLevelDisplayProps) {
    const levelInfo = SHOP_LEVELS.find(l => l.level === currentLevel) || SHOP_LEVELS[0];
    const nextLevel = getNextLevel(currentLevel);

    // Calculate progress percentage to next level
    let progressPercent = 100;
    if (nextLevel) {
        const levelRange = nextLevel.minExp - levelInfo.minExp;
        const experienceInLevel = currentExp - levelInfo.minExp;
        progressPercent = Math.min(100, (experienceInLevel / levelRange) * 100);
    }

    return (
        <div className={cn("bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-slate-700 rounded-xl p-4 shadow-sm", className)}>
            <div className="flex items-center gap-4">
                {/* Level Icon / Avatar */}
                <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center text-4xl border-2 border-brand-green shadow-inner">
                        {levelInfo.icon}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-brand-green text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-background">
                        {currentLevel}
                    </div>
                </div>

                {/* Level Info */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Poziom lokalizacji</p>
                            <h3 className="text-lg font-bold text-foreground leading-tight">{levelInfo.title}</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-brand-green">{currentExp} XP</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-2.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-brand-green"
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        />
                    </div>

                    {/* Next Level Teaser */}
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>{Math.floor(progressPercent)}% do awansu</span>
                        {nextLevel && (
                            <span className="flex items-center gap-1">
                                Następny: {nextLevel.title} {nextLevel.icon}
                            </span>
                        )}
                        {!nextLevel && <span>Maksymalny poziom! 👑</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}
