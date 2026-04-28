import type {
  LanguageCode,
  ResolvedLanguage,
  TranslationDirection,
} from "@/types/translation";

export const languageOptions: Array<{ value: LanguageCode; label: string }> = [
  { value: "auto", label: "Auto detect" },
  { value: "ar", label: "Arabic" },
  { value: "en", label: "English" },
];

export const languageLabels: Record<ResolvedLanguage, string> = {
  ar: "Arabic",
  en: "English",
};

const arabicPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

export function detectLanguageFromText(text: string): ResolvedLanguage {
  return arabicPattern.test(text) ? "ar" : "en";
}

export function getDirectionFromLanguage(language: LanguageCode): "rtl" | "ltr" {
  return language === "ar" ? "rtl" : "ltr";
}

export function getResolvedInputLanguage(
  language: LanguageCode,
  text: string,
): ResolvedLanguage {
  if (language === "auto") {
    return detectLanguageFromText(text);
  }

  return language;
}

export function getDirectionLabel(source: ResolvedLanguage, target: ResolvedLanguage) {
  return `${languageLabels[source]} to ${languageLabels[target]}`;
}

export function directionToLanguages(direction: TranslationDirection) {
  return direction === "ar-to-en"
    ? { source: "ar" as const, target: "en" as const }
    : { source: "en" as const, target: "ar" as const };
}

export function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}
