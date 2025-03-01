import { useDispatch, useSelector } from 'react-redux';
import './Style.scss';
import { Button } from 'shared/ui/button';
import { RootState } from 'app/stores';
import { SelectState } from '../model/selectors';
import { FontSize, setFontSize, toggleMode } from '../model/accessibilityModeSlice';
import { RadioGroup } from 'shared/ui/radioGroup';
import { setTheme, Theme } from 'features/theme/model/themeSlice';

export const AccessibilityUI = () => {
  const dispatch = useDispatch();
  const handleToggleMode = () => dispatch(toggleMode());
  const active = useSelector((state: RootState) => SelectState(state));

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
  if (active) {
    return (
      <div className="AccessibilityUI">
        <div className="AccessibilityUI__block-wrap">
          <RadioGroup
            name="fontSize"
            options={[
              { label: 'Маленький', value: 'small' },
              { label: 'Средний', value: 'medium' },
              { label: 'Большой', value: 'large' },
              { label: 'Очень большой', value: 'x-large' },
            ]}
            onChange={handleRadioChangeFont}
          />

          <RadioGroup
            name="theme"
            options={[
              { label: 'Черно-белый', value: 'black-white' },
              { label: 'Коричневый на бежевом', value: 'brown-beige' },
              { label: 'Темно-синий на голубом', value: 'dark-blue-sky' },
              { label: 'Зеленый на темно-коричневом', value: 'green-brown' },
              { label: 'Бело-черный', value: 'white-black' },
            ]}
            onChange={handleRadioChangeTheme}
          />
          {/* <Toggle /> */}
        </div>
        <Button className="btn__exit" onClick={handleToggleMode}>
          Обычный режим
        </Button>
      </div>
    );
  } else {
    return <></>;
  }
};
