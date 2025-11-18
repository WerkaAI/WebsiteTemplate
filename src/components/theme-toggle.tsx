"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  // Avoid hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="touchIcon"
        className="md:h-10 md:w-10"
        aria-label="Przełącz motyw"
        disabled
        data-testid="button-theme-toggle"
      >
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="touchIcon"
      className="md:h-10 md:w-10"
      aria-label={isDark ? "Przełącz na jasny motyw" : "Przełącz na ciemny motyw"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      data-testid="button-theme-toggle"
    >
      <Sun className="h-5 w-5 dark:hidden" />
      <Moon className="h-5 w-5 hidden dark:block" />
    </Button>
  );
}
