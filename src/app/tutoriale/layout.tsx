import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tutoriale AutoŻaba',
  description: 'Instrukcje krok po kroku, które pomagają właścicielom i pracownikom sklepów Żabka wykorzystać pełnię możliwości AutoŻaba.',
  alternates: {
    canonical: '/tutoriale',
  },
}

export default function TutorialLayout({ children }: { children: React.ReactNode }) {
  return children
}
