import { useEffect, useRef, useState } from 'react';
import { Item, Separator, TreeItem } from 'features/navigation/ui/components';
import { NavigationItem } from 'features/navigation/model/types/navigation';

const renderItem = (item: NavigationItem, index: number) => {
  if (item.blockType == 'navitem') {
    return <Item key={index} label={item.label} link={item.link || '#'} />;
  }
  if (item.blockType == 'navseparator') {
    return <Separator key={index} label={item.label} id={item.id} blockType={'navseparator'} />;
  }
  if (item.blockType == 'navdropdown') {
    return (
      <TreeItem
        key={index}
        list={item.list}
        label={item.label}
        id={item.id}
        blockType={'navdropdown'}
      />
    );
  }
};

type Props = {
  items: NavigationItem[];
};
export const Navigate = ({ items }: Props) => {
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
