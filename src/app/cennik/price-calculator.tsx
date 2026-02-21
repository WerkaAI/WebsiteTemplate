'use client'

import { useState } from 'react'
import { calcPromoPrice, calcRegularPrice, pricingConfig } from '@/data/pricing'
import { Store, Sparkles, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PriceCalculator() {
  const [stores, setStores] = useState(1)
  const promoTotal = calcPromoPrice(stores)
  const regularTotal = calcRegularPrice(stores)
  const savings = regularTotal - promoTotal

  return (
    <div className="rounded-3xl glass-premium p-8 md:p-12 bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-900/10 dark:to-slate-900/50">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Oblicz swoją cenę</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Wybierz liczbę lokalizacji i zobacz, ile zapłacisz z promocją -25%.
        </p>
      </div>

      {/* Store selector */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Ile masz lokalizacji?</span>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setStores(n)}
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold transition-all',
                stores === n
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-110'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
              )}
              aria-label={`${n} ${n === 1 ? 'lokalizacja' : n < 5 ? 'lokalizacje' : 'lokalizacji'}`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Price display */}
      <div className="text-center space-y-4 mb-8">
        <div className="flex items-baseline justify-center gap-4">
          <span className="text-3xl font-bold text-slate-400 line-through decoration-red-400 decoration-2">
            {regularTotal} zł
          </span>
          <span className="text-5xl md:text-6xl font-bold text-emerald-600 dark:text-emerald-400">
            {promoTotal} zł
          </span>
          <span className="text-xl text-slate-500 dark:text-slate-400">/ mies.</span>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-2 text-sm font-semibold text-amber-800 dark:bg-amber-900/20 dark:border-amber-700 dark:text-amber-200">
          <Sparkles className="h-3.5 w-3.5" />
          Oszczędzasz {savings} zł/mies. z promocją -25%
        </div>

        {/* Price breakdown */}
        <div className="pt-4 max-w-md mx-auto text-sm text-slate-500 dark:text-slate-400 space-y-1">
          <div className="flex justify-between">
            <span>Pierwsza lokalizacja</span>
            <span>
              <span className="line-through mr-2">{pricingConfig.regularPrice} zł</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">{pricingConfig.promoPrice} zł</span>
            </span>
          </div>
          {stores > 1 && (
            <div className="flex justify-between">
              <span>{stores - 1} {stores - 1 === 1 ? 'dodatkowa lokalizacja' : stores - 1 < 5 ? 'dodatkowe lokalizacje' : 'dodatkowych lokalizacji'}</span>
              <span>
                <span className="line-through mr-2">{(stores - 1) * pricingConfig.additionalStoreRegular} zł</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{(stores - 1) * pricingConfig.additionalStorePromo} zł</span>
              </span>
            </div>
          )}
          <div className="h-px bg-slate-200 dark:bg-slate-700 my-2" />
          <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-200">
            <span>Razem miesięcznie</span>
            <span>{promoTotal} zł</span>
          </div>
        </div>

        <p className="text-xs text-emerald-600 dark:text-emerald-300 font-medium">
          Cena promocyjna gwarantowana przez {pricingConfig.guaranteeMonths} miesięcy
        </p>
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href={pricingConfig.ctaHref}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-600 hover:shadow-emerald-500/40 active:scale-95"
        >
          Wypróbuj {stores > 1 ? `z ${stores} lokalizacjami` : ''} za darmo
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  )
}
