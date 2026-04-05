import { useSetRecoilState } from "recoil";
import {
  SceneCameraItemType,
  SceneCameraType,
  Vector3Tuple,
} from "@/lib/types/model.type";
import {
  ObjectsLayersAtom,
  renderAtom,
  selectedLayerAtom,
  canvasOptionsAtom,
  layersTabMobileAtom,
  modelAtom,
  sceneLightsAtom,
  sceneDocumentAtom,
  selectedModelAtom,
  helpAtom,
  isGeneratingAtom,
  aiKeyAtom,
  pivotControlsAtom,
  pivotEnabledControlsAtom,
  fogControlsAtom,
  floorReflectionAtom,
  backgroundSettingsAtom,
  cameraSettingsAtom,
} from "@/lib/atoms/generator";

export default function useRestoreGeneratorState() {
  const setObjectsLayers = useSetRecoilState(ObjectsLayersAtom);
  const setRender = useSetRecoilState(renderAtom);
  const setSelectedLayer = useSetRecoilState(selectedLayerAtom);
  const setCanvasOptions = useSetRecoilState(canvasOptionsAtom);
  const setLayersTabMobile = useSetRecoilState(layersTabMobileAtom);
  const setModel = useSetRecoilState(modelAtom);
  const setSceneLights = useSetRecoilState(sceneLightsAtom);
  const setSceneDocument = useSetRecoilState(sceneDocumentAtom);
  const setSelectedModel = useSetRecoilState(selectedModelAtom);
  const setHelp = useSetRecoilState(helpAtom);
  const setIsGenerating = useSetRecoilState(isGeneratingAtom);
  const setAiKey = useSetRecoilState(aiKeyAtom);
  const setPivotControls = useSetRecoilState(pivotControlsAtom);
  const setPivotEnabledControls = useSetRecoilState(pivotEnabledControlsAtom);
  const setFogControls = useSetRecoilState(fogControlsAtom);
  const setFloorReflection = useSetRecoilState(floorReflectionAtom);
  const setBackgroundSettings = useSetRecoilState(backgroundSettingsAtom);
  const setCameraSettings = useSetRecoilState(cameraSettingsAtom);

  function normalizeTuple(value: unknown, fallback: Vector3Tuple): Vector3Tuple {
    if (!Array.isArray(value) || value.length !== 3) {
      return fallback;
    }

    const tuple = value.map((item) => Number(item));

    if (tuple.some((item) => !Number.isFinite(item))) {
      return fallback;
    }

    return tuple as Vector3Tuple;
  }

  function normalizeCameraSettings(value: any): SceneCameraType | null {
    if (!value) {
      return null;
    }

    if (Array.isArray(value.cameras)) {
      const cameras = value.cameras.map((camera: any, index: number) => ({
        id: camera?.id ?? `camera-${index + 1}`,
        name: camera?.name ?? `Camera ${index + 1}`,
        type:
          camera?.type === "ortographic" ? "orthographic" : camera?.type ?? "perspective",
        position: normalizeTuple(camera?.position, [0, 0, 5]),
        target: normalizeTuple(camera?.target, [0, 0, 0]),
        fov: Number(camera?.fov ?? 50),
        zoom: Number(camera?.zoom ?? 1),
        near: Number(camera?.near ?? 0.1),
        far: Number(camera?.far ?? 100),
        effects: Boolean(camera?.effects),
        focalLength: Number(camera?.focalLength ?? 0),
        bokehScale: Number(camera?.bokehScale ?? 0),
        focusDistance: Number(camera?.focusDistance ?? 0),
      })) as SceneCameraItemType[];

      return {
        activeCameraId: value.activeCameraId ?? cameras[0]?.id ?? "camera-1",
        preview: {
          enabled: value.preview?.enabled ?? true,
          showSafeFrame: value.preview?.showSafeFrame ?? true,
        },
        cameras,
      };
    }

    return {
      activeCameraId: "camera-1",
      preview: {
        enabled: true,
        showSafeFrame: true,
      },
      cameras: [
        {
          id: "camera-1",
          name: "Main Camera",
          type: value.type === "ortographic" ? "orthographic" : value.type ?? "perspective",
          position: normalizeTuple(value.position, [0, 0, 5]),
          target: [0, 0, 0],
          fov: Number(value.fov ?? 50),
          zoom: Number(value.zoom ?? 1),
          near: 0.1,
          far: 100,
          effects: Boolean(value.effects),
          focalLength: Number(value.focalLength ?? 0),
          bokehScale: Number(value.bokehScale ?? 0),
          focusDistance: Number(value.focusDistance ?? 0),
        },
      ],
    };
  }

  function restore(state: any) {
    if (!state) return;
    if (state.objectsLayers) setObjectsLayers(state.objectsLayers);
    if (state.render) setRender(state.render);
    if (state.selectedLayer) setSelectedLayer(state.selectedLayer);
    if (state.canvasOptions) setCanvasOptions(state.canvasOptions);
    if (state.layersTabMobile !== undefined) setLayersTabMobile(state.layersTabMobile);
    if (state.model) setModel(state.model);
    if (state.sceneLights) setSceneLights(state.sceneLights);
    if (state.sceneDocument) setSceneDocument(state.sceneDocument);
    if (state.selectedModel) setSelectedModel(state.selectedModel);
    if (state.help !== undefined) setHelp(state.help);
    if (state.isGenerating !== undefined) setIsGenerating(state.isGenerating);
    if (state.aiKey !== undefined) setAiKey(state.aiKey);
    if (state.pivotControls !== undefined) setPivotControls(state.pivotControls);
    if (state.pivotEnabledControls) setPivotEnabledControls(state.pivotEnabledControls);
    if (state.fogControls) setFogControls(state.fogControls);
    if (state.floorReflection) setFloorReflection(state.floorReflection);
    if (state.backgroundSettings) setBackgroundSettings(state.backgroundSettings);
    if (state.cameraSettings) {
      const normalizedCameraSettings = normalizeCameraSettings(state.cameraSettings);

      if (normalizedCameraSettings) {
        setCameraSettings(normalizedCameraSettings);
      }
    }
  }

  return restore;
}
