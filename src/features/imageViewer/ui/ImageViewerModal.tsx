'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ImageViewerModal.scss';
import { RootState } from 'app/stores';
import { useDisableScroll } from 'shared/lib/hooks/useDisableScroll';

import ZoomIn from 'shared/assets/svg/bootstrap-icons-1.11.2/zoom-in.svg';
import ZoomOut from 'shared/assets/svg/bootstrap-icons-1.11.2/zoom-out.svg';
import Cross from 'shared/assets/svg/bootstrap-icons-1.11.2/x.svg';
import Reset from 'shared/assets/svg/bootstrap-icons-1.11.2/arrow-counterclockwise.svg';
import ChevronLeft from 'shared/assets/svg/bootstrap-icons-1.11.2/chevron-left.svg';
import ChevronRight from 'shared/assets/svg/bootstrap-icons-1.11.2/chevron-right.svg';
import { closeImage, setCurrentIndex } from '../model/imageViewerSlice ';
import ImageViewerIconButton from './ImageViewerIconButton';

export const ImageViewerModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, images, currentIndex } = useSelector((state: RootState) => state.imageViewer);
  const imageUrl = images.length > 0 ? images[currentIndex] : null;
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });
  useDisableScroll(!(!isOpen || !imageUrl));
  // Сбрасываем состояние при закрытии
  useEffect(() => {
    if (!isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  // Закрытие на Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(closeImage());
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  // Сброс позиции при масштабе 1
  useEffect(() => {
    if (scale === 1) setPosition({ x: 0, y: 0 });
  }, [scale]);

  useEffect(() => {
    const handleKeyDown = (e: { key: string }) => {
      if (!showNavigation) return;

      if (e.key === 'ArrowLeft') {
        dispatch(setCurrentIndex((currentIndex - 1 + images.length) % images.length));
      } else if (e.key === 'ArrowRight') {
        dispatch(setCurrentIndex((currentIndex + 1) % images.length));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]);

  // Обработчик колесика для увеличения
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
    setScale(Math.min(Math.max(0.5, newScale), 3));
  };

  const startScale = useRef(1);
  const touchStartPos = useRef({ x: 0, y: 0 });

  // Обработчики для мыши
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    startPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    e.preventDefault();
    const newX = e.clientX - startPos.current.x;
    const newY = e.clientY - startPos.current.y;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Обработчики для сенсорных устройств
  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale <= 1) return;

    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      touchStartPos.current = {
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      };
    } else if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
      startPos.current = { x: distance, y: 0 };
      startScale.current = scale;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (scale <= 1) return;
    e.preventDefault();

    // Обработка перемещения
    if (e.touches.length === 1 && isDragging) {
      const touch = e.touches[0];
      const newX = touch.clientX - touchStartPos.current.x;
      const newY = touch.clientY - touchStartPos.current.y;
      setPosition({ x: newX, y: newY });
    }

    // Обработка масштабирования
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
      const newScale = (startScale.current * distance) / startPos.current.x;
      setScale(Math.min(Math.max(0.5, newScale), 3));
      startPos.current.x = distance;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handlePrev = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    dispatch(setCurrentIndex((currentIndex - 1 + images.length) % images.length));
  };

  const handleNext = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    dispatch(setCurrentIndex((currentIndex + 1) % images.length));
  };

  if (!isOpen || !imageUrl) return null;
  const showNavigation = images.length > 1;
  return (
    <div className="image-viewer-modal">
      {showNavigation && (
        <div className="image-viewer__navigation">
          <ImageViewerIconButton onClick={handlePrev} Icon={ChevronLeft} />
          <ImageViewerIconButton onClick={handleNext} Icon={ChevronRight} />
        </div>
      )}

      <div className="image-viewer__controls">
        <div className="image-viewer__zoom-group">
          <ImageViewerIconButton
            onClick={(e) => {
              e.stopPropagation();
              setScale(Math.min(scale + 0.5, 3));
            }}
            Icon={ZoomIn}
          />

          <ImageViewerIconButton
            onClick={(e) => {
              e.stopPropagation();
              setScale(Math.max(scale - 0.5, 0.5));
            }}
            Icon={ZoomOut}
          />

          <ImageViewerIconButton
            onClick={(e) => {
              e.stopPropagation();
              setScale(1);
              setPosition({ x: 0, y: 0 });
            }}
            Icon={Reset}
          >
            Сбросить
          </ImageViewerIconButton>
        </div>

        <ImageViewerIconButton
          className="close-button"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(closeImage());
          }}
          Icon={Cross}
        />
      </div>
      <div className="image-viewer-content">
        <img
          src={imageUrl}
          alt="Full size"
          className="image-viewer-image"
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
          }}
          onClick={(e) => e.stopPropagation()}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>

      {showNavigation && (
        <div className="image-viewer-thumbnails">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx}`}
              className={`thumbnail ${idx === currentIndex ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setCurrentIndex(idx));
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
