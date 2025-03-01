// features/themeSwitcher/model/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme =
  | 'light'
  | 'dark'
  | 'black-white'
  | 'white-black'
  | 'brown-beige'
  | 'dark-blue-sky'
  | 'green-brown';

interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: (localStorage.getItem('theme') as Theme) || 'light', // По умолчанию light
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem('AccessibilityTheme', state.theme); // Сохраняем тему в localStorage
    },
    toggleTheme: (state) => {
      state.theme = 'light' === state.theme ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme); // Сохраняем тему в localStorage
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
