import React, { useEffect, useRef } from 'react';
import './../input.scss';
type TextareaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
};

export const Textarea = ({
  label,
  value,
  onChange,
  placeholder = '',
  maxLength,
  rows = 6,
}: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const remainingChars = maxLength !== undefined ? maxLength - value.length : undefined;

  return (
    <div className="input__container">
      {label && <label>{label}</label>}
      <textarea
        ref={textareaRef}
        className="input"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        style={{
          resize: 'none',
          overflow: 'hidden',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />
      {remainingChars !== undefined && (
        <div className="input__info-message">Осталось символов: {remainingChars}</div>
      )}
    </div>
  );
};
