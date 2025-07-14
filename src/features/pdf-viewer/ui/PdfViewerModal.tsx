'use client';

import { selectPdfViewerState } from '../model/selectors';
import { closePdf } from '../model/slice';
import { Modal } from 'shared/ui/modal/Modal';
import { useDisableScroll } from 'shared/lib/hooks/useDisableScroll';

import { useDispatch, useSelector } from 'react-redux';
import './PdfViewerModal.scss';

export const PdfViewerModal = () => {
  const dispatch = useDispatch();
  const { isOpen, fileUrl, fileName } = useSelector(selectPdfViewerState);
  useDisableScroll(!(!isOpen || !fileUrl));
  if (!isOpen || !fileUrl) return null;

  return (
    <Modal
      title={fileName ?? 'PDF Viewer'}
      className={'modal-pdf-view'}
      isOpen={isOpen}
      onClose={() => dispatch(closePdf())}
    >
      <iframe src={fileUrl} title={fileName ?? 'PDF фаил'} />
    </Modal>
  );
};
