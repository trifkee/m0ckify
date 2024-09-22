import { atom } from "recoil";
import {
  ModelType,
  RenderType,
  SceneDocumentType,
  SceneLightsType,
} from "../types/model.type";

import fallbackImage from "@/public/images/mockify-starter.jpg";

export const renderAtom = atom<RenderType>({
  key: "render",
  default: {
    w: 1080,
    h: 1920,
    type: "PNG",
  },
});

export const modelAtom = atom<ModelType>({
  key: "model",
  default: {
    color: "#fff",
    texture: "plastic",
    bodyReflection: 0,
    screenReflection: 1,
    position: {
      x: 0 as number,
      y: 0 as number,
    },
    image: {
      src: fallbackImage.src as any,
      isDefault: true,
      width: 0 as number,
      height: 0 as number,
      x: 0,
      y: 0,
    },
  },
});

export const sceneLightsAtom = atom<SceneLightsType[]>({
  key: "sceneLights",
  default: [
    {
      color: "#fff",
      intensity: 0.5,
      position: {
        x: -2,
        y: 1,
        z: 5,
      },
    },
    {
      color: "#fff",
      intensity: 0.5,
      position: {
        x: 5,
        y: -10,
        z: 15,
      },
    },
  ],
});

export const sceneDocumentAtom = atom<SceneDocumentType>({
  key: "sceneDocument",
  default: {
    title: "Untitled",
    background: "transparent",
    env: {
      preset: "warehouse",
      intensity: 0.25,
      color: "#fff",
      castShadow: true,
    },
  },
});

export const selectedModelAtom = atom<React.ReactNode | null>({
  key: "modelAtom",
  default: null,
});

export const helpAtom = atom({
  key: "help",
  default: false,
});

export const isGeneratingAtom = atom({
  key: "isGenerating",
  default: true,
});

export const openAiKeyAtom = atom({
  key: "openAiKey",
  default: "",
});
