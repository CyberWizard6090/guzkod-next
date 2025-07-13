'use client';

import { useDeviceDetect } from 'shared/lib/hooks/useDeviceDetect';
import { MobileMenu } from './MobileNavigation';
import { DEVICE_BREAKPOINTS } from 'shared/consts/device-breakpoints.constants';
import { NavigationItem } from '../../model/types/navigation';
import { Navigate } from './Navigate';
import { Loader } from 'shared/ui/loader';

import 'features/navigation/ui/styles/Navigation.scss';

type Props = {
  items: NavigationItem[];
  error: Error | null;
  loading: boolean;
};

export const NavigationView = ({ items, error, loading }: Props) => {
  const { isMobile } = useDeviceDetect(DEVICE_BREAKPOINTS.MOBILE);

  // Пока не определено — ничего не рендерим (чтобы избежать SSR/CSR несоответствия)
  if (typeof isMobile !== 'boolean') return null;

  const content = <Navigate items={items} />;

  return isMobile ? (
    <MobileMenu>{content}</MobileMenu>
  ) : (
    <aside className="navigation shadow__style">
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="navigation__error">Ошибка загрузки меню</div>
      ) : (
        content
      )}
    </aside>
  );
};
