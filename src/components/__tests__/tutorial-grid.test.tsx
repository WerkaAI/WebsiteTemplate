import { fireEvent, render, screen } from '@testing-library/react'
import { TutorialGrid } from '@/components/content/tutorial-grid'
import type { TutorialMeta } from '@/lib/tutorials'

const baseMeta: TutorialMeta = {
  title: 'Konfiguracja startowa',
  description: 'Podstawowe ustawienia po pierwszym logowaniu.',
  date: '2025-10-18',
  persona: ['właściciel'],
  difficulty: 'podstawowy',
  durationMinutes: 10,
  tags: ['start'],
  draft: false,
}

const tutorials = [
  { slug: 'konfiguracja', meta: baseMeta },
  {
    slug: 'szkolenie-pracownik',
    meta: {
      ...baseMeta,
      title: 'Szkolenie dla pracownika',
      persona: ['pracownik'],
      tags: ['praca'],
    },
  },
]

describe('TutorialGrid', () => {
  it('renders tutorials', () => {
    render(<TutorialGrid tutorials={tutorials} />)

    expect(screen.getByText('Konfiguracja startowa')).toBeInTheDocument()
    expect(screen.getByText('Szkolenie dla pracownika')).toBeInTheDocument()
  })

  it('filters by persona', () => {
    render(<TutorialGrid tutorials={tutorials} />)

    const select = screen.getByLabelText('Filtruj po roli')
    fireEvent.change(select, { target: { value: 'pracownik' } })

    expect(screen.queryByText('Konfiguracja startowa')).not.toBeInTheDocument()
    expect(screen.getByText('Szkolenie dla pracownika')).toBeInTheDocument()
  })
})
