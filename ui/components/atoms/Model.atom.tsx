"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useRecoilValue } from "recoil";
import dynamic from "next/dynamic";
import { PivotControls } from "@react-three/drei";

import {
  pivotControlsAtom,
  pivotEnabledControlsAtom,
  selectedLayerAtom,
} from "@/lib/atoms/generator";

import { ModelType } from "@/lib/types/model.type";
import useModel from "@/ui/hooks/useModel.hook";

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
  const { handleSyncPivotTransform } = useModel();

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

  const modelMatrix = useMemo(() => {
    const position = new THREE.Vector3(
      options.position.x,
      options.position.y,
      options.position.z
    );
    const rotation = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        options.rotation.x,
        options.rotation.y,
        options.rotation.z
      )
    );

    return new THREE.Matrix4().compose(
      position,
      rotation,
      new THREE.Vector3(1, 1, 1)
    );
  }, [
    options.position.x,
    options.position.y,
    options.position.z,
    options.rotation.x,
    options.rotation.y,
    options.rotation.z,
  ]);

  const [pivotMatrix, setPivotMatrix] = useState<THREE.Matrix4>(() =>
    modelMatrix.clone()
  );

  useEffect(() => {
    setPivotMatrix(modelMatrix.clone());
  }, [modelMatrix]);

  const inversePivotMatrix = useMemo(
    () => modelMatrix.clone().invert(),
    [modelMatrix]
  );

  const latestDragMatrixRef = useRef<THREE.Matrix4>(new THREE.Matrix4());

  const handlePivotDragStart = () => {
    latestDragMatrixRef.current.copy(pivotMatrix);
  };

  const handlePivotDrag = (localMatrix: THREE.Matrix4) => {
    latestDragMatrixRef.current.copy(localMatrix);
    // Keep pivot visually responsive during drag without committing global state.
    setPivotMatrix(localMatrix.clone());
  };

  const handlePivotDragEnd = () => {
    const nextPosition = new THREE.Vector3();
    const nextRotation = new THREE.Quaternion();
    const nextScale = new THREE.Vector3();
    const nextEuler = new THREE.Euler();

    latestDragMatrixRef.current.decompose(nextPosition, nextRotation, nextScale);
    nextEuler.setFromQuaternion(nextRotation, "XYZ");

    handleSyncPivotTransform({
      position: {
        x: Number(nextPosition.x.toFixed(4)),
        y: Number(nextPosition.y.toFixed(4)),
        z: Number(nextPosition.z.toFixed(4)),
      },
      rotation: {
        x: Number(nextEuler.x.toFixed(4)),
        y: Number(nextEuler.y.toFixed(4)),
        z: Number(nextEuler.z.toFixed(4)),
      },
    });
  };

  return (
    /*
      TODO:
        FIX DISABLED OPTIONS FOR INACTIVE TAB
        WHEN CALCULATION FOR POSITION IS FIXED
    */
    <PivotControls
      autoTransform={false}
      matrix={pivotMatrix}
      offset={[0, 0, 0]}
      anchor={[0, 0, 0]}
      depthTest={false}
      lineWidth={3}
      onDragStart={handlePivotDragStart}
      onDrag={handlePivotDrag}
      onDragEnd={handlePivotDragEnd}
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
      <group matrix={inversePivotMatrix} matrixAutoUpdate={false}>
        {renderedModel()}
      </group>
    </PivotControls>
  );
}
