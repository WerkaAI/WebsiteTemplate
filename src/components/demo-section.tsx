"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

export default function DemoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number>();

  const handlePlay = () => setIsPlaying(true);
  const handlePreviewKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (isPlaying) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handlePlay();
    }
  };

  const videoSteps = [
    { time: "0:00", label: "Problem" },
    { time: "1:04", label: "Tarcza Prawna" },
    { time: "1:10", label: "Inteligentny Grafik" },
    { time: "1:16", label: "Ewidencja i Raporty" },
    { time: "1:33", label: "Rezultat" }
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateProgress = () => {
      const node = sectionRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const total = rect.height + viewportHeight * 0.35;
      const distance = viewportHeight - rect.top;
      const ratio = Math.min(1, Math.max(0, distance / total));

      setProgress((prev) => {
        if (Math.abs(prev - ratio) < 0.01) {
          return prev;
        }
        return ratio;
      });
    };

    const handleScroll = () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const activeStep = useMemo(() => {
    const maxIndex = videoSteps.length - 1;
    return Math.min(maxIndex, Math.round(progress * maxIndex));
  }, [progress, videoSteps.length]);

  return (
    <section id="demo" ref={sectionRef} className="section-padding bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground" data-testid="text-demo-title">
            Zobacz <span className="text-primary dark:text-emerald-300">jak to działa</span>
          </h2>
          <p className="text-xl text-muted-foreground copy-max mx-auto" data-testid="text-demo-subtitle">
            2-minutowe demo pokazuje, jak stworzyć grafik zgodny z prawem
          </p>
        </div>

        <div className="space-y-4 mb-6" aria-hidden="true">
          <div className="demo-progress">
            <div
              className="demo-progress__bar"
              style={{ transform: `scaleX(${Math.max(progress, 0.03)})` }}
            />
          </div>
          <div className="demo-steps sm:grid-cols-5">
            {videoSteps.map((step, index) => {
              const isActive = index === activeStep;
              const isComplete = index < activeStep;
              return (
                <div
                  key={step.time}
                  className={`demo-step ${isActive ? "demo-step--active" : ""} ${
                    isComplete ? "demo-step--complete" : ""
                  }`}
                >
                  <span className="demo-step__time">{step.time}</span>
                  <span className="demo-step__label">{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>
        
  <Card className="relative bg-card dark:bg-slate-900/70 border border-border/70 dark:border-white/10 rounded-2xl calm-shadow-lg overflow-hidden" data-animate="rise">
          <div
            className="group aspect-[4/3] sm:aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center overflow-hidden"
            role={!isPlaying ? "button" : undefined}
            tabIndex={!isPlaying ? 0 : -1}
            aria-label="Odtwórz demo AutoŻaby"
            onClick={!isPlaying ? handlePlay : undefined}
            onKeyDown={!isPlaying ? handlePreviewKeyDown : undefined}
          >
            {!isPlaying ? (
              <div className="text-center space-y-5 px-6">
                <div className="demo-preview">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <div className="text-white space-y-2 max-w-xs sm:max-w-sm mx-auto text-balance">
                  <h3 className="text-lg sm:text-xl font-semibold text-white" data-testid="text-demo-video-title">
                    Od chaosu do kontroli w 15 minut
                  </h3>
                  <p className="text-sm sm:text-base text-white/80" data-testid="text-demo-video-description">
                    Zobacz, jak AutoŻaba tworzy grafik zgodny z Kodeksem Pracy
                  </p>
                </div>
                <Button
                  size="touch"
                  onClick={(event) => {
                    event.stopPropagation();
                    handlePlay();
                  }}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 cta-glow"
                  data-testid="button-play-demo"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Odtwórz demo
                </Button>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                {/* YouTube embed placeholder - replace with actual YouTube URL */}
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/HbdNWDznFYY?autoplay=1&rel=0"
                  title="AutoŻaba Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  data-testid="iframe-demo-video"
                />
              </div>
            )}
          </div>
          
          {/* Video progress indicators */}
          {!isPlaying && (
            <div className="absolute bottom-4 left-4 right-4 hidden sm:block">
              <div className="flex flex-wrap gap-2 text-xs text-white/80">
                {videoSteps.map((step, index) => (
                  <span 
                    key={index} 
                    className="bg-white/20 px-2 py-1 rounded backdrop-blur-sm"
                    data-testid={`video-step-${index}`}
                  >
                    {step.time} {step.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>
        
        <div className="text-center mt-8 space-y-4">
          <p className="text-muted-foreground mb-4" data-testid="text-demo-cta">
            Przekonaj się, jak łatwo można odzyskać kontrolę nad czasem
          </p>
          {!isPlaying && (
            <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground sm:hidden">
              {videoSteps.map((step, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded-full border ${index === activeStep ? "border-emerald-400 text-emerald-600" : "border-border text-muted-foreground"}`}
                  data-testid={`video-step-mobile-${index}`}
                >
                  {step.time} {step.label}
                </span>
              ))}
            </div>
          )}
          <Button 
            variant="outline" 
            size="touch"
            onClick={() => window.open('https://app.autozaba.pl/register', '_blank')}
            data-testid="button-demo-trial"
          >
            Wypróbuj za darmo
          </Button>
        </div>
      </div>
    </section>
  );
}
