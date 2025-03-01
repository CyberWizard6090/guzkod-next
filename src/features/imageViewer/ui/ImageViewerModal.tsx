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

  // Обработчик колесика для увеличения
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
    setScale(Math.min(Math.max(0.5, newScale), 3));
  };

  // Начало перетаскивания
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      startPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  // Перемещение
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      setPosition((prev) => ({
        x: prev.x + (e.clientX - startPos.current.x),
        y: prev.y + (e.clientY - startPos.current.y),
      }));

      startPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

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
