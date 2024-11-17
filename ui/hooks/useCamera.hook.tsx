"use client";

import { cameraSettingsAtom } from "@/lib/atoms/generator";
import { ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";

export default function useCamera() {
  const setCamera = useSetRecoilState(cameraSettingsAtom);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setCamera((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleCameraAngle(value: [number, number, number]) {
    setCamera((prev) => ({
      ...prev,
      position: value,
    }));
  }

  return { handleChange, handleCameraAngle };
}
