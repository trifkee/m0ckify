import "@/ui/styles/atoms/button.atom.scss";

export default function Button({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: "secondary";
}) {
  return (
    <button className={`button ${variant ? variant : ""}`}>{children}</button>
  );
}
