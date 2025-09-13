'use client';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'shared/ui/modal';
import { Button } from 'shared/ui/button';
import { RootState } from 'shared/stores/store';
import { useDisableScroll } from 'shared/lib/hooks/useDisableScroll';
import styles from './AccessibilityPanel.module.scss';

import {
  setFontSize,
  setFontFamily,
  setLetterSpacing,
  setLineHeight,
  setColorScheme,
  toggleShowImages,
  setImageMode,
  // toggleHighlightFocus,
  // setCursorSize,
  // setAnimations,
  resetSettings,
  setModalOpen,
} from 'entities/accessibility-mode/model/slice';

import { RadioGroup } from './components/RadioGroup';
import { buildRadioOptions } from './components/RadioOptionFactory';
import { Toggle } from 'shared/ui/toggle';

export const AccessibilityPanel = () => {
  const dispatch = useDispatch();
  const a11y = useSelector((state: RootState) => state.accessibilityMode);

  useDisableScroll(a11y.isModalOpen);

  if (!a11y.isModalOpen) return null;

  return (
    <Modal
      className={styles['accessibility-modal']}
      title="Настройки доступности"
      isOpen={a11y.isModalOpen}
      onClose={() => dispatch(setModalOpen(false))}
    >
      <div className={styles['accessibility-modal__controls']}>
        {/* ====== Размер шрифта ====== */}
        <RadioGroup
          label="Размер шрифта"
          name="fontSize"
          value={a11y.fontSize}
          options={buildRadioOptions('fontSize', [
            { label: 'Маленький', value: 'small' },
            { label: 'Нормальный', value: 'normal' },
            { label: 'Большой', value: 'large' },
            { label: 'Огромный', value: 'xl' },
            { label: 'XXL', value: 'xxl' },
          ])}
          onChange={(val) => dispatch(setFontSize(val as any))}
        />

        {/* ====== Семейство шрифтов ====== */}
        <RadioGroup
          label="Семейство шрифтов"
          name="fontFamily"
          value={a11y.fontFamily}
          options={buildRadioOptions('fontFamily', [
            { label: 'Georgia', value: 'font-serif' },
            { label: 'Arial', value: 'sans-serif' },
            { label: 'Monospace', value: 'font-mono' },
          ])}
          onChange={(val) => dispatch(setFontFamily(val as any))}
        />

        {/* ====== Межбуквенный интервал ====== */}
        <RadioGroup
          label="Межбуквенный интервал"
          name="letterSpacing"
          value={a11y.letterSpacing}
          options={buildRadioOptions('letterSpacing', [
            { label: 'нормальный', value: 'normal' },
            { label: 'широкий', value: 'wide' },
            { label: 'очень широкий', value: 'wider' },
          ])}
          onChange={(val) => dispatch(setLetterSpacing(val as any))}
        />

        {/* ====== Межстрочный интервал ====== */}
        <RadioGroup
          label="Межстрочный интервал"
          name="lineHeight"
          value={String(a11y.lineHeight)}
          options={buildRadioOptions('lineHeight', [
            { label: 'нормальный', value: 'normal' },
            { label: '1.5', value: '1.5' },
            { label: '2', value: '2' },
            { label: '2.5', value: '2.5' },
          ])}
          onChange={(val) => dispatch(setLineHeight(val as any))}
        />

        {/* ====== Цветовая схема ====== */}
        <RadioGroup
          label="Цветовая схема"
          name="colorScheme"
          value={a11y.colorScheme}
          options={buildRadioOptions('colorScheme', [
            { label: 'Светлая', value: 'light' },
            { label: 'Тёмная', value: 'dark' },
            { label: 'Ч/Б', value: 'black-white' },
            { label: 'Белая-чёрная', value: 'white-black' },
            { label: 'Коричнево-бежевая', value: 'brown-beige' },
            { label: 'Тёмно-синяя-голубая', value: 'dark-blue-sky' },
            { label: 'Зелёно-коричневая', value: 'green-brown' },
          ])}
          onChange={(val) => dispatch(setColorScheme(val as any))}
        />

        {/* ====== Изображения ====== */}
        <label>Показ изображений</label>
        <Toggle checked={a11y.showImages} onChange={() => dispatch(toggleShowImages())} />

        <RadioGroup
          label="Режим изображений"
          name="imageMode"
          value={a11y.imageMode}
          options={buildRadioOptions('imageMode', [
            { label: 'Нормальное', value: 'normal' },
            { label: 'Черно-белое', value: 'grayscale' },
            { label: 'Контраст', value: 'high-contrast' },
          ])}
          onChange={(val) => dispatch(setImageMode(val as any))}
        />

        {/* ====== Интерфейс ====== */}
        {/* <label>Подсветка фокуса</label>
        <Toggle checked={a11y.highlightFocus} onChange={() => dispatch(toggleHighlightFocus())} />

        <RadioGroup
          label="Размер курсора"
          name="cursorSize"
          value={a11y.cursorSize}
          options={buildRadioOptions('cursorSize', [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ])}
          onChange={(val) => dispatch(setCursorSize(val as any))}
        /> */}

        {/* ====== Анимации ====== */}
        {/* <RadioGroup
          label="Анимации"
          name="animations"
          value={a11y.animations}
          options={buildRadioOptions('animations', [
            { label: 'Full', value: 'full' },
            { label: 'Reduced', value: 'reduced' },
            { label: 'None', value: 'none' },
          ])}
          onChange={(val) => dispatch(setAnimations(val as any))}
        /> */}
      </div>

      <div className={styles['accessibility-modal__footer']}>
        <Button
          className={styles['accessibility-modal__button']}
          onClick={() => dispatch(resetSettings())}
        >
          Сброс к стандартным
        </Button>
      </div>
    </Modal>
  );
};
