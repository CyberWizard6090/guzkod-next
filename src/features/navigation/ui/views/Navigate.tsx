'use client';
import { useRef, useState, useEffect } from 'react';
import { Item, Separator, TreeItem } from '../components';
import { NavigateProps } from 'features/navigation/model/types/navigation';

export const Navigate = ({ items }: NavigateProps) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const checkScroll = () => {
      setHasScroll(el.scrollHeight > el.clientHeight);
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
        {items.map((item) => {
          if (item.blockType === 'navitem') {
            return <Item key={item.id} label={item.label} url={item.url!} />;
          }
          if (item.blockType === 'navseparator') {
            return <Separator key={item.id} label={item.label} />;
          }
          if (item.blockType === 'navdropdown') {
            return <TreeItem key={item.id} label={item.label} children={item.children!} />;
          }
        })}
      </ul>
    </nav>
  );
};
