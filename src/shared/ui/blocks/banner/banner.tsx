import { ImageView } from 'shared/ui/image';
import { Button } from 'shared/ui/button';
import styles from './Banner.module.scss';

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
    <div className={styles.banner}>
      {title?.trim() && <h4 className={styles.banner__title}>{title}</h4>}

      <div className={styles['banner__image-wrapper']}>
        {image && <ImageView url={image} alt={alt} className={styles.banner__image} loading="lazy" />}
      </div>

      {showButton && (
        <div className={styles.banner__content}>
          <a href={link} className={styles.banner__link}>
            <Button disabled={buttonDisabled} aria-label={alt}>
              Перейти
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};
