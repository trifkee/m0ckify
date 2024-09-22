"use client";

import { useRecoilState } from "recoil";

import Slider from "../atoms/Slider.atom";

import { modelAtom } from "@/lib/atoms/generator";
import { ModelType } from "@/lib/types/model.type";

import ModelProvider from "@/ui/providers/ModelProvider.provider";
import { ChangeEvent } from "react";

export default function GenerateModel() {
  const [model, setModel] = useRecoilState(modelAtom);

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
        value={String(model.position.x)}
        min={-0.5}
        max={0.5}
        step={0.025}
        className="x"
      />
      <Slider
        value={String(model.position.y)}
        min={-0.5}
        max={0.5}
        step={0.025}
        name="y"
        id="y"
        onChange={(e) => onChangeSlider(e, "y")}
        className="y"
      />
    </article>
  );
}
