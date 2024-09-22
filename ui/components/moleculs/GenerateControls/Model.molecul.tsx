import { ChangeEventHandler } from "react";
import { useTranslations } from "next-intl";
import { useRecoilValue } from "recoil";

import { HexColorPicker } from "react-colorful";
import Slider from "../../atoms/Slider.atom";
import Checkbox from "../../atoms/Checkbox.atom";

import { modelAtom } from "@/lib/atoms/generator";
import { MODELS_LIST } from "@/lib/constants/generator";

import { LucideBox } from "lucide-react";

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
  const model = useRecoilValue(modelAtom);

  return (
    <details className="control model select">
      <summary className="control__title">
        {t("model.title")} <LucideBox />
      </summary>

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
