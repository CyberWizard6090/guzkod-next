'use client';
import { useDispatch, useSelector } from 'react-redux';
import './Style.scss';
import { Button, IconButton } from 'shared/ui/button';
import { RootState } from 'shared/stores';
import { SelectIsModalOpen } from '../model/selectors';

import { setModalOpen, setMode } from '../model/accessibilityModeSlice';
import { FontSize, setFontSize } from '../model/accessibilityModeSlice';

import { setTheme, Theme } from 'features/theme/model/themeSlice';
import FontSizeSelector from './selector/FontSizeSelector';
import ThemeSelector from './selector/ThemeSelector';
import './selector/accessibility.scss';
import Cross from 'shared/assets/svg/bootstrap-icons-1.11.2/x.svg';
import { useDisableScroll } from 'shared/lib/hooks/useDisableScroll';

export const AccessibilityUI = () => {
  const dispatch = useDispatch();
  const handleToggleMode = () => dispatch(setMode(false));
  const fontSize = useSelector((state: RootState) => state.accessibilityMode.fontSize);
  const theme = useSelector((state: RootState) => state.theme.theme);

  const isModalOpen = useSelector(SelectIsModalOpen);

  const handleCloseModal = () => {
    dispatch(setModalOpen(false));
  };
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
  useDisableScroll(isModalOpen);
  if (!isModalOpen) return null;

  return (
    <div className="accessibility-modal">
      <dialog className="accessibility-modal__dialog">
        <div className="accessibility-modal__header">
          <h2 className="accessibility-modal__title">Настройки доступности</h2>
          <IconButton
            className="accessibility-modal__button-close"
            onClick={handleCloseModal}
            Icon={Cross}
          />
        </div>
        <div className="accessibility-modal__controls">
          <FontSizeSelector value={fontSize} onChange={handleRadioChangeFont} />
          <ThemeSelector value={theme} onChange={handleRadioChangeTheme} />
        </div>
        <div className="accessibility-modal__footer">
          <Button className="accessibility-modal__button-exit" onClick={handleToggleMode}>
            Обычный режим
          </Button>
        </div>
      </dialog>
    </div>
  );
};
