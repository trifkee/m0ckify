"use client";

import { ChangeEvent, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { readUserImage, saveImageFromCanvas } from "@/lib/helpers/model";
import {
  ModelType,
  RenderType,
  SceneDocumentType,
  SceneLightsType,
} from "@/lib/types/model.type";

import {
  backgroundSettingsAtom,
  canvasOptionsAtom,
  floorReflectionAtom,
  fogControlsAtom,
  ObjectsLayersAtom,
  renderAtom,
  sceneDocumentAtom,
  sceneLightsAtom,
  selectedLayerAtom,
} from "@/lib/atoms/generator";

export default function useGenerator() {
  const [model, setModel] = useRecoilState(ObjectsLayersAtom);
  const [render, setRender] = useRecoilState(renderAtom);
  const [sceneLights, setSceneLights] = useRecoilState(sceneLightsAtom);
  const [sceneDocument, setSceneDocument] = useRecoilState(sceneDocumentAtom);
  const [selectedLayer, setSelectedLayer] = useRecoilState(selectedLayerAtom);
  const [fogSettings, setFogSettings] = useRecoilState(fogControlsAtom);
  const [reflectionSettings, setReflectionSettings] =
    useRecoilState(floorReflectionAtom);
  const [backgroundSettings, setBackgroundSettings] = useRecoilState(
    backgroundSettingsAtom
  );
  const [canvasSettings, setCanvasSettings] = useRecoilState(canvasOptionsAtom);

  /* Read image from user PC */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];

    if (!image) return;

    handleReadImage(image);
  };

  const handleReadImage = (file: File) => {
    readUserImage(file)
      .then((result) => {
        if (typeof result === "string") {
          setModel((prev: ModelType[]) =>
            prev.map((n) =>
              n.id === selectedLayer?.id
                ? {
                    ...n,
                    image: { ...n.image, src: result, isDefault: false },
                  }
                : n
            )
          );
        } else {
          console.error("Invalid image result", result);
        }
      })
      .catch((error) => {
        console.error("Error reading image", error);
      });
  };

  const handleReadAIImage = (image: string) => {
    setModel((prev: ModelType[]) =>
      prev.map((n) =>
        n.id === selectedLayer?.id
          ? {
              ...n,
              image: { ...n.image, src: image, isDefault: false },
            }
          : n
      )
    );
  };

  /* Save Image to user PC */
  const handleSave = (options: RenderType) => {
    let l = selectedLayer;
    setSelectedLayer(null);

    saveImageFromCanvas({ title: sceneDocument.title, ...options });

    setTimeout(() => {
      setSelectedLayer(l);
    }, 300);
  };

  /* Model Customization */
  const resetModelPosition = () => {
    // TODO :FIX THIS
    // setModel((prev: ModelType) => ({
    //   ...prev,
    //   color: "#fff",
    //   texture: "plastic",
    //   position: {
    //     x: 0,
    //     y: 0,
    //     z: 0,
    //   },
    // }));

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
      setModel((prev) =>
        prev.map((n) =>
          n.id === selectedLayer?.id
            ? {
                ...n,
                color,
              }
            : n
        )
      );

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
    // TODO :FIX THIS
    // setModel((prev: ModelType) => ({
    //   ...prev,
    //   texture: e.target.name,
    // }));
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
    const type = e.target.value;

    return setModel((prev) =>
      prev.map((n) =>
        n.id === selectedLayer?.id
          ? {
              ...n,
              type,
            }
          : n
      )
    );
  };

  const handleImageSize = (e: any, type: "width" | "height") => {
    const size = Number(e.target.value);

    setModel((prev) =>
      prev.map((n) =>
        n.id === selectedLayer?.id
          ? {
              ...n,
              image: {
                ...n.image,
                [type]: size,
              },
            }
          : n
      )
    );
  };

  const handleImagePosition = (e: any, position: "x" | "y") => {
    const positionVal = Number(e.target.value);

    setModel((prev) =>
      prev.map((n) =>
        n.id === selectedLayer?.id
          ? {
              ...n,
              image: {
                ...n.image,
                [position]: positionVal,
              },
            }
          : n
      )
    );
  };

  const handleChangeReflection = (
    e: any,
    type: "screen" | "phone" | "screenAlpha"
  ) => {
    if (type === "screenAlpha") {
      return setModel((prev) =>
        prev.map((n) =>
          n.id === selectedLayer?.id
            ? {
                ...n,
                screenAlphaReflection: e.target.value,
              }
            : n
        )
      );
    }

    if (type === "phone") {
      return setModel((prev) =>
        prev.map((n) =>
          n.id === selectedLayer?.id
            ? {
                ...n,
                bodyReflection: e.target.value,
              }
            : n
        )
      );
    }

    if (type === "screen") {
      return setModel((prev) =>
        prev.map((n) =>
          n.id === selectedLayer?.id
            ? {
                ...n,
                screenReflection: e.target.checked ? 1 : 0,
              }
            : n
        )
      );
    }
  };

  function handleChangeRotation(
    e: ChangeEvent<HTMLInputElement>,
    axis: "x" | "y" | "z"
  ) {
    return setModel((prev: ModelType[]) =>
      prev.map((n) =>
        n.id === selectedLayer?.id
          ? {
              ...n,
              rotation: {
                ...n.rotation,
                [axis]: Number(e.target.value),
              },
            }
          : n
      )
    );
  }

  function handleChangePosition(
    e: ChangeEvent<HTMLInputElement>,
    axis: "x" | "y" | "z"
  ) {
    return setModel((prev) =>
      prev.map((n) =>
        n.id === selectedLayer?.id
          ? {
              ...n,
              position: {
                ...n.position,
                [axis]: Number(e.target.value),
              },
            }
          : n
      )
    );
  }

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

  const handleDraggedImage = (e: any, index?: number) => {
    e.preventDefault();

    const image = e.dataTransfer.files;

    handleReadImage(image[0]);
  };

  // Fog controls
  const handleFogEnable = (e: ChangeEvent<HTMLInputElement>) => {
    setFogSettings((prev) => ({
      ...prev,
      enabled: e.target.checked,
    }));
  };

  const handleFogSize = (e: ChangeEvent<HTMLInputElement>) => {
    setFogSettings((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
  };

  // Reflections
  const handleReflectionEnable = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e?.target.checked);

    setReflectionSettings((prev) => ({
      ...prev,
      enabled: e?.target.checked,
    }));
  };

  const handleReflectionInputs = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value);
    setReflectionSettings((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
  };

  // Background
  const handleBackgroundEnable = () => {
    setBackgroundSettings((prev) => ({ ...prev, enabled: !prev.enabled }));
  };

  const handleBackgroundSettings = (color: string) => {
    setBackgroundSettings((prev) => ({
      ...prev,
      color,
    }));
  };

  // Canvas

  const handleUpdateCanvasBrightness = (e: ChangeEvent<HTMLInputElement>) => {
    setCanvasSettings((prev: any) => ({
      ...prev,
      toneMappingExposure: e.target.value,
    }));
  };

  const handleToneMappingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    return setCanvasSettings((prev: any) => ({
      ...prev,
      toneMapping: e.target.value,
    }));
  };

  const handleChangeGridShow = (e: ChangeEvent<HTMLInputElement>) => {
    return setCanvasSettings((prev: any) => ({
      ...prev,
      grid: e.target.checked,
    }));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.title = sceneDocument.title;
    }, 2000);

    return () => clearTimeout(timeout);
  }, [sceneDocument.title]);

  console.log("SSSSS");

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
    handleChangePosition,
    handleChangeRotation,
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
    handleDraggedImage,
    handleFogEnable,
    handleFogSize,
    handleReflectionEnable,
    handleReflectionInputs,
    handleBackgroundEnable,
    handleBackgroundSettings,
    handleUpdateCanvasBrightness,
    handleToneMappingChange,
    handleChangeGridShow,
    canvasSettings,
    fogSettings,
    reflectionSettings,
    backgroundSettings,
  };
}
