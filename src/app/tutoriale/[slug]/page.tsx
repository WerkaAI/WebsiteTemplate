export const runtime = 'nodejs'
export const dynamic = 'error'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
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
import { getCspNonce } from '@/lib/security/csp'

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

  const { title, description, tags, date, cover } = tutorial.meta
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
  images: cover ? [cover] : ['/og-image-placeholder.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
  images: cover ? [cover] : ['/og-image-placeholder.png'],
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
  const nonce = getCspNonce()
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
    image: meta.cover ?? `${baseUrl}/og-image-placeholder.png`,
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

        <header className="mx-auto max-w-5xl">
          {meta.cover ? (
            <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-slate-900 text-slate-50 shadow-xl">
              <Image
                src={meta.cover}
                alt={meta.title}
                fill
                priority
                className="absolute inset-0 h-full w-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/75 to-slate-900/85 dark:from-slate-950/95 dark:via-slate-950/80 dark:to-slate-950/90" />
              <div className="relative z-10 space-y-6 p-8 text-center md:p-12">
                <div className="flex flex-wrap justify-center gap-3">
                  {meta.persona.map(persona => (
                    <Badge
                      key={persona}
                      variant="secondary"
                      className="border-white/25 bg-emerald-500/20 text-emerald-100"
                    >
                      {persona}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{meta.title}</h1>
                <p className="text-base text-slate-200 md:text-lg">{meta.description}</p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-200/85">
                  <span>{formattedDate}</span>
                  <span>Poziom: {meta.difficulty}</span>
                  <span>Czas: {meta.durationMinutes} min</span>
                </div>
                {meta.tags.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2">
                    {meta.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="border-white/30 bg-white/10 text-slate-100">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <Button asChild size="sm" className="bg-emerald-500 text-emerald-950 hover:bg-emerald-500/90">
                  <Link href="#tresc-tutorialu">Rozpocznij tutorial</Link>
                </Button>
              </div>
            </section>
          ) : (
            <div className="space-y-6 rounded-3xl border border-border/50 bg-card/60 p-10 text-center">
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
            </div>
          )}
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
                  cover={related.meta.cover}
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
  <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
  <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </div>
  )
}
