"use client";

import "@/ui/styles/atoms/button.atom.scss";

export default function Button({
  children,
  variant = "primary",
  className,
  onClick,
  disabled,
  type,
}: {
  type?: "button" | "submit";
  children: React.ReactNode;
  disabled?: boolean;
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
      disabled={disabled}
      type={type || "button"}
      onClick={() => (onClick ? onClick() : null)}
      className={`button ${variant ? variant : ""} ${className} ${disabled}`}
    >
      {children}
    </button>
  );
}
