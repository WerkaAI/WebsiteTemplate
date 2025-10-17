"use client";

import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ContactForm from '@/components/contact-form';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { useEffect } from 'react';

export default function ContactPage() {
  // Set page metadata using useEffect since we can't export metadata from Client Components
  useEffect(() => {
    document.title = 'Kontakt | AutoŻaba';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Skontaktuj się z zespołem AutoŻaba. Pomożemy Ci w zarządzaniu zespołem i przestrzeganiu prawa pracy w Twojej franczyzie Żabka.');
    }
  }, []);
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'kontakt@autozaba.pl',
      description: 'Odpowiadamy w ciągu 24 godzin',
    },
    {
      icon: Phone,
      title: 'Telefon',
      content: '+48 123 456 789',
      description: 'Pon-Pt 9:00-17:00',
    },
    {
      icon: Clock,
      title: 'Czas odpowiedzi',
      content: 'Do 24 godzin',
      description: 'W dni robocze jeszcze szybciej',
    },
    {
      icon: MapPin,
      title: 'Siedziba',
      content: 'Warszawa, Polska',
      description: 'Obsługujemy całą Polskę',
    },
  ];

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-muted dark:bg-slate-950">
        {/* Header */}
        <section className="bg-white dark:bg-slate-950 border-b border-border/60 dark:border-white/5">
          <div className="container-spacing py-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-4 mb-6">
                <Link href="/">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" data-testid="button-back-home">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Powrót do strony głównej
                  </Button>
                </Link>
              </div>
              
              <div className="text-center space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground" data-testid="text-contact-title">
                  Skontaktuj się z nami
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-contact-subtitle">
                  Masz pytania o AutoŻabę? Chcesz poznać szczegóły? 
                  Napisz do nas - pomożemy Ci zadbać o Twój zespół i spokój ducha.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
  <section className="py-12">
          <div className="container-spacing">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="text-center hover:calm-shadow-lg transition-shadow bg-card dark:bg-slate-900 border border-border/60 dark:border-white/10" data-testid={`card-contact-info-${index}`}>
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <p className="font-semibold text-foreground mb-2" data-testid={`text-contact-info-title-${index}`}>
                        {info.title}
                      </p>
                      <p className="text-lg font-medium text-foreground mb-1" data-testid={`text-contact-info-content-${index}`}>
                        {info.content}
                      </p>
                      <p className="text-sm text-muted-foreground" data-testid={`text-contact-info-description-${index}`}>
                        {info.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Main Contact Section */}
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Contact Form */}
                <Card className="calm-shadow-lg bg-card dark:bg-slate-900 border border-border/60 dark:border-white/10">
                  <CardHeader>
                    <CardTitle className="text-2xl text-foreground" data-testid="text-form-title">
                      Wyślij nam wiadomość
                    </CardTitle>
                    <p className="text-muted-foreground" data-testid="text-form-description">
                      Wypełnij formularz, a skontaktujemy się z Tobą w ciągu 24 godzin.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ContactForm />
                  </CardContent>
                </Card>

                {/* Additional Information */}
                <div className="space-y-8">
                  <Card className="bg-card dark:bg-slate-900 border border-border/60 dark:border-white/10">
                    <CardHeader>
                      <CardTitle className="text-xl text-foreground" data-testid="text-why-contact-title">
                        Dlaczego warto się skontaktować?
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-foreground">Bezpłatna konsultacja</p>
                          <p className="text-sm text-muted-foreground">Przeanalizujemy Twoją sytuację i pokażemy, jak AutoŻaba może Ci pomóc.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-foreground">Dopasowane rozwiązanie</p>
                          <p className="text-sm text-muted-foreground">Każda franczyza jest inna - dostosujemy AutoŻabę do Twoich potrzeb.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-foreground">Wsparcie wdrożenia</p>
                          <p className="text-sm text-muted-foreground">Pomożemy Ci sprawnie przejść na automatyczne zarządzanie zespołem.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary/5 dark:bg-primary/15 border-primary/20 dark:border-primary/40">
                    <CardContent className="p-6">
                      <div className="text-center space-y-4">
                        <p className="text-lg font-semibold text-foreground" data-testid="text-urgent-title">
                          Potrzebujesz pilnej pomocy?
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Masz kontrolę PIP jutro? Skontaktuj się z nami telefonicznie - pomożemy natychmiast.
                        </p>
                        <Button 
                          className="bg-primary hover:bg-primary/90"
                          onClick={() => window.open('tel:+48123456789', '_self')}
                          data-testid="button-call-urgent"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Zadzwoń teraz
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}