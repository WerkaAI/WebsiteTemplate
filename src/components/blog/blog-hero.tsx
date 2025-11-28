import React from "react";
import { Badge } from "@/components/ui/badge";

interface BlogHeroProps {
    eyebrow: string;
    title: string;
    lead: string;
    metrics?: { label: string; icon: string }[];
}

export function BlogHero({ eyebrow, title, lead, metrics }: BlogHeroProps) {
    return (
        <div className="mb-12 space-y-6 border-b border-border/40 pb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-500">
                {eyebrow}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl lg:text-6xl">
                {title}
            </h1>
            <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-300 md:text-2xl">
                {lead}
            </p>
            {metrics && metrics.length > 0 && (
                <div className="flex flex-wrap gap-3 pt-4">
                    {metrics.map((metric, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className="bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        >
                            <span className="mr-2">{metric.icon}</span>
                            {metric.label}
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
}
