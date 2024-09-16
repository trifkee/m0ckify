import { login, me, users } from "@/infrastructure/services/http/user";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useFetchUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => me(id),
  });
}

export function useFetchUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => users(),
  });
}
