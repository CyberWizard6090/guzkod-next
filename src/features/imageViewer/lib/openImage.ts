import { AppDispatch } from 'app/stores';
import { openImage } from '../model/imageViewerSlice ';

export const handleImageClick = (imageUrl: string, dispatch: AppDispatch) => {
  dispatch(openImage(imageUrl));
};
