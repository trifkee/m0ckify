"use client";

import { useRecoilValue } from "recoil";
import { HexColorPicker } from "react-colorful";
import { useTranslations } from "next-intl";

import Checkbox from "@/ui/components/atoms/Checkbox.atom";

import useBackground from "@/ui/hooks/useBackground.hook";

import { backgroundSettingsAtom } from "@/lib/atoms/generator";

import { Frame } from "lucide-react";

export default function Background() {
  const t = useTranslations("generate.general.background");
  const { handleBackgroundEnable, handleBackgroundSettings } = useBackground();
  const backgroundSettings = useRecoilValue(backgroundSettingsAtom);

  return (
    <details className="control background">
      <summary className="control__title">
        {t("title")}
        <Frame />
      </summary>

      <div className="control__section">
        <Checkbox
          title={t("enable")}
          htmlName="background"
          onChange={handleBackgroundEnable}
          value={backgroundSettings.enabled}
        />
      </div>

      {backgroundSettings.enabled && (
        <div className="control__section">
          <HexColorPicker
            defaultValue={backgroundSettings.color}
            onChange={handleBackgroundSettings}
          />
        </div>
      )}
    </details>
  );
}
