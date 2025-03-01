import { ImageView } from 'shared/ui/imageView';
import './Images.scss';
type ImageItem = {
  image: {
    url: string;
  };
};

type Props = {
  images: ImageItem[];
};

export const Images = ({ images }: Props) => {
  return (
    <div className="block__images">
      {images.map((item: any, index) => {
        return <ImageView key={index} url={item.image.url} />;
      })}
    </div>
  );
};
