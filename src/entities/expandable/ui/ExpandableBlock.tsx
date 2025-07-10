'use client';

import { useState, ReactNode, useRef, useEffect } from 'react';
import './ExpandableBlock.scss';
import clsx from 'clsx';
import { Button } from 'shared/ui/button';

interface Props {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ExpandableBlock = ({ children, size = 'md', className }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggle = () => setExpanded((prev) => !prev);

  useEffect(() => {
    if (contentRef.current) {
      const el = contentRef.current;
      setCanExpand(el.scrollHeight > el.clientHeight);
    }
  }, [children]);

  return (
    <div className={clsx('expandable-block', className)}>
      <div
        ref={contentRef}
        className={clsx('expandable-block__content', `expandable-block__content--${size}`, {
          'expandable-block__content--collapsed': !expanded,
        })}
      >
        {children}
        {!expanded && <div className="expandable-block__fade" />}
      </div>

      {canExpand && (
        <Button variant="tertiary" onClick={toggle}>
          {expanded ? 'Скрыть' : 'Показать больше'}
        </Button>
      )}
    </div>
  );
};
