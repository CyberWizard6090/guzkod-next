'use client';
import { useDeviceDetect } from 'shared/lib/hooks/useDeviceDetect';
import { MobileMenu } from './MobileNavigation';
import { DEVICE_BREAKPOINTS } from 'shared/consts/device-breakpoints.constants';

import { Navigate } from './Navigate';

import 'features/navigation/ui/styles/Navigation.scss';
import { NavigationItem } from 'features/navigation/model/types/navigation';

type Props = {
  items: NavigationItem[];
};

export const NavigationView = ({ items }: Props) => {
  const { isMobile } = useDeviceDetect(DEVICE_BREAKPOINTS.MOBILE);

  // Пока не определено — ничего не рендерим (чтобы избежать SSR/CSR несоответствия)
  if (typeof isMobile !== 'boolean') return null;

  const content = <Navigate items={items} />;

  return isMobile ? (
    <MobileMenu>{content}</MobileMenu>
  ) : (
    <aside className="navigation shadow">{content}</aside>
  );
};
