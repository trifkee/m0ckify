"use client";

import { useRecoilState, useRecoilValue } from "recoil";

import { saveImageFromCanvas } from "@/lib/helpers/model";

import {
  renderAtom,
  sceneDocumentAtom,
  selectedLayerAtom,
} from "@/lib/atoms/generator";

export default function useGenerator() {
  const sceneDocument = useRecoilValue(sceneDocumentAtom);
  const [selectedLayer, setSelectedLayer] = useRecoilState(selectedLayerAtom);
  const render = useRecoilValue(renderAtom);

  /* Save Image to user PC */
  const handleSave = () => {
    let l = selectedLayer;
    setSelectedLayer(null);

    const options = {
      w: render.w,
      h: render.h,
      quality: render.quality,
      type: render.type,
    };

    saveImageFromCanvas({ title: sceneDocument.title, ...options });

    setTimeout(() => {
      setSelectedLayer(l);
      l = null;
    }, 300);
  };

  /* Model Customization */
  // const resetModelPosition = () => {
  //   // TODO :FIX THIS
  //   // setModel((prev: ModelType) => ({
  //   //   ...prev,
  //   //   color: "#fff",
  //   //   texture: "plastic",
  //   //   position: {
  //   //     x: 0,
  //   //     y: 0,
  //   //     z: 0,
  //   //   },
  //   // }));

  //   setSceneLights([
  //     {
  //       color: "#fff",
  //       intensity: 0.5,
  //       position: {
  //         x: -2,
  //         y: 1,
  //         z: 5,
  //       },
  //     },
  //     {
  //       color: "#fff",
  //       intensity: 0.5,
  //       position: {
  //         x: 5,
  //         y: -10,
  //         z: 15,
  //       },
  //     },
  //   ]);
  // };

  return { handleSave };
}
