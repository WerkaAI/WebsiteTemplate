import React from "react";
import { AlertCircle, Info, Lightbulb, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "tip" | "success" | "note";

interface BlogCalloutProps {
    type?: CalloutType;
    title?: string;
    children: React.ReactNode;
}

const styles = {
    info: {
        border: "border-blue-500/20",
        bg: "bg-blue-500/5",
        icon: Info,
        iconColor: "text-blue-500",
        titleColor: "text-blue-700 dark:text-blue-300",
    },
    warning: {
        border: "border-amber-500/20",
        bg: "bg-amber-500/5",
        icon: AlertCircle,
        iconColor: "text-amber-500",
        titleColor: "text-amber-700 dark:text-amber-300",
    },
    tip: {
        border: "border-emerald-500/20",
        bg: "bg-emerald-500/5",
        icon: Lightbulb,
        iconColor: "text-emerald-500",
        titleColor: "text-emerald-700 dark:text-emerald-300",
    },
    success: {
        border: "border-green-500/20",
        bg: "bg-green-500/5",
        icon: CheckCircle,
        iconColor: "text-green-500",
        titleColor: "text-green-700 dark:text-green-300",
    },
    note: {
        border: "border-slate-500/20",
        bg: "bg-slate-500/5",
        icon: Info,
        iconColor: "text-slate-500",
        titleColor: "text-slate-700 dark:text-slate-300",
    },
};

export function BlogCallout({ type = "info", title, children }: BlogCalloutProps) {
    const style = styles[type];
    const Icon = style.icon;

    return (
        <div
            className={cn(
                "my-8 rounded-xl border p-6",
                style.border,
                style.bg
            )}
        >
            <div className="flex items-start gap-4">
                <Icon className={cn("mt-1 h-5 w-5 shrink-0", style.iconColor)} />
                <div className="space-y-2">
                    {title && (
                        <h4 className={cn("font-semibold", style.titleColor)}>{title}</h4>
                    )}
                    <div className="text-slate-700 dark:text-slate-300 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
