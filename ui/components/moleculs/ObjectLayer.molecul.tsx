"use client";

import { useRecoilState, useSetRecoilState } from "recoil";

import Images from "../moleculs/GenerateControls/Image.molecul";
import Model from "../moleculs/GenerateControls/Model.molecul";
import Button from "../atoms/Button.atom";

import useGenerator from "@/ui/hooks/useGenerator.hook";

import { ModelType } from "@/lib/types/model.type";
import { ObjectsLayersAtom, selectedLayerAtom } from "@/lib/atoms/generator";

import { LucideCheck, LucidePencilLine, LucideTrash2 } from "lucide-react";
import { useState } from "react";
import GeneratePosition from "./GenerateControls/Position.molecul";

export default function ObjectLayer({
  layer,
  index,
}: {
  layer: ModelType;
  index: number;
}) {
  const [selectedLayer, setSelectedLayer] = useRecoilState(selectedLayerAtom);
  const setLayers = useSetRecoilState(ObjectsLayersAtom);

  const [isRenaming, setIsRenaming] = useState(false);

  function handleRemoveObject(index: number) {
    return setLayers((prev) => prev.filter((_, i) => i !== index));
  }

  function handleChange(e: any) {
    return setLayers((prev) =>
      prev.map((n, i) =>
        i === index
          ? {
              ...n,
              title: e.target.value,
            }
          : n
      )
    );
  }

  function handleOnBlur() {
    setIsRenaming(false);
  }

  const {
    handleImageChange,
    handleChangeColor,
    handleModelChange,
    handleImageSize,
    handleImagePosition,
    handleChangePosition,
    handleChangeRotation,
    handleChangeReflection,
  } = useGenerator();

  function handleClick(i: number) {
    setSelectedLayer(i);
  }

  return (
    <details
      onClick={() => handleClick(index)}
      className={`control ${index === selectedLayer ? "active" : ""}`}
    >
      <summary className="control__title">
        {isRenaming ? (
          <>
            <input
              className="document-title"
              type="text"
              value={layer.title}
              onChange={handleChange}
              onBlur={handleOnBlur}
            />
            <Button onClick={handleOnBlur} variant="editor">
              <LucideCheck />
            </Button>
          </>
        ) : (
          <>
            {layer.title.length ? layer.title : "Mockify model"}
            <div
              style={{
                display: "flex",
                gap: ".5rem",
              }}
              className="ctas"
            >
              <Button onClick={() => setIsRenaming(true)} variant="editor">
                <LucidePencilLine />
              </Button>
              <Button
                onClick={() => handleRemoveObject(index)}
                variant="editor"
                className="danger"
              >
                <LucideTrash2 />
              </Button>
            </div>
          </>
        )}
      </summary>
      <Images
        index={index}
        handleImageChange={handleImageChange}
        handleImagePosition={handleImagePosition}
        handleImageSize={handleImageSize}
      />
      <Model
        index={index}
        handleChangeColor={handleChangeColor}
        handleChangeReflection={handleChangeReflection}
        handleModelChange={handleModelChange}
      />
      <GeneratePosition
        index={index}
        handleChangePosition={handleChangePosition}
        handleChangeRotation={handleChangeRotation}
      />
    </details>
  );
}
