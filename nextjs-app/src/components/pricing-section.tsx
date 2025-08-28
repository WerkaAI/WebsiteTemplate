import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

export default function PricingSection() {
  const plans = [
    {
      id: "trial",
      name: "Trial 14 dni",
      price: "0 zł",
      period: "/2 tygodnie",
      features: [
        "Pełny dostęp do wszystkich funkcji",
        "Do 10 pracowników", 
        "Wsparcie przez email",
        "Bez zobowiązań"
      ],
      cta: "Rozpocznij trial",
      variant: "outline" as const
    },
    {
      id: "pro",
      name: "AutoŻaba Pro",
      price: "149 zł", 
      period: "/msc za sklep",
      features: [
        "Nieograniczona liczba pracowników",
        "Automatyczne grafiki zgodne z prawem",
        "Tarcza Prawna § - kontekstowa pomoc",
        "Mobilny dostęp dla pracowników",
        "Priorytetowe wsparcie",
        "Eksporty dla PIP i księgowości"
      ],
      cta: "Wybierz plan",
      variant: "default" as const,
      popular: true,
      disclaimer: "Anuluj w każdej chwili • Bez ukrytych kosztów"
    }
  ];

  const comparison = [
    { label: "Inne systemy HR", price: "299-599 zł/msc", note: "+ 20-50 zł za pracownika" },
    { label: "AutoŻaba", price: "149 zł/msc", note: "0 zł za pracownika", highlight: true },
    { label: "Koszt braku systemu", price: "30 000 zł", note: "Maksymalna kara PIP", warning: true }
  ];

  return (
    <section id="pricing" className="section-padding bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground" data-testid="text-pricing-title">
            Prosta <span className="text-primary">cena</span>, wielka wartość
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="text-pricing-subtitle">
            149 zł za sklep, bez względu na liczbę pracowników
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${plan.variant === 'default' ? 'bg-primary text-primary-foreground' : 'bg-white'}`}
              data-testid={`card-plan-${plan.id}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-medium">
                  Najpopularniejszy
                </div>
              )}
              
              <CardHeader className="space-y-2 pb-6">
                <h3 className="text-2xl font-bold" data-testid={`text-plan-name-${plan.id}`}>
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold" data-testid={`text-plan-price-${plan.id}`}>
                  {plan.price}
                  <span className={`text-lg font-normal ${plan.variant === 'default' ? 'opacity-80' : 'text-muted-foreground'}`}>
                    {plan.period}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center" data-testid={`feature-${plan.id}-${index}`}>
                      <CheckCircle className="w-5 h-5 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.variant}
                  className={`w-full py-3 font-semibold ${
                    plan.variant === 'default' 
                      ? 'bg-white text-primary hover:bg-gray-100' 
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => window.open('https://app.autozaba.pl/trial', '_blank')}
                  data-testid={`button-plan-${plan.id}`}
                >
                  {plan.cta}
                </Button>
                
                {plan.disclaimer && (
                  <div className="text-center text-sm opacity-80" data-testid={`text-disclaimer-${plan.id}`}>
                    {plan.disclaimer}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Price comparison */}
        <Card>
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center" data-testid="text-comparison-title">
              Porównaj z konkurencją
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              {comparison.map((item, index) => (
                <div key={index} className="space-y-2 text-center" data-testid={`comparison-item-${index}`}>
                  <div className={`font-medium ${
                    item.highlight ? 'text-primary' : 
                    item.warning ? 'text-accent' : 'text-muted-foreground'
                  }`} data-testid={`comparison-label-${index}`}>
                    {item.label}
                  </div>
                  <div className={`text-2xl font-bold ${
                    item.highlight ? 'text-primary' : 
                    item.warning ? 'text-accent' : 'text-foreground'
                  }`} data-testid={`comparison-price-${index}`}>
                    {item.price}
                  </div>
                  <div className={`${
                    item.highlight ? 'text-primary' : 
                    item.warning ? 'text-accent' : 'text-muted-foreground'
                  }`} data-testid={`comparison-note-${index}`}>
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
