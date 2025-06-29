import './../input.scss';
type Props = {
  label: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  inputMode?: 'search' | 'text' | 'email' | 'tel' | 'url' | 'none' | 'numeric' | 'decimal';
};

export const Input = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  type = 'text',
  inputMode = 'text',
}: Props) => {
  return (
    <div className="input__container">
      {label && <label htmlFor={name}>{label}</label>}

      <input
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        className="input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
