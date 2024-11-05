import { STARTING_PROPMPT } from "@/lib/constants/generator";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = "https://api.stability.ai/v2beta/stable-image/generate/core";

export async function POST(req: NextRequest) {
  try {
    const { prompt, apiKey } = await req.json();

    const res = await axios.post(
      baseUrl,
      {
        prompt: `${STARTING_PROPMPT} ${prompt}`,
        output_format: "webp",
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey ?? process.env.STABILITY_KEY}`,
          Accept: "image/*",
          "Content-Type": "multipart/form-data",
        },
        validateStatus: undefined,
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(res.data, "binary").toString("base64");
    const imageData = `data:image/webp;base64,${base64Image}`;

    if (res.status === 401) {
      return NextResponse.json({
        status: 401,
        message: "Invalid API key",
      });
    }

    return NextResponse.json({
      image: imageData,
    });
  } catch (error: unknown) {
    const err = error as AxiosError;

    return NextResponse.json({
      status: err.status,
      errorName: err.name,
      message: `Something went wrong: ${err.message} `,
    });
  }
}
