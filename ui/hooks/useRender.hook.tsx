"use client";

import { ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";

import { renderAtom } from "@/lib/atoms/generator";
import { RenderType } from "@/lib/types/model.type";

export default function useRender() {
  const setRender = useSetRecoilState(renderAtom);

  const handleChangeRenderSize = (e: ChangeEvent<HTMLInputElement>) => {
    setRender((prev: RenderType) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeRenderImageType = (e: ChangeEvent<HTMLSelectElement>) => {
    setRender((prev: RenderType) => ({
      ...prev,
      type: e.target.value as "JPEG" | "WEBP" | "PNG",
    }));
  };

  return { handleChangeRenderSize, handleChangeRenderImageType };
}
