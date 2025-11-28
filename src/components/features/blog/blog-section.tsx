import React from "react";

interface BlogSectionProps {
    children: React.ReactNode;
    className?: string;
}

export function BlogSection({ children, className = "" }: BlogSectionProps) {
    return (
        <section className={`mb-12 space-y-6 ${className}`}>
            {children}
        </section>
    );
}
