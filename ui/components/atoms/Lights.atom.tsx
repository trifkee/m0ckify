import { useRecoilValue } from "recoil";

import { sceneDocumentAtom, sceneLightsAtom } from "@/lib/atoms/generator";
import { SceneLightsType } from "@/lib/types/model.type";

export default function Lights() {
  const sceneDocument = useRecoilValue(sceneDocumentAtom);
  const sceneLights = useRecoilValue(sceneLightsAtom);
  const ambientIntensity = Math.max(0.15, sceneDocument.env.intensity * 0.35);

  return (
    <>
      <ambientLight
        color={sceneDocument.env.color}
        intensity={ambientIntensity}
      />
      <hemisphereLight
        color="#ffffff"
        groundColor="#1a1f2b"
        intensity={Math.max(0.2, sceneDocument.env.intensity * 0.25)}
      />
      {sceneLights.map((light: SceneLightsType, i: number) => (
        <directionalLight
          key={i}
          castShadow={sceneDocument.env.castShadow}
          intensity={light.intensity}
          color={light.color}
          position={[light.position.x, light.position.y, light.position.z]}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={80}
          shadow-bias={-0.0002}
        />
      ))}
    </>
  );
}
