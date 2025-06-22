import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FontSize = 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';

type SizeState = {
  isActive: boolean;
  fontSize: FontSize;
  imagesHidden: boolean;
  isModalOpen: boolean;
};

const initialState: SizeState = {
  isActive: false,
  fontSize: 'medium',
  imagesHidden: false,
  isModalOpen: false,
};

const accessibilityModeSlice = createSlice({
  name: 'accessibilityMode',
  initialState,
  reducers: {
    toggleMode(state) {
      state.isActive = !state.isActive;
    },
    setMode(state, action: PayloadAction<boolean>) {
      state.isActive = action.payload;
    },
    setFontSize(state, action: PayloadAction<FontSize>) {
      state.fontSize = action.payload;
    },
    toggleImagesHidden(state) {
      state.imagesHidden = !state.imagesHidden;
    },
    setModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
  },
});

export const { toggleMode, setMode, setFontSize, toggleImagesHidden, setModalOpen } =
  accessibilityModeSlice.actions;
export default accessibilityModeSlice.reducer;
