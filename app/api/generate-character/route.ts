import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildDescriptionPrompt, buildImagePrompt } from "@/lib/prompt-builder";
import { calculateBerrys } from "@/lib/berry-calculator";
import { CharacterForm } from "@/types/character";

export async function POST(req: NextRequest) {
  // 1. Recibimos el formulario
  const form: CharacterForm = await req.json();

  // 2. Leemos la API key del archivo .env.local
  // process.env es la forma de leer variables de entorno en Node
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Falta la API key" }, { status: 500 });
  }

  // 3. Inicializamos Gemini y le mandamos el prompt
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const geminiResult = await model.generateContent(buildDescriptionPrompt(form));
  const rawText = geminiResult.response.text();

  // 4. Parseamos el JSON que nos devuelve Gemini
  // Le quitamos los posibles backticks que mencionamos antes
  const clean = rawText.replace(/```json|```/g, "").trim();
  const description = JSON.parse(clean);

  // 5. Construimos la URL de Pollinations
  const imagePrompt = buildImagePrompt(form);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=512&height=768&nologo=true`;

  // 6. Calculamos las berrys
  const berrys = calculateBerrys(form);

  // 7. Devolvemos todo junto
  return NextResponse.json({ description, imageUrl, berrys });
}