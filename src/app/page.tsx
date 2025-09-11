import { Metadata } from 'next'
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ProblemSection from "@/components/problem-section";
import SolutionSection from "@/components/solution-section";
import CalculatorSection from "@/components/calculator-section";
import DemoSection from "@/components/demo-section";
import TestimonialsSection from "@/components/testimonials-section";
import PricingSection from "@/components/pricing-section";
import BlogSection from "@/components/blog-section";
import ContactSection from "@/components/contact-section";
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
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <CalculatorSection />
        <DemoSection />
        <TestimonialsSection />
        <PricingSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}