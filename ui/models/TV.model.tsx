import * as THREE from "three";

import { PivotControls, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import { IMAGE_SETTINGS } from "@/lib/constants/generator";
import {
  modelAtom,
  pivotControlsAtom,
  selectedLayerAtom,
} from "@/lib/atoms/generator";
import { useRecoilState, useRecoilValue } from "recoil";
import { ModelType } from "@/lib/types/model.type";

type GLTFResult = GLTF & {
  nodes: {
    Body: THREE.Mesh;
    Screen: THREE.Mesh;
    Reciever: THREE.Mesh;
    Glass: THREE.Mesh;
  };
  materials: {
    Body: THREE.MeshStandardMaterial;
    Screen: THREE.MeshStandardMaterial;
    Glas: THREE.MeshPhysicalMaterial;
  };
};

type ModelT = JSX.IntrinsicElements["group"] & {
  options: ModelType;
};

export default function Model(props: ModelT) {
  const { nodes, materials } = useGLTF("/models/tv.gltf") as GLTFResult;

  const [selectedLayer, setSelectedLayer] = useRecoilState(selectedLayerAtom);
  const pivotControls = useRecoilValue(pivotControlsAtom);
  const model = useRecoilValue(modelAtom);

  const texture: any = useLoader(
    THREE.TextureLoader,
    model.image.src as string
  );

  /* SCREEN MOCKUP */
  const image = model.image;

  texture.center.set(0.5, 0.5);

  texture.rotation = Math.PI / 180;

  texture.repeat.set(
    -3 + image.width / IMAGE_SETTINGS.dimensionDivider,
    2.5 + image.height / IMAGE_SETTINGS.dimensionDivider
  );

  texture.offset.set(
    0.75 + image.x / IMAGE_SETTINGS.positionDivider,
    0.35 + image.y / IMAGE_SETTINGS.positionDivider
  );
  return (
    <PivotControls
      offset={[0, 0, 0.1]}
      depthTest={true}
      lineWidth={2}
      disableScaling
      // disableSliders
      visible={pivotControls && props.options.id === selectedLayer?.id}
    >
      <group
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
          geometry={nodes.Body.geometry}
          material={materials.Body}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial
            roughness={model.bodyReflection}
            color={model.color}
          />
        </mesh>
        <mesh
          geometry={nodes.Screen.geometry}
          material={materials.Screen}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshBasicMaterial attach="material" map={texture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Reciever.geometry}
          material={materials.Body}
          position={[0, -0.3, 0]}
        />
        {model.screenReflection && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Glass.geometry}
            material={materials.Glas}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial
              attach={"material"}
              {...materials.Glas}
              transparent
              opacity={model.screenAlphaReflection}
            />
          </mesh>
        )}
      </group>
    </PivotControls>
  );
}

useGLTF.preload("/models/tv.gltf");
