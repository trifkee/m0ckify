import "@/ui/styles/atoms/button.atom.scss";

export default function Button({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent";
}) {
  return (
    <button className={`button ${variant ? variant : ""}`}>{children}</button>
  );
}
