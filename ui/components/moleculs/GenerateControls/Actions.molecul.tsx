
import { useTranslations } from "next-intl";
import useGenerator from "@/ui/hooks/useGenerator.hook";

import Button from "../../atoms/Button.atom";

import { LucideDownload, LucideSettings } from "lucide-react";
import Checkbox from '../../atoms/Checkbox.atom';

export default function Actions() {

  const t = useTranslations("generate");

  const { handleSave, newControlsDesign, handleSwitchControlsDesign } = useGenerator();

  return (
    <details className="control actions">
      <summary className="control__title">
        {t("actions.title")} <LucideSettings />
      </summary>
      <div className="control__section">
        <div className="control__section">
          <Checkbox
            title={t("newControlsDesign")}
            htmlName="background"
            onChange={handleSwitchControlsDesign}
            value={newControlsDesign}
          />
        </div>

        <div className="hr"></div>

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
