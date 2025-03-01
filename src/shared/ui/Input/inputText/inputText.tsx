import React, { useState, useRef, useEffect } from 'react';

type ExpandableTextareaProps = {
  label: string;
  rows?: number; // Количество строк по умолчанию
  maxLength?: number; // Максимальное количество символов
  placeholder?: string; // Плейсхолдер
  value?: string; // Начальное значение
  onChange?: (value: string) => void; // Обработчик изменения текста
  fieldName: keyof any; // Ключ объекта FieldType
  valueRef: React.MutableRefObject<any>;
};

export const InputText = ({
  label,
  rows = 6,
  maxLength,
  placeholder = '',
  value = '',
  onChange,
  fieldName,
  valueRef,
}: ExpandableTextareaProps) => {
  const [text, setText] = useState(value);
  const [remainingChars, setRemainingChars] = useState(
    maxLength ? maxLength - value.length : undefined,
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (maxLength !== undefined) {
      setRemainingChars(maxLength - text.length);
    }
  }, [text, maxLength]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    valueRef.current[fieldName] = event.target.value;
    if (maxLength === undefined || newText.length <= maxLength) {
      setText(newText);
      onChange?.(newText);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Сброс высоты для перерасчёта
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <div className="input__container">
      <label>{label}</label>
      <textarea
        className="input"
        ref={textareaRef}
        rows={rows}
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        style={{
          resize: 'none',
          overflow: 'hidden',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />
      {maxLength !== undefined && (
        <div className="input__info-message">Осталось символов: {remainingChars}</div>
      )}
    </div>
  );
};
