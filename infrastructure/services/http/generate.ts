import axios from "axios";

export const generate = ({
  prompt,
  openAiKey,
}: {
  prompt: string;
  openAiKey?: string;
}) => {
  return axios.post("/api/generate-image", { prompt, openAiKey });
};
