"use client";

import { useTranslations } from "next-intl";
import { Fragment, useContext, useEffect, useState } from "react";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "@/navigation";

import { HexColorPicker } from "react-colorful";
import Slider from "@/ui/components/atoms/Slider.atom";
import Checkbox from "@/ui/components/atoms/Checkbox.atom";
import Button from "@/ui/components/atoms/Button.atom";

import { useGenerateImage } from "@/infrastructure/mutations/generate";

import {
  ENV_LIST,
  MODELS_LIST,
  STARTING_PROPMPT,
  TEXTURE_LIST,
} from "@/lib/constants/generator";

import {
  IoAdd,
  IoBulb,
  IoColorWand,
  IoExitOutline,
  IoImage,
  IoImageSharp,
  IoInformationCircle,
  IoPartlySunny,
  IoPerson,
  IoPersonOutline,
  IoPhonePortrait,
  IoSaveSharp,
  IoSettings,
  IoSunny,
  IoSyncSharp,
  IoTrashBinSharp,
} from "react-icons/io5";
import useGenerator from "@/ui/hooks/useGenerator.hook";
import { SceneLightsType } from "@/lib/types/model.type";

import Context from "@/ui/providers/ContextProvider.provider";

import mockifyImage from "@/public/images/bg.jpg";

import "@/ui/styles/organism/generateControls.organism.scss";

type TabType =
  | "image"
  | "magic"
  | "model"
  | "environment"
  | "lights"
  | "action"
  | "user";

const promptLen = 30;

export default function GenerateControls() {
  const t = useTranslations("generate");
  const router = useRouter();

  const { user, handleLogout, setOpenAiKey, openAiKey } = useContext(Context);

  const [prompt, setPrompt] = useState("");
  const {
    mutate: generate,
    isPending: isGenerating,
    data,
  } = useGenerateImage();

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
    handleImageChange,
    handleChangeColor,
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
  } = useGenerator();

  const getMenu = (tab: TabType) => {
    switch (tab) {
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
                          Hey, looks like we are run out of tokens on our
                          account.
                          <br />
                          <br />
                          If u want to try our product fell free to set your own
                          API key and continue using APP.
                        </>
                      )}
                    </p>

                    <p className="title additional-info">
                      Your key won't be saved! <IoInformationCircle />
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
                  value={prompt}
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
                  <IoColorWand />
                </Button>
              )}
            </div>
          </div>
        );

      case "user":
        return (
          <div className="user-container">
            <div className="user">
              <Image src={mockifyImage} alt={user?.username} />
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
                <img src={model.image.src} alt="model" />
              ) : (
                <>
                  <IoImageSharp />
                  <p style={{ fontSize: ".75rem" }}>{t("image.noImage")}</p>
                </>
              )}
            </div>

            <Button variant="editor">
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

            <div
              className="position"
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <div className="input-label">
                <label htmlFor="iw">W</label>
                <input
                  type="number"
                  name="iw"
                  id="iw"
                  onChange={(e) => handleImageSize(e, "width")}
                  value={model.image.width}
                />
              </div>
              <div className="input-label">
                <label htmlFor="ig">H</label>
                <input
                  type="number"
                  name="ih"
                  id="ih"
                  onChange={(e) => handleImageSize(e, "height")}
                  value={model.image.height}
                />
              </div>
            </div>

            <div
              className="position"
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <div className="input-label">
                <label htmlFor="iw">X</label>
                <input
                  type="number"
                  name="iw"
                  id="iw"
                  onChange={(e) => handleImagePosition(e, "x")}
                  value={model.image.x}
                />
              </div>

              <div className="input-label">
                <label htmlFor="ig">Y</label>
                <input
                  type="number"
                  name="ih"
                  id="ih"
                  onChange={(e) => handleImagePosition(e, "y")}
                  value={model.image.y}
                />
              </div>
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
                  value={sceneDocument.env.intensity}
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
                      <IoTrashBinSharp />
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
                      <div className="input-label">
                        <label htmlFor="lx">X</label>
                        <input
                          type="number"
                          name="lx"
                          id="lx"
                          onChange={(e) => handleDirLightPosition(e, "x", i)}
                          value={light.position.x}
                        />
                      </div>
                      <div className="input-label">
                        <label htmlFor="ly">Y</label>
                        <input
                          type="number"
                          name="ly"
                          id="ly"
                          onChange={(e) => handleDirLightPosition(e, "y", i)}
                          value={light.position.y}
                        />
                      </div>
                      <div className="input-label">
                        <label htmlFor="lz">Z</label>
                        <input
                          type="number"
                          name="lz"
                          id="lz"
                          onChange={(e) => handleDirLightPosition(e, "z", i)}
                          value={light.position.z}
                        />
                      </div>
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
                value={model.bodyReflection}
              />
            </div>

            <div className="control__section">
              <p className="title">{t("model.screenReflection")}</p>
              {/* TODO: THIS IS BY TYPE NUMBER, CHECK HOW TO MAKE ALPHA CHANNEL, FOR NOW THIS WILL BE LIKE BOOL ( 1 True, 0 False ) */}
              <Checkbox
                htmlName="screen-reflection"
                onChange={(e) => handleChangeReflection(e, "screen")}
                title={t("model.screenReflection")}
                value={model.screenReflection}
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
                onClick={handleSave}
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
              {t("user.title")} <IoPerson />
            </summary>
            {getMenu("user")}
          </motion.details>
        )}

        {
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
              {t("magicfy.title")} <IoColorWand />
            </summary>
            {getMenu("magic")}
          </motion.details>
        }
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
            {t("image.title")} <IoImage />
          </summary>

          <div className="control__section">{getMenu("image")}</div>
        </motion.details>

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
            {t("model.title")} <IoPhonePortrait />
          </summary>
          {getMenu("model")}
        </motion.details>
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
            {t("environment.title")} <IoSunny />
          </summary>
          {getMenu("environment")}
        </motion.details>

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
              {t("lights.add")} <IoAdd />
            </Button>
            {/* <IoBulb /> */}
          </summary>

          {getMenu("lights")}
        </motion.details>

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
            {t("actions.title")} <IoSettings />
          </summary>
          {getMenu("action")}
        </motion.details>
      </motion.article>
    </>
  );
}

{
  /* <div className="generate__controls-mobile">
        {activeTab && (
          <div className="additional-menu">
            <div className="additional-menu__title">
              <p>{t(`${activeTab.title}.title`)}</p>
              <Button onClick={() => setActiveTab(null)} variant="editor">
                <IoCloseCircleSharp />
              </Button>
            </div>

            <div className="additional-menu__body" key={activeTab.id}>
              {activeTab.body}
            </div>
          </div>
        )}
        <div className="track">
          <div className="control" onClick={() => handleActiveTab("image")}>
            <p className="control__title">
              <IoImageSharp /> {t("image.title")}
            </p>
          </div>
          <div className="control" onClick={() => handleActiveTab("model")}>
            <p className="control__title">
              <IoTvSharp /> {t("model.title")}
            </p>
          </div>
          <div
            className="control"
            onClick={() => handleActiveTab("environment")}
          >
            <p className="control__title">
              <IoSunnySharp /> {t("environment.title")}
            </p>
          </div>
          <div className="control" onClick={() => handleActiveTab("lights")}>
            <p className="control__title">
              <IoFlashlight /> {t("lights.title")}
            </p>
          </div>
        </div>
      </div> */
}
