import { Metadata } from 'next'
import Navigation from "@/components/layout/navigation";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { PainPoints } from "@/components/PainPoints";
import { AboutMe } from "@/components/AboutMe";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";

import { BookingSection } from "@/components/BookingSection";
import Footer from "@/components/layout/footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'hero' });

  return {
    title: 'Fizjoterapia Aneta Kołoszyńska | Wrocław',
    description: t('description'),
    alternates: {
      canonical: `/${locale}`
    },
    openGraph: {
      title: 'Fizjoterapia Aneta Kołoszyńska | Wrocław',
      description: t('description'),
      type: 'website',
      images: ['/illustrations/og-template-cover.svg']
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Fizjoterapia Aneta Kołoszyńska | Wrocław',
      description: t('description'),
      images: ['/illustrations/og-template-cover.svg']
    }
  }
}

export default async function LocalizedHomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* ── Journey: Chaos (pain recognition) ──────────── */}
        <div className="journey-chaos">
          <Hero />
          <TrustBar />
          <PainPoints />
        </div>

        {/* ── Journey: Order (structure & plan) ──────────── */}
        <div className="journey-order">
          <AboutMe />
          <Services />
          <Process />
        </div>

        {/* ── Journey: Calm (trust & action) ─────────────── */}
        <div className="journey-calm">
          <Testimonials />
          <FAQ />

          <BookingSection />
        </div>
      </main>
      <Footer />
      {/* Sticky booking CTA for mobile — always visible after hero scroll */}
      <StickyMobileCTA />
    </div>
  );
}