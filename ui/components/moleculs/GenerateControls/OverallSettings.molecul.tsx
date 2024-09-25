import { canvasOptionsAtom } from "@/lib/atoms/generator";
import {
  LucideAperture,
  LucideMoreHorizontal,
  LucidePaintbrush2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRecoilState } from "recoil";
import Slider from "../../atoms/Slider.atom";
import { ChangeEvent, useEffect } from "react";
import { TONE_MAPPINGS } from "@/lib/constants/generator";
import Checkbox from "../../atoms/Checkbox.atom";

export default function OverallSettings() {
  const t = useTranslations("generate");

  const [canvasSettings, setCanvasSettings] = useRecoilState(canvasOptionsAtom);

  const handleUpdateCanvasBrightness = (e: ChangeEvent<HTMLInputElement>) => {
    setCanvasSettings((prev: any) => ({
      ...prev,
      toneMappingExposure: e.target.value,
    }));
  };

  const handleToneMappingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    return setCanvasSettings((prev: any) => ({
      ...prev,
      toneMapping: e.target.value,
    }));
  };

  const handleChangeGridShow = (e: ChangeEvent<HTMLInputElement>) => {
    return setCanvasSettings((prev: any) => ({
      ...prev,
      grid: e.target.checked,
    }));
  };

  return (
    <details className="control model select">
      <summary className="control__title">
        {t("general.title")}
        {/* <LucidePaintbrush2 /> */}
        <LucideMoreHorizontal />
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
        <summary className="title">{t("general.preset")}</summary>

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
