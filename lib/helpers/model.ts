import * as THREE from "three";

import { RenderType } from "../types/model.type";

type SaveType = RenderType & {
  title?: string;
};

export const saveImageFromCanvas = ({
  title = "Mockify",
  type,
  h,
  w,
}: SaveType) => {
  const link = document.createElement("a");
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  const mContainer = document.getElementById("canvasModel");

  const originalHeight = mContainer?.clientHeight;
  const originalWidth = mContainer?.clientWidth;

  mContainer!.style.width = `${w}px`;
  mContainer!.style.height = `${h}px`;

  setTimeout(() => {
    const imageType = `image/${type.toLowerCase()}`;

    link.setAttribute("download", `${title}.${type.toLowerCase()}`);
    link.setAttribute("href", canvas.toDataURL(imageType));

    link.click();
    link.remove();

    mContainer!.style.width = `${originalWidth}px`;
    mContainer!.style.height = `${originalHeight}px`;
  }, 300);
};

export const readUserImage = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    if (!file) return;

    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });
};

export function darkenColor(color: string, factor = 0.1) {
  const c = new THREE.Color(color);
  c.multiplyScalar(0.95 - factor); // Darkens by multiplying with a value less than 1
  return `#${c.getHexString()}`;
}
