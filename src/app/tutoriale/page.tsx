import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { getAllTutorials } from '@/lib/tutorials'
import { TutorialGrid } from '@/components/content/tutorial-grid'

export const metadata: Metadata = {
  title: 'Tutoriale AutoŻaba — Krok po kroku',
  description:
    'Zbiór tutoriali dla właścicieli i pracowników sklepów Żabka. Naucz się korzystać z AutoŻaba w codziennej pracy.',
  openGraph: {
    title: 'Tutoriale AutoŻaba',
    description:
      'Dowiedz się jak korzystać z AutoŻaba. Tutoriale dla właścicieli i pracowników sklepów Żabka.',
    type: 'website',
    url: '/tutoriale',
    images: ['/og-image-placeholder.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tutoriale AutoŻaba',
    description:
      'Dowiedz się jak korzystać z AutoŻaba. Tutoriale dla właścicieli i pracowników sklepów Żabka.',
    images: ['/og-image-placeholder.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function TutorialsPage() {
  const tutorials = await getAllTutorials()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="section-padding">
        <section
          className="mx-auto max-w-5xl space-y-6 text-center"
          aria-labelledby="tutoriale-hero-heading"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
            Akademia AutoŻaba
          </p>
          <h1 id="tutoriale-hero-heading" className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Tutoriale krok po kroku
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Znajdziesz tu instrukcje pokazujące, jak w praktyce korzystać z AutoŻaba. Materiały są przygotowane osobno dla
            właścicieli i członków zespołu sklepu, tak aby każdy mógł szybko rozpocząć pracę w systemie.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="#lista-tutoriali">Przeglądaj tutoriale</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/kontakt">Umów onboarding z zespołem</Link>
            </Button>
          </div>
        </section>

        <section id="lista-tutoriali" className="mx-auto mt-16 max-w-6xl">
          <TutorialGrid tutorials={tutorials} />
        </section>

        <section className="mx-auto mt-20 max-w-4xl rounded-3xl border border-border/70 bg-muted/40 p-10 text-center">
          <h2 className="text-2xl font-semibold text-foreground">Brakuje tutorialu?</h2>
          <p className="mt-3 text-muted-foreground">
            Daj nam znać, jakie zadanie chcesz zautomatyzować. Przygotujemy materiał dla Twojego zespołu.
          </p>
          <Button asChild className="mt-6">
            <Link href="mailto:autozaba@ainything.pl">Napisz do nas</Link>
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  )
}
