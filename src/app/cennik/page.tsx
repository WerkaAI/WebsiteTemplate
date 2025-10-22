import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { pricingFaq, pricingPlans, valueHighlights } from '@/data/pricing'
import { cn } from '@/lib/utils'
import { MonitorPlay, UserPlus, CalendarCheck, Timer, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  description:
    'Wybierz plan AutoŻaba dopasowany do liczby sklepów i zespołu. Automatyczne grafiki, ewidencja czasu pracy, raporty PIP, wsparcie prawne i onboarding 1:1.',
  alternates: {
    canonical: '/cennik'
  },
  openGraph: {
    title: 'Cennik AutoŻaba — abonament dopasowany do Twojej sieci',
    description:
      'Porównaj plany Starter, Growth i Scale. Automatyczne grafiki, ewidencja czasu pracy, dokumenty PIP i dedykowane wsparcie prawne.',
    url: '/cennik',
    type: 'website'
  }
}

const onboardingSteps = [
  {
    title: 'Przedstawienie systemu (30 minut)',
    description: 'Prezentacja na tablecie i telefonie w Twoim sklepie.'
  },
  {
    title: 'Pomoc we wdrożeniu (tydzień)',
    description: 'Uczymy Ciebie i pracowników korzystania z AutoŻaby.'
  },
  {
    title: 'Twój pierwszy automatyczny grafik',
    description: 'Pełne wsparcie zawsze, gdy go potrzebujesz.'
  }
]

const onboardingMilestones = [
  {
    title: 'Demo i plan startowy',
    description: 'Na żywo na tablecie i telefonie pokazujemy pełny przepływ oraz umawiamy kolejne kroki.'
  },
  {
    title: 'Aktywacja kont i Starter Cards',
    description: 'Zakładamy konta, przekazujemy instrukcje dla zespołu i zbieramy dostępności pracowników.'
  },
  {
    title: 'Sesja online + check-iny',
    description: 'Razem z naszym przedstawicielem opublikujesz swój pierwszy grafik na wideorozmowie (Google Meet).'
  }
]

const onboardingKit = [
  'Demo konto właściciela i pracownika z instrukcją krok po kroku',
  'Karty Startowe z instrukcjami dla pracowników w 2 językach (PL/UA)',
  'Pełna pomoc na każdym etapie wdrożenia AutoŻaby',
  'Szybka linia kontaktu — odpowiedź doradcy w dni robocze do 2h'
]

const onboardingIcons = [MonitorPlay, UserPlus, CalendarCheck]
const highlightIcons = [Timer, ShieldCheck]

const costSummary = [
  {
    label: 'Abonament AutoŻaba',
    value: 'Wkrótce',
    note: 'Cennik publikujemy po zakończeniu programu Early Adopters.',
    status: {
      badge: 'Beta testy',
      headline: 'Abonament w przygotowaniu',
      description: 'Trwa program Early Adopters — zostaw kontakt, aby otrzymać ofertę jako pierwszy.'
    }
  },
  {
    label: 'Wdrożenie i szkolenie',
    value: '0 zł',
    note: 'Prowadzone przez zespół AutoŻaby w ramach abonamentu.'
  },
  {
    label: 'Opłaty dodatkowe',
    value: '0 zł',
    note: 'Brak prowizji, opłat za pracownika czy ukrytych kosztów.'
  }
]

type PlanCardProps = {
  plan: (typeof pricingPlans)[number]
}

function PlanCard({ plan }: PlanCardProps) {
  const isExternal = !plan.disabled && plan.ctaHref.startsWith('http')
  const cardClasses = cn(
    'relative flex h-full flex-col rounded-3xl border p-8 backdrop-blur transition duration-300',
    plan.isFeatured
      ? 'border-emerald-500/60 bg-emerald-50 shadow-[0_25px_80px_-45px_rgba(16,185,129,0.45)] ring-1 ring-emerald-400/40 lg:-translate-y-2 dark:border-emerald-400/60 dark:bg-slate-900/95 dark:ring-emerald-400/30 dark:shadow-[0_25px_80px_-45px_rgba(16,185,129,0.6)]'
      : 'border-slate-200 bg-white hover:border-emerald-300/60 hover:shadow-[0_20px_60px_-45px_rgba(16,185,129,0.35)] dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-emerald-400/30 dark:hover:bg-slate-900/80'
  )

  return (
  <article className={cardClasses} aria-label={`Plan ${plan.title}`}>
      {plan.badge && (
        <span className="absolute -top-3 left-6 inline-flex rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-emerald-950 shadow-lg">
          {plan.badge}
        </span>
      )}
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:border-slate-700/80 dark:bg-slate-950/80 dark:text-slate-200">
          {plan.title}
        </span>
        {plan.bestFor && (
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-200" aria-label="Rekomendowana wielkość zespołu">
            {plan.bestFor}
          </span>
        )}
      </div>
      <h3 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-slate-50">{plan.headline}</h3>
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{plan.description}</p>
      <div className="mt-6 space-y-1">
        <p className="text-3xl font-semibold text-emerald-500 dark:text-emerald-300">{plan.priceMonthly}</p>
        {plan.priceYearly && <p className="text-sm text-slate-500 dark:text-slate-200">{plan.priceYearly} przy rozliczeniu rocznym</p>}
        {plan.annualNote && <p className="text-xs text-emerald-500 dark:text-emerald-200">{plan.annualNote}</p>}
      </div>
      <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-600 dark:text-slate-200">
        {plan.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2.5 w-2.5 flex-none rounded-full bg-emerald-500 dark:bg-emerald-400" aria-hidden />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
      {plan.disabled ? (
        <span className="mt-8 inline-flex items-center justify-center rounded-xl bg-slate-700/60 px-4 py-2 text-center text-sm font-semibold text-slate-200 opacity-70" aria-disabled>
          {plan.cta}
        </span>
      ) : isExternal ? (
        <a
          href={plan.ctaHref}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-emerald-400 px-4 py-2 text-center text-sm font-semibold text-emerald-950 shadow-[0_0_40px_rgba(16,185,129,0.35)] transition hover:bg-emerald-300"
        >
          {plan.cta}
        </a>
      ) : (
        <Link
          href={plan.ctaHref}
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-emerald-400 px-4 py-2 text-center text-sm font-semibold text-emerald-950 shadow-[0_0_40px_rgba(16,185,129,0.35)] transition hover:bg-emerald-300"
        >
          {plan.cta}
        </Link>
      )}

      {plan.status && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-3xl bg-slate-950/70 px-6 text-center text-white backdrop-blur-sm">
          <span className="inline-flex items-center rounded-full border border-emerald-300/60 bg-emerald-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-100">
            {plan.status.badge}
          </span>
          <p className="text-lg font-semibold">{plan.status.headline}</p>
          <p className="text-sm text-white/80">{plan.status.description}</p>
        </div>
      )}
    </article>
  )
}

export default function PricingPage() {
  const trialPlan = pricingPlans.find((plan) => plan.id === 'trial')
  const featuredPlan = pricingPlans.find((plan) => plan.isFeatured)
  const heroPrimaryHref = trialPlan?.ctaHref ?? '/kontakt'
  const heroPrimaryLabel = trialPlan?.cta ?? 'Aktywuj darmowy trial'
  const heroSecondaryHref = featuredPlan?.ctaHref ?? '/kontakt'
  const keyHighlights = valueHighlights.slice(0, 2)

  return (
    <div className="relative flex min-h-screen flex-col bg-white text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[780px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-200/45 via-emerald-50/60 to-white dark:from-emerald-500/15 dark:via-slate-900/65 dark:to-slate-950" />
        <div className="absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.2),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.45),transparent_60%)]" />
      </div>
      <Navigation />
      <main className="relative z-10 flex-1">
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-100">
                Cennik
                <span aria-hidden>•</span>
                Transparentne warunki
              </span>
              <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
                Dobierz plan AutoŻaby do tempa rozwoju Twojej sieci
              </h1>
              <p className="mt-6 text-lg text-slate-700 dark:text-slate-200">
                Każdy plan obejmuje automatyczne grafiki, ewidencję czasu pracy oraz dokumenty PIP. Różnice dotyczą poziomu wsparcia i raportowania.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {heroPrimaryHref.startsWith('http') ? (
                  <a
                    href={heroPrimaryHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-[0_0_45px_rgba(16,185,129,0.35)] transition hover:bg-emerald-300"
                  >
                    {heroPrimaryLabel}
                    <span aria-hidden>→</span>
                  </a>
                ) : (
                  <Link
                    href={heroPrimaryHref}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-[0_0_45px_rgba(16,185,129,0.35)] transition hover:bg-emerald-300"
                  >
                    {heroPrimaryLabel}
                    <span aria-hidden>→</span>
                  </Link>
                )}
                <Link
                  href={heroSecondaryHref}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-300/50 bg-slate-950/60 px-6 py-3 text-sm font-semibold text-emerald-200 transition hover:border-emerald-200/80 hover:text-emerald-100"
                >
                  Porozmawiaj z zespołem
                  <span aria-hidden>↗</span>
                </Link>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {keyHighlights.map((highlight, index) => {
                  const Icon = highlightIcons[index] ?? Timer
                  return (
                    <details
                      key={highlight.title}
                      className="group overflow-hidden rounded-3xl border border-emerald-200/50 bg-white/80 text-left shadow-sm transition dark:border-emerald-300/20 dark:bg-slate-950/70"
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-4 bg-white/70 px-6 py-4 text-sm font-semibold text-slate-900 transition hover:bg-white group-open:bg-emerald-500/10 group-open:text-emerald-600 dark:bg-slate-950/50 dark:text-slate-100 dark:hover:bg-slate-950/70 [&::-webkit-details-marker]:hidden">
                        <span className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 group-open:bg-emerald-500/20 group-open:text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-200">
                            <Icon className="h-5 w-5" aria-hidden />
                          </span>
                          {highlight.title}
                        </span>
                        <span className="text-lg font-semibold text-emerald-500 transition group-open:rotate-45 group-open:text-emerald-600">
                          +
                        </span>
                      </summary>
                      <div className="border-t border-emerald-200/40 px-6 pb-5 pt-4 text-sm text-slate-600 dark:border-emerald-300/20 dark:text-slate-300">
                        {highlight.description}
                      </div>
                    </details>
                  )
                })}
              </div>
            </div>
            <aside className="relative overflow-hidden rounded-3xl border border-emerald-200/40 bg-emerald-50/70 p-8 shadow-sm dark:border-emerald-400/25 dark:bg-slate-900/80">
              <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-400/10" aria-hidden />
              <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10" aria-hidden />
              <div className="relative z-10">
                <h2 className="text-lg font-semibold text-emerald-700 dark:text-emerald-100">AutoŻaba — start w 3 krokach</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Na każdym etapie wspiera Cię dedykowany opiekun.
                </p>
                <ol className="mt-6 space-y-5 text-sm text-slate-700 dark:text-slate-200">
                  {onboardingSteps.map((step, index) => {
                    const Icon = onboardingIcons[index] ?? MonitorPlay
                    return (
                      <li key={step.title} className="flex items-start gap-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/40 bg-white text-emerald-600 shadow-sm dark:border-emerald-300/40 dark:bg-slate-950/40 dark:text-emerald-200">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-slate-50">{step.title}</p>
                          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{step.description}</p>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="text-center">
              <p className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-emerald-200">
                Koszty w skrócie
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-slate-50">Płacisz tylko za dostęp do systemu</h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Żadnych opłat wdrożeniowych ani limitów na pracownika. Koszty są jasne od pierwszego dnia.
              </p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {costSummary.map((item) => (
                <div
                  key={item.label}
                  className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-5 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950/70"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-200">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-50">{item.value}</p>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">{item.note}</p>
                  {item.status && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-slate-950/75 px-4 text-center text-white backdrop-blur-sm">
                      <span className="inline-flex items-center rounded-full border border-emerald-300/60 bg-emerald-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-100">
                        {item.status.badge}
                      </span>
                      <p className="text-sm font-semibold">{item.status.headline}</p>
                      <p className="text-xs text-white/80">{item.status.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-emerald-200">
              Porównaj pakiety
            </p>
            <h2 className="mt-6 text-balance text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-slate-50">
              Trzy opcje, dzięki którym utrzymasz porządek niezależnie od liczby sklepów
            </h2>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              Każdy plan zawiera monitoring zgodności z kodeksem pracy, dokumenty PIP i wsparcie ekspertów AutoŻaby.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-emerald-200/40 bg-emerald-50/80 p-8 shadow-sm dark:border-emerald-400/25 dark:bg-slate-900/75">
              <h2 className="text-lg font-semibold text-emerald-700 dark:text-emerald-200">Onboarding w 7 dni</h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Każdy etap prowadzimy razem z Tobą — od pierwszego demo po powtarzalne grafiki.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                {onboardingMilestones.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2.5 w-2.5 flex-none rounded-full bg-emerald-500 dark:bg-emerald-300" aria-hidden />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">{item.title}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/kontakt"
                className="mt-6 inline-flex items-center justify-center rounded-full border border-emerald-400/60 bg-transparent px-5 py-2 text-sm font-semibold text-emerald-600 transition hover:border-emerald-500 hover:text-emerald-500 dark:border-emerald-300/50 dark:text-emerald-200 dark:hover:border-emerald-200 dark:hover:text-emerald-100"
              >
                Umów demo lub wizytę w sklepie
              </Link>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Co dostajesz na starcie</h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Wszystkie materiały i narzędzia, żeby zespół mógł zacząć pracować od razu.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-200">
                {onboardingKit.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2.5 w-2.5 flex-none rounded-full bg-emerald-500 dark:bg-emerald-400" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-5xl px-4 pb-28 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="text-center">
              <p className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:border-slate-800 dark:bg-slate-950/80 dark:text-emerald-200">
                FAQ
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-50">Najczęściej zadawane pytania</h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Jeśli nie widzisz odpowiedzi, napisz na{' '}
                <a href="mailto:kontakt@autozaba.pl" className="text-emerald-600 underline underline-offset-2 dark:text-emerald-300">
                  kontakt@autozaba.pl
                </a>{' '}
                — odpowiemy w ciągu jednego dnia roboczego.
              </p>
            </div>
            <div className="mt-10 space-y-4">
              {pricingFaq.map((item, index) => (
                <details
                  key={item.question}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition dark:border-slate-800 dark:bg-slate-950/60"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-base font-semibold text-slate-900 transition hover:bg-slate-100/70 group-open:bg-emerald-500/10 group-open:text-emerald-600 dark:text-slate-50 dark:hover:bg-slate-900/70 [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <span className="text-lg font-semibold text-emerald-500 transition group-open:rotate-45 group-open:text-emerald-600">+</span>
                  </summary>
                  <div className="border-t border-slate-200 px-5 py-4 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
          <div className="mt-12 rounded-3xl border border-emerald-200/40 bg-emerald-50/70 p-10 text-center shadow-sm dark:border-emerald-400/20 dark:bg-emerald-400/5">
            <h2 className="text-2xl font-semibold text-emerald-700 dark:text-emerald-100">Gotowy, by zobaczyć AutoŻabę w akcji?</h2>
            <p className="mt-3 text-sm text-emerald-700 dark:text-emerald-200">
              Aktywuj trial lub umów spotkanie — pokażemy Ci, jak w dwa tygodnie uporządkować grafiki i dokumentację.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {heroPrimaryHref.startsWith('http') ? (
                <a
                  href={heroPrimaryHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300"
                >
                  {heroPrimaryLabel}
                  <span aria-hidden>→</span>
                </a>
              ) : (
                <Link
                  href={heroPrimaryHref}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300"
                >
                  {heroPrimaryLabel}
                  <span aria-hidden>→</span>
                </Link>
              )}
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 bg-transparent px-5 py-2 text-sm font-semibold text-emerald-600 transition hover:border-emerald-500 hover:text-emerald-500 dark:border-emerald-200/60 dark:text-emerald-100 dark:hover:border-emerald-100 dark:hover:text-emerald-50"
              >
                Poproś o indywidualną wycenę
                <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
