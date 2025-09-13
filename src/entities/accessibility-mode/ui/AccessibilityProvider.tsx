'use client';
import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'shared/stores/store';

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const a11y = useSelector((state: RootState) => state.accessibilityMode);

  useEffect(() => {
    const html = document.documentElement;
    const attrs: string[] = [];

    // ====== Шрифт и текст ======
    attrs.push(`fontsize-${a11y.fontSize}`);
    attrs.push(`fontfamily-${a11y.fontFamily}`);
    attrs.push(`letter-${a11y.letterSpacing}`); // normal / wide / wider
    attrs.push(`line-${a11y.lineHeight}`); // число
    attrs.push(`textwidth-${a11y.textWidth}`); // auto / narrow

    // ====== Цвет ======
    attrs.push(`scheme-${a11y.colorScheme}`); // default / dark / high-contrast

    // ====== Изображения ======
    if (!a11y.showImages) attrs.push('img-hide');
    attrs.push(`img-${a11y.imageMode}`); // normal / grayscale / high-contrast

    // ====== Интерфейс ======

    if (a11y.highlightFocus) attrs.push('focus-highlight');
    attrs.push(`cursor-${a11y.cursorSize}`); // small / medium / large
    attrs.push(`animations-${a11y.animations}`); // full / reduced / none

    html.setAttribute('data-accessibility', attrs.join(' '));

    // ====== Persist ======
    if (a11y.persist) {
      localStorage.setItem('a11y', JSON.stringify(a11y));
    }
  }, [a11y]);

  return <>{children}</>;
};
