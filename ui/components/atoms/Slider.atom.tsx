"use client";

import { AnimatePresence, motion } from "framer-motion";

import "@/ui/styles/atoms/slider.atom.scss";

type SliderType = {
  className?: string;
  value: string;
  min: number;
  max: number;
  step: number;
  name: string;
  id?: string;
  visible?: boolean;
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
  visible = true,
  onChange,
}: SliderType) {
  const initialVariants = {
    y: { bottom: "-100%" },
    x: { right: "-100%" },
  };

  const animateVariants = {
    y: {
      bottom: 0,
    },
    x: {
      right: 0,
    },
  };

  const exitVariants = {
    y: {
      bottom: "-200%",
    },
    x: {
      right: "-200%",
    },
  };

  return (
    <AnimatePresence presenceAffectsLayout>
      {visible && (
        <motion.input
          initial={{
            opacity: 1,
            position: "absolute",
            ...(name === "x" ? initialVariants.y : initialVariants.x),
          }}
          animate={{
            opacity: 1,
            position: "relative",
            ...(name === "x" ? animateVariants.y : animateVariants.x),
          }}
          exit={{
            opacity: 0,
            ...(name === "x" ? exitVariants.y : exitVariants.x),
          }}
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
      )}
    </AnimatePresence>
  );
}
