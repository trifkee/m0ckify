import "@/ui/styles/atoms/numberInput.atom.scss";

type NumberInputType = {
  name: string;
  label?: string;
  onChange: CallableFunction;
  value: number;
};

export default function NumberInput({
  onChange,
  value,
  label,
  name,
}: NumberInputType) {
  return (
    <div className="input-label">
      <label htmlFor="iw">{label ?? name}</label>
      <input
        type="number"
        name={name}
        id={name}
        onChange={(e) => onChange(e)}
        value={value}
      />
    </div>
  );
}
