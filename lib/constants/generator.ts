import { title } from "process";
import {
  ReinhardToneMapping,
  LinearToneMapping,
  NoToneMapping,
  CineonToneMapping,
  NeutralToneMapping,
  ACESFilmicToneMapping,
} from "three";

export const STARTING_PROPMPT = {
  stability: `
# Expert UI/UX Design Generation Prompt

You are an expert UI designer specializing in modern mobile application interfaces. Create pixel-perfect, production-ready UI designs optimized for mobile devices while adhering to platform-specific guidelines (iOS/Material Design).

<design_system_specifications>
  1. Typography:
     - Primary: SF Pro (iOS) / Roboto (Android)
     - Scale: 12/14/16/20/24/32px
     - Line height: 1.5 for body, 1.2 for headings
     - Weight variations: Regular(400)/Medium(500)/Bold(700)

  2. Spacing System:
     - Base unit: 8px
     - Padding hierarchy: 8/16/24/32px
     - Component spacing: 16px default
     - Screen margins: 16px horizontal

  3. Color System:
     - Primary: #0066FF (Adjust opacity for states)
     - Secondary: #00C853
     - Error: #FF3B30
     - Neutral: #F7F9FC to #1A1A1A
     - Light mode background: #FFFFFF
     - Dark mode background: #121212
     
  4. Component Specifications:
     - Border radius: 12px (large), 8px (medium), 4px (small)
     - Touch targets: Minimum 44x44px
     - Button height: 48px standard
     - Input height: 56px
     - Icon sizes: 24px default
</design_system_specifications>

<interaction_patterns>
  1. Navigation:
     - Bottom bar height: 56px
     - Tab bar icons: 24x24px
     - Active state: Icon + Label
     - Inactive state: Icon only

  2. Gestures:
     - Swipe patterns for lists
     - Pull-to-refresh
     - Bottom sheet interactions
     - Card stack navigation

  3. Feedback:
     - Loading states: Skeleton screens
     - Success/Error states
     - Micro-interactions: 200-300ms
     - Progress indicators
</interaction_patterns>

<accessibility_requirements>
  1. Contrast Ratios:
     - Text: 4.5:1 minimum
     - Large text: 3:1 minimum
     - Interactive elements: 3:1 minimum

  2. Touch Targets:
     - Primary buttons: 48x48px minimum
     - Secondary actions: 44x44px minimum
     - Spacing between targets: 8px minimum

  3. Visual Hierarchy:
     - Clear heading structure
     - Consistent alignment
     - Visual grouping of related elements
     - Focus states for all interactive elements
</accessibility_requirements>

<responsive_behavior>
  1. Layout Adaptations:
     - Safe areas consideration
     - Keyboard avoidance
     - Dynamic type support
     - Orientation changes
     
  2. Breakpoints:
     - Small: 320px
     - Medium: 375px
     - Large: 428px
</responsive_behavior>

<performance_considerations>
  1. Asset Optimization:
     - Vector icons preferred
     - Optimized image sizes
     - Progressive loading support
     - Cached elements

  2. Animation Performance:
     - Transform properties only
     - 60fps animations
     - Reduced motion support
</performance_considerations>

<output_requirements>
  Generate designs that are:
  1. Production-ready and implementable
  2. Consistent with platform guidelines
  3. Optimized for performance
  4. Accessible to all users
  5. Clean and free of decorative elements
  6. Showing only UI elements without device frames
  7. Resolution: 390x844px (iPhone 14 Pro)
  8. Export format: High-quality PNG/SVG

Negative prompt: Avoid:
  - Unrealistic UI patterns
  - Non-standard interactions
  - Decorative elements that don't serve a purpose
  - Inaccessible color combinations
  - Inconsistent spacing
  - Small touch targets
  - Complex animations
  - Non-optimized assets
`,
  openai: `English language, single screen.
  Create a modern, minimalist mobile app interface for mobile phone. Minimal clean, UI design with a focus on usability and user experience. Use 8point system for design.
  Include a clean navigation bar at the bottom with 4 essential icons, a prominent search bar at the top, and content cards in between. 
  Use a color scheme based on given prompt that you think is good, with ample white space. 
  Focus on intuitive user flow and material design principles.`,
};

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
  {
    id: 3,
    title: "Laptop",
    model: "laptop",
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
  realistic: true,
  title: "Mockify model",
  type: "iphone" as "iphone",
  color: "#fff",
  texture: "plastic" as "plastic",
  bodyReflection: 0,
  screenReflection: 1,
  screenAlphaReflection: 0.1,
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

export const AI_SERVICES = [
  {
    id: 0,
    name: "openai",
    title: "Open AI",
  },
  {
    id: 1,
    name: "stability",
    title: "Stability",
  },
  {
    id: 2,
    name: "stablediffusion",
    title: "Stable diffusion",
  },
];

export const CAMERA_STYLE = [
  {
    id: 0,
    name: "orthographic",
    title: "orthographic",
  },
  {
    id: 1,
    name: "perspective",
    title: "perspective",
  },
];
