import { useQuery } from "@tanstack/react-query";

export function useFetchGithubAppVersion() {
  return useQuery({
    queryKey: ["github"],
    queryFn: async () => {
      const res = await fetch(
        "https://api.github.com/repos/trifkee/m0ckify/releases"
      );
      return res.json();
    },
  });
}
