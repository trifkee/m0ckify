"use client";

import { Suspense, useContext, useRef } from "react";

import { Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Phone from "../models/Phone.model";
import Context from "./ContextProvider.provider";
import { SceneLightsType } from "@/lib/types/model.type";

export default function ModelProvider() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { sceneDocument } = useContext(Context);

  return (
    <div className="model">
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        ref={canvasRef}
        linear
        shadows={sceneDocument.env.castShadow ? true : false}
      >
        {/* TODO:
              ADD LATER BACKGROUND 
        */}
        {/* <color attach="background" args={["#15151a"]} /> */}

        <Lights />
        <Stage
          environment={sceneDocument.env.preset}
          intensity={sceneDocument.env.intensity}
          castShadow={sceneDocument.env.castShadow === true ? true : false}
        >
          <Model />
        </Stage>

        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}

function Lights() {
  const { sceneDocument, sceneLights } = useContext(Context);

  return (
    <>
      <ambientLight
        color={sceneDocument.env.color}
        intensity={sceneDocument.env.intensity}
      />
      {sceneLights.map((light: SceneLightsType, i: number) => (
        <directionalLight
          key={i}
          intensity={light.intensity}
          color={light.color}
          position={[light.position.x, light.position.y, light.position.z]}
        />
      ))}
    </>
  );
}

function Model() {
  return <Phone />;
}
