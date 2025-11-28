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
                            "block text-sm transition-colors hover:text-emerald-500",
                            item.level === 3 && "pl-4",
                            activeId === item.id
                                ? "font-medium text-emerald-500"
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
                        {item.text}
                    </a>
                ))}
            </nav>
        </div>
    );
}
