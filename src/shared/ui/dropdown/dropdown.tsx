'use client';
import React, { useEffect, useRef, useState } from 'react';
import './dropdown.scss';
import Up from 'shared/assets/svg/bootstrap-icons-1.11.2/chevron-up.svg';
import Down from 'shared/assets/svg/bootstrap-icons-1.11.2/chevron-down.svg';
import Cross from 'shared/assets/svg/bootstrap-icons-1.11.2/x.svg';

type DropdownOption = {
  value: string;
  label: string;
};

type DropdownProps = {
  options: DropdownOption[];
  label?: string;
  value: string;
  onChange: (value: string) => void;
};

export const Dropdown = ({ options, label, value, onChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  const checkMobile = () => window.innerWidth <= 768;

  const toggleDropdown = () => {
    if (!isOpen && checkMobile()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (newValue: string) => {
    onChange(newValue);
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        document.body.style.overflow = '';
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkMobile());
      if (!checkMobile()) {
        document.body.style.overflow = '';
      }
    };

    handleResize(); // начальное состояние
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      {label && <label className="dropdown__label">{label}</label>}
      <button
        className="dropdown__control"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedLabel || 'Выберите значение'}
        <span className="dropdown__arrow">{isOpen ? <Up /> : <Down />}</span>
      </button>
      {isOpen && (
        <div className={`dropdown__menu ${isMobile ? 'dropdown__menu--mobile' : ''}`}>
          <div className="dropdown__header">
            <button className="dropdown__close-button" onClick={toggleDropdown}>
              Закрыть <Cross />
            </button>
          </div>
          <ul className="dropdown__list" role="listbox" aria-label={label ?? 'Выбор значения'}>
            {options.map((option) => (
              <li
                key={option.value}
                className={`dropdown__option ${
                  value === option.value ? 'dropdown__option--selected' : ''
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
      )}
    </div>
  );
};
