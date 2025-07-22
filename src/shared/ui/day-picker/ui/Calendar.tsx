import { MONTHS } from 'shared/consts/date-constants.constants';
import IconArrowRight from 'shared/assets/svg/bootstrap-icons-1.11.2/chevron-right.svg';
import IconArrowLeft from 'shared/assets/svg/bootstrap-icons-1.11.2/chevron-left.svg';
import { formatDate } from '../lib/helpers';
import { DatePickerMode } from '../model/types';
import cls from './DatePicker.module.scss';
import clsx from 'clsx';

type CalendarProps = {
  value: string;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  onChange: (val: string) => void;
  mode: DatePickerMode;
  setMode: (mode: DatePickerMode) => void;
};

export const Calendar = ({
  value,
  selectedDate,
  setSelectedDate,
  onChange,
  mode,
  setMode,
}: CalendarProps) => {
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

  const handleDayClick = (day: number) => {
    const date = new Date(selectedDate);
    date.setDate(day);
    onChange(formatDate(date));
    setSelectedDate(date);
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

  const renderDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const grid = [];
    for (let i = 0; i < firstDay; i++) {
      grid.push(<div key={`empty-${i}`} className={cls['calendar__cell'] + ' ' + cls['empty']} />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const iso = formatDate(date);
      const selected = iso === value;

      grid.push(
        <div
          key={d}
          className={clsx(cls['calendar__cell'], selected && cls['selected'])}
          onClick={() => handleDayClick(d)}
        >
          {d}
        </div>,
      );
    }

    return <div className={cls['calendar__grid']}>{grid}</div>;
  };

  const renderMonths = () => (
    <div className={clsx(cls['calendar__grid'], cls['calendar__grid--months'])}>
      {MONTHS.map((m, i) => (
        <div key={m} className={cls['calendar__cell']} onClick={() => handleMonthClick(i)}>
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
      <div className={clsx(cls['calendar__grid'], cls['calendar__grid--years'])}>
        {years.map((y) => (
          <div key={y} className={cls['calendar__cell']} onClick={() => handleYearClick(y)}>
            {y}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={cls['calendar'] + ' shadow'}>
      <div className={cls['calendar__header']}>
        {mode === 'day' && (
          <>
            <button className={cls['calendar__nav-button']} onClick={() => changeMonth(-1)}>
              <IconArrowLeft />
            </button>
            <span className={cls['calendar__month']} onClick={() => setMode('month')}>
              {MONTHS[selectedDate.getMonth()]}
            </span>
            <span className={cls['calendar__year']} onClick={() => setMode('year')}>
              {selectedDate.getFullYear()}
            </span>
            <button className={cls['calendar__nav-button']} onClick={() => changeMonth(1)}>
              <IconArrowRight />
            </button>
          </>
        )}
        {mode === 'month' && (
          <>
            <button className={cls['calendar__nav-button']} onClick={() => changeYear(-1)}>
              <IconArrowLeft />
            </button>
            <span className={cls['calendar__year-label']}>{selectedDate.getFullYear()}</span>
            <button className={cls['calendar__nav-button']} onClick={() => changeYear(1)}>
              <IconArrowRight />
            </button>
          </>
        )}
        {mode === 'year' && (
          <>
            <button className={cls['calendar__nav-button']} onClick={() => changeYear(-12)}>
              <IconArrowLeft />
            </button>
            <span className={cls['calendar__year-range']}>
              {selectedDate.getFullYear() - 6} - {selectedDate.getFullYear() + 7}
            </span>
            <button className={cls['calendar__nav-button']} onClick={() => changeYear(12)}>
              <IconArrowRight />
            </button>
          </>
        )}
      </div>

      {mode === 'day' && <div className={cls['calendar__body--day']}>{renderDays()}</div>}
      {mode === 'month' && <div className={cls['calendar__body--month']}>{renderMonths()}</div>}
      {mode === 'year' && <div className={cls['calendar__body--year']}>{renderYears()}</div>}
    </div>
  );
};
