// app/api/translate/route.ts
import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { text, targetLang } = await req.json();

    if (!text || !targetLang) {
      return NextResponse.json(
        { error: "Missing text or targetLang" },
        { status: 400 }
      );
    }

    // Kalau target bahasa Inggris, langsung balikin teks aslinya
    if (targetLang === "en") {
      return NextResponse.json({ translatedText: text });
    }

    if (!OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not set");
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not set" },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: `You are a translation engine. Translate UI text for a premium IT consulting website to ${
              targetLang === "id" ? "Indonesian" : targetLang
            }. Keep it natural, concise, and professional. Return ONLY the translated text.`,
          },
          { role: "user", content: text },
        ],
      }),
    });

    if (!res.ok) {
      console.error("Translation API error:", await res.text());
      return NextResponse.json(
        { error: "Translation API error" },
        { status: 500 }
      );
    }

    const data = await res.json();
    const translatedText: string =
      data.choices?.[0]?.message?.content?.trim() ?? text;

    return NextResponse.json({ translatedText });
  } catch (err) {
    console.error("Translation failed:", err);
    return NextResponse.json(
      { error: "Translation failed" },
      { status: 500 }
    );
  }
}
