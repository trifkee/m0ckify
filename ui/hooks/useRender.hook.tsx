"use client";

import { ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";

import { renderAtom } from "@/lib/atoms/generator";

export default function useRender() {
  const setRender = useSetRecoilState(renderAtom);

  function handleChange(e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    setRender((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return { handleChange };
}
