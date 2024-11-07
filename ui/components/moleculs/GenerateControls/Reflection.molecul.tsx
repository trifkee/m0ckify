"use client";

import { ChangeEvent } from "react";
import { useRecoilValue } from "recoil";
import { useTranslations } from "next-intl";

import Slider from "@/ui/components/atoms/Slider.atom";
import Checkbox from "@/ui/components/atoms/Checkbox.atom";
import NumberInput from "@/ui/components/atoms/NumberInput.atom";

import useReflections from "@/ui/hooks/useReflections.hook";

import { floorReflectionAtom } from "@/lib/atoms/generator";

import { FlipVertical2 } from "lucide-react";

export default function Reflection() {
  const t = useTranslations("generate.general.reflections");
  const { handleChange } = useReflections();

  const reflectionSettings = useRecoilValue(floorReflectionAtom);

  return (
    <details className="control reflection">
      <summary className="control__title">
        {t("title")} <FlipVertical2 />
      </summary>

      <div className="control__section">
        <Checkbox
          title={t("enable")}
          htmlName="enabled"
          onChange={handleChange}
          value={reflectionSettings.enabled}
        />
      </div>

      {reflectionSettings.enabled && (
        <>
          <div className="control__section">
            <p className="title">{t("roughness")}</p>
            <Slider
              max={100}
              min={0}
              className="small"
              name="roughness"
              onChange={handleChange}
              step={0.01}
              value={String(reflectionSettings.roughness)}
            />
          </div>

          <div className="control__section">
            <p className="title">{t("treshold")}</p>
            <div className="position">
              <NumberInput
                label="-"
                name="minTreshold"
                value={reflectionSettings.minTreshold}
                onChange={handleChange}
              />
              <NumberInput
                label="+"
                name="maxTreshold"
                value={reflectionSettings.maxTreshold}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="control__section">
            <p className="title">{t("strength")}</p>
            <Slider
              max={100}
              min={0}
              className="small"
              name="strength"
              onChange={handleChange}
              step={0.01}
              value={String(reflectionSettings.strength)}
            />
          </div>
        </>
      )}
    </details>
  );
}
