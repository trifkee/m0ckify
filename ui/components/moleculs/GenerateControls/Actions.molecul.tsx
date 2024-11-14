import { useTranslations } from "next-intl";

import Button from "../../atoms/Button.atom";

import { LucideDownload, LucideSettings } from "lucide-react";

export default function Actions({
  handleSave,
}: {
  handleSave: CallableFunction;
}) {
  const t = useTranslations("generate");

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
          onClick={() => handleSave()}
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
