import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from 'features/notifications/model/notificationSlice';
import accessibilityModeReducer from 'entities/accessibility-mode/model/slice';
import imageViewerReducer from 'features/image-viewer/model/imageViewerSlice ';
import pdfViewerReducer from 'features/pdf-viewer/model/slice';

export const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    accessibilityMode: accessibilityModeReducer,
    imageViewer: imageViewerReducer,
    pdfViewer: pdfViewerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
