'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Badge {
    id: string;
    name: string;
    icon: string;
}

interface BadgeDisplayProps {
    badges: Badge[];
    earnedBadges: string[];
    className?: string;
}

export function BadgeDisplay({ badges, earnedBadges, className }: BadgeDisplayProps) {
    return (
        <div className={cn('flex gap-2 sm:gap-3', className)}>
            {badges.map((badge, index) => {
                const isEarned = earnedBadges.includes(badge.id);

                return (
                    <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                            'flex flex-col items-center gap-1 p-2 sm:p-3 rounded-xl border transition-all duration-300 min-w-[72px] sm:min-w-[80px]',
                            isEarned
                                ? 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-300 dark:border-amber-600 shadow-lg'
                                : 'bg-muted/30 border-border opacity-50 grayscale'
                        )}
                        title={isEarned ? `Odznaka: ${badge.name}` : 'Odznaka zablokowana'}
                    >
                        <span className="text-xl sm:text-2xl" role="img" aria-label={badge.name}>
                            {badge.icon}
                        </span>
                        <span className={cn(
                            'text-[10px] sm:text-xs font-medium text-center leading-tight max-w-[70px] sm:max-w-[80px]',
                            isEarned ? 'text-amber-800 dark:text-amber-200' : 'text-muted-foreground'
                        )}>
                            {badge.name}
                        </span>
                    </motion.div>
                );
            })}
        </div>
    );
}
