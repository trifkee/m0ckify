"use client";

import { MouseEvent, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AnimatePresence } from "framer-motion";
import { Link } from "@/navigation";
import { v4 as uuidv4 } from "uuid";

import Button from "../atoms/Button.atom";
import ObjectLayer from "../moleculs/ObjectLayer.molecul";

import {
  layersTabMobileAtom,
  modelAtom,
  ObjectsLayersAtom,
  selectedLayerAtom,
} from "@/lib/atoms/generator";

import {
  LucideBox,
  LucideChevronLeft,
  LucidePlusCircle,
  Trash2,
} from "lucide-react";

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

  function handleParentClick(e: MouseEvent) {
    if (e.target !== e.currentTarget) {
      return;
    }

    setSelectedLayer(null);
  }

  function handleRemoveAll() {
    setLayers([]);
  }

  useEffect(() => {
    if (layersRef.current) {
      //  @ts-ignore
      const n: HTMLDetailsElement[] = layersRef.current.children;

      Array.from(n).forEach((n) => {
        if (selectedLayer?.id !== n.id) {
          n.open = false;
        }
      });
    }
  }, [selectedLayer?.id, layers?.length]);

  return (
    <article
      onClick={(e) => handleParentClick(e)}
      className={`generate__controls objects ${isLayers ? "active" : ""}`}
    >
      {layers.length > 0 ? (
        <>
          <div ref={layersRef} className="layers">
            <AnimatePresence>
              {layers?.map((layer, i) => (
                <ObjectLayer key={i} layer={layer} />
              ))}
            </AnimatePresence>
          </div>

          <div className="heading" style={{}}>
            <Button onClick={handleAddNewObject} variant="editor">
              New object <LucidePlusCircle />
            </Button>
            {layers.length > 1 && (
              <Button
                className="danger"
                onClick={handleRemoveAll}
                variant="editor"
              >
                Clear <Trash2 />
              </Button>
            )}
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
