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

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    shops: "",
    message: "",
    privacy: false
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) {
      toast({
        title: "Błąd",
        description: "Musisz zaakceptować politykę prywatności",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would normally send the form data to your backend
    toast({
      title: "Dziękujemy za wiadomość!",
      description: "Skontaktujemy się w ciągu 2 godzin roboczych."
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      shops: "",
      message: "",
      privacy: false
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "autozaba@ainything.pl",
      color: "primary"
    },
    {
      icon: Clock,
      title: "Godziny wsparcia",
      content: "Pon-Pt: 9:00-17:00",
      color: "secondary"
    },
    {
      icon: Headphones,
      title: "Wsparcie w języku",
      content: "Polskim, angielskim, ukraińskim",
      color: "accent"
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
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground" data-testid="text-contact-title">
            Potrzebujesz <span className="text-primary">pomocy</span>?
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="text-contact-subtitle">
            Jesteśmy tu, by odpowiedzieć na Twoje pytania i pomóc we wdrożeniu
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
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
                    <div key={index} className="flex items-center space-x-4" data-testid={`contact-info-${index}`}>
                      <div className={`w-10 h-10 bg-${info.color}/10 rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 text-${info.color}`} />
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
            <Card>
              <CardContent className="p-6 space-y-4">
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
                        className="flex items-center text-primary hover:text-primary/80 transition-colors"
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
          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                    Imię i nazwisko
                  </Label>
                  <Input 
                    id="name"
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-2"
                    data-testid="input-contact-name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                    Email
                  </Label>
                  <Input 
                    id="email"
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-2"
                    data-testid="input-contact-email"
                  />
                </div>
                
                <div>
                  <Label htmlFor="shops" className="text-sm font-medium text-muted-foreground">
                    Liczba sklepów
                  </Label>
                  <Select value={formData.shops} onValueChange={(value) => setFormData(prev => ({ ...prev, shops: value }))}>
                    <SelectTrigger className="mt-2" data-testid="select-contact-shops">
                      <SelectValue placeholder="Wybierz liczbę sklepów" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 sklep</SelectItem>
                      <SelectItem value="2-3">2-3 sklepy</SelectItem>
                      <SelectItem value="4-5">4-5 sklepów</SelectItem>
                      <SelectItem value="5+">Więcej niż 5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-muted-foreground">
                    Czym możemy pomóc?
                  </Label>
                  <Textarea 
                    id="message"
                    rows={4} 
                    placeholder="Opisz swoją sytuację, problemy z grafkami lub pytania o AutoŻabę..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="mt-2 resize-none"
                    data-testid="textarea-contact-message"
                  />
                </div>
                
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="privacy" 
                    checked={formData.privacy}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, privacy: !!checked }))}
                    data-testid="checkbox-contact-privacy"
                  />
                  <Label htmlFor="privacy" className="text-sm text-muted-foreground">
                    Zgadzam się na przetwarzanie danych osobowych zgodnie z{" "}
                    <a href="#" className="text-primary hover:underline">polityką prywatności</a>
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-semibold"
                  data-testid="button-contact-submit"
                >
                  Wyślij wiadomość
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
