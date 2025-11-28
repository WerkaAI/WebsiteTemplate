"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Mail, Clock, Headphones, Video } from "lucide-react";
import ContactForm from "@/components/features/contact/contact-form";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "autozaba@ainything.pl",
    iconColor: "text-primary",
  },
  {
    icon: Clock,
    title: "Godziny wsparcia",
    content: "Pon-Pt: 9:00-17:00",
    iconColor: "text-secondary",
  },
  {
    icon: Headphones,
    title: "Wsparcie w języku",
    content: "Polskim, angielskim, ukraińskim",
    iconColor: "text-accent",
  },
];

const quickHelp = [
  { icon: Video, label: "Przewodniki wideo", href: "/tutoriale" },
];

export default function ContactSection() {
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
                      key={info.title}
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
            <div className="glass-premium rounded-xl" data-animate="rise" data-animate-delay="180">
              <CardContent className="p-5 sm:p-6 space-y-4">
                <h4 className="font-semibold text-foreground" data-testid="text-quick-help-title">
                  Szybka pomoc
                </h4>
                <div className="space-y-3 text-sm">
                  {quickHelp.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
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
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-premium rounded-xl" data-animate="rise" data-animate-delay="220">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <ContactForm
                showPhone={false}
                showShops
                successToast={{
                  title: "Dziękujemy za wiadomość!",
                  description: "Skontaktujemy się w ciągu 2 godzin roboczych.",
                }}
                submitLabel="Wyślij wiadomość"
                submitButtonSize="touch"
                submitButtonClassName="text-primary-foreground font-semibold disabled:opacity-60 button-border-animated"
              />
              <p className="text-xs text-muted-foreground text-center" data-testid="text-contact-response-time">
                Odpowiemy w ciągu 2 godzin roboczych
              </p>
            </CardContent>
          </div>
        </div>
      </div>
    </section>
  );
}
