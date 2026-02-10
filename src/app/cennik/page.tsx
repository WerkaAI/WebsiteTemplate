import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import { pricingFaq, pricingPlans, valueHighlights } from '@/data/pricing'
import { cn } from '@/lib/utils'
import {
  MonitorPlay,
  UserPlus,
  CalendarCheck,
  Timer,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Wallet,
  Rocket,
  HelpCircle,
  MessageSquare,
  Mail
} from 'lucide-react'

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
    title: 'Przedstawienie systemu (30 min)',
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

const onboardingKit = [
  'Demo konto właściciela i pracownika z instrukcją krok po kroku',
  'Karty Startowe z instrukcjami dla pracowników w 2 językach (PL/UA)',
  'Pełna pomoc na każdym etapie wdrożenia AutoŻaby',
  'Szybka linia kontaktu — odpowiedź doradcy w dni robocze do 2h'
]

const onboardingIcons = [MonitorPlay, UserPlus, CalendarCheck]

const costSummary = [
  {
    label: 'Wdrożenie i szkolenie',
    value: '0 zł',
    note: 'Prowadzone przez zespół AutoŻaby w ramach abonamentu.',
    icon: Rocket
  },
  {
    label: 'Opłaty dodatkowe',
    value: '0 zł',
    note: 'Brak prowizji, opłat za pracownika czy ukrytych kosztów.',
    icon: Wallet
  }
]

type PlanCardProps = {
  plan: (typeof pricingPlans)[number]
}

function PlanCard({ plan }: PlanCardProps) {
  const isExternal = !plan.disabled && plan.ctaHref.startsWith('http')
  const cardClasses = cn(
    'relative flex h-full flex-col rounded-3xl p-8 transition-all duration-300 backdrop-blur-xl border border-emerald-900/10 bg-white/60 dark:bg-white/5 dark:border-white/10 shadow-xl !overflow-visible',
    plan.isFeatured
      ? 'ring-1 ring-emerald-400/40 shadow-2xl z-10'
      : 'hover:border-emerald-300/60 hover:-translate-y-1'
  )

  return (
    <article className={cardClasses} aria-label={`Plan ${plan.title}`}>
      {plan.badge && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {plan.badge}
          </span>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-600 dark:border-slate-700/50 dark:bg-slate-900/50 dark:text-slate-300">
            {plan.title}
          </span>
          {plan.bestFor && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-300" aria-label="Rekomendowana wielkość zespołu">
              {plan.bestFor}
            </span>
          )}
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{plan.headline}</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{plan.description}</p>
      </div>

      <div className="mb-8 space-y-1">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">{plan.priceMonthly}</span>
        </div>
        {plan.priceYearly && <p className="text-sm text-slate-500 dark:text-slate-400">{plan.priceYearly} przy rozliczeniu rocznym</p>}
        {plan.annualNote && <p className="text-xs font-medium text-emerald-600 dark:text-emerald-300">{plan.annualNote}</p>}
      </div>

      <div className="flex-1">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700 mb-6" />
        <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-200">
          {plan.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-500 dark:text-emerald-400" aria-hidden />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {plan.disabled ? (
        <span className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-slate-100 px-4 py-3 text-center text-sm font-semibold text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500" aria-disabled>
          {plan.cta}
        </span>
      ) : isExternal ? (
        <a
          href={plan.ctaHref}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-600 hover:shadow-emerald-500/40 active:scale-95"
        >
          {plan.cta}
          <ArrowRight className="h-4 w-4" />
        </a>
      ) : (
        <Link
          href={plan.ctaHref}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-600 hover:shadow-emerald-500/40 active:scale-95"
        >
          {plan.cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}

      {plan.status && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-3xl bg-slate-900/80 px-6 text-center text-white backdrop-blur-md">
          <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300">
            {plan.status.badge}
          </span>
          <div>
            <p className="text-xl font-bold mb-2">{plan.status.headline}</p>
            <p className="text-sm text-slate-300 leading-relaxed">{plan.status.description}</p>
          </div>
        </div>
      )}
    </article>
  )
}

export default function PricingPage() {
  const trialPlan = pricingPlans.find((plan) => plan.id === 'trial')
  const heroPrimaryHref = trialPlan?.ctaHref ?? '/kontakt'
  const heroPrimaryLabel = trialPlan?.cta ?? 'Aktywuj darmowy trial'

  return (
    <div className="relative flex min-h-screen flex-col bg-white text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[780px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/40 via-white/80 to-white dark:from-emerald-900/20 dark:via-slate-950/80 dark:to-slate-950" />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-[100px]" />
        <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px]" />
      </div>

      <Navigation />

      <main className="relative z-10 flex-1">
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
              <ShieldCheck className="h-4 w-4" />
              <span>Transparentne warunki, zero ukrytych kosztów</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl text-balance">
              Inwestycja w spokój<br />i bezpieczeństwo
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              Od 149 zł/mies. za sklep — bez limitu pracowników. Każdy pakiet zawiera automatyzację grafików i wsparcie ochrony przed błędami kodeksowymi.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid gap-8 lg:grid-cols-3 items-stretch max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        {/* Value Bento Grid */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Main Value Prop */}
            <div className="md:col-span-2 rounded-3xl glass-premium p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Wallet className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Płacisz tylko za dostęp</h3>
                <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-md">
                  Żadnych opłat wdrożeniowych. Żadnych limitów na pracownika.
                  Cena jest stała i przewidywalna od pierwszego dnia.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {costSummary.map((item) => (
                    <div key={item.label} className="bg-white/50 dark:bg-slate-900/50 rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/50">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-2xl text-slate-900 dark:text-slate-50">{item.value}</span>
                      </div>
                      <p className="font-medium text-sm text-slate-700 dark:text-slate-200">{item.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="rounded-3xl glass-premium p-8 flex flex-col justify-center bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/10 dark:to-slate-900/50">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Timer className="h-5 w-5 text-emerald-500" />
                W każdym pakiecie
              </h3>
              <ul className="space-y-4">
                {valueHighlights.slice(0, 4).map((highlight) => (
                  <li key={highlight.title} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-none text-emerald-500" />
                    <div>
                      <p className="font-semibold text-sm">{highlight.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{highlight.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Visual Onboarding Timeline */}
        <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Onboarding w 7 dni</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Nie zostawiamy Cię samego. Nasz proces wdrożenia jest zaprojektowany tak,
              abyś w tydzień przeszedł od chaosu do pełnej automatyzacji.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-[28px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-emerald-500 via-emerald-200 to-transparent dark:via-emerald-800 md:left-1/2 md:-ml-px" />

            <div className="space-y-12">
              {onboardingSteps.map((step, index) => {
                const Icon = onboardingIcons[index] ?? MonitorPlay
                return (
                  <div key={step.title} className={cn(
                    "relative flex items-center md:justify-between",
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}>
                    {/* Icon Node */}
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white border-4 border-emerald-50 shadow-lg z-10 dark:bg-slate-900 dark:border-slate-800">
                      <Icon className="h-6 w-6 text-emerald-500" />
                    </div>

                    {/* Content Card */}
                    <div className={cn(
                      "ml-20 md:ml-0 md:w-[42%] p-6 rounded-2xl glass-premium hover:shadow-lg transition-shadow",
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    )}>
                      <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              Umów darmowe wdrożenie
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl glass-premium p-8 md:p-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-100 text-emerald-600 mb-6 dark:bg-emerald-500/20 dark:text-emerald-300">
                <HelpCircle className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Pytania? Mamy odpowiedzi.</h2>
              <p className="text-slate-600 dark:text-slate-300">
                Jeśli nie widzisz odpowiedzi, napisz na{' '}
                <a href="mailto:kontakt@autozaba.pl" className="text-emerald-600 font-medium hover:underline">
                  kontakt@autozaba.pl
                </a>
              </p>
            </div>

            <div className="space-y-4">
              {pricingFaq.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden transition-all hover:bg-white/80 dark:hover:bg-slate-900/80"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-slate-900 dark:text-slate-100 [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <span className="text-emerald-500 transition-transform group-open:rotate-45">
                      <CheckCircle2 className="h-5 w-5 rotate-45 group-open:rotate-0 transition-transform" />
                    </span>
                  </summary>
                  <div className="px-6 pb-5 pt-0 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>


      </main>
      <Footer />
    </div>
  )
}
