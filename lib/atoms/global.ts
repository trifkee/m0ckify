import { atom } from "recoil";

export const contextMenuAtom = atom({
  key: "contextMenu",
  default: {
    shown: false,
    position: { x: 0, y: 0 },
  },
});
