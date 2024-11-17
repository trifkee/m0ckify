import { useRecoilValue } from "recoil";
import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";

import { cameraSettingsAtom } from "@/lib/atoms/generator";

export default function Camera({ freeroam }: { freeroam: boolean }) {
  const camera = useRecoilValue(cameraSettingsAtom);

  return (
    <>
      {camera.type === "perspective" ? (
        <PerspectiveCamera
          makeDefault
          fov={camera.fov}
          position={[0, 5, 10]}
          near={0.1}
          far={100}
          zoom={1}
        />
      ) : (
        <OrthographicCamera
          makeDefault
          zoom={camera.zoom}
          position={[0, 5, 10]}
          near={0.1}
          far={1000}
        />
      )}

      <OrbitControls
        enableDamping
        dampingFactor={0.01}
        target={[0, 0, 0]}
        enableRotate={freeroam}
      />
    </>
  );
}
