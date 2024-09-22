import { useRecoilValue } from "recoil";

import { sceneDocumentAtom, sceneLightsAtom } from "@/lib/atoms/generator";
import { SceneLightsType } from "@/lib/types/model.type";

export default function Lights() {
  const sceneDocument = useRecoilValue(sceneDocumentAtom);
  const sceneLights = useRecoilValue(sceneLightsAtom);

  return (
    <>
      <ambientLight
        color={sceneDocument.env.color}
        intensity={sceneDocument.env.intensity}
      />
      {sceneLights.map((light: SceneLightsType, i: number) => (
        <directionalLight
          key={i}
          intensity={light.intensity}
          color={light.color}
          position={[light.position.x, light.position.y, light.position.z]}
        />
      ))}
    </>
  );
}
