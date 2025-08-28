import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: "michal-k",
      name: "Michał K.",
      location: "Żabka Wrocław, 8 pracowników",
      quote: "Pierwszy raz od 3 lat mogłem wziąć weekend bez myślenia o grafikach. AutoŻaba to była najlepsza inwestycja w mojej historii prowadzenia sklepu.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      rating: 5
    },
    {
      id: "anna-t", 
      name: "Anna T.",
      location: "Żabka Kraków, 12 pracowników",
      quote: "Kontrola PIP była tydzień temu. Zero uwag! Wszystkie dokumenty idealne. Wreszcie śpię spokojnie.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      rating: 5
    },
    {
      id: "piotr-l",
      name: "Piotr L.", 
      location: "Żabka Gdańsk, 6 pracowników",
      quote: "Wcześniej to była loteria - czy grafik będzie zgodny z prawem. Teraz mam 100% pewność. To bezcenne uczucie.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      rating: 5
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-spacing">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground" data-testid="text-testimonials-title">
            Odzyskali <span className="text-primary">spokój ducha</span>
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="text-testimonials-subtitle">
            Prawdziwe historie franczyzobiorców, którzy odzyskali kontrolę
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:calm-shadow-lg transition-shadow" data-testid={`card-testimonial-${testimonial.id}`}>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-muted rounded-full overflow-hidden">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
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
                  "{testimonial.quote}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
