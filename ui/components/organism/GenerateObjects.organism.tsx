"use client";

import { useRecoilState, useRecoilValue } from "recoil";

import Button from "../atoms/Button.atom";
import Images from "../moleculs/GenerateControls/Image.molecul";
import Model from "../moleculs/GenerateControls/Model.molecul";

import useGenerator from "@/ui/hooks/useGenerator.hook";

import { modelAtom, ObjectsLayersAtom } from "@/lib/atoms/generator";

import { LucidePlusCircle, LucideTrash2 } from "lucide-react";

import "@/ui/styles/organism/generateObjects.organism.scss";
import "@/ui/styles/organism/generateControls.organism.scss";

export default function GenerateObjects() {
  const [layers, setLayers] = useRecoilState(ObjectsLayersAtom);
  const newModel = useRecoilValue(modelAtom);

  function handleAddNewObject() {
    return setLayers((prev) => [...prev, { ...newModel }]);
  }

  function handleRemoveObject(index: number) {
    return setLayers((prev) => prev.filter((_, i) => i !== index));
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

  return (
    <article className="generate__controls objects">
      <div className="heading">
        <Button onClick={handleAddNewObject} variant="editor">
          New object <LucidePlusCircle />
        </Button>
      </div>
      <div className="layers">
        {layers?.map((layer, i) => (
          <details key={i} className="control">
            <summary className="control__title">
              {layer.title}
              <Button
                onClick={() => handleRemoveObject(i)}
                variant="editor"
                className="danger"
              >
                <LucideTrash2 />
              </Button>
            </summary>
            <Images
              index={i}
              handleImageChange={handleImageChange}
              handleImagePosition={handleImagePosition}
              handleImageSize={handleImageSize}
            />
            <Model
              index={i}
              handleChangePosition={handleChangePosition}
              handleChangeRotation={handleChangeRotation}
              handleChangeColor={handleChangeColor}
              handleChangeReflection={handleChangeReflection}
              handleModelChange={handleModelChange}
            />
          </details>
        ))}
      </div>
    </article>
  );
}
