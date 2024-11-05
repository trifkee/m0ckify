import { atom } from "recoil";

import {
  ModelType,
  RenderType,
  SceneDocumentType,
  SceneLightsType,
} from "../types/model.type";

import { DEFAULT_OBJECT_OPTIONS, TONE_MAPPINGS } from "../constants/generator";

export const renderAtom = atom<RenderType>({
  key: "render",
  default: {
    w: 1080,
    h: 1920,
    type: "PNG",
  },
});

export const selectedLayerAtom = atom<{ id: string; layer: ModelType } | null>({
  key: "selectedLayer",
  default: null,
});

export const canvasOptionsAtom = atom({
  key: "canvasOptions",
  default: {
    toneMappingExposure: 0.5,
    toneMapping: TONE_MAPPINGS[0].value,
    grid: false,
    bloom: 0,
  },
});

export const layersTabMobileAtom = atom({
  key: "layerCta",
  default: false,
});

export const modelAtom = atom<ModelType>({
  key: "model",
  default: { ...DEFAULT_OBJECT_OPTIONS },
});

export const ObjectsLayersAtom = atom<ModelType[] | []>({
  key: "objectLayers",
  default: [],
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
      castShadow: false,
    },
  },
});

export const selectedModelAtom = atom<React.ReactNode | null>({
  key: "modelAtom",
  default: "iphone",
});

export const helpAtom = atom({
  key: "help",
  default: false,
});

export const isGeneratingAtom = atom({
  key: "isGenerating",
  default: true,
});

export const aiKeyAtom = atom({
  key: "aiKeyApi",
  default: "",
});

export const pivotControlsAtom = atom({
  key: "PivotControls",
  default: true,
});

export const pivotEnabledControlsAtom = atom({
  key: "PivotEnabledControls",
  default: {
    move: false,
    rotate: true,
    scale: true,
    axes: true,
  },
});
