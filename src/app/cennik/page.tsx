import type { Metadata } from 'next'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import { pricingFaq, pricingSteps, pricingConfig, universalFeatures, valueHighlights } from '@/data/pricing'
import { cn } from '@/lib/utils'
import {
  MonitorPlay,
  UserPlus,
  CalendarCheck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Wallet,
  Rocket,
  HelpCircle,
  Sparkles,
  Gift,
  Store,
} from 'lucide-react'
import PriceCalculator from './price-calculator'

export const metadata: Metadata = {
  description:
    'AutoŻaba — jeden system, prosta cena. 14 dni za darmo, potem 149 zł/mies. za sklep. Bez limitu pracowników, pełna ochrona prawna.',
  alternates: {
    canonical: '/cennik'
  },
  openGraph: {
    title: 'Cennik AutoŻaba — prosta cena, pełna ochrona',
    description:
      '14 dni za darmo. Potem 149 zł/mies. za sklep (promocja -25%). Automatyczne grafiki, ewidencja, dokumenty PIP — bez limitu pracowników.',
    url: '/cennik',
    type: 'website'
  }
}

const onboardingSteps = [
  {
    title: 'Pokazujemy Ci system (30 min)',
    description: 'Prezentacja na tablecie i telefonie — w Twoim sklepie lub przez wideorozmowę.'
  },
  {
    title: 'Pomagamy we wdrożeniu (tydzień)',
    description: 'Uczymy Ciebie i pracowników korzystania z AutoŻaby.'
  },
  {
    title: 'Twój pierwszy automatyczny grafik',
    description: 'Pełne wsparcie zawsze, gdy go potrzebujesz.'
  }
]

const onboardingKit = [
  'Konto demo z instrukcją krok po kroku',
  'Karty startowe dla pracowników w 2 językach (PL/UA)',
  'Pełna pomoc na każdym etapie wdrożenia',
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

const stepIcons = [Gift, Store, Store]

export default function PricingPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[780px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/40 via-white/80 to-white dark:from-emerald-900/20 dark:via-slate-950/80 dark:to-slate-950" />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-[100px]" />
        <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px]" />
      </div>

      <Navigation />

      <main className="relative z-10 flex-1">
        {/* ─── HERO ─── */}
        <section className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
              <ShieldCheck className="h-4 w-4" />
              <span>Transparentne warunki, zero ukrytych kosztów</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl text-balance">
              Jeden system.<br />Prosta cena.<br />Pełna ochrona.
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              Każdy klient AutoŻaby dostaje dokładnie to samo — pełen dostęp do wszystkich funkcji, bez limitu pracowników. Zacznij od 14 dni za darmo.
            </p>

            {/* Promo badge */}
            <div className="inline-flex items-center gap-2 rounded-2xl bg-amber-50 border border-amber-200 px-5 py-3 text-sm font-semibold text-amber-800 dark:bg-amber-900/20 dark:border-amber-700 dark:text-amber-200">
              <Sparkles className="h-4 w-4" />
              <span>Promocja na pierwszy rok: <strong>-25%</strong> na abonament</span>
            </div>
          </div>
        </section>

        {/* ─── 3 STEPS ─── */}
        <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {pricingSteps.map((step, index) => {
              const Icon = stepIcons[index] ?? Store
              return (
                <article
                  key={step.id}
                  className={cn(
                    'relative flex flex-col rounded-3xl p-8 transition-all duration-300 backdrop-blur-xl border bg-white/60 dark:bg-white/5 shadow-xl',
                    step.id === 'subscription'
                      ? 'border-emerald-300/60 ring-1 ring-emerald-400/40 shadow-2xl z-10 dark:border-emerald-500/30'
                      : 'border-emerald-900/10 dark:border-white/10 hover:border-emerald-300/60 hover:-translate-y-1'
                  )}
                >
                  {step.badge && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <span className={cn(
                        'inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg',
                        step.id === 'trial'
                          ? 'bg-blue-500 shadow-blue-500/30'
                          : 'bg-emerald-500 shadow-emerald-500/30'
                      )}>
                        {step.id === 'trial' ? <Gift className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                        {step.badge}
                      </span>
                    </div>
                  )}

                  {/* Step number */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-lg dark:bg-emerald-500/20 dark:text-emerald-300">
                      {step.step}
                    </div>
                    <span className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      {step.title}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">{step.headline}</h3>

                  {/* Price */}
                  {step.priceLabel && (
                    <div className="mb-6 space-y-1">
                      <div className="flex items-baseline gap-3">
                        {step.priceRegular && (
                          <span className="text-2xl font-bold text-slate-400 line-through decoration-red-400 decoration-2">
                            {step.priceRegular}
                          </span>
                        )}
                        <span className={cn(
                          'text-3xl font-bold',
                          step.id === 'trial'
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-emerald-600 dark:text-emerald-400'
                        )}>
                          {step.priceLabel}
                        </span>
                      </div>
                      {step.priceRegular && (
                        <p className="text-xs font-medium text-emerald-600 dark:text-emerald-300">
                          Cena gwarantowana przez 12 miesięcy
                        </p>
                      )}
                    </div>
                  )}

                  {/* Details */}
                  <ul className="flex-1 space-y-3 text-sm text-slate-600 dark:text-slate-200">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-500 dark:text-emerald-400" aria-hidden />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </section>

        {/* ─── SINGLE CTA ─── */}
        <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 rounded-3xl glass-premium p-10 md:p-14 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/10 dark:to-slate-900/50">
            <h2 className="text-2xl md:text-3xl font-bold">Gotowy, żeby odzyskać spokój?</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
              Zarejestruj się i przez 14 dni korzystaj z AutoŻaby za darmo — bez zobowiązań, bez podawania karty płatniczej.
            </p>
            <div>
              <a
                href={pricingConfig.ctaHref}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 rounded-2xl bg-emerald-500 px-10 py-5 text-lg font-bold text-white shadow-xl shadow-emerald-500/25 transition-all hover:bg-emerald-600 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-95"
              >
                🐸 {pricingConfig.ctaLabel}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {pricingConfig.ctaSubtext}
            </p>
          </div>
        </section>

        {/* ─── WHAT YOU GET ─── */}
        <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Co dostajesz?</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
              Każdy klient AutoŻaby — niezależnie od liczby sklepów — ma dostęp do pełnego zestawu funkcji.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {universalFeatures.map((feature) => (
              <div key={feature} className="flex items-start gap-3 rounded-2xl glass-premium p-5 transition hover:shadow-md">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── PRICE CALCULATOR ─── */}
        <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
          <PriceCalculator />
        </section>

        {/* ─── VALUE BENTO GRID ─── */}
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
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                Zawsze w cenie
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

        {/* ─── ONBOARDING TIMELINE (renamed to Wdrożenie) ─── */}
        <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Wdrożenie w 7 dni</h2>
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
            <a
              href={pricingConfig.ctaHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              Wypróbuj AutoŻabę za darmo
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* ─── FAQ ─── */}
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
