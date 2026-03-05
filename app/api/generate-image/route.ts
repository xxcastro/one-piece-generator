import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 10; 

export async function POST(req: NextRequest) {
  try {
    const { imagePrompt } = await req.json();
    
    // Usamos el nombre que tienes en Vercel
    const token = process.env.HF_API_KEY;

    if (!token) {
      console.error("ERROR: La variable HF_API_KEY no está definida en Vercel");
      return new Response("Configuración incompleta", { status: 500 });
    }

    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: imagePrompt }),
      }
    );

    if (!response.ok) {
      const errorDetail = await response.text();
      console.error("Error de Hugging Face:", errorDetail);
      // Devolvemos el estado real (401, 404, 503) para saber qué pasa
      return new Response(`Error HF: ${response.status}`, { status: response.status });
    }

    const arrayBuffer = await response.arrayBuffer();

    return new Response(arrayBuffer, {
      headers: { "Content-Type": "image/png" },
    });
  } catch (error) {
    console.error("Error en catch:", error);
    return new Response("Error crítico", { status: 500 });
  }
}