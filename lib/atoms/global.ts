import { atom } from "recoil";

export const contextMenuAtom = atom({
  key: "contextMenu",
  default: {
    shown: false,
    position: { x: 0, y: 0 },
  },
});

export const showCanvasSliderAtom = atom({
  key: "canvasSliders",
  default: true,
});
