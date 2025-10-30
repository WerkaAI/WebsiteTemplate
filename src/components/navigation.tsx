"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const isFunctionsRoute = pathname.startsWith("/funkcje");
  const isPricingRoute = pathname.startsWith("/cennik");
  const isBlogRoute = pathname.startsWith("/blog");
  const isTutorialRoute = pathname.startsWith("/tutoriale");
  const isContactRoute = pathname.startsWith("/kontakt");
  const showScrollProgress = isLanding;

  useEffect(() => {
    const updateScrollState = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setIsScrolled(scrollTop > 12);
      if (docHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      setScrollProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isLanding) {
      return;
    }

    const hash = window.location.hash.replace("#", "");
    if (!hash) {
      return;
    }

    const element = document.getElementById(hash);
    if (!element) {
      return;
    }

    requestAnimationFrame(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [isLanding]);

  return (
    <nav
      role="navigation"
      aria-label="Główna nawigacja"
      className={`sticky top-0 z-50 border-b transition-all duration-300 motion-ease-in-out ${
        isScrolled
          ? "bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl shadow-[0_12px_35px_-18px_rgba(15,23,42,0.55)] border-border/70 dark:border-white/12"
          : "bg-white/90 dark:bg-slate-900/80 backdrop-blur-lg border-transparent"
      }`}
      data-nav-state={isScrolled ? "scrolled" : "top"}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 right-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 transition-transform duration-300 motion-ease-out",
          !showScrollProgress && "opacity-0"
        )}
        style={{ transform: `scaleX(${scrollProgress / 100 || 0})` }}
      />
      <div className="container-spacing">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2" data-testid="link-logo">
              <Image
                src="/illustrations/logo_xcolor64x64.png"
                alt="AutoŻaba logo"
                width={32}
                height={32}
                className="h-8 w-8 dark:hidden"
                priority
              />
              <Image
                src="https://autozaba-app-storage.fra1.cdn.digitaloceanspaces.com/prod/logo64x64.png"
                alt="AutoŻaba logo"
                width={32}
                height={32}
                className="hidden h-8 w-8 dark:block"
                priority
              />
              <span className="text-xl font-bold text-foreground">AutoŻaba</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <Link
                href="/funkcje"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isFunctionsRoute ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                data-testid="link-nav-funkcje"
              >
                Funkcje
              </Link>
              <Link
                href="/cennik"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isPricingRoute ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                data-testid="link-nav-cennik"
              >
                Cennik
              </Link>
              <Link
                href="/blog"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isBlogRoute ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                data-testid="link-nav-blog"
              >
                Blog
              </Link>
              <Link
                href="/tutoriale"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isTutorialRoute ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                data-testid="link-nav-tutoriale"
              >
                Tutoriale
              </Link>
              <Link
                href="/kontakt"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isContactRoute ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                data-testid="link-nav-kontakt"
              >
                Kontakt
              </Link>
            </div>
            <span className="hidden lg:block h-5 w-px bg-border/60" aria-hidden="true" />
            <ThemeToggle />
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              size="touch"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-login-desktop"
            >
              <Link href="https://app.autozaba.pl" target="_blank" rel="noreferrer">
                Zaloguj
              </Link>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3 md:hidden">
            <Button
              asChild
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-3 min-w-[96px] justify-center flex-shrink-0 whitespace-nowrap"
              data-testid="button-login-mobile-inline"
            >
              <Link href="https://app.autozaba.pl" target="_blank" rel="noreferrer">
                Zaloguj
              </Link>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="touchIcon"
                  aria-label="Otwórz menu"
                  aria-expanded={isOpen}
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
            <SheetContent side="right" className="w-[280px] xs:w-[300px] sm:w-[360px]">
              <div className="flex flex-col space-y-6 mt-8">
                <Link
                  href="/funkcje"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors",
                    isFunctionsRoute ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                  data-testid="link-mobile-funkcje"
                >
                  Funkcje
                </Link>
                <Link
                  href="/cennik"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors",
                    isPricingRoute ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                  data-testid="link-mobile-cennik"
                >
                  Cennik
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors",
                    isBlogRoute ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                  data-testid="link-mobile-blog"
                >
                  Blog
                </Link>
                <Link
                  href="/tutoriale"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors",
                    isTutorialRoute ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                  data-testid="link-mobile-tutoriale"
                >
                  Tutoriale
                </Link>
                <Link
                  href="/kontakt"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors",
                    isContactRoute ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                  data-testid="link-mobile-kontakt"
                >
                  Kontakt
                </Link>
                <div className="pt-2">
                  <ThemeToggle />
                </div>
                <Button
                  asChild
                  size="touch"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6"
                  data-testid="button-login-mobile"
                >
                  <Link href="https://app.autozaba.pl" target="_blank" rel="noreferrer">
                    Zaloguj
                  </Link>
                </Button>
              </div>
            </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
