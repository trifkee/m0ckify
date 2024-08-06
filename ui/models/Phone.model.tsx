import * as THREE from "three";
import React, { useContext } from "react";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import Context from "../providers/ContextProvider.provider";
import { useLoader } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Screen: THREE.Mesh;
    Phone: THREE.Mesh;
    Camera: THREE.Mesh;
  };
  materials: {
    ["Plastic.001"]: THREE.MeshPhysicalMaterial;
    ["Matte Metallic Paint.001"]: THREE.MeshStandardMaterial;
  };
};

export default function Phone(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/scene.gltf") as GLTFResult;

  const { model } = useContext(Context);

  const texture = useLoader(THREE.TextureLoader, model.image);

  // @ts-expect-error
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  // @ts-expect-error
  texture.repeat.set(3, 4.125);
  // @ts-expect-error
  texture.center.set(0.5, 0.5);
  // @ts-expect-error
  texture.rotation = Math.PI / 2;

  return (
    <>
      <group position={[0, 0, 4.8]} {...props} dispose={null}>
        <group rotation={[model.position.y, model.position.x, 0]}>
          <mesh
            geometry={nodes.Screen.geometry}
            material={materials["Plastic.001"]}
            rotation={[0, -Math.PI / 2, 0]}
            material-roughness={2}
            dispose={null}
          >
            {/* @ts-ignore */}
            <meshStandardMaterial attach="material" map={texture} />
          </mesh>
          <mesh
            geometry={nodes.Phone.geometry}
            material={materials["Matte Metallic Paint.001"]}
            rotation={[0, -Math.PI / 2, 0]}
          >
            {/* <meshStandardMaterial color={"black"} /> */}
          </mesh>
          <mesh
            material-roughness={0.85}
            dispose={null}
            geometry={nodes.Camera.geometry}
            material={materials["Matte Metallic Paint.001"]}
            rotation={[0, -Math.PI / 2, 0]}
          />
        </group>
        <PerspectiveCamera
          makeDefault={false}
          far={1000}
          near={0.1}
          fov={39.598}
          position={[0, 0.01, 0.22]}
          rotation={[-0.021, 0, 0]}
        />
      </group>
    </>
  );
}

useGLTF.preload("/models/scene.gltf");
