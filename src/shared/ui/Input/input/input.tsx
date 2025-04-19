import React from 'react';

type Props = {
  label: string;
  placeholder: string;
  fieldName?: keyof any;
  valueRef: React.MutableRefObject<any>;
  type?: string;
  inputmode?:
    | 'search'
    | 'text'
    | 'email'
    | 'tel'
    | 'url'
    | 'none'
    | 'numeric'
    | 'decimal'
    | undefined;
};

export const Input = ({
  label,
  placeholder,
  fieldName,
  valueRef,
  type = 'text',
  inputmode = 'text',
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (fieldName) {
      valueRef.current[fieldName] = event.target.value;
    } else {
      valueRef.current = event.target.value;
    }
  };
  return (
    <div className="input__container">
      {label ? <label>{label}</label> : <></>}

      <input
        type={type}
        inputMode={inputmode}
        className="input"
        defaultValue={''}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};
