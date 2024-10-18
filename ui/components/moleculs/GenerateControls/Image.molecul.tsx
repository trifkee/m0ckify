import { ChangeEventHandler } from "react";
import { useRecoilValue } from "recoil";
import { LucideImage } from "lucide-react";
import { useTranslations } from "next-intl";

import NumberInput from "../../atoms/NumberInput.atom";

import Button from "../../atoms/Button.atom";

import { ObjectsLayersAtom } from "@/lib/atoms/generator";

export default function Images({
  index,
  handleImagePosition,
  handleImageSize,
  handleImageChange,
}: {
  index: number;
  handleImageSize: CallableFunction;
  handleImagePosition: CallableFunction;
  handleImageChange: ChangeEventHandler<HTMLInputElement>;
}) {
  const t = useTranslations("generate");

  const model = useRecoilValue(ObjectsLayersAtom);

  return (
    <details className="control image">
      <summary className="control__title">
        {t("image.title")} <LucideImage />
      </summary>

      <div className="control__section">
        <div className="image-container">
          {!model?.[index].image.isDefault ? (
            <img src={model?.[index].image.src as string} alt="model" />
          ) : (
            <>
              <LucideImage />
              <p style={{ fontSize: ".75rem" }}>{t("image.noImage")}</p>
            </>
          )}
        </div>

        <Button variant="editor">
          <p>{t("image.add")}</p>
          <LucideImage />

          <input
            onChange={handleImageChange}
            className="add-file"
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            data-id={index}
          />
        </Button>

        <div
          className="position"
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <NumberInput
            name="iw"
            label="W"
            onChange={(e: any) => handleImageSize(e, "width", index)}
            value={model?.[index].image.width}
          />
          <NumberInput
            name="ih"
            label="H"
            onChange={(e: any) => handleImageSize(e, "height", index)}
            value={model?.[index].image.height}
          />
        </div>

        <div
          className="position"
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <NumberInput
            name="ix"
            label="X"
            onChange={(e: any) => handleImagePosition(e, "x", index)}
            value={model?.[index].image.x}
          />
          <NumberInput
            name="iy"
            label="Y"
            onChange={(e: any) => handleImagePosition(e, "y", index)}
            value={model?.[index].image.y}
          />
        </div>
      </div>
    </details>
  );
}
