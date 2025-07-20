import { useDispatch } from 'react-redux';
import { openPdf } from '../model/slice';

export const useOpenPdf = () => {
  const dispatch = useDispatch();

  const openPdfHandler = (fileUrl: string, fileName: string) => {
    dispatch(openPdf({ fileUrl, fileName }));
  };

  return openPdfHandler;
};
