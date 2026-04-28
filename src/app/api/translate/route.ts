import { NextResponse } from "next/server";
import { mockTranslate } from "@/lib/mock-translation";
import type { LanguageCode, ResolvedLanguage } from "@/types/translation";

interface TranslatePayload {
  text?: string;
  sourceLanguage?: LanguageCode;
  targetLanguage?: ResolvedLanguage;
}

export async function POST(request: Request) {
  const body = (await request.json()) as TranslatePayload;
  const text = body.text?.trim();
  const sourceLanguage = body.sourceLanguage ?? "auto";
  const targetLanguage = body.targetLanguage ?? "en";

  if (!text) {
    return NextResponse.json(
      { message: "Text is required." },
      { status: 400 },
    );
  }

  if (targetLanguage !== "ar" && targetLanguage !== "en") {
    return NextResponse.json(
      { message: "Unsupported target language." },
      { status: 400 },
    );
  }

  // Replace this mock translator with your real API integration later.
  // Example: call your provider here and read API credentials from process.env.
  const result = await mockTranslate(text, sourceLanguage, targetLanguage);

  return NextResponse.json(result);
}
