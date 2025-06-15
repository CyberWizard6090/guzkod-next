import './ImageViewerIconButton.scss';

type ImageViewerIconButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  Icon?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
};

const ImageViewerIconButton = ({
  onClick,
  Icon,
  children,
  className = '',
}: ImageViewerIconButtonProps) => {
  return (
    <button onClick={onClick} className={`image-viewer-icon-button ${className}`}>
      {Icon && <Icon />}
      {children && <span style={{ marginLeft: Icon ? 6 : 0 }}>{children}</span>}
    </button>
  );
};

export default ImageViewerIconButton;
