import * as THREE from "three";
import React, { useContext } from "react";
import { useGLTF, PerspectiveCamera, useTexture } from "@react-three/drei";
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

  const texture = useLoader(THREE.TextureLoader, model.image.src);

  /* MARBLE MATERIAL */
  const textureMarbleProps = useTexture({
    map: "/textures/marble/White_Marble_004_COLOR.jpg",
    normalMap: "/textures/marble/White_Marble_004_NORM.jpg",
    roughnessMap: "/textures/marble/White_Marble_004_ROUGH.jpg",
    aoMap: "/textures/marble/White_Marble_004_OCC.jpg",
  });

  textureMarbleProps.aoMap.repeat.set(4, 4);
  textureMarbleProps.roughnessMap.repeat.set(4, 4);
  textureMarbleProps.normalMap.repeat.set(4, 4);
  textureMarbleProps.map.repeat.set(4, 4);

  textureMarbleProps.map.wrapS =
    textureMarbleProps.map.wrapT =
    textureMarbleProps.roughnessMap.wrapS =
    textureMarbleProps.roughnessMap.wrapT =
    textureMarbleProps.normalMap.wrapS =
    textureMarbleProps.normalMap.wrapT =
    textureMarbleProps.aoMap.wrapS =
    textureMarbleProps.aoMap.wrapT =
      THREE.RepeatWrapping;

  /* PLASTIC MATERIAL */
  const texturePlasticProps = useTexture({
    map: "/textures/plastic/Plastic_Rough_001_basecolor.jpg",
    normalMap: "/textures/plastic/Plastic_Rough_001_normal.jpg",
    roughnessMap: "/textures/plastic/Plastic_Rough_001_roughness.jpg",
    aoMap: "/textures/plastic/Plastic_Rough_001_ambientOcclusion.jpg",
  });

  texturePlasticProps.aoMap.repeat.set(4, 4);
  texturePlasticProps.roughnessMap.repeat.set(4, 4);
  texturePlasticProps.normalMap.repeat.set(4, 4);
  texturePlasticProps.map.repeat.set(4, 4);

  texturePlasticProps.map.wrapS =
    texturePlasticProps.map.wrapT =
    texturePlasticProps.roughnessMap.wrapS =
    texturePlasticProps.roughnessMap.wrapT =
    texturePlasticProps.normalMap.wrapS =
    texturePlasticProps.normalMap.wrapT =
    texturePlasticProps.aoMap.wrapS =
    texturePlasticProps.aoMap.wrapT =
      THREE.RepeatWrapping;

  /* SCREEN MOCKUP */
  // @ts-ignore
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  // @ts-ignore
  texture.repeat.set(3, 4.125);
  // @ts-ignore
  texture.center.set(0.5, 0.5);
  // @ts-ignore
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
            receiveShadow
            position={[0, 0, -0.0005]}
            visible
          >
            <meshStandardMaterial
              attach="material"
              // color={model.color}
              // @ts-ignore
              map={texture}
            />
          </mesh>
          <mesh geometry={nodes.Phone.geometry} rotation={[0, -Math.PI / 2, 0]}>
            <meshStandardMaterial
              side={THREE.DoubleSide}
              color={model.color}
              {...(model.texture === "plastic"
                ? texturePlasticProps
                : textureMarbleProps)}
            />
          </mesh>
          <mesh
            material-roughness={0.85}
            dispose={null}
            geometry={nodes.Camera.geometry}
            rotation={[0, -Math.PI / 2, 0]}
          >
            <meshStandardMaterial
              side={THREE.DoubleSide}
              color={model.color}
              {...(model.texture === "plastic"
                ? texturePlasticProps
                : textureMarbleProps)}
            />
          </mesh>
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
