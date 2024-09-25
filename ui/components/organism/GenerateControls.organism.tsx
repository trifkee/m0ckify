"use client";

import { useEffect } from "react";

import useGenerator from "@/ui/hooks/useGenerator.hook";

import Render from "../moleculs/GenerateControls/Render.molecul";
import Magicfy from "../moleculs/GenerateControls/Magicfy.molecul";
import User from "../moleculs/GenerateControls/User.molecul";
import Images from "../moleculs/GenerateControls/Image.molecul";
import Model from "../moleculs/GenerateControls/Model.molecul";
import Env from "../moleculs/GenerateControls/Env.molecul";
import Lights from "../moleculs/GenerateControls/Lights.molecul";
import Actions from "../moleculs/GenerateControls/Actions.molecul";

import "@/ui/styles/organism/generateControls.organism.scss";
import { userAtom } from "@/lib/atoms/user";
import { useRecoilValue } from "recoil";

export default function GenerateControls() {
  const user = useRecoilValue(userAtom);

  const {
    handleImageChange,
    handleChangeColor,
    handleReadAIImage,
    onChangeIntensity,
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

  return (
    <article className="generate__controls">
      <User />
      {user?.role === "admin" && (
        <Magicfy handleReadAIImage={handleReadAIImage} />
      )}
      <Render
        handleChangeRenderImageType={handleChangeRenderImageType}
        handleChangeRenderSize={handleChangeRenderSize}
      />
      <Images
        handleImageChange={handleImageChange}
        handleImagePosition={handleImagePosition}
        handleImageSize={handleImageSize}
      />
      <Model
        handleChangeColor={handleChangeColor}
        handleChangeReflection={handleChangeReflection}
        handleModelChange={handleModelChange}
      />
      <Env
        handleChangeColor={handleChangeColor}
        onChangeIntensity={onChangeIntensity}
        handleSelectChange={handleSelectChange}
        handleChangeShadow={handleChangeShadow}
      />

      <Lights
        handleAddNewLight={handleAddNewLight}
        handleChangeColor={handleChangeColor}
        handleDirLightPosition={handleDirLightPosition}
        handleRemoveLight={handleRemoveLight}
        onChangeIntensity={onChangeIntensity}
      />
      <Actions
        handleSave={handleSave}
        resetModelPosition={resetModelPosition}
      />
    </article>
  );
}
