"use client";

import { Suspense, useContext, useEffect, useRef, useState } from "react";

import { Environment, OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Context from "./ContextProvider.provider";
import { SceneLightsType } from "@/lib/types/model.type";

import Iphone from "@/ui/models/Iphone.model";
import Android from "@/ui/models/Android.model";
import TV from "@/ui/models/TV.model";

export default function ModelProvider() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const { sceneDocument, selectedModel } = useContext(Context);

  return (
    <div className="model" ref={parentRef}>
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
        {sceneDocument.env.castShadow ? (
          <Stage
            environment={sceneDocument.env.preset}
            intensity={sceneDocument.env.intensity}
          >
            <Model />
          </Stage>
        ) : (
          <>
            <Environment preset={sceneDocument.env.preset} />
            <Model />
          </>
        )}

        <OrbitControls enableRotate={false} />
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
  const { selectedModel } = useContext(Context);

  const renderModel = () => {
    switch (selectedModel) {
      case "iphone":
        return <Iphone />;
      case "android":
        return <Android />;
      case "tv":
        return <TV />;

      default:
        <Android />;
    }
  };

  return (
    <>
      {renderModel()}
      {/* <Phone1 /> */}
      {/* <Phone /> */}
    </>
  );
}

// {/* <pointLight
//       key={i}
//       intensity={light.intensity * 100}
//       decay={2}
//       distance={5}
//       position={[light.position.y, light.position.x, light.position.z]}
//       rotation={[-Math.PI / 2, 0, 0]}
//     /> */}
