import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ['latin'] })
const enablePwa = process.env.NEXT_PUBLIC_ENABLE_PWA === 'true'

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
    images: [
      {
        url: 'https://autozaba-app-storage.fra1.cdn.digitaloceanspaces.com/prod/landing-page/start-w-autozaba.png',
        width: 1200,
        height: 630,
        alt: 'AutoŻaba - Automatyczna Tarcza Prawna dla Żabka'
      }
    ]
  }
}

metadata.icons = { icon: '/illustrations/logo_xcolor64x64.png' }
if (enablePwa) {
  metadata.manifest = '/site.webmanifest' // Only expose manifest when PWA is explicitly enabled
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
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