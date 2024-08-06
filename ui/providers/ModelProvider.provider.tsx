"use client";

import { useContext, useRef } from "react";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Context from "./ContextProvider.provider";
import { IoSwapHorizontalOutline } from "react-icons/io5";
import Button from "../components/atoms/Button.atom";
import { ModelType } from "@/lib/types/model.type";
import Phone from "../models/Phone.model";
import { saveImageFromCanvas } from "@/lib/helpers/saveImage";

export default function ModelProvider() {
  const { setModel } = useContext(Context);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        ref={canvasRef}
        linear
        shadows
      >
        <Lights />
        <Model />

        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}

function Lights() {
  return (
    <>
      <Environment preset="park" environmentIntensity={0.5} />
      <ambientLight intensity={1} />
      <directionalLight intensity={10} position={[-2, -2, -5]} />
      <directionalLight intensity={2} position={[-2, 1, 5]} />
    </>
  );
}

function Model() {
  return <Phone />;
}
