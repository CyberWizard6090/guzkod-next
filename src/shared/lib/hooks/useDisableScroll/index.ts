import { useEffect } from 'react';

export const useDisableScroll = () => {
  useEffect(() => {
    const originalOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = originalOverflow;
    };
  }, []);
};
