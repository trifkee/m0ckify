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

  return { handleBackgroundEnable, handleBackgroundSettings };
}
