import { useEffect } from 'react';

/**
 * Хук для установки заголовка страницы с восстановлением оригинального при размонтировании
 * @param title Новый заголовок
 */
export const useDocumentTitle = (title: string): void => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};
