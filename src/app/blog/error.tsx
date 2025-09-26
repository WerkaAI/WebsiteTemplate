"use client"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-spacing py-16">
      <h2 className="text-2xl font-semibold mb-2">Coś poszło nie tak</h2>
      <p className="text-muted-foreground mb-6">Spróbuj odświeżyć stronę lub wrócić później.</p>
      <button
        onClick={() => reset()}
        className="bg-primary text-primary-foreground px-4 py-2 rounded"
      >
        Spróbuj ponownie
      </button>
    </div>
  )
}
