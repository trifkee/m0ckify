import { useTranslations } from "next-intl";
import Image from "next/image";

import { LucideImage } from "lucide-react";
import useGeneratorState from '@/ui/hooks/useGeneratorState.hook';
import useRestoreGeneratorState from '@/ui/hooks/useRestoreGeneratorState';
import templates from '@/lib/constants/templates';

export default function Templates() {
  const generatorState = useGeneratorState();

  const t = useTranslations("generate");

  const restoreGeneratorState = useRestoreGeneratorState();

  const activeTemplateIndex = templates.findIndex((template) => {
    if (template.objectsLayers.length !== generatorState.objectsLayers.length) {
      return false;
    }

    return template.objectsLayers.every(
      (templateLayer, layerIndex) => templateLayer.id === generatorState.objectsLayers[layerIndex]?.id,
    );
  });

  function handleApplyTemplate(template: (typeof templates)[number]) {
    const templateSnapshot = JSON.parse(JSON.stringify(template));
    restoreGeneratorState(templateSnapshot);
  }

  return (
    <details className="control actions">
      <summary className="control__title">
        {t("actions.templates")} <LucideImage />
      </summary>

      <div className="control__section">
        <div className="template-presets">
          {templates.map((template, index) => (
            <button
              key={`template-${index + 1}`}
              type="button"
              title={`Template ${index + 1}`}
              className={`template-preset-card${activeTemplateIndex === index ? " active" : ""}`}
              onClick={() => handleApplyTemplate(template)}
            >
              <Image
                src={`/templates/template_${index + 1}.png`}
                alt={`Template ${index + 1}`}
                width={320}
                height={200}
              />
              <span>#{index + 1}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="control__section">

      </div>
    </details>
  );
}
