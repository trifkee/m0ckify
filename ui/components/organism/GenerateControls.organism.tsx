"use client";

import { ModelType, SceneDocumentType } from "@/lib/types/model.type";
import Button from "@/ui/components/atoms/Button.atom";
import { useContext, useEffect } from "react";

import { readUserImage, saveImageFromCanvas } from "@/lib/helpers/model";

import { IoImageSharp, IoSaveSharp, IoSyncSharp } from "react-icons/io5";

import { useTranslations } from "next-intl";
import Context from "@/ui/providers/ContextProvider.provider";
import Slider from "../atoms/Slider.atom";
import { ENV_LIST, MODELS_LIST, TEXTURE_LIST } from "@/lib/constants/generator";

import { HexColorPicker } from "react-colorful";
import Checkbox from "../atoms/Checkbox.atom";
import { AnyTxtRecord } from "dns";

export default function GenerateControls() {
  const { model, setModel, sceneDocument, setSceneDocument } =
    useContext(Context);
  const t = useTranslations("generate");

  const handleSave = () => {
    saveImageFromCanvas({ title: sceneDocument.title });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];

    if (!image) return;

    handleReadImage(image);
  };

  const handleChangeColor = (
    color: string,
    type: "model" | "ambient" | "leftDirectional" | "rightDirectional"
  ) => {
    if (type === "model") {
      setModel((prev: ModelType) => ({
        ...prev,
        color: color,
      }));

      return;
    }

    if (type === "ambient") {
      setSceneDocument((prev: SceneDocumentType) => ({
        ...prev,
        env: {
          ...prev.env,
          color: color,
        },
      }));
    }

    if (type === "leftDirectional" || type === "rightDirectional") {
      setSceneDocument((prev: SceneDocumentType) => ({
        ...prev,
        lights: {
          ...prev.lights,
          [type]: {
            ...prev.lights[type],
            color,
          },
        },
      }));
    }
  };

  const handleReadImage = (file: File) =>
    readUserImage(file).then((result) => {
      setModel((prev: ModelType) => ({
        ...prev,
        image: {
          src: result,
          isDefault: false,
        },
      }));
    });

  const resetModelPosition = () => {
    setModel((prev: ModelType) => ({
      ...prev,
      position: {
        x: 0,
        y: 0,
      },
    }));
  };

  const handleSelectChange = (e: any, type: string) => {
    const value = e.target.value;

    if (type === "env") {
      setSceneDocument((prev: SceneDocumentType) => ({
        ...prev,
        env: {
          ...prev.env,
          preset: value,
        },
      }));

      return;
    }
  };

  const onChangeIntensity = (
    e: any,
    type: "env" | "leftDirectional" | "rightDirectional"
  ) => {
    if (type === "env") {
      setSceneDocument((prev: SceneDocumentType) => ({
        ...prev,
        env: {
          ...prev.env,
          intensity: Number(e.target.value),
        },
      }));

      return;
    }

    if (type === "leftDirectional" || type === "rightDirectional") {
      setSceneDocument((prev: SceneDocumentType) => ({
        ...prev,
        lights: {
          ...prev.lights,
          [type]: {
            ...prev.lights[type],
            intensity: Number(e.target.value),
          },
        },
      }));

      return;
    }
  };

  const handleChangeShadow = (e: any) => {
    setSceneDocument((prev: SceneDocumentType) => ({
      ...prev,
      env: {
        ...prev.env,
        castShadow: e.target.checked ? true : false,
      },
    }));
  };

  const handleChangeModelTexture = (e: any) => {
    setModel((prev: ModelType) => ({
      ...prev,
      texture: e.target.name,
    }));
  };

  const handleDirLightPosition = (
    e: any,
    axis: "x" | "y" | "z",
    position: "leftDirectional" | "rightDirectional"
  ) => {
    setSceneDocument((prev: SceneDocumentType) => ({
      ...prev,
      lights: {
        ...prev.lights,
        [position]: {
          ...prev.lights[position],
          position: {
            ...prev.lights[position].position,
            [axis]: Number(e.target.value),
          },
        },
      },
    }));
  };

  return (
    <article className="generate__controls">
      <article className="control image">
        <p className="control__title">Image</p>

        <div className="image-container">
          {!model.image.isDefault ? (
            <img src={model.image.src} alt="model" />
          ) : (
            <>
              <IoImageSharp />
              <p style={{ fontSize: ".75rem" }}>Add Image</p>
            </>
          )}
        </div>

        <Button variant="secondary">
          <p>{t("controls.upload")}</p>
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
        <p className="control__title">Model</p>

        <div className="control__section">
          <p className="title">Model Texture</p>

          <div className="textures">
            {TEXTURE_LIST.map((texture, i) => (
              <Checkbox
                key={i}
                title={texture.name}
                htmlName={texture.name}
                value={texture.name === model.texture}
                onChange={(e) => handleChangeModelTexture(e)}
              />
            ))}
          </div>
        </div>

        <div className="control__section">
          <p className="title">Model Type</p>

          <select defaultValue={MODELS_LIST[0].title}>
            {MODELS_LIST.map((model) => {
              return (
                <option key={model.id} value={model.id}>
                  {model.title}
                </option>
              );
            })}
          </select>
        </div>

        <div className="control__section ">
          <p className="title">Model Color</p>
          <HexColorPicker
            color={model.color}
            onChange={(e) => handleChangeColor(e, "model")}
          />
        </div>
      </article>
      <article className="control env select">
        <p className="control__title">Envrionment</p>

        <div className="control__section env select">
          <p className="title">Preset</p>

          <select
            onChange={(e) => handleSelectChange(e, "env")}
            defaultValue={ENV_LIST[0].title}
          >
            {ENV_LIST.map((env) => {
              return (
                <option key={env.id} value={env.name}>
                  {env.title}
                </option>
              );
            })}
          </select>
        </div>

        <div className="control__section env">
          <p className="title">Cast shadow</p>

          <Checkbox
            title="Shadows"
            htmlName="castShadow"
            value={sceneDocument.env.castShadow}
            onChange={(e) => handleChangeShadow(e)}
          />
        </div>

        <div className="control__section env">
          <p className="title">Ambient Light Intensity</p>

          <Slider
            className="env-slider"
            max={1}
            min={0}
            name="intensity"
            step={0.01}
            onChange={(e) => onChangeIntensity(e, "env")}
            value={sceneDocument.env.intensity}
          />
        </div>

        <div className="control__section ">
          <p className="title">Ambient Light Color</p>
          <HexColorPicker
            color={sceneDocument.env.color}
            onChange={(e) => handleChangeColor(e, "ambient")}
          />
        </div>
      </article>

      <article className="control">
        <p className="control__title">Lights</p>

        <div className="control__section">
          <p className="title">Left directional light</p>

          <p className="title">Intensity</p>

          <Slider
            className="env-slider"
            max={1}
            min={0}
            name="intensity"
            step={0.01}
            onChange={(e) => onChangeIntensity(e, "leftDirectional")}
            value={sceneDocument.lights.leftDirectional.intensity}
          />

          <p className="title">Position</p>
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

          <p className="title">Color</p>
          <HexColorPicker
            color={sceneDocument.lights.leftDirectional.color}
            onChange={(e) => handleChangeColor(e, "leftDirectional")}
          />
        </div>

        <div className="divider"></div>

        <div className="control__section">
          <p className="title">Right directional light</p>

          <p className="title">Intensity</p>

          <Slider
            className="env-slider"
            max={1}
            min={0}
            name="intensity"
            step={0.01}
            onChange={(e) => onChangeIntensity(e, "rightDirectional")}
            value={sceneDocument.lights.rightDirectional.intensity}
          />

          <p className="title">Position</p>
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

          <p className="title">Color</p>
          <HexColorPicker
            color={sceneDocument.lights.rightDirectional.color}
            onChange={(e) => handleChangeColor(e, "rightDirectional")}
          />
        </div>
      </article>

      <article className="control">
        <p className="control__title">Actions</p>

        <Button onClick={handleSave} className="download">
          <p>{t("controls.download")}</p>
          <IoSaveSharp />
        </Button>

        <Button
          onClick={resetModelPosition}
          variant="danger"
          className="model__reset-cta"
        >
          <p>{t("controls.reset-position")}</p>
          <IoSyncSharp />
        </Button>
      </article>
    </article>
  );
}
