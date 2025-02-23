/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { ModelType } from "@/lib/types/model.type";
import { useRecoilState } from "recoil";
import { selectedLayerAtom } from "@/lib/atoms/generator";
import { useLoader, useThree } from "@react-three/fiber";
import { IMAGE_SETTINGS } from "@/lib/constants/generator";
import { darkenColor } from "@/lib/helpers/model";

type GLTFResult = GLTF & {
  nodes: {
    Object_10: THREE.Mesh;
    Object_12: THREE.Mesh;
    Object_14: THREE.Mesh;
    Object_16: THREE.Mesh;
    Object_18: THREE.Mesh;
    Object_20: THREE.Mesh;
    Object_22: THREE.Mesh;
    Object_24: THREE.Mesh;
    Object_26: THREE.Mesh;
    Object_28: THREE.Mesh;
    Object_30: THREE.Mesh;
    Object_32: THREE.Mesh;
    Object_34: THREE.Mesh;
    Object_36: THREE.Mesh;
    Object_38: THREE.Mesh;
    Object_40: THREE.Mesh;
    Object_42: THREE.Mesh;
    Object_44: THREE.Mesh;
    Object_46: THREE.Mesh;
    Object_48: THREE.Mesh;
    Object_50: THREE.Mesh;
    Object_52: THREE.Mesh;
    Object_54: THREE.Mesh;
    Object_56: THREE.Mesh;
    Object_58: THREE.Mesh;
    Object_60: THREE.Mesh;
    Object_62: THREE.Mesh;
    Object_64: THREE.Mesh;
    Object_66: THREE.Mesh;
    Object_68: THREE.Mesh;
    Object_70: THREE.Mesh;
    Object_72: THREE.Mesh;
    Object_74: THREE.Mesh;
    Object_76: THREE.Mesh;
    Object_78: THREE.Mesh;
    Object_80: THREE.Mesh;
    Object_82: THREE.Mesh;
    Object_84: THREE.Mesh;
    Object_86: THREE.Mesh;
    Object_88: THREE.Mesh;
    Object_90: THREE.Mesh;
    Object_92: THREE.Mesh;
    Object_94: THREE.Mesh;
    Object_96: THREE.Mesh;
    Object_99: THREE.Mesh;
    Object_101: THREE.Mesh;
    Object_103: THREE.Mesh;
    Object_105: THREE.Mesh;
    Object_107: THREE.Mesh;
    Object_109: THREE.Mesh;
    Object_111: THREE.Mesh;
    Object_113: THREE.Mesh;
    Object_115: THREE.Mesh;
    Object_117: THREE.Mesh;
    Object_119: THREE.Mesh;
    Object_121: THREE.Mesh;
    Object_123: THREE.Mesh;
    Object_125: THREE.Mesh;
    Object_127: THREE.Mesh;
    Object_129: THREE.Mesh;
    Object_131: THREE.Mesh;
    Object_123001: THREE.Mesh;
  };
  materials: {
    AibnXCKcAbewWhH: THREE.MeshStandardMaterial;
    WeLyzRwUVIhQGgM: THREE.MeshStandardMaterial;
    UhoCLqHkvkDmxOA: THREE.MeshStandardMaterial;
    zhGRTuGrQoJflBD: THREE.MeshStandardMaterial;
    zCLdUynNQOzVMqx: THREE.MeshStandardMaterial;
    jwuTsnFxKtBUxpK: THREE.MeshStandardMaterial;
    lmWQsEjxpsebDlK: THREE.MeshStandardMaterial;
    MycfwscjQZRVSoj: THREE.MeshStandardMaterial;
    bsmYIMHYRqMuLqz: THREE.MeshStandardMaterial;
    LtEafgAVRolQqRw: THREE.MeshStandardMaterial;
    iyDJFXmHelnMTbD: THREE.MeshStandardMaterial;
    eJObPwhgFzvfaoZ: THREE.MeshStandardMaterial;
    nDsMUuDKliqGFdU: THREE.MeshStandardMaterial;
    CRQixVLpahJzhJc: THREE.MeshStandardMaterial;
    IcpudUyxprDYhfw: THREE.MeshStandardMaterial;
    YYwBgwvcyZVOOAA: THREE.MeshStandardMaterial;
    SLGkCohDDelqXBu: THREE.MeshStandardMaterial;
    WDumMKBWVQxmraD: THREE.MeshStandardMaterial;
    WnHKXHhScfUbJQi: THREE.MeshStandardMaterial;
    ZNhRrZtaKWQYAab: THREE.MeshStandardMaterial;
    fNHiBfcxHUJCahl: THREE.MeshStandardMaterial;
    bsEIHfblEXNcUMs: THREE.MeshStandardMaterial;
    SABLxXNNESCdgUy: THREE.MeshStandardMaterial;
    LpqXZqhaGCeSzdu: THREE.MeshStandardMaterial;
    sIfSZcqgDlKMJPf: THREE.MeshStandardMaterial;
    gMtYExgrEUqPfln: THREE.MeshStandardMaterial;
    uInNDOueKeBTGQB: THREE.MeshStandardMaterial;
    hmEmmncwVomyUTC: THREE.MeshStandardMaterial;
    KclpPzxoRwZAoer: THREE.MeshStandardMaterial;
    wjAYtisbflXilXi: THREE.MeshStandardMaterial;
    zobIbiekuagXEVU: THREE.MeshStandardMaterial;
    RyKTMHTpkkwQkvB: THREE.MeshStandardMaterial;
    JvMFZolVCdpPqjj: THREE.MeshStandardMaterial;
    UBYmHfGRfHbOXyc: THREE.MeshStandardMaterial;
    gOXiFODBFKnUyyU: THREE.MeshStandardMaterial;
    eBwkWuOBScacrgP: THREE.MeshStandardMaterial;
    glass_main: THREE.MeshPhysicalMaterial;
    CdgEAaPUlrQWQuD: THREE.MeshStandardMaterial;
    ZCDwChwkbBfITSW: THREE.MeshStandardMaterial;
    XCYkeTCxqFmKTKe: THREE.MeshStandardMaterial;
    ["screen_main.001"]: THREE.MeshStandardMaterial;
  };
};

type ModelT = JSX.IntrinsicElements["group"] & {
  options: ModelType;
};

export default function Model(props: ModelT) {
  const { nodes, materials } = useGLTF(
    "https://utfs.io/f/iztaqYgynMhQdaw4KKAK3Q4RNlEFh1TLmASIgCY5yuHzbcfJ"
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

  texture.rotation = Math.PI / 1;

  texture.minFilter = THREE.LinearMipMapLinearFilter;
  texture.magFilter = THREE.NearestFilter;

  texture.repeat.set(
    -1 + image.width / IMAGE_SETTINGS.dimensionDivider,
    -0.5 + image.height / IMAGE_SETTINGS.dimensionDivider
  );

  texture.offset.set(
    -0.025 + image.x / IMAGE_SETTINGS.positionDivider,
    0.025 + image.y / IMAGE_SETTINGS.positionDivider
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
        props.options.rotation.y - 50,
        props.options.rotation.x + Math.PI / 1,
        props.options.rotation.z + Math.PI / 1,
      ]}
      position={[
        props.options.position.y,
        props.options.position.x,
        props.options.position.z,
      ]}
      dispose={null}
    >
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.052}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_10.geometry}
          material={materials.AibnXCKcAbewWhH}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_12.geometry}
          material={materials.WeLyzRwUVIhQGgM}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_14.geometry}
          material={materials.UhoCLqHkvkDmxOA}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_16.geometry}
          material={materials.zhGRTuGrQoJflBD}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_18.geometry}
          material={materials.zCLdUynNQOzVMqx}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_20.geometry}
          material={materials.jwuTsnFxKtBUxpK}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_22.geometry}
          material={materials.lmWQsEjxpsebDlK}
        >
          <meshStandardMaterial
            {...materials.lmWQsEjxpsebDlK}
            color={props.options.color}
            roughness={props.options.bodyReflection}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_24.geometry}
          material={materials.jwuTsnFxKtBUxpK}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_26.geometry}
          material={materials.MycfwscjQZRVSoj}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_28.geometry}
          material={materials.bsmYIMHYRqMuLqz}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_30.geometry}
          material={materials.LtEafgAVRolQqRw}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_32.geometry}
          material={materials.iyDJFXmHelnMTbD}
        >
          <meshStandardMaterial
            {...materials.iyDJFXmHelnMTbD}
            color={darkenColor(darkenColor(props.options.color))}
            roughness={props.options.bodyReflection * 5}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_34.geometry}
          material={materials.eJObPwhgFzvfaoZ}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_36.geometry}
          material={materials.jwuTsnFxKtBUxpK}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_38.geometry}
          material={materials.nDsMUuDKliqGFdU}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_40.geometry}
          material={materials.LtEafgAVRolQqRw}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_42.geometry}
          material={materials.CRQixVLpahJzhJc}
        >
          <meshStandardMaterial
            {...materials.CRQixVLpahJzhJc}
            color={props.options.color}
            roughness={props.options.bodyReflection}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_44.geometry}
          material={materials.IcpudUyxprDYhfw}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_46.geometry}
          material={materials.jwuTsnFxKtBUxpK}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_48.geometry}
          material={materials.YYwBgwvcyZVOOAA}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_50.geometry}
          material={materials.jwuTsnFxKtBUxpK}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_52.geometry}
          material={materials.jwuTsnFxKtBUxpK}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_54.geometry}
          material={materials.SLGkCohDDelqXBu}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_56.geometry}
          material={materials.WDumMKBWVQxmraD}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_58.geometry}
          material={materials.WnHKXHhScfUbJQi}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_60.geometry}
          material={materials.jwuTsnFxKtBUxpK}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_62.geometry}
          material={materials.ZNhRrZtaKWQYAab}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_64.geometry}
          material={materials.IcpudUyxprDYhfw}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_66.geometry}
          material={materials.fNHiBfcxHUJCahl}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_68.geometry}
          material={materials.bsEIHfblEXNcUMs}
        >
          <meshStandardMaterial
            {...materials.bsEIHfblEXNcUMs}
            color={props.options.color}
            roughness={props.options.bodyReflection}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_70.geometry}
          material={materials.CRQixVLpahJzhJc}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_72.geometry}
          material={materials.SABLxXNNESCdgUy}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_74.geometry}
          material={materials.LpqXZqhaGCeSzdu}
        >
          <meshStandardMaterial
            {...materials.LpqXZqhaGCeSzdu}
            color={props.options.color}
            roughness={props.options.bodyReflection}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_76.geometry}
          material={materials.sIfSZcqgDlKMJPf}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_78.geometry}
          material={materials.bsmYIMHYRqMuLqz}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_80.geometry}
          material={materials.jwuTsnFxKtBUxpK}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_82.geometry}
          material={materials.gMtYExgrEUqPfln}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_84.geometry}
          material={materials.WnHKXHhScfUbJQi}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_86.geometry}
          material={materials.nDsMUuDKliqGFdU}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_88.geometry}
          material={materials.bsEIHfblEXNcUMs}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_90.geometry}
          material={materials.uInNDOueKeBTGQB}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_92.geometry}
          material={materials.hmEmmncwVomyUTC}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_94.geometry}
          material={materials.WeLyzRwUVIhQGgM}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_96.geometry}
          material={materials.KclpPzxoRwZAoer}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_99.geometry}
          material={materials.wjAYtisbflXilXi}
        >
          <meshStandardMaterial
            {...materials.wjAYtisbflXilXi}
            color={props.options.color}
            roughness={props.options.bodyReflection}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_101.geometry}
          material={materials.zobIbiekuagXEVU}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_103.geometry}
          material={materials.RyKTMHTpkkwQkvB}
        >
          <meshStandardMaterial
            {...materials.RyKTMHTpkkwQkvB}
            color={props.options.color}
            roughness={props.options.bodyReflection}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_105.geometry}
          material={materials.jwuTsnFxKtBUxpK}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_107.geometry}
          material={materials.JvMFZolVCdpPqjj}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_109.geometry}
          material={materials.UBYmHfGRfHbOXyc}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_111.geometry}
          material={materials.uInNDOueKeBTGQB}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_113.geometry}
          material={materials.gOXiFODBFKnUyyU}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_115.geometry}
          material={materials.eBwkWuOBScacrgP}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_117.geometry}
          material={materials.jwuTsnFxKtBUxpK}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_119.geometry}
          material={materials.jwuTsnFxKtBUxpK}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_121.geometry}
          material={materials.nDsMUuDKliqGFdU}
        />
        {props.options.screenReflection && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_123.geometry}
            material={materials.glass_main}
            position={[0, 0, 0]}
          >
            <meshStandardMaterial
              attach="material"
              {...materials.glass_main}
              transparent
              opacity={props.options.screenAlphaReflection}
            />
          </mesh>
        )}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_125.geometry}
          material={materials.CdgEAaPUlrQWQuD}
        >
          <meshStandardMaterial
            {...materials.CdgEAaPUlrQWQuD}
            color={darkenColor(darkenColor(props.options.color))}
            roughness={props.options.bodyReflection}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_127.geometry}
          material={materials.ZCDwChwkbBfITSW}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_129.geometry}
          material={materials.XCYkeTCxqFmKTKe}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_131.geometry}
          material={materials.MycfwscjQZRVSoj}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_123001.geometry}
        material={materials["screen_main.001"]}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.052}
      >
        <meshStandardMaterial
          attach="material"
          map={texture}
          envMapIntensity={1.5}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload(
  "https://utfs.io/f/iztaqYgynMhQdaw4KKAK3Q4RNlEFh1TLmASIgCY5yuHzbcfJ"
);
