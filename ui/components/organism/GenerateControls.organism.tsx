"use client";
import useGenerator from "@/ui/hooks/useGenerator.hook";

import Render from "../moleculs/GenerateControls/Render.molecul";
import User from "../moleculs/GenerateControls/User.molecul";
import Env from "../moleculs/GenerateControls/Env.molecul";
import Lights from "../moleculs/GenerateControls/Lights.molecul";
import OverallSettings from "../moleculs/GenerateControls/OverallSettings.molecul";
import Actions from "../moleculs/GenerateControls/Actions.molecul";
import Camera from "../moleculs/GenerateControls/Camera.molecul";

import "@/ui/styles/organism/generateControls.organism.scss";
import Background from '../moleculs/GenerateControls/Background.molecul';
import Templates from '../moleculs/GenerateControls/Templates.molecul';

export default function GenerateControls() {
  const { handleSave } = useGenerator();

  return (
    <article className="generate__controls">
      <User />
      <Templates/>
      <OverallSettings />
      <Render />
      <Camera />
      <Env />
      <Background />
      <Lights />
      <Actions
        handleSave={handleSave}
        // resetModelPosition={resetModelPosition}
      />
    </article>
  );
}
