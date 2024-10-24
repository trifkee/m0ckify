"use client";

import { MouseEvent, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { easeIn, motion } from "framer-motion";

import Images from "../moleculs/GenerateControls/Image.molecul";
import Model from "../moleculs/GenerateControls/Model.molecul";
import Button from "../atoms/Button.atom";
import GeneratePosition from "./GenerateControls/Position.molecul";

import useGenerator from "@/ui/hooks/useGenerator.hook";

import { ModelType } from "@/lib/types/model.type";
import { ObjectsLayersAtom, selectedLayerAtom } from "@/lib/atoms/generator";

import { LucideCheck, LucidePencilLine, LucideTrash2 } from "lucide-react";

export default function ObjectLayer({ layer }: { layer: ModelType }) {
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

  const [selectedLayer, setSelectedLayer] = useRecoilState(selectedLayerAtom);
  const setLayers = useSetRecoilState(ObjectsLayersAtom);

  const [isRenaming, setIsRenaming] = useState(false);

  function handleRemoveObject(index: string) {
    if (selectedLayer?.id === index) {
      setSelectedLayer(null);
    }

    return setLayers((prev) => prev.filter((n) => n.id !== index));
  }

  function handleSelectLayer(e: MouseEvent) {
    if (e.target !== e.currentTarget) {
      return;
    }

    setSelectedLayer({ id: layer.id, layer });
  }

  function handleChange(e: any) {
    return setLayers((prev) =>
      prev.map((n) =>
        n.id === layer.id
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

  return (
    <motion.details
      initial={{
        opacity: 0,
        x: -50,
      }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          stiffness: 260,
          damping: 20,
        },
      }}
      exit={{
        opacity: 0,
        x: 50,
        transition: {
          stiffness: 260,
          damping: 20,
        },
      }}
      transition={{
        duration: 0.3,
        type: "spring",
      }}
      className={`control ${layer.id === selectedLayer?.id ? "active" : ""}`}
    >
      <summary
        onClick={(e) => handleSelectLayer(e)}
        onDoubleClick={() => (isRenaming ? null : setIsRenaming(true))}
        className="control__title"
      >
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
                onClick={() => handleRemoveObject(layer.id)}
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
        handleImageChange={handleImageChange}
        handleImagePosition={handleImagePosition}
        handleImageSize={handleImageSize}
      />
      <Model
        handleChangeColor={handleChangeColor}
        handleChangeReflection={handleChangeReflection}
        handleModelChange={handleModelChange}
      />
      <GeneratePosition
        handleChangePosition={handleChangePosition}
        handleChangeRotation={handleChangeRotation}
      />
    </motion.details>
  );
}
