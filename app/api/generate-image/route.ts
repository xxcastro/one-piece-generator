import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const { imagePrompt } = await req.json();

  const client = new InferenceClient(process.env.HF_API_KEY);

  const imageBlob = await client.textToImage({
    provider: "nscale",
    model: "black-forest-labs/FLUX.1-schnell",
    inputs: imagePrompt,
    parameters: { num_inference_steps: 4 },
  });

  const imageBuffer = await (imageBlob as unknown as Blob).arrayBuffer();
  const imageBase64 = Buffer.from(imageBuffer).toString("base64");

  return NextResponse.json({ imageUrl: `data:image/png;base64,${imageBase64}` });
}