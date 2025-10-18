"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Clock, Headphones, Book, Video, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Podaj pełne imię i nazwisko"),
  email: z.string().email("Podaj poprawny adres email"),
  shops: z.string().min(1, "Wybierz liczbę sklepów"),
  message: z.string().min(10, "Napisz kilka zdań, abyśmy mogli pomóc"),
  privacy: z
    .boolean()
    .refine((v) => v === true, { message: "Musisz zaakceptować politykę prywatności" }),
});

type ContactForm = z.infer<typeof ContactSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      shops: "",
      message: "",
      privacy: false,
    }
  })
  const onSubmit = async (_data: ContactForm) => {
    // Tu wyślesz dane na backend (fetch/POST)
    await new Promise((r) => setTimeout(r, 400))
    toast({
      title: "Dziękujemy za wiadomość!",
      description: "Skontaktujemy się w ciągu 2 godzin roboczych.",
    });
    reset()
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "autozaba@ainything.pl",
      iconColor: "text-primary"
    },
    {
      icon: Clock,
      title: "Godziny wsparcia",
      content: "Pon-Pt: 9:00-17:00",
      iconColor: "text-secondary"
    },
    {
      icon: Headphones,
      title: "Wsparcie w języku",
      content: "Polskim, angielskim, ukraińskim",
      iconColor: "text-accent"
    }
  ];

  const quickHelp = [
    { icon: Book, label: "Centrum pomocy i FAQ", href: "#" },
    { icon: Video, label: "Przewodniki wideo", href: "#" },
    { icon: Download, label: "Materiały do pobrania", href: "#" }
  ];

  return (
    <section id="contact" className="section-padding bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="text-center space-y-4 mb-10 sm:mb-12" data-animate data-animate-delay="40">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground" data-testid="text-contact-title">
            Potrzebujesz <span className="text-primary dark:text-emerald-300">pomocy</span>?
          </h2>
          <p className="text-xl text-muted-foreground copy-max mx-auto" data-testid="text-contact-subtitle">
            Jesteśmy tu, by odpowiedzieć na Twoje pytania i pomóc we wdrożeniu
          </p>
        </div>
        
  <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground" data-testid="text-contact-info-title">
                Skontaktuj się z nami
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center space-x-4"
                      data-animate="slide-left"
                      data-animate-delay={`${index * 80}`}
                      data-testid={`contact-info-${index}`}
                    >
                      <div className="tinted-media w-12 h-12 rounded-xl flex items-center justify-center bg-muted">
                        <Icon className={`w-5 h-5 ${info.iconColor}`} />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{info.title}</div>
                        <div className="text-muted-foreground">{info.content}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Quick help */}
            <Card data-animate="rise" data-animate-delay="180">
              <CardContent className="p-5 sm:p-6 space-y-4">
                <h4 className="font-semibold text-foreground" data-testid="text-quick-help-title">
                  Szybka pomoc
                </h4>
                <div className="space-y-3 text-sm">
                  {quickHelp.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <a 
                        key={index} 
                        href={item.href} 
                        className="flex items-center text-primary dark:text-emerald-300 hover:text-primary/80 dark:hover:text-emerald-200 transition-colors"
                        data-animate="slide-right"
                        data-animate-delay={`${120 + index * 60}`}
                        data-testid={`quick-help-${index}`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form */}
            <Card data-animate="rise" data-animate-delay="220">
              <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                <div data-animate="rise" data-animate-delay="40">
                  <Label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                    Imię i nazwisko
                  </Label>
                  <Input 
                    id="name"
                    type="text" 
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                    className="mt-2"
                    data-testid="input-contact-name"
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-2 text-sm text-red-600" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                
                <div data-animate="rise" data-animate-delay="80">
                  <Label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                    Email
                  </Label>
                  <Input 
                    id="email"
                    type="email" 
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                    className="mt-2"
                    data-testid="input-contact-email"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                
                <div data-animate="rise" data-animate-delay="120">
                  <Label
                    id="contact-shops-label"
                    htmlFor="contact-shops"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Liczba sklepów
                  </Label>
                  <Controller
                    control={control}
                    name="shops"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          id="contact-shops"
                          aria-labelledby="contact-shops-label"
                          className="mt-2"
                          data-testid="select-contact-shops"
                          aria-invalid={!!errors.shops}
                          aria-describedby={errors.shops ? "shops-error" : undefined}
                        >
                          <SelectValue placeholder="Wybierz liczbę sklepów" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 sklep</SelectItem>
                          <SelectItem value="2-3">2-3 sklepy</SelectItem>
                          <SelectItem value="4-5">4-5 sklepów</SelectItem>
                          <SelectItem value="5+">Więcej niż 5</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.shops && (
                    <p id="shops-error" className="mt-2 text-sm text-red-600" role="alert">
                      {errors.shops.message}
                    </p>
                  )}
                </div>
                
                <div data-animate="rise" data-animate-delay="160">
                  <Label htmlFor="message" className="text-sm font-medium text-muted-foreground">
                    Czym możemy pomóc?
                  </Label>
                  <Textarea 
                    id="message"
                    rows={4} 
                    placeholder="Opisz swoją sytuację, problemy z grafkami lub pytania o AutoŻabę..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    {...register("message")}
                    className="mt-2 resize-none"
                    data-testid="textarea-contact-message"
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-2 text-sm text-red-600" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center space-x-3" data-animate="rise" data-animate-delay="200">
                  <Controller
                    control={control}
                    name="privacy"
                    render={({ field }) => (
                      <Checkbox id="privacy" checked={field.value} onCheckedChange={(checked) => field.onChange(!!checked)} data-testid="checkbox-contact-privacy" />
                    )}
                  />
                  <Label htmlFor="privacy" className="text-sm text-muted-foreground">
                    Zgadzam się na przetwarzanie danych osobowych zgodnie z{" "}
                      <a href="/polityka-prywatnosci" className="text-primary dark:text-emerald-300 underline hover:underline">polityką prywatności</a>
                  </Label>
                </div>
                {errors.privacy && (
                  <p className="-mt-2 text-sm text-red-600" role="alert">{errors.privacy.message}</p>
                )}
                
                <Button 
                  type="submit" 
                  size="touch"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold disabled:opacity-60 button-border-animated"
                  data-testid="button-contact-submit"
                >
                  {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center" data-testid="text-contact-response-time">
                  Odpowiemy w ciągu 2 godzin roboczych
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
