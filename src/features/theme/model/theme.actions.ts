import { AppDispatch, RootState } from 'shared/stores';
import { setTheme as setThemeAction, Theme } from './themeSlice';

export const setTheme = (theme: Theme) => (dispatch: AppDispatch) => {
  dispatch(setThemeAction(theme));
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme);
    document.cookie = `theme=${theme}; path=/; max-age=31536000`;
  }
};

export const toggleTheme = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const currentTheme = getState().theme.theme;
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  dispatch(setTheme(newTheme));
};
