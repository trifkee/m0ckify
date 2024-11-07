"use client";

import useGenerator from "@/ui/hooks/useGenerator.hook";
import { CloudFog, Plus } from "lucide-react";
import Checkbox from "../../atoms/Checkbox.atom";
import NumberInput from "../../atoms/NumberInput.atom";
import { useRecoilValue } from "recoil";
import { fogControlsAtom } from "@/lib/atoms/generator";
import { ChangeEvent, ReactNode } from "react";
import { useTranslations } from "next-intl";

export default function Fog() {
  const t = useTranslations("generate.general.fog");
  const { handleFogSize, handleFogEnable } = useGenerator();

  const fogSettings = useRecoilValue(fogControlsAtom);

  return (
    <details className="control fog">
      <summary className="control__title">
        {t("title")} <CloudFog />
      </summary>

      <div className="control__section">
        <Checkbox
          title={t("enable")}
          htmlName="Enabled"
          value={fogSettings.enabled}
          onChange={handleFogEnable}
        />
      </div>

      {fogSettings.enabled && (
        <div className="position">
          <div className="control__section">
            <p className="title">{t("minFog")}</p>
            <NumberInput
              label="-"
              name="minFog"
              value={fogSettings.minFog}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleFogSize(e)}
            />
          </div>

          <div className="control__section">
            <p className="title">{t("maxFog")}</p>
            <NumberInput
              label="+"
              name="maxFog"
              value={fogSettings.maxFog}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleFogSize(e)}
            />
          </div>
        </div>
      )}
    </details>
  );
}
