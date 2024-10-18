"use client";

import ModelProvider from "@/ui/providers/ModelProvider.provider";

export default function GenerateModel() {
  return (
    <article className="generate__model">
      <ModelProvider />

      {/* <Slider
        name="x"
        id="x"
        onChange={(e) => onChangeSlider(e, "x")}
        value={String(model.position.x)}
        min={-0.5}
        max={0.5}
        step={0.025}
        className="x"
        visible={canvasSliders}
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
        visible={canvasSliders}
      /> */}
    </article>
  );
}
