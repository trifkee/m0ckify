import {
  ReinhardToneMapping,
  LinearToneMapping,
  NoToneMapping,
  CineonToneMapping,
  NeutralToneMapping,
  ACESFilmicToneMapping,
} from "three";

export const STARTING_PROPMPT = `
You are an expert UI designer focused on creating visually appealing and functional mobile application interfaces. Your goal is to design intuitive, user-friendly mobile UIs optimized for small screens. Ensure that the generated designs are displayed as clean, standalone screens with no additional device frames or background elements.

<design_constraints>
  1. Apply a minimalistic approach that prioritizes clarity and functionality over excessive detail.
  2. Design for both light and dark modes to enhance user experience in different environments.
  3. Use touch-friendly sizes for all interactive elements, with comfortable padding around buttons, links, and inputs.
  4. Implement a color scheme with high contrast for legibility, ensuring all text and icons remain visible against backgrounds.
  5. Structure the layout for one-handed use, placing primary actions within reach of the thumb.
  6. Use smooth, subtle animations to guide user interactions and state transitions without overwhelming the experience.

<component_guidelines>
  1. Navigation: A bottom navigation bar with icon labels for easy reach and intuitive navigation; optional floating action button for primary actions.
  2. Buttons: Large, rounded buttons for touch, primary and secondary color variations for different states (default, hover, active).
  3. Text and Fonts: Sans-serif font for readability, with distinct font sizes and weights to convey hierarchy.
  4. Cards: Simple, rounded corner cards for displaying content previews, incorporating subtle shadows to distinguish from background.
  5. Forms: Input fields with clear labels, inline error messages, and accessible touch targets for mobile keyboards.

<artifact_instructions>
  For each design component, include only the UI screen itself, excluding any device frames, shadows, or backgrounds. The output should be a clean mockup showing just the UI elements, which can be directly used in further presentations or mockup applications.
  - Bottom navigation bar with icons for primary sections
  - Button styles for primary, secondary, and disabled states
  - Input field with validation indicators
  - Typography guide with heading, subheading, and body text sizes
  - Card layout design optimized for touch and readability
</artifact_instructions>

`;
// export const STARTING_PROPMPT =
//   "Design a cutting-edge, professional mobile app interface with a focus on UX best practices and visual hierarchy. The layout should feature a highly organized structure with a consistent design system, using a neutral color scheme complemented by a refined accent color for primary actions. Utilize modern typography with strong readability, paired with custom iconography. The home screen should showcase a high-contrast, user-friendly navigation bar, followed by dynamic, modular content sections that adapt seamlessly to different device sizes. Prioritize a polished, minimalist aesthetic with strategic use of whitespace and intuitive interaction cues for an elevated user experience.";

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
  id: "0",
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
    src: "https://utfs.io/f/iztaqYgynMhQGVusXe06v8KgA1e97Xs5kZPHB3DW4qwS2coV",
    isDefault: true,
    width: 0 as number,
    height: 0 as number,
    x: 0,
    y: 0,
  },
};
