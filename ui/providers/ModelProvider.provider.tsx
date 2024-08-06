"use client";

import { useContext } from "react";
import * as THREE from "three";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import Context from "./ContextProvider.provider";
import { IoInvertMode, IoMove, IoSwapHorizontalOutline } from "react-icons/io5";
import Button from "../components/atoms/Button.atom";
import { ModelType } from "@/types/model.type";

export default function ModelProvider() {
  const { model, setModel } = useContext(Context);

  const keyString = JSON.stringify(model.image);

  const texture = useLoader(THREE.TextureLoader, model.image);

  const resetModelPosition = () => {
    setModel((prev: ModelType) => ({
      ...prev,
      position: {
        x: 0,
        y: 0,
      },
    }));
  };

  return (
    <div className="model">
      <Button
        onClick={resetModelPosition}
        variant="transparent"
        className="model__reset-cta"
      >
        Reset
        <IoSwapHorizontalOutline />
      </Button>
      <Canvas>
        <ambientLight intensity={1} />
        <pointLight position={[0, 20, 10]} intensity={1.5} />
        <mesh
          key={keyString}
          rotation={[model.position.y, model.position.x, 0]}
        >
          <boxGeometry args={[3, 3, 3]} />
          <meshStandardMaterial map={texture as THREE.Texture} />
        </mesh>
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}
