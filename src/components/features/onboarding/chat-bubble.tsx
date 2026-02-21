/**
 * Chat bubble component — renders a single message in the onboarding chat.
 *
 * Layout per sender:
 * - zabek: left-aligned, avatar (32px 🐸) + bubble, bg-white, border-l-4 brand-green
 * - user:  right-aligned, bg-brand-green text-white
 * - system (reward/celebration): centered, bg-amber-50, border-amber-200
 *
 * Supports: text, tip (💡 lighter), media (image + caption), reward (XP toast).
 * Typing indicator shown via `isTyping` prop (pure CSS dots, no JS timer).
 *
 * Design specs from ONBOARDING_DEEP_RETHINK.md, Meeting 2 (Jakub).
 */

'use client';

import { memo, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AnimatedScreenshot } from './animated-screenshot';
import type { ChatMessage } from '@/lib/onboarding/chat-types';

// ─── Typing Indicator ─────────────────────────────────────────────────
function TypingDots() {
    return (
        <div className="flex items-end gap-3 motion-safe:animate-fade-in" role="status" aria-label="Przewodnik pisze...">
            {/* Avatar placeholder */}
            <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center text-lg shrink-0" aria-hidden="true">
                🐸
            </div>
            <div className="bg-white dark:bg-slate-800 border border-border rounded-tr-xl rounded-br-xl rounded-bl-xl px-4 py-3">
                <div className="flex gap-1 items-center h-5" aria-hidden="true">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/50 motion-safe:animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/50 motion-safe:animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/50 motion-safe:animate-bounce [animation-delay:300ms]" />
                </div>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────

interface ChatBubbleProps {
    message: ChatMessage;
    /** Show typing dots instead of content */
    isTyping?: boolean;
    /** Whether this is the last message (for scroll-into-view) */
    isLast?: boolean;
}

export const ChatBubble = memo(function ChatBubble({
    message,
    isTyping = false,
    isLast = false,
}: ChatBubbleProps) {
    const bubbleRef = useRef<HTMLDivElement>(null);

    // Auto-scroll last message into view
    useEffect(() => {
        if (isLast && bubbleRef.current) {
            bubbleRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [isLast]);

    // Typing indicator
    if (isTyping) return <TypingDots />;

    const { sender, type, content, media, reward } = message;

    // ── Media-only message (full-width, no bubble wrapper) ──
    if (type === 'media' && media) {
        return (
            <div ref={bubbleRef} className="motion-safe:animate-fade-in px-1">
                {media.src ? (
                    <AnimatedScreenshot
                        src={media.src}
                        alt={media.alt}
                        mediaType={media.type === 'video' ? 'video' : 'image'}
                        width={media.width ?? 750}
                        height={media.height ?? 468}
                        poster={media.poster}
                        caption={media.caption}
                        pointerAnimation={media.pointerAnimation}
                        playbackRate={media.playbackRate}
                    />
                ) : (
                    <div className="aspect-video bg-muted flex items-center justify-center rounded-lg">
                        <span className="text-muted-foreground text-sm">📸 Screenshot</span>
                    </div>
                )}
            </div>
        );
    }

    // ── Reward / Celebration (centered) ──
    if (type === 'reward' || type === 'celebration') {
        return (
            <div ref={bubbleRef} className="flex justify-center motion-safe:animate-fade-in">
                <div
                    className={cn(
                        'rounded-xl px-4 py-2 text-center max-w-[85vw] md:max-w-[65%]',
                        type === 'reward'
                            ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700'
                            : 'bg-brand-green/10 border border-brand-green/30',
                    )}
                >
                    {reward && (
                        <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">
                            ✨ +{reward.xp} XP
                        </span>
                    )}
                    <p className="text-sm text-foreground/80">{content}</p>
                </div>
            </div>
        );
    }

    // ── User bubble (right-aligned) ──
    if (sender === 'user') {
        return (
            <div ref={bubbleRef} className="flex justify-end motion-safe:animate-fade-in">
                <div className="bg-brand-green text-white rounded-tl-xl rounded-bl-xl rounded-br-xl px-4 py-3 max-w-[85vw] md:max-w-[65%] shadow-sm">
                    <p className="text-[15px] leading-relaxed">{content}</p>
                </div>
            </div>
        );
    }

    // ── System bubble (centered, neutral) ──
    if (sender === 'system') {
        return (
            <div ref={bubbleRef} className="flex justify-center motion-safe:animate-fade-in">
                <div className="bg-muted/50 rounded-xl px-4 py-2 max-w-[85vw] md:max-w-[65%]">
                    <p className="text-sm text-muted-foreground text-center">{content}</p>
                </div>
            </div>
        );
    }

    // ── Guide bubble (left-aligned) ──
    const isTip = type === 'tip';

    return (
        <div ref={bubbleRef} className="flex items-end gap-3 motion-safe:animate-fade-in">
            {/* Guide avatar */}
            <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center text-lg shrink-0" aria-hidden>
                🐸
            </div>

            <div
                className={cn(
                    'rounded-tr-xl rounded-br-xl rounded-bl-xl px-4 py-3 max-w-[85vw] md:max-w-[65%] shadow-sm',
                    isTip
                        ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700'
                        : 'bg-white dark:bg-slate-800 border-l-4 border-brand-green',
                )}
            >
                {/* Tip prefix */}
                {isTip && (
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-300 block mb-1">
                        💡 Wskazówka
                    </span>
                )}

                {/* Text content — with basic markdown-lite rendering */}
                <div className="text-[15px] leading-relaxed text-foreground">
                    <BubbleContent text={content} />
                </div>

                {/* Media (annotated screenshot / video / image) */}
                {media && (
                    <div className="mt-3">
                        {media.src ? (
                            <AnimatedScreenshot
                                src={media.src}
                                alt={media.alt}
                                mediaType={media.type === 'video' ? 'video' : 'image'}
                                width={media.width ?? 750}
                                height={media.height ?? 468}
                                poster={media.poster}
                                caption={media.caption}
                                pointerAnimation={media.pointerAnimation}
                                playbackRate={media.playbackRate}
                            />
                        ) : (
                            /* Placeholder until PNGs are added */
                            <div className="aspect-video bg-muted flex items-center justify-center rounded-lg">
                                <span className="text-muted-foreground text-sm">📸 Screenshot</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
});

// ─── Markdown-lite renderer ───────────────────────────────────────────
// Supports **bold** and *italic* only — no full markdown parser needed.

function BubbleContent({ text }: { text: string }) {
    // Split by newlines first, then parse markdown per line
    const lines = text.split('\n');

    return (
        <>
            {lines.map((line, lineIdx) => (
                <span key={lineIdx}>
                    {lineIdx > 0 && <br />}
                    <InlineMarkdown text={line} />
                </span>
            ))}
        </>
    );
}

/** Parses **bold** and *italic* within a single line */
function InlineMarkdown({ text }: { text: string }) {
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

    return (
        <>
            {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                        <strong key={i} className="font-semibold">
                            {part.slice(2, -2)}
                        </strong>
                    );
                }
                if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
                    return (
                        <em key={i} className="italic">
                            {part.slice(1, -1)}
                        </em>
                    );
                }
                return <span key={i}>{part}</span>;
            })}
        </>
    );
}
