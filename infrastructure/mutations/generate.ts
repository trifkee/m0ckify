"use client";

import { useMutation } from "@tanstack/react-query";
import { generate } from "../services/http/generate";
import { AIServiceType } from "@/lib/types/AI.types";

export function useGenerateImage(onSuccess: CallableFunction) {
  return useMutation({
    mutationFn: ({
      prompt,
      aiKey,
      service,
    }: {
      prompt: string;
      aiKey?: string;
      service: AIServiceType;
    }) => generate({ prompt, aiKey, service }),
    onSuccess: (data) => onSuccess(data),
  });
}
