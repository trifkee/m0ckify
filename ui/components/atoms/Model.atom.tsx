"use client";

import { useRecoilState, useRecoilValue } from "recoil";
import dynamic from "next/dynamic";

import {
  modelAtom,
  ObjectsLayersAtom,
  pivotControlsAtom,
  pivotEnabledControlsAtom,
  selectedLayerAtom,
  selectedModelAtom,
} from "@/lib/atoms/generator";
import { ModelType } from "@/lib/types/model.type";
import { PivotControls } from "@react-three/drei";
import { useRef, useState } from "react";

import * as THREE from "three";

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
        return <LazyIphone reference={modelRef} options={options} scale={1} />;
      case "android":
        return <LazyAndroid options={options} scale={0.5} />;
      case "tv":
        return <LazyTv options={options} scale={1} />;

      default:
        return <LazyIphone reference={modelRef} options={options} scale={1} />;
    }
  };

  const selectedLayer = useRecoilValue(selectedLayerAtom);
  const pivotControls = useRecoilValue(pivotControlsAtom);
  const pivotControlsEnabled = useRecoilValue(pivotEnabledControlsAtom);

  const [layers, setLayers] = useRecoilState(ObjectsLayersAtom);

  const modelRef = useRef<any>(null);

  const [position, setPosition] = useState({
    position: new THREE.Vector3(
      selectedLayer?.layer.position.x,
      selectedLayer?.layer.position.y,
      selectedLayer?.layer.position.z
    ),
    rotation: new THREE.Quaternion(
      selectedLayer?.layer.rotation.x,
      selectedLayer?.layer.rotation.y,
      selectedLayer?.layer.rotation.z
    ),
  });

  function onPivotDrag(local: THREE.Matrix4) {
    const position = new THREE.Vector3(
      selectedLayer?.layer.position.x,
      selectedLayer?.layer.position.y,
      selectedLayer?.layer.position.z
    );
    const scale = new THREE.Vector3();
    const quaternion = new THREE.Quaternion(
      selectedLayer?.layer.rotation.x,
      selectedLayer?.layer.rotation.y,
      selectedLayer?.layer.rotation.z
    );

    local.decompose(position, quaternion, scale);

    setPosition({
      position: position,
      rotation: quaternion,
    });
  }

  function onPivotDragEnd() {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === selectedLayer?.id
          ? {
              ...layer,
              position: {
                x: position.position.x,
                y: position.position.y,
                z: position.position.z,
              },
              rotation: {
                x: position.rotation.x,
                y: position.rotation.y,
                z: position.rotation.z,
              },
            }
          : layer
      )
    );
  }

  return (
    <PivotControls
      anchor={[0, 0, 0]}
      offset={[0, 0, 0.1]}
      depthTest={false}
      lineWidth={3}
      scale={2}
      disableRotations={pivotControlsEnabled.rotate}
      disableAxes={pivotControlsEnabled.move}
      disableScaling={pivotControlsEnabled.scale}
      disableSliders={pivotControlsEnabled.axes}
      visible={pivotControls && options.id === selectedLayer?.id}
      onDrag={onPivotDrag}
      onDragEnd={onPivotDragEnd}
    >
      {renderedModel()}
    </PivotControls>
  );
}
