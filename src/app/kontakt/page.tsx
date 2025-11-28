"use client";

import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, Clock, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ContactForm from '@/components/features/contact/contact-form';
import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';
import { useEffect } from 'react';

export default function ContactPage() {
  useEffect(() => {
    document.title = 'Kontakt | AutoŻaba';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Skontaktuj się z zespołem AutoŻaba. Pomożemy Ci w zarządzaniu zespołem i przestrzeganiu prawa pracy w Twojej franczyzie Żabka.');
    }
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'autozaba@ainything.pl',
      description: 'Odpowiadamy w ciągu 24 godzin',
      action: 'Napisz wiadomość',
      href: 'mailto:autozaba@ainything.pl'
    },
    {
      icon: Phone,
      title: 'Telefon',
      content: '+48 733 722 428',
      description: 'Pon-Pt 9:00-17:00',
      action: 'Zadzwoń teraz',
      href: 'tel:+48733722428'
    },
    {
      icon: MapPin,
      title: 'Siedziba',
      content: 'Warszawa, Polska',
      description: 'Obsługujemy całą Polskę',
      action: 'Zobacz na mapie',
      href: 'https://goo.gl/maps/placeholder' // Placeholder
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="container-spacing relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
            <MessageSquare className="h-4 w-4" />
            <span>Jesteśmy tu dla Ciebie</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl" data-testid="text-contact-title">
            Skontaktuj się z nami
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-contact-subtitle">
            Masz pytania o AutoŻabę? Chcesz poznać szczegóły?
            Napisz do nas - pomożemy Ci zadbać o Twój zespół i spokój ducha.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container-spacing pb-12">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.href}
              className="group block h-full"
              target={info.icon === MapPin ? "_blank" : undefined}
              rel={info.icon === MapPin ? "noopener noreferrer" : undefined}
            >
              <article
                className="relative h-full rounded-3xl glass-premium p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                data-animate="rise"
                data-animate-delay={`${index * 100}`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <info.icon className="w-24 h-24" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors dark:bg-emerald-500/20 dark:text-emerald-300">
                    <info.icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-semibold text-muted-foreground mb-1">{info.title}</h3>
                  <p className="text-xl font-bold text-foreground mb-2">{info.content}</p>
                  <p className="text-sm text-muted-foreground mb-6">{info.description}</p>

                  <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
                    {info.action}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </article>
            </a>
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container-spacing pb-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">

          {/* Contact Form */}
          <div className="rounded-3xl glass-premium p-8 lg:p-10" data-animate="slide-right">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Wyślij wiadomość</h2>
              <p className="text-muted-foreground">
                Wypełnij formularz, a skontaktujemy się z Tobą w ciągu 24 godzin.
              </p>
            </div>
            <ContactForm />
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8" data-animate="slide-left" data-animate-delay="200">
            {/* Urgent Help Card */}
            <div className="rounded-3xl bg-gradient-to-br from-rose-500 to-orange-500 p-[1px] shadow-2xl shadow-orange-500/20">
              <div className="rounded-[23px] bg-white dark:bg-slate-950 p-8 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -mr-16 -mt-16" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700 mb-4 dark:bg-orange-500/20 dark:text-orange-200">
                    <Clock className="w-3 h-3" />
                    Pilna sprawa?
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Masz kontrolę PIP jutro?
                  </h3>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    Nie czekaj na maila. Zadzwoń do nas bezpośrednio, a pomożemy Ci przygotować dokumentację w trybie ekspresowym.
                  </p>

                  <Button
                    className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white shadow-lg border-0"
                    onClick={() => window.open('tel:+48733722428', '_self')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Zadzwoń: +48 733 722 428
                  </Button>
                </div>
              </div>
            </div>

            {/* Why Contact Us */}
            <div className="rounded-3xl glass-premium p-8">
              <h3 className="text-lg font-bold text-foreground mb-6">Dlaczego warto?</h3>
              <ul className="space-y-6">
                {[
                  { title: 'Bezpłatna konsultacja', desc: 'Przeanalizujemy Twoją sytuację i pokażemy, jak AutoŻaba może Ci pomóc.' },
                  { title: 'Dopasowane rozwiązanie', desc: 'Każda franczyza jest inna - dostosujemy AutoŻabę do Twoich potrzeb.' },
                  { title: 'Wsparcie wdrożenia', desc: 'Pomożemy Ci sprawnie przejść na automatyczne zarządzanie zespołem.' }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 dark:bg-emerald-500/20 dark:text-emerald-300">
                      <span className="font-bold text-sm">{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map Visual */}
            <div className="rounded-3xl glass-premium p-1 overflow-hidden relative h-48 group">
              <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                {/* Abstract Map Pattern */}
                <div className="opacity-10 w-full h-full" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full animate-ping absolute inset-0" />
                    <div className="w-4 h-4 bg-emerald-500 rounded-full relative z-10 border-2 border-white dark:border-slate-900" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="text-xs font-semibold text-emerald-600 bg-white/80 dark:bg-slate-900/80 px-3 py-1 rounded-full backdrop-blur-sm">
                    Obsługujemy całą Polskę
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}