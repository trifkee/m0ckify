"use client";

import { ModelType } from "@/lib/types/model.type";
import Button from "@/ui/components/atoms/Button.atom";
import Context from "@/ui/providers/ContextProvider.provider";
import ModelProvider from "@/ui/providers/ModelProvider.provider";
import { useContext } from "react";
import {
  IoAddCircle,
  IoColorPaletteSharp,
  IoCubeSharp,
  IoSaveSharp,
} from "react-icons/io5";

import "@/ui/styles/pages/generate.page.scss";
import { saveImageFromCanvas } from "@/lib/helpers/saveImage";

export default function Generate() {
  const { setModel, model } = useContext(Context);

  const onChangeSlider = (e: any, axis: "x" | "y") => {
    setModel((prev: ModelType) => ({
      ...prev,
      position: {
        ...prev.position,
        [axis]: e.target.value,
      },
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];

    reader(image);
  };

  const reader = (file: any) =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.readAsDataURL(file);
    }).then((result) => {
      setModel((prev: ModelType) => ({
        ...prev,
        image: result,
      }));
    });

  const handleSave = () => {
    saveImageFromCanvas();
  };

  return (
    <main className="generate">
      {/* <img src={model.image || null} alt="" /> */}
      <article className="generate__model">
        <ModelProvider />
        <input
          type="range"
          name="x"
          id="x"
          onChange={(e) => onChangeSlider(e, "x")}
          value={model.position.x}
          min={-0.5}
          max={0.5}
          step={0.025}
          className="slider-x"
        />
        <input
          value={model.position.y}
          min={-0.5}
          max={0.5}
          step={0.025}
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
          <input
            onChange={handleImageChange}
            className="add-file"
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
          />
        </Button>

        <Button variant="secondary">
          <p>Model </p>
          <IoCubeSharp />
        </Button>
        <Button variant="secondary">
          <p>Color</p> <IoColorPaletteSharp />
        </Button>

        <Button onClick={handleSave} className="download">
          <p>Download</p> <IoSaveSharp />
        </Button>
      </article>
    </main>
  );
}
