import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImageViewerState {
  isOpen: boolean;
  imageUrl: string | null;
}

const initialState: ImageViewerState = {
  isOpen: false,
  imageUrl: null,
};

const imageViewerSlice = createSlice({
  name: 'imageViewer',
  initialState,
  reducers: {
    openImage: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.imageUrl = action.payload;
    },
    closeImage: (state) => {
      state.isOpen = false;
      state.imageUrl = null;
    },
  },
});

export const { openImage, closeImage } = imageViewerSlice.actions;

export default imageViewerSlice.reducer;
