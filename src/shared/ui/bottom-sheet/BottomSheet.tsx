'use client';

import { useEffect, useRef, useState } from 'react';
import { useDisableScroll } from 'shared/lib/hooks/useDisableScroll';
import IconCross from 'shared/assets/svg/bootstrap-icons-1.11.2/x.svg';
import cls from './BottomSheet.module.scss';

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  const startY = useRef<number | null>(null);
  const currentY = useRef<number>(0);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(false);
      setIsTransitionEnabled(false);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
          setIsTransitionEnabled(true);
        });
      });
    } else {
      setIsAnimating(false);
      setIsTransitionEnabled(true);

      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    setIsTransitionEnabled(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current !== null) {
      currentY.current = e.touches[0].clientY - startY.current;
      if (sheetRef.current && currentY.current > 0) {
        sheetRef.current.style.transform = `translateY(${currentY.current}px)`;
      }
    }
  };

  const handleTouchEnd = () => {
    const shouldClose = currentY.current > 100;

    if (sheetRef.current) {
      if (shouldClose) {
        sheetRef.current.style.transform = '';
        setIsTransitionEnabled(true);
        onClose();
      } else {
        sheetRef.current.style.transform = `translateY(0)`;
        setIsTransitionEnabled(true);

        const cleanup = () => {
          if (sheetRef.current) {
            sheetRef.current.style.transform = '';
            sheetRef.current.removeEventListener('transitionend', cleanup);
          }
        };
        sheetRef.current.addEventListener('transitionend', cleanup);
      }
    }

    startY.current = null;
    currentY.current = 0;
  };

  const handleClose = () => {
    setIsAnimating(false);
    setIsTransitionEnabled(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useDisableScroll(isOpen);

  if (!isVisible) return null;

  const containerClassNames = [
    cls['bottom-sheet__container'],
    isAnimating && cls['bottom-sheet__container--open'],
    isTransitionEnabled && cls['bottom-sheet__container--animated'],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls['bottom-sheet']}>
      <div className={cls['bottom-sheet__backdrop']} onClick={handleClose} />
      <div className={containerClassNames} ref={sheetRef} onTransitionEnd={handleTransitionEnd}>
        <div
          className={cls['bottom-sheet__handle']}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <span></span>
          <button className={cls['bottom-sheet__button-close']} onClick={handleClose}>
            <IconCross />
          </button>
        </div>
        <div className={cls['bottom-sheet__content']}>{children}</div>
      </div>
    </div>
  );
};
