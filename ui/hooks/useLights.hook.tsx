"use client";

import { sceneLightsAtom } from "@/lib/atoms/generator";
import { SceneLightsType } from "@/lib/types/model.type";
import { useRecoilState } from "recoil";

export default function useLights() {
  const [sceneLights, setSceneLights] = useRecoilState(sceneLightsAtom);

  const onChangeIntensity = (e: any, index?: number) => {
    setSceneLights(
      sceneLights.map((light, i: number) =>
        i === index ? { ...light, intensity: e.target.value } : light
      )
    );
  };

  const handleDirLightPosition = (
    e: any,
    axis: "x" | "y" | "z",
    index: number
  ) => {
    setSceneLights(
      sceneLights.map((light: SceneLightsType, i: number) =>
        i === index
          ? {
              ...light,
              position: { ...light.position, [axis]: Number(e.target.value) },
            }
          : light
      )
    );
  };

  const handleAddNewLight = () => {
    setSceneLights((prev: SceneLightsType[]) => [
      ...prev,
      {
        color: "#fff",
        intensity: 0.5,
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
    ]);
  };

  const handleRemoveLight = (index: number) => {
    setSceneLights((prev: SceneLightsType[]) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleChangeColor = (color: string, index: number) => {
    setSceneLights(
      sceneLights.map((light, i) => (i === index ? { ...light, color } : light))
    );
  };

  return {
    handleDirLightPosition,
    onChangeIntensity,
    handleAddNewLight,
    handleRemoveLight,
    handleChangeColor,
  };
}
