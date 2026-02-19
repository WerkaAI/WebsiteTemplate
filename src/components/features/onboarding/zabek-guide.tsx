'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ZabekGuideProps {
    message?: string;
    isVisible?: boolean;
}

/**
 * Żabek mascot guide component.
 * Displays a friendly frog with optional speech bubble.
 * 
 * NOTE: Replace the emoji with your custom SVG/Lottie asset.
 * Suggested: Place your asset at /public/images/zabek-mascot.svg
 */
export function ZabekGuide({ message, isVisible = true }: ZabekGuideProps) {
    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="flex items-end gap-3"
        >
            {/* Mascot */}
            <div className="relative">
                {/* 
          TODO: Replace this placeholder with your custom Żabek asset
          Example: <Image src="/images/zabek-mascot.svg" alt="Żabek" width={80} height={80} />
        */}
                <motion.div
                    animate={{
                        y: [0, -5, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: 'easeInOut'
                    }}
                    className="text-6xl select-none"
                    role="img"
                    aria-label="Żabek - Twój przewodnik"
                >
                    🐸
                </motion.div>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 blur-xl bg-brand-green/20 rounded-full -z-10" />
            </div>

            {/* Speech bubble */}
            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, x: -10, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -10, scale: 0.9 }}
                        className="relative bg-white dark:bg-card border border-border rounded-2xl rounded-bl-sm p-4 shadow-lg max-w-xs"
                    >
                        {/* Tail */}
                        <div className="absolute left-0 bottom-2 w-3 h-3 bg-white dark:bg-card border-l border-b border-border transform -translate-x-1/2 rotate-45" />

                        <p className="text-sm text-foreground font-medium">
                            {message}
                        </p>
                        <span className="block text-xs text-muted-foreground mt-1">
                            — Żabek 🐸
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
