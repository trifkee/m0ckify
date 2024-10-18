"use client";

import { LucideMove, LucideMove3D } from "lucide-react";
import NumberInput from "../../atoms/NumberInput.atom";
import { useTranslations } from "next-intl";
import { ChangeEvent } from "react";
import { useRecoilValue } from "recoil";
import { ObjectsLayersAtom } from "@/lib/atoms/generator";

export default function GeneratePosition({
  handleChangeRotation,
  handleChangePosition,
  index,
}: {
  handleChangeRotation: CallableFunction;
  handleChangePosition: CallableFunction;
  index: number;
}) {
  const t = useTranslations("generate");
  const model = useRecoilValue(ObjectsLayersAtom);

  return (
    <details className="control model select">
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
              handleChangePosition(e, "x", index)
            }
            value={model?.[index].position.x}
          />
          <NumberInput
            name="ly"
            step={0.02}
            label="Y"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangePosition(e, "y", index)
            }
            value={model?.[index].position.y}
          />
          <NumberInput
            name="lz"
            step={0.02}
            label="Z"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangePosition(e, "z", index)
            }
            value={model?.[index].position.z}
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
              handleChangeRotation(e, "x", index)
            }
            value={model?.[index].rotation.x}
          />
          <NumberInput
            name="ly"
            step={0.02}
            label="Y"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeRotation(e, "y", index)
            }
            value={model?.[index].rotation.y}
          />
          <NumberInput
            name="lz"
            step={0.02}
            label="Z"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeRotation(e, "z", index)
            }
            value={model?.[index].rotation.z}
          />
        </div>
      </div>
    </details>
  );
}
