"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useTranslations } from "next-intl";

import NumberInput from "../../atoms/NumberInput.atom";

import { ObjectsLayersAtom, selectedLayerAtom } from "@/lib/atoms/generator";

import { LucideMove } from "lucide-react";

type ValuesT = {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
};

export default function GeneratePosition({
  handleChangeRotation,
  handleChangePosition,
}: {
  handleChangeRotation: CallableFunction;
  handleChangePosition: CallableFunction;
}) {
  const t = useTranslations("generate");

  const layers = useRecoilValue(ObjectsLayersAtom);
  const selectedLayer = useRecoilValue(selectedLayerAtom);

  const [obj] = layers.filter((n) => n.id === selectedLayer?.id);

  return (
    <details open={false} className="control model select">
      <summary className="control__title">
        {t("position.title")} <LucideMove />
      </summary>
      {/* POSITION */}
      <div className="control__section">
        <p className="title">{t("model.position")}</p>

        <div className="position">
          <NumberInput
            name="lx"
            label="X"
            step={0.02}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangePosition(e, "x")
            }
            value={obj?.position.x}
          />
          <NumberInput
            name="ly"
            step={0.02}
            label="Y"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangePosition(e, "y")
            }
            value={obj?.position.y}
          />
          <NumberInput
            name="lz"
            step={0.02}
            label="Z"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangePosition(e, "z")
            }
            value={obj?.position.z}
          />
        </div>
      </div>
      {/* ROTATION */}
      <div className="control__section">
        <p className="title">{t("model.rotation")}</p>

        <div className="position">
          <NumberInput
            name="lx"
            label="X"
            step={0.02}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeRotation(e, "x")
            }
            value={obj?.rotation.x}
          />
          <NumberInput
            name="ly"
            step={0.02}
            label="Y"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeRotation(e, "y")
            }
            value={obj?.rotation.y}
          />
          <NumberInput
            name="lz"
            step={0.02}
            label="Z"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeRotation(e, "z")
            }
            value={obj?.rotation.z}
          />
        </div>
      </div>
    </details>
  );
}
