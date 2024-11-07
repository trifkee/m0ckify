"use client";

import { HexColorPicker } from "react-colorful";
import { useRecoilValue } from "recoil";

import Checkbox from "@/ui/components/atoms/Checkbox.atom";

import useGenerator from "@/ui/hooks/useGenerator.hook";

import { backgroundSettingsAtom } from "@/lib/atoms/generator";

import { Frame } from "lucide-react";

export default function Background() {
  const { handleBackgroundEnable, handleBackgroundSettings } = useGenerator();
  const backgroundSettings = useRecoilValue(backgroundSettingsAtom);

  return (
    <details className="control background">
      <summary className="control__title">
        Background
        <Frame />
      </summary>

      <div className="control__section">
        <Checkbox
          title={"Background"}
          htmlName="background"
          onChange={handleBackgroundEnable}
          value={backgroundSettings.enabled}
        />
      </div>

      <div className="control__section">
        <HexColorPicker
          defaultValue={backgroundSettings.color}
          onChange={handleBackgroundSettings}
        />
      </div>
    </details>
  );
}
