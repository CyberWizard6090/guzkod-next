'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ImageViewerModal.scss';

import { useDisableScroll } from 'shared/lib/hooks/useDisableScroll';

import ZoomIn from 'shared/assets/svg/bootstrap-icons-1.11.2/zoom-in.svg';
import ZoomOut from 'shared/assets/svg/bootstrap-icons-1.11.2/zoom-out.svg';
import Cross from 'shared/assets/svg/bootstrap-icons-1.11.2/x.svg';
import Reset from 'shared/assets/svg/bootstrap-icons-1.11.2/arrow-counterclockwise.svg';
import ChevronLeft from 'shared/assets/svg/bootstrap-icons-1.11.2/chevron-left.svg';
import ChevronRight from 'shared/assets/svg/bootstrap-icons-1.11.2/chevron-right.svg';

import { closeImage, setCurrentIndex } from '../model/imageViewerSlice ';
import ImageViewerIconButton from './ImageViewerIconButton';
import { RootState } from 'shared/stores';

export const ImageViewerModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, images, currentIndex } = useSelector((state: RootState) => state.imageViewer);
  const imageUrl = images.length > 0 ? images[currentIndex] : null;
  const showNavigation = images.length > 1;

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const startDrag = useRef({ x: 0, y: 0 });
  const startTouchDistance = useRef<number | null>(null);
  const startScale = useRef(1);

  useDisableScroll(!(!isOpen || !imageUrl));

  const resetTransform = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (!isOpen) resetTransform();
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(closeImage());
      if (!showNavigation) return;

      if (e.key === 'ArrowLeft') {
        resetTransform();
        dispatch(setCurrentIndex((currentIndex - 1 + images.length) % images.length));
      } else if (e.key === 'ArrowRight') {
        resetTransform();
        dispatch(setCurrentIndex((currentIndex + 1) % images.length));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch, currentIndex, images.length]);

  const handleWheel = (e: React.WheelEvent) => {
    // e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setScale((prev) => Math.min(Math.max(prev + delta, 1), 3));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale === 1) return;
    setIsDragging(true);
    startDrag.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale === 1) return;
    setPosition({
      x: e.clientX - startDrag.current.x,
      y: e.clientY - startDrag.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const getDistance = (touches: TouchList) => {
    const [a, b] = [touches[0], touches[1]];
    return Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      startDrag.current = {
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      };
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      startTouchDistance.current = getDistance(e.touches);
      startScale.current = scale;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      setPosition({
        x: e.touches[0].clientX - startDrag.current.x,
        y: e.touches[0].clientY - startDrag.current.y,
      });
    } else if (e.touches.length === 2 && startTouchDistance.current) {
      const newDistance = getDistance(e.touches);
      const newScale = (newDistance / startTouchDistance.current) * startScale.current;
      setScale(Math.min(Math.max(newScale, 1), 3));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    startTouchDistance.current = null;
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetTransform();
    dispatch(setCurrentIndex((currentIndex - 1 + images.length) % images.length));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetTransform();
    dispatch(setCurrentIndex((currentIndex + 1) % images.length));
  };

  if (!isOpen || !imageUrl) return null;

  return (
    <div className="image-viewer-modal">
      {showNavigation && (
        <div className="image-viewer-modal__navigation">
          <ImageViewerIconButton onClick={handlePrev} Icon={ChevronLeft} />
          <ImageViewerIconButton onClick={handleNext} Icon={ChevronRight} />
        </div>
      )}

      <div className="image-viewer-modal__controls">
        <div className="image-viewer-modal__counter">
          {showNavigation && (
            <span className="image-viewer-modal__counter-text">
              {currentIndex + 1} из {images.length}
            </span>
          )}
        </div>

        <div className="image-viewer-modal__zoom-group">
          <ImageViewerIconButton
            onClick={() => setScale((s) => Math.min(s + 0.2, 3))}
            Icon={ZoomIn}
          />
          <ImageViewerIconButton
            onClick={() => setScale((s) => Math.max(s - 0.2, 1))}
            Icon={ZoomOut}
          />
          <ImageViewerIconButton onClick={resetTransform} Icon={Reset}>
            Сбросить
          </ImageViewerIconButton>
        </div>

        <ImageViewerIconButton
          className="close-button"
          onClick={() => dispatch(closeImage())}
          Icon={Cross}
        />
      </div>

      <div
        className="image-viewer-modal__container"
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Zoomed"
          className={`image-viewer-modal__image${isDragging ? ' dragging' : ''}`}
          style={{
            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale})`,
            top: '50%',
            left: '50%',
          }}
          draggable={false}
        />
      </div>

      {showNavigation && (
        <div className="image-viewer-modal__thumbnails">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx}`}
              className={`thumbnail ${idx === currentIndex ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                resetTransform();
                dispatch(setCurrentIndex(idx));
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
