import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tutoriale produktu',
  description: 'Instrukcje krok po kroku pomagające użytkownikom szybciej opanować kluczowe funkcje produktu.',
  alternates: {
    canonical: '/tutoriale',
  },
}

export default function TutorialLayout({ children }: { children: React.ReactNode }) {
  return children
}
