import { useTranslations } from "next-intl";

import Fog from "@/ui/components/moleculs/GenerateControls/Fog.molecul";
import Reflection from "@/ui/components/moleculs/GenerateControls/Reflection.molecul";
import Background from "@/ui/components/moleculs/GenerateControls/Background.molecul";
import World from "@/ui/components/moleculs/GenerateControls/World.molecul";

import { Monitor } from "lucide-react";
import { useRecoilValue } from 'recoil';
import { newControlsDesignAtom } from '@/lib/atoms/global';

export default function OverallSettings() {
  const t = useTranslations("generate");

  const isNewDesign = useRecoilValue(newControlsDesignAtom)

  return (
    isNewDesign ?
      <div style={{ borderBottom: 'none' }} className="control model select">
        <div className="control__section">
          <World />
          <Fog />
          <Reflection />
        </div>
      </div>
      :
      <details className="control model select">
        <summary className="control__title">
          {t("general.title")}
          <Monitor />
        </summary>

        <div className="control__section">
          <World />
          <Fog />
          <Reflection />
        </div>
      </details>
  );
}
