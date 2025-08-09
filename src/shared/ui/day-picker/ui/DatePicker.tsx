'use client';

import { useState, useEffect, useRef } from 'react';
import { BottomSheet } from 'shared/ui/bottom-sheet';
import { useDeviceDetect } from 'shared/lib/hooks/useDeviceDetect';
import { DEVICE_BREAKPOINTS } from 'shared/consts/device-breakpoints.constants';
import { Calendar } from './Calendar';
import { parseDate, formatDate } from '../lib/helpers'; // formatDate — нужная тебе функция
import cls from './DatePicker.module.scss';
import { DatePickerProps } from '../model/types';
import IconCalendar from 'shared/assets/svg/bootstrap-icons-1.11.2/calendar.svg';

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
  const ref = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceDetect(DEVICE_BREAKPOINTS.MOBILE);

  useEffect(() => {
    if (value) {
      const parsed = parseDate(value);
      if (parsed) {
        setSelectedDate(parsed);
      }
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
        setMode('day');
      }
    };

    if (!isMobile && isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isOpen]);

  const handleDateChange = (newValue: string) => {
    const parsed = parseDate(newValue);
    if (parsed) {
      setSelectedDate(parsed);
      onChange(newValue);
      setIsOpen(false);
      setMode('day');
    }
  };

  const formattedDate = value ? formatDate(selectedDate) : placeholder;

  const CalendarContent = (
    <Calendar
      value={value}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      onChange={handleDateChange}
      mode={mode}
      setMode={setMode}
    />
  );

  return (
    <div className={cls['calendar__container']} ref={ref}>
      {label && (
        <label htmlFor={name} className={cls['calendar__label']}>
          {label}
        </label>
      )}

      <button
        id={name}
        name={name}
        type="button"
        className={cls['calendar__control']}
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className={cls['calendar__value']}> {formattedDate}</span>
        <span className={cls['calendar__icon']}>
          <IconCalendar />
        </span>
      </button>

      {isMobile ? (
        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {CalendarContent}
        </BottomSheet>
      ) : (
        isOpen && <div className={cls['calendar__dropdown']}>{CalendarContent}</div>
      )}
    </div>
  );
};
