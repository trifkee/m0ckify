import { STARTING_PROPMPT } from "@/lib/constants/generator";
import { AIServiceURLSEnum } from "@/lib/enum/AI.enum";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

function checkErrorMessage(status: number) {
  switch (status) {
    case 401:
      return "invalidApiKey";

    case 402:
      return "noCredit";

    default:
      return "unknown";
  }
}

async function handleStabilityAI(prompt: string, apiKey?: string) {
  try {
    const res = await axios.post(
      AIServiceURLSEnum.stabilityUrl,
      {
        prompt: `${STARTING_PROPMPT.stability} ${prompt}`,
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

    if (res.status !== 200) {
      return {
        status: res.status,
        message: checkErrorMessage(res.status),
      };
    }

    const base64Image = Buffer.from(res.data, "binary").toString("base64");
    const imageData = `data:image/webp;base64,${base64Image}`;

    return {
      status: 200,
      image: imageData,
    };
  } catch (error: unknown) {
    const err = error as AxiosError;
    return {
      status: err.status,
      errorName: err.name,
      message: `Stability AI Error: ${err.message}`,
    };
  }
}

async function handleOpenAi(prompt: string, apiKey?: string) {
  try {
    const res = await axios.post(
      AIServiceURLSEnum.openAiUrl,
      {
        prompt: `${STARTING_PROPMPT.openai} ${prompt}`,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json",
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey ?? process.env.OPEN_AI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status !== 200) {
      return {
        status: res.status,
        message: checkErrorMessage(res.status),
      };
    }

    const base64Image = res.data.data[0].b64_json;
    const imageData = `data:image/webp;base64,${base64Image}`;

    return {
      status: 200,
      image: imageData,
    };
  } catch (error) {
    const err = error as AxiosError;

    return {
      status: err.status,
      errorName: err.name,
      message: `OpenAI Error: ${err.message}`,
    };
  }
}

async function handleStablediffusion(prompt: string, apiKey?: string) {
  try {
    const res = await axios.post(
      AIServiceURLSEnum.stableDiffusionUrl,
      {
        prompt: `${STARTING_PROPMPT.stability} ${prompt}`,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey ?? process.env.OPEN_AI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status !== 200) {
      return {
        status: res.status,
        message: checkErrorMessage(res.status),
      };
    }

    const base64Image = res.data.data[0].b64_json;
    const imageData = `data:image/webp;base64,${base64Image}`;

    return {
      status: 200,
      image: imageData,
    };
  } catch (error) {
    const err = error as AxiosError;

    return {
      status: err.status,
      errorName: err.name,
      message: `OpenAI Error: ${err.message}`,
    };
  }
}

async function handleNanobana(prompt: string, apiKey?: string) {
  try {
    const key = apiKey ?? process.env.NEXT_PUBLIC_NANOBANA_API_KEY;

    const fullPrompt = `${STARTING_PROPMPT.nanobanana} ${prompt}`;

    if (!key || key.length < 30) {
      return {
        status: 401,
        message: "API key is not valid or is missing.",
      };
    }

    const targetUrl = `${AIServiceURLSEnum.nanobananaUrl}?key=${key}`;

    const payload = {
      contents: [
        {
          parts: [
            {
              text: fullPrompt,
            },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
      systemInstruction: {
        parts: [{ text: "Generiši fotorealističnu sliku na osnovu korisničkog opisa." }]
      }
    };

    const res = await axios.post(
      targetUrl,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status !== 200) {
      return {
        status: res.status,
        message: checkErrorMessage(res.status),
      };
    }

    const base64Image = res.data.candidates[0].content.parts.find((p: any) => p.inlineData)?.inlineData?.data;
    const imageData = `data:image/jpeg;base64,${base64Image}`;

    return {
      status: 200,
      image: imageData,
    };
  } catch (error) {
    const err = error as any;

    const status = err.response?.status || 500;

    return {
      status: status,
      errorName: err.name,
      message: `Gemini Error (${status}): ${err.message}`,
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, apiKey, service } = await req.json();

    switch (service) {
      case "stability":
        return NextResponse.json(await handleStabilityAI(prompt, apiKey));

      case "openai":
        return NextResponse.json(await handleOpenAi(prompt, apiKey));

      case "stablediffusion":
        return NextResponse.json(await handleStablediffusion(prompt, apiKey));
      case "nanobanana":
        return NextResponse.json(await handleNanobana(prompt, apiKey));
      default:
        return NextResponse.json({
          status: 400,
          message:
            "Invalid service specified. Use 'stability', 'openai', 'stablediffusion', 'gemini' or 'nanobanana'",
        });
    }
  } catch (error: unknown) {
    const err = error as AxiosError;

    return NextResponse.json({
      status: err.status,
      errorName: err.name,
      message: `Something went wrong: ${err.message} `,
    });
  }
}
