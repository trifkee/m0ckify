import { LucideDownload, LucideSettings } from "lucide-react";
import { useTranslations } from "next-intl";
import { IoSyncSharp } from "react-icons/io5";
import Button from "../../atoms/Button.atom";
import { useRecoilValue } from "recoil";
import { renderAtom } from "@/lib/atoms/generator";

export default function Actions({
  resetModelPosition,
  handleSave,
}: {
  handleSave: CallableFunction;
  resetModelPosition: CallableFunction;
}) {
  const t = useTranslations("generate");

  const render = useRecoilValue(renderAtom);

  return (
    <details className="control actions">
      <summary className="control__title">
        {t("actions.title")} <LucideSettings />
      </summary>

      <div className="control__section">
        {/* <Button
          onClick={resetModelPosition}
          variant="editor"
          className="danger  model__reset-cta"
        >
          <p>{t("actions.reset")}</p>
          <IoSyncSharp />
        </Button> */}
        <Button
          onClick={() =>
            handleSave({
              type: render.type,
              w: render.w,
              h: render.h,
            })
          }
          variant="editor"
          className="download"
        >
          <p>{t("actions.download")}</p>
          <LucideDownload />
        </Button>
      </div>
    </details>
  );
}
