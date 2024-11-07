"use client";

import { ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";

import { fogControlsAtom } from "@/lib/atoms/generator";

export default function useFog() {
  const setFogSettings = useSetRecoilState(fogControlsAtom);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFogSettings((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  }

  return { handleChange };
}
