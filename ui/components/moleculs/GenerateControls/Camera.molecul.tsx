"use client";

import { useRecoilValue } from "recoil";
import { useTranslations } from "next-intl";

import NumberInput from "../../atoms/NumberInput.atom";
import Button from "../../atoms/Button.atom";

import useCamera from "@/ui/hooks/useCamera.hook";

import { CAMERA_STYLE } from "@/lib/constants/generator";
import { CameraEnum } from "@/lib/enum/generate.enum";
import { cameraSettingsAtom } from "@/lib/atoms/generator";

import {
  LucideCamera,
  LucideCrosshair,
  LucidePlus,
  LucideScanEye,
  LucideTrash2,
  Video,
} from "lucide-react";

import "@/ui/styles/moleculs/camera.molecul.scss";

export default function Camera() {
  const t = useTranslations("generate.camera");
  const cameraSettings = useRecoilValue(cameraSettingsAtom);
  const activeCamera =
    cameraSettings.cameras.find(
      (camera) => camera.id === cameraSettings.activeCameraId
    ) ?? cameraSettings.cameras[0];

  const {
    addSceneCamera,
    handleActiveCameraChange,
    handleChange,
    handleCameraAngle: handleCameraAngleHook,
    handleCameraPosition,
    handleCameraTarget,
    removeActiveCamera,
    renameActiveCamera,
  } = useCamera();

  if (!activeCamera) {
    return null;
  }

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
        {t("title")}
        <Video />
      </summary>

      <div className="control__section select">
        <p className="title">{t("sceneCamera")}</p>
        <select
          name="activeCameraId"
          id="activeCameraId"
          value={cameraSettings.activeCameraId}
          onChange={(e) => handleActiveCameraChange(e.target.value)}
        >
          {cameraSettings.cameras.map((camera) => (
            <option key={camera.id} value={camera.id}>
              {camera.name}
            </option>
          ))}
        </select>
      </div>

      <div className="control__section camera-actions-row">
        <Button variant="editor" onClick={addSceneCamera}>
          <span>{t("addCamera")}</span>
          <LucidePlus />
        </Button>
        <Button
          variant="editor"
          className={cameraSettings.cameras.length === 1 ? "disabled" : "danger"}
          disabled={cameraSettings.cameras.length === 1}
          onClick={removeActiveCamera}
        >
          <span>{t("remove")}</span>
          <LucideTrash2 />
        </Button>
      </div>

      <div className="control__section">
        <p className="title">{t("name")}</p>
        <input
          className="input"
          type="text"
          value={activeCamera.name}
          onChange={(e) => renameActiveCamera(e.target.value)}
          placeholder={t("cameraName")}
        />
      </div>

      <div className="control__section select">
        <p className="title">{t("type")}</p>

        <select
          name="type"
          value={activeCamera.type}
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
        {activeCamera.type == "perspective" ? (
          <div className="control__section">
            <p className="title">{t("fieldOfView")}</p>
            <NumberInput
              label={<LucideScanEye />}
              name="fov"
              value={activeCamera.fov}
              onChange={handleChange}
            />
          </div>
        ) : (
          <div className="control__section">
            <p className="title">{t("zoom")}</p>
            <NumberInput
              label={<LucideScanEye />}
              name="zoom"
              min={1}
              value={activeCamera.zoom}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="control__section">
          <p className="title">{t("position")}</p>
          <div className="position">
            <NumberInput
              label="X"
              name="cameraPositionX"
              value={activeCamera.position[0]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCameraPosition(0, Number(e.target.value))
              }
            />
            <NumberInput
              label="Y"
              name="cameraPositionY"
              value={activeCamera.position[1]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCameraPosition(1, Number(e.target.value))
              }
            />
            <NumberInput
              label="Z"
              name="cameraPositionZ"
              value={activeCamera.position[2]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCameraPosition(2, Number(e.target.value))
              }
            />
          </div>
        </div>

        <div className="control__section">
          <p className="title">{t("target")}</p>
          <div className="position">
            <NumberInput
              label={<LucideCrosshair />}
              name="cameraTargetX"
              value={activeCamera.target[0]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCameraTarget(0, Number(e.target.value))
              }
            />
            <NumberInput
              label="Y"
              name="cameraTargetY"
              value={activeCamera.target[1]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCameraTarget(1, Number(e.target.value))
              }
            />
            <NumberInput
              label="Z"
              name="cameraTargetZ"
              value={activeCamera.target[2]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCameraTarget(2, Number(e.target.value))
              }
            />
          </div>
        </div>

        <div className="control__section camera-position">
          <p className="title">{t("quickFraming")}</p>

          <div className="position-grid">
            {[
              CameraEnum.TopLeft,
              CameraEnum.TopCenter,
              CameraEnum.TopRight,
              CameraEnum.CenterLeft,
              CameraEnum.CenterCenter,
              CameraEnum.CenterRight,
              CameraEnum.BottomLeft,
              CameraEnum.BottomCenter,
              CameraEnum.BottomRight,
            ].map((angle) => (
              <button
                key={angle}
                type="button"
                onClick={() => handleCameraAngle(angle)}
                className="position-grid__position"
              >
                <LucideCamera />
              </button>
            ))}
          </div>
        </div>

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
