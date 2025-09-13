export interface AccessibilityState {
  // Текст
  fontSize: 'small' | 'normal' | 'large' | 'xlarge';
  fontFamily: 'serif' | 'sans' | 'mono';
  letterSpacing: 'normal' | 'wide' | 'wider';
  lineHeight: number; // например 1–3 (ползунок)
  textWidth: 'auto' | 'narrow';

  // Цвет
  colorScheme:
    | 'light'
    | 'dark'
    | 'black-white'
    | 'white-black'
    | 'brown-beige'
    | 'dark-blue-sky'
    | 'green-brown';

  // Изображения
  showImages: boolean;
  imageMode: 'normal' | 'grayscale' | 'high-contrast';

  // Интерфейс

  highlightFocus: boolean;
  cursorSize: 'small' | 'medium' | 'large';
  animations: 'full' | 'reduced' | 'none';

  // Системные
  persist: boolean; // сохранять настройки

  isModeActive: boolean;
  isModalOpen: boolean;
}
