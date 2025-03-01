import { ImageView } from 'shared/ui/imageView';
import './Image.scss';
type Props = {
  image: any;
};

export const Image = ({ image }: Props) => {
  const url = image.url;
  return (
    <div className="block__image">
      <ImageView url={url} />
    </div>
  );
};
