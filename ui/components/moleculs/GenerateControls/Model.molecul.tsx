import { ChangeEvent, ChangeEventHandler } from "react";
import { useTranslations } from "next-intl";
import { useRecoilValue } from "recoil";

import { HexColorPicker } from "react-colorful";
import Slider from "../../atoms/Slider.atom";
import Checkbox from "../../atoms/Checkbox.atom";

import { ObjectsLayersAtom, selectedLayerAtom } from "@/lib/atoms/generator";
import { MODELS_LIST } from "@/lib/constants/generator";

import { LucideBox } from "lucide-react";
import useModel from "@/ui/hooks/useModel.hook";

export default function Model() {
  const t = useTranslations("generate");

  const {
    handleChangeReflection,
    handleChangeColor,
    handleModelChange,
    handleChangeModelStyle,
  } = useModel();

  const selectedLayer = useRecoilValue(selectedLayerAtom);
  const layers = useRecoilValue(ObjectsLayersAtom);

  const [obj] = layers.filter((n) => n.id === selectedLayer?.id);

  return (
    <details open={false} className="control model select">
      <summary className="control__title">
        {t("model.title")} <LucideBox />
      </summary>

      <div className="control__section">
        <p className="title">{t("model.style")}</p>
        <Checkbox
          htmlName="realistic"
          onChange={handleChangeModelStyle}
          title={t("model.style")}
          value={Boolean(obj?.realistic)}
        />
      </div>

      <div className="control__section">
        <p className="title">{t("model.bodyReflection")}</p>
        <Slider
          max={1}
          min={0}
          className="small"
          name="phone-reflection"
          onChange={(e) => handleChangeReflection(e, "phone")}
          step={0.01}
          value={String(obj?.bodyReflection)}
        />
      </div>

      <div className="control__section">
        <p className="title">{t("model.screenReflection")}</p>
        {/* TODO: THIS IS BY TYPE NUMBER, CHECK HOW TO MAKE ALPHA CHANNEL, FOR NOW THIS WILL BE LIKE BOOL ( 1 True, 0 False ) */}
        <Checkbox
          htmlName="screen-reflection"
          onChange={(e) => handleChangeReflection(e, "screen")}
          title={t("model.screenReflection")}
          value={Boolean(obj?.screenReflection)}
        />

        {selectedLayer?.layer.screenReflection ? (
          <Slider
            max={0.3}
            min={0}
            className="small"
            name="screen-reflection"
            onChange={(e) => handleChangeReflection(e, "screenAlpha")}
            step={0.01}
            value={String(obj?.screenAlphaReflection)}
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
          color={obj?.color}
          onChange={(e) => handleChangeColor(e)}
        />
      </div>
    </details>
  );
}
