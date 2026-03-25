"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useConsent } from "@/components/cookies/consent-provider";

export default function Footer() {
  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en' : 'pl';
  const content = locale === 'en'
    ? {
      description: 'Orthopedic physiotherapy and manual therapy in Wrocław.',
      privacy: 'Privacy policy',
      cookies: 'Cookie policy',
      terms: 'Terms',
      cookieSettings: 'Cookie settings',
      copyright: '© 2026 Aneta Kołoszyńska Physiotherapy. All rights reserved.'
    }
    : {
      description: 'Fizjoterapia ortopedyczna i terapia manualna we Wrocławiu.',
      privacy: 'Polityka prywatności',
      cookies: 'Polityka cookies',
      terms: 'Regulamin',
      cookieSettings: 'Ustawienia Cookies',
      copyright: '© 2026 Fizjoterapia Aneta Kołoszyńska. Wszystkie prawa zastrzeżone.'
    };
  const { openSettings } = useConsent();

  return (
    <footer id="kontakt" className="bg-muted/40 border-t border-border py-10">
      <div className="container-spacing">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <Link href={`/${locale}`} className="text-xl font-bold text-foreground">
              Fizjoterapia<span className="text-primary">Wrocław</span>
            </Link>
            <p className="text-muted-foreground mt-2 max-w-md">{content.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 text-sm text-muted-foreground">
            <a
              href="tel:+48532445410"
              className="hover:text-primary transition-colors font-medium"
              aria-label="Zadzwoń do Anety Kołoszyńskiej"
            >
              📞 532 445 410
            </a>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <a
              href="https://maps.google.com/?q=ul.+Grabi%C5%BCy%C5%84ska+241A,+Wroc%C5%82aw"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              📍 ul. Grabiszyńska 241A, Wrocław
            </a>
            <span className="block text-xs text-muted-foreground/80 sm:inline sm:ml-0">
              {locale === 'en' ? '🅿️ Free patient parking at the clinic' : '🅿️ Bezpłatny parking dla pacjentów przy gabinecie'}
            </span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <Link href="/polityka-prywatnosci" className="hover:text-foreground transition-colors">
              {content.privacy}
            </Link>
            <Link href="/polityka-cookies" className="hover:text-foreground transition-colors">
              {content.cookies}
            </Link>
            <button
              type="button"
              onClick={openSettings}
              className="hover:text-foreground transition-colors text-left"
              aria-label={content.cookieSettings}
            >
              🍪 {content.cookieSettings}
            </button>
          </div>
        </div>

        <div className="mt-6 text-xs text-muted-foreground">{content.copyright}</div>
      </div>
    </footer>
  );
}
