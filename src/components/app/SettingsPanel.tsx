"use client";

import { Paintbrush, Trash2 } from "lucide-react";
import { useAppState } from "@/components/AppStateProvider";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/Button";
import type { ThemePreference, TranslationDirection } from "@/types/translation";

const themeOptions: Array<{ value: ThemePreference; label: string }> = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

const directionOptions: Array<{ value: TranslationDirection; label: string }> = [
  { value: "ar-to-en", label: "Arabic to English" },
  { value: "en-to-ar", label: "English to Arabic" },
];

function SettingsSkeleton() {
  return (
    <div className="card-grid md:grid-cols-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="rounded-[1.75rem] border border-border/70 bg-card/72 p-6"
        >
          <div className="skeleton mb-4 h-5 w-1/3 rounded-full" />
          <div className="skeleton mb-3 h-11 w-full rounded-2xl" />
          <div className="skeleton h-11 w-full rounded-2xl" />
        </div>
      ))}
    </div>
  );
}

export function SettingsPanel() {
  const { clearHistory, defaultDirection, isReady, pushToast, setDefaultDirection } =
    useAppState();
  const { isReady: themeReady, resolvedTheme, setThemePreference, themePreference } =
    useTheme();

  if (!isReady || !themeReady) {
    return <SettingsSkeleton />;
  }

  return (
    <div className="card-grid md:grid-cols-2">
      <section className="rounded-[1.75rem] border border-border/70 bg-card/72 p-6 shadow-[0_24px_60px_-36px_rgba(6,18,33,0.24)] backdrop-blur-xl">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            <Paintbrush className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Theme</h2>
            <p className="text-sm text-muted-foreground">
              Current appearance: {resolvedTheme}
            </p>
          </div>
        </div>
        <div className="grid gap-3">
          {themeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setThemePreference(option.value)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                themePreference === option.value
                  ? "border-primary/30 bg-primary-soft text-primary"
                  : "border-border/70 bg-background/70 text-foreground hover:border-primary/25"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-border/70 bg-card/72 p-6 shadow-[0_24px_60px_-36px_rgba(6,18,33,0.24)] backdrop-blur-xl">
        <h2 className="text-lg font-semibold">Default translation direction</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          New translation sessions will start with this direction selected.
        </p>
        <div className="mt-5 grid gap-3">
          {directionOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setDefaultDirection(option.value)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                defaultDirection === option.value
                  ? "border-primary/30 bg-primary-soft text-primary"
                  : "border-border/70 bg-background/70 text-foreground hover:border-primary/25"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-border/70 bg-card/72 p-6 shadow-[0_24px_60px_-36px_rgba(6,18,33,0.24)] backdrop-blur-xl md:col-span-2">
        <h2 className="text-lg font-semibold">Saved history</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Remove all locally stored translations from this browser.
        </p>
        <Button
          variant="outline"
          className="mt-5 rounded-2xl text-red-500 hover:bg-red-500/10 hover:text-red-500"
          onClick={() => {
            clearHistory();
            pushToast("Saved history cleared.");
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear all saved history
        </Button>
      </section>
    </div>
  );
}
