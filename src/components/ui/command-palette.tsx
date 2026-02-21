"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, FileText, Home, CreditCard, Mail, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[20vh]">
      <div className="fixed inset-0" onClick={() => setOpen(false)} />
      <Command
        className="relative z-50 w-full max-w-lg rounded-xl border border-white/10 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-2xl overflow-hidden"
        shouldFilter={true}
      >
        <div className="flex items-center border-b border-slate-200 dark:border-white/10 px-3">
          <Search className="mr-2 h-5 w-5 shrink-0 text-slate-500" />
          <Command.Input
            autoFocus
            placeholder="Wpisz polecenie lub szukaj..."
            className="flex h-14 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 text-slate-900 dark:text-white"
          />
        </div>
        <Command.List className="max-h-[300px] overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-slate-500">
            Brak wyników.
          </Command.Empty>

          <Command.Group heading="Nawigacja" className="text-xs font-medium text-slate-500 dark:text-slate-400 px-2 py-1.5">
            <Command.Item
              onSelect={() => runCommand(() => router.push("/"))}
              className="flex cursor-pointer items-center rounded-md px-2 py-2.5 text-sm text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 aria-selected:bg-slate-100 dark:aria-selected:bg-white/10"
            >
              <Home className="mr-2 h-4 w-4" />
              Strona Główna
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push("/cennik"))}
              className="flex cursor-pointer items-center rounded-md px-2 py-2.5 text-sm text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 aria-selected:bg-slate-100 dark:aria-selected:bg-white/10"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Cennik
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push("/blog"))}
              className="flex cursor-pointer items-center rounded-md px-2 py-2.5 text-sm text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 aria-selected:bg-slate-100 dark:aria-selected:bg-white/10"
            >
              <FileText className="mr-2 h-4 w-4" />
              Blog
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push("/kontakt"))}
              className="flex cursor-pointer items-center rounded-md px-2 py-2.5 text-sm text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 aria-selected:bg-slate-100 dark:aria-selected:bg-white/10"
            >
              <Mail className="mr-2 h-4 w-4" />
              Kontakt
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Akcje" className="text-xs font-medium text-slate-500 dark:text-slate-400 px-2 py-1.5 mt-2">
            <Command.Item
              onSelect={() => runCommand(() => setTheme("light"))}
              className="flex cursor-pointer items-center rounded-md px-2 py-2.5 text-sm text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 aria-selected:bg-slate-100 dark:aria-selected:bg-white/10"
            >
              <Sun className="mr-2 h-4 w-4" />
              Jasny motyw
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => setTheme("dark"))}
              className="flex cursor-pointer items-center rounded-md px-2 py-2.5 text-sm text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 aria-selected:bg-slate-100 dark:aria-selected:bg-white/10"
            >
              <Moon className="mr-2 h-4 w-4" />
              Ciemny motyw
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
