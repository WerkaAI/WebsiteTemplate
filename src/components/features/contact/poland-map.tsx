"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function PolandMap() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Poland contour (simplified SVG path)
    const polandPath =
        "M248.1 32 L249.2 43.2 L256.3 53 L256.1 63.1 L240.8 68.3 L248.7 80.1 L249.2 91.5 L262 113.8 L259.3 120.9 L246.6 123.9 L223.4 145.1 L230 156.6 L224.4 155.1 L200.2 145.3 L181.8 148.9 L169.8 146.3 L154.7 151.8 L141.8 142.7 L131.4 146.2 L129.9 144.6 L118.2 132.1 L99.2 130.5 L96.8 122.5 L79.3 119.7 L75.5 126.3 L61.6 121 L63.2 114 L44.1 111.8 L32 103.5 L21.6 87.3 L23.6 78.5 L17.3 64.8 L8 55.7 L15.1 48.9 L9.2 35.9 L26.6 28.4 L66.4 16.6 L98.5 8 L124 12.3 L125.9 18.5 L150.5 18.9 L181.9 21.8 L228.9 21.4 L241.9 24.1 L248.1 32 Z";

    // Random dots positions (percentage relative to bounding box roughly)
    const dots = [
        { x: 120, y: 110, delay: 0 },   // Center
        { x: 140, y: 60, delay: 0.5 },  // North-East
        { x: 80, y: 80, delay: 1.2 },   // West
        { x: 160, y: 120, delay: 0.8 }, // East
        { x: 200, y: 80, delay: 2.1 },  // Far East
        { x: 100, y: 30, delay: 0.9 },  // North
    ];

    if (!mounted) return <div className="h-64 md:h-full w-full bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse" />;

    return (
        <div className="relative w-full h-full min-h-[300px] flex items-center justify-center p-8 bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="relative w-full max-w-[400px] aspect-[1.3] text-slate-200 dark:text-slate-800">
                <svg viewBox="0 0 270 270" className="w-full h-full drop-shadow-xl filter">
                    {/* Map Body */}
                    <motion.path
                        d={polandPath}
                        fill="currentColor"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="text-white dark:text-slate-800"
                    />

                    {/* Dots */}
                    {dots.map((dot, i) => (
                        <g key={i} transform={`translate(${dot.x}, ${dot.y})`}>
                            <motion.circle
                                r="4"
                                fill="#10b981"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: dot.delay, duration: 0.4 }}
                            />
                            <motion.circle
                                r="12"
                                stroke="#10b981"
                                strokeWidth="1"
                                fill="none"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1.5, opacity: 0 }}
                                transition={{
                                    delay: dot.delay,
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }}
                            />
                        </g>
                    ))}
                </svg>
            </div>

            <div className="absolute bottom-6 left-0 right-0 text-center">
                <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="inline-block text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-900/40 dark:text-emerald-300 px-4 py-1.5 rounded-full backdrop-blur-sm border border-emerald-100 dark:border-emerald-800"
                >
                    Obsługujemy całą Polskę
                </motion.span>
            </div>
        </div>
    );
}
