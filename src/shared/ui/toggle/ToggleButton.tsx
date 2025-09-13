import React from 'react';
import clsx from 'clsx';
import styles from './Toggle.module.scss';

type CheckboxToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

export const Toggle = ({ checked, onChange, disabled = false }: CheckboxToggleProps) => {
  const handleChange = () => {
    if (!disabled) onChange(!checked);
  };

  return (
    <label
      className={clsx(
        styles.toggle,
        checked && styles['toggle--checked'],
        disabled && styles['toggle--disabled'],
      )}
      aria-label="Toggle"
    >
      <input
        type="checkbox"
        className={styles['toggle__input']}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <span className={styles['toggle__slider']} />
    </label>
  );
};
