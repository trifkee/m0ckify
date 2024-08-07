"use client";

import { ModelType } from "@/lib/types/model.type";
import Context from "@/ui/providers/ContextProvider.provider";
import ModelProvider from "@/ui/providers/ModelProvider.provider";
import { useContext } from "react";
import Slider from "../atoms/Slider.atom";

export default function GenerateModel() {
  const { setModel, model } = useContext(Context);

  const onChangeSlider = (e: any, axis: "x" | "y") => {
    return setModel((prev: ModelType) => ({
      ...prev,
      position: {
        ...prev.position,
        [axis]: e.target.value,
      },
    }));
  };

  return (
    <article className="generate__model">
      <ModelProvider />
      <Slider
        name="x"
        id="x"
        onChange={(e) => onChangeSlider(e, "x")}
        value={model.position.x}
        min={-0.5}
        max={0.5}
        step={0.025}
        className="slider-x"
      />
      <Slider
        value={model.position.y}
        min={-0.5}
        max={0.5}
        step={0.025}
        name="y"
        id="y"
        onChange={(e) => onChangeSlider(e, "y")}
        className="slider-y"
      />
    </article>
  );
}
