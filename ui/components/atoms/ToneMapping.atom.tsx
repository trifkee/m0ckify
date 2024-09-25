import { canvasOptionsAtom } from "@/lib/atoms/generator";
import { TONE_MAPPINGS } from "@/lib/constants/generator";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

export default function ToneMapping() {
  const canvasSettings = useRecoilValue(canvasOptionsAtom);

  const { gl } = useThree();

  useEffect(() => {
    gl.toneMapping = TONE_MAPPINGS?.[canvasSettings?.toneMapping]?.value;
  }, [canvasSettings.toneMapping]);

  useEffect(() => {
    gl.toneMappingExposure = canvasSettings.toneMappingExposure;
  }, [canvasSettings.toneMappingExposure]);

  return null;
}
