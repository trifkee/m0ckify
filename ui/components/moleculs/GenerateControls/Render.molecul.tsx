import { LucideCamera } from "lucide-react";
import { useTranslations } from "next-intl";
import NumberInput from "../../atoms/NumberInput.atom";
import { useRecoilValue } from "recoil";
import { renderAtom } from "@/lib/atoms/generator";
import { IMAGE_TYPES } from "@/lib/constants/generator";
import useRender from "@/ui/hooks/useRender.hook";
import Slider from "../../atoms/Slider.atom";

function checkQuality(quality: number) {
  if (quality == 0) {
    return "Low";
  }

  if (quality == 0.25) {
    return "Bad";
  }

  if (quality == 0.5) {
    return "Good";
  }

  if (quality == 0.75) {
    return "Very Good";
  }

  return "Best";
}

export default function Render() {
  const t = useTranslations("generate");

  const { handleChange } = useRender();

  const render = useRecoilValue(renderAtom);

  return (
    <details className="control image">
      <summary className="control__title">
        {t("render.title")} <LucideCamera />
      </summary>

      <div className="control__section">
        <div className="render-container">
          <div className="render">
            <div className="control__section">
              <p className="title">{t("render.imageSize")}</p>
              <div
                className="position"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <NumberInput
                  name="w"
                  label="W"
                  onChange={handleChange}
                  value={render.w}
                />
                <NumberInput
                  name="h"
                  label="H"
                  onChange={handleChange}
                  value={render.h}
                />
              </div>
            </div>

            <div className="control__section env select">
              <p className="title">{t("render.imageType")}</p>
              <select
                name="type"
                onChange={handleChange}
                defaultValue={IMAGE_TYPES[0]}
              >
                {IMAGE_TYPES.map((type) => {
                  return (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="control__section render-quality">
              <p className="title">
                {t("render.quality")}
                <span className={checkQuality(render.quality)}>
                  {checkQuality(render.quality)}
                </span>
              </p>
              <Slider
                max={1}
                min={0}
                className="small"
                name="quality"
                onChange={handleChange}
                step={0.25}
                value={String(render.quality)}
              />
            </div>
          </div>
        </div>
      </div>
    </details>
  );
}
