"use client";

import { floorReflectionAtom } from "@/lib/atoms/generator";
import { ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";

export default function useReflections() {
  const setReflectionSettings = useSetRecoilState(floorReflectionAtom);

  const handleReflectionEnable = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e?.target.checked);

    setReflectionSettings((prev) => ({
      ...prev,
      enabled: e?.target.checked,
    }));
  };

  const handleReflectionInputs = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value);
    setReflectionSettings((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
  };

  return { handleReflectionEnable, handleReflectionInputs };
}
