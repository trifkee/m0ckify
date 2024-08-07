"use client";

import { useContext, useState } from "react";
import Context from "@/ui/providers/ContextProvider.provider";

import { SceneDocumentType } from "@/lib/types/model.type";

import "@/ui/styles/moleculs/generateDocumentTitle.molecul.scss";

export default function GenerateDocumentTitle() {
  const { sceneDocument, setSceneDocument } = useContext(Context);

  const [isEditable, setIsEditable] = useState(false);

  const handleChange = (e: any) => {
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
        <span onDoubleClick={() => setIsEditable(true)}>
          {sceneDocument.title}
        </span>
      )}
    </>
  );
}
