"use client";

import * as React from "react";
import {
  ArrowRightLeft,
  Clipboard,
  Eraser,
  Languages,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useAppState } from "@/components/AppStateProvider";
import {
  directionToLanguages,
  formatCount,
  getDirectionLabel,
  getDirectionFromLanguage,
  getResolvedInputLanguage,
  languageLabels,
  languageOptions,
} from "@/lib/translation";
import type {
  LanguageCode,
  ResolvedLanguage,
  TranslationHistoryItem,
  TranslationResponse,
} from "@/types/translation";

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ label: string; value: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-foreground">
      <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full rounded-2xl pr-10 pl-4"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Languages className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </label>
  );
}

function OutputSkeleton() {
  return (
    <div className="grid gap-3">
      <div className="skeleton h-5 w-3/4 rounded-full" />
      <div className="skeleton h-5 w-full rounded-full" />
      <div className="skeleton h-5 w-5/6 rounded-full" />
      <div className="skeleton h-5 w-2/3 rounded-full" />
    </div>
  );
}

export function TranslateWorkspace() {
  const {
    addHistoryItem,
    defaultDirection,
    isReady,
    pushToast,
  } = useAppState();
  const [sourceText, setSourceText] = React.useState("");
  const [translatedText, setTranslatedText] = React.useState("");
  const [sourceLanguage, setSourceLanguage] =
    React.useState<LanguageCode>("auto");
  const [targetLanguage, setTargetLanguage] =
    React.useState<ResolvedLanguage>("en");
  const [detectedSourceLanguage, setDetectedSourceLanguage] =
    React.useState<ResolvedLanguage>("en");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const hasAppliedDefaults = React.useRef(false);

  React.useEffect(() => {
    if (!isReady || hasAppliedDefaults.current) {
      return;
    }

    const defaults = directionToLanguages(defaultDirection);
    setSourceLanguage(defaults.source);
    setTargetLanguage(defaults.target);
    setDetectedSourceLanguage(defaults.source);
    hasAppliedDefaults.current = true;
  }, [defaultDirection, isReady]);

  const inputLanguage = getResolvedInputLanguage(sourceLanguage, sourceText);
  const inputDirection = getDirectionFromLanguage(inputLanguage);
  const outputDirection = getDirectionFromLanguage(targetLanguage);

  const requestTranslation = React.useCallback(async () => {
    const trimmedSource = sourceText.trim();

    if (!trimmedSource) {
      setError("Enter some text to translate.");
      pushToast("Enter some text to translate.", "error");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: trimmedSource,
          sourceLanguage,
          targetLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error("Translation request failed.");
      }

      const data = (await response.json()) as TranslationResponse;
      setTranslatedText(data.translatedText);
      setDetectedSourceLanguage(data.detectedSourceLanguage);

      const historyItem: TranslationHistoryItem = {
        id: crypto.randomUUID(),
        sourceText: trimmedSource,
        translatedText: data.translatedText,
        sourceLanguage: data.detectedSourceLanguage,
        targetLanguage,
        timestamp: new Date().toISOString(),
      };

      addHistoryItem(historyItem);
      pushToast("Translation saved to history.");
    } catch {
      setError("Translation failed. Please try again.");
      pushToast("Translation failed. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  }, [addHistoryItem, pushToast, sourceLanguage, sourceText, targetLanguage]);

  const handleSwap = React.useCallback(() => {
    const nextSourceLanguage = targetLanguage;
    const nextTargetLanguage =
      sourceLanguage === "auto" ? detectedSourceLanguage : sourceLanguage;

    setSourceLanguage(nextSourceLanguage);
    setTargetLanguage(nextTargetLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
    setError("");
  }, [detectedSourceLanguage, sourceLanguage, sourceText, targetLanguage, translatedText]);

  const handleClear = React.useCallback(() => {
    setSourceText("");
    setTranslatedText("");
    setError("");
  }, []);

  const handleCopy = React.useCallback(async () => {
    if (!translatedText.trim()) {
      pushToast("Nothing to copy yet.", "error");
      return;
    }

    try {
      await navigator.clipboard.writeText(translatedText);
      pushToast("Translation copied.");
    } catch {
      pushToast("Copy failed.", "error");
    }
  }, [pushToast, translatedText]);

  const targetOptions = languageOptions.filter((option) => option.value !== "auto");

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Translation workspace
          </span>
          <h1 className="heading-md">Translate with the right reading direction</h1>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            Use the mock translation endpoint now, then connect your real API key
            later in the route handler without changing the UI.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-border/70 bg-card/70 px-4 py-3 text-sm text-muted-foreground shadow-[0_20px_50px_-34px_rgba(6,18,33,0.3)] backdrop-blur-xl">
          {getDirectionLabel(inputLanguage, targetLanguage)}
        </div>
      </div>

      <div className="rounded-[2rem] border border-border/70 bg-card/72 p-4 shadow-[0_30px_80px_-44px_rgba(6,18,33,0.38)] backdrop-blur-xl sm:p-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="grid flex-1 gap-4 sm:grid-cols-[1fr_auto_1fr]">
            <SelectField
              label="From"
              value={sourceLanguage}
              options={languageOptions}
              onChange={(value) => setSourceLanguage(value as LanguageCode)}
            />
            <div className="flex items-end justify-center">
              <Button
                type="button"
                variant="secondary"
                onClick={handleSwap}
                className="h-12 gap-2 rounded-2xl px-4"
                aria-label="Swap languages"
              >
                <ArrowRightLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Swap languages</span>
              </Button>
            </div>
            <SelectField
              label="To"
              value={targetLanguage}
              options={targetOptions}
              onChange={(value) => setTargetLanguage(value as ResolvedLanguage)}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={requestTranslation}
              isLoading={isLoading}
              className="rounded-2xl"
            >
              Translate
            </Button>
            <Button onClick={handleClear} variant="outline" className="rounded-2xl">
              <Eraser className="mr-2 h-4 w-4" />
              Clear
            </Button>
            <Button onClick={handleCopy} variant="outline" className="rounded-2xl">
              <Clipboard className="mr-2 h-4 w-4" />
              Copy result
            </Button>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <div className="rounded-[1.75rem] border border-border/70 bg-background/82 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
            <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <span>Input</span>
              <span>{formatCount(sourceText.length)} chars</span>
            </div>
            <textarea
              value={sourceText}
              onChange={(event) => setSourceText(event.target.value)}
              onKeyDown={(event) => {
                if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
                  void requestTranslation();
                }
              }}
              dir={inputDirection}
              lang={inputLanguage}
              placeholder={
                inputLanguage === "ar"
                  ? "اكتب النص هنا"
                  : "Type the text you want to translate"
              }
              className={cn(
                "min-h-[280px] w-full resize-none rounded-[1.25rem] border-0 bg-transparent p-0 text-base leading-8 shadow-none focus:ring-0",
                inputLanguage === "ar" ? "font-arabic text-right" : "text-left",
              )}
            />
            {sourceLanguage === "auto" && sourceText.trim() ? (
              <p className="mt-3 text-xs text-muted-foreground">
                Detected language: {languageLabels[inputLanguage]}
              </p>
            ) : null}
          </div>

          <div className="rounded-[1.75rem] border border-border/70 bg-background/82 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
            <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <span>Result</span>
              <span>{formatCount(translatedText.length)} chars</span>
            </div>
            <div
              dir={outputDirection}
              lang={targetLanguage}
              className={cn(
                "min-h-[280px] rounded-[1.25rem] text-base leading-8",
                targetLanguage === "ar" ? "font-arabic text-right" : "text-left",
              )}
            >
              {isLoading ? (
                <div className="flex min-h-[280px] items-start pt-4">
                  <OutputSkeleton />
                </div>
              ) : translatedText ? (
                translatedText
              ) : (
                <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-[1.5rem] border border-dashed border-border/70 bg-muted/35 px-6 text-center text-muted-foreground">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <p>Translated text will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {error ? (
          <div className="mt-4 rounded-[1.25rem] border border-red-400/24 bg-red-500/10 px-4 py-3 text-sm text-red-200 dark:text-red-100">
            {error}
          </div>
        ) : null}

        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          <span>
            Mock translation is active. Replace the logic in
            <code className="mx-1 rounded bg-muted px-1.5 py-0.5">src/app/api/translate/route.ts</code>
            when you are ready to connect a real translation API.
          </span>
        </div>
      </div>
    </section>
  );
}
