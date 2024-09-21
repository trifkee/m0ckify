"use client";

import { useMutation } from "@tanstack/react-query";
import { generate } from "../services/http/generate";

export function useGenerateImage(onSuccess: CallableFunction) {
  return useMutation({
    mutationFn: ({
      prompt,
      openAiKey,
    }: {
      prompt: string;
      openAiKey?: string;
    }) => generate({ prompt, openAiKey }),
    onSuccess: (data) => onSuccess(data),
  });
}
