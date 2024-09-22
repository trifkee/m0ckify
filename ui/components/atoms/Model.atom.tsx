"use client";

import { useRecoilValue } from "recoil";
import dynamic from "next/dynamic";

import { selectedModelAtom } from "@/lib/atoms/generator";

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
  const selectedModel = useRecoilValue(selectedModelAtom);

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
