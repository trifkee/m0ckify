import * as THREE from "three";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { GLTF } from "three-stdlib";
import { PivotControls, useGLTF } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";

import { IMAGE_SETTINGS } from "@/lib/constants/generator";
import {
  modelAtom,
  pivotControlsAtom,
  selectedLayerAtom,
} from "@/lib/atoms/generator";
import { ModelType } from "@/lib/types/model.type";

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

type ModelT = JSX.IntrinsicElements["group"] & {
  options: ModelType;
};

export default function Iphone(props: ModelT) {
  const { nodes, materials } = useGLTF(
    "https://utfs.io/f/iztaqYgynMhQRXgvxozf9hOL4n8ui0ZkTtv5JNqdAw1xbFSC"
  ) as GLTFResult;

  const [selectedLayer, setSelectedLayer] = useRecoilState(selectedLayerAtom);

  const texture: any = useLoader(
    THREE.TextureLoader,
    props.options.image.src as string
  );
  const { gl } = useThree();

  /* SCREEN MOCKUP */
  const image = props.options.image;

  texture.center.set(0.5, 0.5);

  texture.anisotropy = gl.capabilities.getMaxAnisotropy();

  texture.rotation = Math.PI / 2;

  texture.minFilter = THREE.LinearMipMapLinearFilter;
  texture.magFilter = THREE.NearestFilter;

  texture.repeat.set(
    4 + image.width / IMAGE_SETTINGS.dimensionDivider,
    -4.1 + image.height / IMAGE_SETTINGS.dimensionDivider
  );

  texture.offset.set(
    0.5 + image.x / IMAGE_SETTINGS.positionDivider,
    0 + image.y / IMAGE_SETTINGS.positionDivider
  );
  return (
    <group
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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Phone.geometry}
        material={materials.Body}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <meshStandardMaterial
          color={props.options.color}
          roughness={props.options.bodyReflection}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CutAround.geometry}
        material={materials.Black}
        rotation={[0, -Math.PI / 2, 0]}
      />
      {props.options.screenReflection && (
        <mesh
          geometry={nodes.Glass.geometry}
          material={materials.Glas}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <meshStandardMaterial
            attach="material"
            {...materials.Glas}
            transparent
            opacity={props.options.screenAlphaReflection}
          />
        </mesh>
      )}
      <mesh
        geometry={nodes.Screen.geometry}
        material={materials.Screen}
        position={[0, 0, -0.006]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <meshStandardMaterial
          attach="material"
          map={texture}
          envMapIntensity={1.5}
          metalness={0.2}
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

useGLTF.preload(
  "https://utfs.io/f/iztaqYgynMhQRXgvxozf9hOL4n8ui0ZkTtv5JNqdAw1xbFSC"
);
