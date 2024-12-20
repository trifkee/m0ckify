import { sceneDocumentAtom } from "@/lib/atoms/generator";
import { ENV_LIST } from "@/lib/constants/generator";
import { LucideSun } from "lucide-react";
import { useTranslations } from "next-intl";
import { HexColorPicker } from "react-colorful";
import { useRecoilValue } from "recoil";
import Checkbox from "../../atoms/Checkbox.atom";
import Slider from "../../atoms/Slider.atom";
import useDocument from "@/ui/hooks/useDocument.hook";

export default function Env() {
  const t = useTranslations("generate");

  const { handleChangeColor, handleChange } = useDocument();

  const sceneDocument = useRecoilValue(sceneDocumentAtom);

  return (
    <details className="control env select">
      <summary className="control__title">
        {t("environment.title")} <LucideSun />
      </summary>

      <div className="control__section env">
        <div className="control__section env">
          <p className="title">{t("environment.ambientLight.intensity")}</p>

          <Slider
            className=" small env-slider"
            max={5}
            min={0}
            name="intensity"
            step={0.01}
            onChange={handleChange}
            value={String(sceneDocument.env.intensity)}
          />
        </div>

        <p className="title">{t("environment.castShadow.title")}</p>

        <Checkbox
          title={t("environment.castShadow.shadow")}
          htmlName="castShadow"
          value={sceneDocument.env.castShadow}
          onChange={handleChange}
        />
      </div>

      <div className="control__section env select">
        <p className="title">{t("environment.preset")}</p>

        <select
          name="preset"
          onChange={handleChange}
          defaultValue={ENV_LIST[0].title}
        >
          {ENV_LIST.map((env) => {
            return (
              <option key={env.id} value={env.name}>
                {t(`environment.list.${env.title.toLowerCase()}`)}
              </option>
            );
          })}
        </select>
      </div>

      <div className="control__section ">
        <p className="title">{t("environment.ambientLight.color")}</p>
        <HexColorPicker
          color={sceneDocument.env.color}
          onChange={handleChangeColor}
        />
      </div>
    </details>
  );
}
