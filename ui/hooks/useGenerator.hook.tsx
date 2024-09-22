"use client";

import { ChangeEvent, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { readUserImage, saveImageFromCanvas } from "@/lib/helpers/model";
import {
  ModelType,
  RenderType,
  SceneDocumentType,
  SceneLightsType,
} from "@/lib/types/model.type";

import {
  modelAtom,
  renderAtom,
  sceneDocumentAtom,
  sceneLightsAtom,
  selectedModelAtom,
} from "@/lib/atoms/generator";

import fallbackImage from "@/public/images/mockify-starter.jpg";

export default function useGenerator() {
  const setSelectedModel = useSetRecoilState(selectedModelAtom);
  const [model, setModel] = useRecoilState(modelAtom);
  const [render, setRender] = useRecoilState(renderAtom);
  const [sceneLights, setSceneLights] = useRecoilState(sceneLightsAtom);
  const [sceneDocument, setSceneDocument] = useRecoilState(sceneDocumentAtom);

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
          ...prev.image,
          src: result as string,
          isDefault: false,
        },
      }));
    });

  const handleReadAIImage = (image: string) => {
    setModel((prev: ModelType) => ({
      ...prev,
      image: {
        ...prev.image,
        src: image ?? fallbackImage,
        isDefault: false,
      },
    }));
  };

  /* Save Image to user PC */
  const handleSave = (options: RenderType) => {
    saveImageFromCanvas({ title: sceneDocument.title, ...options });
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
    }));

    setSceneLights([
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
    type: "env" | "dirLights",
    index?: number
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

    if (type === "dirLights") {
      setSceneLights(
        sceneLights.map((light: SceneLightsType, i: number) =>
          i === index ? { ...light, intensity: e.target.value } : light
        )
      );

      return;
    }
  };

  const handleChangeColor = (
    color: string,
    type: "model" | "ambient" | "dirLight",
    index?: number
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

    if (type === "dirLight") {
      setSceneLights(
        sceneLights.map((light: SceneLightsType, i: number) =>
          i === index ? { ...light, color: color } : light
        )
      );

      return;
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
    index: number
  ) => {
    setSceneLights(
      sceneLights.map((light: SceneLightsType, i: number) =>
        i === index
          ? {
              ...light,
              position: { ...light.position, [axis]: Number(e.target.value) },
            }
          : light
      )
    );
  };

  const handleAddNewLight = () => {
    setSceneLights((prev: SceneLightsType[]) => [
      ...prev,
      {
        color: "#fff",
        intensity: 0.5,
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
    ]);
  };

  const handleRemoveLight = (index: number) => {
    setSceneLights((prev: SceneLightsType[]) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleModelChange = (e: any) => {
    const model = e.target.value;

    return setSelectedModel(model);
  };

  const handleImageSize = (e: any, type: "width" | "height") => {
    const size = Number(e.target.value);

    setModel((prev: ModelType) => ({
      ...prev,
      image: {
        ...prev.image,
        [type]: size,
      },
    }));
  };

  const handleImagePosition = (e: any, position: "x" | "y") => {
    const positionVal = Number(e.target.value);

    setModel((prev: ModelType) => ({
      ...prev,
      image: {
        ...prev.image,
        [position]: positionVal,
      },
    }));
  };

  const handleChangeReflection = (e: any, type: "screen" | "phone") => {
    if (type === "phone") {
      return setModel((prev: ModelType) => ({
        ...prev,
        bodyReflection: e.target.value,
      }));
    }

    if (type === "screen") {
      return setModel((prev: ModelType) => ({
        ...prev,
        screenReflection: e.target.checked ? 1 : 0,
      }));
    }
  };

  const handleChangeRenderSize = (e: ChangeEvent<HTMLInputElement>) => {
    setRender((prev: RenderType) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeRenderImageType = (e: ChangeEvent<HTMLSelectElement>) => {
    setRender((prev: RenderType) => ({
      ...prev,
      type: e.target.value as "JPEG" | "WEBP" | "PNG",
    }));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.title = sceneDocument.title;
    }, 2000);

    return () => clearTimeout(timeout);
  }, [sceneDocument]);

  return {
    model,
    sceneDocument,
    sceneLights,
    render,
    handleImageChange,
    handleReadAIImage,
    handleImagePosition,
    handleImageSize,
    handleSave,
    resetModelPosition,
    handleChangeShadow,
    handleChangeModelTexture,
    handleDirLightPosition,
    handleChangeColor,
    onChangeIntensity,
    handleSelectChange,
    handleAddNewLight,
    handleRemoveLight,
    handleModelChange,
    handleChangeReflection,
    handleChangeRenderSize,
    handleChangeRenderImageType,
  };
}
