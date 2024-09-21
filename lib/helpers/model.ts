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
  // const modelContainer = document.getElementById(
  //   "canvas__model"
  // ) as HTMLDivElement;

  // const originalWidth = modelContainer?.clientWidth;
  // const originalHeight = modelContainer?.clientHeight;
  // modelContainer.style.position = "absolute";

  // modelContainer!.style.width = `${w}px`;
  // modelContainer!.style.height = `${h}px`;

  link.setAttribute("download", `${title}.${type}`);
  link.setAttribute(
    "href",
    canvas
      .toDataURL(`image/${type.toLowerCase()}`)
      .replace(`image/${type.toLowerCase()}`, "image/octet-stream")
  );
  link.click();
  link.remove();

  // modelContainer.style.position = "relative";
  // modelContainer!.style.width = `${originalWidth}px`;
  // modelContainer!.style.height = `${originalHeight}px`;
};

export const readUserImage = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });
};
