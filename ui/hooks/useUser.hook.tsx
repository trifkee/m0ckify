"use client";

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useFetchUser } from "@/infrastructure/queries/user/useUsers";

import { helpAtom } from "@/lib/atoms/generator";
import { userAtom } from "@/lib/atoms/user";

export default function useUser() {
  const { data: userData, refetch: refetchUser } = useFetchUser();
  const setShowHelp = useSetRecoilState(helpAtom);
  const setUser = useSetRecoilState(userAtom);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    setUser(userData ?? null);
  }, [userData]);

  useEffect(() => {
    const userSawHelp = localStorage.getItem("help");

    if (!userSawHelp) {
      setShowHelp(true);
      localStorage.setItem("help", "1");
    }
  }, []);

  return { handleLogout, refetchUser };
}
