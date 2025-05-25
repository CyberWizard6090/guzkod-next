import { Theme } from 'features/theme/model/themeSlice';
import React from 'react';

interface ThemeSelectorProps {
  value: Theme;
  onChange: (value: Theme) => void;
}

const themeOptions: { label: string; value: Theme; className: string; ariaLabel: string }[] = [
  {
    label: 'ЧБ',
    value: 'black-white',
    className: 'theme-black-white',
    ariaLabel: 'Черно-белая тема',
  },
  {
    label: 'КБ',
    value: 'brown-beige',
    className: 'theme-brown-beige',
    ariaLabel: 'Коричнево-бежевая тема',
  },
  {
    label: 'СГ',
    value: 'dark-blue-sky',
    className: 'theme-dark-blue-sky',
    ariaLabel: 'Темно-синяя с голубым тема',
  },
  {
    label: 'ЗК',
    value: 'green-brown',
    className: 'theme-green-brown',
    ariaLabel: 'Зеленая с коричневым тема',
  },
  {
    label: 'БЧ',
    value: 'white-black',
    className: 'theme-white-black',
    ariaLabel: 'Белая с черным тема',
  },
];

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ value, onChange }) => (
  <fieldset className="accessibility-selector accessibility-selector--theme">
    <legend className="accessibility-selector__title">Цветовая схема</legend>
    <div
      className="accessibility-selector__options"
      role="radiogroup"
      aria-label="Выбор цветовой схемы"
    >
      {themeOptions.map((opt) => (
        <label
          key={opt.value}
          className={`accessibility-selector__option accessibility-selector__option--theme-${opt.value} ${
            value === opt.value ? 'accessibility-selector__option--active' : ''
          }`}
        >
          <input
            type="radio"
            name="theme"
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            aria-label={opt.ariaLabel}
          />
          <span aria-hidden="true">{opt.label}</span>
        </label>
      ))}
    </div>
  </fieldset>
);

export default ThemeSelector;
