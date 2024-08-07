"use client";

import { useContext } from "react";

import Context from "@/ui/providers/ContextProvider.provider";

import { readUserImage, saveImageFromCanvas } from "@/lib/helpers/model";
import { ModelType, SceneDocumentType } from "@/lib/types/model.type";

export default function useGenerator() {
  const { model, setModel, sceneDocument, setSceneDocument } =
    useContext(Context);

  /* Read image from user PC */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];

    if (!image) return;

    handleReadImage(image);
  };

  const handleReadImage = (file: File) =>
    readUserImage(file).then((result) => {
      setModel((prev: ModelType) => ({
        ...prev,
        image: {
          src: result,
          isDefault: false,
        },
      }));
    });

  /* Save Image to user PC */
  const handleSave = () => {
    saveImageFromCanvas({ title: sceneDocument.title });
  };

  /* Model Customization */
  const resetModelPosition = () => {
    setModel((prev: ModelType) => ({
      ...prev,
      color: "#fff",
      texture: "plastic",
      position: {
        x: 0,
        y: 0,
      },
    }));

    setSceneDocument((prev: SceneDocumentType) => ({
      ...prev,
      env: {
        preset: "warehouse",
        intensity: 0.25,
        color: "#fff",
        castShadow: true,
      },
      lights: {
        leftDirectional: {
          color: "#fff",
          intensity: 0.5,
          position: {
            x: -2,
            y: 1,
            z: 5,
          },
        },
        rightDirectional: {
          color: "#fff",
          intensity: 0.5,
          position: {
            x: 5,
            y: -10,
            z: 15,
          },
        },
      },
    }));
  };

  const handleSelectChange = (e: any, type: string) => {
    const value = e.target.value;

    if (type === "env") {
      setSceneDocument((prev: SceneDocumentType) => ({
        ...prev,
        env: {
          ...prev.env,
          preset: value,
        },
      }));

      return;
    }
  };

  const onChangeIntensity = (
    e: any,
    type: "env" | "leftDirectional" | "rightDirectional"
  ) => {
    if (type === "env") {
      setSceneDocument((prev: SceneDocumentType) => ({
        ...prev,
        env: {
          ...prev.env,
          intensity: Number(e.target.value),
        },
      }));

      return;
    }

    if (type === "leftDirectional" || type === "rightDirectional") {
      setSceneDocument((prev: SceneDocumentType) => ({
        ...prev,
        lights: {
          ...prev.lights,
          [type]: {
            ...prev.lights[type],
            intensity: Number(e.target.value),
          },
        },
      }));

      return;
    }
  };

  const handleChangeColor = (
    color: string,
    type: "model" | "ambient" | "leftDirectional" | "rightDirectional"
  ) => {
    if (type === "model") {
      setModel((prev: ModelType) => ({
        ...prev,
        color: color,
      }));

      return;
    }

    if (type === "ambient") {
      setSceneDocument((prev: SceneDocumentType) => ({
        ...prev,
        env: {
          ...prev.env,
          color: color,
        },
      }));
    }

    if (type === "leftDirectional" || type === "rightDirectional") {
      setSceneDocument((prev: SceneDocumentType) => ({
        ...prev,
        lights: {
          ...prev.lights,
          [type]: {
            ...prev.lights[type],
            color,
          },
        },
      }));
    }
  };

  const handleChangeShadow = (e: any) => {
    setSceneDocument((prev: SceneDocumentType) => ({
      ...prev,
      env: {
        ...prev.env,
        castShadow: e.target.checked ? true : false,
      },
    }));
  };

  const handleChangeModelTexture = (e: any) => {
    setModel((prev: ModelType) => ({
      ...prev,
      texture: e.target.name,
    }));
  };

  const handleDirLightPosition = (
    e: any,
    axis: "x" | "y" | "z",
    position: "leftDirectional" | "rightDirectional"
  ) => {
    setSceneDocument((prev: SceneDocumentType) => ({
      ...prev,
      lights: {
        ...prev.lights,
        [position]: {
          ...prev.lights[position],
          position: {
            ...prev.lights[position].position,
            [axis]: Number(e.target.value),
          },
        },
      },
    }));
  };

  return {
    model,
    sceneDocument,
    handleImageChange,
    handleSave,
    resetModelPosition,
    handleChangeShadow,
    handleChangeModelTexture,
    handleDirLightPosition,
    handleChangeColor,
    onChangeIntensity,
    handleSelectChange,
  };
}
