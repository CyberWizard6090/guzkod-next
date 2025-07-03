'use client';
import { useDeviceDetect } from 'shared/lib/hooks/useDeviceDetect';
import { TreeItem } from './TreeItem';
import { Separator } from './Separator';
import { NavigationItem } from '../types';
import { Item } from './Item';
import { MobileMenu } from './MobileMenu';
import './sidebar.scss';
import { DEVICE_BREAKPOINTS } from 'shared/consts/device-breakpoints.constants';
import { useEffect, useRef, useState } from 'react';

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
  const listRef = useRef<HTMLUListElement | null>(null);
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const checkScroll = () => {
      const isScrollable = el.scrollHeight > el.clientHeight;
      setHasScroll(isScrollable);
    };

    checkScroll();

    const observer = new ResizeObserver(checkScroll);
    observer.observe(el);

    const mutationObserver = new MutationObserver(checkScroll);
    mutationObserver.observe(el, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <nav className="navigation__content" role="navigation" aria-label="Основное меню">
      <ul
        className={`navigation__list ${hasScroll ? 'navigation__list--padded' : ''}`}
        ref={listRef}
      >
        {items.map(renderItem)}
      </ul>
    </nav>
  );
};

  if (isMobile === undefined) return null;
  return !isMobile ? (
    <aside className={'navigation shadow__style'}>
      <Navigate />
    </aside>
  ) : (
    <MobileMenu>
      <Navigate />
    </MobileMenu>
  );
};
