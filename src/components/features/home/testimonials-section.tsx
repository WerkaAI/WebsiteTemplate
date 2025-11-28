"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Michał",
    role: "Franczyzobiorca, Warszawa",
    content: "Wcześniej układanie grafiku zajmowało mi cały weekend. Teraz robię to w 15 minut przy kawie. AutoŻaba to gamechanger.",
    rating: 5,
    avatar: "/illustrations/testimonials/michal.png"
  },
  {
    name: "Polina",
    role: "Franczyzobiorca, Poznań",
    content: "Bałam się kontroli PIP, bo ciągle coś się zmieniało w przepisach. Teraz śpię spokojnie, bo system pilnuje wszystkiego za mnie.",
    rating: 5,
    avatar: "/illustrations/testimonials/polina64.png"
  },
  {
    name: "Wiktor",
    role: "Franczyzobiorca, Gdańsk",
    content: "Pracownicy są zachwyceni aplikacją. Sami wpisują dyspozycyjność, widzą grafik w telefonie. Skończyły się telefony 'kiedy mam przyjść?'.",
    rating: 5,
    avatar: "/illustrations/testimonials/wiktor64.png"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container-spacing relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground" data-animate="rise">
            Zaufali nam <span className="text-emerald-600 dark:text-emerald-400">Franczyzobiorcy</span>
          </h2>
          <p className="text-xl text-muted-foreground" data-animate="rise" data-animate-delay="100">
            Dołącz do grona zadowolonych właścicieli sklepów Żabka.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative group"
              data-animate="rise"
              data-animate-delay={`${index * 100 + 200}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <Card className="h-full glass-premium border-0 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-8 flex flex-col h-full">
                  <Quote className="w-10 h-10 text-emerald-500/20 mb-6" />

                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-lg text-foreground/90 mb-8 flex-1 leading-relaxed">
                    &quot;{testimonial.content}&quot;
                  </p>

                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/50">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative bg-emerald-100 dark:bg-emerald-900/50">
                      <Image
                        src={testimonial.avatar}
                        alt={`Zdjęcie ${testimonial.name}`}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
