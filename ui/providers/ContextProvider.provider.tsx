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
import { useFetchUser } from "@/infrastructure/queries/user/useUsers";
import { UserType } from "@/lib/types/user.type";
import { generate } from "@/infrastructure/services/http/generate";

const Context = createContext<any>(null);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [selectedModel, setSelectedModel] = useState<React.ReactNode | null>(
    null
  );

  const [openAiKey, setOpenAiKey] = useState("");
  const [isGenerateLoading, setIsGenerateLoading] = useState(true);

  const { data: userData, refetch: refetchUser } = useFetchUser();

  const [user, setUser] = useState<UserType | null>(userData ?? null);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

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
      width: 0 as number,
      height: 0 as number,
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
          ...prev.image,
          src: fallbackImage.src as any,
        },
      }));
      return;
    }
  }, [selectedModel]);

  useEffect(() => {
    setUser(userData ?? null);
  }, [userData]);

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
        user,
        refetchUser,
        handleLogout,
        openAiKey,
        setOpenAiKey,

        isGenerateLoading,
        setIsGenerateLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
