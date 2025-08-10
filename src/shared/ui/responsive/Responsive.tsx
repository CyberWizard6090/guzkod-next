'use client';
import { ReactNode } from 'react';
import { useMediaQuery } from './useMediaQuery';

type Mode = 'only' | 'except';

interface Props {
  children: ReactNode;
  breakpoint: number; // px
  desktop?: boolean; // true = проверка >= breakpoint, false = проверка < breakpoint
  mode?: Mode; // only = показывать только, except = скрывать только
}

/**
 * Универсальный компонент для отображения по breakpoint
 * - desktop=true + mode="only" => видно только на ПК
 * - desktop=false + mode="only" => видно только на мобилке
 * - desktop=true + mode="except" => скрыто на ПК
 * - desktop=false + mode="except" => скрыто на мобилке
 */
export const Responsive = ({ children, breakpoint, desktop = true, mode = 'only' }: Props) => {
  const matches = useMediaQuery(
    desktop ? `(min-width: ${breakpoint}px)` : `(max-width: ${breakpoint - 1}px)`,
  );

  if (matches && mode === 'only') return <>{children}</>;
  if (!matches && mode === 'except') return <>{children}</>;

  return null;
};
