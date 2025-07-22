'use client';
import { Button } from 'shared/ui/button';
import IconSearch from 'shared/assets/svg/bootstrap-icons-1.11.2/search.svg';
import Link from 'next/link';
import { useDeviceDetect } from 'shared/lib/hooks/useDeviceDetect';
import { DEVICE_BREAKPOINTS } from 'shared/consts/device-breakpoints.constants';

export const ButtonSearch = () => {
  const { isMobile } = useDeviceDetect(DEVICE_BREAKPOINTS.MOBILE);
  if (isMobile) return null; // Не рендерим кнопку на десктопе
  return (
    <Link href="/search">
      <Button Icon={IconSearch} variant={'tertiary'}>
        Поиск
      </Button>
    </Link>
  );
};
