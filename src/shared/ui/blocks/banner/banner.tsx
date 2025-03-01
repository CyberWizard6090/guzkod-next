import './Banner.scss';
import { Button } from 'shared/ui/button';
import { ImageView } from 'shared/ui/imageView';

type Props = {
  image?: string;
  link?: string;
  title?: string;
  buttonDisabled?: boolean;
  altText?: string;
};

export const Banner = ({ image, link, title, buttonDisabled = false, altText }: Props) => {
  const showButton = !!link;
  const alt = altText || title?.trim() || 'Баннер';

  return (
    <div className="banner">
      {title?.trim() && <h2 className="banner__title">{title}</h2>}

      <div className="banner__image-wrapper">
        {image && <ImageView url={image} alt={alt} className="banner__image" loading="lazy" />}
      </div>

      {showButton && (
        <div className="banner__actions">
          <a href={link}>
            <Button disabled={buttonDisabled} aria-label={alt}>
              Перейти
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};
