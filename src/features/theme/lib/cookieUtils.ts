import { Theme } from '../model/themeSlice';

export const setThemeCookie = (theme: Theme) => {
  document.cookie = `theme=${theme}; path=/; max-age=31536000`; // 1 год
};

export const getThemeCookie = (): Theme | undefined => {
  if (typeof document === 'undefined') return undefined;
  const match = RegExp(/theme=([^;]+)/).exec(document.cookie);
  return match ? (match[1] as Theme) : undefined;
};
