"use client";

import { cameraSettingsAtom } from "@/lib/atoms/generator";
import { SceneCameraItemType, Vector3Tuple } from "@/lib/types/model.type";
import { ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";

export default function useCamera() {
  const setCamera = useSetRecoilState(cameraSettingsAtom);

  function updateActiveCamera(
    updater: (camera: SceneCameraItemType) => SceneCameraItemType
  ) {
    setCamera((prev) => ({
      ...prev,
      cameras: prev.cameras.map((camera) =>
        camera.id === prev.activeCameraId ? updater(camera) : camera
      ),
    }));
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    const numericValue = Number(value);

    updateActiveCamera((camera) => ({
      ...camera,
      [name]: Number.isFinite(numericValue) && value !== "" ? numericValue : value,
    }));
  }

  function handleCameraAngle(value: Vector3Tuple) {
    updateActiveCamera((camera) => ({
      ...camera,
      position: value,
    }));
  }

  function handleActiveCameraChange(cameraId: string) {
    setCamera((prev) => ({
      ...prev,
      activeCameraId: cameraId,
    }));
  }

  function handleCameraPosition(axis: 0 | 1 | 2, value: number) {
    if (!Number.isFinite(value)) return;

    updateActiveCamera((camera) => {
      const nextPosition = [...camera.position] as Vector3Tuple;
      nextPosition[axis] = value;

      return {
        ...camera,
        position: nextPosition,
      };
    });
  }

  function handleCameraTarget(axis: 0 | 1 | 2, value: number) {
    if (!Number.isFinite(value)) return;

    updateActiveCamera((camera) => {
      const nextTarget = [...camera.target] as Vector3Tuple;
      nextTarget[axis] = value;

      return {
        ...camera,
        target: nextTarget,
      };
    });
  }

  function handlePreviewChange(key: "enabled" | "showSafeFrame", value: boolean) {
    setCamera((prev) => ({
      ...prev,
      preview: {
        ...prev.preview,
        [key]: value,
      },
    }));
  }

  function addSceneCamera() {
    setCamera((prev) => {
      const newIndex = prev.cameras.length + 1;
      const activeCamera =
        prev.cameras.find((camera) => camera.id === prev.activeCameraId) ??
        prev.cameras[0];
      const newCameraId = `camera-${newIndex}`;

      return {
        ...prev,
        activeCameraId: newCameraId,
        cameras: [
          ...prev.cameras,
          {
            ...activeCamera,
            id: newCameraId,
            name: `Camera ${newIndex}`,
          },
        ],
      };
    });
  }

  function removeActiveCamera() {
    setCamera((prev) => {
      if (prev.cameras.length <= 1) {
        return prev;
      }

      const nextCameras = prev.cameras.filter(
        (camera) => camera.id !== prev.activeCameraId
      );

      return {
        ...prev,
        activeCameraId: nextCameras[0].id,
        cameras: nextCameras,
      };
    });
  }

  function renameActiveCamera(name: string) {
    updateActiveCamera((camera) => ({
      ...camera,
      name,
    }));
  }

  return {
    addSceneCamera,
    handleActiveCameraChange,
    handleCameraAngle,
    handleCameraPosition,
    handleCameraTarget,
    handleChange,
    handlePreviewChange,
    removeActiveCamera,
    renameActiveCamera,
    updateActiveCamera,
  };
}
