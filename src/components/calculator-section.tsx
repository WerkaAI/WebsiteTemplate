"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CalculatorSection() {
  const [shops, setShops] = useState(1);
  const [hoursPerWeek, setHoursPerWeek] = useState(8);
  const [hadPIPControl, setHadPIPControl] = useState(false);
  
  const [calculations, setCalculations] = useState({
    timeSaved: 26,
    weekendsSaved: 6,
    riskAvoided: 30000,
    autozabaCost: 149,
    monthlyBenefit: 2549
  });

  useEffect(() => {
    // Calculate actual benefits for franchise owners
    const monthlyHours = hoursPerWeek * 4.33; // Average weeks per month
    const timeSavedPerShop = monthlyHours * 0.75; // 75% time reduction with AutoŻaba
    const totalTimeSaved = Math.round(timeSavedPerShop * shops);
    
    // Weekends saved per year (approximately 1 weekend every 2 months per shop)
    const weekendsSaved = Math.round(shops * 6);
    
    // Risk avoided - increases with more shops
    const riskAvoided = hadPIPControl ? 30000 * shops : 30000;
    
    // Monthly cost
    const monthlyCost = 149 * shops;
    
    // Monthly benefit calculation (time value + risk mitigation)
    const monthlyRiskValue = riskAvoided / 12; // Spread risk over a year
    const monthlyBenefit = Math.round(monthlyRiskValue - monthlyCost);
    
    setCalculations({
      timeSaved: totalTimeSaved,
      weekendsSaved: weekendsSaved,
      riskAvoided: riskAvoided,
      autozabaCost: monthlyCost,
      monthlyBenefit: monthlyBenefit
    });
  }, [shops, hoursPerWeek, hadPIPControl]);

  return (
  <section className="section-padding bg-white dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground" data-testid="text-calculator-title">
            Sprawdź, ile <span className="text-primary">zaoszczędzisz</span>
          </h2>
          <p className="text-xl text-muted-foreground copy-max mx-auto" data-testid="text-calculator-subtitle">
            Kalkulator uwzględnia oszczędność czasu, uniknięte kary i spokój ducha
          </p>
        </div>
        
        <Card className="calm-shadow-lg">
          <CardContent className="p-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground" data-testid="text-calculator-inputs-title">Twoja sytuacja</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Liczba sklepów
                    </Label>
                    <Input 
                      type="number" 
                      value={shops} 
                      onChange={(e) => setShops(Math.max(1, Math.min(5, parseInt(e.target.value) || 1)))}
                      min="1" 
                      max="5"
                      className="mt-2"
                      data-testid="input-calculator-shops"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Większość franczyzobiorców ma 1-2 sklepy
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Godzin tygodniowo spędzasz na grafikach i papierkach
                    </Label>
                    <Input 
                      type="number" 
                      value={hoursPerWeek} 
                      onChange={(e) => setHoursPerWeek(Math.max(1, Math.min(30, parseInt(e.target.value) || 8)))}
                      min="1" 
                      max="30"
                      className="mt-2"
                      data-testid="input-calculator-hours"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Średnio franczyzobiorcy spędzają 8-12h tygodniowo
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="pip-control"
                      checked={hadPIPControl}
                      onChange={(e) => setHadPIPControl(e.target.checked)}
                      className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                      data-testid="checkbox-pip-control"
                    />
                    <Label htmlFor="pip-control" className="text-sm font-medium text-muted-foreground cursor-pointer">
                      Miałeś już kontrolę PIP w ciągu ostatnich 2 lat?
                    </Label>
                  </div>
                </div>
              </div>
              
              {/* Results */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground" data-testid="text-calculator-results-title">Co zyskujesz</h3>
                
                <div className="space-y-4">
                  <div className="bg-green-50 dark:bg-emerald-500/15 border border-green-200 dark:border-emerald-500/40 rounded-lg p-4">
                    <div className="text-sm text-green-700 dark:text-emerald-200 mb-1">Odzyskany czas miesięcznie</div>
                    <div className="text-2xl font-bold text-green-800 dark:text-emerald-100" data-testid="stat-time-saved">
                      {calculations.timeSaved} godzin
                    </div>
                    <div className="text-xs text-green-600 dark:text-emerald-200/80">
                      Czas dla rodziny i odpoczynku
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-sky-500/15 border border-blue-200 dark:border-sky-500/40 rounded-lg p-4">
                    <div className="text-sm text-blue-700 dark:text-sky-200 mb-1">Wolne weekendy rocznie</div>
                    <div className="text-2xl font-bold text-blue-800 dark:text-sky-100" data-testid="stat-weekends-saved">
                      +{calculations.weekendsSaved} weekendów
                    </div>
                    <div className="text-xs text-blue-600 dark:text-sky-200/80">
                      Bez myślenia o grafikach
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 dark:bg-amber-500/15 border border-orange-200 dark:border-amber-500/40 rounded-lg p-4">
                    <div className="text-sm text-orange-700 dark:text-amber-200 mb-1">Ochrona przed karami PIP</div>
                    <div className="text-2xl font-bold text-orange-800 dark:text-amber-100" data-testid="stat-penalty-avoided" suppressHydrationWarning>
                      {calculations.riskAvoided.toLocaleString()} zł
                    </div>
                    <div className="text-xs text-orange-600 dark:text-amber-200/80">
                      {hadPIPControl ? "Zwiększone ryzyko powtórnej kontroli" : "Maksymalna kara za naruszenia"}
                    </div>
                  </div>
                  
                  <div className="bg-primary/10 dark:bg-primary/25 border border-primary/20 dark:border-primary/40 rounded-lg p-4">
                    <div className="text-sm text-primary dark:text-primary/80 mb-1">Inwestycja w AutoŻabę</div>
                    <div className="text-2xl font-bold text-primary dark:text-primary-foreground" data-testid="stat-autozaba-cost">
                      {calculations.autozabaCost} zł/msc
                    </div>
                    <div className="text-xs text-primary dark:text-primary/70">
                      Nieograniczona liczba pracowników
                    </div>
                  </div>
                  
                  {calculations.monthlyBenefit > 0 && (
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-emerald-500/15 dark:via-transparent dark:to-sky-500/15 border border-green-200 dark:border-emerald-500/40 rounded-lg p-4">
                      <div className="text-sm text-green-700 dark:text-emerald-200 mb-1 font-semibold">Spokój ducha</div>
                      <div className="text-lg font-bold text-green-800 dark:text-emerald-100" data-testid="stat-peace-of-mind">
                        Bezcenny
                      </div>
                      <div className="text-xs text-green-600 dark:text-emerald-200/80">
                        100% zgodność z prawem, zero stresu
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="text-center pt-6 border-t border-border">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg calm-shadow transition-all duration-300 hover:scale-105"
                onClick={() => window.open('https://app.autozaba.pl/register', '_blank')}
                data-testid="button-calculator-register"
              >
                Zacznij oszczędzać czas →
              </Button>
              <p className="text-sm text-muted-foreground mt-2" data-testid="text-calculator-disclaimer">
                Tylko {calculations.autozabaCost} zł/msc • Nieograniczona liczba pracowników
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
