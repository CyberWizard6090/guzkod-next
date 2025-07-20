import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PdfViewerState = {
  isOpen: boolean;
  fileUrl: string | null;
  fileName?: string | null;
};

const initialState: PdfViewerState = {
  isOpen: false,
  fileUrl: null,
};

const pdfViewerSlice = createSlice({
  name: 'pdfViewer',
  initialState,
  reducers: {
    openPdf: (state, action: PayloadAction<{ fileUrl: string; fileName?: string | null }>) => {
      state.isOpen = true;
      state.fileUrl = action.payload.fileUrl;
      state.fileName = action.payload.fileName || null;
    },
    closePdf: (state) => {
      state.isOpen = false;
      state.fileUrl = null;
      state.fileName = null;
    },
  },
});

export const { openPdf, closePdf } = pdfViewerSlice.actions;
export default pdfViewerSlice.reducer;
