import { AppDispatch } from 'app/stores';
import { openImage, setCurrentIndex } from '../model/imageViewerSlice ';

export const handleImageClick = (
  images: string | string[],
  dispatch: AppDispatch,
  index?: number,
) => {
  // Открываем с массивом (если строка — конвертим в массив)
  const imgs = Array.isArray(images) ? images : [images];

  dispatch(openImage(imgs));

  // Если индекс передан — устанавливаем текущий слайд
  if (typeof index === 'number') {
    dispatch(setCurrentIndex(index));
  }
};
