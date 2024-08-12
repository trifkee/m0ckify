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
        return <LazyIphone />;
      case "android":
        return <LazyAndroid />;
      case "tv":
        return <LazyTv />;

      default:
        return <LazyIphone />;
    }
  };

  return renderedModel();
}
