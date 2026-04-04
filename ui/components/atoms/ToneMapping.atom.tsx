import { canvasOptionsAtom, sceneDocumentAtom } from "@/lib/atoms/generator";
import { TONE_MAPPINGS } from "@/lib/constants/generator";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { PCFSoftShadowMap, SRGBColorSpace } from "three";

export default function ToneMapping() {
  const canvasSettings = useRecoilValue(canvasOptionsAtom);
  const sceneDocument = useRecoilValue(sceneDocumentAtom);

  const { gl } = useThree();

  useEffect(() => {
    gl.outputColorSpace = SRGBColorSpace;
    gl.shadowMap.enabled = sceneDocument.env.castShadow;
    gl.shadowMap.type = PCFSoftShadowMap;
  }, [gl, sceneDocument.env.castShadow]);

  useEffect(() => {
    gl.toneMapping = TONE_MAPPINGS?.[canvasSettings?.toneMapping]?.value;
  }, [gl, canvasSettings.toneMapping]);

  useEffect(() => {
    gl.toneMappingExposure = canvasSettings.toneMappingExposure;
  }, [gl, canvasSettings.toneMappingExposure]);

  return null;
}
