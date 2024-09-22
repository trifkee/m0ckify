"use client";

import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";

import { SceneDocumentType } from "@/lib/types/model.type";

import { sceneDocumentAtom } from "@/lib/atoms/generator";

import "@/ui/styles/moleculs/generateDocumentTitle.molecul.scss";

export default function GenerateDocumentTitle() {
  const [sceneDocument, setSceneDocument] = useRecoilState(sceneDocumentAtom);

  const [isEditable, setIsEditable] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setSceneDocument((prev: SceneDocumentType) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleOnBlur = () => {
    setIsEditable(false);

    if (sceneDocument.title.length === 0) {
      setSceneDocument((prev: SceneDocumentType) => ({
        ...prev,
        title: "Mockify",
      }));
    }
  };

  return (
    <>
      {isEditable ? (
        <input
          className="document-title"
          type="text"
          value={sceneDocument.title}
          onChange={handleChange}
          onBlur={handleOnBlur}
        />
      ) : (
        <span
          className="document-title__span"
          style={{ marginRight: "auto" }}
          onDoubleClick={() => setIsEditable(true)}
        >
          {sceneDocument.title}
        </span>
      )}
    </>
  );
}
