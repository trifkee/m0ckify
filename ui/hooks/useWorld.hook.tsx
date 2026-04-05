"use client";

import { canvasOptionsAtom } from "@/lib/atoms/generator";
import { ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";

export default function useWorld() {
  const setCanvasSettings = useSetRecoilState(canvasOptionsAtom);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const isCheckbox = e.target.type === "checkbox";
    const isNumericInput =
      e.target instanceof HTMLInputElement &&
      (e.target.type === "number" || e.target.type === "range");

    setCanvasSettings((prev) => ({
      ...prev,
      [e.target.name]:
        isCheckbox
          ? (e.target as HTMLInputElement).checked
          : isNumericInput
          ? Number(e.target.value)
          : e.target.value,
    }));
  }

  return { handleChange };
}
