"use client";

import "@/ui/styles/atoms/button.atom.scss";

export default function Button({
  children,
  variant = "primary",
  className,
  onClick,
  type,
}: {
  type?: "button" | "submit";
  children: React.ReactNode;
  className?: string;
  onClick?: CallableFunction;
  variant?:
    | "primary"
    | "secondary"
    | "transparent"
    | "outlined"
    | "disabled"
    | "editor"
    | "danger";
}) {
  return (
    <button
      type={type || "button"}
      onClick={() => (onClick ? onClick() : null)}
      className={`button ${variant ? variant : ""} ${className}`}
    >
      {children}
    </button>
  );
}
