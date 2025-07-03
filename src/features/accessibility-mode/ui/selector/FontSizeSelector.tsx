import { FontSize } from 'features/accessibility-mode/types/accessibility';

type FontSizeSelectorProps = {
  value: FontSize;
  onChange: (value: FontSize) => void;
};

const fontOptions: { label: string; value: FontSize; className: string; ariaLabel: string }[] = [
  { label: 'Aа', value: 'small', className: 'font-size-small', ariaLabel: 'Маленький шрифт' },
  { label: 'Aа', value: 'medium', className: 'font-size-medium', ariaLabel: 'Средний шрифт' },
  { label: 'Aа', value: 'large', className: 'font-size-large', ariaLabel: 'Крупный шрифт' },
  {
    label: 'Aа',
    value: 'x-large',
    className: 'font-size-xlarge',
    ariaLabel: 'Очень крупный шрифт',
  },
];

const FontSizeSelector = ({ value, onChange }: FontSizeSelectorProps) => (
  <fieldset className="accessibility-selector accessibility-selector--font-size">
    <legend className="accessibility-selector__title">Размер шрифта</legend>
    <div
      className="accessibility-selector__options"
      role="radiogroup"
      aria-label="Выбор размера шрифта"
    >
      {fontOptions.map((opt) => (
        <label
          key={opt.value}
          className={`accessibility-selector__option accessibility-selector__option--font-${opt.value} ${
            value === opt.value ? 'accessibility-selector__option--active' : ''
          }`}
        >
          <input
            type="radio"
            name="fontSize"
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

export default FontSizeSelector;
