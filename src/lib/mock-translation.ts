import type { ResolvedLanguage, TranslationResponse } from "@/types/translation";
import { detectLanguageFromText } from "@/lib/translation";

const arabicToEnglishDictionary: Record<string, string> = {
  مرحبا: "hello",
  شكرا: "thank you",
  مساء: "evening",
  صباح: "morning",
  نعم: "yes",
  لا: "no",
  ترجمة: "translation",
  سريعة: "fast",
  احترافية: "professional",
  رسالة: "message",
  أعمال: "business",
  محتوى: "content",
};

const englishToArabicDictionary: Record<string, string> = {
  hello: "مرحبا",
  thanks: "شكرا",
  thank: "شكرا",
  translation: "ترجمة",
  fast: "سريع",
  professional: "احترافي",
  business: "أعمال",
  message: "رسالة",
  content: "محتوى",
  instant: "فوري",
  clean: "نظيف",
};

function mapWords(
  text: string,
  dictionary: Record<string, string>,
  fallback: (value: string) => string,
) {
  return text
    .split(/(\s+)/)
    .map((segment) => {
      const normalized = segment.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
      if (!normalized) {
        return segment;
      }

      const translated = dictionary[normalized];
      return translated ? segment.replace(normalized, translated) : fallback(segment);
    })
    .join("");
}

function stylizeArabic(text: string) {
  return `ترجمة تجريبية: ${text}`;
}

function stylizeEnglish(text: string) {
  return `Mock translation: ${text}`;
}

export async function mockTranslate(
  text: string,
  sourceLanguage: ResolvedLanguage | "auto",
  targetLanguage: ResolvedLanguage,
): Promise<TranslationResponse> {
  const detectedSourceLanguage =
    sourceLanguage === "auto" ? detectLanguageFromText(text) : sourceLanguage;

  const normalized = text.trim();

  await new Promise((resolve) => setTimeout(resolve, 700));

  if (!normalized) {
    return {
      translatedText: "",
      detectedSourceLanguage,
      provider: "mock",
    };
  }

  if (detectedSourceLanguage === targetLanguage) {
    return {
      translatedText: normalized,
      detectedSourceLanguage,
      provider: "mock",
    };
  }

  const translatedText =
    detectedSourceLanguage === "ar"
      ? mapWords(normalized, arabicToEnglishDictionary, stylizeEnglish)
      : mapWords(normalized, englishToArabicDictionary, stylizeArabic);

  return {
    translatedText,
    detectedSourceLanguage,
    provider: "mock",
  };
}
