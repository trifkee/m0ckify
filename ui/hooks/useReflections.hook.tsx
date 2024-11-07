"use client";

import { floorReflectionAtom } from "@/lib/atoms/generator";
import { ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";

export default function useReflections() {
  const setReflectionSettings = useSetRecoilState(floorReflectionAtom);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setReflectionSettings((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  }

  return { handleChange };
}
