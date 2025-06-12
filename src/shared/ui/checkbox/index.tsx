import React from 'react';
import './Checkbox.scss';

type CheckboxProps = {
  children?: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

export const Checkbox = ({ children, checked, onChange, disabled = false }: CheckboxProps) => {
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
      <span className="checkbox__label">{children}</span>
    </label>
  );
};
