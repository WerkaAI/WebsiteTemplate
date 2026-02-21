/**
 * Mascot SVG Evolution System.
 *
 * 5 progressive avatars, flat design, brand-green palette:
 *   Level 0 — basic:  simple smiling frog
 *   Level 1 — crown:  frog + small crown
 *   Level 2 — cape:   frog + crown + cape
 *   Level 3 — flag:   frog + crown + cape + flag
 *   Level 4 — golden: golden frog with glow
 *
 * Used in: celebration overlay, chat header (future), badge card.
 * Crossfade 500ms via CSS transition on level change.
 *
 * Design specs: ONBOARDING_DEEP_RETHINK.md, Meeting 2 (Natalia).
 */

'use client';

import { memo, useId, useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { ZabekEvolution } from '@/lib/onboarding/chat-types';

// ─── Size presets ─────────────────────────────────────────────────────

type ZabekSize = 'sm' | 'md' | 'lg' | 'xl';

const SIZE_MAP: Record<ZabekSize, number> = {
    sm: 32,
    md: 48,
    lg: 80,
    xl: 120,
};

// ─── SVG Components per evolution ─────────────────────────────────────

function ZabekBasic({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {/* Body */}
            <circle cx="60" cy="65" r="40" fill="#006625" />
            {/* Belly */}
            <ellipse cx="60" cy="75" rx="28" ry="22" fill="#4CAF50" />
            {/* Left eye */}
            <circle cx="42" cy="48" r="14" fill="white" />
            <circle cx="44" cy="47" r="7" fill="#1a1a1a" />
            <circle cx="46" cy="45" r="2.5" fill="white" />
            {/* Right eye */}
            <circle cx="78" cy="48" r="14" fill="white" />
            <circle cx="76" cy="47" r="7" fill="#1a1a1a" />
            <circle cx="78" cy="45" r="2.5" fill="white" />
            {/* Smile */}
            <path d="M42 72 Q60 88 78 72" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Cheeks */}
            <circle cx="34" cy="68" r="6" fill="#4CAF50" opacity="0.6" />
            <circle cx="86" cy="68" r="6" fill="#4CAF50" opacity="0.6" />
        </svg>
    );
}

function ZabekCrown({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {/* Crown */}
            <path d="M35 38 L42 22 L52 32 L60 18 L68 32 L78 22 L85 38 Z" fill="#FFD700" stroke="#E6B800" strokeWidth="1.5" />
            <circle cx="42" cy="22" r="3" fill="#FF6B6B" />
            <circle cx="60" cy="18" r="3" fill="#4FC3F7" />
            <circle cx="78" cy="22" r="3" fill="#FF6B6B" />
            {/* Body */}
            <circle cx="60" cy="65" r="40" fill="#006625" />
            {/* Belly */}
            <ellipse cx="60" cy="75" rx="28" ry="22" fill="#4CAF50" />
            {/* Left eye */}
            <circle cx="42" cy="48" r="14" fill="white" />
            <circle cx="44" cy="47" r="7" fill="#1a1a1a" />
            <circle cx="46" cy="45" r="2.5" fill="white" />
            {/* Right eye */}
            <circle cx="78" cy="48" r="14" fill="white" />
            <circle cx="76" cy="47" r="7" fill="#1a1a1a" />
            <circle cx="78" cy="45" r="2.5" fill="white" />
            {/* Smile */}
            <path d="M42 72 Q60 88 78 72" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Cheeks */}
            <circle cx="34" cy="68" r="6" fill="#4CAF50" opacity="0.6" />
            <circle cx="86" cy="68" r="6" fill="#4CAF50" opacity="0.6" />
        </svg>
    );
}

function ZabekCape({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {/* Cape */}
            <path d="M25 55 Q20 90 35 110 L60 95 L85 110 Q100 90 95 55" fill="#C62828" opacity="0.85" />
            <path d="M30 58 Q26 88 38 106 L60 92 L82 106 Q94 88 90 58" fill="#E53935" opacity="0.7" />
            {/* Crown */}
            <path d="M35 38 L42 22 L52 32 L60 18 L68 32 L78 22 L85 38 Z" fill="#FFD700" stroke="#E6B800" strokeWidth="1.5" />
            <circle cx="42" cy="22" r="3" fill="#FF6B6B" />
            <circle cx="60" cy="18" r="3" fill="#4FC3F7" />
            <circle cx="78" cy="22" r="3" fill="#FF6B6B" />
            {/* Body */}
            <circle cx="60" cy="65" r="40" fill="#006625" />
            {/* Belly */}
            <ellipse cx="60" cy="75" rx="28" ry="22" fill="#4CAF50" />
            {/* Left eye */}
            <circle cx="42" cy="48" r="14" fill="white" />
            <circle cx="44" cy="47" r="7" fill="#1a1a1a" />
            <circle cx="46" cy="45" r="2.5" fill="white" />
            {/* Right eye — wink! */}
            <circle cx="78" cy="48" r="14" fill="white" />
            <circle cx="76" cy="47" r="7" fill="#1a1a1a" />
            <circle cx="78" cy="45" r="2.5" fill="white" />
            {/* Confident smile */}
            <path d="M40 70 Q60 90 80 70" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Cheeks */}
            <circle cx="34" cy="68" r="6" fill="#4CAF50" opacity="0.6" />
            <circle cx="86" cy="68" r="6" fill="#4CAF50" opacity="0.6" />
        </svg>
    );
}

function ZabekFlag({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {/* Flag pole (held in right hand) */}
            <line x1="98" y1="15" x2="98" y2="90" stroke="#8D6E63" strokeWidth="3" strokeLinecap="round" />
            {/* Flag */}
            <path d="M98 15 L98 45 Q108 30 118 38 L118 8 Q108 16 98 15 Z" fill="#006625" />
            <text x="106" y="29" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">AŻ</text>
            {/* Cape */}
            <path d="M25 55 Q20 90 35 110 L60 95 L85 110 Q100 90 95 55" fill="#C62828" opacity="0.85" />
            <path d="M30 58 Q26 88 38 106 L60 92 L82 106 Q94 88 90 58" fill="#E53935" opacity="0.7" />
            {/* Crown */}
            <path d="M35 38 L42 22 L52 32 L60 18 L68 32 L78 22 L85 38 Z" fill="#FFD700" stroke="#E6B800" strokeWidth="1.5" />
            <circle cx="42" cy="22" r="3" fill="#FF6B6B" />
            <circle cx="60" cy="18" r="3" fill="#4FC3F7" />
            <circle cx="78" cy="22" r="3" fill="#FF6B6B" />
            {/* Body */}
            <circle cx="60" cy="65" r="40" fill="#006625" />
            {/* Belly */}
            <ellipse cx="60" cy="75" rx="28" ry="22" fill="#4CAF50" />
            {/* Left eye */}
            <circle cx="42" cy="48" r="14" fill="white" />
            <circle cx="44" cy="47" r="7" fill="#1a1a1a" />
            <circle cx="46" cy="45" r="2.5" fill="white" />
            {/* Right eye */}
            <circle cx="78" cy="48" r="14" fill="white" />
            <circle cx="76" cy="47" r="7" fill="#1a1a1a" />
            <circle cx="78" cy="45" r="2.5" fill="white" />
            {/* Proud smile */}
            <path d="M40 70 Q60 90 80 70" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Cheeks */}
            <circle cx="34" cy="68" r="6" fill="#4CAF50" opacity="0.6" />
            <circle cx="86" cy="68" r="6" fill="#4CAF50" opacity="0.6" />
        </svg>
    );
}

function ZabekGolden({ size }: { size: number }) {
    const gradientId = useId();
    return (
        <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {/* Glow */}
            <circle cx="60" cy="65" r="55" fill={`url(#${gradientId})`} opacity="0.3" />
            {/* Sparkles */}
            <path d="M15 30 L18 25 L21 30 L18 35 Z" fill="#FFD700" opacity="0.8" />
            <path d="M100 20 L103 15 L106 20 L103 25 Z" fill="#FFD700" opacity="0.8" />
            <path d="M20 85 L23 80 L26 85 L23 90 Z" fill="#FFD700" opacity="0.6" />
            <path d="M95 95 L98 90 L101 95 L98 100 Z" fill="#FFD700" opacity="0.6" />
            {/* Crown (golden, bigger) */}
            <path d="M32 36 L40 16 L50 28 L60 12 L70 28 L80 16 L88 36 Z" fill="#FFD700" stroke="#E6B800" strokeWidth="2" />
            <circle cx="40" cy="16" r="4" fill="#FF6B6B" />
            <circle cx="60" cy="12" r="4" fill="#4FC3F7" />
            <circle cx="80" cy="16" r="4" fill="#FF6B6B" />
            {/* Body (golden!) */}
            <circle cx="60" cy="65" r="40" fill="#FFD700" />
            {/* Belly */}
            <ellipse cx="60" cy="75" rx="28" ry="22" fill="#FFF176" />
            {/* Left eye */}
            <circle cx="42" cy="48" r="14" fill="white" />
            <circle cx="44" cy="47" r="7" fill="#1a1a1a" />
            <circle cx="46" cy="45" r="2.5" fill="white" />
            {/* Right eye */}
            <circle cx="78" cy="48" r="14" fill="white" />
            <circle cx="76" cy="47" r="7" fill="#1a1a1a" />
            <circle cx="78" cy="45" r="2.5" fill="white" />
            {/* Big smile */}
            <path d="M38 70 Q60 92 82 70" stroke="#1a1a1a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            {/* Cheeks (warm) */}
            <circle cx="32" cy="68" r="7" fill="#FFAB40" opacity="0.5" />
            <circle cx="88" cy="68" r="7" fill="#FFAB40" opacity="0.5" />
            {/* Gradient def */}
            <defs>
                <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                </radialGradient>
            </defs>
        </svg>
    );
}

// ─── Evolution map ────────────────────────────────────────────────────

const EVOLUTION_COMPONENTS: Record<ZabekEvolution, React.ComponentType<{ size: number }>> = {
    basic: ZabekBasic,
    crown: ZabekCrown,
    cape: ZabekCape,
    flag: ZabekFlag,
    golden: ZabekGolden,
};

const EVOLUTION_LABELS: Record<ZabekEvolution, string> = {
    basic: 'Maskotka',
    crown: 'Maskotka Premium',
    cape: 'Maskotka Pro',
    flag: 'Maskotka Ekspert',
    golden: 'Maskotka Master',
};

// ─── Main Exported Component ──────────────────────────────────────────

interface ZabekEvolutionProps {
    /** Current evolution level */
    evolution: ZabekEvolution;
    /** Size preset */
    size?: ZabekSize;
    /** Custom pixel size (overrides preset) */
    customSize?: number;
    /** Additional CSS classes */
    className?: string;
    /** Show label below avatar */
    showLabel?: boolean;
    /** Animate entrance (scale-in) */
    animate?: boolean;
}

export const ZabekEvolutionAvatar = memo(function ZabekEvolutionAvatar({
    evolution,
    size = 'md',
    customSize,
    className,
    showLabel = false,
    animate = false,
}: ZabekEvolutionProps) {
    const pixelSize = customSize ?? SIZE_MAP[size];
    const SvgComponent = EVOLUTION_COMPONENTS[evolution];
    const label = EVOLUTION_LABELS[evolution];

    return (
        <div
            className={cn(
                'inline-flex flex-col items-center gap-1',
                'motion-safe:transition-opacity motion-safe:duration-500',
                animate && 'motion-safe:animate-fade-in',
                className,
            )}
            role="img"
            aria-label={label}
        >
            <div className={cn(
                'relative',
                // Reduced motion: no animation
                'motion-safe:transition-transform motion-safe:duration-500',
                animate && 'motion-safe:animate-[scale-in_0.5s_ease-out]',
            )}>
                <SvgComponent size={pixelSize} />
            </div>

            {showLabel && (
                <span className="text-xs font-medium text-muted-foreground">
                    {label}
                </span>
            )}
        </div>
    );
});

// ─── Evolution Preview (shows all levels) ─────────────────────────────

interface ZabekEvolutionPreviewProps {
    currentLevel: number;
    className?: string;
}

export const ZabekEvolutionPreview = memo(function ZabekEvolutionPreview({
    currentLevel,
    className,
}: ZabekEvolutionPreviewProps) {
    const evolutions = useMemo(
        () => (['basic', 'crown', 'cape', 'flag', 'golden'] as ZabekEvolution[]),
        [],
    );

    return (
        <div className={cn('flex items-end gap-2', className)}>
            {evolutions.map((evo, idx) => {
                const isReached = idx <= currentLevel;
                const isCurrent = idx === currentLevel;

                return (
                    <div
                        key={evo}
                        className={cn(
                            'transition-all duration-300',
                            !isReached && 'opacity-20 grayscale',
                            isCurrent && 'scale-110',
                        )}
                    >
                        <ZabekEvolutionAvatar
                            evolution={evo}
                            size="sm"
                            showLabel={isCurrent}
                        />
                    </div>
                );
            })}
        </div>
    );
});

/** Get the label for a given evolution level */
export function getEvolutionLabel(evolution: ZabekEvolution): string {
    return EVOLUTION_LABELS[evolution];
}
