'use client';
import { useState } from 'react';
import styles from './ImageView.module.scss';
import { Loader } from '../loader';
import { useDispatch } from 'react-redux';
import { handleImageClick } from 'features/image-viewer';
import clsx from 'clsx';

type Props = {
  url: string;
  alt?: string;
  className?: string;
  loading?: 'eager' | 'lazy';
};

export const ImageView = ({ url, alt = 'Изображение', className, loading }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      {isLoading && (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      )}
      <button
        type="button"
        className={clsx(styles.imageButton, className, { [styles.hidden]: isLoading })}
        onClick={() => handleImageClick(url, dispatch)}
      >
        <img
          src={url}
          alt={alt}
          loading={loading}
          className={styles.image}
          onLoad={() => setIsLoading(false)}
        />
      </button>
    </div>
  );
};
