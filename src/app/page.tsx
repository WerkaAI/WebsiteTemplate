import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ProblemSection from "@/components/problem-section";
import SolutionSection from "@/components/solution-section";
const CalculatorSection = dynamic(() => import("@/components/calculator-section"))
const DemoSection = dynamic(() => import("@/components/demo-section"))
const TestimonialsSection = dynamic(() => import("@/components/testimonials-section"))
const PricingSection = dynamic(() => import("@/components/pricing-section"))
const BlogSection = dynamic(() => import("@/components/blog-section"))
const ContactSection = dynamic(() => import("@/components/contact-section"))
import InteractionLayer from "@/components/interaction-layer";
import Footer from "@/components/footer";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'AutoŻaba - Automatyczna Tarcza Prawna dla Żabka',
    description: 'Zarządzaj sklepem, a nie grafikami. AutoŻaba to Twoja automatyczna tarcza prawna, która chroni przed karami PIP i daje spokój ducha.',
    alternates: {
      canonical: '/'
    },
    openGraph: {
      title: 'AutoŻaba - Automatyczna Tarcza Prawna',
      description: 'Zarządzaj sklepem, a nie grafikami. AutoŻaba to Twoja automatyczna tarcza prawna.',
      type: 'website',
      images: ['/og-image.jpg']
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AutoŻaba - Automatyczna Tarcza Prawna',
      description: 'Zarządzaj sklepem, a nie grafikami. AutoŻaba to Twoja automatyczna tarcza prawna.',
      images: ['/og-image.jpg']
    }
  }
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div>
        <InteractionLayer />
        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Autożaba",
              "url": process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5000',
              "email": "autozaba@ainything.pl",
              "logo": "/favicon.svg",
              "sameAs": [
                // Dodaj profile społecznościowe jeśli posiadasz
              ]
            })
          }}
        />
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
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