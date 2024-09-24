import { Suspense, useRef } from "react";
import { useRecoilValue } from "recoil";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stage } from "@react-three/drei";

import Model from "@/ui/components/atoms/Model.atom";
import Lights from "@/ui/components/atoms/Lights.atom";

import { sceneDocumentAtom } from "@/lib/atoms/generator";

import { PresetType } from "@/lib/types/model.type";

export default function CanvasModel({ freeroam }: { freeroam: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneDocument = useRecoilValue(sceneDocumentAtom);

  return (
    <Canvas
      gl={{
        preserveDrawingBuffer: true,
        toneMappingExposure: 0.5,

        toneMapping: THREE.NeutralToneMapping,
        // toneMapping: THREE.NeutralToneMapping,
      }}
      ref={canvasRef}
      linear
      shadows={sceneDocument.env.castShadow ? true : false}
    >
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
