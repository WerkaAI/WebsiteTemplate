"use client";

import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function DemoSection() {
  return (
    <section id="demo" className="py-24 relative overflow-hidden bg-muted/30 flex flex-col items-center">
      <div className="container-spacing relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Zobacz, jak to działa <br />
              <span className="text-emerald-600 dark:text-emerald-400">w praktyce</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Wystarczą 3 minuty, aby ułożyć grafik na cały miesiąc.
              Zobacz krótkie wideo i przekonaj się, jak prosta jest AutoŻaba.
            </p>

            <div className="space-y-2 md:space-y-4">
              {[
                "Logowanie i import pracowników",
                "Definiowanie reguł i preferencji",
                "Jedno kliknięcie: Generuj Grafik",
                "Gotowy plan zgodny z Kodeksem Pracy"
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/50 backdrop-blur-sm md:gap-4 md:p-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm dark:bg-emerald-500/20 dark:text-emerald-300">
                    {index + 1}
                  </div>
                  <span className="font-medium text-foreground">{step}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            {/* Laptop Frame Effect */}
            <div className="relative rounded-2xl bg-slate-900 border-[8px] border-slate-800 shadow-2xl overflow-hidden aspect-video group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
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
          </motion.div>

        </div>
      </div>
    </section>
  );
}
