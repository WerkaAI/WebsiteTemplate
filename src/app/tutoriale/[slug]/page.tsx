export const runtime = 'nodejs'
export const dynamic = 'error'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getAllTutorialSlugs, loadTutorial } from '@/lib/tutorials'
import type { TutorialMeta } from '@/lib/tutorials'
import { TutorialCard } from '@/components/content/tutorial-card'

interface TutorialPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = await getAllTutorialSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: TutorialPageProps): Promise<Metadata> {
  const tutorial = await loadTutorial(params.slug).catch(() => null)
  if (!tutorial) {
    return {}
  }

  const { title, description, tags, date } = tutorial.meta
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5000'

  return {
    title,
    description,
    alternates: {
      canonical: `/tutoriale/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/tutoriale/${params.slug}`,
      type: 'article',
      tags,
      publishedTime: date,
      images: ['/og-image-placeholder.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image-placeholder.png'],
    },
  }
}

export default async function TutorialPage({ params }: TutorialPageProps) {
  const tutorial = await loadTutorial(params.slug).catch(() => null)
  if (!tutorial) {
    notFound()
  }

  const { Component, meta } = tutorial!
  const formattedDate = format(new Date(meta.date), 'dd MMMM yyyy', { locale: pl })
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5000'
  const TutorialContent = Component
  const relatedTutorials = meta.relatedTutorials
    ? (
        await Promise.all(
          meta.relatedTutorials.map(async relatedSlug => {
            const related = await loadTutorial(relatedSlug).catch(() => null)
            return related ? { slug: relatedSlug, meta: related.meta } : null
          })
        )
      ).filter((entry): entry is { slug: string; meta: TutorialMeta } => Boolean(entry))
    : []

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    author: {
      '@type': 'Organization',
      name: 'AutoŻaba',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AutoŻaba',
    },
    url: `${baseUrl}/tutoriale/${params.slug}`,
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Tutoriale',
        item: `${baseUrl}/tutoriale`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: meta.title,
        item: `${baseUrl}/tutoriale/${params.slug}`,
      },
    ],
  }

  return (
    <div className="bg-background text-foreground">
      <Navigation />
      <main className="section-padding">
        <nav
          aria-label="breadcrumbs"
          className="mx-auto mb-6 w-full max-w-4xl text-sm text-muted-foreground"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/tutoriale" className="hover:text-foreground">Tutoriale</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground">{meta.title}</li>
          </ol>
        </nav>

        <header className="mx-auto max-w-4xl space-y-6 rounded-3xl border border-border/50 bg-card/60 p-10 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            {meta.persona.map(persona => (
              <Badge key={persona} variant="secondary" className="rounded-full bg-primary/10 text-primary">
                {persona}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{meta.title}</h1>
          <p className="text-muted-foreground">{meta.description}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>{formattedDate}</span>
            <span>Poziom: {meta.difficulty}</span>
            <span>Czas: {meta.durationMinutes} min</span>
          </div>
          {meta.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {meta.tags.map(tag => (
                <Badge key={tag} variant="outline">#{tag}</Badge>
              ))}
            </div>
          )}
          <Button asChild variant="default">
            <Link href="#tresc-tutorialu">Rozpocznij tutorial</Link>
          </Button>
        </header>

        <article
          id="tresc-tutorialu"
          className="mx-auto mt-16 max-w-4xl space-y-8 prose prose-slate dark:prose-invert"
        >
          {TutorialContent ? <TutorialContent /> : null}
        </article>

        {relatedTutorials.length > 0 && (
          <section className="mx-auto mt-16 max-w-5xl" aria-label="Powiązane tutoriale">
            <h2 className="text-2xl font-semibold">Powiązane tutoriale</h2>
            <p className="mt-2 text-muted-foreground">
              Zobacz materiały, które pogłębiają omawiany temat.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {relatedTutorials.map(related => (
                <TutorialCard
                  key={related.slug}
                  title={related.meta.title}
                  description={related.meta.description}
                  persona={related.meta.persona}
                  difficulty={related.meta.difficulty}
                  durationMinutes={related.meta.durationMinutes}
                  tags={related.meta.tags}
                  href={`/tutoriale/${related.slug}`}
                  publishDate={related.meta.date}
                />
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {/* GPT-5 Directive: Zadbaj o limit powiązań (max 4) i cache w kolejnych iteracjach. */}
              TODO: Dodaj warstwę cache dla powiązanych tutoriali.
            </p>
          </section>
        )}
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </div>
  )
}
