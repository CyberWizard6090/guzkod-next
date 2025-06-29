import React from 'react';
import './radioGroup.scss';

type RadioOption = {
  label: string;
  value: string;
};

type RadioGroupProps = {
  options: RadioOption[];
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

export const RadioGroup = ({ options, name, value, onChange, label }: RadioGroupProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div role="radiogroup" aria-labelledby={`${name}-label`} className="radioGroup">
      {label && <label id={`${name}-label`}>{label}</label>}
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={handleChange}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};
