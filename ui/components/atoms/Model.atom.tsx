"use client";

import { useRecoilState, useRecoilValue } from "recoil";
import dynamic from "next/dynamic";

import {
  modelAtom,
  pivotControlsAtom,
  pivotEnabledControlsAtom,
  selectedLayerAtom,
  selectedModelAtom,
} from "@/lib/atoms/generator";
import { ModelType } from "@/lib/types/model.type";
import { PivotControls } from "@react-three/drei";

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
  const renderedModel = () => {
    switch (options.type) {
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

  const selectedLayer = useRecoilValue(selectedLayerAtom);
  const pivotControls = useRecoilValue(pivotControlsAtom);
  const pivotControlsEnabled = useRecoilValue(pivotEnabledControlsAtom);

  return (
    <PivotControls
      offset={[0, 0, 0.1]}
      depthTest={true}
      lineWidth={2}
      disableRotations={pivotControlsEnabled.rotate}
      disableAxes={pivotControlsEnabled.move}
      disableScaling={pivotControlsEnabled.scale}
      disableSliders={pivotControlsEnabled.axes}
      // disableSliders
      visible={pivotControls && options.id === selectedLayer?.id}
    >
      {renderedModel()}
    </PivotControls>
  );
}
