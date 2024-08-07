"use client";

import { useTranslations } from "next-intl";

import { HexColorPicker } from "react-colorful";
import Slider from "@/ui/components/atoms/Slider.atom";
import Checkbox from "@/ui/components/atoms/Checkbox.atom";
import Button from "@/ui/components/atoms/Button.atom";

import { ENV_LIST, MODELS_LIST, TEXTURE_LIST } from "@/lib/constants/generator";

import { IoImageSharp, IoSaveSharp, IoSyncSharp } from "react-icons/io5";
import useGenerator from "@/ui/hooks/useGenerator.hook";

export default function GenerateControls() {
  const t = useTranslations("generate");

  const {
    model,
    sceneDocument,
    handleImageChange,
    handleChangeColor,
    onChangeIntensity,
    handleChangeModelTexture,
    handleChangeShadow,
    handleDirLightPosition,
    handleSave,
    handleSelectChange,
    resetModelPosition,
  } = useGenerator();

  return (
    <article className="generate__controls">
      <article className="control image">
        <p className="control__title">{t("image.title")}</p>

        <div className="image-container">
          {!model.image.isDefault ? (
            <img src={model.image.src} alt="model" />
          ) : (
            <>
              <IoImageSharp />
              <p style={{ fontSize: ".75rem" }}>{t("image.noImage")}</p>
            </>
          )}
        </div>

        <Button variant="secondary">
          <p>{t("image.add")}</p>
          <IoImageSharp />

          <input
            onChange={handleImageChange}
            className="add-file"
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
          />
        </Button>
      </article>

      <article className="control model select">
        <p className="control__title">{t("model.title")}</p>

        <div className="control__section">
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
        </div>

        <div className="control__section">
          <p className="title">{t("model.type.title")}</p>

          <select defaultValue={MODELS_LIST[0].title}>
            {MODELS_LIST.map((model) => {
              return (
                <option key={model.id} value={model.id}>
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
      </article>
      <article className="control env select">
        <p className="control__title">{t("environment.title")}</p>

        <div className="control__section env select">
          <p className="title">{t("environment.preset")}</p>

          <select
            onChange={(e) => handleSelectChange(e, "env")}
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

        <div className="control__section env">
          <p className="title">{t("environment.castShadow.title")}</p>

          <Checkbox
            title={t("environment.castShadow.shadow")}
            htmlName="castShadow"
            value={sceneDocument.env.castShadow}
            onChange={(e) => handleChangeShadow(e)}
          />
        </div>

        <div className="control__section env">
          <p className="title">{t("environment.ambientLight.intensity")}</p>

          <Slider
            className=" small env-slider"
            max={1}
            min={0}
            name="intensity"
            step={0.01}
            onChange={(e) => onChangeIntensity(e, "env")}
            value={sceneDocument.env.intensity}
          />
        </div>

        <div className="control__section ">
          <p className="title">{t("environment.ambientLight.color")}</p>
          <HexColorPicker
            color={sceneDocument.env.color}
            onChange={(e) => handleChangeColor(e, "ambient")}
          />
        </div>
      </article>

      <article className="control">
        <p className="control__title">{t("lights.title")}</p>

        <div className="control__section">
          <p className="title">{t("lights.lDirLight.title")}</p>

          <p className="title">{t("lights.lDirLight.intensity")}</p>

          <Slider
            className="small env-slider"
            max={1}
            min={0}
            name={t("lights.lDirLight.intensity")}
            step={0.01}
            onChange={(e) => onChangeIntensity(e, "leftDirectional")}
            value={sceneDocument.lights.leftDirectional.intensity}
          />

          <p className="title">{t("lights.lDirLight.position")}</p>
          <div className="position">
            <input
              type="number"
              name="lx"
              id="lx"
              onChange={(e) =>
                handleDirLightPosition(e, "x", "leftDirectional")
              }
              value={sceneDocument.lights.leftDirectional.position.x}
            />
            <input
              type="number"
              name="ly"
              id="ly"
              onChange={(e) =>
                handleDirLightPosition(e, "y", "leftDirectional")
              }
              value={sceneDocument.lights.leftDirectional.position.y}
            />
            <input
              type="number"
              name="lz"
              id="lx"
              onChange={(e) =>
                handleDirLightPosition(e, "z", "leftDirectional")
              }
              value={sceneDocument.lights.leftDirectional.position.z}
            />
          </div>

          <p className="title">{t("lights.lDirLight.color")}</p>
          <HexColorPicker
            color={sceneDocument.lights.leftDirectional.color}
            onChange={(e) => handleChangeColor(e, "leftDirectional")}
          />
        </div>

        <div className="divider"></div>

        <div className="control__section">
          <p className="title">{t("lights.rDirLight.title")}</p>

          <p className="title">{t("lights.rDirLight.intensity")}</p>

          <Slider
            className="small env-slider"
            max={1}
            min={0}
            name={t("lights.rDirLight.intensity")}
            step={0.01}
            onChange={(e) => onChangeIntensity(e, "rightDirectional")}
            value={sceneDocument.lights.rightDirectional.intensity}
          />

          <p className="title">{t("lights.rDirLight.position")}</p>
          <div className="position">
            <input
              type="number"
              name="lx"
              id="lx"
              onChange={(e) =>
                handleDirLightPosition(e, "x", "rightDirectional")
              }
              value={sceneDocument.lights.rightDirectional.position.x}
            />
            <input
              type="number"
              name="ly"
              id="ly"
              onChange={(e) =>
                handleDirLightPosition(e, "y", "rightDirectional")
              }
              value={sceneDocument.lights.rightDirectional.position.y}
            />
            <input
              type="number"
              name="lz"
              id="lx"
              onChange={(e) =>
                handleDirLightPosition(e, "z", "rightDirectional")
              }
              value={sceneDocument.lights.rightDirectional.position.z}
            />
          </div>

          <p className="title">{t("lights.rDirLight.color")}</p>
          <HexColorPicker
            color={sceneDocument.lights.rightDirectional.color}
            onChange={(e) => handleChangeColor(e, "rightDirectional")}
          />
        </div>
      </article>

      <article className="control">
        <p className="control__title">{t("actions.title")}</p>
        <Button
          onClick={resetModelPosition}
          variant="danger"
          className="model__reset-cta"
        >
          <p>{t("actions.reset")}</p>
          <IoSyncSharp />
        </Button>
        <Button onClick={handleSave} className="download">
          <p>{t("actions.download")}</p>
          <IoSaveSharp />
        </Button>
      </article>
    </article>
  );
}
