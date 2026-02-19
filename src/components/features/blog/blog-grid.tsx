import React from "react";

interface BlogGridProps {
    children: React.ReactNode;
}

export function BlogGrid({ children }: BlogGridProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 my-8">
            {children}
        </div>
    );
}
