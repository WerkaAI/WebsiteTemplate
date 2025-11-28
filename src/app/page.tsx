import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturesBento from "@/components/features-bento";
const CalculatorSection = dynamic(() => import("@/components/calculator-section"))
const DemoSection = dynamic(() => import("@/components/demo-section"))
const TestimonialsSection = dynamic(() => import("@/components/testimonials-section"))
const PricingSection = dynamic(() => import("@/components/pricing-section"))
const BlogSection = dynamic(() => import("@/components/blog-section"))
const ContactSection = dynamic(() => import("@/components/contact-section"))
import InteractionLayer from "@/components/interaction-layer";
import Footer from "@/components/footer";
import { getCspNonce } from "@/lib/security/csp";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'AutoŻaba - Twój Cyfrowy Pomocnik | Automatyzacja Sklepu i Tarcza Prawna',
    description: 'AutoŻaba to Twój Cyfrowy Pomocnik w sklepie. Automatyzuje grafiki, chroni przed karami PIP (Tarcza Prawna) i pomaga w zarządzaniu Żabką.',
    alternates: {
      canonical: '/'
    },
    openGraph: {
      title: 'AutoŻaba - Twój Cyfrowy Pomocnik',
      description: 'Automatyzacja grafików i Tarcza Prawna dla Twojego sklepu.',
      type: 'website',
      images: ['/og-image.jpg']
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AutoŻaba - Twój Cyfrowy Pomocnik',
      description: 'Automatyzacja grafików i Tarcza Prawna dla Twojego sklepu.',
      images: ['/og-image.jpg']
    }
  }
}

export default function Home() {
  const nonce = getCspNonce();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div>
        <InteractionLayer />
        <HeroSection />

        {/* Social Proof / Logos could go here if we had them */}

        <FeaturesBento />

        <CalculatorSection />

        <DemoSection />

        <TestimonialsSection />

        <PricingSection />

        <BlogSection />

        <ContactSection />
      </div>
      <Footer />
    </div>
  );
}