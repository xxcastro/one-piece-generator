import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { buildDescriptionPrompt, buildImagePrompt } from "@/lib/prompt-builder";
import { calculateBerrys } from "@/lib/berry-calculator";
import { CharacterForm } from "@/types/character";

export async function POST(req: NextRequest) {
  try {
    const form: CharacterForm = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Falta la API key de Groq" }, { status: 500 });
    }

    const groq = new Groq({ apiKey });

    // Cambiado a llama-3.1-70b-versatile (o puedes usar llama-3.1-8b-instant si buscas menor latencia)
  const groqResult = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b", // <-- Modelo activo de tu lista con soporte json_mode
    messages: [{ role: "user", content: buildDescriptionPrompt(form) }],
    response_format: { type: "json_object" },
  });

    const rawText = groqResult.choices[0]?.message?.content ?? "{}";
    const clean = rawText.replace(/```json|```/g, "").trim();
    const description = JSON.parse(clean);
    const berrys = calculateBerrys(form);

    const imagePrompt = buildImagePrompt(form);

    return NextResponse.json({ description, berrys, imagePrompt });
  } catch (error: any) {
    console.error("Error en /api/generate-character:", error);
    return NextResponse.json(
      { error: error?.message || "Error interno al procesar el personaje" },
      { status: 500 }
    );
  }
}
