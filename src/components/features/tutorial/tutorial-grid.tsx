"use client"

import { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { TutorialCard } from '@/components/features/tutorial/tutorial-card'
import { useAnalytics } from '@/hooks/use-analytics'
import type { TutorialMeta } from '@/lib/tutorials'
import { Search, Filter, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TutorialGridProps {
  tutorials: Array<{ slug: string; meta: TutorialMeta }>
}

const ALL_PERSONAS_LABEL = 'wszyscy'

export function TutorialGrid({ tutorials }: TutorialGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPersona, setSelectedPersona] = useState<string>(ALL_PERSONAS_LABEL)
  const { track } = useAnalytics()

  const personas = useMemo(() => {
    const set = new Set<string>()
    tutorials.forEach(tutorial => tutorial.meta.persona.forEach(role => set.add(role)))
    return [ALL_PERSONAS_LABEL, ...Array.from(set).sort()]
  }, [tutorials])

  const filteredTutorials = useMemo(() => {
    return tutorials.filter(tutorial => {
      const matchesPersona = selectedPersona === ALL_PERSONAS_LABEL
        ? true
        : tutorial.meta.persona.includes(selectedPersona)

      const normalizedSearch = searchTerm.trim().toLowerCase()
      const matchesSearch = normalizedSearch.length === 0
        || tutorial.meta.title.toLowerCase().includes(normalizedSearch)
        || tutorial.meta.description.toLowerCase().includes(normalizedSearch)
        || tutorial.meta.tags.some(tag => tag.toLowerCase().includes(normalizedSearch))

      return matchesPersona && matchesSearch
    })
  }, [tutorials, searchTerm, selectedPersona])

  return (
    <div className="space-y-6 md:space-y-10">
      {/* Control Bar */}
      <div className="sticky top-24 z-30 mx-auto max-w-4xl rounded-2xl glass-premium p-4 shadow-xl backdrop-blur-md transition-all">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Szukaj tutoriali (np. 'grafik', 'urlop')..."
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
              className="pl-10 bg-white/50 dark:bg-slate-900/50 border-transparent focus:bg-white dark:focus:bg-slate-900 transition-all h-11"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="h-3 w-3 text-muted-foreground" />
              </button>
            )}
          </div>

          <div className="relative md:w-64">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <select
              aria-label="Filtruj po roli"
              value={selectedPersona}
              onChange={event => setSelectedPersona(event.target.value)}
              className="h-11 w-full appearance-none rounded-md bg-white/50 dark:bg-slate-900/50 pl-10 pr-8 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer hover:bg-white/80 dark:hover:bg-slate-900/80"
            >
              {personas.map(role => (
                <option key={role} value={role}>
                  {role === ALL_PERSONAS_LABEL ? 'Wszystkie role' : role}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {filteredTutorials.length === 0 ? (
        <div className="rounded-2xl glass-premium p-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            Nie znaleziono tutoriali
          </h3>
          <p className="text-muted-foreground">
            Spróbuj zmienić frazę wyszukiwania lub wybierz inny filtr roli.
          </p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedPersona(ALL_PERSONAS_LABEL); }}
            className="mt-6 text-sm font-semibold text-emerald-600 hover:underline"
          >
            Wyczyść filtry
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTutorials.map((tutorial, index) => (
            <div
              key={tutorial.slug}
              data-animate="rise"
              data-animate-delay={`${index * 50}`}
            >
              <TutorialCard
                title={tutorial.meta.title}
                description={tutorial.meta.description}
                persona={tutorial.meta.persona}
                difficulty={tutorial.meta.difficulty}
                durationMinutes={tutorial.meta.durationMinutes}
                tags={tutorial.meta.tags}
                href={`/tutoriale/${tutorial.slug}`}
                publishDate={tutorial.meta.date}
                cover={tutorial.meta.cover}
                onClick={() => track({ name: 'tutorial_card_clicked', payload: { slug: tutorial.slug } })}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
