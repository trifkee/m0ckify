import * as THREE from "three";
import { useSetRecoilState } from "recoil";
import { useGLTF } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";

import { IMAGE_SETTINGS } from "@/lib/constants/generator";
import { selectedLayerAtom } from "@/lib/atoms/generator";
import { ModelType } from "@/lib/types/model.type";
import { TVType } from "@/lib/types/threejs.type";

type ModelT = TVType & {
  options: ModelType;
};

export default function Model(props: ModelT) {
  const { nodes, materials } = useGLTF(
    "https://utfs.io/f/iztaqYgynMhQfitQ6NzBD7CtQ6RXhuPwSxG9Or8yaZEjWAY5"
  ) as TVType;

  const setSelectedLayer = useSetRecoilState(selectedLayerAtom);

  const texture: any = useLoader(
    THREE.TextureLoader,
    props.options.image.src as string
  );

  const { gl } = useThree();

  const image = props.options.image;
  texture.center.set(0.5, 0.5);
  texture.rotation = Math.PI / 1;
  texture.anisotropy = gl.capabilities.getMaxAnisotropy();

  texture.repeat.set(
    1 + image.width / IMAGE_SETTINGS.dimensionDivider,
    -1 + image.height / IMAGE_SETTINGS.dimensionDivider
  );

  texture.offset.set(
    0 + image.x / IMAGE_SETTINGS.positionDivider,
    0 + image.y / IMAGE_SETTINGS.positionDivider
  );

  return (
    <group
      {...props}
      castShadow
      receiveShadow
      onDoubleClick={() =>
        setSelectedLayer({ id: props.options.id, layer: props.options })
      }
      {...props}
      rotation={[
        props.options.rotation.y,
        props.options.rotation.x,
        props.options.rotation.z,
      ]}
      position={[
        props.options.position.y,
        props.options.position.x,
        props.options.position.z,
      ]}
      dispose={null}
    >
      <group
        position={[1.096, -0.57, 0.278]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.002}
      >
        <group
          position={[-611.695, 0, 337.294]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <group position={[-0.019, -158.819, -7.809]}>
            <group
              position={[611.714, 496.113, 7.809]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_25.geometry}
                material={materials["02_-_Default"]}
                position={[-612.46, -10.083, 509.056]}
              >
                <meshStandardMaterial
                  attach="material"
                  {...materials["02_-_Default"]}
                  color={props.options.color}
                  roughness={props.options.bodyReflection}
                />
              </mesh>
            </group>
          </group>
          <group position={[-0.079, 302.505, -13.307]}>
            <group
              position={[611.773, 34.79, 13.307]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_13.geometry}
                material={materials["03_-_Default"]}
                position={[-611.799, -13.167, 34.691]}
              />
            </group>
          </group>
          <group position={[-0.254, 321.27, -8.829]}>
            <group
              position={[611.949, 16.025, 8.829]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_4.geometry}
                material={materials["04_-_Default"]}
                position={[-611.948, -45.762, 14.144]}
              />
            </group>
          </group>
          <group position={[-0.006, 289.745, -23.656]}>
            <group
              position={[611.7, 47.549, 23.656]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_22.geometry}
                material={materials["04_-_Default"]}
                position={[-613.458, -23.686, 47.716]}
              />
            </group>
          </group>
          <group position={[0, -15.237, 5.097]}>
            <group
              position={[611.695, 352.531, -5.097]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_28.geometry}
                material={materials["02_-_Default"]}
                position={[-612.508, 10.075, 116.226]}
              >
                <meshStandardMaterial
                  attach="material"
                  {...materials["02_-_Default"]}
                  color={props.options.color}
                  roughness={props.options.bodyReflection}
                />
              </mesh>
            </group>
          </group>
          <group position={[-0.081, 299.836, -13.338]}>
            <group
              position={[611.776, 37.458, 13.338]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_16.geometry}
                material={materials["03_-_Default"]}
                position={[-611.825, -13.292, 37.655]}
              />
            </group>
          </group>
          <group position={[-0.121, 302.675, -13.803]}>
            <group
              position={[611.816, 34.619, 13.803]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_19.geometry}
                material={materials["03_-_Default"]}
                position={[-611.816, -13.642, 34.666]}
              />
            </group>
          </group>
          <group
            position={[-260.568, 334.3, 82.646]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          >
            <group
              position={[82.646, 872.262, -2.994]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_7.geometry}
                material={materials["05_-_Default"]}
                position={[-611.926, -33.485, 3.017]}
              />
            </group>
          </group>
          {props.options.screenReflection && (
            <group position={[0, -25.829, -23.164]}>
              <group
                position={[611.695, 363.123, 23.164]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_31.geometry}
                  material={materials.main_glass}
                  position={[-606.874, -23.164, 375.559]}
                >
                  <meshStandardMaterial
                    attach="material"
                    {...materials.main_glass}
                    transparent
                    opacity={props.options.screenAlphaReflection}
                  />
                </mesh>
              </group>
            </group>
          )}
          <group position={[0, -19.501, -17.949]}>
            <group
              position={[611.695, 356.795, 17.949]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_10.geometry}
                material={materials["04_-_Default"]}
                position={[-615.528, -18.003, 356.795]}
              />
            </group>
          </group>
        </group>
      </group>
      <group
        position={[1.096, -0.57, 0.278]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.002}
      >
        <group
          position={[-611.695, 0, 337.294]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <group position={[0, -25.829, -23.164]}>
            <group
              position={[611.695, 363.123, 23.164]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_31001.geometry}
                material={materials["screen_main.001"]}
                position={[-606.874, -23.164, 375.559]}
              >
                <meshStandardMaterial
                  attach="material"
                  map={texture}
                  envMapIntensity={1.5}
                  metalness={0.2}
                />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(
  "https://utfs.io/f/iztaqYgynMhQfitQ6NzBD7CtQ6RXhuPwSxG9Or8yaZEjWAY5"
);
