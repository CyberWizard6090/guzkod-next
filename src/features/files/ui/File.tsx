'use client';

import { getType } from 'shared/lib/getType';
import { GetFile } from 'shared/lib/getFile';
import { useOpenPdf } from 'features/pdf-viewer';
import { useDeviceDetect } from 'shared/lib/hooks/useDeviceDetect';
import { DEVICE_BREAKPOINTS } from 'shared/consts/device-breakpoints.constants';
import { API_BASE } from 'shared/api/api';
import { FileIcon } from 'shared/ui/file-icon';
import { Button } from 'shared/ui/button';
import DownloadIcon from 'shared/assets/svg/bootstrap-icons-1.11.2/download.svg';
import ReadIcon from 'shared/assets/svg/bootstrap-icons-1.11.2/book.svg';
import styles from './file.module.scss';
type Props = {
  name: string;
  filename: string;
  url: string;
};

export const File = ({ name, filename, url }: Props) => {
  const fileType = getType(filename) ?? '';
  const fileUrl = `${API_BASE}${url}`;
  const fullName = `${name}.${fileType}`;
  const openPdf = useOpenPdf();
  const { isMobile } = useDeviceDetect(DEVICE_BREAKPOINTS.MOBILE);

  return (
    <div className={styles.file}>
      <div className={styles.icon}>
        <FileIcon fileType={fileType} />
      </div>

      <div className={styles.name}>{name}</div>

      <div className={styles.buttons}>
        {fileType === 'pdf' && !isMobile && (
          <Button Icon={ReadIcon} onClick={() => openPdf(fileUrl, name)} variant="secondary">
            Читать
          </Button>
        )}

        <Button Icon={DownloadIcon} onClick={() => GetFile(url, fullName)}>
          Скачать
        </Button>
      </div>
    </div>
  );
};
