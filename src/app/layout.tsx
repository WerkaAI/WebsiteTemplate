import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5000'),
  title: {
    default: 'AutoŻaba - Automatyczna Tarcza Prawna dla Żabka',
    template: '%s | AutoŻaba'
  },
  description: 'Zarządzaj sklepem, a nie grafikami. AutoŻaba to Twoja automatyczna tarcza prawna, która chroni przed karami PIP i daje spokój ducha.',
  openGraph: {
    siteName: 'AutoŻaba',
    locale: 'pl_PL',
  }
}

metadata.icons = { icon: '/favicon.svg' }
metadata.manifest = '/site.webmanifest'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded"
        >
          Przejdź do treści
        </a>
        <Providers>
          <main id="main-content">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}