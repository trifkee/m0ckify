import { LucideCamera } from "lucide-react";
import { useTranslations } from "next-intl";
import NumberInput from "../../atoms/NumberInput.atom";
import { useRecoilValue } from "recoil";
import { renderAtom } from "@/lib/atoms/generator";
import { IMAGE_TYPES } from "@/lib/constants/generator";
import useRender from "@/ui/hooks/useRender.hook";

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
          </div>
        </div>
      </div>
    </details>
  );
}
