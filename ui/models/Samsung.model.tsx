import { useGLTF } from "@react-three/drei";

import { ModelType } from "@/lib/types/model.type";
import { AndroidType } from "@/lib/types/threejs.type";
import { selectedLayerAtom } from "@/lib/atoms/generator";
import { useSetRecoilState } from "recoil";
import { useLoader, useThree } from "@react-three/fiber";

import * as THREE from "three";
import { IMAGE_SETTINGS } from "@/lib/constants/generator";
import { darkenColor } from "@/lib/helpers/model";

type ModelT = AndroidType & {
  options: ModelType;
};

export default function Model(props: ModelT) {
  const { nodes, materials } = useGLTF(
    "https://utfs.io/f/iztaqYgynMhQB6wwPhC50DTJowxFryPuLiXEheOnQpkfYNzK"
  ) as AndroidType;

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
    -2 + image.width / IMAGE_SETTINGS.dimensionDivider,
    -1 + image.height / IMAGE_SETTINGS.dimensionDivider
  );

  texture.offset.set(
    0.53 + image.x / IMAGE_SETTINGS.positionDivider,
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
      <group rotation={[-Math.PI / 2, 0, 0]} scale={2.423}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.AF_Sensor_Glass.geometry}
            material={materials.AF_Sensor_Glass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Antenna_Plastic.geometry}
            material={materials.Antenna_Plastic}
          >
            <meshStandardMaterial
              attach="material"
              {...materials.Antenna_Plastic}
              color={darkenColor(props.options.color)}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Back_Cam_Deco.geometry}
            material={materials.Back_Cam_Deco}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Back_Cam_Deco_Black.geometry}
            material={materials.Back_Cam_Deco_Black}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Back_Cover_Glass.geometry}
            material={materials.Back_Cover_Glass}
          >
            <meshStandardMaterial
              attach={"material"}
              {...materials.Back_Cover_Glass}
              color={darkenColor(props.options.color, 0.3)}
              roughness={0.5}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Bezel.geometry}
            material={materials.Bezel}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cam_Bezel.geometry}
            material={materials.Cam_Bezel}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cam_Body.geometry}
            material={materials.Cam_Body}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cam_Glass.geometry}
            material={materials.Cam_Glass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cam_Lens.geometry}
            material={materials.Cam_Lens}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cam_Mt.geometry}
            material={materials.Black_Hole}
          />
          {props.options.screenReflection && (
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Display_ActiveArea.geometry}
              material={materials.main_glass}
            >
              <meshStandardMaterial
                attach="material"
                {...materials.main_glass}
                transparent
                opacity={props.options.screenAlphaReflection}
              />
            </mesh>
          )}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Flash.geometry}
            material={materials.Flash}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Flash_Glass.geometry}
            material={materials.Flash_Glass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Rear_Case.geometry}
            material={materials.Rearcase}
          >
            <meshStandardMaterial
              attach={"material"}
              {...materials.Rearcase}
              color={props.options.color}
              roughness={props.options.bodyReflection}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Rearcase_Hole.geometry}
            material={materials.Rearcase_Hole}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.S_Pen_Tip.geometry}
            material={materials.Rearcase}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Samsung_Logo.geometry}
            material={materials.Samsung_Logo}
          >
            <meshStandardMaterial
              attach="material"
              {...materials.Samsung_Logo}
              color={darkenColor(props.options.color)}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Usb_1.geometry}
            material={materials.Usb_1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Usb_2.geometry}
            material={materials.Usb_2}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Zoom_Cam.geometry}
            material={materials.Zoom_Cam}
          />
        </group>
      </group>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={2.423}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Display_ActiveArea001.geometry}
          material={materials["main_screen.001"]}
          rotation={[Math.PI / 2, 0, 0]}
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
  );
}

useGLTF.preload(
  "https://utfs.io/f/iztaqYgynMhQB6wwPhC50DTJowxFryPuLiXEheOnQpkfYNzK"
);
