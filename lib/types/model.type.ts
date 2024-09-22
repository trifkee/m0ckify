export type RenderType = {
  w: number;
  h: number;
  type: "JPEG" | "PNG" | "WEBP";
};

export type ModelType = {
  position: {
    x: number;
    y: number;
  };
  image: {
    src: File | string | null;
    isDefault: boolean;
    width: number;
    height: number;
    x: number;
    y: number;
  };
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
  // lights: {
  //   leftDirectional: {
  //     intensity: number;
  //     color: string;
  //     position: {
  //       x: number;
  //       y: number;
  //       z: number;
  //     };
  //   };
  //   rightDirectional: {
  //     intensity: number;
  //     color: string;
  //     position: {
  //       x: number;
  //       y: number;
  //       z: number;
  //     };
  //   };
  // };
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
