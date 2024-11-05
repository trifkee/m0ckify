"use client";
import useGenerator from "@/ui/hooks/useGenerator.hook";

import Render from "../moleculs/GenerateControls/Render.molecul";
import User from "../moleculs/GenerateControls/User.molecul";
import Env from "../moleculs/GenerateControls/Env.molecul";
import Lights from "../moleculs/GenerateControls/Lights.molecul";
import OverallSettings from "../moleculs/GenerateControls/OverallSettings.molecul";
import Actions from "../moleculs/GenerateControls/Actions.molecul";

import "@/ui/styles/organism/generateControls.organism.scss";

export default function GenerateControls() {
  const {
    handleChangeColor,
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
