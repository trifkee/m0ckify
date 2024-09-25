import { ChangeEvent, ChangeEventHandler } from "react";
import { useTranslations } from "next-intl";
import { useRecoilState, useRecoilValue } from "recoil";

import { HexColorPicker } from "react-colorful";
import Slider from "../../atoms/Slider.atom";
import Checkbox from "../../atoms/Checkbox.atom";

import { modelAtom } from "@/lib/atoms/generator";
import { MODELS_LIST } from "@/lib/constants/generator";

import { LucideBox } from "lucide-react";
import { ModelType } from "@/lib/types/model.type";
import NumberInput from "../../atoms/NumberInput.atom";

export default function Model({
  handleChangeReflection,
  handleChangeColor,
  handleModelChange,
}: {
  handleChangeColor: CallableFunction;
  handleChangeReflection: CallableFunction;
  handleModelChange: ChangeEventHandler<HTMLSelectElement>;
}) {
  const t = useTranslations("generate");
  const [model, setModel] = useRecoilState(modelAtom);

  const handleChangePosition = (
    e: ChangeEvent<HTMLInputElement>,
    axis: "x" | "y" | "z"
  ) => {
    return setModel((prev: ModelType) => ({
      ...prev,
      position: {
        ...prev.position,
        [axis]: e.target.value,
      },
    }));
  };

  return (
    <details className="control model select">
      <summary className="control__title">
        {t("model.title")} <LucideBox />
      </summary>

      <div className="control__section">
        <p className="title">{t("model.rotation")}</p>

        <div className="position">
          <NumberInput
            name="lx"
            label="X"
            step={0.02}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangePosition(e, "x")
            }
            value={model.position.x}
          />
          <NumberInput
            name="ly"
            step={0.02}
            label="Y"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangePosition(e, "y")
            }
            value={model.position.y}
          />
          <NumberInput
            name="lz"
            step={0.02}
            label="Z"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangePosition(e, "z")
            }
            value={model.position.z}
          />
        </div>
      </div>

      {/*TODO : ADD LATER TEXTURES FOR THE MODEL */}
      {/* <div className="control__section">
              <p className="title">{t("model.texture.title")}</p>

              <div className="textures">
                {TEXTURE_LIST.map((texture, i) => (
                  <Checkbox
                    key={i}
                    title={t(`model.texture.texture.${texture.name}`)}
                    htmlName={texture.name}
                    value={texture.name === model.texture}
                    onChange={(e) => handleChangeModelTexture(e)}
                  />
                ))}
              </div>
            </div> */}

      <div className="control__section">
        <p className="title">{t("model.bodyReflection")}</p>
        <Slider
          max={1}
          min={0}
          className="small"
          name="phone-reflection"
          onChange={(e) => handleChangeReflection(e, "phone")}
          step={0.01}
          value={String(model.bodyReflection)}
        />
      </div>

      <div className="control__section">
        <p className="title">{t("model.screenReflection")}</p>
        {/* TODO: THIS IS BY TYPE NUMBER, CHECK HOW TO MAKE ALPHA CHANNEL, FOR NOW THIS WILL BE LIKE BOOL ( 1 True, 0 False ) */}
        <Checkbox
          htmlName="screen-reflection"
          onChange={(e) => handleChangeReflection(e, "screen")}
          title={t("model.screenReflection")}
          value={Boolean(model.screenReflection)}
        />

        {model.screenReflection ? (
          <Slider
            max={0.3}
            min={0}
            className="small"
            name="screen-reflection"
            onChange={(e) => handleChangeReflection(e, "screenAlpha")}
            step={0.01}
            value={String(model.screenAlphaReflection)}
          />
        ) : null}
      </div>

      <div className="control__section">
        <summary className="title">{t("model.type.title")}</summary>

        <select
          onChange={handleModelChange}
          defaultValue={MODELS_LIST[0].title}
        >
          {MODELS_LIST.map((model) => {
            return (
              <option key={model.id} value={model.model}>
                {t(`model.type.types.${model.title.toLowerCase()}`)}
              </option>
            );
          })}
        </select>
      </div>

      <div className="control__section ">
        <p className="title">{t("model.color.title")}</p>
        <HexColorPicker
          color={model.color}
          onChange={(e) => handleChangeColor(e, "model")}
        />
      </div>
    </details>
  );
}
