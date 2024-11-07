import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { HexColorPicker } from "react-colorful";

import NumberInput from "../../atoms/NumberInput.atom";
import Button from "../../atoms/Button.atom";
import Slider from "../../atoms/Slider.atom";

import { LucidePlusCircle, LucideTrash2 } from "lucide-react";

import { SceneLightsType } from "@/lib/types/model.type";
import { useRecoilValue } from "recoil";
import { sceneLightsAtom } from "@/lib/atoms/generator";
import useLights from "@/ui/hooks/useLights.hook";

export default function Lights() {
  const {
    handleChangeColor,
    handleRemoveLight,
    handleAddNewLight,
    onChangeIntensity,
    handleDirLightPosition,
  } = useLights();

  const t = useTranslations("generate");
  const sceneLights = useRecoilValue(sceneLightsAtom);

  return (
    <details className="control">
      <summary className="control__title flex">
        <p>
          {t("lights.title")}

          {sceneLights.length > 0 && (
            <span style={{ fontSize: ".75rem", fontWeight: "lighter" }}>
              • {sceneLights.length}
            </span>
          )}
        </p>

        <Button onClick={handleAddNewLight} variant="editor">
          {t("lights.add")} <LucidePlusCircle />
        </Button>
      </summary>

      {sceneLights.map((light: SceneLightsType, i: number) => (
        <Fragment key={i}>
          <details className="control__section">
            <summary className="title flex">
              {t("lights.lights.title") + " " + (i + 1)}{" "}
              <Button
                variant="editor"
                className="danger"
                onClick={() => handleRemoveLight(i)}
              >
                <LucideTrash2 />
              </Button>
            </summary>

            <div className="control__section">
              <p className="title">{t("lights.lights.intensity")}</p>
              <Slider
                className="small env-slider"
                max={25}
                min={0}
                name={t("lights.lights.intensity")}
                step={1}
                onChange={(e) => onChangeIntensity(e, i)}
                value={String(light.intensity)}
              />

              <p className="title">{t("lights.lights.position")}</p>
              <div className="position">
                <NumberInput
                  name="lx"
                  label="X"
                  onChange={(e: any) => handleDirLightPosition(e, "x", i)}
                  value={light.position.x}
                />
                <NumberInput
                  name="ly"
                  label="Y"
                  onChange={(e: any) => handleDirLightPosition(e, "y", i)}
                  value={light.position.y}
                />
                <NumberInput
                  name="lz"
                  label="Z"
                  onChange={(e: any) => handleDirLightPosition(e, "z", i)}
                  value={light.position.z}
                />
              </div>

              <p className="title">{t("lights.lights.color")}</p>
              <HexColorPicker
                color={light.color}
                onChange={(e) => handleChangeColor(e, i)}
              />
            </div>
          </details>
          <div className="divider"></div>
        </Fragment>
      ))}
    </details>
  );
}
