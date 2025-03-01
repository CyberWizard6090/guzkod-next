import { useEffect } from 'react';

type HotkeyHandler = () => void;

export function useHotkey(keys: string[], handler: HotkeyHandler) {
  useEffect(() => {
    const pressedKeys = new Set<string>();

    const downHandler = (event: KeyboardEvent) => {
      pressedKeys.add(event.key.toLowerCase());

      // Проверяем, совпадают ли все клавиши из комбинации
      if (keys.every((key) => pressedKeys.has(key.toLowerCase()))) {
        handler();
      }
    };

    const upHandler = (event: KeyboardEvent) => {
      pressedKeys.delete(event.key.toLowerCase());
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [keys, handler]);
}
