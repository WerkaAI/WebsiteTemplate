import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navItems = [
    { id: "problem", label: "Problemy" },
    { id: "solution", label: "Rozwiązanie" },
    { id: "pricing", label: "Cennik" },
    { id: "contact", label: "Kontakt" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container-spacing">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2" data-testid="link-logo">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">Ż</span>
              </div>
              <span className="text-xl font-bold text-foreground">AutoŻaba</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`link-nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <Link href="/blog">
              <Button variant="ghost" data-testid="link-nav-blog">
                Blog
              </Button>
            </Link>
          </div>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90" 
              onClick={() => window.open('https://app.autozaba.pl', '_blank')}
              data-testid="button-login-desktop"
            >
              Zaloguj się do systemu
            </Button>
          </div>
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-lg text-muted-foreground hover:text-foreground transition-colors text-left"
                    data-testid={`link-mobile-${item.id}`}
                  >
                    {item.label}
                  </button>
                ))}
                <Link href="/blog">
                  <Button variant="ghost" className="justify-start text-lg" data-testid="link-mobile-blog">
                    Blog
                  </Button>
                </Link>
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6"
                  onClick={() => window.open('https://app.autozaba.pl', '_blank')}
                  data-testid="button-login-mobile"
                >
                  Zaloguj się do systemu
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
