/**
 * Chat-based onboarding progress hook.
 *
 * Manages the entire chat flow state:
 * - Current position (chapter, step, visible messages)
 * - Step completion / skip
 * - XP, badges, Żabek evolution
 * - Session streak
 * - Chat history (compact, max 50 messages in localStorage)
 * - Return flow (resume, quick help)
 * - Branch handling (Android/iOS etc.)
 *
 * Replaces use-progress.ts for the Employee role.
 */

'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import type {
    ChatProgress,
    ChatChapter,
    ChatStep,
    ChatMessage,
    CompactMessage,
    UserStatus,
    ZabekEvolution,
} from './chat-types';
import {
    MAX_CHAT_HISTORY,
    CHAPTER_BONUS_XP,
    STATUS_THRESHOLDS,
    ZABEK_EVOLUTION_ORDER,
    STREAK_MILESTONES,
    createInitialProgress,
} from './chat-types';

// ─── localStorage helpers ─────────────────────────────────────────────

const STORAGE_KEY = 'autozaba-chat-employee';

function loadProgress(): ChatProgress | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as ChatProgress;
    } catch {
        return null;
    }
}

function saveProgress(progress: ChatProgress): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
        // localStorage full or unavailable — silent fail
    }
}

// ─── Compact message helper ───────────────────────────────────────────

function toCompact(msg: ChatMessage): CompactMessage {
    const senderMap = { zabek: 'z', user: 'u', system: 's' } as const;
    return {
        id: msg.id,
        s: senderMap[msg.sender],
        c: msg.content,
        t: Date.now(),
    };
}

function trimHistory(history: CompactMessage[]): CompactMessage[] {
    if (history.length <= MAX_CHAT_HISTORY) return history;
    return history.slice(history.length - MAX_CHAT_HISTORY);
}

// ─── Return flow helpers ──────────────────────────────────────────────

export type ReturnScenario = 'first-visit' | 'resume' | 'completed';

function detectReturnScenario(progress: ChatProgress | null): ReturnScenario {
    if (!progress) return 'first-visit';
    // Check if all chapters are completed (we check totalXP > 0 as proxy for "has started")
    if (progress.completedChapters.length >= 4) return 'completed';
    if (progress.completedSteps.length > 0 || progress.lastSeenMessageId) return 'resume';
    return 'first-visit';
}

function getTimeSinceLastVisit(progress: ChatProgress | null): 'short' | 'medium' | 'long' {
    if (!progress?.lastVisit) return 'long';
    const diffMs = Date.now() - new Date(progress.lastVisit).getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    if (diffDays < 1) return 'short';
    if (diffDays < 7) return 'medium';
    return 'long';
}

/** Context-aware return greeting per Ewa's spec: warm but not annoying */
function buildReturnGreeting(
    scenario: ReturnScenario,
    timeSince: 'short' | 'medium' | 'long',
    currentStepTitle: string,
    percentComplete: number,
): string | null {
    if (scenario === 'first-visit') return null;
    if (scenario === 'completed') return '🐸 Wszystko ukończone! Możesz powrócić do dowolnego rozdziału z mapy.';
    // resume
    switch (timeSince) {
        case 'short':
            return `🐸 Cześć! Wracamy do: **${currentStepTitle}**.`;
        case 'medium':
            return `🐸 Dawno Cię nie było! Zostawiliśmy zakładkę w **${currentStepTitle}**.`;
        case 'long':
            return `🐸 Witaj ponownie! Twój postęp jest zapisany — **${percentComplete}%** przejrzane.`;
        default:
            return null;
    }
}

// ─── Main hook ────────────────────────────────────────────────────────

export interface UseChatProgressOptions {
    chapters: ChatChapter[];
}

export interface UseChatProgressReturn {
    // State
    progress: ChatProgress;
    currentChapter: ChatChapter;
    currentStep: ChatStep;
    visibleMessages: ChatMessage[];
    isWaitingForAction: boolean;

    // Navigation
    returnScenario: ReturnScenario;
    timeSinceLastVisit: 'short' | 'medium' | 'long';
    /** Context-aware return greeting (null on first visit) */
    returnGreeting: string | null;

    // Actions
    handleButtonClick: (action: string, target?: string, branchId?: string, xpReward?: number) => void;
    jumpToStep: (stepId: string) => void;
    jumpToChapter: (chapterId: string) => void;
    resetProgress: () => void;

    // Derived data
    totalSteps: number;
    completedStepCount: number;
    skippedStepCount: number;
    percentComplete: number;
    userStatus: UserStatus;
    zabekEvolution: ZabekEvolution;
    streakMessage: string | null;
    chapterStatuses: Array<{ chapter: ChatChapter; status: 'completed' | 'current' | 'locked' | 'skipped' }>;

    // Branch
    activeBranch: string | null;

    // Celebrations & Rewards
    pendingCelebration: ChatChapter | null;
    dismissCelebration: () => void;
    lastRewardMessage: string | null;
}

export function useChatProgress({ chapters }: UseChatProgressOptions): UseChatProgressReturn {
    // ── Initialize state from localStorage ──
    const [progress, setProgress] = useState<ChatProgress>(() => {
        const saved = loadProgress();
        if (saved) return { ...saved, sessionStreak: 0 }; // reset session streak on load
        return createInitialProgress(
            'employee',
            chapters[0]?.id ?? '',
            chapters[0]?.steps[0]?.id ?? '',
        );
    });

    // Track active branch (e.g. 'android' or 'ios') — restored from localStorage
    const [activeBranch, setActiveBranch] = useState<string | null>(() => {
        const saved = loadProgress();
        return saved?.activeBranch ?? null;
    });

    // Celebration queue
    const [pendingCelebration, setPendingCelebration] = useState<ChatChapter | null>(null);

    // Last reward message (randomly picked from rewardVariants)
    const [lastRewardMessage, setLastRewardMessage] = useState<string | null>(null);

    // Return scenario (computed once on mount)
    const returnScenarioRef = useRef<ReturnScenario>(detectReturnScenario(loadProgress()));
    const timeSinceRef = useRef(getTimeSinceLastVisit(loadProgress()));

    // ── Persist to localStorage on change (+ trim chat history) ──
    useEffect(() => {
        const trimmed = trimHistory(progress.chatHistory);
        const toSave = { ...progress, lastVisit: new Date().toISOString(), chatHistory: trimmed, activeBranch };
        saveProgress(toSave);
    }, [progress, activeBranch]);

    // ── Current chapter & step ──
    const currentChapter = useMemo(
        () => chapters.find((ch) => ch.id === progress.currentChapterId) ?? chapters[0],
        [chapters, progress.currentChapterId],
    );

    const currentStep = useMemo(
        () => currentChapter.steps.find((s) => s.id === progress.currentStepId) ?? currentChapter.steps[0],
        [currentChapter, progress.currentStepId],
    );

    // ── Visible messages (progressive disclosure) ──
    const visibleMessages = useMemo(() => {
        const msgs = currentStep.messages;
        const stepDone = progress.completedSteps.includes(currentStep.id) ||
                         progress.skippedSteps.includes(currentStep.id);

        // Completed/skipped steps: show all messages (no stopping at buttons)
        if (stepDone) {
            return msgs.filter((m) => filterByBranch(m, activeBranch));
        }

        if (!progress.lastSeenMessageId) {
            // Show first message (or first batch up to buttons)
            return getMessagesUpToFirstButtons(msgs, activeBranch);
        }
        // Show all messages up to and including lastSeenMessageId
        const lastIdx = msgs.findIndex((m) => m.id === progress.lastSeenMessageId);
        if (lastIdx === -1) return getMessagesUpToFirstButtons(msgs, activeBranch);

        // Include messages after lastSeen up to next buttons
        const afterLastSeen = msgs.slice(lastIdx + 1);
        const nextBatch = getMessagesUpToFirstButtons(afterLastSeen, activeBranch);
        const shown = msgs.slice(0, lastIdx + 1).filter((m) => filterByBranch(m, activeBranch));

        return [...shown, ...nextBatch];
    }, [currentStep.messages, currentStep.id, progress.lastSeenMessageId, progress.completedSteps, progress.skippedSteps, activeBranch]);

    // Is the last visible message a buttons type? (waiting for user action)
    const isWaitingForAction = useMemo(() => {
        const last = visibleMessages[visibleMessages.length - 1];
        return last?.type === 'buttons';
    }, [visibleMessages]);

    // ── Button click handler ──
    const handleButtonClick = useCallback(
        (action: string, target?: string, branchId?: string, xpReward?: number) => {
            // Handle branch selection
            if (action === 'branch' && branchId) {
                setActiveBranch(branchId);
                // Find the first message of this branch
                const branchMsgs = currentStep.messages.filter((m) => m.branchId === branchId);
                if (branchMsgs.length > 0) {
                    // Find last button-type message in branch or common messages after branch
                    const lastCommonOrBranch = findLastButtonsMessage(currentStep.messages, branchId);
                    setProgress((prev) => ({
                        ...prev,
                        lastSeenMessageId: lastCommonOrBranch?.id ?? branchMsgs[0].id,
                        sessionStreak: prev.sessionStreak,
                    }));
                }
                return;
            }

            // Handle skip
            if (action === 'skip') {
                setProgress((prev) => {
                    const newSkipped = prev.skippedSteps.includes(currentStep.id)
                        ? prev.skippedSteps
                        : [...prev.skippedSteps, currentStep.id];
                    const newCompleted = prev.completedSteps.includes(currentStep.id)
                        ? prev.completedSteps
                        : [...prev.completedSteps, currentStep.id];
                    return advanceToNextStep(prev, chapters, currentChapter, currentStep, {
                        completedSteps: newCompleted,
                        skippedSteps: newSkipped,
                        // No XP for skip
                    });
                });
                setActiveBranch(null);
                return;
            }

            // Handle complete
            if (action === 'complete') {
                const xp = xpReward ?? currentStep.xpReward;

                // Pick random reward message from variants
                if (currentStep.rewardVariants && currentStep.rewardVariants.length > 0) {
                    const idx = Math.floor(Math.random() * currentStep.rewardVariants.length);
                    setLastRewardMessage(currentStep.rewardVariants[idx]);
                } else {
                    setLastRewardMessage(null);
                }

                // Detect if this is the last step in chapter (triggers celebration)
                const stepIdx = currentChapter.steps.findIndex((s) => s.id === currentStep.id);
                const isLastStepInChapter = stepIdx >= currentChapter.steps.length - 1;

                // Track chat history (compact messages for current step)
                const stepMsgs = currentStep.messages
                    .filter((m) => m.type !== 'buttons')
                    .slice(0, 5) // limit per step
                    .map((m) => toCompact(m));

                setProgress((prev) => {
                    const newCompleted = prev.completedSteps.includes(currentStep.id)
                        ? prev.completedSteps
                        : [...prev.completedSteps, currentStep.id];
                    const alreadyCompleted = prev.completedSteps.includes(currentStep.id);
                    const newStreak = prev.sessionStreak + 1;
                    const newXP = alreadyCompleted ? prev.totalXP : prev.totalXP + xp;
                    const newHistory = [...prev.chatHistory, ...stepMsgs];

                    const updated = advanceToNextStep(prev, chapters, currentChapter, currentStep, {
                        completedSteps: newCompleted,
                        totalXP: newXP,
                        sessionStreak: newStreak,
                        chatHistory: trimHistory(newHistory),
                    });

                    return updated;
                });

                // Trigger celebration AFTER state update if chapter was newly completed
                if (isLastStepInChapter && !progress.completedChapters.includes(currentChapter.id)) {
                    setPendingCelebration(currentChapter);
                }

                setActiveBranch(null);
                return;
            }

            // Handle next (advance messages within same step)
            if (action === 'next') {
                // Find the current buttons message and advance past it
                const currentButtonsIdx = visibleMessages.findIndex(
                    (m) => m.type === 'buttons' && m.id === visibleMessages[visibleMessages.length - 1]?.id,
                );
                if (currentButtonsIdx !== -1) {
                    const buttonsMsg = visibleMessages[currentButtonsIdx];
                    setProgress((prev) => ({
                        ...prev,
                        lastSeenMessageId: buttonsMsg.id,
                    }));
                }
                return;
            }

            // Handle jump
            if (action === 'jump' && target) {
                jumpToStep(target);
                return;
            }

            // Handle retry (re-attempt a previously skipped step)
            if (action === 'retry') {
                setProgress((prev) => ({
                    ...prev,
                    completedSteps: prev.completedSteps.filter((id) => id !== currentStep.id),
                    skippedSteps: prev.skippedSteps.filter((id) => id !== currentStep.id),
                    lastSeenMessageId: '',
                }));
                setActiveBranch(null);
                return;
            }

            // Handle link
            if (action === 'link' && target) {
                window.open(target, '_blank', 'noopener');
                return;
            }
        },
        [currentStep, visibleMessages, chapters, currentChapter],
    );

    // ── Jump to step ──
    const jumpToStep = useCallback(
        (stepId: string) => {
            for (const ch of chapters) {
                const step = ch.steps.find((s) => s.id === stepId);
                if (step) {
                    setProgress((prev) => ({
                        ...prev,
                        currentChapterId: ch.id,
                        currentStepId: step.id,
                        lastSeenMessageId: '',
                    }));
                    setActiveBranch(null);
                    return;
                }
            }
        },
        [chapters],
    );

    // ── Jump to chapter ──
    const jumpToChapter = useCallback(
        (chapterId: string) => {
            const ch = chapters.find((c) => c.id === chapterId);
            if (!ch) return;
            // Find first incomplete step in chapter, or first step
            const firstIncomplete = ch.steps.find((s) => !progress.completedSteps.includes(s.id));
            setProgress((prev) => ({
                ...prev,
                currentChapterId: ch.id,
                currentStepId: (firstIncomplete ?? ch.steps[0]).id,
                lastSeenMessageId: '',
            }));
            setActiveBranch(null);
        },
        [chapters, progress.completedSteps],
    );

    // ── Reset ──
    const resetProgress = useCallback(() => {
        const initial = createInitialProgress('employee', chapters[0]?.id ?? '', chapters[0]?.steps[0]?.id ?? '');
        setProgress(initial); // useEffect will persist to localStorage
        setActiveBranch(null);
        setPendingCelebration(null);
        setLastRewardMessage(null);
    }, [chapters]);

    // ── Dismiss celebration ──
    const dismissCelebration = useCallback(() => {
        setPendingCelebration(null);
    }, []);

    // ── Derived data ──
    const totalSteps = useMemo(() => chapters.flatMap((ch) => ch.steps).length, [chapters]);
    const completedStepCount = progress.completedSteps.length;
    const skippedStepCount = progress.skippedSteps.length;
    const percentComplete = totalSteps > 0 ? Math.min(Math.round((completedStepCount / totalSteps) * 100), 100) : 0;

    // ── Return greeting (context-aware, frozen on mount via useRef) ──
    const returnGreetingRef = useRef<string | null | undefined>(undefined);
    if (returnGreetingRef.current === undefined) {
        returnGreetingRef.current = buildReturnGreeting(
            returnScenarioRef.current,
            timeSinceRef.current,
            currentStep.title,
            percentComplete,
        );
    }
    const returnGreeting = returnGreetingRef.current;

    const userStatus: UserStatus = useMemo(() => {
        if (percentComplete >= STATUS_THRESHOLDS.master.min) return 'master';
        if (percentComplete >= STATUS_THRESHOLDS.competent.min) return 'competent';
        return 'beginner';
    }, [percentComplete]);

    const zabekEvolution: ZabekEvolution = useMemo(() => {
        return ZABEK_EVOLUTION_ORDER[Math.min(progress.zabekLevel, ZABEK_EVOLUTION_ORDER.length - 1)];
    }, [progress.zabekLevel]);

    const streakMessage = useMemo(() => {
        // Find highest milestone <= current streak
        const milestones = Object.keys(STREAK_MILESTONES)
            .map(Number)
            .sort((a, b) => b - a);
        for (const m of milestones) {
            if (progress.sessionStreak === m) return STREAK_MILESTONES[m];
        }
        return null;
    }, [progress.sessionStreak]);

    const chapterStatuses = useMemo(() => {
        return chapters.map((ch) => {
            if (progress.completedChapters.includes(ch.id)) {
                return { chapter: ch, status: 'completed' as const };
            }
            if (ch.id === progress.currentChapterId) {
                return { chapter: ch, status: 'current' as const };
            }
            // All chapters are unlocked — user can navigate freely
            return { chapter: ch, status: 'current' as const };
        });
    }, [chapters, progress.completedChapters, progress.currentChapterId]);

    return {
        progress,
        currentChapter,
        currentStep,
        visibleMessages,
        isWaitingForAction,

        returnScenario: returnScenarioRef.current,
        timeSinceLastVisit: timeSinceRef.current,
        returnGreeting,

        handleButtonClick,
        jumpToStep,
        jumpToChapter,
        resetProgress,

        totalSteps,
        completedStepCount,
        skippedStepCount,
        percentComplete,
        userStatus,
        zabekEvolution,
        streakMessage,
        chapterStatuses,

        activeBranch,

        pendingCelebration,
        dismissCelebration,
        lastRewardMessage,
    };
}

// ─── Internal helpers ─────────────────────────────────────────────────

/** Filter messages by branch: show if no branchId or matches active branch */
function filterByBranch(msg: ChatMessage | Omit<ChatMessage, 'id'>, activeBranch: string | null): boolean {
    if (!('branchId' in msg) || !msg.branchId) return true;
    return msg.branchId === activeBranch;
}

/** Get messages from start up to and including first buttons message (filtered by branch) */
function getMessagesUpToFirstButtons(
    msgs: ChatMessage[],
    activeBranch: string | null,
): ChatMessage[] {
    const result: ChatMessage[] = [];
    for (const msg of msgs) {
        if (!filterByBranch(msg, activeBranch)) continue;
        result.push(msg);
        if (msg.type === 'buttons') break;
    }
    return result;
}

/** Find the last buttons-type message considering branch context */
function findLastButtonsMessage(
    msgs: ChatMessage[],
    activeBranch: string | null,
): ChatMessage | null {
    const filtered = msgs.filter((m) => filterByBranch(m, activeBranch));
    for (let i = filtered.length - 1; i >= 0; i--) {
        if (filtered[i].type === 'buttons') return filtered[i];
    }
    return null;
}

/** Advance progress to the next step (or next chapter) after completing current step */
function advanceToNextStep(
    prev: ChatProgress,
    chapters: ChatChapter[],
    currentChapter: ChatChapter,
    currentStep: ChatStep,
    updates: Partial<ChatProgress>,
): ChatProgress {
    const merged = { ...prev, ...updates, lastSeenMessageId: '' };

    const currentStepIdx = currentChapter.steps.findIndex((s) => s.id === currentStep.id);
    const isLastStep = currentStepIdx >= currentChapter.steps.length - 1;

    if (!isLastStep) {
        // Advance to next step in same chapter
        const nextStep = currentChapter.steps[currentStepIdx + 1];
        return {
            ...merged,
            currentStepId: nextStep.id,
        };
    }

    // Last step in chapter — complete chapter (deduplicate)
    const prevChapters = merged.completedChapters ?? prev.completedChapters;
    const newCompletedChapters = prevChapters.includes(currentChapter.id)
        ? prevChapters
        : [...prevChapters, currentChapter.id];
    const prevBadges = merged.badges ?? prev.badges;
    const newBadges = prevBadges.includes(currentChapter.badge.id)
        ? prevBadges
        : [...prevBadges, currentChapter.badge.id];
    const chapterIdx = chapters.findIndex((ch) => ch.id === currentChapter.id);
    const newZabekLevel = Math.min(chapterIdx + 1, ZABEK_EVOLUTION_ORDER.length - 1);
    const bonusXP = currentChapter.completionBonusXP;

    // Find next chapter
    const nextChapter = chapters[chapterIdx + 1];

    return {
        ...merged,
        completedChapters: newCompletedChapters,
        badges: newBadges,
        zabekLevel: newZabekLevel,
        totalXP: (merged.totalXP ?? prev.totalXP) + bonusXP,
        lastChapterCompletedAt: new Date().toISOString(),
        currentChapterId: nextChapter?.id ?? currentChapter.id,
        currentStepId: nextChapter?.steps[0]?.id ?? currentStep.id,
    };
}
