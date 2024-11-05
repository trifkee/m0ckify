import axios from "axios";

export const generate = ({
  prompt,
  aiKey,
}: {
  prompt: string;
  aiKey?: string;
}) => {
  return axios.post("/api/generate-image", { prompt, aiKey });
};
