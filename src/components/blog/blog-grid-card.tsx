import React from "react";

interface BlogGridCardProps {
    title: string;
    children: React.ReactNode;
}

export function BlogGridCard({ title, children }: BlogGridCardProps) {
    return (
        <div className="rounded-xl border border-border/50 bg-slate-50 p-6 dark:bg-slate-900/50">
            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                {title}
            </h3>
            <div className="text-sm text-slate-600 dark:text-slate-400">
                {children}
            </div>
        </div>
    );
}
