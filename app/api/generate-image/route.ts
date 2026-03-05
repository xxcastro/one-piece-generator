import { NextRequest, NextResponse } from "next/server";

// IMPORTANTE: En el plan gratuito, el maxDuration máximo es 10.
export const maxDuration = 10; 
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { imagePrompt } = await req.json();
    const seed = Math.floor(Math.random() * 99999);
    
    // Añadimos parámetros para que la imagen sea más pequeña y rápida de generar
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=512&height=512&nologo=true&seed=${seed}`;

    // Vercel (desde USA) hace la petición a Pollinations
    const response = await fetch(url);

    if (!response.ok) {
      return new Response("Error en Pollinations", { status: 502 });
    }

    // Leemos la imagen como un array de datos (buffer)
    const arrayBuffer = await response.arrayBuffer();

    // Devolvemos la imagen directamente al navegador
    return new Response(arrayBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "no-store", // Para que siempre genere una nueva
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Error interno", { status: 500 });
  }
}