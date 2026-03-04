import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { buildDescriptionPrompt, buildImagePrompt } from "@/lib/prompt-builder";
import { calculateBerrys } from "@/lib/berry-calculator";
import { CharacterForm } from "@/types/character";

export async function POST(req: NextRequest) {
  // 1. Recibimos el formulario
  const form: CharacterForm = await req.json();

  // 2. Leemos la API key de Groq
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Falta la API key" }, { status: 500 });
  }

  // 3. Inicializamos Groq y le mandamos el prompt
  const groq = new Groq({ apiKey });
  const groqResult = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: buildDescriptionPrompt(form) }],
  });

  // 4. Extraemos el texto de la respuesta
  const rawText = groqResult.choices[0].message.content ?? "";

  // 5. Parseamos el JSON
  const clean = rawText.replace(/```json|```/g, "").trim();
  const description = JSON.parse(clean);

  // 6. Construimos la URL de Pollinations
  const imagePrompt = buildImagePrompt(form);
  const hfToken = process.env.HF_API_KEY;
  const hfResponse = await fetch(
    "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hfToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: imagePrompt }),
    }
  );

  const imageBlob = await hfResponse.blob();
  const imageBuffer = await imageBlob.arrayBuffer();
  const imageBase64 = Buffer.from(imageBuffer).toString("base64");
  const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
  
  // 7. Calculamos las berrys
  const berrys = calculateBerrys(form);

  // 8. Devolvemos todo junto
  return NextResponse.json({ description, imageUrl, berrys });
}