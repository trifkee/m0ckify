import { atom } from "recoil";
import { UserType } from "../types/user.type";

export const userAtom = atom<UserType | null>({
  key: "user",
  default: null,
});
