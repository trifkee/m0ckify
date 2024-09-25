import { Suspense, useRef } from "react";
import { useRecoilValue } from "recoil";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stage } from "@react-three/drei";

import Model from "@/ui/components/atoms/Model.atom";
import Lights from "@/ui/components/atoms/Lights.atom";

import { sceneDocumentAtom } from "@/lib/atoms/generator";

import { PresetType } from "@/lib/types/model.type";
import ToneMapping from "../atoms/ToneMapping.atom";

export default function CanvasModel({ freeroam }: { freeroam: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneDocument = useRecoilValue(sceneDocumentAtom);

  return (
    <Canvas
      id="canvas-window"
      gl={{
        preserveDrawingBuffer: true,
      }}
      ref={canvasRef}
      linear
      shadows={sceneDocument.env.castShadow ? true : false}
    >
      <ToneMapping />
      <Suspense fallback={null}>
        {/* TODO: ADD LATER BACKGROUND  */}
        {/* <color attach="background" args={["#15151a"]} /> */}
        <Lights />
        {sceneDocument.env.castShadow ? (
          <Stage
            environment={sceneDocument.env.preset as PresetType}
            intensity={sceneDocument.env.intensity}
          >
            <Model />
          </Stage>
        ) : (
          <>
            <Environment preset={sceneDocument.env.preset as PresetType} />
            <Model />
          </>
        )}
      </Suspense>

      <OrbitControls enableRotate={freeroam} />
    </Canvas>
  );
}
