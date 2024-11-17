"use client";

import { useRecoilValue } from "recoil";

import NumberInput from "../../atoms/NumberInput.atom";

import useCamera from "@/ui/hooks/useCamera.hook";

import { CAMERA_STYLE } from "@/lib/constants/generator";
import { CameraEnum } from "@/lib/enum/generate.enum";
import { cameraSettingsAtom } from "@/lib/atoms/generator";

import { LucideScanEye, Video } from "lucide-react";

import "@/ui/styles/moleculs/camera.molecul.scss";

export default function Camera() {
  const cameraSettings = useRecoilValue(cameraSettingsAtom);

  const { handleChange, handleCameraAngle: handleCameraAngleHook } =
    useCamera();

  function handleCameraAngle(angle: string) {
    switch (angle) {
      case CameraEnum.TopLeft:
        return handleCameraAngleHook([-20, 10, 10]);

      case CameraEnum.TopCenter:
        return handleCameraAngleHook([0, 5, 5]);

      case CameraEnum.TopRight:
        return handleCameraAngleHook([5, 5, 5]);

      case CameraEnum.CenterLeft:
        return handleCameraAngleHook([-5, 0, 5]);

      case CameraEnum.CenterCenter:
        return handleCameraAngleHook([0, 0, 5]);

      case CameraEnum.CenterRight:
        return handleCameraAngleHook([5, 0, 5]);

      case CameraEnum.BottomLeft:
        return handleCameraAngleHook([-5, -5, 5]);

      case CameraEnum.BottomCenter:
        return handleCameraAngleHook([0, -5, 5]);

      case CameraEnum.BottomRight:
        return handleCameraAngleHook([5, -5, 5]);

      default:
        throw new Error(`Unknown camera angle: ${angle}`);
    }
  }

  return (
    <details className="control background">
      <summary className="control__title">
        Camera
        <Video />
      </summary>

      <div className="control__section select">
        <p className="title">Type</p>

        <select
          name="type"
          defaultValue={cameraSettings.type}
          id="type"
          onChange={handleChange}
        >
          {CAMERA_STYLE.map((camera) => (
            <option key={camera.id} value={camera.name}>
              {camera.title}
            </option>
          ))}
        </select>
      </div>
      {/* 
      <div className="control__section camera-position">
        <p className="title">Position</p>

        <div className="position-grid">
          <div
            onClick={() => handleCameraAngle(CameraEnum.TopLeft)}
            className="position-grid__position"
          >
            <Focus />
          </div>
          <div
            onClick={() => handleCameraAngle(CameraEnum.TopCenter)}
            className="position-grid__position"
          >
            <Focus />
          </div>
          <div
            onClick={() => handleCameraAngle(CameraEnum.TopRight)}
            className="position-grid__position"
          >
            <Focus />
          </div>
          <div
            onClick={() => handleCameraAngle(CameraEnum.CenterLeft)}
            className="position-grid__position"
          >
            <Focus />
          </div>
          <div
            onClick={() => handleCameraAngle(CameraEnum.CenterCenter)}
            className="position-grid__position"
          >
            <Focus />
          </div>
          <div
            onClick={() => handleCameraAngle(CameraEnum.CenterRight)}
            className="position-grid__position"
          >
            <Focus />
          </div>
          <div
            onClick={() => handleCameraAngle(CameraEnum.BottomLeft)}
            className="position-grid__position"
          >
            <Focus />
          </div>
          <div
            onClick={() => handleCameraAngle(CameraEnum.BottomCenter)}
            className="position-grid__position"
          >
            <Focus />
          </div>
          <div
            onClick={() => handleCameraAngle(CameraEnum.BottomRight)}
            className="position-grid__position"
          >
            <Focus />
          </div>
        </div>
      </div> */}
      {/* <div className="control__section">
        <Checkbox
          title="Effects"
          htmlName="effects"
          onChange={handleChange}
          value={cameraSettings.effects}
        />
      </div> */}

      <div className="position">
        {cameraSettings.type == "perspective" ? (
          <div className="control__section">
            <p className="title">Field of View</p>
            <NumberInput
              label={<LucideScanEye />}
              name="fov"
              value={cameraSettings.fov}
              onChange={handleChange}
            />
          </div>
        ) : (
          <div className="control__section">
            <p className="title">Zoom</p>
            <NumberInput
              label={<LucideScanEye />}
              name="zoom"
              min={1}
              value={cameraSettings.zoom}
              onChange={handleChange}
            />
          </div>
        )}

        {/* <div className="control__section">
            <p className="title">Focal Length</p>
            <NumberInput
              label={<RulerIcon />}
              name="focalLength"
              value={cameraSettings.focalLength}
              onChange={handleChange}
            />
          </div> */}

        {/* <div className="control__section">
            <p className="title">Focus Distance</p>
            <NumberInput
              label={<RulerIcon />}
              name="focusDistance"
              value={cameraSettings.focusDistance}
              onChange={handleChange}
            />
          </div> */}

        {/* <div className="control__section">
            <p className="title">Bokeh Scale </p>
            <NumberInput
              label={<RulerIcon />}
              name="bokehScale"
              value={cameraSettings.bokehScale}
              onChange={handleChange}
            />
          </div> */}
      </div>
    </details>
  );
}
