import React from "react";
import { CheckCircle2 } from "lucide-react";

interface BlogChecklistProps {
    items: string[];
}

export function BlogChecklist({ items }: BlogChecklistProps) {
    return (
        <ul className="my-6 space-y-3">
            {items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-500" />
                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                </li>
            ))}
        </ul>
    );
}
