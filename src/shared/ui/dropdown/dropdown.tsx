'use client';
import React, { useState, useRef, useEffect } from 'react';
import './dropdown.scss';
import Up from 'shared/assets/svg/bootstrap-icons-1.11.2/chevron-up.svg';
import Down from 'shared/assets/svg/bootstrap-icons-1.11.2/chevron-down.svg';

type DropdownOption = {
  value: string;
  label: string;
};

type DropdownProps = {
  options: DropdownOption[];
  label?: string;
  onSelect?: (value: string) => void;
  fieldName: keyof any;
  valueRef: React.MutableRefObject<any>;
};

export const Dropdown = ({ options, label, onSelect, fieldName, valueRef }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const checkMobile = () => window.innerWidth <= 768;

  const toggleDropdown = () => {
    if (!isOpen && checkMobile()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: DropdownOption) => {
    setSelectedOption(option.label);
    setIsOpen(false);
    document.body.style.overflow = '';
    onSelect?.(option.value);
    valueRef.current[fieldName] = option.value;
  };

  // Обработчик клика вне области
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Обработчик изменения размера окна
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkMobile());
      if (!checkMobile()) {
        document.body.style.overflow = '';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      {label && <label className="dropdown__label">{label}</label>}
      <div className="dropdown__control" onClick={toggleDropdown}>
        {selectedOption || 'Выберите значения'}
        <span className="dropdown__arrow">{isOpen ? <Up /> : <Down />}</span>
      </div>
      {isOpen && (
        <div className={`dropdown__menu ${isMobile ? 'dropdown__menu--mobile' : ''}`}>
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                className="dropdown__option"
                onClick={() => handleOptionClick(option)}
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
