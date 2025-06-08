// components/ImageViewerIconButton.tsx
import React from 'react';
import './ImageViewerIconButton.scss';

interface ImageViewerIconButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  Icon?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
}

const ImageViewerIconButton: React.FC<ImageViewerIconButtonProps> = ({
  onClick,
  Icon,
  children,
  className = '',
}) => {
  return (
    <button onClick={onClick} className={`image-viewer-icon-button ${className}`}>
      {Icon && <Icon />}
      {children && <span style={{ marginLeft: Icon ? 6 : 0 }}>{children}</span>}
    </button>
  );
};

export default ImageViewerIconButton;
