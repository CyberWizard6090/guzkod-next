import React from 'react';
import './Checkbox.scss';

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, disabled = false }) => {
  const handleChange = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <label
      className={`checkbox ${checked ? 'checkbox--checked' : ''} ${disabled ? 'checkbox--disabled' : ''}`}
    >
      <input type="checkbox" checked={checked} onChange={handleChange} disabled={disabled} />
      <span className="checkbox__custom" />
      <span className="checkbox__label">{label}</span>
    </label>
  );
};

export default Checkbox;
