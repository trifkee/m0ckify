'use client'

import { useRecoilValue } from 'recoil';

import GenerateControlsNew from "@/ui/components/organism/GenerateControls.organism";
import GenerateControlsOld from "@/ui/components/organism/GenerateControls.old.organism";

import { newControlsDesignAtom } from '@/lib/atoms/global';

export default function GenerateControlsWrapper() {
  const isNewDesign = useRecoilValue(newControlsDesignAtom);

  return isNewDesign ? <GenerateControlsNew /> : <GenerateControlsOld />;
}