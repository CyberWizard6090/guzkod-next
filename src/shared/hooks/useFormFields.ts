import { useCallback, useRef, useState } from 'react';

type FieldsState = Record<string, any>;

export const useFormFields = (initial: FieldsState = {}) => {
  const [state, setState] = useState(initial);
  const ref = useRef(initial);

  const setValue = useCallback((name: string, value: any) => {
    ref.current[name] = value;
    setState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const getValue = useCallback((name: string) => state[name], [state]);

  const reset = useCallback(() => {
    setState(initial);
    ref.current = initial;
  }, [initial]);

  return {
    getFieldProps: (name: string) => ({
      value: state[name] ?? '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setValue(name, e.target.value),
    }),
    getRadioProps: (name: string, value: string) => ({
      checked: state[name] === value,
      onChange: () => setValue(name, value),
    }),
    getSelectProps: (name: string) => ({
      value: state[name],
      onChange: (value: any) => setValue(name, value),
    }),
    getCheckboxProps: (name: string) => ({
      checked: !!state[name],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(name, e.target.checked),
    }),
    setValue,
    getValue,
    reset,
    values: state,
    ref,
  };
};
