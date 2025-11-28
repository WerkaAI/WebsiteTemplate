import Link from 'next/link'
import type { Metadata } from 'next'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import {
  featureModules,
  legalHighlights,
  benefitGroups,
  onboardingTimeline,
  experienceHighlights,
  heroMetrics
} from '@/data/features'
import {
  Calendar,
  Shield,
  Users,
  Clock,
  FileText,
  Zap,
  Briefcase,
  Calculator,
  Smile,
  CheckCircle2,
  ArrowRight,
  Store,
  MousePointerClick
} from 'lucide-react'
import { cn } from '@/lib/utils'

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

const iconMap: Record<string, any> = {
  stores: Store,
  people: Users,
  availability: MousePointerClick,
  schedule: Calendar,
  timesheets: Clock,
  automation: Zap
}

const benefitIcons: Record<string, any> = {
  'Franczyzobiorcy i właściciele sklepów': Briefcase,
  'Zespół sklepu': Smile,
  'Biura rachunkowe i księgowe': Calculator
}

export default function FunkcjePage() {
  // Reorder modules for Bento Grid: Schedule (Large), People, Availability, Automation (Large), Stores, Timesheets
  const orderedModules = [
    featureModules.find(m => m.id === 'schedule')!,
    featureModules.find(m => m.id === 'people')!,
    featureModules.find(m => m.id === 'availability')!,
    featureModules.find(m => m.id === 'automation')!,
    featureModules.find(m => m.id === 'stores')!,
    featureModules.find(m => m.id === 'timesheets')!,
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <section className="section-padding hero-gradient relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70 mix-blend-overlay">
          <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-16 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <div className="container-spacing grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-200">
              <Shield className="h-4 w-4" />
              <span>AutoŻaba – tarcza prawna w akcji</span>
            </div>

            <h1 className="heading-display text-balance">
              Koniec z chaosem w grafikach i dokumentacji
            </h1>

            <p className="text-xl text-muted-foreground copy-max leading-relaxed">
              Jeden system, który łączy planowanie, prawo pracy i rozliczenia.
              Automatyzuje to, co nudne, i pilnuje tego, co ryzykowne.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <span className="cta-glow">
                <Link
                  href="https://app.autozaba.pl/register"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 hover:scale-105 active:scale-95"
                >
                  Rozpocznij 14-dniowy trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </span>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-8 py-4 text-base font-semibold text-primary transition hover:bg-primary/10"
              >
                Umów prezentację
              </Link>
            </div>
          </div>

          <div className="grid gap-4 rounded-3xl glass-premium p-6 lg:p-8" data-animate="rise" data-animate-delay="200">
            {heroMetrics.map((metric, index) => (
              <article
                key={metric.label}
                className="flex items-start gap-4 rounded-2xl border border-emerald-100/60 bg-emerald-50/50 p-5 transition hover:bg-emerald-50/80 dark:border-emerald-400/20 dark:bg-emerald-400/5"
              >
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                  {index === 0 ? <Clock className="h-6 w-6" /> : index === 1 ? <Shield className="h-6 w-6" /> : <Users className="h-6 w-6" />}
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{metric.value}</div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-emerald-900/80 dark:text-emerald-200">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground leading-snug">{metric.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-950">
        <div className="container-spacing space-y-16">
          <header className="max-w-3xl mx-auto text-center space-y-4">
            <p className="text-label text-emerald-600">Moduły Systemu</p>
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Wszystko, czego potrzebujesz w jednym miejscu
            </h2>
            <p className="text-lg text-muted-foreground">
              Dane wprowadasz raz – system automatycznie aktualizuje grafiki, ewidencję i raporty.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(280px,auto)]">
            {orderedModules.map((module, index) => {
              const Icon = iconMap[module.id] || Zap
              const isLarge = module.id === 'schedule' || module.id === 'automation'

              return (
                <article
                  key={module.id}
                  className={cn(
                    "group relative flex flex-col justify-between rounded-3xl glass-premium p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                    isLarge ? "md:col-span-2 bg-gradient-to-br from-white/80 to-emerald-50/50 dark:from-white/10 dark:to-emerald-500/5" : ""
                  )}
                  data-animate="rise"
                  data-animate-delay={`${index * 100}`}
                >
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div className={cn(
                        "h-14 w-14 rounded-2xl flex items-center justify-center shadow-inner",
                        isLarge ? "bg-emerald-500 text-white shadow-emerald-200/50" : "bg-emerald-100/80 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                      )}>
                        <Icon className="h-7 w-7" />
                      </div>
                      {module.badge && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:bg-emerald-400/20 dark:text-emerald-200">
                          {module.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className={cn("font-bold text-foreground", isLarge ? "text-2xl mb-3" : "text-xl mb-2")}>
                        {module.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {module.summary}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-8 space-y-3">
                    {module.highlights.slice(0, isLarge ? 3 : 2).map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3 text-sm text-muted-foreground/90">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-500" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] dark:bg-emerald-500/20" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="container-spacing grid gap-16 lg:grid-cols-2 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-300">
              <Shield className="h-4 w-4" />
              <span>Wbudowana Tarcza Prawna</span>
            </div>

            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl leading-tight text-foreground">
              Wiedza prawna tam,<br />gdzie podejmujesz decyzje
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              AutoŻaba nie jest tylko kalendarzem. To Twój cyfrowy prawnik, który patrzy Ci na ręce (w dobrym znaczeniu) i ostrzega przed kosztownymi błędami.
            </p>

            <div className="grid gap-4">
              {legalHighlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm dark:bg-white/5 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
                  data-animate="slide-right"
                  data-animate-delay={`${index * 100}`}
                >
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 font-serif font-bold text-xl">
                    §
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Abstract visual representation of protection */}
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-[60px] animate-pulse dark:bg-emerald-500/30" />
              <div className="relative z-10 w-full h-full bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-700 shadow-2xl p-8 flex flex-col items-center justify-center text-center space-y-6">
                <Shield className="w-24 h-24 text-emerald-500 dark:text-emerald-400" />
                <div>
                  <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">0 zł</div>
                  <div className="text-slate-500 dark:text-slate-400 uppercase tracking-widest text-sm">Kar z kontroli PIP</div>
                </div>
                <div className="w-full h-px bg-slate-200 dark:bg-slate-700" />
                <div className="text-sm text-slate-500 dark:text-slate-300">
                  U naszych klientów korzystających z pełnej automatyzacji
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-spacing space-y-16">
          <header className="max-w-3xl mx-auto text-center space-y-4">
            <p className="text-label text-emerald-600">Korzyści</p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Wygrywa każdy w Twoim ekosystemie
            </h2>
          </header>

          <div className="grid gap-8 md:grid-cols-3">
            {benefitGroups.map((group, index) => {
              const Icon = benefitIcons[group.audience] || Users
              return (
                <article
                  key={group.audience}
                  className="group flex flex-col rounded-3xl glass-premium p-8 transition-all hover:shadow-xl hover:-translate-y-1"
                  data-animate="rise"
                  data-animate-delay={`${index * 150}`}
                >
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition-colors group-hover:bg-emerald-500 group-hover:text-white dark:bg-emerald-500/20 dark:text-emerald-300">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3">{group.audience}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{group.summary}</p>

                  <ul className="mt-auto space-y-3">
                    {group.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <div className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-spacing grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-label text-emerald-600">Prosty Start</p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Pierwszy tydzień z AutoŻaba
            </h2>
            <p className="text-lg text-muted-foreground">
              Nie zostawiamy Cię samego z nowym systemem. Nasz proces wdrożenia jest tak samo poukładany, jak Twoje przyszłe grafiki.
            </p>

            <div className="pt-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline underline-offset-4"
              >
                Zobacz pełny proces wdrożenia <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-6 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-emerald-500/20 before:to-transparent">
            {onboardingTimeline.map((step, index) => (
              <div
                key={step.title}
                className="relative flex items-start gap-6"
                data-animate="slide-left"
                data-animate-delay={`${index * 150}`}
              >
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-background border-4 border-emerald-50 text-emerald-600 font-bold shadow-sm z-10 dark:border-slate-800 dark:bg-slate-900">
                  {index + 1}
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-sm border border-border/50 flex-1 dark:bg-white/5">
                  <h3 className="text-lg font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
