import { Suspense, useRef } from "react";
import { useRecoilValue } from "recoil";
import { Canvas, useFrame } from "@react-three/fiber";
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

import {
  backgroundSettingsAtom,
  floorReflectionAtom,
  fogControlsAtom,
  ObjectsLayersAtom,
  sceneDocumentAtom,
} from "@/lib/atoms/generator";

import { PresetType } from "@/lib/types/model.type";
import ToneMapping from "../atoms/ToneMapping.atom";

export default function CanvasModel({ freeroam }: { freeroam: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneDocument = useRecoilValue(sceneDocumentAtom);
  const reflections = useRecoilValue(floorReflectionAtom);
  const fog = useRecoilValue(fogControlsAtom);
  const background = useRecoilValue(backgroundSettingsAtom);

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
      {background.enabled && (
        <color attach="background" args={[`${background.color}`]} />
      )}
      {fog.enabled && (
        <fog attach="fog" args={[background.color, fog.minFog, fog.maxFog]} />
      )}
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
          </Stage>
        ) : (
          <>
            <Environment preset={sceneDocument.env.preset as PresetType} />
            {mappedModels}
          </>
        )}
      </Suspense>

      {reflections.enabled && (
        <Mirror color={background.color} {...reflections} />
      )}
      <OrbitControls enableRotate={freeroam} />
    </Canvas>
  );
}

const Mirror = ({
  color,
  depth,
  maxTreshold,
  minTreshold,
  roughness,
  strength,
}: {
  color: string;
  roughness: number;
  strength: number;
  depth: number;
  minTreshold: number;
  maxTreshold: number;
}) => {
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
          color={color}
          envMapIntensity={0}
          blur={[512, 512]}
          mixBlur={strength}
          mixStrength={3}
          mixContrast={1}
          resolution={1024}
          mirror={1}
          depthScale={depth}
          minDepthThreshold={minTreshold}
          maxDepthThreshold={maxTreshold}
          depthToBlurRatioBias={0.45}
          roughness={roughness}
        />
      </Circle>
    </>
  );
};
