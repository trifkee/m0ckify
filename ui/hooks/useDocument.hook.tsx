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

  const handleChangeColor = (color: string) => {
    setSceneDocument((prev: SceneDocumentType) => ({
      ...prev,
      env: {
        ...prev.env,
        color: color,
      },
    }));
  };

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setSceneDocument((prev) => ({
      ...prev,
      env: {
        ...prev.env,
        [e.target.name]:
          e.target.type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : e.target.value,
      },
    }));
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.title = sceneDocument.title;
    }, 2000);

    return () => clearTimeout(timeout);
  }, [sceneDocument.title]);

  return { handleChangeColor, handleChange };
}
