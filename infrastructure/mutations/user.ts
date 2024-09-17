import { useMutation } from "@tanstack/react-query";
import { createUser, login } from "../services/http/user";
import { RegisterUserType } from "@/lib/types/user.type";

export function useRegisterUser() {
  return useMutation({
    mutationFn: (payload: RegisterUserType) => createUser(payload),
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (payload: { username: string; password: string }) =>
      login({ username: payload.username, password: payload.password }),
  });
}
