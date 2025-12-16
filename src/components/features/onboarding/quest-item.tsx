'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, ChevronDown, Play, Image as ImageIcon, ExternalLink, Star, FastForward } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { QuestStep, QuestMedia } from '@/lib/onboarding/onboarding-content';

interface QuestItemProps {
    id: string;
    title: string;
    description: string;
    timeEstimate: number;
    isCompleted: boolean;
    onToggle: (id: string) => void;
    /** Step-by-step instructions */
    steps?: QuestStep[];
    /** Media content (screenshot, gif, video) */
    media?: QuestMedia;
    /** Difficulty level 1-3 */
    difficulty?: 1 | 2 | 3;
    /** Deep link to app */
    deepLink?: string;
    /** Can skip (default: true) */
    canSkip?: boolean;
    /** Auto-complete (non-interactive) */
    autoComplete?: boolean;
}

// Difficulty stars component
function DifficultyStars({ level }: { level: 1 | 2 | 3 }) {
    return (
        <div className="flex gap-0.5" title={level === 1 ? 'Łatwy' : level === 2 ? 'Średni' : 'Zaawansowany'}>
            {[1, 2, 3].map((star) => (
                <Star
                    key={star}
                    className={cn(
                        'w-3 h-3',
                        star <= level ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'
                    )}
                />
            ))}
        </div>
    );
}

export function QuestItem({
    id,
    title,
    description,
    timeEstimate,
    isCompleted,
    onToggle,
    steps,
    media,
    difficulty,
    deepLink,
    canSkip = true,
    autoComplete = false,
}: QuestItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Auto-complete quests are non-interactive (just display)
    if (autoComplete && isCompleted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl border bg-brand-green/10 border-brand-green/30 p-3 sm:p-4 flex items-center gap-3"
            >
                <div className="w-8 h-8 sm:w-6 sm:h-6 rounded-full bg-brand-green text-white flex items-center justify-center">
                    <Check className="w-5 h-5 sm:w-4 sm:h-4" />
                </div>
                <div className="flex-1">
                    <span className="font-medium text-sm sm:text-base text-brand-green">{title}</span>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <span className="text-lg">🎉</span>
            </motion.div>
        );
    }

    const handleHeaderClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handleCheckboxClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggle(id);
    };

    return (
        <motion.div
            layout
            className={cn(
                'rounded-xl border transition-all duration-300 overflow-hidden',
                isCompleted
                    ? 'bg-brand-green/5 border-brand-green/30 dark:bg-brand-green/10'
                    : 'bg-card border-border',
                isExpanded && 'shadow-lg'
            )}
        >
            <button
                onClick={handleHeaderClick}
                className={cn(
                    'w-full text-left p-3 sm:p-4 flex items-start gap-3',
                    'hover:bg-muted/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
                    'min-h-[56px]' // Ensure minimum touch target height
                )}
                aria-expanded={isExpanded}
            >
                {/* Checkbox - larger on mobile for better touch target */}
                <div
                    onClick={handleCheckboxClick}
                    role="checkbox"
                    aria-checked={isCompleted}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onToggle(id);
                        }
                    }}
                    className={cn(
                        'mt-0.5 flex-shrink-0 w-8 h-8 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer',
                        'hover:scale-110 active:scale-95',
                        isCompleted
                            ? 'bg-brand-green border-brand-green text-white'
                            : 'border-muted-foreground/40 bg-background hover:border-brand-green/60'
                    )}
                >
                    {isCompleted && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        >
                            <Check className="w-5 h-5 sm:w-4 sm:h-4" />
                        </motion.div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                        <h4
                            className={cn(
                                'font-medium text-sm sm:text-base transition-all',
                                isCompleted && 'line-through text-muted-foreground'
                            )}
                        >
                            {title}
                        </h4>
                        {difficulty && <DifficultyStars level={difficulty} />}
                        {timeEstimate > 0 && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {timeEstimate} min
                            </span>
                        )}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                        {description}
                    </p>
                </div>

                {/* Expand indicator */}
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 mt-1"
                >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
            </button>

            {/* Expanded content */}
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4 pt-2 border-t border-border/50">
                            {/* Media section */}
                            <div className="mb-4">
                                <MediaPlaceholder media={media} questId={id} />
                            </div>

                            {/* Steps section */}
                            <div className="space-y-3">
                                <h5 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                    📋 Krok po kroku
                                </h5>
                                {steps && steps.length > 0 ? (
                                    <ol className="space-y-3">
                                        {steps.map((step) => (
                                            <li key={step.step} className="flex gap-3">
                                                <span className="flex-shrink-0 w-8 h-8 sm:w-6 sm:h-6 rounded-full bg-brand-green/10 text-brand-green text-sm sm:text-xs font-bold flex items-center justify-center">
                                                    {step.step}
                                                </span>
                                                <div className="flex-1 pt-1 sm:pt-0">
                                                    <p className="text-sm text-foreground">{step.instruction}</p>
                                                    {step.tip && (
                                                        <p className="text-xs text-muted-foreground mt-1 italic">
                                                            💡 {step.tip}
                                                        </p>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                ) : (
                                    <StepsPlaceholder questId={id} />
                                )}
                            </div>

                            {/* Action buttons */}
                            <div className="mt-4 pt-3 border-t border-border/50 space-y-2">
                                {/* Deep link button */}
                                {deepLink && !isCompleted && (
                                    <a
                                        href={deepLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-muted hover:bg-muted/80 transition-all"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Spróbuj w aplikacji
                                    </a>
                                )}

                                {/* Bottom row: Skip + Complete */}
                                <div className="flex gap-2">
                                    {/* Skip button */}
                                    {canSkip && !isCompleted && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onToggle(id);
                                            }}
                                            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-medium bg-muted/50 hover:bg-muted transition-all text-muted-foreground"
                                        >
                                            <FastForward className="w-3.5 h-3.5" />
                                            Pomiń
                                        </button>
                                    )}

                                    {/* Complete button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onToggle(id);
                                        }}
                                        className={cn(
                                            'flex-1 px-4 py-2.5 sm:py-2 rounded-lg text-sm font-medium transition-all min-h-[44px] sm:min-h-0',
                                            isCompleted
                                                ? 'bg-muted text-muted-foreground hover:bg-muted/80'
                                                : 'bg-brand-green text-white hover:bg-brand-green/90 active:scale-[0.98]'
                                        )}
                                    >
                                        {isCompleted ? '✓ Ukończono' : 'Oznacz jako ukończone'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Media placeholder component
function MediaPlaceholder({ media, questId }: { media?: QuestMedia; questId: string }) {
    if (media) {
        // Real media content
        if (media.type === 'video') {
            return (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    <video
                        src={media.src}
                        controls
                        className="w-full h-full object-cover"
                        aria-label={media.alt}
                    />
                </div>
            );
        }
        return (
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
        );
    }

    // Placeholder when no media provided
    return (
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-muted to-muted/50 border-2 border-dashed border-border flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-3 text-muted-foreground">
                <ImageIcon className="w-8 h-8" />
                <Play className="w-8 h-8" />
            </div>
            <p className="text-sm text-muted-foreground text-center px-4">
                📸 Tutaj pojawi się screenshot lub GIF
                <br />
                <span className="text-xs opacity-70">
                    (ID: {questId})
                </span>
            </p>
        </div>
    );
}

// Steps placeholder component
function StepsPlaceholder({ questId }: { questId: string }) {
    return (
        <div className="rounded-lg bg-muted/30 border border-dashed border-border p-4">
            <p className="text-sm text-muted-foreground text-center">
                📝 Kroki instrukcji zostaną dodane
                <br />
                <span className="text-xs opacity-70">(ID: {questId})</span>
            </p>
        </div>
    );
}
