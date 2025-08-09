'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BottomSheet } from 'shared/ui/bottom-sheet';
import IconUp from 'shared/assets/svg/bootstrap-icons-1.11.2/chevron-up.svg';
import IconDown from 'shared/assets/svg/bootstrap-icons-1.11.2/chevron-down.svg';
import cls from './Dropdown.module.scss';
import { useDeviceDetect } from 'shared/lib/hooks/useDeviceDetect';
import { DEVICE_BREAKPOINTS } from 'shared/consts/device-breakpoints.constants';

type DropdownOption = {
  value: string;
  label: string;
};

type DropdownProps = {
  options: DropdownOption[];
  label?: string;
  value: string;
  defaultValue?: string;
  onChange: (value: string) => void;
};

export const Dropdown = ({ options, label, value, defaultValue, onChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceDetect(DEVICE_BREAKPOINTS.MOBILE);
  useEffect(() => {
    if (!value && defaultValue) {
      onChange(defaultValue);
    }
  }, [defaultValue, onChange, value]);

  useEffect(() => {
    if (isMobile || !isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobile, isOpen]);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleOptionClick = (newValue: string) => {
    onChange(newValue);
    closeDropdown();
  };

  const DropdownList = (
    <div className={cls['dropdown__menu']}>
      <ul
        className={cls['dropdown__list']}
        role="listbox"
        tabIndex={0}
        aria-label={label ?? 'Выбор значения'}
      >
        {options.map((option) => (
          <li
            key={option.value}
            className={`${cls['dropdown__option']} ${
              value === option.value ? cls['dropdown__option--selected'] : ''
            }`}
            onClick={() => handleOptionClick(option.value)}
            role="option"
            aria-selected={value === option.value}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOptionClick(option.value);
              }
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={cls.dropdown} ref={dropdownRef}>
      {label && <label className={cls['dropdown__label']}>{label}</label>}

      <button
        className={cls['dropdown__control']}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={cls['dropdown__value']}>
          {selectedLabel ?? defaultValue ?? 'Выберите значение'}
        </span>

        <span className={cls['dropdown__arrow']}>{isOpen ? <IconUp /> : <IconDown />}</span>
      </button>

      {isMobile ? (
        <BottomSheet isOpen={isOpen} onClose={closeDropdown}>
          {DropdownList}
        </BottomSheet>
      ) : (
        isOpen && DropdownList
      )}
    </div>
  );
};
