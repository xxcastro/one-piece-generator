import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 10; 

export async function POST(req: NextRequest) {
  try {
    const { imagePrompt } = await req.json();
    
    // Usamos Stable Diffusion XL, que es el más estable en la API gratuita
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: imagePrompt }),
      }
    );

    // Si Hugging Face está despertando el modelo, devuelve 503. 
    // Lo manejamos para que el front sepa qué pasa.
    if (!response.ok) {
      return new Response(`Error HF: ${response.status}`, { status: response.status });
    }

    const arrayBuffer = await response.arrayBuffer();

    return new Response(arrayBuffer, {
      headers: { "Content-Type": "image/png" },
    });
  } catch (error) {
    return new Response("Error crítico", { status: 500 });
  }
}