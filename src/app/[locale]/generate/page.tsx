import Button from "@/ui/components/atoms/Button.atom";
import "@/ui/styles/pages/generate.page.scss";
import {
  IoAddCircle,
  IoColorPaletteSharp,
  IoCubeSharp,
  IoDownload,
  IoImages,
  IoSaveSharp,
} from "react-icons/io5";

export default function Generate() {
  return (
    <main className="generate">
      <article className="generate__model">
        <p className="model">Model goes here... Initialize ThreeJS</p>
        <input type="range" name="x" id="x" className="slider-x" />
        <input type="range" name="y" id="y" className="slider-y" />
      </article>
      <article className="generate__controls">
        <Button variant="secondary">
          <p>Add image </p>
          <IoAddCircle />
        </Button>

        <Button variant="secondary">
          <p>Model </p>
          <IoCubeSharp />
        </Button>
        <Button variant="secondary">
          <p>Color</p> <IoColorPaletteSharp />
        </Button>

        <Button className="download">
          <p>Download</p> <IoSaveSharp />
        </Button>
      </article>
    </main>
  );
}
