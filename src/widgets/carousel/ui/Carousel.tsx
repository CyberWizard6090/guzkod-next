'use client';
import React, { useState, useEffect, useRef } from 'react';
import './Carousel.scss';

import Left from 'shared/assets/svg/bootstrap-icons-1.11.2/arrow-left-short.svg';
import Right from 'shared/assets/svg/bootstrap-icons-1.11.2/arrow-right-short.svg';
import { IconButton } from 'shared/ui/button';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  interval?: number; // Интервал времени для автоматической смены (в мс)
  enableDragging?: boolean; // Включение/отключение функции перетаскивания
};

export const Carousel = ({ children, interval = 30000, enableDragging = true }: Props) => {
  const items = React.Children.toArray(children); // Поддержка единственного элемента
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState<number | null>(null);
  // Автоматическая смена слайдов
  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const startAutoSlide = () => {
    stopAutoSlide();
    timeoutRef.current = setInterval(() => {
      handleNext();
    }, interval);
  };

  const stopAutoSlide = () => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };
  const handleDragStart = (position: number) => {
    if (!enableDragging) return; // Проверяем, включено ли перетаскивание
    setStartPosition(position);
    setIsDragging(true);
    stopAutoSlide();
  };

  const handleDragEnd = (endPosition: number) => {
    if (!enableDragging || startPosition === null) return; // Проверяем, включено ли перетаскивание
    const distance = endPosition - startPosition;

    if (distance > 50) {
      handlePrev();
    } else if (distance < -50) {
      handleNext();
    }

    setIsDragging(false);
    setStartPosition(null);
    startAutoSlide();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    handleDragEnd(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    handleDragEnd(e.changedTouches[0].clientX);
  };
  return (
    <div
      className="carousel shadow__style"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => isDragging && setIsDragging(false)}
      onTouchMove={(e) => isDragging && e.preventDefault()}
    >
      <div
        className="carousel-track"
        onMouseDown={enableDragging ? handleMouseDown : undefined}
        onTouchStart={enableDragging ? handleTouchStart : undefined}
        onTouchEnd={enableDragging ? handleTouchEnd : undefined}
      >
        {items.map((item, index) => (
          <div key={index} className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}>
            {item}
          </div>
        ))}
      </div>
      <div className="carousel__bottom-bar">
        <div className="carousel__count" aria-live="polite">
          <span>{currentIndex + 1}</span>
          <span> / </span>
          <span>{items.length}</span>
        </div>

        <div className="button__group">
          <IconButton Icon={Left} variant={'primary'} onClick={handlePrev} />
          <IconButton Icon={Right} variant={'primary'} onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};
