"use client";

import { canvasOptionsAtom } from "@/lib/atoms/generator";
import { ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";

export default function useWorld() {
  const setCanvasSettings = useSetRecoilState(canvasOptionsAtom);

  const handleUpdateCanvasBrightness = (e: ChangeEvent<HTMLInputElement>) => {
    setCanvasSettings((prev: any) => ({
      ...prev,
      toneMappingExposure: e.target.value,
    }));
  };

  const handleToneMappingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    return setCanvasSettings((prev: any) => ({
      ...prev,
      toneMapping: e.target.value,
    }));
  };

  const handleChangeGridShow = (e: ChangeEvent<HTMLInputElement>) => {
    return setCanvasSettings((prev: any) => ({
      ...prev,
      grid: e.target.checked,
    }));
  };

  return {
    handleUpdateCanvasBrightness,
    handleToneMappingChange,
    handleChangeGridShow,
  };
}

// 'use client'

// export default function useWorld() {
//     return {}
// }
