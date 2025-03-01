import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from 'features/notifications/model/notificationSlice';
import themeReducer from 'features/theme/model/themeSlice';
import accessibilityModeReducer from 'features/accessibilityMode/model/accessibilityModeSlice';
import imageViewerReducer from 'features/imageViewer/model/imageViewerSlice ';
import searchReducer from 'features/search/model/searchSlice';
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    notifications: notificationReducer,
    accessibilityMode: accessibilityModeReducer,
    imageViewer: imageViewerReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
