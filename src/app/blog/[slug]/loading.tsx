export default function Loading() {
  return (
    <main className="container mx-auto max-w-3xl px-4 md:px-6 py-8 lg:py-12">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-2/3 bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-5/6 bg-muted rounded" />
        <div className="h-64 w-full bg-muted rounded" />
      </div>
    </main>
  )
}
