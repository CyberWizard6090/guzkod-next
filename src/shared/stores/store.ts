import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from 'features/notifications/model/notificationSlice';
import themeReducer from 'features/theme/model/themeSlice';
import accessibilityModeReducer from 'features/accessibility-mode/model/accessibilityModeSlice';
import imageViewerReducer from 'features/image-viewer/model/imageViewerSlice ';
import pdfViewerReducer from 'features/pdf-viewer/model/slice';
import navigationReducer from 'features/navigation/model/slice/navigationSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    notifications: notificationReducer,
    accessibilityMode: accessibilityModeReducer,
    imageViewer: imageViewerReducer,
    pdfViewer: pdfViewerReducer,
    navigation: navigationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
