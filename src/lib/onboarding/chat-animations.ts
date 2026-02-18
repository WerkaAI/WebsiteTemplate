/**
 * Pointer animation types and predefined animation presets.
 *
 * Single source of truth for PointerAnimation config.
 * Used by:
 * - animated-screenshot.tsx (component)
 * - chat-employee-content.ts (content wiring)
 * - chat-types.ts (ChatMedia.pointerAnimation reference)
 *
 * Design: CSS-only @keyframes, zero JS timers.
 * Motion-safe: animations hidden for prefers-reduced-motion.
 */

// ─── Types ────────────────────────────────────────────────────────────

/** A single tap point in the pointer animation sequence */
export interface TapPoint {
    /** X position as percentage (0-100) */
    x: number;
    /** Y position as percentage (0-100) */
    y: number;
    /** Label shown briefly near the pointer */
    label?: string;
}

/** Pointer animation configuration for a screenshot */
export interface PointerAnimation {
    /** Ordered sequence of tap positions */
    taps: TapPoint[];
    /** Total animation duration in seconds (default: 4) */
    durationSec?: number;
    /** Delay before loop restart in seconds (default: 1.5) */
    pauseSec?: number;
}

// ─── Predefined Pointer Animations ────────────────────────────────────

/** emp-c1: Rozlicz zmianę — 3 taps */
export const POINTER_ROZLICZ: PointerAnimation = {
    taps: [
        { x: 25, y: 15, label: 'Rozliczenie' },
        { x: 50, y: 45, label: 'Pracownik' },
        { x: 70, y: 80, label: 'Zatwierdź' },
    ],
    durationSec: 4,
    pauseSec: 1.5,
};

/** emp-b1: Ustaw dostępność — 3 taps */
export const POINTER_DOSTEPNOSC: PointerAnimation = {
    taps: [
        { x: 30, y: 20, label: 'Kalendarz' },
        { x: 50, y: 50, label: 'Dzień' },
        { x: 75, y: 75, label: 'Status' },
    ],
    durationSec: 4,
    pauseSec: 1.5,
};

/** emp-a1: Instalacja PWA (Android) — 3 taps */
export const POINTER_PWA_ANDROID: PointerAnimation = {
    taps: [
        { x: 90, y: 10, label: '⋮ Menu' },
        { x: 50, y: 55, label: 'Dodaj do ekranu' },
        { x: 60, y: 70, label: 'Dodaj' },
    ],
    durationSec: 4,
    pauseSec: 1.5,
};

/** emp-a1: Instalacja PWA (iOS) — 3 taps */
export const POINTER_PWA_IOS: PointerAnimation = {
    taps: [
        { x: 50, y: 90, label: 'Udostępnij' },
        { x: 50, y: 55, label: 'Do ekranu' },
        { x: 70, y: 30, label: 'Dodaj' },
    ],
    durationSec: 4,
    pauseSec: 1.5,
};
