export type RenderType = {
  w: number;
  h: number;
  quality: number;
  type: "JPEG" | "PNG" | "WEBP";
};

export type Vector3Tuple = [number, number, number];

export type ModelType = {
  id: string;
  realistic: boolean;
  type: "iphone" | "android" | "tv" | "laptop";
  title: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  image: {
    src: File | string | null;
    isDefault: boolean;
    width: number;
    height: number;
    x: number;
    y: number;
  };
  screenAlphaReflection: number;
  bodyReflection: number;
  screenReflection: number;
  color: string;
  texture: "plastic" | "marble";
};

export type SceneDocumentType = {
  title: string;
  background: string;

  env: {
    preset: string;
    intensity: number;
    color: string;
    castShadow: boolean;
  };
};

export type SceneCameraItemType = {
  id: string;
  name: string;
  type: "perspective" | "orthographic";
  position: Vector3Tuple;
  target: Vector3Tuple;
  fov: number;
  zoom: number;
  near: number;
  far: number;
  effects: boolean;
  focalLength: number;
  bokehScale: number;
  focusDistance: number;
};

export type SceneCameraPreviewType = {
  enabled: boolean;
  showSafeFrame: boolean;
};

export type SceneCameraType = {
  activeCameraId: string;
  preview: SceneCameraPreviewType;
  cameras: SceneCameraItemType[];
};

export type SceneLightsType = {
  intensity: number;
  color: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
};

export type TabType =
  | "image"
  | "magic"
  | "model"
  | "environment"
  | "lights"
  | "action"
  | "user"
  | "render";

export type PresetType =
  | "warehouse"
  | "apartment"
  | "city"
  | "dawn"
  | "forest"
  | "lobby"
  | "night"
  | "park"
  | "studio"
  | "sunset";
