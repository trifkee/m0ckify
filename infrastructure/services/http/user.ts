import { RegisterUserType } from "@/lib/types/user.type";
import { axiosBaseInstance } from "../instances/axiosBaseinstance";

export const me = async () => {
  return axiosBaseInstance.get(`/auth/me`);
};

export const users = async () => {
  return axiosBaseInstance.get("/users");
};

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return axiosBaseInstance.post("/auth/login", { username, password });
};

export const createUser = async (payload: RegisterUserType) => {
  return axiosBaseInstance.post("/users", payload);
};
