import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const { imagePrompt } = await req.json();

  const seed = Math.floor(Math.random() * 99999);
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=512&height=768&nologo=true&seed=${seed}`;

  const response = await fetch(url);

  if (!response.ok) {
    return NextResponse.json({ error: "Error generando imagen" }, { status: 500 });
  }

  // En vez de base64, devolvemos la URL directamente
  // Vercel hace de proxy y evita el bloqueo de Cloudflare
  return NextResponse.json({ imageUrl: url });
}