"use client";

import { Clipboard, Trash2 } from "lucide-react";
import { useAppState } from "@/components/AppStateProvider";
import { Button } from "@/components/ui/Button";
import { getDirectionLabel } from "@/lib/translation";

function HistorySkeleton() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="rounded-[1.75rem] border border-border/70 bg-card/72 p-5"
        >
          <div className="skeleton mb-4 h-4 w-1/3 rounded-full" />
          <div className="skeleton mb-3 h-5 w-11/12 rounded-full" />
          <div className="skeleton h-5 w-4/5 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function HistoryList() {
  const { deleteHistoryItem, history, isReady, pushToast } = useAppState();

  const copyText = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      pushToast("Copied translation.");
    } catch {
      pushToast("Copy failed.", "error");
    }
  };

  if (!isReady) {
    return <HistorySkeleton />;
  }

  if (!history.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-border/70 bg-card/60 p-12 text-center text-muted-foreground">
        No saved translations yet. Translate something and it will appear here.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {history.map((item) => (
        <article
          key={item.id}
          className="rounded-[1.75rem] border border-border/70 bg-card/72 p-5 shadow-[0_24px_60px_-36px_rgba(6,18,33,0.24)] backdrop-blur-xl"
        >
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {getDirectionLabel(item.sourceLanguage, item.targetLanguage)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(item.timestamp))}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl"
                onClick={() => void copyText(item.translatedText)}
              >
                <Clipboard className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl text-red-500 hover:bg-red-500/10 hover:text-red-500"
                onClick={() => deleteHistoryItem(item.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[1.25rem] border border-border/60 bg-background/82 p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Original text
              </p>
              <p
                dir={item.sourceLanguage === "ar" ? "rtl" : "ltr"}
                className={item.sourceLanguage === "ar" ? "font-arabic text-right leading-8" : "leading-8"}
              >
                {item.sourceText}
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-border/60 bg-background/82 p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Translated text
              </p>
              <p
                dir={item.targetLanguage === "ar" ? "rtl" : "ltr"}
                className={item.targetLanguage === "ar" ? "font-arabic text-right leading-8" : "leading-8"}
              >
                {item.translatedText}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
