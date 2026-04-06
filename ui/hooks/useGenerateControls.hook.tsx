import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import Templates from '@/ui/components/moleculs/GenerateControls/Templates.molecul';
import OverallSettings from '@/ui/components/moleculs/GenerateControls/OverallSettings.molecul';
import Render from '@/ui/components/moleculs/GenerateControls/Render.molecul';
import Camera from '@/ui/components/moleculs/GenerateControls/Camera.molecul';
import Env from '@/ui/components/moleculs/GenerateControls/Env.molecul';
import Background from '@/ui/components/moleculs/GenerateControls/Background.molecul';
import Lights from "@/ui/components/moleculs/GenerateControls/Lights.molecul";
import Actions from '@/ui/components/moleculs/GenerateControls/Actions.molecul';

import { LucideCamera, LucideImage, LucideLayoutTemplate, LucideLightbulb, LucideSettings2, LucideSun, LucideVideo } from 'lucide-react';

export default function useGenerateControls() {
  const t = useTranslations("generate");

  const tabs = [
    {
      name: t('actions.templates'),
      component: <Templates />,
      icon: <LucideLayoutTemplate />
    },
    {
      name: t('general.title'),
      component: <OverallSettings />,
      icon: <LucideSettings2 />
    },
    {
      name: t('render.title'),
      component: <Render />,
      icon: <LucideCamera />
    },
    {
      name: t('camera.title'),
      component: <Camera />,
      icon: <LucideVideo />
    }, 
    {
      name: t('environment.title'),
      component: <Env />,
      icon: <LucideSun />
    }, 
    {
      name: t('general.background.title'),
      component: <Background />,
      icon: <LucideImage />
    },
    {
      name: t('lights.title'),
      component: <Lights />,
      icon: <LucideLightbulb />
    },
    {
      name: t('actions.title'),
      component: <Actions />,
      icon: <LucideSettings2 />
    }
  ]

  const [selectedTab, setSelectedTab] = useState<string | null>(tabs[0].name);

  function handleSelectTab  (tabName: string) {
    if (selectedTab === tabName) {
      setSelectedTab(null);  
      return;
    }

    setSelectedTab(tabName);
  }

  return {
    tabs,
    selectedTab,
    handleSelectTab
  }
}