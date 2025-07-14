'use client';


import { File } from './File';
import styles from './files.module.scss';

type FileItem = {
  file: {
    name: string;
    filename: string;
    url: string;
  };
};

type Props = {
  files: FileItem[];
};

export const Files = ({ files }: Props) => {
  return (
    <div className={styles.files}>
      {files.map(({ file }) => (
        <File
          key={file.url}
          name={file.name}
          filename={file.filename}
          url={file.url}
        />
      ))}
    </div>
  );
};
