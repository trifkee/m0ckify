"use client";
import { useRecoilValue } from "recoil";
import useGenerator from "@/ui/hooks/useGenerator.hook";

import Render from "../moleculs/GenerateControls/Render.molecul";
import Magicfy from "../moleculs/GenerateControls/Magicfy.molecul";
import User from "../moleculs/GenerateControls/User.molecul";
import Env from "../moleculs/GenerateControls/Env.molecul";
import Lights from "../moleculs/GenerateControls/Lights.molecul";
import OverallSettings from "../moleculs/GenerateControls/OverallSettings.molecul";
import Actions from "../moleculs/GenerateControls/Actions.molecul";

import { userAtom } from "@/lib/atoms/user";

import "@/ui/styles/organism/generateControls.organism.scss";

export default function GenerateControls() {
  const user = useRecoilValue(userAtom);

  const {
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
    handleChangeRenderSize,
    handleChangeRenderImageType,
  } = useGenerator();

  return (
    <article className="generate__controls">
      <User />
      {user?.role === "admin" && (
        <Magicfy handleReadAIImage={handleReadAIImage} />
      )}
      <OverallSettings />
      <Render
        handleChangeRenderImageType={handleChangeRenderImageType}
        handleChangeRenderSize={handleChangeRenderSize}
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
