import { useContext } from "react";
import Context from "@/ui/providers/ContextProvider.provider";

import { SceneLightsType } from "@/lib/types/model.type";

export default function Lights() {
  const { sceneDocument, sceneLights } = useContext(Context);

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
