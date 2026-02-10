import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Providers } from "@/components/providers"
import { JsonLd } from "@/components/seo/json-ld"
import { getCspNonce } from "@/lib/security/csp"
import { CookieBanner } from "@/components/cookies/cookie-banner"
import { CookieSettingsPanel } from "@/components/cookies/cookie-settings-panel"
import { ConsentScripts } from "@/components/cookies/consent-scripts"
import { generateGcmDefaultScript } from "@/lib/cookies/gcm-v2"

const inter = Inter({ subsets: ['latin'], display: 'swap' })
const enablePwa = process.env.NEXT_PUBLIC_ENABLE_PWA === 'true'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5000'),
  title: {
    default: 'AutoŻaba - Twój Cyfrowy Pomocnik w Sklepie | Automatyzacja i Tarcza Prawna',
    template: '%s | AutoŻaba - Cyfrowy Pomocnik'
  },
  description: 'Zarządzaj sklepem, a nie grafikami. AutoŻaba to Twój asystent, który automatyzuje pracę, chroni przed karami PIP i daje Ci spokój ducha.',
  keywords: [
    'autozaba', 'zaba', 'zabka', 'zabka polska', 'franczyzobiorca zabka',
    'Cyfrowy Pomocnik Żabki', 'Asystent Żabki', 'Automatyzacja Żabki',
    'Tarcza Prawna Żabka', 'zarządzanie żabką', 'pomoc w żabce', 'grafiki żabka'
  ],
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
    description: 'Zarządzaj sklepem, a nie grafikami. AutoŻaba to Twój asystent, który automatyzuje pracę.',
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
  const hasGoogleTracking = !!(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GTM_ID);

  return (
    <html lang="pl" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded"
        >
          Przejdź do treści
        </a>
        {/* GCM v2 default consent — MUST load before any Google tags */}
        {hasGoogleTracking && (
          <Script
            id="gcm-v2-defaults"
            strategy="beforeInteractive"
            nonce={nonce}
          >
            {generateGcmDefaultScript()}
          </Script>
        )}
        <Providers nonce={nonce}>
          <JsonLd nonce={nonce} />
          <main id="main-content">
            {children}
          </main>
          {/* Cookie consent UI + conditional tracking scripts */}
          <CookieBanner />
          <CookieSettingsPanel />
          <ConsentScripts nonce={nonce} />
        </Providers>
      </body>
    </html>
  )
}