"use client"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="container mx-auto max-w-3xl px-4 md:px-6 py-8 lg:py-12">
      <h2 className="text-2xl font-semibold mb-2">Nie udało się wczytać artykułu</h2>
      <p className="text-muted-foreground mb-6">Prosimy spróbować ponownie lub wrócić później.</p>
      <button
        onClick={() => reset()}
        className="bg-primary text-primary-foreground px-4 py-2 rounded"
      >
        Spróbuj ponownie
      </button>
    </main>
  )
}
