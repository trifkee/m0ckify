"use client";

import { useRecoilValue } from "recoil";
import { HexColorPicker } from "react-colorful";
import { useTranslations } from "next-intl";

import Checkbox from "@/ui/components/atoms/Checkbox.atom";
import RotationWheel from "@/ui/components/atoms/RotationWheel.atom";

import useBackground from "@/ui/hooks/useBackground.hook";

import { backgroundSettingsAtom } from "@/lib/atoms/generator";

import { LucideBrush } from "lucide-react";
import Slider from '../../atoms/Slider.atom';
import { GRADIENT_PRESETS } from '@/lib/constants/gradients';


export default function Background() {
  const t = useTranslations("generate.general.background");
  const {
    handleBackgroundEnable,
    handleBackgroundSettings,
    handleBackgroundType,
    handleGradientColor,
    handleGradientAngle,
    handleGradientColorStop,
  } = useBackground();
  const backgroundSettings = useRecoilValue(backgroundSettingsAtom);

  return (
    <details className="control background">
      <summary className="control__title">
        {t("title")}
        <LucideBrush />
      </summary>

      <div className="control__section">
        <Checkbox
          title={t("enable")}
          htmlName="background"
          onChange={handleBackgroundEnable}
          value={backgroundSettings.enabled}
        />
      </div>

      {backgroundSettings.enabled && (
        <>
          <div className="control__section">
            <div className="background-type-toggle">
              <button
                className={`background-type-btn${backgroundSettings.type === "solid" ? " active" : ""}`}
                onClick={() => handleBackgroundType("solid")}
              >
                {t("solid")}
              </button>
              <button
                className={`background-type-btn${backgroundSettings.type === "gradient" ? " active" : ""}`}
                onClick={() => handleBackgroundType("gradient")}
              >
                {t("gradient")}
              </button>
            </div>
          </div>

          {backgroundSettings.type === "solid" && (
            <div className="control__section">
              <HexColorPicker
                color={backgroundSettings.color}
                onChange={handleBackgroundSettings}
              />
            </div>
          )}

          {backgroundSettings.type === "gradient" && (
            <>
              <div className="control__section">
                <p className="title">{t("gradientPresets")}</p>
                <div className="gradient-presets">
                  {GRADIENT_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      className="gradient-preset-swatch"
                      title={preset.label}
                      style={{
                        background: `linear-gradient(${preset.gradientAngle}deg, ${preset.color}, ${preset.gradientColor})`,
                      }}
                      onClick={() => {
                        handleBackgroundSettings(preset.color);
                        handleGradientColor(preset.gradientColor);
                        handleGradientAngle(preset.gradientAngle);
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="control__section">
                <p className="title">{t("color")}</p>
                <HexColorPicker
                  color={backgroundSettings.color}
                  onChange={handleBackgroundSettings}
                />
              </div>

              <div className="control__section">
                <p className="title">{t("gradientColor")}</p>
                <HexColorPicker
                  color={backgroundSettings.gradientColor}
                  onChange={handleGradientColor}
                />
              </div>

              <div className="control__section">
                <p className="title">{t("angle")}</p>
                <RotationWheel
                  value={backgroundSettings.gradientAngle}
                  onChange={handleGradientAngle}
                />
              </div>

              <div className="control__section">
                <p className="title flex">
                  {t("colorStop")}
                  <span>{backgroundSettings.gradientColorStop}%</span>
                </p>
                <Slider
                  className="small env-slider"
                  max={100}
                  min={0}
                  name={t("colorStop")}
                  step={1}
                  onChange={(e) => handleGradientColorStop(Number(e.target.value))}
                  value={String(backgroundSettings.gradientColorStop)}              
                />
              </div>
            </>
          )}
        </>
      )}
    </details>
  );
}
