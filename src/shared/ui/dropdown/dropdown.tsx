import React, { useState } from 'react';
import './dropdown.scss';
import { ReactComponent as Up } from 'shared/assets/svg/bootstrap-icons-1.11.2/chevron-up.svg';
import { ReactComponent as Down } from 'shared/assets/svg/bootstrap-icons-1.11.2/chevron-down.svg';
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

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: DropdownOption) => {
    setSelectedOption(option.label);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option.value);
    }

    valueRef.current[fieldName] = option.value;
  };

  return (
    <div className="dropdown">
      {label && <label className="dropdown__label">{label}</label>}
      <div className="dropdown__control" onClick={toggleDropdown}>
        {selectedOption || 'Выберите значения'}
        <span className="dropdown__arrow">{isOpen ? <Up /> : <Down />}</span>
      </div>
      {isOpen && (
        <ul className="dropdown__menu">
          {options.map((option, index) => (
            <li key={index} className="dropdown__option" onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
