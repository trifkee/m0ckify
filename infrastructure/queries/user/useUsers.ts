import { me, users } from "@/infrastructure/services/http/user";
import { isWindowsUndefined } from "@/lib/helpers/helpers";
import { UserType } from "@/lib/types/user.type";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useFetchUser(): UseQueryResult<UserType> {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => me(),
    enabled:
      isWindowsUndefined() && localStorage.getItem("token") ? true : false,
    select: (data) => data.data._doc,
  });
}

export function useFetchUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => users(),
  });
}
