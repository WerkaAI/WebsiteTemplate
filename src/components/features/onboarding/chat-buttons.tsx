/**
 * Chat pill buttons — user response options.
 *
 * Design specs (ONBOARDING_DEEP_RETHINK.md Meeting 2):
 * - Pill buttons, min 48px height (touch target)
 * - Right-aligned, wrapped flex
 * - Brand-green outline by default, filled on hover/active
 * - Icons (emoji) before label if provided
 * - No text input field — only buttons
 */

'use client';

import { memo } from 'react';
import { cn } from '@/lib/utils';
import type { ChatButton } from '@/lib/onboarding/chat-types';

interface ChatButtonsProps {
    buttons: ChatButton[];
    onButtonClick: (action: string, target?: string, branchId?: string, xpReward?: number) => void;
    /** Disable buttons after one is clicked */
    disabled?: boolean;
}

export const ChatButtons = memo(function ChatButtons({
    buttons,
    onButtonClick,
    disabled = false,
}: ChatButtonsProps) {
    if (!buttons.length) return null;

    return (
        <div className={cn(
            buttons.length === 2
                ? 'grid grid-cols-2 gap-2'
                : 'flex flex-wrap justify-end gap-2',
            'motion-safe:animate-fade-in',
        )} role="group" aria-label="Opcje odpowiedzi">
            {buttons.map((btn, idx) => (
                <button
                    key={`${btn.label}-${idx}`}
                    onClick={() => onButtonClick(btn.action, btn.target, btn.branchId, btn.xpReward)}
                    disabled={disabled}
                    className={cn(
                        'inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-2.5',
                        'rounded-full border-2 border-brand-green text-brand-green',
                        'text-[15px] font-medium leading-snug',
                        'transition-all duration-200',
                        'hover:bg-brand-green hover:text-white',
                        'motion-safe:active:scale-95',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2',
                        'disabled:opacity-40 disabled:pointer-events-none',
                        // Skip button is more subdued
                        btn.action === 'skip' &&
                            'border-muted-foreground/30 text-muted-foreground hover:bg-muted-foreground/10 hover:text-muted-foreground',
                    )}
                >
                    {btn.icon && <span className="text-lg" aria-hidden>{btn.icon}</span>}
                    {btn.label}
                </button>
            ))}
        </div>
    );
});
