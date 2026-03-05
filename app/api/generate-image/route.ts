import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 10; 

export async function POST(req: NextRequest) {
  try {
    const { imagePrompt } = await req.json();
    
    // Usamos FLUX.1-schnell: es ultra rápido (ideal para el límite de 10s de Vercel)
    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: imagePrompt }),
      }
    );

    if (!response.ok) {
      return new Response("Error en Hugging Face", { status: response.status });
    }

    const arrayBuffer = await response.arrayBuffer();

    return new Response(arrayBuffer, {
      headers: { "Content-Type": "image/webp" }, // FLUX suele devolver webp
    });
  } catch (error) {
    return new Response("Error crítico", { status: 500 });
  }
}