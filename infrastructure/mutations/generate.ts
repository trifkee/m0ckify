"use client";

import { useMutation } from "@tanstack/react-query";
import { generate } from "../services/http/generate";

export function useGenerateImage(onSuccess: CallableFunction) {
  return useMutation({
    mutationFn: ({ prompt, aiKey }: { prompt: string; aiKey?: string }) =>
      generate({ prompt, aiKey }),
    onSuccess: (data) => onSuccess(data),
  });
}
