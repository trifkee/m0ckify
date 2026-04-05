import { cameraSettingsAtom } from "@/lib/atoms/generator";
import useCamera from "@/ui/hooks/useCamera.hook";
import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export default function Camera({
  aspect,
  freeroam,
  dampingSpeed,
}: {
  aspect: number;
  freeroam: boolean;
  dampingSpeed: number;
}) {
  const cameraSettings = useRecoilValue(cameraSettingsAtom);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const { updateActiveCamera } = useCamera();

  const camera =
    cameraSettings.cameras.find(
      (sceneCamera) => sceneCamera.id === cameraSettings.activeCameraId
    ) ?? cameraSettings.cameras[0];

  if (!camera) {
    return null;
  }

  return (
    <>
      {camera.type === "perspective" ? (
        <PerspectiveCamera
          makeDefault
          fov={camera.fov}
          aspect={aspect}
          position={camera.position}
          near={camera.near}
          far={camera.far}
          zoom={camera.zoom}
          onUpdate={(currentCamera) =>
            currentCamera.lookAt(camera.target[0], camera.target[1], camera.target[2])
          }
        />
      ) : (
        <OrthographicCamera
          makeDefault
          zoom={camera.zoom}
          position={camera.position}
          near={camera.near}
          far={camera.far}
          onUpdate={(currentCamera) =>
            currentCamera.lookAt(camera.target[0], camera.target[1], camera.target[2])
          }
        />
      )}

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={dampingSpeed}
        target={camera.target}
        enableRotate={freeroam}
        onEnd={(event) => {
          const controls =
            (event?.target as OrbitControlsImpl | undefined) ?? controlsRef.current;

          if (!controls) {
            return;
          }

          updateActiveCamera((currentCamera) => ({
            ...currentCamera,
            position: [
              controls.object.position.x,
              controls.object.position.y,
              controls.object.position.z,
            ],
            target: [controls.target.x, controls.target.y, controls.target.z],
          }));
        }}
      />
    </>
  );
}
