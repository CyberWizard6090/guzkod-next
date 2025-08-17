'use client';
import { useEffect, useState } from 'react';

/**
 * Безопасная проверка matchMedia с поддержкой SSR.
 * Возвращает undefined до монтирования, чтобы избежать мерцаний.
 */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, [query]);

  return matches;
};
