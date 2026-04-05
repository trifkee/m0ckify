import { useSetRecoilState } from "recoil";
import {
  SceneCameraItemType,
  SceneCameraType,
  Vector3Tuple,
  ModelType,
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

  function normalizeNumber(value: unknown, fallback: number): number {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : fallback;
  }

  function normalizeObjectsLayers(value: any): ModelType[] | null {
    if (!Array.isArray(value)) {
      return null;
    }

    const allowedTypes: ModelType["type"][] = ["iphone", "android", "tv", "laptop"];
    const allowedTextures: ModelType["texture"][] = ["plastic", "marble"];

    return value.map((layer: any, index: number) => {
      const layerType = allowedTypes.includes(layer?.type) ? layer.type : "iphone";
      const layerTexture = allowedTextures.includes(layer?.texture) ? layer.texture : "plastic";

      return {
        id: String(layer?.id ?? `layer-${index + 1}`),
        realistic: Boolean(layer?.realistic),
        type: layerType,
        title: String(layer?.title ?? `Layer ${index + 1}`),
        color: String(layer?.color ?? "#ffffff"),
        texture: layerTexture,
        bodyReflection: normalizeNumber(layer?.bodyReflection, 0),
        screenReflection: normalizeNumber(layer?.screenReflection, 0),
        screenAlphaReflection: normalizeNumber(layer?.screenAlphaReflection, 0.1),
        position: {
          x: normalizeNumber(layer?.position?.x, 0),
          y: normalizeNumber(layer?.position?.y, 0),
          z: normalizeNumber(layer?.position?.z, 0),
        },
        rotation: {
          x: normalizeNumber(layer?.rotation?.x, 0),
          y: normalizeNumber(layer?.rotation?.y, 0),
          z: normalizeNumber(layer?.rotation?.z, 0),
        },
        image: {
          src: typeof layer?.image?.src === "string" ? layer.image.src : null,
          isDefault: Boolean(layer?.image?.isDefault),
          width: normalizeNumber(layer?.image?.width, 0),
          height: normalizeNumber(layer?.image?.height, 0),
          x: normalizeNumber(layer?.image?.x, 0),
          y: normalizeNumber(layer?.image?.y, 0),
        },
      };
    });
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
    if (state.objectsLayers) {
      const normalizedObjectsLayers = normalizeObjectsLayers(state.objectsLayers);

      if (normalizedObjectsLayers) {
        setObjectsLayers(normalizedObjectsLayers);
        setSelectedLayer(null);
      }
    }
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
