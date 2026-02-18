/**
 * Chat-based onboarding data model.
 *
 * Designed for progressive disclosure: one message at a time.
 * Replaces adventure-card / quest-item paradigm for the Employee role.
 *
 * Design decisions (from ONBOARDING_DEEP_RETHINK.md):
 * - Chat bubbles instead of expandable cards
 * - Pill buttons instead of text input
 * - Inline rewards (XP toast + Żabek comment)
 * - Annotated screenshots instead of video (Phase 1.5)
 * - Żabek avatar evolves per chapter completion
 * - Session streak (not daily)
 * - Soft-lock chapters (skip available, but no XP for skip)
 */

// ─── Message types ────────────────────────────────────────────────────

/** Sender of a chat message */
export type ChatSender = 'zabek' | 'user' | 'system';

/** Visual type of a chat message */
export type ChatMessageType =
    | 'text'        // plain text bubble
    | 'media'       // annotated screenshot / image
    | 'buttons'     // response options (pill buttons)
    | 'reward'      // inline XP reward toast
    | 'celebration' // chapter-complete overlay
    | 'tip';        // 💡 tip bubble (lighter styling)

/** Media attached to a chat message */
export interface ChatMedia {
    type: 'image' | 'gif' | 'animated-screenshot' | 'video';
    src: string;
    alt: string;
    /** Short caption below image: "① Menu → ② Dodaj → ③ Gotowe" */
    caption?: string;
    /** Width/height for layout stability (CLS prevention) */
    width?: number;
    height?: number;
    /** Optional poster image for video (first frame fallback) */
    poster?: string;
    /** Optional playback rate for video (e.g. 0.5 = half speed) */
    playbackRate?: number;
    /** Optional CSS pointer animation overlay (Phase 1.5) */
    pointerAnimation?: import('./chat-animations').PointerAnimation;
}

/** A response button shown to the user */
export interface ChatButton {
    /** Button label text */
    label: string;
    /** Optional emoji/icon before label */
    icon?: string;
    /** What happens when clicked */
    action: ChatButtonAction;
    /** Target step/chapter id (for 'jump') or URL (for 'link') */
    target?: string;
    /** XP rewarded for this specific choice (default: step's xpReward) */
    xpReward?: number;
    /** Branch id to activate when this button is clicked (for action='branch') */
    branchId?: string;
}

/** Button action type */
export type ChatButtonAction =
    | 'next'      // advance to next message in current step
    | 'complete'  // mark current step as completed, advance to next step
    | 'skip'      // skip current step (no XP, advance anyway)
    | 'jump'      // jump to a specific step or chapter (target = id)
    | 'branch'    // show different messages based on choice (target = branch id)
    | 'link'      // open external URL (target = url)
    | 'retry';    // re-attempt a previously skipped step

// ─── Chat message ─────────────────────────────────────────────────────

/** A single message in the chat flow */
export interface ChatMessage {
    /** Unique message id within a step */
    id: string;
    /** Who sends this message */
    sender: ChatSender;
    /** Visual type */
    type: ChatMessageType;
    /** Text content (markdown-lite: **bold**, *italic* supported) */
    content: string;
    /** Optional media (annotated screenshot) */
    media?: ChatMedia;
    /** Response buttons (only for sender='zabek', type='buttons') */
    buttons?: ChatButton[];
    /** Reward info (only for type='reward') */
    reward?: {
        xp: number;
        message: string;
    };
    /** Delay before showing this message in ms (typing effect: 300-800ms) */
    delay?: number;
    /** Branch id — if set, this message only shows when user chose this branch */
    branchId?: string;
}

// ─── Step (≈ one quest) ───────────────────────────────────────────────

/** XP difficulty scaling */
export type StepDifficulty = 'easy' | 'normal' | 'hard';

/** A conversational step (replaces a Quest) */
export interface ChatStep {
    /** Unique step id (e.g. 'emp-a1-instalacja') */
    id: string;
    /** Which chapter this belongs to */
    chapterId: string;
    /** Human-readable title (for map view & cheat sheet) */
    title: string;
    /** Short answer for cheat sheet / quick help */
    quickAnswer: string;
    /** Keywords for search */
    keywords: string[];
    /** Sequence of messages for this step */
    messages: ChatMessage[];
    /** Total XP for completing this step */
    xpReward: number;
    /** Difficulty determines XP: easy=25, normal=50, hard=100 */
    difficulty: StepDifficulty;
    /** Can user skip this step? (default true) */
    isOptional?: boolean;
    /** Auto-complete on first visit (welcome step) */
    autoComplete?: boolean;
    /** Deep link to the app feature */
    deepLink?: string;
    /** Randomized Żabek reward comments — hook picks one on completion */
    rewardVariants?: string[];
    /** Conditional note shown before steps (e.g. "*If you work in multiple stores*") */
    conditionalNote?: string;
}

// ─── Chapter (≈ one adventure) ────────────────────────────────────────

/** Żabek avatar evolution stage */
export type ZabekEvolution = 'basic' | 'crown' | 'cape' | 'flag' | 'golden';

/** A chapter grouping related steps */
export interface ChatChapter {
    /** Unique chapter id */
    id: string;
    /** Chapter number (1-based) */
    number: number;
    /** Display title */
    title: string;
    /** Icon/emoji */
    icon: string;
    /** Badge earned on completion */
    badge: {
        id: string;
        name: string;
        icon: string;
    };
    /** Ordered steps in this chapter */
    steps: ChatStep[];
    /** Celebration message shown on chapter completion */
    celebrationMessage: string;
    /** Żabek evolution stage reached after completing this chapter */
    zabekEvolution: ZabekEvolution;
    /** Chapter completion bonus XP (on top of step XP) */
    completionBonusXP: number;
}

// ─── Progress state (localStorage) ───────────────────────────────────

/** Compact message for chat history in localStorage */
export interface CompactMessage {
    /** Message id */
    id: string;
    /** Sender shorthand: z=żabek, u=user, s=system */
    s: 'z' | 'u' | 's';
    /** Content text */
    c: string;
    /** Timestamp (epoch ms) */
    t: number;
}

/** User status based on progress percentage */
export type UserStatus = 'beginner' | 'competent' | 'master';

/** Full chat progress state persisted in localStorage */
export interface ChatProgress {
    /** Selected role */
    role: 'employee' | 'owner';
    /** Current chapter id */
    currentChapterId: string;
    /** Current step id within current chapter */
    currentStepId: string;
    /** ID of the last message the user has seen in the current step */
    lastSeenMessageId: string;
    /** Set of completed step ids */
    completedSteps: string[];
    /** Set of completed chapter ids */
    completedChapters: string[];
    /** Set of skipped step ids (completed but no XP) */
    skippedSteps: string[];
    /** Total XP earned */
    totalXP: number;
    /** Current session streak (resets on page reload) */
    sessionStreak: number;
    /** Earned badge ids */
    badges: string[];
    /** Current Żabek evolution level (0-4) */
    zabekLevel: number;
    /** ISO date of last chapter completion (for return flow context) */
    lastChapterCompletedAt?: string;
    /** Last visit ISO date string */
    lastVisit: string;
    /** Compact chat history (max 50 messages) */
    chatHistory: CompactMessage[];
    /** Active branch selection (e.g. 'android' | 'ios') — persisted for resume */
    activeBranch?: string | null;
}

// ─── Map view types ───────────────────────────────────────────────────

/** Chapter status for the map view */
export type ChapterStatus = 'completed' | 'current' | 'locked' | 'skipped';

/** Quick help shortcut entry */
export interface QuickHelpShortcut {
    id: string;
    label: string;
    icon: string;
    /** Target step id for the mini-flow */
    targetStepId: string;
    /** Self-contained mini-flow answer (shown in drawer, no context needed) */
    miniAnswer: string[];
}

// ─── Constants ────────────────────────────────────────────────────────

/** XP rewards per difficulty level */
export const XP_BY_DIFFICULTY: Record<StepDifficulty, number> = {
    easy: 25,
    normal: 50,
    hard: 100,
};

/** Chapter completion bonus XP */
export const CHAPTER_BONUS_XP = 150;

/** Maximum messages stored in localStorage chat history */
export const MAX_CHAT_HISTORY = 50;

/** Typing indicator delay range (ms) */
export const TYPING_DELAY = { min: 300, max: 800 };

/** User status thresholds (percentage of total steps completed) */
export const STATUS_THRESHOLDS: Record<UserStatus, { min: number; label: string; icon: string }> = {
    beginner: { min: 0, label: 'Początkujący', icon: '🟢' },
    competent: { min: 34, label: 'Ogarnięty', icon: '🟡' },
    master: { min: 67, label: 'Mistrz', icon: '🏆' },
};

/** Żabek evolution stages in order */
export const ZABEK_EVOLUTION_ORDER: ZabekEvolution[] = [
    'basic',    // start: simple emoji/SVG
    'crown',    // after chapter 1
    'cape',     // after chapter 2
    'flag',     // after chapter 3
    'golden',   // after chapter 4 (100%)
];

/** Session streak milestone messages */
export const STREAK_MILESTONES: Record<number, string> = {
    3: '🔥 3 z rzędu!',
    5: '🔥🔥 5 z rzędu! Maszyna!',
    10: '🔥🔥🔥 10! Niezłomny Wojownik!',
};

/** Default initial progress state */
export function createInitialProgress(role: 'employee' | 'owner', firstChapterId: string, firstStepId: string): ChatProgress {
    return {
        role,
        currentChapterId: firstChapterId,
        currentStepId: firstStepId,
        lastSeenMessageId: '',
        completedSteps: [],
        completedChapters: [],
        skippedSteps: [],
        totalXP: 0,
        sessionStreak: 0,
        badges: [],
        zabekLevel: 0,
        lastVisit: new Date().toISOString(),
        chatHistory: [],
        activeBranch: null,
    };
}
