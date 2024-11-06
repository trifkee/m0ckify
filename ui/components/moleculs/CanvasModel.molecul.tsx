import { Suspense, useRef } from "react";
import { useRecoilValue } from "recoil";
import { Canvas } from "@react-three/fiber";
import {
  Circle,
  ContactShadows,
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
  Reflector,
  Stage,
} from "@react-three/drei";

import Model from "@/ui/components/atoms/Model.atom";
import Lights from "@/ui/components/atoms/Lights.atom";

import { ObjectsLayersAtom, sceneDocumentAtom } from "@/lib/atoms/generator";

import { PresetType } from "@/lib/types/model.type";
import ToneMapping from "../atoms/ToneMapping.atom";
import { Fog } from "three";

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
      <color attach="background" args={["#2f2e3b"]} />
      <fog attach="fog" args={["#2f2e3b", 0.1, 10]} />
      <ToneMapping />
      <Suspense fallback={null}>
        {/* TODO: ADD LATER BACKGROUND  */}
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
            <Mirror />
          </Stage>
        ) : (
          <>
            <Environment preset={sceneDocument.env.preset as PresetType} />
            {mappedModels}
            <Mirror />
          </>
        )}
      </Suspense>

      <OrbitControls enableRotate={freeroam} />
    </Canvas>
  );
}

const Mirror = () => {
  return (
    <>
      <Circle
        args={[1, 16]}
        receiveShadow
        scale={100}
        rotation-x={-Math.PI / 2}
        position={[0, -2, 0]}
      >
        <MeshReflectorMaterial
          color={"#2f2e3b"}
          envMapIntensity={0}
          blur={[512, 512]}
          mixBlur={1}
          mixStrength={3}
          mixContrast={1}
          resolution={1024}
          mirror={1}
          depthScale={1}
          minDepthThreshold={0.8}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.45}
          roughness={1}
        />
      </Circle>
    </>
  );
};
