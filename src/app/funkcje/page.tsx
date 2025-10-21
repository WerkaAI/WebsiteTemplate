import Link from 'next/link'
import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import {
  featureModules,
  legalHighlights,
  benefitGroups,
  onboardingTimeline,
  experienceHighlights,
  heroMetrics
} from '@/data/features'

export const metadata: Metadata = {
  title: 'Funkcje AutoŻaba – Kompletny system dla franczyzobiorców Żabki',
  description:
    'Poznaj moduły AutoŻaba: od automatycznego układania grafików, przez rozliczanie godzin, po wbudowaną tarczę prawną, która chroni przed karami PIP.',
  alternates: {
    canonical: '/funkcje'
  },
  openGraph: {
    title: 'Funkcje AutoŻaba – Automatyczna tarcza prawna dla Żabki',
    description:
      'Zobacz, jak AutoŻaba automatyzuje planowanie grafików, kontroluje zgodność z kodeksem pracy i odciąża franczyzobiorców.',
    url: '/funkcje',
    type: 'website'
  }
}

export default function FunkcjePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <section className="section-padding hero-gradient relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70 mix-blend-overlay">
          <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-16 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <div className="container-spacing grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-200">
              <span aria-hidden="true">§</span>
              AutoŻaba – tarcza prawna w akcji
            </p>
            <h1 className="heading-display text-balance">
              Funkcje, które porządkują chaos operacyjny w sklepach Żabka
            </h1>
            <p className="text-lg text-muted-foreground copy-max">
              AutoŻaba łączy planowanie, prawo pracy i rozliczenia w jednym miejscu. Automatyzuje grafiki, pilnuje zgodności z kodeksem pracy i daje Ci pełny obraz tego, co dzieje się w każdym sklepie – bez nocnych maratonów w Excelu.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="cta-glow">
                  <Link
                    href="https://app.autozaba.pl/register"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90"
                >
                  Rozpocznij 14-dniowy trial
                  <span aria-hidden="true">→</span>
                </Link>
              </span>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
              >
                Umów prezentację na żywo
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur lg:p-8 dark:border-white/10 dark:bg-white/5">
            {heroMetrics.map((metric) => (
              <article
                key={metric.label}
                className="rounded-xl border border-emerald-100/60 bg-emerald-50/80 p-4 shadow-sm transition hover:shadow-md dark:border-emerald-400/30 dark:bg-emerald-400/10"
              >
                <div className="text-3xl font-semibold text-primary lg:text-4xl">{metric.value}</div>
                <p className="mt-1 text-sm font-medium uppercase tracking-wide text-emerald-800 dark:text-emerald-200">
                  {metric.label}
                </p>
                <p className="mt-2 text-sm text-muted-foreground dark:text-emerald-100/80">{metric.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-white via-emerald-50/40 to-white dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-950">
        <div className="container-spacing space-y-12">
          <header className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">Moduły AutoŻaba</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Jeden panel, sześć modułów, pełna kontrola nad personelem i dokumentacją
            </h2>
            <p className="text-lg text-muted-foreground">
              Wszystkie elementy systemu współpracują ze sobą – dane wprowadzone w jednym miejscu automatycznie pojawiają się w pozostałych modułach, abyś nie musiał ich przepisywać ani pilnować ręcznie.
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featureModules.map((module) => (
              <article
                key={module.id}
                className="flex h-full flex-col justify-between rounded-2xl border border-border/70 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
              >
                <div className="space-y-4">
                  {module.badge ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900 dark:bg-emerald-400/20 dark:text-emerald-200">
                      <span aria-hidden="true">●</span>
                      {module.badge}
                    </span>
                  ) : null}
                  <h3 className="text-2xl font-semibold text-foreground">{module.title}</h3>
                  <p className="text-sm text-muted-foreground">{module.summary}</p>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    {module.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-emerald-500/80" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-emerald-50/40 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="container-spacing grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">Tarcza prawna §</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Wiedza prawna dokładnie tam, gdzie zapadają decyzje o grafiku
            </h2>
            <p className="text-lg text-muted-foreground">
              AutoŻaba pokazuje kontekstowe wskazówki prawne i ostrzega przed błędami zanim staną się problemem. Nie musisz wertować kodeksu pracy – otrzymujesz gotową odpowiedź w tym samym widoku.
            </p>
          </div>

          <div className="grid gap-4">
            {legalHighlights.map((item) => (
              <article
                key={item}
                className="rounded-2xl border border-emerald-400/30 bg-white/80 p-5 shadow-sm transition hover:border-emerald-500/50 hover:shadow-md dark:bg-white/5"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-emerald-500/20 text-lg text-emerald-700 dark:bg-emerald-500/30 dark:text-emerald-100">
                    §
                  </span>
                  <p className="text-sm text-muted-foreground dark:text-emerald-50/90">{item}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-spacing space-y-12">
          <header className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">Doświadczenie zespołu</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Zaprojektowany dla franczyzy, dopracowany w realnych sklepach
            </h2>
            <p className="text-lg text-muted-foreground">
              System uczył się na doświadczeniach właścicieli Żabki i ich zespołów. Każdy element interfejsu skraca drogę do najważniejszych czynności i daje podpowiedź, gdy pojawia się ryzyko.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {experienceHighlights.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border/70 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-emerald-50/40 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="container-spacing space-y-10">
          <header className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">Korzyści dla całego ekosystemu</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              AutoŻaba wspiera właściciela, zespół i księgowość jednocześnie
            </h2>
          </header>

          <div className="grid gap-8 md:grid-cols-3">
            {benefitGroups.map((group) => (
              <article
                key={group.audience}
                className="flex h-full flex-col rounded-2xl border border-border/70 bg-white/80 p-6 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="text-xl font-semibold text-foreground">{group.audience}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{group.summary}</p>
                <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                  {group.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-emerald-500/80" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-spacing grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">Wdrożenie krok po kroku</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Pierwszy tydzień z AutoŻaba: od chaosu do kontrolowanego rytmu
            </h2>
            <p className="text-lg text-muted-foreground">
              Wystarczy kilkadziesiąt minut, by przygotować sklepy do pracy z AutoŻabą. Kolejne dni to już tylko akceptowanie gotowych grafików i odbieranie powiadomień o potencjalnych ryzykach.
            </p>
          </div>

          <ol className="space-y-6">
            {onboardingTimeline.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-2xl border border-border/70 bg-muted/60 p-6 shadow-sm transition hover:border-primary/50 hover:bg-primary/5 hover:shadow-md dark:border-white/10 dark:bg-white/5"
              >
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground shadow-md">
                  {index + 1}
                </span>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-padding bg-primary relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
        </div>

        <div className="container-spacing grid gap-10 text-primary-foreground lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <h2 className="text-3xl font-semibold sm:text-4xl text-white">
              Gotowy na spokojny grafik i kontrolę nad dokumentacją?
            </h2>
            <p className="text-lg opacity-90">
              Zespół AutoŻaba pomoże Ci przejść przez wdrożenie, a kontekstowa tarcza prawna będzie czuwać nad przepisami każdego dnia. Zacznij od darmowego trialu albo umów rozmowę z konsultantem.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="https://app.autozaba.pl/register"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-white/90"
              >
                Rozpocznij 14-dniowy trial
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Porozmawiaj z konsultantem
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur">
            <h3 className="text-xl font-semibold text-white">Najważniejsze korzyści w skrócie</h3>
            <ul className="mt-4 space-y-3 text-sm opacity-90">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-white/80" aria-hidden="true" />
                Automatyczne grafiki zgodne z prawem pracy.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-white/80" aria-hidden="true" />
                Ewidencja czasu pracy, gotówki i dokumentów w jednym panelu.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-white/80" aria-hidden="true" />
                Kontekstowa pomoc prawna i wsparcie zespołu 24/7.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
