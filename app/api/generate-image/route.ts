import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const { imagePrompt } = await req.json();

  const response = await fetch(
    "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: imagePrompt,
        parameters: {
          num_inference_steps: 4,
          guidance_scale: 0.0,
          width: 1024,
          height: 1024,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("HF error:", error);
    return NextResponse.json({ error: "Error generando imagen" }, { status: 500 });
  }

  const imageBuffer = await response.arrayBuffer();
  const imageBase64 = Buffer.from(imageBuffer).toString("base64");

  return NextResponse.json({ imageUrl: `data:image/png;base64,${imageBase64}` });
}
