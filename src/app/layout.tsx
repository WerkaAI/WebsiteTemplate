import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from "@/components/providers"
import { JsonLd } from "@/components/seo/json-ld"
import { getCspNonce } from "@/lib/security/csp"

const inter = Inter({ subsets: ['latin'], display: 'swap' })
const enablePwa = process.env.NEXT_PUBLIC_ENABLE_PWA === 'true'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5000'),
  title: {
    default: 'AutoŻaba - Twój Cyfrowy Pomocnik w Sklepie | Automatyzacja i Tarcza Prawna',
    template: '%s | AutoŻaba - Cyfrowy Pomocnik'
  },
  description: 'Zarządzaj sklepem, a nie grafikami. AutoŻaba to Twój cyfrowy pomocnik, który automatyzuje grafiki, chroni przed karami PIP (Tarcza Prawna) i daje spokój ducha.',
  keywords: ['Cyfrowy Pomocnik Żabki', 'Asystent Żabki', 'Automatyzacja Żabki', 'Tarcza Prawna Żabka', 'zarządzanie żabką', 'pomoc w żabce', 'grafiki żabka'],
  authors: [{ name: 'AutoŻaba Team' }],
  creator: 'AutoŻaba',
  openGraph: {
    siteName: 'AutoŻaba',
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: '/blog-illustrations/jak-wdrazamy.png',
        width: 1200,
        height: 630,
        alt: 'AutoŻaba - Cyfrowy Pomocnik dla Twojego Sklepu'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoŻaba - Twój Cyfrowy Pomocnik',
    description: 'Automatyzacja grafików i Tarcza Prawna dla Twojego sklepu.',
    images: ['/blog-illustrations/jak-wdrazamy.png'],
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
  const nonce = getCspNonce();
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
          <JsonLd />
          <main id="main-content">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}