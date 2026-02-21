import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Navigation from "@/components/layout/navigation";
import HeroSection from "@/components/features/home/hero-section";
import FeaturesBento from "@/components/features/home/features-bento";
const CalculatorSection = dynamic(() => import("@/components/features/home/calculator-section"), { loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-3xl my-24" /> })
const DemoSection = dynamic(() => import("@/components/features/home/demo-section"), { loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-3xl my-24" /> })
const TestimonialsSection = dynamic(() => import("@/components/features/home/testimonials-section"), { loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-3xl my-24" /> })
const PricingSection = dynamic(() => import("@/components/features/home/pricing-section"), { loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-3xl my-24" /> })
const BlogSection = dynamic(() => import("@/components/features/home/blog-section").then(mod => mod.BlogSection), { loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-3xl my-24" /> })
const ContactSection = dynamic(() => import("@/components/features/home/contact-section"), { loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-3xl my-24" /> })
import InteractionLayer from "@/components/features/home/interaction-layer";
import Footer from "@/components/layout/footer";
import { getCspNonce } from "@/lib/security/csp";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'WebsiteTemplate - Nowoczesny system do zarządzania zespołem',
    description: 'Szablon SaaS dla firm usługowych i retail. Automatyzuj planowanie, monitoruj zgodność i rozwijaj biznes szybciej.',
    alternates: {
      canonical: '/'
    },
    openGraph: {
      title: 'WebsiteTemplate - Nowoczesny system do zarządzania zespołem',
      description: 'Szablon SaaS dla firm usługowych i retail. Automatyzuj planowanie i monitoruj zgodność.',
      type: 'website',
      images: ['/illustrations/og-template-cover.svg']
    },
    twitter: {
      card: 'summary_large_image',
      title: 'WebsiteTemplate - Nowoczesny system do zarządzania zespołem',
      description: 'Szablon SaaS dla firm usługowych i retail. Automatyzuj planowanie i monitoruj zgodność.',
      images: ['/illustrations/og-template-cover.svg']
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