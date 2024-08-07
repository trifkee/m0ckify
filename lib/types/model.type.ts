export type ModelType = {
  position: {
    x: number;
    y: number;
  };
  image: {
    src: File | null;
    isDefault: boolean;
  };
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
  lights: {
    leftDirectional: {
      intensity: number;
      color: string;
      position: {
        x: number;
        y: number;
        z: number;
      };
    };
    rightDirectional: {
      intensity: number;
      color: string;
      position: {
        x: number;
        y: number;
        z: number;
      };
    };
  };
};
