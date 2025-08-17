import { useEffect } from 'react';

export const useDisableScroll = (isDisabled: boolean) => {
  useEffect(() => {
    if (isDisabled) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      const originalOverflow = document.documentElement.style.overflow;
      const originalPaddingRight = document.documentElement.style.paddingRight;

      document.documentElement.style.overflow = 'hidden';
      if (scrollBarWidth > 0) {
        document.documentElement.style.paddingRight = `${scrollBarWidth}px`;
      }

      return () => {
        document.documentElement.style.overflow = originalOverflow;
        document.documentElement.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isDisabled]);
};
