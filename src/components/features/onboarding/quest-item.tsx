'use client';

import { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, ChevronDown, Play, Image as ImageIcon, ExternalLink, Star, FastForward, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { QuestStep, QuestMedia, QuestMediaVariant } from '@/lib/onboarding/onboarding-content';

// Lazy-loaded video component with IntersectionObserver
function LazyVideo({ src, alt, poster }: { src: string; alt: string; poster?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // IntersectionObserver - only load video when visible
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Stop observing once visible
                }
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    // Start playing when loaded
    useEffect(() => {
        if (isLoaded && videoRef.current) {
            videoRef.current.play().catch(() => {
                // Autoplay may be blocked, that's OK
            });
        }
    }, [isLoaded]);

    return (
        <div
            ref={containerRef}
            className="relative aspect-video rounded-lg overflow-hidden bg-muted"
        >
            {/* Loading skeleton */}
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <span className="text-xs">Ładowanie...</span>
                    </div>
                </div>
            )}

            {/* Error state */}
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Play className="w-8 h-8" />
                        <span className="text-xs">Nie udało się załadować wideo</span>
                    </div>
                </div>
            )}

            {/* Video - only loads when visible */}
            {isVisible && !hasError && (
                <video
                    ref={videoRef}
                    src={src}
                    poster={poster}
                    preload="none"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedData={() => setIsLoaded(true)}
                    onError={() => setHasError(true)}
                    className={cn(
                        'w-full h-full object-contain transition-opacity duration-300',
                        isLoaded ? 'opacity-100' : 'opacity-0'
                    )}
                    aria-label={alt}
                />
            )}
        </div>
    );
}

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
    /** Conditional media variants (e.g. Android vs iOS) */
    mediaVariants?: QuestMediaVariant[];
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

export const QuestItem = memo(function QuestItem({
    id,
    title,
    description,
    timeEstimate,
    isCompleted,
    onToggle,
    steps,
    media,
    mediaVariants,
    difficulty,
    deepLink,
    canSkip = true,
    autoComplete = false,
}: QuestItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    // State for media variants (defaults to first variant id if available)
    const [activeVariantId, setActiveVariantId] = useState<string | null>(
        mediaVariants && mediaVariants.length > 0 ? mediaVariants[0].id : null
    );

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

    // ... (handleCheckboxClick remains same)
    const handleCheckboxClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggle(id);
    };

    // Resolve active media: either from active variant or default media
    const activeMedia = mediaVariants
        ? mediaVariants.find(v => v.id === activeVariantId)?.media
        : media;

    return (
        <motion.div
            layout
            initial={false}
            animate={isExpanded ? { scale: 1.01 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={cn(
                'rounded-xl border transition-all duration-300 overflow-hidden',
                isCompleted
                    ? 'bg-brand-green/5 border-brand-green/30 dark:bg-brand-green/10 dark:border-brand-green/20'
                    : 'bg-white dark:bg-slate-900/80 border-gray-200 dark:border-slate-700 hover:border-brand-green/40 dark:hover:border-brand-green/30 hover:shadow-md',
                isExpanded && 'shadow-lg border-brand-green/30 dark:border-brand-green/20 ring-1 ring-brand-green/10'
            )}
        >
            <button
                onClick={handleHeaderClick}
                className={cn(
                    'w-full text-left p-4 sm:p-5 flex items-start gap-4',
                    'hover:bg-muted/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
                    'min-h-[64px]' // Optimized touch target
                )}
                aria-expanded={isExpanded}
            >
                {/* Checkbox with bounce animation */}
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
                        'mt-1 flex-shrink-0 w-7 h-7 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer',
                        'hover:scale-110 active:scale-95',
                        isCompleted
                            ? 'bg-brand-green border-brand-green text-white shadow-md shadow-brand-green/30'
                            : 'border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-brand-green/60'
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
                    <AnimatePresence initial={false}>
                        {!isExpanded && (
                            <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.15 }}
                                className="text-xs sm:text-sm text-muted-foreground line-clamp-2"
                            >
                                {description}
                            </motion.p>
                        )}
                    </AnimatePresence>
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

                            {/* Media Variants Tabs */}
                            {mediaVariants && mediaVariants.length > 0 && (
                                <div className="flex gap-2 mb-3">
                                    {mediaVariants.map((variant) => (
                                        <button
                                            key={variant.id}
                                            onClick={() => setActiveVariantId(variant.id)}
                                            className={cn(
                                                'px-3 py-1.5 text-xs font-medium rounded-full transition-all border',
                                                activeVariantId === variant.id
                                                    ? 'bg-brand-green text-white border-brand-green shadow-sm'
                                                    : 'bg-card text-muted-foreground border-border hover:border-brand-green/50'
                                            )}
                                        >
                                            {variant.label}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Media section */}
                            <div className="mb-4">
                                <MediaPlaceholder media={activeMedia} questId={id} />
                            </div>

                            {/* Steps section */}
                            {/* ... (rest remains same) */}
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
});

// Media placeholder component
function MediaPlaceholder({ media, questId }: { media?: QuestMedia; questId: string }) {
    if (media) {
        // ... (remains same)
        // Real media content
        if (media.type === 'video') {
            return <LazyVideo key={media.src} src={media.src} alt={media.alt} poster={media.poster} />;
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
                📸 Wybierz wariant powyżej aby zobaczyć wideo
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
