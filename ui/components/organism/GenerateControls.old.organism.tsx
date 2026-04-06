"use client";

import Render from "../moleculs/GenerateControls/Render.molecul";
import User from "../moleculs/GenerateControls/User.molecul";
import Env from "../moleculs/GenerateControls/Env.molecul";
import Lights from "../moleculs/GenerateControls/Lights.molecul";
import OverallSettings from "../moleculs/GenerateControls/OverallSettings.molecul";
import Actions from "../moleculs/GenerateControls/Actions.molecul";
import Camera from "../moleculs/GenerateControls/Camera.molecul";

import Background from '../moleculs/GenerateControls/Background.molecul';
import Templates from '../moleculs/GenerateControls/Templates.molecul';

import "@/ui/styles/organism/generateControls.organism.scss";

export default function GenerateControls() {

  return (
    <article className="generate__controls">
      <User />
      <Templates />
      <OverallSettings />
      <Render />
      <Camera />
      <Env />
      <Background />
      <Lights />
      <Actions />
    </article>
  );
}