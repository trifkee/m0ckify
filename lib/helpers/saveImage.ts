export const saveImageFromCanvas = () => {
  const link = document.createElement("a");
  const canvas = document.querySelector("canvas") as HTMLCanvasElement; // this was the gl dom element
  link.setAttribute("download", `Screenshot-${Date.now()}.png`);
  link.setAttribute(
    "href",
    canvas // instead of gl.domElement
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream")
  );
  link.click();
  link.remove();
};
