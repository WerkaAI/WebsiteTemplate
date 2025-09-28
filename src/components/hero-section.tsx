"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Play, ShieldCheck, Award, Clock3 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-gradient section-padding">
      <div className="container-spacing">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 fade-in-up">
            <div className="space-y-4">
              <h1 className="heading-display font-bold text-foreground" data-testid="text-hero-title">
                Odzyskaj <span className="text-primary">swój czas</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed copy-max" data-testid="text-hero-subtitle">
                Zarządzaj sklepem, a nie grafikami. AutoŻaba to Twoja automatyczna tarcza prawna, 
                która chroni przed karami PIP i daje spokój ducha.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <span className="cta-glow">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4 calm-shadow transition-all duration-300"
                  onClick={() => window.open('https://app.autozaba.pl/register', '_blank', 'noopener,noreferrer')}
                  data-testid="button-hero-register"
                >
                  Zacznij teraz →
                </Button>
              </span>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 transition-transform duration-300 hover:-translate-y-0.5"
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-hero-demo"
              >
                <Play className="w-5 h-5 mr-2" />
                Zobacz demo
              </Button>
            </div>

            <div className="text-sm text-muted-foreground copy-max">
              <Link href="#contact" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                <ShieldCheck className="w-4 h-4" />
                Dowiedz się, jak wygląda wdrożenie AutoŻaby
              </Link>
            </div>
            
            <div className="trust-strip" data-testid="hero-trust-strip">
              <div className="flex items-center gap-2" data-testid="feature-price">
                <CheckCircle className="w-4 h-4 text-secondary" />
                149 zł miesięcznie za sklep (stała cena)
              </div>
              <span className="trust-strip__divider" aria-hidden="true" />
              <div className="flex items-center gap-2" data-testid="feature-legal-compliance">
                <Shield className="w-4 h-4 text-secondary" />
                100% zgodność z Kodeksem Pracy
              </div>
              <span className="trust-strip__divider" aria-hidden="true" />
              <div className="flex items-center gap-2" data-testid="feature-confidence">
                <Award className="w-4 h-4 text-secondary" />
                120+ kontroli PIP bez mandatów
              </div>
              <span className="trust-strip__divider" aria-hidden="true" />
              <div className="flex items-center gap-2" data-testid="feature-time-to-value">
                <Clock3 className="w-4 h-4 text-secondary" />
                Wdrożenie w mniej niż 7 dni
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Chaotic schedule mockup */}
            <div className="bg-white/95 dark:bg-black/40 rounded-2xl calm-shadow-lg p-8 relative border border-white/60 dark:border-white/10 backdrop-blur">
              {/* Stress indicator */}
              <div className="absolute -top-4 left-8 bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-medium shadow-md" data-testid="stress-indicator">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                Kontrola PIP za 2 dni!
              </div>
              
              {/* Schedule chaos */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-foreground" data-testid="text-schedule-title">Grafik na grudzień</h3>
                <div className="grid grid-cols-7 gap-2 text-xs">
                  <div className="bg-red-100 text-red-800 p-2 rounded text-center" data-testid="schedule-monday">
                    <div className="font-medium">Pon</div>
                    <div>Jan 16h</div>
                    <div className="text-red-600">⚠️ Bez odpoczynku</div>
                  </div>
                  <div className="bg-yellow-100 text-yellow-800 p-2 rounded text-center" data-testid="schedule-tuesday">
                    <div className="font-medium">Wt</div>
                    <div>Anna 8h</div>
                    <div className="text-yellow-600">❓ UoP vs UZ</div>
                  </div>
                  <div className="bg-red-100 text-red-800 p-2 rounded text-center" data-testid="schedule-wednesday">
                    <div className="font-medium">Śr</div>
                    <div>Piotr 12h</div>
                    <div className="text-red-600">⚠️ Przekroczenie</div>
                  </div>
                  <div className="bg-gray-100 text-gray-600 p-2 rounded text-center" data-testid="schedule-thursday">
                    <div className="font-medium">Czw</div>
                    <div>??? brak</div>
                    <div>📱 Nie odpowiada</div>
                  </div>
                  <div className="bg-yellow-100 text-yellow-800 p-2 rounded text-center" data-testid="schedule-friday">
                    <div className="font-medium">Pt</div>
                    <div>Kasia 10h</div>
                    <div className="text-yellow-600">📝 Brak umowy</div>
                  </div>
                  <div className="bg-red-100 text-red-800 p-2 rounded text-center" data-testid="schedule-saturday">
                    <div className="font-medium">Sob</div>
                    <div>Jan+Anna</div>
                    <div className="text-red-600">⚠️ Konflikt</div>
                  </div>
                  <div className="bg-gray-100 text-gray-600 p-2 rounded text-center" data-testid="schedule-sunday">
                    <div className="font-medium">Nie</div>
                    <div>Zamknięte?</div>
                    <div>❓ Nie wiem</div>
                  </div>
                </div>
              </div>
              
              {/* Transformation arrow */}
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-secondary text-secondary-foreground w-16 h-16 rounded-full flex items-center justify-center calm-shadow-lg shadow-lg" data-testid="transformation-arrow">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
