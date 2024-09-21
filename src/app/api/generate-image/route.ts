import { STARTING_PROPMPT } from "@/lib/constants/generator";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { prompt, openAiKey } = await req.json();

    const openai = new OpenAI({
      apiKey: openAiKey ? openAiKey : process.env.OPEN_AI_KEY,
    });

    const res = await openai.images.generate({
      prompt: STARTING_PROPMPT + prompt,
      model: "dall-e-3",
      quality: "standard",
      size: "1024x1792",
      n: 1,
    });

    if (!res.data) {
      throw new Error("Failed to generate image");
    }

    const imgUrl = res.data[0].url;

    return NextResponse.json({ imgUrl });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      // @ts-ignore
      message: `Failed to generate image: ${error.error.message}`,
    });
  }
}
