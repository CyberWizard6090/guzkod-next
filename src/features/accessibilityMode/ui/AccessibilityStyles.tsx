import { RootState } from 'app/stores';
import { setTheme, Theme } from 'features/theme/model/themeSlice';
import { useLayoutEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

export const AccessibilityStyles = () => {
  const { isActive, fontSize, imagesHidden } = useSelector(
    (state: RootState) => state.accessibilityMode,
  );
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (isActive) {
      document.documentElement.setAttribute('data-fontsize', fontSize);
      if (localStorage.getItem('AccessibilityTheme')) {
        dispatch(setTheme(localStorage.getItem('AccessibilityTheme') as Theme));
      } else if (localStorage.getItem('theme')) {
        dispatch(setTheme(localStorage.getItem('theme') as Theme));
      } else {
        dispatch(setTheme('light'));
      }
    } else {
      document.documentElement.removeAttribute('data-fontsize');
      if (localStorage.getItem('theme')) {
        dispatch(setTheme(localStorage.getItem('theme') as Theme));
      } else {
        dispatch(setTheme('light'));
      }
    }
  }, [isActive, fontSize, imagesHidden]);

  return null;
};
