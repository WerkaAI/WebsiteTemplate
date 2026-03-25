import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '700', '800'],
  style: ['normal', 'italic'],
})
import { Providers } from "@/components/providers"
import { JsonLd } from "@/components/seo/json-ld"
import { CookieBanner } from "@/components/cookies/cookie-banner"
import { CookieSettingsPanel } from "@/components/cookies/cookie-settings-panel"
import { ConsentScripts } from "@/components/cookies/consent-scripts"
import { generateGcmDefaultScript } from "@/lib/cookies/gcm-v2"

const enablePwa = process.env.NEXT_PUBLIC_ENABLE_PWA === 'true'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fizjoterapiawroclaw.com'),
  title: {
    default: 'Fizjoterapia Aneta Kołoszyńska | Wrocław',
    template: '%s | Fizjoterapia Aneta Kołoszyńska'
  },
  description: 'Kompleksowa fizjoterapia ortopedyczna, terapia manualna i rehabilitacja sportowa we Wrocławiu. Umów wizytę online.',
  keywords: [
    'fizjoterapia wrocław', 'fizjoterapeuta grabiszyńska', 'terapia manualna wrocław', 'ból kręgosłupa', 'rehabilitacja sportowa'
  ],
  authors: [{ name: 'Aneta Kołoszyńska' }],
  creator: 'Aneta Kołoszyńska',
  openGraph: {
    siteName: 'Fizjoterapia Aneta Kołoszyńska',
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: '/illustrations/og-template-cover.svg',
        width: 1200,
        height: 630,
        alt: 'Fizjoterapia Aneta Kołoszyńska'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fizjoterapia Aneta Kołoszyńska',
    description: 'Kompleksowa fizjoterapia ortopedyczna we Wrocławiu.',
    images: ['/illustrations/og-template-cover.svg'],
  }
}

metadata.icons = { icon: '/favicon.svg' }
if (enablePwa) {
  metadata.manifest = '/site.webmanifest' // Only expose manifest when PWA is explicitly enabled
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const hasGoogleTracking = !!(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GTM_ID);

  return (
    <html lang="pl" data-scroll-behavior="smooth" className={`scroll-smooth ${GeistSans.variable} ${GeistMono.variable} ${playfairDisplay.variable}`} suppressHydrationWarning>
      <body className={`${GeistSans.className} antialiased tracking-tight`} suppressHydrationWarning>
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
          >
            {generateGcmDefaultScript()}
          </Script>
        )}
        <Providers>
          <JsonLd />
          <main id="main-content">
            {children}
          </main>
          {/* Cookie consent UI + conditional tracking scripts */}
          <CookieBanner />
          <CookieSettingsPanel />
          <ConsentScripts />
        </Providers>
      </body>
    </html>
  )
}