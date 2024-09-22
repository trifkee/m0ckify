"use client";

import { Suspense, useEffect, useRef, useState } from "react";

import { useRecoilValue, useSetRecoilState } from "recoil";
import * as THREE from "three";
import { Environment, OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Model from "@/ui/components/atoms/Model.atom";
import Lights from "@/ui/components/atoms/Lights.atom";
import Button from "../components/atoms/Button.atom";

import { RenderType } from "@/lib/types/model.type";

import { LucideHelpCircle, LucideRotate3D } from "lucide-react";
import {
  helpAtom,
  isGeneratingAtom,
  renderAtom,
  sceneDocumentAtom,
} from "@/lib/atoms/generator";

import "@/ui/styles/providers/modelProvider.provider.scss";

export default function ModelProvider() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const sceneDocument = useRecoilValue(sceneDocumentAtom);
  const setRender = useSetRecoilState(renderAtom);
  const setShowHelp = useSetRecoilState(helpAtom);
  const [freeroam, setFreeroam] = useState(false);
  const setIsLoading = useSetRecoilState(isGeneratingAtom);

  useEffect(() => {
    setIsLoading(false);
    setRender((prev: RenderType) => ({
      ...prev,
      w: parentRef.current?.clientWidth as number,
      h: parentRef.current?.clientHeight as number,
    }));
  }, []);

  return (
    <div className="model" id="canvasModel" ref={parentRef}>
      <Suspense fallback={null}>
        <div className="additional-ctas">
          <Button
            className={`freeroam ${freeroam ? "y" : "n"}`}
            onClick={() => setFreeroam((prev) => !prev)}
            variant="editor"
          >
            <LucideRotate3D />
          </Button>

          <Button
            variant="editor"
            onClick={() => setShowHelp(true)}
            className="help"
          >
            <LucideHelpCircle />
          </Button>
        </div>
        <Canvas
          gl={{
            preserveDrawingBuffer: true,
            toneMapping: THREE.NeutralToneMapping,
          }}
          ref={canvasRef}
          linear
          shadows={sceneDocument.env.castShadow ? true : false}
        >
          <Suspense>
            {/* TODO:
              ADD LATER BACKGROUND 
        */}
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
      </Suspense>
    </div>
  );
}

type PresetType =
  | "warehouse"
  | "apartment"
  | "city"
  | "dawn"
  | "forest"
  | "lobby"
  | "night"
  | "park"
  | "studio"
  | "sunset";
