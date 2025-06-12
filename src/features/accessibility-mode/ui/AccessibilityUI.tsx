'use client';
import { useDispatch, useSelector } from 'react-redux';
import './Style.scss';
import { Button } from 'shared/ui/button';
import { RootState } from 'app/stores';
import { SelectState } from '../model/selectors';
import { FontSize, setFontSize, toggleMode } from '../model/accessibilityModeSlice';

import { setTheme, Theme } from 'features/theme/model/themeSlice';
import FontSizeSelector from './selector/FontSizeSelector';
import ThemeSelector from './selector/ThemeSelector';
import './selector/accessibility.scss';

export const AccessibilityUI = () => {
  const dispatch = useDispatch();
  const handleToggleMode = () => dispatch(toggleMode());
  const active = useSelector((state: RootState) => SelectState(state));
  const fontSize = useSelector((state: RootState) => state.accessibilityMode.fontSize);
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleRadioChangeFont = (value: string) => {
    if (['small', 'medium', 'large', 'x-large', 'xx-large'].includes(value)) {
      dispatch(setFontSize(value as FontSize)); // Преобразуем тип к FontSize
    } else {
      console.error('Некорректное значение размера шрифта:', value);
    }
  };

  const handleRadioChangeTheme = (value: string) => {
    if (
      [
        'light',
        'dark',
        'black-white',
        'white-black',
        'brown-beige',
        'dark-blue-sky',
        'green-brown',
      ].includes(value)
    ) {
      dispatch(setTheme(value as Theme)); // Преобразуем тип к Theme
    } else {
      console.error('Некорректное значение размера шрифта:', value);
    }
  };
  if (!active) return null;

  return (
    <div className="AccessibilityUI">
      <div className="AccessibilityUI__block-wrap">
        <FontSizeSelector value={fontSize} onChange={handleRadioChangeFont} />
        <ThemeSelector value={theme} onChange={handleRadioChangeTheme} />
      </div>
      <div>
        <Button className="AccessibilityUI__button-exit" onClick={handleToggleMode}>
          Обычный режим
        </Button>
      </div>
    </div>
  );
};
