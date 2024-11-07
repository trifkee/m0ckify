"use client";

import { canvasOptionsAtom } from "@/lib/atoms/generator";
import { ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";

export default function useWorld() {
  const setCanvasSettings = useSetRecoilState(canvasOptionsAtom);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setCanvasSettings((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value,
    }));
  }

  return { handleChange };
}
