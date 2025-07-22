export type DatePickerMode = 'day' | 'month' | 'year';

export type DatePickerProps = {
  label: string;
  name: string;
  value: string; // формат: YYYY-MM-DD
  onChange: (value: string) => void;
  placeholder?: string;
};
