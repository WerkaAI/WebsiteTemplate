import { Link } from "wouter";

export default function Footer() {
  const footerSections = [
    {
      title: "Produkt",
      links: [
        { label: "Funkcje", href: "#solution" },
        { label: "Cennik", href: "#pricing" },
        { label: "Demo", href: "#demo" },
        { label: "Integracje", href: "#" }
      ]
    },
    {
      title: "Zasoby", 
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Centrum pomocy", href: "#" },
        { label: "Przewodniki", href: "#" },
        { label: "Webinary", href: "#" }
      ]
    },
    {
      title: "Kontakt",
      links: [
        { label: "autozaba@ainything.pl", href: "mailto:autozaba@ainything.pl" },
        { label: "Wsparcie", href: "#contact" },
        { label: "Partnerzy", href: "#" },
        { label: "Kariera", href: "#" }
      ]
    }
  ];

  const legalLinks = [
    { label: "Polityka prywatności", href: "#" },
    { label: "Regulamin", href: "#" },
    { label: "RODO", href: "#" }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      scrollToSection(href);
    }
  };

  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container-spacing">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/">
              <div className="flex items-center space-x-2" data-testid="link-footer-logo">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">Ż</span>
                </div>
                <span className="text-xl font-bold">AutoŻaba</span>
              </div>
            </Link>
            <p className="text-gray-400" data-testid="text-footer-description">
              Automatyczna tarcza prawna dla franczyzobiorców Żabki. 
              Zarządzaj zespołem, nie ryzykiem.
            </p>
          </div>
          
          {/* Footer Sections */}
          {footerSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-4">
              <h3 className="font-semibold" data-testid={`text-footer-section-${sectionIndex}`}>
                {section.title}
              </h3>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.href.startsWith('#') ? (
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className="hover:text-white transition-colors text-left"
                        data-testid={`link-footer-${sectionIndex}-${linkIndex}`}
                      >
                        {link.label}
                      </button>
                    ) : link.href.startsWith('/') ? (
                      <Link href={link.href}>
                        <span className="hover:text-white transition-colors" data-testid={`link-footer-${sectionIndex}-${linkIndex}`}>
                          {link.label}
                        </span>
                      </Link>
                    ) : (
                      <a 
                        href={link.href} 
                        className="hover:text-white transition-colors"
                        data-testid={`link-footer-${sectionIndex}-${linkIndex}`}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div data-testid="text-footer-copyright">
            © 2024 AutoŻaba. Wszystkie prawa zastrzeżone.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {legalLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                className="hover:text-white transition-colors"
                data-testid={`link-footer-legal-${index}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        
        {/* Final CTA Section */}
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 text-center mt-12 space-y-6">
          <h2 className="text-2xl lg:text-3xl font-bold" data-testid="text-footer-cta-title">
            Odzyskaj kontrolę nad swoim czasem
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto" data-testid="text-footer-cta-description">
            Dołącz do franczyzobiorców, którzy już nie boją się kontroli PIP 
            i mają czas dla rodziny. Zacznij 14-dniowy trial za darmo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <button 
              onClick={() => window.open('https://app.autozaba.pl/trial', '_blank')}
              className="bg-white text-primary px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              data-testid="button-footer-trial"
            >
              Rozpocznij 14-dniowy trial
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium"
              data-testid="button-footer-demo"
            >
              Umów prezentację
            </button>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-sm opacity-80">
            <div className="flex items-center" data-testid="feature-footer-compliance">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>100% zgodność z prawem</span>
            </div>
            <div className="flex items-center" data-testid="feature-footer-support">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364" />
              </svg>
              <span>Wsparcie w języku polskim</span>
            </div>
            <div className="flex items-center" data-testid="feature-footer-cancel">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Anuluj w każdej chwili</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
