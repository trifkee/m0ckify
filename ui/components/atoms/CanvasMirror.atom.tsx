import { Circle, MeshReflectorMaterial } from "@react-three/drei";

export default function CanvasMirror({
  color,
  depth,
  maxTreshold,
  minTreshold,
  roughness,
  strength,
  blurX,
  blurY,
  depthToBlurRatioBias,
  envMapIntensity,
  mixContrast,
  mixStrength,
  resolution,
}: {
  envMapIntensity: number;
  blurY: number;
  blurX: number;
  mixStrength: number;
  mixContrast: number;
  resolution: number;
  color: string;
  roughness: number;
  strength: number;
  depth: number;
  depthToBlurRatioBias: number;
  minTreshold: number;
  maxTreshold: number;
}) {
  return (
    <>
      <Circle
        args={[1, 16]}
        receiveShadow
        scale={100}
        rotation-x={-Math.PI / 2}
        position={[0, -2, 0]}
      >
        <MeshReflectorMaterial
          color={color}
          envMapIntensity={envMapIntensity}
          blur={[blurX, blurY]}
          mixBlur={strength}
          mixStrength={mixStrength}
          mixContrast={mixContrast}
          resolution={resolution}
          mirror={1}
          depthScale={depth}
          minDepthThreshold={minTreshold}
          maxDepthThreshold={maxTreshold}
          depthToBlurRatioBias={depthToBlurRatioBias}
          roughness={roughness}
        />
      </Circle>
    </>
  );
}
