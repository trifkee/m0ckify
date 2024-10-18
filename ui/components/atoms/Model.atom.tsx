"use client";

import { useRecoilValue } from "recoil";
import dynamic from "next/dynamic";

import { selectedModelAtom } from "@/lib/atoms/generator";
import { ModelType } from "@/lib/types/model.type";

const LazyIphone = dynamic(() => import("@/ui/models/Iphone.model"), {
  loading: () => null,
});
const LazyAndroid = dynamic(() => import("@/ui/models/Android.model"), {
  loading: () => null,
});
const LazyTv = dynamic(() => import("@/ui/models/TV.model"), {
  loading: () => null,
});

export default function Model(options: ModelType) {
  const selectedModel = useRecoilValue(selectedModelAtom);

  const renderedModel = () => {
    switch (selectedModel) {
      case "iphone":
        return <LazyIphone options={options} scale={0.5} />;
      case "android":
        return <LazyAndroid options={options} scale={0.5} />;
      case "tv":
        return <LazyTv options={options} scale={0.5} />;

      default:
        return <LazyIphone options={options} scale={0.5} />;
    }
  };

  return renderedModel();
}
