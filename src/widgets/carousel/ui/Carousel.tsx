'use client';
import React, { useState, useEffect, useRef } from 'react';
import Left from 'shared/assets/svg/bootstrap-icons-1.11.2/arrow-left-short.svg';
import Right from 'shared/assets/svg/bootstrap-icons-1.11.2/arrow-right-short.svg';
import { IconButton } from 'shared/ui/button';
import styles from './Carousel.module.scss';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  interval?: number;
  enableDragging?: boolean;
};

export const Carousel = ({ children, interval = 30000, enableDragging = true }: Props) => {
  const items = React.Children.toArray(children);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, [currentIndex]);

  const startAutoSlide = () => {
    stopAutoSlide();
    timeoutRef.current = setInterval(() => handleNext(), interval);
  };

  const stopAutoSlide = () => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));

  const handleNext = () => setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));

  const handleDragStart = (pos: number) => {
    if (!enableDragging) return;
    setStartPosition(pos);
    setIsDragging(true);
    stopAutoSlide();
  };

  const handleDragEnd = (pos: number) => {
    if (!enableDragging || startPosition === null) return;
    const distance = pos - startPosition;
    if (distance > 50) handlePrev();
    if (distance < -50) handleNext();
    setIsDragging(false);
    setStartPosition(null);
    startAutoSlide();
  };

  const handleMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const handleMouseUp = (e: React.MouseEvent) => handleDragEnd(e.clientX);
  const handleMouseMove = (e: React.MouseEvent) => isDragging && e.preventDefault();
  const handleTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => handleDragEnd(e.changedTouches[0].clientX);

  const getVisibleSlides = () => {
    const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;

    return items.map((item, i) => {
      if (i === currentIndex || i === prevIndex || i === nextIndex) return item;
      return null; // остальное не рендерим
    });
  };

  return (
    <div
      className={styles.carousel}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => isDragging && setIsDragging(false)}
      onTouchMove={(e) => isDragging && e.preventDefault()}
    >
      <div className={styles.carousel__container}>
        <IconButton
          Icon={Left}
          variant="circle"
          className={styles['carousel__button--left']}
          onClick={handlePrev}
        />
        <IconButton
          Icon={Right}
          variant="circle"
          className={styles['carousel__button--right']}
          onClick={handleNext}
        />
        <div
          className={styles.carousel__track}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onMouseDown={enableDragging ? handleMouseDown : undefined}
          onTouchStart={enableDragging ? handleTouchStart : undefined}
          onTouchEnd={enableDragging ? handleTouchEnd : undefined}
        >
          {getVisibleSlides().map((item, index) => (
            <div key={index} className={styles.carousel__slide}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className={styles['carousel__bottom-bar']}>
        <div className={styles.carousel__count} aria-live="polite">
          <span className={styles['carousel__count-current']}>{currentIndex + 1}</span>
          <span> / </span>
          <span>{items.length}</span>
        </div>
        <div className={styles.carousel__dots}>
          {items.map((_, index) => (
            <button
              key={index}
              className={`${styles.carousel__dot} ${
                index === currentIndex ? styles['carousel__dot--active'] : ''
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
