"use client";

import { Suspense, useContext, useRef, useState } from "react";

import * as THREE from "three";
import { Environment, OrbitControls, Stage } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";

import Context from "./ContextProvider.provider";

import Model from "@/ui/components/atoms/Model.atom";
import Lights from "@/ui/components/atoms/Lights.atom";
import Button from "../components/atoms/Button.atom";
import GenearateLoader from "../components/atoms/GenerateLoader.atom";
import { IoMove } from "react-icons/io5";

import "@/ui/styles/providers/modelProvider.provider.scss";

export default function ModelProvider() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const { sceneDocument, render } = useContext(Context);
  const [freeroam, setFreeroam] = useState(false);

  return (
    <div className="model" id="canvas__model" ref={parentRef}>
      <Suspense fallback={null}>
        <Button
          className={`freeroam ${freeroam ? "y" : "n"}`}
          onClick={() => setFreeroam((prev) => !prev)}
          variant="editor"
        >
          <IoMove />
        </Button>
        <Canvas
          gl={{
            preserveDrawingBuffer: true,
            toneMapping: THREE.NeutralToneMapping,
          }}
          ref={canvasRef}
          linear
          shadows={sceneDocument.env.castShadow ? true : false}
        >
          <GenearateLoader />

          <Suspense>
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
          </Suspense>

          <OrbitControls enableRotate={freeroam} />
        </Canvas>
      </Suspense>
    </div>
  );
}
