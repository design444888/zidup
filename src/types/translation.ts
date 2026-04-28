export type ThemePreference = "light" | "dark" | "system";
export type LanguageCode = "auto" | "ar" | "en";
export type ResolvedLanguage = "ar" | "en";
export type TranslationDirection = "ar-to-en" | "en-to-ar";

export interface TranslationHistoryItem {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLanguage: ResolvedLanguage;
  targetLanguage: ResolvedLanguage;
  timestamp: string;
}

export interface TranslationResponse {
  translatedText: string;
  detectedSourceLanguage: ResolvedLanguage;
  provider: "mock";
}
