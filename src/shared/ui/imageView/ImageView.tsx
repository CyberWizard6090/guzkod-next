import { useEffect, useState } from 'react';
import './ImageView.scss';
// import { useFullScreen } from "features/FullScreenView";
import { Loader } from '../loader';
import { useDispatch } from 'react-redux';
import { handleImageClick } from 'features/imageViewer';

type Props = {
  url: string;
  alt?: string;
  className?: string;
  loading?: 'eager' | 'lazy' | undefined;
};

export const ImageView = ({ url, alt, className, loading = undefined }: Props) => {
  // const { toggleState,setChildren } = useFullScreen();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => setIsLoading(false);
  }, [url]);

  const ImgLoad = () => {
    return (
      <img
        src={url}
        className={'image-view__image ' + className}
        onClick={() => handleImageClick(url, dispatch)}
        onLoad={handleImageLoad}
        alt={alt || 'Изображение'}
        loading={loading}
      />
    );
  };

  return <> {isLoading ? <Loader /> : <ImgLoad />}</>;
};
