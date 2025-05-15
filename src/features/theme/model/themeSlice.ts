'use client';
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
  theme: (typeof window !== 'undefined' && (localStorage.getItem('theme') as Theme)) || 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem('AccessibilityTheme', state.theme);
    },
    toggleTheme: (state) => {
      state.theme = 'light' === state.theme ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
