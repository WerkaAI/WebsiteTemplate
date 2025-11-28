import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { getAllTutorials } from '@/lib/tutorials'
import { TutorialGrid } from '@/components/content/tutorial-grid'
import { GraduationCap, ArrowRight, MessageSquare } from 'lucide-react'

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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5000'

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: tutorials.map((tutorial, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${baseUrl}/tutoriale/${tutorial.slug}`,
      name: tutorial.meta.title,
      description: tutorial.meta.description,
    })),
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Navigation />
      <main>
        <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="absolute top-1/2 -left-24 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
          </div>

          <div className="container-spacing relative z-10 text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
              <GraduationCap className="h-4 w-4" />
              <span>Centrum Edukacji</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Tutoriale krok po kroku
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Naucz się w pełni wykorzystywać potencjał AutoŻaby.
              Od pierwszego logowania po zaawansowane raporty.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 hover:scale-105 active:scale-95"
              >
                Umów szkolenie dla zespołu
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section id="lista-tutoriali" className="container-spacing pb-24">
          <TutorialGrid tutorials={tutorials} />
        </section>

        <section className="container-spacing pb-24">
          <div className="rounded-3xl glass-premium p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <MessageSquare className="w-48 h-48" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Brakuje tutorialu?</h2>
              <p className="text-muted-foreground text-lg">
                Daj nam znać, jakie zadanie sprawia Ci trudność lub co chcesz zautomatyzować.
                Przygotujemy dedykowany materiał wideo dla Twojego zespołu.
              </p>
              <Button asChild size="lg" className="rounded-full">
                <Link href="mailto:autozaba@ainything.pl">Zgłoś propozycję tematu</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
