import React, { useState } from 'react';
import './radioGroup.scss';

type RadioOption = {
  label: string;
  value: string;
};

type RadioGroupProps = {
  options: RadioOption[];
  name: string;
  selectedValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  fieldName?: keyof any;
  valueRef?: React.MutableRefObject<any>;
};

export const RadioGroup = ({
  options,
  name,
  selectedValue,
  onChange,
  label,
  fieldName,
  valueRef,
}: RadioGroupProps) => {
  const [currentValue, setCurrentValue] = useState<string | undefined>(selectedValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCurrentValue(value);
    if (onChange) onChange(value);
    if (valueRef && fieldName) valueRef.current[fieldName] = value;
  };

  return (
    <div role="radiogroup" aria-labelledby={`${name}-label`} className="radioGroup">
      <label>{label}</label>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={currentValue === option.value}
            onChange={handleChange}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};
