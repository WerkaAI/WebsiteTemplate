"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

export default function DemoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoSteps = [
    { time: "0:00", label: "Problem" },
    { time: "0:30", label: "Import danych" },
    { time: "1:00", label: "Automatyczny grafik" },
    { time: "1:30", label: "Kontrola prawna" },
    { time: "2:00", label: "Rezultat" }
  ];

  return (
    <section id="demo" className="section-padding bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground" data-testid="text-demo-title">
            Zobacz <span className="text-primary">jak to działa</span>
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="text-demo-subtitle">
            2-minutowe demo pokazuje, jak stworzyć grafik zgodny z prawem
          </p>
        </div>
        
        <Card className="relative bg-white rounded-2xl calm-shadow-lg overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
            {!isPlaying ? (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <div className="text-white">
                  <h3 className="text-xl font-semibold mb-2" data-testid="text-demo-video-title">
                    Od chaosu do kontroli w 15 minut
                  </h3>
                  <p className="text-white/80" data-testid="text-demo-video-description">
                    Zobacz, jak AutoŻaba tworzy grafik zgodny z Kodeksem Pracy
                  </p>
                </div>
                <Button 
                  onClick={() => setIsPlaying(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
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
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
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
            <div className="absolute bottom-4 left-4 right-4">
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
        
        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4" data-testid="text-demo-cta">
            Przekonaj się, jak łatwo można odzyskać kontrolę nad czasem
          </p>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.open('https://app.autozaba.pl/trial', '_blank')}
            data-testid="button-demo-trial"
          >
            Wypróbuj za darmo
          </Button>
        </div>
      </div>
    </section>
  );
}
