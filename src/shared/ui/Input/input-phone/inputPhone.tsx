import React, { useState, useEffect } from 'react';
import './../input.scss';
type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const InputPhone = ({ label, name, value, onChange, placeholder }: Props) => {
  const [internalValue, setInternalValue] = useState(value);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const phoneMask = '+7 (999) 999-99-99';

  const applyMask = (rawValue: string) => {
    let result = '';
    let rawIndex = 0;

    for (let i = 0; i < phoneMask.length; i++) {
      if (rawIndex >= rawValue.length) break;

      const maskChar = phoneMask[i];
      const rawChar = rawValue[rawIndex];

      if (maskChar === '9') {
        if (/\d/.test(rawChar)) {
          result += rawChar;
          rawIndex++;
        } else {
          rawIndex++;
          i--;
        }
      } else {
        result += maskChar;
        if (maskChar === rawChar) {
          rawIndex++;
        }
      }
    }
    return result;
  };

  const validatePhone = (val: string) => {
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    return phoneRegex.test(val);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const masked = applyMask(raw);

    setInternalValue(masked);
    onChange(masked);

    setIsValid(validatePhone(masked));
  };

  return (
    <div className="input__container">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type="tel"
        inputMode="tel"
        className={`input ${isValid ? '' : 'input--error'}`}
        value={internalValue}
        onChange={onInputChange}
        placeholder={placeholder ?? phoneMask.replace(/9/g, '0')}
      />
      {!isValid && <p className="error-message">Некорректный номер телефона</p>}
    </div>
  );
};
