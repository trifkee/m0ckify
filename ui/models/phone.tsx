"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";

export default function Model() {
  const { nodes, materials } = useGLTF("/models/test.glb");
  const ref = useRef<any>(null);

  useFrame((state, delta) => {
    easing.dampE(
      ref.current.rotation,
      [state.pointer.y / 15, -state.pointer.x / 8, 0],
      0.25,
      delta
    );

    // @ts-ignore
    easing.dampC(materials.lambert1.color, "#FF8F00", 0.25, delta);

    easing.damp3(state.camera.position, [0.25, 0, 1], 0.25, delta);
  });

  return (
    <group ref={ref}>
      <mesh
        castShadow
        // @ts-ignore
        geometry={nodes.shirt.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
        rotation={[-0.5, 0.5, 0.15]}
      />
    </group>
  );
}
