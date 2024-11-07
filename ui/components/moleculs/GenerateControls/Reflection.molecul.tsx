"use client";

import { ChangeEvent } from "react";
import { useRecoilValue } from "recoil";

import Slider from "@/ui/components/atoms/Slider.atom";
import Checkbox from "@/ui/components/atoms/Checkbox.atom";
import NumberInput from "@/ui/components/atoms/NumberInput.atom";

import useGenerator from "@/ui/hooks/useGenerator.hook";

import { floorReflectionAtom } from "@/lib/atoms/generator";

import { FlipVertical2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Reflection() {
  const t = useTranslations("generate.general.reflections");
  const { handleReflectionEnable, handleReflectionInputs } = useGenerator();

  const reflectionSettings = useRecoilValue(floorReflectionAtom);

  return (
    <details className="control reflection">
      <summary className="control__title">
        {t("title")} <FlipVertical2 />
      </summary>

      <div className="control__section">
        <Checkbox
          title={t("enable")}
          htmlName="floorReflection"
          onChange={(e) => handleReflectionEnable(e)}
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
              onChange={(e) => handleReflectionInputs(e)}
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleReflectionInputs(e)
                }
              />
              <NumberInput
                label="+"
                name="maxTreshold"
                value={reflectionSettings.maxTreshold}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleReflectionInputs(e)
                }
              />
            </div>
          </div>

          <div className="control__section">
            <p className="title">{t("strength")}</p>
            <Slider
              max={2}
              min={0}
              className="small"
              name="strength"
              onChange={(e) => handleReflectionInputs(e)}
              step={0.01}
              value={String(reflectionSettings.strength)}
            />
          </div>
        </>
      )}
    </details>
  );
}
