"use client";

import { Suspense, useContext, useRef } from "react";

import { Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Phone from "../models/Phone.model";
import Context from "./ContextProvider.provider";

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
  const { sceneDocument } = useContext(Context);

  return (
    <>
      <ambientLight
        color={sceneDocument.env.color}
        intensity={sceneDocument.env.intensity}
      />
      <directionalLight
        intensity={sceneDocument.lights.leftDirectional.intensity}
        color={sceneDocument.lights.leftDirectional.color}
        position={[
          sceneDocument.lights.leftDirectional.position.x,
          sceneDocument.lights.leftDirectional.position.y,
          sceneDocument.lights.leftDirectional.position.z,
        ]}
      />
      <directionalLight
        intensity={sceneDocument.lights.rightDirectional.intensity}
        color={sceneDocument.lights.rightDirectional.color}
        position={[
          sceneDocument.lights.rightDirectional.position.x,
          sceneDocument.lights.rightDirectional.position.y,
          sceneDocument.lights.rightDirectional.position.z,
        ]}
      />
    </>
  );
}

function Model() {
  return <Phone />;
}
