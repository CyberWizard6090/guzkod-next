import React, { useState } from 'react';
import './style.scss';
type MaskedInputProps = {
  mask: string; // Маска для инпута
  validate: (value: string) => boolean; // Функция проверки значения
  onValidChange?: (value: string) => void; // Колбэк для изменения валидного значения
  fieldName: keyof any;
  valueRef: React.MutableRefObject<any>;
};

export const MaskedInput: React.FC<MaskedInputProps> = ({
  mask,
  validate,
  onValidChange,
  fieldName,
  valueRef,
}) => {
  const [value, setValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  /**
   * Функция для применения маски к введенному значению.
   * @param value - Введенное значение без маски.
   * @param mask - Строка маски, где "9" обозначает цифры, а остальные символы остаются неизменными.
   */
  const applyMask = (value: string, mask: string): string => {
    let maskedValue = '';
    let valueIndex = 0;

    for (let i = 0; i < mask.length; i++) {
      if (valueIndex >= value.length) break;

      const maskChar = mask[i];
      const valueChar = value[valueIndex];

      if (maskChar === '9') {
        if (/\d/.test(valueChar)) {
          maskedValue += valueChar;
          valueIndex++;
        } else {
          break;
        }
      } else {
        maskedValue += maskChar;
        if (maskChar === valueChar) {
          valueIndex++;
        }
      }
    }
    return maskedValue;
  };

  /**
   * Обработчик изменения значения в поле ввода.
   * @param event - Событие изменения.
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, ''); // Убираем все символы, кроме цифр
    const maskedValue = applyMask(rawValue, mask);

    setValue(maskedValue);

    const valid = validate(maskedValue);
    setIsValid(valid);
    valueRef.current[fieldName] = event.target.value;
    if (valid && onValidChange) {
      onValidChange(maskedValue);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className={`input ${isValid ? '' : 'input--error'}`}
        placeholder={mask.replace(/9/g, '0')} // Отображаем маску в качестве placeholder
      />
      {!isValid && <p className="error-message">Введенное значение некорректно</p>}
    </div>
  );
};
