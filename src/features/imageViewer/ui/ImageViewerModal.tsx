import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ImageViewerModal.scss';
import { RootState } from 'app/stores';
import { useDisableScroll } from 'shared/lib/hooks/useDisableScroll';

import { Button } from 'shared/ui/button';
import { ReactComponent as ZoomIn } from 'shared/assets/svg/bootstrap-icons-1.11.2/zoom-in.svg';
import { ReactComponent as ZoomOut } from 'shared/assets/svg/bootstrap-icons-1.11.2/zoom-out.svg';
import { ReactComponent as Cross } from 'shared/assets/svg/bootstrap-icons-1.11.2/x.svg';
import { ReactComponent as Reset } from 'shared/assets/svg/bootstrap-icons-1.11.2/arrow-counterclockwise.svg';
import { IconButton } from 'shared/ui/iconButton';
import { closeImage } from '../model/imageViewerSlice ';

export const ImageViewerModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, imageUrl } = useSelector((state: RootState) => state.imageViewer);

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });
  const lastTouchDistance = useRef(0);

  useEffect(() => {
    if (!isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(closeImage());
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  useEffect(() => {
    if (scale === 1) setPosition({ x: 0, y: 0 });
  }, [scale]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
    setScale(Math.min(Math.max(0.5, newScale), 3));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      startPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition((prev) => ({
        x: prev.x + (e.clientX - startPos.current.x),
        y: prev.y + (e.clientY - startPos.current.y),
      }));
      startPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2) {
      lastTouchDistance.current = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && scale > 1) {
      setPosition((prev) => ({
        x: prev.x + (e.touches[0].clientX - startPos.current.x),
        y: prev.y + (e.touches[0].clientY - startPos.current.y),
      }));
      startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2) {
      const newDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      const scaleChange = newDistance / lastTouchDistance.current;
      setScale((prev) => Math.min(Math.max(0.5, prev * scaleChange), 3));
      lastTouchDistance.current = newDistance;
    }
  };
  useDisableScroll();
  if (!isOpen || !imageUrl) return null;

  return (
    <div className="image-viewer-modal">
      <div className="image-viewer__controls">
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setScale(Math.min(scale + 0.5, 3));
          }}
          Icon={ZoomIn}
        />
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setScale(Math.max(scale - 0.5, 0.5));
          }}
          Icon={ZoomOut}
        />
        <Button
          Icon={Reset}
          onClick={(e) => {
            e.stopPropagation();
            setScale(1);
            setPosition({ x: 0, y: 0 });
          }}
        >
          Сбросить
        </Button>
        <IconButton
          className="close-button"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(closeImage());
          }}
          Icon={Cross}
        />
      </div>
      <div
        className="image-viewer-content"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <img
          src={imageUrl}
          alt="Full size"
          className="image-viewer-image"
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
          }}
        />
      </div>
    </div>
  );
};
