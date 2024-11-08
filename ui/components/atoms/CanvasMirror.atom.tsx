import { Circle, MeshReflectorMaterial } from "@react-three/drei";

export default function CanvasMirror({
  color,
  depth,
  maxTreshold,
  minTreshold,
  roughness,
  strength,
}: {
  color: string;
  roughness: number;
  strength: number;
  depth: number;
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
          envMapIntensity={0}
          blur={[512, 512]}
          mixBlur={strength}
          mixStrength={3}
          mixContrast={1}
          resolution={1024}
          mirror={1}
          depthScale={depth}
          minDepthThreshold={minTreshold}
          maxDepthThreshold={maxTreshold}
          depthToBlurRatioBias={0.45}
          roughness={roughness}
        />
      </Circle>
    </>
  );
}
