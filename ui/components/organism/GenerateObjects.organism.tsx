"use client";

import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Button from "../atoms/Button.atom";
import ObjectLayer from "../moleculs/ObjectLayer.molecul";

import { v4 as uuidv4 } from "uuid";

import {
  layersTabMobileAtom,
  modelAtom,
  ObjectsLayersAtom,
  selectedLayerAtom,
} from "@/lib/atoms/generator";

import { LucideBox, LucidePlusCircle } from "lucide-react";

import "@/ui/styles/organism/generateControls.organism.scss";
import "@/ui/styles/organism/generateObjects.organism.scss";

export default function GenerateObjects() {
  const layersRef = useRef<HTMLDivElement | null>(null);
  const [layers, setLayers] = useRecoilState(ObjectsLayersAtom);
  const newModel = useRecoilValue(modelAtom);

  const isLayers = useRecoilValue(layersTabMobileAtom);
  const [selectedLayer, setSelectedLayer] = useRecoilState(selectedLayerAtom);

  function handleAddNewObject() {
    return setLayers((prev) => [
      {
        ...newModel,
        id: uuidv4(),
      },
      ...prev,
    ]);
  }

  console.log(layers);

  useEffect(() => {
    if (layersRef.current) {
      //  @ts-ignore
      const n: HTMLDetailsElement[] = layersRef.current.children;

      Array.from(n).forEach((child, i) => {
        if (selectedLayer !== i) {
          child.open = false;
        }
      });
    }
  }, [selectedLayer]);

  return (
    <article
      className={`generate__controls objects ${isLayers ? "active" : ""}`}
    >
      {layers.length > 0 ? (
        <>
          <div className="heading">
            <Button onClick={handleAddNewObject} variant="editor">
              New object <LucidePlusCircle />
            </Button>
          </div>

          <div ref={layersRef} className="layers">
            {layers?.map((layer, i) => (
              <ObjectLayer key={i} layer={layer} index={i} />
            ))}
          </div>
        </>
      ) : (
        <div className="no-layers">
          <h2>
            Add Model
            <LucideBox />
          </h2>
          <Button onClick={handleAddNewObject} variant="editor">
            New object <LucidePlusCircle />
          </Button>
        </div>
      )}
    </article>
  );
}
