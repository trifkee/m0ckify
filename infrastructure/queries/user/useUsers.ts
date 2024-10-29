import { login, me, users } from "@/infrastructure/services/http/user";
import { UserType } from "@/lib/types/user.type";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";

export function useFetchUser(): UseQueryResult<UserType> {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => me(),
    enabled:
      typeof window !== "undefined" && localStorage.getItem("token")
        ? true
        : false,
    select: (data) => data.data._doc,
  });
}

export function useFetchUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => users(),
  });
}
