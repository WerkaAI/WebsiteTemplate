'use client';

/**
 * Consent-Aware Script Loader
 *
 * Conditionally renders tracking scripts based on user consent and env configuration.
 *
 * Architecture (GCM v2 Advanced Mode):
 * ─────────────────────────────────────
 * 1. GCM v2 default consent snippet → rendered in layout.tsx (beforeInteractive)
 * 2. GA4 / GTM → ALWAYS load (GCM v2 controls their behavior via consent state)
 * 3. Meta Pixel → ONLY loads with explicit marketing consent (not GCM-aware)
 *
 * When no env vars are configured (NEXT_PUBLIC_GA_MEASUREMENT_ID etc.),
 * this component renders nothing — safe for development.
 *
 * CSP: All scripts receive a nonce for Content Security Policy compliance.
 */

import Script from 'next/script';
import { useConsent } from './consent-provider';

interface ConsentScriptsProps {
  /** CSP nonce for inline scripts */
  nonce?: string;
}

export function ConsentScripts({ nonce }: ConsentScriptsProps) {
  const { hasConsent } = useConsent();

  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  const hasMarketing = hasConsent('marketing');

  // Nothing to render if no tracking is configured
  if (!gaMeasurementId && !gtmId && !metaPixelId) return null;

  return (
    <>
      {/* ── GA4 (GCM v2 Advanced — always loads, consent-controlled) ── */}
      {gaMeasurementId && (
        <>
          <Script
            id="ga4-gtag"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            nonce={nonce}
          />
          <Script
            id="ga4-config"
            strategy="afterInteractive"
            nonce={nonce}
          >
            {`
              window.dataLayer=window.dataLayer||[];
              function gtag(){dataLayer.push(arguments);}
              gtag('js',new Date());
              gtag('config','${gaMeasurementId}',{
                send_page_view:true,
                cookie_flags:'SameSite=Lax;Secure'
              });
            `}
          </Script>
        </>
      )}

      {/* ── GTM (GCM v2 Advanced — always loads, consent-controlled) ── */}
      {gtmId && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          nonce={nonce}
        >
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      )}

      {/* ── Meta (Facebook) Pixel — ONLY with explicit marketing consent ── */}
      {metaPixelId && hasMarketing && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          nonce={nonce}
        >
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${metaPixelId}');
            fbq('track','PageView');
          `}
        </Script>
      )}
    </>
  );
}
