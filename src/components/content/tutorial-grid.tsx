"use client"

import { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { TutorialCard } from '@/components/content/tutorial-card'
import { useAnalytics } from '@/hooks/use-analytics'
import type { TutorialMeta } from '@/lib/tutorials'

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
    <section aria-label="Lista tutoriali" className="space-y-10">
      <div className="grid gap-4 md:grid-cols-[2fr_1fr] md:items-center">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground">Szukaj tutoriali</span>
          <Input
            placeholder="Wpisz czego potrzebujesz..."
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground">Filtruj po roli</span>
          <select
            value={selectedPersona}
            onChange={event => setSelectedPersona(event.target.value)}
            className="h-10 rounded-md border border-border bg-background px-3 text-sm"
          >
            {personas.map(role => (
              <option key={role} value={role}>
                {role === ALL_PERSONAS_LABEL ? 'Wszyscy użytkownicy' : role}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredTutorials.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-10 text-center">
          <p className="text-lg font-medium text-primary">
            Nie znaleziono tutoriali spełniających kryteria.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Spróbuj zmienić frazę wyszukiwania lub wybierz inny filtr.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTutorials.map(tutorial => (
            <TutorialCard
              key={tutorial.slug}
              title={tutorial.meta.title}
              description={tutorial.meta.description}
              persona={tutorial.meta.persona}
              difficulty={tutorial.meta.difficulty}
              durationMinutes={tutorial.meta.durationMinutes}
              tags={tutorial.meta.tags}
              href={`/tutoriale/${tutorial.slug}`}
              publishDate={tutorial.meta.date}
              onClick={() => track({ name: 'tutorial_card_clicked', payload: { slug: tutorial.slug } })}
            />
          ))}
        </div>
      )}
    </section>
  )
}
