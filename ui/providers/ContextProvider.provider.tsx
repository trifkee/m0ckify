"use client";

import { createContext, useState } from "react";

import {
  ModelType,
  SceneDocumentType,
  SceneLightsType,
} from "@/lib/types/model.type";

import fallbackImage from "@/public/images/fallback.jpg";

const Context = createContext<any>(null);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [selectedModel, setSelectedModel] = useState<React.ReactNode | null>(
    null
  );

  const [model, setModel] = useState<ModelType>({
    position: {
      x: 0,
      y: 0,
    },
    image: {
      src: fallbackImage.src as any,
      isDefault: true,
    },
    color: "#fff",
    texture: "plastic",
  });

  const [sceneDocument, setSceneDocument] = useState<SceneDocumentType>({
    title: "Untitled",
    background: "transparent",
    env: {
      preset: "warehouse",
      intensity: 0.25,
      color: "#fff",
      castShadow: true,
    },
  });

  const [sceneLights, setSceneLights] = useState<SceneLightsType[]>([
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
  ]);

  return (
    <Context.Provider
      value={{
        model,
        setModel,
        sceneDocument,
        setSceneDocument,
        sceneLights,
        setSceneLights,
        setSelectedModel,
        selectedModel,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
