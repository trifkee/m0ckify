import { useTranslations } from "next-intl";

import Fog from "@/ui/components/moleculs/GenerateControls/Fog.molecul";
import Reflection from "@/ui/components/moleculs/GenerateControls/Reflection.molecul";
import Background from "@/ui/components/moleculs/GenerateControls/Background.molecul";
import World from "@/ui/components/moleculs/GenerateControls/World.molecul";

import { Monitor } from "lucide-react";

export default function OverallSettings() {
  const t = useTranslations("generate");

  return (
    <details className="control model select">
      <summary className="control__title">
        {t("general.title")}
        <Monitor />
      </summary>

      <div className="control__section">
        <World />
        <Fog />
        <Reflection />
        <Background />
      </div>
    </details>
  );
}
