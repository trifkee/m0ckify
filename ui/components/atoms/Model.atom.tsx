"use client";

import { useContext } from "react";
import Context from "@/ui/providers/ContextProvider.provider";

import dynamic from "next/dynamic";

const LazyIphone = dynamic(() => import("@/ui/models/Iphone.model"), {
  loading: () => null,
});
const LazyAndroid = dynamic(() => import("@/ui/models/Android.model"), {
  loading: () => null,
});
const LazyTv = dynamic(() => import("@/ui/models/TV.model"), {
  loading: () => null,
});

export default function Model() {
  const { selectedModel } = useContext(Context);

  const renderedModel = () => {
    switch (selectedModel) {
      case "iphone":
        return <LazyIphone scale={0.5} />;
      case "android":
        return <LazyAndroid scale={0.5} />;
      case "tv":
        return <LazyTv scale={0.5} />;

      default:
        return <LazyIphone scale={0.5} />;
    }
  };

  return renderedModel();
}
