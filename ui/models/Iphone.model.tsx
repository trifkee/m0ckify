import React, { useContext } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useGLTF, PerspectiveCamera, useTexture } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";

import Context from "@/ui/providers/ContextProvider.provider";

import { IMAGE_SETTINGS } from "@/lib/constants/generator";

type GLTFResult = GLTF & {
  nodes: {
    Phone: THREE.Mesh;
    CutAround: THREE.Mesh;
    Glass: THREE.Mesh;
    Screen: THREE.Mesh;
    CameraHOle: THREE.Mesh;
  };
  materials: {
    Body: THREE.MeshStandardMaterial;
    Black: THREE.MeshStandardMaterial;
    Glas: THREE.MeshPhysicalMaterial;
    Screen: THREE.MeshStandardMaterial;
    ["Black.001"]: THREE.MeshStandardMaterial;
  };
};

export default function Iphone(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/iphone.glb") as GLTFResult;

  const { model } = useContext(Context);

  const texture = useLoader(THREE.TextureLoader, model.image.src);
  const { gl } = useThree();

  /* SCREEN MOCKUP */
  const image = model.image;
  //   @ts-ignore
  texture.center.set(0.5, 0.5);

  // @ts-ignore
  texture.anisotropy = gl.capabilities.getMaxAnisotropy();
  //   @ts-ignore
  texture.rotation = Math.PI / 2;
  // @ts-ignore
  texture.encoding = THREE.sRGBEncoding;

  // @ts-ignore
  texture.minFilter = THREE.LinearMipMapLinearFilter; // For better downscaling
  // @ts-ignore
  texture.magFilter = THREE.NearestFilter; // For pixel-perfect upscaling
  //   @ts-ignore
  texture.repeat.set(
    4 + image.width / IMAGE_SETTINGS.dimensionDivider,
    -4.1 + image.height / IMAGE_SETTINGS.dimensionDivider
  );

  //   @ts-ignore
  texture.offset.set(
    0.5 + image.x / IMAGE_SETTINGS.positionDivider,
    0 + image.y / IMAGE_SETTINGS.positionDivider
  );
  return (
    <group
      {...props}
      rotation={[model.position.y, model.position.x, 0]}
      dispose={null}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Phone.geometry}
        material={materials.Body}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <meshStandardMaterial
          color={model.color}
          roughness={model.bodyReflection}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CutAround.geometry}
        material={materials.Black}
        rotation={[0, -Math.PI / 2, 0]}
      />
      {model.screenReflection && (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Glass.geometry}
          material={materials.Glas}
          rotation={[0, -Math.PI / 2, 0]}
        />
      )}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Screen.geometry}
        material={materials.Screen}
        position={[0, 0, -0.006]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <meshStandardMaterial
          attach="material"
          // color={model.color}
          roughness={model.bodyReflection}
          // @ts-ignore
          map={texture}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CameraHOle.geometry}
        material={materials["Black.001"]}
        position={[0.002, 3.154, 0.068]}
        rotation={[0, -Math.PI / 2, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/iphone.glb");
