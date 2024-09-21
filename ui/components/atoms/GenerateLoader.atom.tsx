"use client";

import Context from "@/ui/providers/ContextProvider.provider";
import { Html, useProgress } from "@react-three/drei";
import { useContext, useEffect, useState } from "react";

export default function GenearateLoader() {
  const { progress } = useProgress();
  const { setIsGenerateLoading, isGenerateLoading } = useContext(Context);

  useEffect(() => {
    if (progress === 100) {
      setIsGenerateLoading(false);
    }
  }, [progress]);

  return null;
}
