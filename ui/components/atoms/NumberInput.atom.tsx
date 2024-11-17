import "@/ui/styles/atoms/numberInput.atom.scss";
import { ReactNode } from "react";

type NumberInputType = {
  name: string;
  label?: string | ReactNode;
  onChange: CallableFunction;
  value?: number;
  step?: number;
  min?: number;
  max?: number;
};

export default function NumberInput({
  onChange,
  step = 1,
  value = 0,
  label,
  name,
  min,
  max,
}: NumberInputType) {
  return (
    <div className="input-label">
      <label htmlFor="iw">{label ?? name}</label>
      <input
        min={min}
        max={max}
        step={step}
        type="number"
        name={name}
        id={name}
        onChange={(e) => onChange(e)}
        value={value}
      />
    </div>
  );
}
