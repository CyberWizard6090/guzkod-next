import { useEffect } from 'react';

export const useDisableScroll = (isDisabled: boolean) => {
  useEffect(() => {
    if (isDisabled) {
      const originalOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.documentElement.style.overflow = originalOverflow;
      };
    }
  }, [isDisabled]);
};
