import { useSetRecoilState } from "recoil";
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
    if (state.cameraSettings) setCameraSettings(state.cameraSettings);
  }

  return restore;
}
