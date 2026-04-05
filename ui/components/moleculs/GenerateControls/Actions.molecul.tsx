import { useTranslations } from "next-intl";

import Button from "../../atoms/Button.atom";

import { LucideCloud, LucideDownload, LucideLayoutTemplate, LucideSave, LucideSettings } from "lucide-react";
import useGeneratorState from '@/ui/hooks/useGeneratorState.hook';
import useRestoreGeneratorState from '@/ui/hooks/useRestoreGeneratorState';

export default function Actions({
  handleSave,
}: {
  handleSave: CallableFunction;
}) {

  const generatorState = useGeneratorState();

  const t = useTranslations("generate");

  const restoreGeneratorState = useRestoreGeneratorState();

  function handleLoadFromLocalStorage() {
    try {
      const doc = localStorage.getItem('mockify-generator-state');
      if (!doc) throw new Error('Nema sačuvanog stanja u localStorage!');
      const parsed = JSON.parse(doc);
      restoreGeneratorState(parsed);
      alert('Stanje je uspešno učitano iz localStorage!');
    } catch (e) {
      alert('Greška pri učitavanju iz localStorage!');
    }
  }
  
  function handleSaveToLocalStorage() {
    try {
      const doc = JSON.stringify(generatorState, null, 2);
      localStorage.setItem('mockify-generator-state', doc);
      // Optionally, show a toast or alert
      alert('Stanje je sačuvano u localStorage!');
    } catch (e) {
      alert('Greška pri čuvanju u localStorage!');
    }
  }

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
          onClick={() => handleLoadFromLocalStorage()}
          variant="editor"
          className="load"
        >
          <p>Učitaj stanje</p>
          <LucideLayoutTemplate />
        </Button>
        <Button
          onClick={() => handleSaveToLocalStorage()}
          variant="editor"
          className="save"
        >
          <p>{t("actions.save")}</p>
          <LucideCloud />
        </Button>
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
