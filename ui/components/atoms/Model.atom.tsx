"use client";

import { useRecoilValue } from "recoil";
import dynamic from "next/dynamic";
import { PivotControls } from "@react-three/drei";

import {
  pivotControlsAtom,
  pivotEnabledControlsAtom,
  selectedLayerAtom,
} from "@/lib/atoms/generator";

import { ModelType } from "@/lib/types/model.type";

const LazyIphone = dynamic(() => import("@/ui/models/IphoneNew.model"), {
  loading: () => null,
});
const LazyAndroid = dynamic(() => import("@/ui/models/Samsung.model"), {
  loading: () => null,
});
const LazyTv = dynamic(() => import("@/ui/models/TVNew.model"), {
  loading: () => null,
});
const LazyIphoneN = dynamic(() => import("@/ui/models/Iphone.model"), {
  loading: () => null,
});
const LazyAndroidN = dynamic(() => import("@/ui/models/Android.model"), {
  loading: () => null,
});
const LazyTvN = dynamic(() => import("@/ui/models/TV.model"), {
  loading: () => null,
});
const LazyLaptop = dynamic(() => import("@/ui/models/Laptop.model"), {
  loading: () => null,
});

export default function Model(options: ModelType) {
  const renderedModel = () => {
    switch (options.type) {
      case "iphone":
        return options.realistic ? (
          // @ts-expect-error
          <LazyIphone options={options} scale={10} />
        ) : (
          <LazyIphoneN options={options} scale={0.5} />
        );
      case "android":
        return options.realistic ? (
          // @ts-expect-error
          <LazyAndroid options={options} scale={10} />
        ) : (
          <LazyAndroidN options={options} scale={0.5} />
        );
      case "tv":
        return options.realistic ? (
          // @ts-expect-error
          <LazyTv options={options} scale={2} />
        ) : (
          <LazyTvN options={options} scale={4} />
        );

      case "laptop":
        return <LazyLaptop options={options} scale={2} />;

      default:
        return options.realistic ? (
          // @ts-expect-error
          <LazyIphone options={options} scale={10} />
        ) : (
          <LazyIphoneN options={options} scale={0.5} />
        );
    }
  };

  const selectedLayer = useRecoilValue(selectedLayerAtom);
  const pivotControls = useRecoilValue(pivotControlsAtom);
  const pivotControlsEnabled = useRecoilValue(pivotEnabledControlsAtom);

  return (
    /*
      TODO:
        FIX DISABLED OPTIONS FOR INACTIVE TAB
        WHEN CALCULATION FOR POSITION IS FIXED
    */
    <PivotControls
      offset={[0, 0, 0]}
      depthTest={false}
      lineWidth={3}
      disableRotations={
        options.id !== selectedLayer?.id || pivotControlsEnabled.rotate
      }
      disableAxes={
        options.id !== selectedLayer?.id || pivotControlsEnabled.move
      }
      disableScaling={
        options.id !== selectedLayer?.id || pivotControlsEnabled.scale
      }
      disableSliders={
        options.id !== selectedLayer?.id || pivotControlsEnabled.axes
      }
      visible={pivotControls && options.id === selectedLayer?.id}
    >
      {renderedModel()}
    </PivotControls>
  );
}
