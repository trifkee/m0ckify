"use client";

import { IoCheckmark } from "react-icons/io5";

import "@/ui/styles/atoms/checkbox.atom.scss";

type CheckboxType = {
  title: string;
  value: boolean;
  htmlName: string;
  onChange: (e: any) => void;
};

export default function Checkbox({
  title,
  htmlName,
  value,
  onChange,
}: CheckboxType) {
  return (
    <div className="checkbox-input">
      <label htmlFor={htmlName}>
        {title}
        <IoCheckmark />
      </label>
      <input
        type="checkbox"
        name={htmlName}
        checked={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}
