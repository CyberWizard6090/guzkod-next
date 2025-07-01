'use client';
import DownloadIcon from 'shared/assets/svg/bootstrap-icons-1.11.2/download.svg';
import Excel from 'shared/assets/svg/SVG-DOCS-ICONS/excel-document-svgrepo-com.svg';
import Powerpoint from 'shared/assets/svg/SVG-DOCS-ICONS/ppt-document-svgrepo-com.svg';
import Word from 'shared/assets/svg/SVG-DOCS-ICONS/word-document-svgrepo-com.svg';
import PDF from 'shared/assets/svg/SVG-DOCS-ICONS/pdf-document-svgrepo-com.svg';
import FileUnknown from 'shared/assets/svg/SVG-DOCS-ICONS/unknown-document-svgrepo-com.svg';
import Xml from 'shared/assets/svg/SVG-DOCS-ICONS/xml-document-svgrepo-com.svg';
import Zip from 'shared/assets/svg/SVG-DOCS-ICONS/zip-document-svgrepo-com.svg';
import VideoIcon from 'shared/assets/svg/SVG-DOCS-ICONS/video-document-svgrepo-com.svg';
import AudioIcon from 'shared/assets/svg/SVG-DOCS-ICONS/audio-document-svgrepo-com.svg';
import Txt from 'shared/assets/svg/SVG-DOCS-ICONS/txt-document-svgrepo-com.svg';
import './Files.scss';
import { Button } from 'shared/ui/button';
import { getType } from 'shared/lib/getType';
import { GetFile } from 'shared/lib/getFile';
import { FormatFile } from 'shared/consts';
import { Key } from 'react';
import { SITE_HOST } from 'shared/consts/site.constants';

type Props = {
  files: any;
};

export const Files = ({ files }: Props) => {
  const LogoView = ({ FileType }: any) => {
    if (FormatFile.word.includes(FileType)) {
      return <Word />;
    } else if (FormatFile.excel.includes(FileType)) {
      return <Excel />;
    } else if (FormatFile.powerpoint.includes(FileType)) {
      return <Powerpoint />;
    } else if (FormatFile.zip.includes(FileType)) {
      return <Zip />;
    } else if (FormatFile.video.includes(FileType)) {
      return <AudioIcon />;
    } else if (FormatFile.music.includes(FileType)) {
      return <VideoIcon />;
    } else if (FileType === 'pdf') {
      return <PDF />;
    } else if (FileType === 'xml') {
      return <Xml />;
    } else if (FileType === 'txt') {
      return <Txt />;
    } else {
      return <FileUnknown />;
    }
  };

  return (
    <div className="block__files">
      {files.map((item: any, index: Key | null | undefined) => {
        return (
          <div key={index} className="file__wrap">
            <div className="file__icon">
              <LogoView FileType={getType(item.file.filename)} />
            </div>
            <div className="name-file">{item.file.name}</div>
            <div className="btn__wrap">
              <Button
                Icon={DownloadIcon}
                onClick={() =>
                  GetFile(
                    SITE_HOST + item.file.url, // путь к файлу
                    `${item.file.name}.${getType(item.file.filename)}`, // имя при сохранении
                  )
                }
              >
                Скачать
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
