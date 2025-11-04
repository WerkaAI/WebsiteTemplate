"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCarousel } from "@/hooks/use-carousel";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: "polina-m",
      name: "Polina M.",
      location: "Wrocław",
      quote: "AutoŻabę włączyłam od pierwszego dnia prowadzenia sklepu i do dziś jestem zachwycona – wszystko działa pewnie i bez stresu.",
  avatar: "/illustrations/testimonials/polina64.png",
      rating: 5
    },
    {
      id: "michal-p", 
      name: "Michał P.",
      location: "Warszawa",
      quote: "Pierwszy raz od 3 lat mogłem wziąć weekend bez myślenia o grafikach. AutoŻaba to była najlepsza inwestycja w mojej historii prowadzenia sklepu.",
  avatar: "/illustrations/testimonials/michal.png",
      rating: 5
    },
    {
      id: "wiktor-w",
      name: "Wiktor W.", 
      location: "Gdańsk",
      quote: "Wcześniej to była loteria - czy grafik będzie zgodny z prawem. Teraz mam 100% pewność. To bezcenne uczucie.",
  avatar: "/illustrations/testimonials/wiktor64.png",
      rating: 5
    }
  ];

  const { index, containerRef, next, prev, goTo, pause, resume } = useCarousel({
    size: testimonials.length,
    interval: 6500,
  });

  return (
  <section className="section-padding bg-white dark:bg-background">
      <div className="container-spacing">
  <div className="text-center space-y-4 mb-14 sm:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground" data-testid="text-testimonials-title">
  Odzyskali <span className="text-primary dark:text-emerald-300">spokój ducha</span>
          </h2>
          <p className="text-xl text-muted-foreground copy-max mx-auto" data-testid="text-testimonials-subtitle">
            Prawdziwe historie franczyzobiorców, którzy odzyskali kontrolę
          </p>
        </div>

        <div
          className="testimonials-carousel-wrapper"
          role="group"
          aria-roledescription="carousel"
          aria-label="Historie klientów AutoŻaby"
        >
          <div
            className="testimonials-carousel"
            ref={containerRef}
            onMouseEnter={pause}
            onMouseLeave={resume}
            onFocus={pause}
            onBlur={resume}
          >
            <div
              className="testimonials-track"
              style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
            >
              {testimonials.map((testimonial, slideIndex) => {
                const isActive = slideIndex === index;
                return (
                  <div
                    key={testimonial.id}
                    className="testimonials-slide"
                    aria-hidden={!isActive}
                    data-testid={`card-testimonial-${testimonial.id}`}
                  >
                    <Card
                      className="testimonials-card"
                      style={{
                        transform: `scale(${isActive ? 1 : 0.94})`,
                        opacity: isActive ? 1 : 0.6,
                      }}
                    >
                      <CardContent className="p-6 sm:p-8 space-y-5">
                        <div className="flex items-center space-x-4">
                          <div className="tinted-media w-16 h-16 bg-muted rounded-full overflow-hidden">
                            <Image
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                              data-testid={`img-avatar-${testimonial.id}`}
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground" data-testid={`text-name-${testimonial.id}`}>
                              {testimonial.name}
                            </div>
                            <div className="text-sm text-muted-foreground" data-testid={`text-location-${testimonial.id}`}>
                              {testimonial.location}
                            </div>
                          </div>
                        </div>

                        <div className="flex text-yellow-400" data-testid={`rating-${testimonial.id}`}>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-current" />
                          ))}
                        </div>

                        <blockquote className="text-muted-foreground italic" data-testid={`text-quote-${testimonial.id}`}>
                          &quot;{testimonial.quote}&quot;
                        </blockquote>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="testimonials-controls" aria-label="Sterowanie karuzelą opinii">
            <Button
              type="button"
              variant="outline"
              size="touchIcon"
              onClick={prev}
              aria-label="Poprzednia opinia"
              className="testimonials-control"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="testimonials-dots" role="tablist">
              {testimonials.map((testimonial, dotIndex) => (
                <button
                  key={testimonial.id}
                  type="button"
                  className={`testimonials-dot ${dotIndex === index ? "testimonials-dot--active" : ""}`}
                  onClick={() => goTo(dotIndex)}
                  aria-label={`Pokaż opinię ${testimonial.name}`}
                  aria-selected={dotIndex === index}
                  role="tab"
                />
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="touchIcon"
              onClick={next}
              aria-label="Następna opinia"
              className="testimonials-control"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
