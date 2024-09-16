import { RegisterUserType } from "@/lib/types/user.type";
import { axiosBaseInstance } from "../instances/axiosBaseinstance";

export const me = async (id: string) => {
  return axiosBaseInstance.get(`/users/${id}`);
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
  return axiosBaseInstance.post("/users/login", { username, password });
};

export const createUser = async (payload: RegisterUserType) => {
  return axiosBaseInstance.post("/users", payload);
};
