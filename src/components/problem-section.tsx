import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, XCircle } from "lucide-react";
import Image from 'next/image';

export default function ProblemSection() {
  const problems = [
    {
      id: "schedule-chaos",
      title: "Chaos w grafikach",
      description: "\"Spędzam wieczory nad Excelem zamiast z rodziną. Każdy grafik to 3 godziny kombinowania i strach, czy nie pomyliłem się w prawie.\"",
      risk: "Ryzyko kary do 30 000 zł",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "legal-compliance",
      title: "Strach przed PIP",
      description: "\"Kodeks Pracy to dla mnie czarna magia. Nie wiem, czy ewidencja czasu pracy jest poprawna. Każda kontrola to łoteria.\"",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      legalIssues: [
        "11h odpoczynku między zmianami",
        "Różnice UoP vs umowa zlecenie", 
        "Ewidencja czasu pracy (RCP)"
      ]
    },
    {
      id: "work-life-balance",
      title: "Brak czasu dla siebie",
      description: "\"240 godzin miesięcznie w sklepie plus papierkowa robota w domu. Kiedy mam żyć?\"",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      timeBreakdown: {
        shop: "240h/msc",
        paperwork: "+40h/msc",
        total: "280h/msc"
      }
    }
  ];

  return (
  <section id="problem" className="section-padding bg-white dark:bg-background">
      <div className="container-spacing">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground" data-testid="text-problem-title">
            Wiemy, <span className="text-primary">przez co przechodzisz</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto copy-max" data-testid="text-problem-subtitle">
            16 godzin pracy dziennie, chaos w grafikach i ciągły strach przed kontrolą PIP. 
            Nie jesteś sam z tymi problemami.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem) => (
            <Card 
              key={problem.id} 
              className="hover:calm-shadow-lg transition-shadow bg-card dark:bg-slate-900/70 border border-border/70 dark:border-white/10"
              data-testid={`card-problem-${problem.id}`}
            >
              <div className="tinted-media w-full h-48 bg-muted rounded-t-xl overflow-hidden">
                <Image
                  src={problem.image}
                  alt={problem.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  priority={problem.id === 'schedule-chaos' || problem.id === 'legal-compliance'}
                  data-testid={`img-problem-${problem.id}`}
                />
              </div>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground" data-testid={`text-title-${problem.id}`}>
                    {problem.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`text-description-${problem.id}`}>
                    {problem.description}
                  </p>
                  
                  {problem.risk && (
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-4" data-testid={`risk-warning-${problem.id}`}>
                      <div className="flex items-center text-accent font-medium">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        {problem.risk}
                      </div>
                    </div>
                  )}
                  
                  {problem.legalIssues && (
                    <div className="space-y-2 text-sm text-muted-foreground">
                      {problem.legalIssues.map((issue, index) => (
                        <div key={index} className="flex items-center" data-testid={`legal-issue-${index}`}>
                          <XCircle className="w-4 h-4 text-red-500 mr-2" />
                          {issue}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {problem.timeBreakdown && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Praca w sklepie</span>
                        <span className="font-medium" data-testid="stat-shop-hours">{problem.timeBreakdown.shop}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Grafiki i papiery</span>
                        <span className="font-medium" data-testid="stat-paperwork-hours">{problem.timeBreakdown.paperwork}</span>
                      </div>
                      <hr className="border-border" />
                      <div className="flex justify-between items-center font-semibold text-accent">
                        <span>Razem</span>
                        <span data-testid="stat-total-hours">{problem.timeBreakdown.total}</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
