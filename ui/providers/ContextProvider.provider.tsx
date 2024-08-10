"use client";

import { createContext, useEffect, useState } from "react";

import {
  ModelType,
  SceneDocumentType,
  SceneLightsType,
} from "@/lib/types/model.type";

import fallbackImage from "@/public/images/mockify-starter.jpg";
import fallbackImageTV from "@/public/images/mockify-starter-big.jpg";
import { File } from "buffer";

const Context = createContext<any>(null);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [selectedModel, setSelectedModel] = useState<React.ReactNode | null>(
    null
  );

  const [model, setModel] = useState<ModelType>({
    color: "#fff",
    texture: "plastic",
    bodyReflection: 0,
    screenReflection: 1,
    position: {
      x: 0,
      y: 0,
    },
    image: {
      src: fallbackImage.src as any,
      isDefault: true,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    },
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

  useEffect(() => {
    if (selectedModel === "tv") {
      // @ts-ignore
      setModel((prev: ModelType) => ({
        ...prev,
        image: {
          ...prev.image,
          src: fallbackImage.src as any,
        },
      }));
      return;
    }

    if (selectedModel === "iphone" || selectedModel === "android") {
      // @ts-ignore
      setModel((prev: ModelType) => ({
        ...prev,
        image: {
          src: fallbackImage.src as any,
        },
      }));
      return;
    }
  }, [selectedModel]);

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
