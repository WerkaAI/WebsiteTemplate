"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

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
    role: "Franczyzobiorca, Wrocław",
    content: "Autożabę wdrożyłam od pierwszego dnia prowadzenia sklepu i do dziś jestem zachwycona - wszystko działa pewnie i bez stresu.",
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden flex flex-col items-center">
      <div className="container-spacing relative z-10 w-full">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 space-y-4 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold text-foreground" variants={itemVariants}>
            Zaufali nam <span className="text-emerald-600 dark:text-emerald-400">Franczyzobiorcy</span>
          </motion.h2>
          <motion.p className="text-xl text-muted-foreground" variants={itemVariants}>
            Dołącz do grona zadowolonych właścicieli sklepów Żabka.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <Card className="h-full glass-premium border-0 relative overflow-hidden transition-all duration-300 hover:shadow-xl">
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
