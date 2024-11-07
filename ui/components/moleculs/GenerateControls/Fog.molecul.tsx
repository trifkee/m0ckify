"use client";

import useGenerator from "@/ui/hooks/useGenerator.hook";
import { CloudFog } from "lucide-react";
import Checkbox from "../../atoms/Checkbox.atom";
import NumberInput from "../../atoms/NumberInput.atom";
import { useRecoilValue } from "recoil";
import { fogControlsAtom } from "@/lib/atoms/generator";
import { ChangeEvent } from "react";

export default function Fog() {
  const { handleFogSize, handleFogEnable } = useGenerator();

  const fogSettings = useRecoilValue(fogControlsAtom);

  return (
    <details className="control fog">
      <summary className="control__title">
        Fog <CloudFog />
      </summary>

      <div className="control__section">
        <Checkbox
          title={"Fog"}
          htmlName="Enabled"
          value={fogSettings.enabled}
          onChange={handleFogEnable}
        />
      </div>

      {fogSettings.enabled && (
        <div className="control__section">
          <div className="position">
            <NumberInput
              name="minFog"
              value={fogSettings.minFog}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleFogSize(e)}
            />
            <NumberInput
              name="maxFog"
              value={fogSettings.maxFog}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleFogSize(e)}
            />
          </div>
        </div>
      )}
    </details>
  );
}
