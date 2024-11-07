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
  const { handleSave } = useGenerator();

  return (
    <article className="generate__controls">
      <User />
      <OverallSettings />
      <Render />
      <Env />
      <Lights />
      <Actions
        handleSave={handleSave}
        // resetModelPosition={resetModelPosition}
      />
    </article>
  );
}
