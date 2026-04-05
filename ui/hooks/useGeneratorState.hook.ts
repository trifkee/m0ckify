import { useRecoilValue } from "recoil";
import {
  ObjectsLayersAtom,
  canvasOptionsAtom,
  sceneLightsAtom,
  sceneDocumentAtom,
  fogControlsAtom,
  floorReflectionAtom,
  backgroundSettingsAtom,
  cameraSettingsAtom,
} from "@/lib/atoms/generator";

export default function useGeneratorState() {
  return {
    objectsLayers: useRecoilValue(ObjectsLayersAtom),
    canvasOptions: useRecoilValue(canvasOptionsAtom),
    sceneLights: useRecoilValue(sceneLightsAtom),
    sceneDocument: useRecoilValue(sceneDocumentAtom),
    fogControls: useRecoilValue(fogControlsAtom),
    floorReflection: useRecoilValue(floorReflectionAtom),
    backgroundSettings: useRecoilValue(backgroundSettingsAtom),
    cameraSettings: useRecoilValue(cameraSettingsAtom),
  };
}
