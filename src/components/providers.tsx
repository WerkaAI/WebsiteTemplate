"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { ConsentProvider } from "@/components/cookies/consent-provider";

export function Providers({ children, nonce }: { children: React.ReactNode; nonce?: string }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      storageKey="website-template-theme"
      enableSystem={false}
      disableTransitionOnChange
      nonce={nonce}
    >
      <ConsentProvider>
        <TooltipProvider>
          <Toaster />
          {children}
        </TooltipProvider>
      </ConsentProvider>
    </ThemeProvider>
  );
}