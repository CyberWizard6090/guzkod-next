'use client';
import React from 'react';
import styles from './RadioGroup.module.scss';

type RadioOption = {
  label: string;
  value: string;
  preview?: React.ReactNode;
};

type RadioGroupProps = {
  label?: string;
  name: string;
  value: string;
  options: RadioOption[];
  onChange: (value: string) => void;
};

export const RadioGroup = ({ label, name, value, options, onChange }: RadioGroupProps) => {
  return (
    <fieldset className={styles['radio-group']}>
      {label && <legend className={styles['radio-group__legend']}>{label}</legend>}
      {options.map((opt) => (
        <label
          key={opt.value}
          className={`${styles['radio-group__option']} ${
            value === opt.value ? styles['radio-group__option_active'] : ''
          }`}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className={styles['radio-group__input']}
          />
          <span className={styles['radio-group__custom-radio']} />
          <span className={styles['radio-group__preview']}>{opt.preview ?? opt.label}</span>
        </label>
      ))}
    </fieldset>
  );
};
