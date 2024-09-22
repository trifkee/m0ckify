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
  onChange: (e: any, axis?: string) => void;
};

export default function Slider({
  className,
  value,
  min,
  max,
  step,
  name,
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
