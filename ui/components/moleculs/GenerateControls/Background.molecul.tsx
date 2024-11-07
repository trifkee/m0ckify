"use client";

import { HexColorPicker } from "react-colorful";
import { useRecoilValue } from "recoil";

import Checkbox from "@/ui/components/atoms/Checkbox.atom";

import useGenerator from "@/ui/hooks/useGenerator.hook";

import { backgroundSettingsAtom } from "@/lib/atoms/generator";

import { Frame } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Background() {
  const t = useTranslations("generate.general.background");
  const { handleBackgroundEnable, handleBackgroundSettings } = useGenerator();
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
