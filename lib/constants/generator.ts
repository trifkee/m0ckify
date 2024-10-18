import {
  ReinhardToneMapping,
  LinearToneMapping,
  NoToneMapping,
  CineonToneMapping,
  NeutralToneMapping,
  ACESFilmicToneMapping,
} from "three";

import fallbackImage from "@/public/images/mockify-starter.jpg";

export const STARTING_PROPMPT =
  "Design a cutting-edge, professional mobile app interface with a focus on UX best practices and visual hierarchy. The layout should feature a highly organized structure with a consistent design system, using a neutral color scheme complemented by a refined accent color for primary actions. Utilize modern typography with strong readability, paired with custom iconography. The home screen should showcase a high-contrast, user-friendly navigation bar, followed by dynamic, modular content sections that adapt seamlessly to different device sizes. Prioritize a polished, minimalist aesthetic with strategic use of whitespace and intuitive interaction cues for an elevated user experience.";

export const MODELS_LIST = [
  {
    id: 0,
    title: "Iphone",
    model: "iphone",
  },
  {
    id: 1,
    title: "Android",
    model: "android",
  },
  {
    id: 2,
    title: "TV",
    model: "tv",
  },
];

export const ENV_LIST = [
  {
    id: 0,
    title: "warehouse",
    name: "warehouse",
  },
  {
    id: 1,
    title: "apartment",
    name: "apartment",
  },
  {
    id: 2,
    title: "city",
    name: "city",
  },
  {
    id: 3,
    title: "dawn",
    name: "dawn",
  },
  {
    id: 4,
    title: "forest",
    name: "forest",
  },
  {
    id: 5,
    title: "lobby",
    name: "lobby",
  },
  {
    id: 6,
    title: "night",
    name: "night",
  },
  {
    id: 7,
    title: "park",
    name: "park",
  },
  {
    id: 8,
    title: "studio",
    name: "studio",
  },
  {
    id: 9,
    title: "sunset",
    name: "sunset",
  },
];

export const TEXTURE_LIST = [
  {
    id: 0,
    name: "plastic",
  },
  {
    id: 1,
    name: "marble",
  },
  {
    id: 2,
    name: "color",
  },
];

export const IMAGE_SETTINGS = {
  positionDivider: 100,
  dimensionDivider: 100,
};

export const IMAGE_TYPES = ["PNG", "JPEG", "WEBP"];

export const TONE_MAPPINGS = [
  { name: "Vivid", value: ReinhardToneMapping },
  { name: "Linear", value: LinearToneMapping },
  { name: "Cinematic", value: CineonToneMapping },
  { name: "Neutral", value: NeutralToneMapping },
  { name: "Filmic", value: ACESFilmicToneMapping },
  { name: "No Mapping", value: NoToneMapping },
];

export const DEFAULT_OBJECT_OPTIONS = {
  title: "Mockify model",
  type: "iphone" as "iphone",
  color: "#fff",
  texture: "plastic" as "plastic",
  bodyReflection: 0,
  screenReflection: 1,
  screenAlphaReflection: 0.2,
  position: {
    x: 0 as number,
    y: 0 as number,
    z: 0 as number,
  },
  rotation: {
    x: 0 as number,
    y: 0 as number,
    z: 0 as number,
  },
  image: {
    src: fallbackImage.src as any,
    isDefault: true,
    width: 0 as number,
    height: 0 as number,
    x: 0,
    y: 0,
  },
};
