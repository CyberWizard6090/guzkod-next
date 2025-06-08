'use client';
import './Images.scss';
import { useDispatch } from 'react-redux';
import { handleImageClick } from 'features/imageViewer';
type ImageItem = {
  image: {
    url: string;
    alt?: string;
  };
};

type Props = {
  images: ImageItem[];
};

export const Images = ({ images }: Props) => {
  const dispatch = useDispatch();
  const onImageClick = (index: number) => {
    const urls = images.map(({ image }) => image.url);
    handleImageClick(urls, dispatch, index);
  };
  return (
    <div className="gallery">
      {images.map(({ image }, index) => (
        <img
          key={index}
          src={image.url}
          alt={image.alt || `image-${index}`}
          className="gallery__item"
          loading="lazy"
          onClick={() => onImageClick(index)}
        />
      ))}
    </div>
  );
};
