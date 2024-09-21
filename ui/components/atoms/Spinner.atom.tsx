import "@/ui/styles/atoms/spinner.atom.scss";

export default function Spinner({
  type = "light",
  size = "small",
}: {
  size?: "big" | "small";
  type?: "light" | "dark";
}) {
  return <span className={`loader ${type} ${size}`}></span>;
}
