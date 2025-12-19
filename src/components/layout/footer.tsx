"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { APP_URLS } from "@/lib/config";
import { motion } from "framer-motion";

export default function Footer() {
  const footerSections = [
    {
      title: "Zasoby",
      links: [{ label: "Blog", href: "/blog" }],
    },
    {
      title: "Pomoc",
      links: [
        { label: "Tutoriale", href: "/tutoriale" },
        { label: "Żabouczek", href: "/onboarding" },
        { label: "Wsparcie techniczne", href: "/kontakt" },
        // { label: "Formularz DSA", href: "https://docs.google.com/forms/d/e/1FAIpQLSdPLQ9Eap18ISm1OMXnepPTA5iBVHy_0wG1y_H-Wts4caD8BQ/viewform?pli=1" }, // Updated per request logic but cleaner to just have it in the array. Wait, user said generic DSA form? "Klikając 'Formularz DSA' chciałbym abyśmy otwierali nowy tab". 
        // Current href is https://forms.gle/1bwP5z2WFdsrkT55A. I will keep the href but ensure it opens in new tab.
        { label: "Formularz DSA", href: "https://forms.gle/1bwP5z2WFdsrkT55A", target: "_blank" },
        { label: "Zgłoś sugestię", href: "https://docs.google.com/forms/d/e/1FAIpQLSdPLQ9Eap18ISm1OMXnepPTA5iBVHy_0wG1y_H-Wts4caD8BQ/viewform?pli=1", target: "_blank" },
      ],
    },
    {
      title: "Kontakt",
      links: [
        {
          label: "autozaba@ainything.pl",
          href: "mailto:autozaba@ainything.pl",
        },
      ],
    },
  ];

  const legalLinks = [
    {
      label: "Polityka prywatności",
      href: "/polityka-prywatnosci",
      type: "route" as const,
    },
    {
      label: "Regulamin",
      href: "/Regulamin_Serwisu_Autozaba.pdf",
      type: "asset" as const,
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLinkClick = (href: string) => {
    if (href.startsWith("#")) {
      scrollToSection(href);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="bg-muted text-foreground py-12 dark:bg-slate-950 dark:text-slate-100">
      <div className="container-spacing space-y-8">
        <motion.div
          className="grid gap-10 md:grid-cols-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {/* Brand */}
          <motion.div className="space-y-4 md:col-span-2" variants={itemVariants}>
            <Link href="/">
              <div
                className="flex items-center space-x-2"
                data-testid="link-footer-logo"
              >
                <Image
                  src="/illustrations/logo_xcolor64x64.png"
                  alt="AutoŻaba - Cyfrowy Pomocnik Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 dark:hidden"
                />
                <Image
                  src="https://autozaba-app-storage.fra1.cdn.digitaloceanspaces.com/prod/logo64x64.png"
                  alt="AutoŻaba - Cyfrowy Pomocnik Logo"
                  width={32}
                  height={32}
                  className="hidden h-8 w-8 dark:block"
                />
                <span className="text-xl font-bold text-foreground">
                  AutoŻaba
                </span>
              </div>
            </Link>
            <p
              className="text-muted-foreground"
              data-testid="text-footer-description"
            >
              Automatyczna tarcza prawna dla franczyzobiorców Żabki. Zarządzaj
              zespołem, nie ryzykiem.
            </p>
          </motion.div>

          {/* Desktop footer columns */}
          <div className="hidden md:grid md:col-span-3 grid-cols-3 gap-8">
            {footerSections.map((section, sectionIndex) => (
              <motion.div key={sectionIndex} className="space-y-4" variants={itemVariants}>
                <h3
                  className="font-semibold text-foreground"
                  data-testid={`text-footer-section-${sectionIndex}`}
                >
                  {section.title}
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.href.startsWith("#") ? (
                        <button
                          onClick={() => handleLinkClick(link.href)}
                          className="footer-link hover:text-foreground transition-colors text-left"
                          data-testid={`link-footer-${sectionIndex}-${linkIndex}`}
                        >
                          {link.label}
                        </button>
                      ) : link.href.startsWith("/") ? (
                        <Link href={link.href}>
                          <span
                            className="footer-link hover:text-foreground transition-colors"
                            data-testid={`link-footer-${sectionIndex}-${linkIndex}`}
                          >
                            {link.label}
                          </span>
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          target={(link as any).target || undefined}
                          rel={(link as any).target === "_blank" ? "noopener noreferrer" : undefined}
                          className="footer-link hover:text-foreground transition-colors"
                          data-testid={`link-footer-${sectionIndex}-${linkIndex}`}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Mobile accordions */}
          <div className="md:hidden space-y-4">
            {footerSections.map((section, sectionIndex) => (
              <details
                key={sectionIndex}
                className="rounded-xl border border-border/60 bg-white/40 dark:bg-white/5 dark:border-white/12 p-4"
                data-testid={`text-footer-section-${sectionIndex}`}
              >
                <summary className="flex items-center justify-between font-semibold text-foreground">
                  {section.title}
                  <span className="text-lg" aria-hidden="true">
                    +
                  </span>
                </summary>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.href.startsWith("#") ? (
                        <button
                          onClick={() => handleLinkClick(link.href)}
                          className="footer-link hover:text-foreground transition-colors text-left"
                          data-testid={`link-footer-${sectionIndex}-${linkIndex}`}
                        >
                          {link.label}
                        </button>
                      ) : link.href.startsWith("/") ? (
                        <Link href={link.href}>
                          <span
                            className="footer-link hover:text-foreground transition-colors"
                            data-testid={`link-footer-${sectionIndex}-${linkIndex}`}
                          >
                            {link.label}
                          </span>
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          target={(link as any).target || undefined}
                          rel={(link as any).target === "_blank" ? "noopener noreferrer" : undefined}
                          className="footer-link hover:text-foreground transition-colors"
                          data-testid={`link-footer-${sectionIndex}-${linkIndex}`}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </motion.div>

        <hr className="border-border/60 dark:border-white/5" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-muted-foreground text-sm">
          <div data-testid="text-footer-copyright">
            © 2024 AutoŻaba. Wszystkie prawa zastrzeżone.
          </div>
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((link, index) => {
              if (link.type === "route") {
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className="footer-link hover:text-foreground transition-colors"
                    data-testid={`link-footer-legal-${index}`}
                  >
                    {link.label}
                  </Link>
                );
              }

              if (link.type === "asset") {
                return (
                  <a
                    key={index}
                    href={link.href}
                    className="footer-link hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noreferrer"
                    data-testid={`link-footer-legal-${index}`}
                  >
                    {link.label}
                  </a>
                );
              }

              return null;
            })}
          </div>
        </div>

        {/* Final CTA Section */}
        <motion.div
          className="bg-primary text-primary-foreground rounded-2xl p-8 text-center space-y-6 shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-2xl lg:text-3xl font-bold text-primary-foreground"
            data-testid="text-footer-cta-title"
          >
            Odzyskaj kontrolę nad swoim czasem
          </h2>
          <p
            className="text-lg opacity-90 max-w-2xl mx-auto"
            data-testid="text-footer-cta-description"
          >
            Dołącz do franczyzobiorców, którzy już nie boją się kontroli PIP i
            mają czas dla rodziny. Zacznij 14-dniowy trial za darmo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button
              size="touch"
              className="bg-white text-primary dark:text-primary-foreground px-6 hover:bg-gray-100 transition-colors font-semibold rounded-lg"
              onClick={() => window.open(APP_URLS.register, "_blank")}
              data-testid="button-footer-trial"
            >
              Rozpocznij 14-dniowy trial
            </Button>
            <Button
              size="touch"
              variant="outline"
              className="border border-white/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 transition-colors font-medium rounded-lg"
              onClick={() => (window.location.href = "/kontakt")}
              data-testid="button-footer-demo"
            >
              Umów prezentację
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm opacity-80">
            <div
              className="flex items-center"
              data-testid="feature-footer-compliance"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>100% zgodność z prawem</span>
            </div>
            <div
              className="flex items-center"
              data-testid="feature-footer-support"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364"
                />
              </svg>
              <span>Wsparcie w języku polskim</span>
            </div>
            <div
              className="flex items-center"
              data-testid="feature-footer-cancel"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>Anuluj w każdej chwili</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
