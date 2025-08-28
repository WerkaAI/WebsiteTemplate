import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Calendar, Shield, Smartphone, AlertTriangle } from "lucide-react";

export default function SolutionSection() {
  const beforeAfter = {
    before: [
      "3 godziny na każdy grafik",
      "Ryzyko kary 30 000 zł za błędy", 
      "Chaos w komunikacji (SMS, WhatsApp)",
      "Papierkowa robota do 2 w nocy",
      "Stres i wypalenie zawodowe"
    ],
    after: [
      "15 minut na grafik - automatycznie",
      "100% zgodność z Kodeksem Pracy",
      "Wszystko w jednej aplikacji", 
      "Weekendy dla Ciebie i rodziny",
      "Spokój ducha i kontrola"
    ]
  };

  const features = [
    {
      id: "auto-schedule",
      icon: Calendar,
      title: "Automatyczne grafiki",
      description: "System sam tworzy grafiki uwzględniając dostępność pracowników i wszystkie przepisy Kodeksu Pracy.",
      savings: "2h 45min / grafik"
    },
    {
      id: "legal-shield", 
      icon: Shield,
      title: "Tarcza Prawna §",
      description: "Kontekstowe wskazówki prawne w każdym miejscu aplikacji. Żadnej pomyłki, żadnego ryzyka.",
      protection: "Unikasz kar do 30 000 zł"
    },
    {
      id: "mobile-access",
      icon: Smartphone, 
      title: "Dostęp mobilny",
      description: "Pracownicy deklarują dostępność przez telefon. Ty masz wszystko pod kontrolą z każdego miejsca.",
      benefit: "Nieograniczona liczba pracowników"
    }
  ];

  return (
    <section id="solution" className="section-padding bg-muted">
      <div className="container-spacing">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground" data-testid="text-solution-title">
            Twoja <span className="text-primary">Automatyczna Tarcza Prawna</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-solution-subtitle">
            AutoŻaba to nie kolejne narzędzie HR. To system ochrony, który automatyzuje 
            najbardziej ryzykowne procesy i daje spokój ducha.
          </p>
        </div>
        
        {/* Before/After Comparison */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Before */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-foreground mb-4" data-testid="text-before-title">Bez AutoŻaby</h3>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 space-y-4">
                {beforeAfter.before.map((item, index) => (
                  <div key={index} className="flex items-center text-red-700" data-testid={`before-item-${index}`}>
                    <XCircle className="w-5 h-5 mr-3" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* After */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-foreground mb-4" data-testid="text-after-title">Z AutoŻabą</h3>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 space-y-4">
                {beforeAfter.after.map((item, index) => (
                  <div key={index} className="flex items-center text-green-700" data-testid={`after-item-${index}`}>
                    <CheckCircle className="w-5 h-5 mr-3" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature Showcase */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.id} className="bg-white hover:calm-shadow-lg transition-shadow" data-testid={`card-feature-${feature.id}`}>
                <CardContent className="p-8 space-y-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground" data-testid={`text-feature-title-${feature.id}`}>
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`text-feature-description-${feature.id}`}>
                      {feature.description}
                    </p>
                    
                    {feature.savings && (
                      <div className="bg-muted rounded-lg p-4">
                        <div className="text-sm text-muted-foreground mb-2">Oszczędność czasu:</div>
                        <div className="text-2xl font-bold text-primary" data-testid={`stat-savings-${feature.id}`}>
                          {feature.savings}
                        </div>
                      </div>
                    )}
                    
                    {feature.protection && (
                      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                        <div className="text-sm text-accent font-medium" data-testid={`stat-protection-${feature.id}`}>
                          <AlertTriangle className="w-4 h-4 mr-2 inline" />
                          {feature.protection}
                        </div>
                      </div>
                    )}
                    
                    {feature.benefit && (
                      <div className="flex items-center text-sm text-muted-foreground" data-testid={`stat-benefit-${feature.id}`}>
                        <CheckCircle className="w-4 h-4 mr-2 text-secondary" />
                        <span>{feature.benefit}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
