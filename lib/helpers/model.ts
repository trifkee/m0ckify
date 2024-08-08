export const saveImageFromCanvas = ({
  title = "Mockify",
}: {
  title?: string;
}) => {
  const link = document.createElement("a");
  const canvas = document.querySelector("canvas") as HTMLCanvasElement; // this was the gl dom element
  link.setAttribute("download", `${title}.png`);
  link.setAttribute(
    "href",
    canvas // instead of gl.domElement
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream")
  );
  link.click();
  link.remove();
};

export const readUserImage = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });
};
