import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { imagePrompt } = await req.json();

  const seed = Math.floor(Math.random() * 99999);
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=512&height=768&nologo=true&seed=${seed}`;

  const response = await fetch(url);

  if (!response.ok) {
    return NextResponse.json({ error: "Error generando imagen" }, { status: 500 });
  }

  const imageBuffer = await response.arrayBuffer();
  const imageBase64 = Buffer.from(imageBuffer).toString("base64");

  return NextResponse.json({ imageUrl: `data:image/png;base64,${imageBase64}` });
}