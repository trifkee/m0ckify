"use client";

import { OrbitControls, Sphere } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useContext } from "react";
import Context from "./ContextProvider.provider";

export default function ModelProvider() {
  const { modelPosition } = useContext(Context);

  return (
    <div className="model">
      <Canvas>
        <ambientLight intensity={1} />
        <pointLight position={[0, 20, 10]} intensity={1.5} />
        <mesh rotation={[modelPosition.y, modelPosition.x, 0]}>
          <boxGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" color={"#6be092"} />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
