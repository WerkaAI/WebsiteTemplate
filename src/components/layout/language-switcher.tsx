"use client";

import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const locale = pathname.startsWith("/en") ? "en" : "pl";
  const label = locale === "pl" ? "Zmień język" : "Switch language";

  const nextLocale = locale === "pl" ? "en" : "pl";
  const localizedPath = pathname.replace(/^\/(pl|en)(?=\/|$)/, "") || "/";

  const switchLanguage = () => {
    router.push(`/${nextLocale}${localizedPath}`);
  };

  return (
    <Button variant="ghost" size="sm" className="gap-2" aria-label={label} onClick={switchLanguage}>
      <Globe className="h-4 w-4" />
      <span className="font-medium">{locale.toUpperCase()}</span>
    </Button>
  );
}