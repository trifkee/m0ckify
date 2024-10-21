import "@/ui/styles/atoms/numberInput.atom.scss";

type NumberInputType = {
  name: string;
  label?: string;
  onChange: CallableFunction;
  value?: number;
  step?: number;
};

export default function NumberInput({
  onChange,
  step = 1,
  value = 0,
  label,
  name,
}: NumberInputType) {
  return (
    <div className="input-label">
      <label htmlFor="iw">{label ?? name}</label>
      <input
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
