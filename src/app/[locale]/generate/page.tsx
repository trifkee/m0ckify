"use client";

import Button from "@/ui/components/atoms/Button.atom";
import Context from "@/ui/providers/ContextProvider.provider";
import ModelProvider from "@/ui/providers/ModelProvider.provider";
import "@/ui/styles/pages/generate.page.scss";
import { useContext, useEffect } from "react";
import {
  IoAddCircle,
  IoColorPaletteSharp,
  IoCubeSharp,
  IoSaveSharp,
} from "react-icons/io5";

export default function Generate() {
  const { setModelPosition } = useContext(Context);

  const onChangeSlider = (e: any, axis: "x" | "y") => {
    setModelPosition((prev: any) => ({
      ...prev,
      [axis]: e.target.value,
    }));
  };

  return (
    <main className="generate">
      <article className="generate__model">
        <ModelProvider />
        <input
          type="range"
          name="x"
          id="x"
          onChange={(e) => onChangeSlider(e, "x")}
          className="slider-x"
        />
        <input
          type="range"
          name="y"
          id="y"
          onChange={(e) => onChangeSlider(e, "y")}
          className="slider-y"
        />
      </article>
      <article className="generate__controls">
        <Button variant="secondary">
          <p>Add image </p>
          <IoAddCircle />
        </Button>

        <Button variant="secondary">
          <p>Model </p>
          <IoCubeSharp />
        </Button>
        <Button variant="secondary">
          <p>Color</p> <IoColorPaletteSharp />
        </Button>

        <Button className="download">
          <p>Download</p> <IoSaveSharp />
        </Button>
      </article>
    </main>
  );
}
