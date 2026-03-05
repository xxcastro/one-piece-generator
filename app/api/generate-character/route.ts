import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { buildDescriptionPrompt, buildImagePrompt } from "@/lib/prompt-builder";
import { calculateBerrys } from "@/lib/berry-calculator";
import { CharacterForm } from "@/types/character";

export async function POST(req: NextRequest) {
  const form: CharacterForm = await req.json();

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Falta la API key" }, { status: 500 });
  }

  const groq = new Groq({ apiKey });
  const groqResult = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: buildDescriptionPrompt(form) }],
  });

  const rawText = groqResult.choices[0].message.content ?? "";
  const clean = rawText.replace(/```json|```/g, "").trim();
  const description = JSON.parse(clean);
  const berrys = calculateBerrys(form);
  
  // Devolvemos el prompt de imagen para que el frontend lo use
  const imagePrompt = buildImagePrompt(form);

  return NextResponse.json({ description, berrys, imagePrompt });
}