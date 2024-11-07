import { ChangeEventHandler } from "react";
import { useRecoilValue } from "recoil";
import { LucideImage } from "lucide-react";
import { useTranslations } from "next-intl";

import NumberInput from "../../atoms/NumberInput.atom";

import Button from "../../atoms/Button.atom";

import { ObjectsLayersAtom, selectedLayerAtom } from "@/lib/atoms/generator";
import useModel from "@/ui/hooks/useModel.hook";

export default function Images() {
  const t = useTranslations("generate");

  const { handleImagePosition, handleImageSize, handleImageChange } =
    useModel();

  const layers = useRecoilValue(ObjectsLayersAtom);
  const selectedLayer = useRecoilValue(selectedLayerAtom);

  const [obj] = layers.filter((n) => n.id === selectedLayer?.id);

  return (
    <details open={false} className="control image">
      <summary className="control__title">
        {t("image.title")} <LucideImage />
      </summary>

      <div className="control__section">
        <div className="image-container">
          {!obj?.image.isDefault ? (
            <img src={obj?.image.src as string} alt="model" />
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
            data-id={selectedLayer?.id}
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
            onChange={(e: any) => handleImageSize(e, "width")}
            value={obj?.image.width ?? 0}
          />
          <NumberInput
            name="ih"
            label="H"
            onChange={(e: any) => handleImageSize(e, "height")}
            value={obj?.image.height ?? 0}
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
            onChange={(e: any) => handleImagePosition(e, "x")}
            value={obj?.image.x ?? 0}
          />
          <NumberInput
            name="iy"
            label="Y"
            onChange={(e: any) => handleImagePosition(e, "y")}
            value={obj?.image.y ?? 0}
          />
        </div>
      </div>
    </details>
  );
}
