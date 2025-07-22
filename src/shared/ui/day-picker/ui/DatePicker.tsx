import { useState, useRef, useEffect } from 'react';
import { BottomSheet } from 'shared/ui/bottom-sheet';
import { useDeviceDetect } from 'shared/lib/hooks/useDeviceDetect';
import { DEVICE_BREAKPOINTS } from 'shared/consts/device-breakpoints.constants';
import { Calendar } from './Calendar';
import { parseDate } from '../lib/helpers';
import cls from './DatePicker.module.scss';
import { DatePickerProps } from '../model/types';

export const DatePicker = ({
  label,
  name,
  value,
  onChange,
  placeholder = 'Выберите дату',
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'day' | 'month' | 'year'>('day');
  const [selectedDate, setSelectedDate] = useState(() => (value ? new Date(value) : new Date()));
  const [inputValue, setInputValue] = useState(value);
  const ref = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceDetect(DEVICE_BREAKPOINTS.MOBILE);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
        setMode('day');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setInputValue(newVal);

    const parsed = parseDate(newVal);
    if (parsed) {
      setSelectedDate(parsed);
      onChange(newVal);
    }
  };

  return (
    <div className={cls['calendar__container']} ref={ref}>
      {label && (
        <label className={cls['calendar__label']} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        type="text"
        id={name}
        name={name}
        className={cls['calendar__input']}
        placeholder={placeholder}
        value={inputValue}
        onFocus={() => setIsOpen(true)}
        onChange={handleInputChange}
      />
      {isMobile ? (
        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Calendar
            value={value}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            onChange={onChange}
            mode={mode}
            setMode={setMode}
          />
        </BottomSheet>
      ) : (
        isOpen && (
          <Calendar
            value={value}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            onChange={onChange}
            mode={mode}
            setMode={setMode}
          />
        )
      )}
    </div>
  );
};
