import React from "react";
import { cn } from "@/lib/utils";

interface TutorialStepProps {
    stepNumber: number | string;
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function TutorialStep({
    stepNumber,
    title,
    children,
    className,
}: TutorialStepProps) {
    return (
        <div className={cn("relative pl-10 md:pl-12 my-8", className)}>
            <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm ring-4 ring-white dark:bg-emerald-900/50 dark:text-emerald-400 dark:ring-slate-950">
                {stepNumber}
            </div>
            <div className="space-y-3">
                <h3 className="text-xl font-semibold tracking-tight text-foreground mt-0.5">
                    {title}
                </h3>
                <div className="text-muted-foreground leading-relaxed prose-p:my-2">
                    {children}
                </div>
            </div>
        </div>
    );
}
