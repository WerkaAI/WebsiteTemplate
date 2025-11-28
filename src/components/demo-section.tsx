"use client";

import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

export default function DemoSection() {
  return (
    <section id="demo" className="py-24 relative overflow-hidden bg-muted/30">
      <div className="container-spacing relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="space-y-8" data-animate="slide-right">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Zobacz, jak to działa <br />
              <span className="text-emerald-600 dark:text-emerald-400">w praktyce</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Wystarczą 3 minuty, aby ułożyć grafik na cały miesiąc.
              Zobacz krótkie wideo i przekonaj się, jak prosta jest AutoŻaba.
            </p>

            <div className="space-y-4">
              {[
                "Logowanie i import pracowników",
                "Definiowanie reguł i preferencji",
                "Jedno kliknięcie: Generuj Grafik",
                "Gotowy plan zgodny z Kodeksem Pracy"
              ].map((step, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm dark:bg-emerald-500/20 dark:text-emerald-300">
                    {index + 1}
                  </div>
                  <span className="font-medium text-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative" data-animate="slide-left" data-animate-delay="200">
            {/* Laptop Frame Effect */}
            <div className="relative rounded-2xl bg-slate-900 border-[8px] border-slate-800 shadow-2xl overflow-hidden aspect-video group cursor-pointer">
              {/* Video Embed */}
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/HbdNWDznFYY?rel=0"
                title="AutoŻaba Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full bg-slate-900"
              ></iframe>
            </div>

            {/* Laptop Base */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[110%] h-4 bg-slate-800 rounded-b-xl shadow-lg -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
