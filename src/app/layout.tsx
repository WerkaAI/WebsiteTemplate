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
    default: 'Website Template — nowoczesna strona dla Twojej marki',
    template: '%s | Website Template'
  },
  description: 'Uniwersalny starter marketingowy Next.js z blogiem MDX, formularzem kontaktu i security baseline.',
  keywords: [
    'website template', 'next.js template', 'starter', 'landing page', 'mdx blog'
  ],
  authors: [{ name: 'Template Team' }],
  creator: 'Website Template',
  openGraph: {
    siteName: 'Website Template',
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: '/illustrations/og-template-cover.svg',
        width: 1200,
        height: 630,
        alt: 'Website Template'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Template',
    description: 'Starter marketingowy z MDX i gotową architekturą.',
    images: ['/illustrations/og-template-cover.svg'],
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