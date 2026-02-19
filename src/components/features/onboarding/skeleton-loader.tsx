export function OnboardingSkeleton() {
    return (
        <div className="container-spacing pt-8 pb-24 space-y-8">
            {/* Hero Section Skeleton */}
            <div className="flex flex-col items-center space-y-4 mb-12">
                <div className="w-16 h-16 rounded-full bg-muted/20 animate-pulse" />
                <div className="h-8 w-64 bg-muted/20 rounded-lg animate-pulse" />
                <div className="h-4 w-96 max-w-full bg-muted/20 rounded-lg animate-pulse" />

                {/* Shop Level Bar */}
                <div className="w-full max-w-xl h-24 bg-muted/10 rounded-xl border border-border/50 mt-6 animate-pulse" />
            </div>

            {/* Adventures Skeleton */}
            <div className="space-y-4 max-w-3xl mx-auto">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="w-full h-24 bg-card/50 rounded-xl border border-border/50 animate-pulse" />
                ))}
            </div>
        </div>
    );
}
