"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents() {
    const [headings, setHeadings] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll("article h2, article h3"))
            .map((element) => ({
                id: element.id,
                text: element.textContent || "",
                level: Number(element.tagName.substring(1)),
            }))
            .filter((item) => item.id); // Only include items with IDs

        setHeadings(elements);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -80% 0px" }
        );

        elements.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                W tym artykule
            </h3>
            <nav className="space-y-1">
                {headings.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={cn(
                            "group flex items-start py-2 px-3 -mx-3 rounded-lg text-sm transition-all duration-200",
                            "hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-emerald-600 dark:hover:text-emerald-400",
                            item.level === 3 && "ml-4 w-[calc(100%-16px)] text-xs",
                            activeId === item.id
                                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-medium"
                                : "text-muted-foreground"
                        )}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(item.id)?.scrollIntoView({
                                behavior: "smooth",
                            });
                            setActiveId(item.id);
                        }}
                    >
                        <span className={cn(
                            "mr-2 mt-0.5 transition-transform duration-200",
                            activeId === item.id ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-50"
                        )}>
                            →
                        </span>
                        {item.text}
                    </a>
                ))}
            </nav>
        </div >
    );
}
