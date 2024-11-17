"use client";

import { useTranslations } from "next-intl";
import { useRecoilValue } from "recoil";
import Slider from "@/ui/components/atoms/Slider.atom";

import useWorld from "@/ui/hooks/useWorld.hook";

import { TONE_MAPPINGS } from "@/lib/constants/generator";

import { canvasOptionsAtom } from "@/lib/atoms/generator";

import { Globe } from "lucide-react";

export default function World() {
  const t = useTranslations("generate.general.world");

  const { handleChange } = useWorld();

  const canvasSettings = useRecoilValue(canvasOptionsAtom);

  return (
    <details className="control">
      <summary className="control__title">
        {t("title")} <Globe />
      </summary>

      <div className="control__section">
        <p className="title">{t("brigthnes")}</p>
        <Slider
          max={2}
          min={0}
          className="small"
          name="toneMappingExposure"
          onChange={handleChange}
          step={0.01}
          value={String(canvasSettings.toneMappingExposure)}
        />
      </div>

      <div className="control__section">
        <p className="title">Rotation Speed</p>
        <Slider
          max={1}
          min={0.1}
          className="small"
          name="dampingSpeed"
          onChange={handleChange}
          step={0.01}
          value={String(canvasSettings.dampingSpeed)}
        />
      </div>

      <div className="control__section">
        <p className="title">{t("preset")}</p>

        <select
          name="toneMapping"
          onChange={handleChange}
          defaultValue={TONE_MAPPINGS[2].value}
        >
          {TONE_MAPPINGS.map((tone, i) => {
            return (
              <option key={i} value={tone.value}>
                {tone.name}
              </option>
            );
          })}
        </select>
      </div>
    </details>
  );
}
