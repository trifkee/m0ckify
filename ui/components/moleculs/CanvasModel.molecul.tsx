import { Suspense, useEffect, useMemo, useRef, useState } from "react";
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
import GradientBackground from "../atoms/GradientBackground.atom";

export default function CanvasModel({ freeroam }: { freeroam: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const sceneDocument = useRecoilValue(sceneDocumentAtom);
  const reflections = useRecoilValue(floorReflectionAtom);
  const fog = useRecoilValue(fogControlsAtom);
  const background = useRecoilValue(backgroundSettingsAtom);
  const cameraSettings = useRecoilValue(cameraSettingsAtom);
  const canvas = useRecoilValue(canvasOptionsAtom);

  const render = useRecoilValue(renderAtom);
  const layers = useRecoilValue(ObjectsLayersAtom);
  const renderAspect = render.w / render.h;

  const activeCamera =
    cameraSettings.cameras.find(
      (sceneCamera) => sceneCamera.id === cameraSettings.activeCameraId
    ) ?? cameraSettings.cameras[0];

  useEffect(() => {
    if (!viewportRef.current) {
      return undefined;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) {
        return;
      }

      setViewportSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(viewportRef.current);

    return () => observer.disconnect();
  }, []);

  const frameSize = useMemo(() => {
    if (!cameraSettings.preview.enabled || !viewportSize.width || !viewportSize.height) {
      return {
        width: viewportSize.width || undefined,
        height: viewportSize.height || undefined,
      };
    }

    const viewportAspect = viewportSize.width / viewportSize.height;

    if (viewportAspect > renderAspect) {
      const height = viewportSize.height;
      return {
        width: height * renderAspect,
        height,
      };
    }

    const width = viewportSize.width;

    return {
      width,
      height: width / renderAspect,
    };
  }, [cameraSettings.preview.enabled, renderAspect, viewportSize.height, viewportSize.width]);

  const mappedModels = layers?.map((model) => (
    <Model key={model.id} {...model} />
  ));

  return (
    <div ref={viewportRef} className="canvas-stage-shell">
      <div
        className={`canvas-stage ${cameraSettings.preview.enabled ? "is-framed" : ""}`}
        style={{
          width: frameSize.width,
          height: frameSize.height,
        }}
      >
        <Canvas
          camera={{
            position: activeCamera?.position,
          }}
          dpr={
            typeof window !== "undefined"
              ? Math.min(window.devicePixelRatio, Math.max(1, render.quality))
              : 2
          }
          id="canvas-window"
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: true,
          }}
          ref={canvasRef}
          linear
          shadows={sceneDocument.env.castShadow}
        >
          {background.enabled && background.type === "gradient" && (
            <GradientBackground
              color={background.color}
              gradientColor={background.gradientColor}
              gradientAngle={background.gradientAngle}
              gradientColorStop={background.gradientColorStop}
            />
          )}
          {background.enabled && background.type !== "gradient" && (
            <color attach="background" args={[`${background.color}`]} />
          )}
          {fog.enabled && (
            <fog attach="fog" args={[background.color, fog.minFog, fog.maxFog]} />
          )}

          <ToneMapping />
          <Suspense fallback={null}>
            <Camera
              aspect={renderAspect}
              freeroam={freeroam}
              dampingSpeed={canvas.dampingSpeed}
            />
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
      </div>

      {cameraSettings.preview.enabled && cameraSettings.preview.showSafeFrame && (
        <div
          className="safe-frame-overlay"
          style={{
            width: frameSize.width,
            height: frameSize.height,
          }}
        >
          <div className="safe-frame-overlay__border" />
          <div className="safe-frame-overlay__meta">
            <span>{render.w} x {render.h}</span>
            <span>{renderAspect.toFixed(2)}:1</span>
          </div>
        </div>
      )}
    </div>
  );
}
