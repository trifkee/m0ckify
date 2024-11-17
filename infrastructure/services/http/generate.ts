import { AIServiceType } from "@/lib/types/AI.types";
import axios from "axios";

export const generate = ({
  prompt,
  aiKey,
  service,
}: {
  prompt: string;
  aiKey?: string;
  service: AIServiceType;
}) => {
  return axios.post("/api/generate-image", { prompt, aiKey, service });
};
