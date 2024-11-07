"use client";

import { useTranslations } from "next-intl";
import { useRecoilValue } from "recoil";
import Slider from "@/ui/components/atoms/Slider.atom";

import useGenerator from "@/ui/hooks/useGenerator.hook";

import { TONE_MAPPINGS } from "@/lib/constants/generator";

import { canvasOptionsAtom } from "@/lib/atoms/generator";

import { Globe } from "lucide-react";

export default function World() {
  const t = useTranslations("generate");

  const { handleUpdateCanvasBrightness, handleToneMappingChange } =
    useGenerator();

  const canvasSettings = useRecoilValue(canvasOptionsAtom);

  return (
    <details className="control">
      <summary className="control__title">
        World <Globe />
      </summary>

      <div className="control__section">
        <p className="title">{t("general.brigthnes")}</p>
        <Slider
          max={2}
          min={0}
          className="small"
          name="overall-lightning"
          onChange={(e) => handleUpdateCanvasBrightness(e)}
          step={0.01}
          value={String(canvasSettings.toneMappingExposure)}
        />
      </div>

      <div className="control__section">
        <p className="title">{t("general.preset")}</p>

        <select
          onChange={handleToneMappingChange}
          defaultValue={TONE_MAPPINGS[0].value}
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
