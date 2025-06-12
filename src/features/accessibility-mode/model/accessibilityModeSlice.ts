import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type FontSize = 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';

interface SizeState {
  isActive: boolean;
  fontSize: FontSize;
  imagesHidden: boolean;
}

const initialState: SizeState = {
  isActive: false, // По умолчанию false
  fontSize: 'medium',
  imagesHidden: false,
};

const accessibilityModeSlice = createSlice({
  name: 'accessibilityMode',
  initialState,
  reducers: {
    toggleMode(state) {
      state.isActive = !state.isActive;
    },
    setFontSize(state, action: PayloadAction<FontSize>) {
      state.fontSize = action.payload;
    },
    toggleImagesHidden(state) {
      state.imagesHidden = !state.imagesHidden;
    },
  },
});

export const { toggleMode, setFontSize, toggleImagesHidden } = accessibilityModeSlice.actions;
export default accessibilityModeSlice.reducer;
