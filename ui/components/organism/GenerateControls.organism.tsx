"use client";

import { useTranslations } from "next-intl";
import { Fragment, useEffect, useState } from "react";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "@/navigation";

import { HexColorPicker } from "react-colorful";
import Slider from "@/ui/components/atoms/Slider.atom";
import Checkbox from "@/ui/components/atoms/Checkbox.atom";
import Button from "@/ui/components/atoms/Button.atom";

import useUser from "@/ui/hooks/useUser.hook";

import { useGenerateImage } from "@/infrastructure/mutations/generate";

import { ENV_LIST, IMAGE_TYPES, MODELS_LIST } from "@/lib/constants/generator";

import { IoExitOutline, IoSaveSharp, IoSyncSharp } from "react-icons/io5";
import useGenerator from "@/ui/hooks/useGenerator.hook";
import { SceneLightsType, TabType } from "@/lib/types/model.type";

import mockifyImage from "@/public/images/bg.jpg";

import NumberInput from "../atoms/NumberInput.atom";
import {
  LucideCamera,
  LucideImage,
  LucideInfo,
  LucidePlusCircle,
  LucideSettings,
  LucideSmartphone,
  LucideSun,
  LucideTrash2,
  LucideUser2,
  LucideWand2,
} from "lucide-react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "@/lib/atoms/user";
import { openAiKeyAtom } from "@/lib/atoms/generator";

import "@/ui/styles/organism/generateControls.organism.scss";

const promptLen = 30;

export default function GenerateControls() {
  const t = useTranslations("generate");
  const router = useRouter();

  const { handleLogout } = useUser();

  const user = useRecoilValue(userAtom);
  const [openAiKey, setOpenAiKey] = useRecoilState(openAiKeyAtom);

  const [prompt, setPrompt] = useState("");

  const onSuccessGenerate = (data: any) => {
    handleReadAIImage(data.data.imgUrl ? data.data.imgUrl : mockifyImage);
  };

  const {
    mutate: generate,
    isPending: isGenerating,
    data,
  } = useGenerateImage(onSuccessGenerate);

  const handleGenerate = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    generate({ prompt, openAiKey });
  };

  useEffect(() => {
    isGenerating
      ? (document.title = "Generating...")
      : (document.title = "Mockify");
  }, [isGenerating]);

  const {
    model,
    sceneDocument,
    sceneLights,
    render,
    handleImageChange,
    handleChangeColor,
    handleReadAIImage,
    onChangeIntensity,
    handleChangeModelTexture,
    handleChangeShadow,
    handleDirLightPosition,
    handleSave,
    handleSelectChange,
    resetModelPosition,
    handleAddNewLight,
    handleRemoveLight,
    handleModelChange,
    handleImageSize,
    handleImagePosition,
    handleChangeReflection,
    handleChangeRenderSize,
    handleChangeRenderImageType,
  } = useGenerator();

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.title = sceneDocument.title;
    }, 2000);

    return () => clearTimeout(timeout);
  }, [sceneDocument]);

  // FNs
  const getMenu = (tab: TabType) => {
    switch (tab) {
      case "render":
        return (
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
                    onChange={handleChangeRenderSize}
                    value={render.w}
                  />
                  <NumberInput
                    name="h"
                    label="H"
                    onChange={handleChangeRenderSize}
                    value={render.h}
                  />
                </div>
              </div>

              <div className="control__section env select">
                <p className="title">{t("render.imageType")}</p>
                <select
                  onChange={(e) => handleChangeRenderImageType(e)}
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
        );

      case "magic":
        return (
          <div className="magic-container">
            <div className="magic">
              <div className="control__section">
                <p className="title">{t("magicfy.title")}</p>
                {data?.data.status === 500 && (
                  <>
                    <p className="title information">
                      {true || data?.data.message ? (
                        data?.data.message
                      ) : (
                        <>
                          {t("magicfy.errors.noCredit.0")}
                          <br />
                          <br />
                          {t("magicfy.errors.noCredit.1")}
                        </>
                      )}
                    </p>

                    <p className="title additional-info">
                      {t("magicfy.errors.noSavingKeys")}
                      <LucideInfo />
                    </p>
                    <input
                      className="input"
                      placeholder="OPEN AI API KEY"
                      value={openAiKey}
                      onChange={(e) => setOpenAiKey(e.target.value)}
                    />
                  </>
                )}
                <textarea
                  className="magic-input"
                  placeholder={t("magicfy.generateDescription")}
                  disabled={isGenerating}
                  value={
                    isGenerating ? "I am generating, please wait..." : prompt
                  }
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              {!isGenerating && (
                <Button
                  disabled={prompt.length < promptLen}
                  onClick={handleGenerate}
                  className={`magic ${prompt.length < promptLen && "disabled"}`}
                  variant="editor"
                >
                  {t("magicfy.cta")}
                  <LucideWand2 />
                </Button>
              )}
            </div>
          </div>
        );

      case "user":
        return (
          <div className="user-container">
            <div className="user">
              <Image src={mockifyImage} alt={user?.username ?? ""} />
              <p>{user?.username}</p>
            </div>
            <div className="logout">
              <Button variant="editor" onClick={handleLogout}>
                {t("user.logout")} <IoExitOutline />
              </Button>
            </div>
          </div>
        );

      case "image":
        return (
          <>
            <div className="image-container">
              {!model.image.isDefault ? (
                <img src={model.image.src as string} alt="model" />
              ) : (
                <>
                  <LucideImage />
                  <p style={{ fontSize: ".75rem" }}>{t("image.noImage")}</p>
                </>
              )}
            </div>

            <Button variant="editor">
              <p>{t("image.add")}</p>
              <LucideImage />

              <input
                onChange={handleImageChange}
                className="add-file"
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
              />
            </Button>

            <div
              className="position"
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <NumberInput
                name="iw"
                label="W"
                onChange={(e: any) => handleImageSize(e, "width")}
                value={model.image.width}
              />
              <NumberInput
                name="ih"
                label="H"
                onChange={(e: any) => handleImageSize(e, "height")}
                value={model.image.height}
              />
            </div>

            <div
              className="position"
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <NumberInput
                name="ix"
                label="X"
                onChange={(e: any) => handleImagePosition(e, "x")}
                value={model.image.x}
              />
              <NumberInput
                name="iy"
                label="Y"
                onChange={(e: any) => handleImagePosition(e, "y")}
                value={model.image.y}
              />
            </div>
          </>
        );

      case "environment":
        return (
          <>
            <div className="control__section env">
              <div className="control__section env">
                <p className="title">
                  {t("environment.ambientLight.intensity")}
                </p>

                <Slider
                  className=" small env-slider"
                  max={5}
                  min={0}
                  name="intensity"
                  step={0.01}
                  onChange={(e) => onChangeIntensity(e, "env")}
                  value={String(sceneDocument.env.intensity)}
                />
              </div>

              <p className="title">{t("environment.castShadow.title")}</p>

              <Checkbox
                title={t("environment.castShadow.shadow")}
                htmlName="castShadow"
                value={sceneDocument.env.castShadow}
                onChange={(e) => handleChangeShadow(e)}
              />
            </div>

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

            <div className="control__section ">
              <p className="title">{t("environment.ambientLight.color")}</p>
              <HexColorPicker
                color={sceneDocument.env.color}
                onChange={(e) => handleChangeColor(e, "ambient")}
              />
            </div>
          </>
        );

      case "lights":
        return (
          <>
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
                      max={250}
                      min={0}
                      name={t("lights.lights.intensity")}
                      step={1}
                      onChange={(e) => onChangeIntensity(e, "dirLights", i)}
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
                      onChange={(e) => handleChangeColor(e, "dirLight", i)}
                    />
                  </div>
                </details>
                <div className="divider"></div>
              </Fragment>
            ))}
          </>
        );

      case "model":
        return (
          <>
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
          </>
        );

      case "action":
        return (
          <>
            <div className="control__section">
              <Button
                onClick={resetModelPosition}
                variant="editor"
                className="danger  model__reset-cta"
              >
                <p>{t("actions.reset")}</p>
                <IoSyncSharp />
              </Button>
              <Button
                onClick={() =>
                  handleSave({
                    type: render.type,
                    w: render.w,
                    h: render.h,
                  })
                }
                variant="editor"
                className="download"
              >
                <p>{t("actions.download")}</p>
                <IoSaveSharp />
              </Button>
            </div>
          </>
        );
    }
  };

  // ---

  return (
    <>
      <motion.article
        initial={{
          x: 10,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          delay: 0.5,
        }}
        className="generate__controls"
      >
        {/* USER SECTION */}
        {user && (
          <motion.details
            initial={{
              x: 10,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0.85,
            }}
            className="control user"
          >
            <summary className="control__title">
              {t("user.title")} <LucideUser2 />
            </summary>
            {getMenu("user")}
          </motion.details>
        )}

        {/* MAGICFY */}
        <motion.details
          initial={{
            x: 10,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.85,
          }}
          open
          className="control user"
        >
          <summary className="control__title">
            {t("magicfy.title")} <LucideWand2 />
          </summary>
          {getMenu("magic")}
        </motion.details>

        {/* RENDER */}
        <motion.details
          initial={{
            x: 10,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.85,
          }}
          className="control image"
        >
          <summary className="control__title">
            {t("render.title")} <LucideCamera />
          </summary>

          <div className="control__section">{getMenu("render")}</div>
        </motion.details>

        {/* IMAGE */}
        <motion.details
          initial={{
            x: 10,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.85,
          }}
          className="control image"
        >
          <summary className="control__title">
            {t("image.title")} <LucideImage />
          </summary>

          <div className="control__section">{getMenu("image")}</div>
        </motion.details>

        {/* MODEL */}
        <motion.details
          initial={{
            x: 10,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.95,
          }}
          className="control model select"
        >
          <summary className="control__title">
            {t("model.title")} <LucideSmartphone />
          </summary>
          {getMenu("model")}
        </motion.details>

        {/* ENV */}
        <motion.details
          initial={{
            x: 10,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            delay: 1,
          }}
          className="control env select"
        >
          <summary className="control__title">
            {t("environment.title")} <LucideSun />
          </summary>
          {getMenu("environment")}
        </motion.details>

        {/* LIGHTS */}
        <motion.details
          initial={{
            x: 10,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            delay: 1.15,
          }}
          className="control"
        >
          <summary className="control__title flex">
            <p>
              {t("lights.title")}

              {sceneLights.length > 0 && (
                <span style={{ fontSize: ".75rem", fontWeight: "lighter" }}>
                  {" "}
                  • {sceneLights.length}
                </span>
              )}
            </p>

            <Button onClick={handleAddNewLight} variant="editor">
              {t("lights.add")} <LucidePlusCircle />
            </Button>
            {/* <IoBulb /> */}
          </summary>

          {getMenu("lights")}
        </motion.details>

        {/* ACTIONS */}
        <motion.details
          initial={{
            x: 10,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            delay: 1.25,
          }}
          className="control actions"
        >
          <summary className="control__title">
            {t("actions.title")} <LucideSettings />
          </summary>
          {getMenu("action")}
        </motion.details>
      </motion.article>
    </>
  );
}
