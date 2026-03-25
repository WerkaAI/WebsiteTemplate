"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring } from "framer-motion";
import { BOOKING_URL } from "@/lib/config";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en' : 'pl';
  const navText = locale === 'en'
    ? {
      aria: 'Main navigation',
      about: 'About',
      services: 'Services',
      reviews: 'Reviews',
      faq: 'FAQ',
      contact: 'Contact',
      book: 'Book a visit',
      call: 'Call',
      openMenu: 'Open menu'
    }
    : {
      aria: 'Główna nawigacja',
      about: 'O mnie',
      services: 'Usługi',
      reviews: 'Opinie',
      faq: 'FAQ',
      contact: 'Kontakt',
      book: 'Umów wizytę',
      call: 'Zadzwoń',
      openMenu: 'Otwórz menu'
    };
  const isLanding = pathname === `/${locale}`;
  const showScrollProgress = true;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const SCROLL_THRESHOLD = 12;
    const HIDE_THRESHOLD = 300;

    const updateScrollState = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > SCROLL_THRESHOLD);

      // Show nav when scrolling up, hide when scrolling down (after hero)
      if (scrollTop > HIDE_THRESHOLD) {
        setIsHidden(scrollTop > lastScrollY);
      } else {
        setIsHidden(false);
      }
      lastScrollY = scrollTop;
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
    <motion.nav
      initial={false}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      role="navigation"
      aria-label={navText.aria}
      className={`sticky top-0 z-50 border-b transition-all duration-300 motion-ease-in-out ${isHidden
        ? "-translate-y-full"
        : "translate-y-0"
        } ${isScrolled
        ? "bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl shadow-[0_12px_35px_-18px_rgba(15,23,42,0.55)] border-border/70 dark:border-white/12"
        : "bg-white/90 dark:bg-slate-900/80 backdrop-blur-lg border-transparent"
        }`}
      data-nav-state={isScrolled ? "scrolled" : "top"}
    >
      <motion.span
        aria-hidden="true"
        className={cn(
          "absolute left-0 right-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-primary via-secondary to-primary",
          !showScrollProgress && "opacity-0"
        )}
        style={{ scaleX }}
      />
      <div className="container-spacing">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${locale}`}>
            <div
              className="flex items-center space-x-2"
              data-testid="link-logo"
            >
              <span className="text-xl font-bold text-foreground tracking-tight">
                Fizjoterapia<span className="text-primary">Wrocław</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <Link
                href={`/${locale}/#o-mnie`}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {navText.about}
              </Link>
              <Link
                href={`/${locale}/#uslugi`}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {navText.services}
              </Link>
              <Link
                href={`/${locale}/#opinie`}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {navText.reviews}
              </Link>
              <Link
                href={`/${locale}/#faq`}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {navText.faq}
              </Link>
              <Link
                href={`/${locale}/#kontakt`}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {navText.contact}
              </Link>
            </div>
            <span
              className="hidden lg:block h-5 w-px bg-border/60"
              aria-hidden="true"
            />
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+48532445410" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <Phone className="h-4 w-4" />
              532 445 410
            </a>
            <Button
              asChild
              size="touch"
              variant="conversion"
              className="rounded-full"
            >
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${navText.book} — otwiera ZnanyLekarz w nowej karcie`}
              >
                {navText.book}
              </a>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3 md:hidden">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="px-3 min-w-[40px] justify-center flex-shrink-0"
            >
              <a href="tel:+48532445410" aria-label={navText.call}>
                <Phone className="h-4 w-4" />
              </a>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="touchIcon"
                  aria-label={navText.openMenu}
                  aria-expanded={isOpen}
                >
                  <Menu className="h-7 w-7" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] xs:w-[300px] sm:w-[360px]"
              >
                <SheetHeader className="sr-only">
                  <SheetTitle>{navText.aria}</SheetTitle>
                  <SheetDescription>
                    {locale === "en"
                      ? "Mobile navigation menu"
                      : "Mobilne menu nawigacyjne"}
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col space-y-6 mt-8">
                  <Link
                    href={`/${locale}/#o-mnie`}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {navText.about}
                  </Link>
                  <Link
                    href={`/${locale}/#uslugi`}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {navText.services}
                  </Link>
                  <Link
                    href={`/${locale}/#opinie`}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {navText.reviews}
                  </Link>
                  <Link
                    href={`/${locale}/#faq`}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {navText.faq}
                  </Link>
                  <Link
                    href={`/${locale}/#kontakt`}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {navText.contact}
                  </Link>
                  <div className="pt-2 flex items-center gap-4">
                    <LanguageSwitcher />
                    <ThemeToggle />
                  </div>
                  <Button
                    asChild
                    size="touch"
                    variant="conversion"
                    className="rounded-full mt-6"
                  >
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${navText.book} — otwiera ZnanyLekarz w nowej karcie`}
                    >
                      {navText.book}
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
