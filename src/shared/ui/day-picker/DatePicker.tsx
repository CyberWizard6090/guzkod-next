import { useState, useRef, useEffect } from 'react';
import IconArrowRight from 'shared/assets/svg/bootstrap-icons-1.11.2/chevron-right.svg';
import IconArrowLeft from 'shared/assets/svg/bootstrap-icons-1.11.2/chevron-left.svg';
import './DatePicker.scss';

type Props = {
  label: string;
  name: string;
  value: string; // формат: YYYY-MM-DD
  onChange: (value: string) => void;
  placeholder?: string;
};

const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const DatePicker = ({
  label,
  name,
  value,
  onChange,
  placeholder = 'Выберите дату',
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'day' | 'month' | 'year'>('day');
  const [selectedDate, setSelectedDate] = useState(() => (value ? new Date(value) : new Date()));
  const [inputValue, setInputValue] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

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

  const parseDate = (str: string): Date | null => {
    const match = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;
    const [_, y, m, d] = match;
    const date = new Date(+y, +m - 1, +d);
    return isNaN(date.getTime()) ? null : date;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setInputValue(newVal);

    const parsed = parseDate(newVal);
    if (parsed) {
      setSelectedDate(parsed);
      onChange(newVal);
    }
  };

  const handleDayClick = (day: number) => {
    const date = new Date(selectedDate);
    date.setDate(day);
    const iso =
      date.getFullYear().toString().padStart(4, '0') +
      '-' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      date.getDate().toString().padStart(2, '0');
    onChange(iso);
    setIsOpen(false);
    setMode('day');
  };

  const handleMonthClick = (month: number) => {
    const date = new Date(selectedDate);
    date.setMonth(month);
    setSelectedDate(date);
    setMode('day');
  };

  const handleYearClick = (year: number) => {
    const date = new Date(selectedDate);
    date.setFullYear(year);
    setSelectedDate(date);
    setMode('month');
  };

  const changeMonth = (offset: number) => {
    const date = new Date(selectedDate);
    date.setMonth(date.getMonth() + offset);
    setSelectedDate(date);
  };

  const changeYear = (offset: number) => {
    const date = new Date(selectedDate);
    date.setFullYear(date.getFullYear() + offset);
    setSelectedDate(date);
  };

  const renderDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const grid = [];
    for (let i = 0; i < firstDay; i++) {
      grid.push(<div key={`e-${i}`} className="calendar__cell empty" />);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const iso =
        date.getFullYear().toString().padStart(4, '0') +
        '-' +
        (date.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        date.getDate().toString().padStart(2, '0');
      const selected = iso === value;
      grid.push(
        <div
          key={d}
          className={`calendar__cell ${selected ? 'selected' : ''}`}
          onClick={() => handleDayClick(d)}
        >
          {d}
        </div>,
      );
    }

    return <div className="calendar__grid">{grid}</div>;
  };

  const renderMonths = () => (
    <div className="calendar__grid calendar__grid--months">
      {MONTHS.map((m, i) => (
        <div key={m} className="calendar__cell" onClick={() => handleMonthClick(i)}>
          {m}
        </div>
      ))}
    </div>
  );

  const renderYears = () => {
    const currentYear = selectedDate.getFullYear();
    const startYear = currentYear - (currentYear % 12) - 1;
    const years = Array.from({ length: 14 }, (_, i) => startYear + i);
    return (
      <div className="calendar__grid calendar__grid--years">
        {years.map((y) => (
          <div key={y} className="calendar__cell" onClick={() => handleYearClick(y)}>
            {y}
          </div>
        ))}
      </div>
    );
  };

  const renderPicker = () => (
    <div className="calendar shadow__style">
      <div className="calendar__header">
        {mode === 'day' && (
          <>
            <button className="calendar__nav-button" onClick={() => changeMonth(-1)}>
              <IconArrowLeft />
            </button>
            <span className="calendar__month" onClick={() => setMode('month')}>
              {MONTHS[selectedDate.getMonth()]}
            </span>
            <span className="calendar__year" onClick={() => setMode('year')}>
              {selectedDate.getFullYear()}
            </span>
            <button className="calendar__nav-button" onClick={() => changeMonth(1)}>
              <IconArrowRight />
            </button>
          </>
        )}
        {mode === 'month' && (
          <>
            <button className="calendar__nav-button" onClick={() => changeYear(-1)}>
              <IconArrowLeft />
            </button>
            <span className="calendar__year-label">{selectedDate.getFullYear()}</span>
            <button className="calendar__nav-button" onClick={() => changeYear(1)}>
              <IconArrowRight />
            </button>
          </>
        )}
        {mode === 'year' && (
          <>
            <button className="calendar__nav-button" onClick={() => changeYear(-12)}>
              <IconArrowLeft />
            </button>
            <span className="calendar__year-range">
              {`${selectedDate.getFullYear() - 6} - ${selectedDate.getFullYear() + 7}`}
            </span>
            <button className="calendar__nav-button" onClick={() => changeYear(12)}>
              <IconArrowRight />
            </button>
          </>
        )}
      </div>

      {mode === 'day' && <div className="calendar__body calendar__body--day">{renderDays()}</div>}
      {mode === 'month' && (
        <div className="calendar__body calendar__body--month">{renderMonths()}</div>
      )}
      {mode === 'year' && (
        <div className="calendar__body calendar__body--year">{renderYears()}</div>
      )}
    </div>
  );

  return (
    <div className="calendar__container" ref={ref}>
      {label && (
        <label className={'calendar__label'} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        type="text"
        id={name}
        name={name}
        className="calendar__input"
        placeholder={placeholder}
        value={inputValue}
        onFocus={() => setIsOpen(true)}
        onChange={handleInputChange}
      />
      {isOpen && renderPicker()}
    </div>
  );
};
