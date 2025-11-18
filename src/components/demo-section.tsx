"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import { APP_URLS } from "@/lib/config";

export default function DemoSection() {
  const videoSteps = [
    { time: "0:00", label: "Problem" },
    { time: "1:04", label: "Tarcza Prawna" },
    { time: "1:10", label: "Inteligentny Grafik" },
    { time: "1:16", label: "Ewidencja i Raporty" },
    { time: "1:33", label: "Rezultat" },
  ];
  const videoId = "HbdNWDznFYY";
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => setIsPlaying(true);
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  return (
    <section id="demo" className="section-padding bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2
            className="text-3xl lg:text-4xl font-bold text-foreground"
            data-testid="text-demo-title"
          >
            Zobacz{" "}
            <span className="text-primary dark:text-emerald-300">
              jak to działa
            </span>
          </h2>
          <p
            className="text-xl text-muted-foreground copy-max mx-auto"
            data-testid="text-demo-subtitle"
          >
            2-minutowe demo pokazuje, jak stworzyć grafik zgodny z prawem
          </p>
        </div>

        <div className="mb-6" aria-hidden="true">
          <div className="demo-steps sm:grid-cols-5">
            {videoSteps.map((step) => (
              <div key={step.time} className="demo-step">
                <span className="demo-step__time">{step.time}</span>
                <span className="demo-step__label">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        <Card
          className="relative bg-card dark:bg-slate-900/70 border border-border/70 dark:border-white/10 rounded-2xl calm-shadow-lg overflow-hidden"
          data-animate="rise"
        >
          {isPlaying ? (
            <div className="aspect-[4/3] sm:aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                title="AutoŻaba Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                data-testid="iframe-demo-video"
              />
            </div>
          ) : (
            <button
              type="button"
              className="group relative aspect-[4/3] sm:aspect-video w-full overflow-hidden"
              onClick={handlePlay}
              onKeyDown={handleKeyDown}
              aria-label="Odtwórz demo AutoŻaby"
              data-testid="button-play-demo"
            >
              <img
                src={thumbnailUrl}
                alt="Miniaturka filmu demo AutoŻaby"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/65 text-center space-y-4 px-6">
                <div className="demo-preview">
                  <Play className="w-8 h-8 text-white ml-1 transition-transform group-hover:scale-110" />
                </div>
                <div className="text-white space-y-2 max-w-xs sm:max-w-sm mx-auto text-balance drop-shadow-md">
                  <h3
                    className="text-lg sm:text-xl font-semibold"
                    data-testid="text-demo-video-title"
                  >
                    Od chaosu do kontroli w 15 minut
                  </h3>
                  <p
                    className="text-sm sm:text-base text-white/90"
                    data-testid="text-demo-video-description"
                  >
                    Zobacz, jak AutoŻaba tworzy grafik zgodny z Kodeksem Pracy
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
                  <Play className="mr-2 h-4 w-4" />
                  Odtwórz demo
                </span>
              </div>
            </button>
          )}
        </Card>

        <div className="text-center mt-8 space-y-4">
          <p className="text-muted-foreground mb-4" data-testid="text-demo-cta">
            Przekonaj się, jak łatwo można odzyskać kontrolę nad czasem
          </p>
          <Button
            variant="outline"
            size="touch"
            onClick={() => window.open(APP_URLS.register, "_blank")}
            data-testid="button-demo-trial"
          >
            Wypróbuj za darmo
          </Button>
        </div>
      </div>
    </section>
  );
}
