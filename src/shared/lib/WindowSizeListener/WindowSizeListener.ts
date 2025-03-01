import { useEffect, useState } from 'react';

export const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // Отслеживаем изменение размера экрана
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    // Удаляем обработчик при размонтировании
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile };
};
