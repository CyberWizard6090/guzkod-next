import { ImageView } from 'shared/ui/image';

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
