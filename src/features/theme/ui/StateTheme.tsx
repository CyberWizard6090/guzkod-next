import { RootState } from 'app/stores';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { SelectTheme } from '../model/selectors';

export const StateTheme = () => {
  const theme = useSelector((state: RootState) => SelectTheme(state));

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  return null;
};
