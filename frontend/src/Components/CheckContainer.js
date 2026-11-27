const OPTION_ITEMS = [
  { key: "uppercase", label: "Include Uppercase Letters" },
  { key: "lowercase", label: "Include Lowercase Letters" },
  { key: "numbers", label: "Include Numbers" },
  { key: "symbols", label: "Include Symbols" },
];

export default function CheckbtnContainer({ options, onToggleOption }) {
  return (
    <div className="checkbtnContainer bg">
      {OPTION_ITEMS.map(({ key, label }) => (
        <label className="checkboxBox" key={key}>
          <input
            type="checkbox"
            checked={Boolean(options[key])}
            onChange={() => onToggleOption(key)}
          />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
}
