import React from "react";
import { ListChecks } from "lucide-react";

interface TLDRProps {
    items: string[];
}

export function TLDR({ items }: TLDRProps) {
    return (
        <div className="mb-10 rounded-2xl bg-slate-100 p-6 dark:bg-slate-900 md:p-8">
            <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                    <ListChecks className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    TL;DR – W skrócie
                </h3>
            </div>
            <ul className="space-y-3">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
