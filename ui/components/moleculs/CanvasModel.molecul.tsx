import { Suspense, useRef } from "react";
import { useRecoilValue } from "recoil";
import { Canvas } from "@react-three/fiber";
import { Environment, Stage } from "@react-three/drei";

import Model from "@/ui/components/atoms/Model.atom";
import Lights from "@/ui/components/atoms/Lights.atom";

import {
  backgroundSettingsAtom,
  cameraSettingsAtom,
  canvasOptionsAtom,
  floorReflectionAtom,
  fogControlsAtom,
  ObjectsLayersAtom,
  renderAtom,
  sceneDocumentAtom,
} from "@/lib/atoms/generator";

import { PresetType } from "@/lib/types/model.type";
import ToneMapping from "../atoms/ToneMapping.atom";
import CanvasMirror from "../atoms/CanvasMirror.atom";
import Camera from "../atoms/Camera.atom";

export default function CanvasModel({ freeroam }: { freeroam: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneDocument = useRecoilValue(sceneDocumentAtom);
  const reflections = useRecoilValue(floorReflectionAtom);
  const fog = useRecoilValue(fogControlsAtom);
  const background = useRecoilValue(backgroundSettingsAtom);
  const camera = useRecoilValue(cameraSettingsAtom);
  const canvas = useRecoilValue(canvasOptionsAtom);

  const render = useRecoilValue(renderAtom);
  const layers = useRecoilValue(ObjectsLayersAtom);

  const mappedModels = layers?.map((model, i) => <Model key={i} {...model} />);
  return (
    <Canvas
      camera={{
        position: camera.position,
      }}
      id="canvas-window"
      gl={{
        pixelRatio:
          typeof window !== "undefined"
            ? Math.min(window.devicePixelRatio, Math.max(1, render.quality))
            : 3,
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
        <Camera freeroam={freeroam} dampingSpeed={canvas.dampingSpeed} />
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
            <Environment
              environmentIntensity={sceneDocument.env.intensity}
              preset={sceneDocument.env.preset as PresetType}
            />
            {mappedModels}
          </>
        )}
      </Suspense>

      {reflections.enabled && (
        <CanvasMirror color={background.color} {...reflections} />
      )}
    </Canvas>
  );
}
