import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface ImageViewerState {
  isOpen: boolean;
  images: string[]; // всегда массив
  currentIndex: number;
}

const initialState: ImageViewerState = {
  isOpen: false,
  images: [],
  currentIndex: 0,
};

const imageViewerSlice = createSlice({
  name: 'imageViewer',
  initialState,
  reducers: {
    openImage: (state, action: PayloadAction<string | string[]>) => {
      state.isOpen = true;
      if (Array.isArray(action.payload)) {
        state.images = action.payload;
        state.currentIndex = 0;
      } else {
        state.images = [action.payload];
        state.currentIndex = 0;
      }
    },
    closeImage: (state) => {
      state.isOpen = false;
      state.images = [];
      state.currentIndex = 0;
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.images.length) {
        state.currentIndex = action.payload;
      }
    },
  },
});

export const { openImage, closeImage, setCurrentIndex } = imageViewerSlice.actions;
export default imageViewerSlice.reducer;
