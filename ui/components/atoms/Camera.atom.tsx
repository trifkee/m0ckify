import { cameraSettingsAtom } from "@/lib/atoms/generator";
import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";
import { useRecoilValue } from "recoil";

export default function Camera({
  freeroam,
  dampingSpeed,
}: {
  freeroam: boolean;
  dampingSpeed: number;
}) {
  const camera = useRecoilValue(cameraSettingsAtom);

  return (
    <>
      {camera.type === "perspective" ? (
        <PerspectiveCamera
          makeDefault
          fov={camera.fov}
          position={[0, 0, 10]}
          near={0.1}
          far={100}
          zoom={1}
        />
      ) : (
        <OrthographicCamera
          makeDefault
          zoom={camera.zoom}
          position={[0, 0, 10]}
          near={0.1}
          far={1000}
        />
      )}

      <OrbitControls
        enableDamping
        dampingFactor={dampingSpeed}
        target={[0, 0, 0]}
        enableRotate={freeroam}
      />
    </>
  );
}
