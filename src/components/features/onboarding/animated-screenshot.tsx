/**
 * Animated Screenshot / Video — visual instruction overlay for onboarding chat.
 *
 * Phase 1.5 feature — annotated screenshots OR inline looping videos
 * with optional CSS pointer animation overlay.
 *
 * Architecture:
 * - Static annotated screenshot (PNG, lazy-loaded via next/image)
 * - Inline video (MP4, autoplay + loop + muted + playsinline, no controls)
 * - Optional "pointer animation" overlay: an SVG cursor that moves through
 *   a sequence of tap positions via CSS @keyframes (pure CSS, zero JS)
 *
 * Design constraints:
 * - All animation is CSS-only (no JS timers, no framer-motion)
 * - motion-safe: prefix — disabled for prefers-reduced-motion
 * - Fallback: static image / first frame when animation disabled
 * - Image dimensions: max 750px wide, ~30-80KB each
 * - Video: autoplay, loop, muted (mobile-safe), playsinline (iOS)
 */

'use client';

import { memo, useMemo, useId, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { PointerAnimation } from '@/lib/onboarding/chat-animations';

// Re-export for convenience
export type { PointerAnimation, TapPoint } from '@/lib/onboarding/chat-animations';
export {
    POINTER_ROZLICZ,
    POINTER_DOSTEPNOSC,
    POINTER_PWA_ANDROID,
    POINTER_PWA_IOS,
} from '@/lib/onboarding/chat-animations';

interface AnimatedScreenshotProps {
    /** Image/video source path (relative to /public) */
    src: string;
    /** Alt text for accessibility */
    alt: string;
    /** Media type — 'image' renders via next/image, 'video' renders inline <video> */
    mediaType?: 'image' | 'video';
    /** Image width for layout stability (ignored for video) */
    width?: number;
    /** Image height for layout stability (ignored for video) */
    height?: number;
    /** Optional poster image for video (first frame fallback) */
    poster?: string;
    /** Optional caption below media */
    caption?: string;
    /** Optional pointer animation overlay */
    pointerAnimation?: PointerAnimation;
    /** Playback rate for video (e.g. 0.5 = half speed, default 1) */
    playbackRate?: number;
    /** Additional CSS classes */
    className?: string;
}

// ─── Component ────────────────────────────────────────────────────────

export const AnimatedScreenshot = memo(function AnimatedScreenshot({
    src,
    alt,
    mediaType = 'image',
    width = 750,
    height = 468,
    poster,
    caption,
    pointerAnimation,
    playbackRate,
    className,
}: AnimatedScreenshotProps) {
    // Unique id to prevent keyframe name collision when multiple instances render
    const uid = useId().replace(/:/g, '');
    const videoRef = useRef<HTMLVideoElement>(null);

    // Ensure video plays on mount (some browsers block autoplay until in viewport)
    useEffect(() => {
        if (mediaType === 'video' && videoRef.current) {
            if (playbackRate && playbackRate !== 1) {
                videoRef.current.playbackRate = playbackRate;
            }
            videoRef.current.play().catch(() => {
                // Autoplay blocked — that's fine, user can see the poster/first frame
            });
        }
    }, [mediaType, playbackRate]);

    // Generate CSS keyframes for the pointer path
    const animationStyle = useMemo(() => {
        if (!pointerAnimation) return null;

        const { taps, durationSec = 4, pauseSec = 1.5 } = pointerAnimation;
        if (taps.length === 0) return null;

        const totalDuration = durationSec + pauseSec;
        const activeFraction = durationSec / totalDuration;
        const stepDuration = activeFraction / taps.length;

        // Build keyframe percentages
        const keyframes: string[] = [];
        taps.forEach((tap, i) => {
            const startPct = (i * stepDuration * 100).toFixed(1);
            const holdPct = ((i * stepDuration + stepDuration * 0.4) * 100).toFixed(1);
            const tapPct = ((i * stepDuration + stepDuration * 0.5) * 100).toFixed(1);
            const releasePct = ((i * stepDuration + stepDuration * 0.7) * 100).toFixed(1);
            const endPct = (((i + 1) * stepDuration) * 100).toFixed(1);

            // Move to position
            keyframes.push(
                `${startPct}% { left: ${tap.x}%; top: ${tap.y}%; transform: translate(-50%, -50%) scale(1); opacity: 1; }`,
            );
            // Hold at position
            keyframes.push(
                `${holdPct}% { left: ${tap.x}%; top: ${tap.y}%; transform: translate(-50%, -50%) scale(1); opacity: 1; }`,
            );
            // Tap (press down)
            keyframes.push(
                `${tapPct}% { left: ${tap.x}%; top: ${tap.y}%; transform: translate(-50%, -50%) scale(0.75); opacity: 1; }`,
            );
            // Release
            keyframes.push(
                `${releasePct}% { left: ${tap.x}%; top: ${tap.y}%; transform: translate(-50%, -50%) scale(1); opacity: 1; }`,
            );
            // Move out (or hold for last)
            if (i < taps.length - 1) {
                keyframes.push(
                    `${endPct}% { left: ${tap.x}%; top: ${tap.y}%; transform: translate(-50%, -50%) scale(1); opacity: 1; }`,
                );
            }
        });

        // Pause phase: fade out and reset
        const activeEndPct = (activeFraction * 100).toFixed(1);
        const lastTap = taps[taps.length - 1];
        keyframes.push(
            `${activeEndPct}% { left: ${lastTap.x}%; top: ${lastTap.y}%; transform: translate(-50%, -50%) scale(1); opacity: 0; }`,
        );
        keyframes.push(
            `100% { left: ${taps[0].x}%; top: ${taps[0].y}%; transform: translate(-50%, -50%) scale(1); opacity: 0; }`,
        );

        const kfName = `onb-ptr-${uid}`;
        const keyframeCSS = `@keyframes ${kfName} { ${keyframes.join(' ')} }`;
        const animCSS = `${kfName} ${totalDuration}s ease-in-out infinite`;

        return { keyframeCSS, animCSS, totalDuration };
    }, [pointerAnimation, uid]);

    return (
        <div className={cn('relative', className)}>
            {/* Screenshot image or inline video */}
            <div className="relative rounded-lg overflow-hidden bg-muted">
                {mediaType === 'video' ? (
                    <video
                        ref={videoRef}
                        src={src}
                        poster={poster}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        disablePictureInPicture
                        disableRemotePlayback
                        className="w-full h-auto rounded-lg"
                        aria-label={alt}
                    />
                ) : (
                    <Image
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        className="w-full h-auto rounded-lg"
                        loading="lazy"
                        placeholder="empty"
                    />
                )}

                {/* Pointer animation overlay (CSS-only) */}
                {animationStyle && (
                    <>
                        {/* Inject keyframes via <style> */}
                        <style dangerouslySetInnerHTML={{ __html: animationStyle.keyframeCSS }} />

                        {/* Animated pointer / Finger tap cursor */}
                        <div
                            className="absolute pointer-events-none motion-safe:block hidden"
                            style={{
                                animation: animationStyle.animCSS,
                                left: `${pointerAnimation!.taps[0].x}%`,
                                top: `${pointerAnimation!.taps[0].y}%`,
                                transform: 'translate(-50%, -50%) scale(1)',
                                willChange: 'transform, opacity',
                                width: '36px',
                                height: '36px',
                                zIndex: 10,
                            }}
                        >
                            {/* Tap ring with pulse */}
                            <div className="absolute inset-0 rounded-full bg-red-500/30 border-2 border-red-500 ring-2 ring-white" />
                            {/* Finger tap dot (center) */}
                            <div className="absolute inset-[10px] rounded-full bg-red-500 ring-1 ring-white shadow-md" aria-hidden="true" />
                        </div>

                        {/* Tap ripple at each point (static, shows sequence numbers) */}
                        {pointerAnimation!.taps.map((tap, i) => (
                            <div
                                key={i}
                                className="absolute pointer-events-none"
                                style={{
                                    left: `${tap.x}%`,
                                    top: `${tap.y}%`,
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 5,
                                }}
                            >
                                {/* Step number circle */}
                                <div className="w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center ring-2 ring-white shadow-md">
                                    {i + 1}
                                </div>
                                {/* Label */}
                                {tap.label && (
                                    <span className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-red-600 bg-white/90 rounded px-1.5 py-0.5 ring-1 ring-red-200 shadow-sm">
                                        {tap.label}
                                    </span>
                                )}
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* Caption */}
            {caption && (
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed text-center">
                    {caption}
                </p>
            )}
        </div>
    );
});
