import { Suspense, useRef } from "react";
import { useRecoilValue } from "recoil";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  Stage,
} from "@react-three/drei";

import Model from "@/ui/components/atoms/Model.atom";
import Lights from "@/ui/components/atoms/Lights.atom";

import { ObjectsLayersAtom, sceneDocumentAtom } from "@/lib/atoms/generator";

import { PresetType } from "@/lib/types/model.type";
import ToneMapping from "../atoms/ToneMapping.atom";

export default function CanvasModel({ freeroam }: { freeroam: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneDocument = useRecoilValue(sceneDocumentAtom);

  const layers = useRecoilValue(ObjectsLayersAtom);

  const mappedModels = layers?.map((model, i) => <Model key={i} {...model} />);

  return (
    <Canvas
      id="canvas-window"
      gl={{
        preserveDrawingBuffer: true,
      }}
      ref={canvasRef}
      linear
      shadows={sceneDocument.env.castShadow}
    >
      <ToneMapping />
      <Suspense fallback={null}>
        {/* TODO: ADD LATER BACKGROUND  */}
        {/* <color attach="background" args={[0, 0, 0]} /> */}
        <Lights />
        {sceneDocument.env.castShadow ? (
          <Stage
            preset={"soft"}
            shadows={"contact"}
            receiveShadow={sceneDocument.env.castShadow}
            castShadow={sceneDocument.env.castShadow}
            environment={sceneDocument.env.preset as PresetType}
            intensity={sceneDocument.env.intensity}
          >
            {mappedModels}
          </Stage>
        ) : (
          <>
            <Environment preset={sceneDocument.env.preset as PresetType} />
            {mappedModels}
          </>
        )}
      </Suspense>

      <OrbitControls enableRotate={freeroam} />
    </Canvas>
  );
}
