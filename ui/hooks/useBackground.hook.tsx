"use client";

import { backgroundSettingsAtom } from "@/lib/atoms/generator";
import { useSetRecoilState } from "recoil";

export default function useBackground() {
  const setBackgroundSettings = useSetRecoilState(backgroundSettingsAtom);

  const handleBackgroundEnable = () => {
    setBackgroundSettings((prev) => ({ ...prev, enabled: !prev.enabled }));
  };

  const handleBackgroundSettings = (color: string) => {
    setBackgroundSettings((prev) => ({
      ...prev,
      color,
    }));
  };

  const handleBackgroundType = (type: "solid" | "gradient") => {
    setBackgroundSettings((prev) => ({ ...prev, type }));
  };

  const handleGradientColor = (gradientColor: string) => {
    setBackgroundSettings((prev) => ({ ...prev, gradientColor }));
  };

  const handleGradientAngle = (gradientAngle: number) => {
    setBackgroundSettings((prev) => ({ ...prev, gradientAngle }));
  };

  const handleGradientColorStop = (gradientColorStop: number) => {
    setBackgroundSettings((prev) => ({ ...prev, gradientColorStop }));
  };

  return {
    handleBackgroundEnable,
    handleBackgroundSettings,
    handleBackgroundType,
    handleGradientColor,
    handleGradientAngle,
    handleGradientColorStop,
  };
}
