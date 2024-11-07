"use client";

import { ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";

import { fogControlsAtom } from "@/lib/atoms/generator";

export default function useFog() {
  const setFogSettings = useSetRecoilState(fogControlsAtom);

  const handleFogEnable = (e: ChangeEvent<HTMLInputElement>) => {
    setFogSettings((prev) => ({
      ...prev,
      enabled: e.target.checked,
    }));
  };

  const handleFogSize = (e: ChangeEvent<HTMLInputElement>) => {
    setFogSettings((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
  };

  return { handleFogSize, handleFogEnable };
}
