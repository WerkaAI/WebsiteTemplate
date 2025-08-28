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
