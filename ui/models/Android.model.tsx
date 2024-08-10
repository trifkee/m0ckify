import * as THREE from "three";
import React, { useContext } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import Context from "../providers/ContextProvider.provider";
import { useLoader } from "@react-three/fiber";
import { IMAGE_SETTINGS } from "@/lib/constants/generator";

type GLTFResult = GLTF & {
  nodes: {
    Phone: THREE.Mesh;
    Glass: THREE.Mesh;
    camerahole: THREE.Mesh;
    sidebutton1: THREE.Mesh;
    sidebutton2: THREE.Mesh;
    aroundphone: THREE.Mesh;
    Screen001: THREE.Mesh;
  };
  materials: {
    Body: THREE.MeshStandardMaterial;
    Glas: THREE.MeshPhysicalMaterial;
    Black: THREE.MeshStandardMaterial;
    Screen: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/android.gltf") as GLTFResult;

  const { model } = useContext(Context);

  const texture = useLoader(THREE.TextureLoader, model.image.src);

  /* SCREEN MOCKUP */
  const image = model.image;

  //   @ts-ignore
  texture.center.set(
    0.5 + image.width / IMAGE_SETTINGS.dimensionDivider,
    0.5 + image.height / IMAGE_SETTINGS.dimensionDivider
  );

  //   @ts-ignore
  texture.rotation = Math.PI / 2;

  //   @ts-ignore
  texture.repeat.set(4.25, -4.1);

  //   @ts-ignore
  texture.offset.set(
    -1.6 + image.x / IMAGE_SETTINGS.positionDivider,
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
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshStandardMaterial
          color={model.color}
          roughness={model.bodyReflection}
        />
      </mesh>
      {model.screenReflection && (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Glass.geometry}
          material={materials.Glas}
          rotation={[0, Math.PI / 2, 0]}
        />
      )}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.camerahole.geometry}
        material={materials.Black}
        position={[0, 3.4, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.sidebutton1.geometry}
        material={materials.Body}
        position={[1.7, 1.8, 0]}
      >
        <meshStandardMaterial
          color={model.color}
          roughness={model.bodyReflection}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.sidebutton2.geometry}
        material={materials.Body}
        position={[1.7, 0.6, 0]}
        scale={[1, 0.5, 1]}
      >
        <meshStandardMaterial
          color={model.color}
          roughness={model.bodyReflection}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.aroundphone.geometry}
        material={materials.Black}
        rotation={[0, Math.PI / 2, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Screen001.geometry}
        material={materials.Screen}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshBasicMaterial
          attach="material"
          // @ts-ignore
          map={texture}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/android.gltf");
