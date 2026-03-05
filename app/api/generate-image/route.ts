import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const { imagePrompt } = await req.json();

  const response = await fetch(
    "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
      },
      body: JSON.stringify({
        text_prompts: [{ text: imagePrompt }],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        samples: 1,
      }),
    }
  );

  const data = await response.json();
  const imageBase64 = data.artifacts[0].base64;

  return NextResponse.json({ imageUrl: `data:image/png;base64,${imageBase64}` });
}