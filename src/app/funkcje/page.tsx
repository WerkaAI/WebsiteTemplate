import Link from 'next/link'
import type { Metadata } from 'next'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import {
  onboardingTimeline,
  heroMetrics
} from '@/data/features'
import {
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  Clock,
  Users,
  FileCheck,
  Smartphone,
  Sparkles,
  Lock,
  BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Funkcje AutoŻaba – System, który myśli jak najlepszy manager',
  description:
    'Poznaj system, który automatyzuje grafiki, pilnuje Kodeksu Pracy i daje Ci pełną kontrolę nad siecią sklepów. Oszczędzaj czas i śpij spokojnie.',
  alternates: {
    canonical: '/funkcje'
  },
  openGraph: {
    title: 'Funkcje AutoŻaba – Twój cyfrowy manager',
    description:
      'Automatyzacja grafików, Tarcza Prawna i pełna kontrola nad biznesem. Zobacz, jak AutoŻaba zmienia zarządzanie siecią Żabka.',
    url: '/funkcje',
    type: 'website'
  }
}

export default function FunkcjePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-50/50 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950" />
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-[120px] dark:bg-emerald-500/10" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] dark:bg-blue-500/10" />
        </div>

        <div className="container-spacing relative z-10 text-center max-w-4xl mx-auto">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200 mb-8"
            data-animate="rise"
          >
            <Sparkles className="h-4 w-4" />
            <span>Nowy standard zarządzania siecią</span>
          </div>

          <h1
            className="heading-display mb-6 text-balance"
            data-animate="headline"
          >
            System, który myśli jak <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-400 dark:to-emerald-300">
              najlepszy manager
            </span>
          </h1>

          <p
            className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10"
            data-animate="rise"
            data-animate-delay="100"
          >
            AutoŻaba to nie tylko grafik. To Twój osobisty asystent, który zdejmuje Ci z głowy
            planowanie, pilnuje przepisów i dba o to, by w Twoim biznesie wszystko grało.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            data-animate="rise"
            data-animate-delay="200"
          >
            <Button
              size="lg"
              className="h-14 px-8 text-lg rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 w-full sm:w-auto"
              asChild
            >
              <Link href="https://app.autozaba.pl/register">
                Rozpocznij darmowy trial
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-lg rounded-full border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 w-full sm:w-auto"
              asChild
            >
              <Link href="/kontakt">
                Umów prezentację
              </Link>
            </Button>
          </div>
        </div>

        {/* Trust Strip / Metrics */}
        <div className="container-spacing mt-20" data-animate="rise" data-animate-delay="300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {heroMetrics.map((metric, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/50 border border-slate-100 shadow-sm backdrop-blur-sm dark:bg-slate-900/50 dark:border-slate-800"
              >
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-2">
                  {metric.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PILLAR 1: AUTOMATION --- */}
      <section className="section-padding bg-white dark:bg-slate-950 overflow-hidden">
        <div className="container-spacing">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              {/* Visual Mockup Placeholder */}
              <div className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5" />

                {/* Abstract UI Representation */}
                <div className="absolute inset-8 bg-white dark:bg-slate-950 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 p-6 flex flex-col gap-4 transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">Generator Grafiku</div>
                        <div className="text-xs text-muted-foreground">AI przetwarza dane...</div>
                      </div>
                    </div>
                    <div className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                      100% gotowe
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-full" />
                    <div className="h-2 w-1/2 bg-slate-100 dark:bg-slate-800 rounded-full" />
                  </div>
                  <div className="grid grid-cols-7 gap-2 mt-4">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="aspect-[3/4] rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-emerald-500/10" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                <Zap className="w-5 h-5" />
                <span>Inteligentny Grafik</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Twój czas jest bezcenny. <br />
                Nie marnuj go na Excela.
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Nasz silnik AI bierze pod uwagę dostępność pracowników, urlopy,
                wymagania obsadowe i Kodeks Pracy. Klikasz &quot;Generuj&quot;, a system
                układa optymalny harmonogram w kilka sekund.
              </p>

              <ul className="space-y-4">
                {[
                  'Automatyczne dopasowanie do obrotu i dostaw',
                  'Uwzględnianie preferencji i urlopów zespołu',
                  'Wykrywanie luk w obsadzie z wyprzedzeniem',
                  'Gotowe szablony na typowe tygodnie'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- PILLAR 2: SECURITY --- */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
        <div className="container-spacing">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                <Shield className="w-5 h-5" />
                <span>Tarcza Prawna</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Śpij spokojnie. <br />
                My pilnujemy przepisów.
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Koniec ze stresem przed kontrolą. AutoŻaba analizuje Twój grafik
                w czasie rzeczywistym i blokuje zmiany niezgodne z prawem.
                Doba pracownicza, odpoczynki, nadgodziny – mamy to pod kontrolą.
              </p>

              <ul className="space-y-4">
                {[
                  'Weryfikacja odpoczynków dobowych (11h) i tygodniowych (35h)',
                  'Pilnowanie limitów umów zlecenie i etatów',
                  'Automatyczne generowanie dokumentacji dla PIP',
                  'Alerty o kończących się badaniach i szkoleniach BHP'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              {/* Visual Mockup Placeholder */}
              <div className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)]" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
                    <Shield className="w-full h-full text-emerald-500/80 drop-shadow-2xl" strokeWidth={1} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 px-6 py-3 rounded-xl shadow-xl border border-emerald-100 dark:border-emerald-900 flex items-center gap-3 whitespace-nowrap">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-bold text-slate-900 dark:text-white">Zgodność 100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PILLAR 3: CONTROL --- */}
      <section className="section-padding bg-white dark:bg-slate-950 overflow-hidden">
        <div className="container-spacing">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              {/* Visual Mockup Placeholder */}
              <div className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 text-white shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950" />
                <div className="absolute inset-0 p-8 flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-lg font-bold">Panel Managera</div>
                    <BarChart3 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="space-y-4 flex-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/10" />
                          <div className="space-y-1">
                            <div className="h-2 w-24 bg-white/20 rounded-full" />
                            <div className="h-2 w-16 bg-white/10 rounded-full" />
                          </div>
                        </div>
                        <div className="text-emerald-400 text-sm font-mono">OK</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/10 flex justify-between text-sm text-slate-400">
                    <span>Sklepy: 5</span>
                    <span>Pracownicy: 24</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                <Smartphone className="w-5 h-5" />
                <span>Pełna Kontrola</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Wszystko w jednym miejscu. <br />
                Dostępne 24/7.
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Zarządzaj całą siecią z poziomu telefonu. Pracownicy zgłaszają
                dostępność przez aplikację, Ty akceptujesz jednym kliknięciem.
                Ewidencja czasu pracy tworzy się sama w tle.
              </p>

              <ul className="space-y-4">
                {[
                  'Aplikacja dla pracowników (iOS / Android)',
                  'Cyfrowy obieg wniosków urlopowych',
                  'Ewidencja czasu pracy (RCP) z geolokalizacją',
                  'Centralny panel dla wielu sklepów'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- ONBOARDING --- */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800">
        <div className="container-spacing">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold">Wdrożenie prostsze niż myślisz</h2>
            <p className="text-lg text-muted-foreground">
              Wiemy, że nie masz czasu na skomplikowane konfiguracje.
              Dlatego zrobiliśmy to tak prosto, jak to tylko możliwe.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0" />

            {onboardingTimeline.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center mb-6 relative z-10 group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="section-padding overflow-hidden">
        <div className="container-spacing">
          <div className="relative rounded-[2.5rem] bg-slate-900 px-6 py-20 text-center shadow-2xl sm:px-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.2),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.2),transparent_50%)]" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                Gotowy na rewolucję w zarządzaniu?
              </h2>
              <p className="text-lg text-slate-300">
                Dołącz do grona franczyzobiorców, którzy odzyskali kontrolę nad swoim czasem.
                Przetestuj AutoŻabę przez 14 dni za darmo.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 w-full sm:w-auto"
                  asChild
                >
                  <Link href="https://app.autozaba.pl/register">
                    Rozpocznij trial
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-lg rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white w-full sm:w-auto"
                  asChild
                >
                  <Link href="/kontakt">
                    Porozmawiaj z nami
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-slate-500 mt-6">
                Bez konieczności podawania karty kredytowej. Anuluj w każdej chwili.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
