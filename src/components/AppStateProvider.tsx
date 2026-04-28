"use client";

import * as React from "react";
import type {
  ThemePreference,
  TranslationDirection,
  TranslationHistoryItem,
} from "@/types/translation";

interface ToastItem {
  id: string;
  title: string;
  tone?: "default" | "error";
}

interface AppStateContextValue {
  isReady: boolean;
  history: TranslationHistoryItem[];
  defaultDirection: TranslationDirection;
  addHistoryItem: (item: TranslationHistoryItem) => void;
  deleteHistoryItem: (id: string) => void;
  clearHistory: () => void;
  setDefaultDirection: (direction: TranslationDirection) => void;
  toasts: ToastItem[];
  pushToast: (title: string, tone?: ToastItem["tone"]) => void;
  dismissToast: (id: string) => void;
}

const HISTORY_KEY = "arabeng-history";
const DEFAULT_DIRECTION_KEY = "arabeng-default-direction";

const AppStateContext = React.createContext<AppStateContextValue | null>(null);

function isDirection(value: string): value is TranslationDirection {
  return value === "ar-to-en" || value === "en-to-ar";
}

function isHistoryItem(value: unknown): value is TranslationHistoryItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.sourceText === "string" &&
    typeof item.translatedText === "string" &&
    (item.sourceLanguage === "ar" || item.sourceLanguage === "en") &&
    (item.targetLanguage === "ar" || item.targetLanguage === "en") &&
    typeof item.timestamp === "string"
  );
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = React.useState(false);
  const [history, setHistory] = React.useState<TranslationHistoryItem[]>([]);
  const [defaultDirection, setDefaultDirectionState] =
    React.useState<TranslationDirection>("ar-to-en");
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  React.useEffect(() => {
    const savedDirection = window.localStorage.getItem(DEFAULT_DIRECTION_KEY);
    if (savedDirection && isDirection(savedDirection)) {
      setDefaultDirectionState(savedDirection);
    }

    const savedHistory = window.localStorage.getItem(HISTORY_KEY);
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory) as unknown[];
        setHistory(parsed.filter(isHistoryItem));
      } catch {
        window.localStorage.removeItem(HISTORY_KEY);
      }
    }

    setIsReady(true);
  }, []);

  React.useEffect(() => {
    if (!isReady) {
      return;
    }

    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history, isReady]);

  React.useEffect(() => {
    if (!isReady) {
      return;
    }

    window.localStorage.setItem(DEFAULT_DIRECTION_KEY, defaultDirection);
  }, [defaultDirection, isReady]);

  React.useEffect(() => {
    if (!toasts.length) {
      return;
    }

    const timers = toasts.map((toast) =>
      window.setTimeout(() => {
        setToasts((current) => current.filter((item) => item.id !== toast.id));
      }, 2600),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [toasts]);

  const addHistoryItem = React.useCallback((item: TranslationHistoryItem) => {
    setHistory((current) => [item, ...current].slice(0, 25));
  }, []);

  const deleteHistoryItem = React.useCallback((id: string) => {
    setHistory((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearHistory = React.useCallback(() => {
    setHistory([]);
  }, []);

  const setDefaultDirection = React.useCallback((direction: TranslationDirection) => {
    setDefaultDirectionState(direction);
  }, []);

  const pushToast = React.useCallback(
    (title: string, tone: ToastItem["tone"] = "default") => {
      setToasts((current) => [
        ...current,
        { id: crypto.randomUUID(), title, tone },
      ]);
    },
    [],
  );

  const dismissToast = React.useCallback((id: string) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        isReady,
        history,
        defaultDirection,
        addHistoryItem,
        deleteHistoryItem,
        clearHistory,
        setDefaultDirection,
        toasts,
        pushToast,
        dismissToast,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = React.useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }

  return context;
}
