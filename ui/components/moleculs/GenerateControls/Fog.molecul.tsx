"use client";

import { useRecoilValue } from "recoil";
import { ChangeEvent } from "react";
import { useTranslations } from "next-intl";

import Checkbox from "@/ui/components/atoms/Checkbox.atom";
import NumberInput from "@/ui/components/atoms/NumberInput.atom";

import useFog from "@/ui/hooks/useFog.hook";

import { fogControlsAtom } from "@/lib/atoms/generator";

import { CloudFog } from "lucide-react";

export default function Fog() {
  const t = useTranslations("generate.general.fog");

  const { handleChange } = useFog();

  const fogSettings = useRecoilValue(fogControlsAtom);

  return (
    <details className="control fog">
      <summary className="control__title">
        {t("title")} <CloudFog />
      </summary>

      <div className="control__section">
        <Checkbox
          title={t("enable")}
          htmlName="enabled"
          value={fogSettings.enabled}
          onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>

          <div className="control__section">
            <p className="title">{t("maxFog")}</p>
            <NumberInput
              label="+"
              name="maxFog"
              value={fogSettings.maxFog}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
    </details>
  );
}
