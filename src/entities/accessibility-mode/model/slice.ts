'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccessibilityState } from '../types';

const defaultState: AccessibilityState = {
  fontSize: 'normal',
  fontFamily: 'sans',
  letterSpacing: 'normal',
  lineHeight: 1.5,
  textWidth: 'auto',

  colorScheme: 'light',

  showImages: true,
  imageMode: 'normal',

  highlightFocus: false,
  cursorSize: 'small',
  animations: 'full',

  persist: true,

  isModeActive: false,
  isModalOpen: false,
};

// Восстанавливаем из localStorage, если persist = true
function loadState(): AccessibilityState {
  try {
    const raw = localStorage.getItem('a11y');
    if (raw) {
      const parsed: AccessibilityState = JSON.parse(raw);
      return { ...defaultState, ...parsed };
    }
  } catch {
    // игнорим ошибки
  }
  return defaultState;
}

const initialState: AccessibilityState = loadState();

const accessibilitySlice = createSlice({
  name: 'accessibility',
  initialState,
  reducers: {
    setFontSize: (s, a: PayloadAction<AccessibilityState['fontSize']>) => {
      s.fontSize = a.payload;
    },
    setFontFamily: (s, a: PayloadAction<AccessibilityState['fontFamily']>) => {
      s.fontFamily = a.payload;
    },
    setLetterSpacing: (s, a: PayloadAction<AccessibilityState['letterSpacing']>) => {
      s.letterSpacing = a.payload;
    },
    setLineHeight: (s, a: PayloadAction<number>) => {
      s.lineHeight = a.payload;
    },

    setColorScheme: (s, a: PayloadAction<AccessibilityState['colorScheme']>) => {
      s.colorScheme = a.payload;
    },

    toggleShowImages: (s) => {
      s.showImages = !s.showImages;
    },
    setImageMode: (s, a: PayloadAction<AccessibilityState['imageMode']>) => {
      s.imageMode = a.payload;
    },

    toggleHighlightFocus: (s) => {
      s.highlightFocus = !s.highlightFocus;
    },
    setCursorSize: (s, a: PayloadAction<AccessibilityState['cursorSize']>) => {
      s.cursorSize = a.payload;
    },
    setAnimations: (s, a: PayloadAction<AccessibilityState['animations']>) => {
      s.animations = a.payload;
    },

    togglePersist: (s) => {
      s.persist = !s.persist;
    },
    resetSettings: () => defaultState,

    setMode: (s, a: PayloadAction<boolean>) => {
      s.isModeActive = a.payload;
    },
    setModalOpen: (s, a: PayloadAction<boolean>) => {
      s.isModalOpen = a.payload;
    },
  },
});

export const {
  setFontSize,
  setFontFamily,
  setLetterSpacing,
  setLineHeight,

  setColorScheme,
  toggleShowImages,
  setImageMode,
  toggleHighlightFocus,
  setCursorSize,
  setAnimations,
  togglePersist,
  resetSettings,
  setMode,
  setModalOpen,
} = accessibilitySlice.actions;

export default accessibilitySlice.reducer;
