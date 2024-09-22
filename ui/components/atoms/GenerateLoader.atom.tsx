"use client";

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useProgress } from "@react-three/drei";

import { isGeneratingAtom } from "@/lib/atoms/generator";

export default function GenearateLoader() {
  const { progress } = useProgress();

  const setIsGenerateLoading = useSetRecoilState(isGeneratingAtom);

  useEffect(() => {
    if (progress === 100) {
      setIsGenerateLoading(false);
    }
  }, [progress]);

  return null;
}
