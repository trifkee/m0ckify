"use client";

import "@/ui/styles/atoms/button.atom.scss";

export default function Button({
  children,
  variant = "primary",
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: CallableFunction;
  variant?:
    | "primary"
    | "secondary"
    | "transparent"
    | "outlined"
    | "disabled"
    | "danger";
}) {
  return (
    <button
      onClick={() => (onClick ? onClick() : null)}
      className={`button ${variant ? variant : ""} ${className}`}
    >
      {children}
    </button>
  );
}
