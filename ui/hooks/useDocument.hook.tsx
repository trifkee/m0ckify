"use client";

import { ChangeEvent, useEffect } from "react";
import { useRecoilState } from "recoil";

import { sceneDocumentAtom } from "@/lib/atoms/generator";
import { SceneDocumentType } from "@/lib/types/model.type";

export default function useDocument() {
  const [sceneDocument, setSceneDocument] = useRecoilState(sceneDocumentAtom);

  //   TODO: CHECK FOR LATER, FOR RESETING
  //   setSceneDocument((prev: SceneDocumentType) => ({
  //     ...prev,
  //     env: {
  //       preset: "warehouse",
  //       intensity: 0.25,
  //       color: "#fff",
  //       castShadow: true,
  //     },
  //   }));

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setSceneDocument((prev: SceneDocumentType) => ({
      ...prev,
      env: {
        ...prev.env,
        preset: value,
      },
    }));
  };

  const onChangeIntensity = (e: ChangeEvent<HTMLInputElement>) => {
    setSceneDocument((prev: SceneDocumentType) => ({
      ...prev,
      env: {
        ...prev.env,
        intensity: Number(e.target.value),
      },
    }));
  };

  const handleChangeColor = (color: string) => {
    setSceneDocument((prev: SceneDocumentType) => ({
      ...prev,
      env: {
        ...prev.env,
        color: color,
      },
    }));
  };

  const handleChangeShadow = (e: ChangeEvent<HTMLInputElement>) => {
    setSceneDocument((prev: SceneDocumentType) => ({
      ...prev,
      env: {
        ...prev.env,
        castShadow: e.target.checked ? true : false,
      },
    }));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.title = sceneDocument.title;
    }, 2000);

    return () => clearTimeout(timeout);
  }, [sceneDocument.title]);

  return {
    handleChangeShadow,
    handleChangeColor,
    onChangeIntensity,
    handleSelectChange,
  };
}
