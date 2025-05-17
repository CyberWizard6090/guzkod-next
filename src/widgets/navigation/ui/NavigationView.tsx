'use client';
import { useDeviceDetect } from 'shared/lib/hooks/useDeviceDetect';
import { TreeItem } from './TreeItem';
import { Separator } from './Separator';
import { NavigationItem } from '../types';
import { Item } from './Item';
import { MobileMenu } from './MobileMenu';
import './sidebar.scss';
import { DEVICE_BREAKPOINTS } from 'shared/consts/device-breakpoints.constants';

type Props = {
  items: NavigationItem[];
};

export const NavigationView = ({ items }: Props) => {
  const { isMobile } = useDeviceDetect(DEVICE_BREAKPOINTS.MOBILE);

  const renderItem = (item: NavigationItem, index: number) => {
    if (item.blockType == 'navitem') {
      return <Item key={index} label={item.label} link={item.link || '#'} />;
    }
    if (item.blockType == 'navseparator') {
      return <Separator key={index} label={item.label} />;
    }
    if (item.blockType == 'navdropdown') {
      return <TreeItem key={index} list={item.list} label={item.label} />;
    }
  };

  const Navigate = () => {
    return (
      <nav className="navigation__content" role="navigation" aria-label="Основное меню">
        <ul className="navigation__list">{items.map(renderItem)}</ul>
      </nav>
    );
  };

  return (
    <>
      {isMobile ? (
        <MobileMenu>
          <Navigate />
        </MobileMenu>
      ) : (
        <aside className={'navigation'}>
          <Navigate />
        </aside>
      )}
    </>
  );
};
