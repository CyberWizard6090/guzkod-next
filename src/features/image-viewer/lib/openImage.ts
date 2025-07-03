import { AppDispatch } from 'shared/stores';
import { openImage, setCurrentIndex } from '../model/imageViewerSlice ';

export const handleImageClick = (
  images: string | string[],
  dispatch: AppDispatch,
  index?: number,
) => {
  const imgs = Array.isArray(images) ? images : [images];

  dispatch(openImage(imgs));

  if (typeof index === 'number') {
    dispatch(setCurrentIndex(index));
  }
};
