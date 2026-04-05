import { atom } from "recoil";

import {
  ModelType,
  RenderType,
  SceneCameraType,
  SceneDocumentType,
  SceneLightsType,
} from "../types/model.type";

import { DEFAULT_OBJECT_OPTIONS, TONE_MAPPINGS } from "../constants/generator";

export const renderAtom = atom<RenderType>({
  key: "render",
  default: {
    w: 1080,
    h: 1920,
    quality: 1,
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
    toneMappingExposure: 1,
    toneMapping: TONE_MAPPINGS[0].value,
    grid: false,
    dampingSpeed: 0.2,
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
      intensity: 1.4,
      position: {
        x: -4,
        y: 6,
        z: 8,
      },
    },
    {
      color: "#fff",
      intensity: 0.9,
      position: {
        x: 6,
        y: 2,
        z: 4,
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
      preset: "city",
      intensity: 1,
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

export const fogControlsAtom = atom({
  key: "fogControls",
  default: {
    enabled: false,
    minFog: 0,
    maxFog: 20,
  },
});

export const floorReflectionAtom = atom({
  key: "floorReflection",
  default: {
    enabled: false,
    roughness: 0.5,
    strength: 1,
    depth: 1,
    minTreshold: 0,
    maxTreshold: 10,
    mixStrength: 3,
    mixContrast: 1,
    resolution: 512,
    depthToBlurRatioBias: 1,
    blurX: 512,
    blurY: 512,
    envMapIntensity: 1,
  },
});

export const backgroundSettingsAtom = atom({
  key: "background",
  default: {
    enabled: false,
    color: "#000000",
    type: "solid" as "solid" | "gradient",
    gradientColor: "#ffffff",
    gradientAngle: 135,
    gradientColorStop: 50,
  },
});

export const cameraSettingsAtom = atom<SceneCameraType>({
  key: "camera",
  default: {
    activeCameraId: "camera-1",
    preview: {
      enabled: true,
      showSafeFrame: true,
    },
    cameras: [
      {
        id: "camera-1",
        name: "Main Camera",
        type: "perspective",
        position: [0, 0, 5],
        target: [0, 0, 0],
        fov: 50,
        zoom: 1,
        near: 0.1,
        far: 100,
        focalLength: 0,
        bokehScale: 0,
        focusDistance: 0,
        effects: false,
      },
    ],
  },
});
