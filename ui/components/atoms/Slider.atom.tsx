"use client";

import "@/ui/styles/atoms/slider.atom.scss";

type SliderType = {
  className?: string;
  value: string;
  min: number;
  max: number;
  step: number;
  name: string;
  id?: string;
  // type: "x" | "y" | "small";
  onChange: (e: any, axis?: string) => void;
};

export default function Slider({
  className,
  value,
  min,
  max,
  step,
  name,
  // type = "small",
  id,
  onChange,
}: SliderType) {
  return (
    <input
      type="range"
      value={value}
      min={min}
      max={max}
      step={step}
      name={name}
      id={id || name}
      onChange={(e) => onChange(e, "y")}
      className={`slider ${className}`}
    />
  );
}
